import React, { useEffect, useState, createContext, useContext } from "react";
import { useMessage } from "../context/MessageContext";
import SyncService from "../services/firebaseService";
import StorageService from "../services/storageService";
import NetInfo from "@react-native-community/netinfo";
import { v4 as uuidv4 } from "uuid";
// import { useAuth } from "./AuthContext";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  // const { user } = useAuth();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  // const [userId, setUserId] = useState(user?.uid);
  const [visible, setVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#fff");
  // const { showMessage } = useMessage();
  const showMessage = (e) => console.log(e)

  const toggleModal = () => setVisible((prev) => !prev);

  // useEffect(() => {
  //   setUserId(user?.uid);
  // }, [user]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const localNotes = await StorageService.loadNotesFromLocal();
        setNotes(localNotes);
      } catch (error) {
        console.error("Error loading local notes:", error);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      //TODO: Also check if user enabled cloud backup
      if (state.isConnected) {
        await syncNotesWithFirebase();
      }
    });

    return () => unsubscribe();
  }, []);

  const syncNotesWithFirebase = async (mode = "from") => {
    //TODO: If no user or user not authenticated, show signin modal
    try {
      const state = await NetInfo.fetch();
      if (!state.isConnected || !user?.uid) {
        console.warn("No internet connection. Skipping Firebase sync.");
        return;
      }

      if (mode === "from") {
        const cloudNotes = await SyncService.fetchFromFirebase(user?.uid);
        if (cloudNotes?.length) {
          setNotes(cloudNotes);
          await StorageService.saveNotesToLocal(cloudNotes);
        }
      } else {
        await SyncService.syncToFirebase(user?.uid, notes);
      }
    } catch (error) {
      console.error("Error syncing with Firebase:", error);
    }
  };

  // Make getNote async to simulate database/API call
  const getNote = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const note = notes.find((note) => note.id === id);
        resolve(note);
      }, 500); // Simulating delay
    });
  };

  const addNote = async (title, content, backgroundColor = selectedColor) => {
    if (!`${title}`.trim() || !`${content}`.trim()) {
      showMessage({ text: "Title and content cannot be empty", type: "info" });
      return;
    }
    const newNote = {
      id: uuidv4(),
      title,
      content,
      backgroundColor,
      dateCreated: new Date().toISOString(),
    };

    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      StorageService.saveNotesToLocal(updatedNotes);
      return updatedNotes;
    });
    showMessage({ text: "New note created" });
    await syncNotesWithFirebase("to");
  };

  const updateNote = async (id, title, content, backgroundColor) => {
    if (!`${title}`.trim() || !`${content}`.trim()) {
      showMessage({
        text: "Please provide a valid title and content",
        type: "info",
      });
      return;
    }

    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === id ? { ...note, title, content, backgroundColor } : note
      );
      StorageService.saveNotesToLocal(updatedNotes);
      return updatedNotes;
    });
    showMessage({ text: "Note updated" });
    await syncNotesWithFirebase("to");
  };

  const deleteNote = async (id) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== id);
      StorageService.saveNotesToLocal(updatedNotes);
      return updatedNotes;
    });
    showMessage({ text: "Note deleted", type: "success" });
    // await syncNotesWithFirebase("to");
    SyncService.deleteNoteFromFirebase(user?.uid, id);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        visible,
        selectedColor,
        colors,
        toggleModal,
        setSelectedColor,
        getNote,
        addNote,
        deleteNote,
        updateNote,
        syncNotesWithFirebase,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const colors = [
  { id: "1", color: "#fff" },
  { id: "2", color: "#f00" },
  { id: "3", color: "#0f0" },
  { id: "4", color: "#00f" },
  { id: "5", color: "#ff0" },
  { id: "6", color: "#f0f" },
  { id: "7", color: "#0ff" },
];

const useNotes = () => useContext(NoteContext);

export { NoteContext, useNotes, colors };
export default NoteProvider;
