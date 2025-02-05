import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// Firebase Sync Functions
const SyncService = {
    /**
     * 
     * @param {*} userId 
     * @param {*} notes 
     */
    async syncToFirebase(userId, notes) {
      try {
        if (!userId) throw new Error("User ID is required for sync.");
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, { notes }, { merge: true });
        console.log("Synced notes to Firebase.");
      } catch (error) {
        console.error("Error syncing to Firebase", error);
      }
    },
  
    async fetchFromFirebase(userId) {
      try {
        if (!userId) throw new Error("User ID is required to fetch notes.");
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Fetched notes from Firebase.");
          return docSnap.data().notes;
        } else {
          console.log("No data found in Firebase.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching from Firebase", error);
        return [];
      }
    },
  };
  
export default SyncService;
