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
      const data = await setDoc(docRef, { notes }, { merge: true });
      console.log("Synced notes to Firebase. ", data);
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

  async deleteAllFromFirebase(userId) {
    try {
      if (!userId) throw new Error("User ID is required to delete notes.");
      const docRef = doc(db, "users", userId);
      await setDoc(docRef, { notes: [] }, { merge: true });
      console.log("Deleted notes from Firebase.");
    } catch (error) {
      console.error("Error deleting from Firebase", error);
    }
  },

  async deleteNoteFromFirebase(userId, noteId) {
    try {
      if (!userId || !noteId)
        throw new Error("User ID and Note ID are required to delete note.");
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const notes = docSnap.data().notes;
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        await setDoc(docRef, { notes: updatedNotes }, { merge: true });
        console.log("Deleted note from Firebase.");
      } else {
        console.log("No data found in Firebase.");
      }
    } catch (error) {
      console.error("Error deleting from Firebase", error);
    }
  },
};
  
export default SyncService;
