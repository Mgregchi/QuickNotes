import React, { useState } from "react";
import { View, FlatList } from "react-native";
import {
  FAB,
  Modal,
  Portal,
  TextInput,
  Button,
  useTheme,
  Searchbar,
  Text
} from "react-native-paper";
import NotesItem from "./NotesItem";
import styles from "../styles";
import { useNotes } from "../context/NoteContext";

export default function QuickNote({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  
  const { notes, addNote, visible, toggleModal } = useNotes();
  const theme = useTheme();

  const createNote = () => {
    if (title.trim() || content.trim()) {
      addNote(title, content);
      setContent("");
      setTitle("");
    }
  };

  // Filter notes based on search input
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.content.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <React.Fragment>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Searchbar 
          placeholder="Search notes..." 
          onChangeText={setSearchText} 
          value={searchText} 
        />
      </View>

      {/* Notes List */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotesItem note={item} />}
        style={{ flex: 1, padding: 5 }}
        ListEmptyComponent={<View style={styles.emptyMessage}><Text>No notes found</Text></View>}
      />

      {/* Add Note Modal */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={toggleModal}
          contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.background }]}
          style={styles.modal}
          theme={theme}
        >
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            focusable
          />
          <TextInput
            label="Note"
            value={content}
            onChangeText={setContent}
            mode="outlined"
            focusable
            multiline
            style={[styles.noteDetailContent, { height: 100, backgroundColor: theme.colors.surface }]}
          />
          <Button mode="contained" onPress={createNote} style={styles.button}>
            Save
          </Button>
        </Modal>
      </Portal>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={toggleModal}
      />
    </React.Fragment>
  );
}
