import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as logOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useLoading } from "./LoadingContext";
import { useMessage } from "./MessageContext";
import fireerror from "firebase-error-handler";
// import { getFirebaseErrorMessage } from "firebase-error-handler";
// import { fireerror } from "../utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setLoading } = useLoading();
  const { showMessage } = useMessage();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const createAccount = async (email, password) => {
    if (!email || !password) {
      showMessage({
        text: "Please provide a valid email and password.",
        type: "info",
      });
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showMessage({ text: "Account created successfully!" });
    } catch (error) {
      showMessage({ text: fireerror(error), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    if (!email || !password) {
      showMessage({
        text: "Please provide a valid email and password.",
        type: "info",
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage({ text: "Signed in successfully!" });
    } catch (error) {
      showMessage({ text: fireerror(error), type: "error" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) {
        setUser(result.user);
        showMessage({ text: `Welcome, ${result.user.displayName}!` });
      }
    } catch (error) {
      showMessage({ text: fireerror(error), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await logOut(auth);
      showMessage({ text: "Signed out successfully!", type: "info" });
    } catch (error) {
      showMessage({ text: fireerror(error), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    if (!email) {
      showMessage({
        text: "Please provide a valid email address.",
        type: "info",
      });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage({ text: "Password reset email sent!", type: "info" });
    } catch (error) {
      showMessage({ text: fireerror(error), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const updateEmail = async (email) => {
    if (user.email === email) {
      showMessage({
        text: "Please provide a new email address.",
        type: "info",
      });
      return;
    }
    setLoading(true);
    try {
      await auth.currentUser.updateEmail(email);
      showMessage({ text: "Email updated successfully!" });
    } catch (error) {
      showMessage({ text: fireerror(error), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password) => {
    if (!password) {
      showMessage({ text: "Please provide a valid password.", type: "info" });
      return;
    }
    setLoading(true);
    try {
      await auth.currentUser.updatePassword(password);
      showMessage({ text: "Password updated successfully!" });
    } catch (error) {
      showMessage({ text: fireerror(error), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // check if user exist in firebase
  const userExist = async () => {
    return await auth
      .fetchSignInMethodsForEmail(email)
      .then((signInMethods) => signInMethods.length > 0)
      .catch((error) => {
        showMessage({ text: fireerror(error), type: "error" });
        return false;
      });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        userExist,
        createAccount,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
        updateEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
