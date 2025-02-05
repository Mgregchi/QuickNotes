import AsyncStorage from "@react-native-async-storage/async-storage";


// Storage key
const STORAGE_KEY = "user_notes";

// Secure Storage Functions
const StorageService = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(`Saved: ${key}`);
    } catch (error) {
      console.error("Error saving item", error);
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error retrieving item", error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Deleted: ${key}`);
    } catch (error) {
      console.error("Error deleting item", error);
    }
  },
  
  // Save notes to AsyncStorage
  async saveNotesToLocal(notes) {
    try {
      const jsonValue = JSON.stringify(notes);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error("Error saving notes locally:", error);
    }
  },
  
  // Load notes from AsyncStorage
   async loadNotesFromLocal () {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error loading notes:", error);
      return [];
    }
  },
  
  // Remove all notes (for reset feature)
  async clearLocalNotes (){
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing local notes:", error);
    }
  }
};

export default StorageService ;
