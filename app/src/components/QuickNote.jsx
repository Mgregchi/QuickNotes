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
} from "react-native-paper";
import NotesItem from "./NotesItem";
import styles from "../styles";
// import { useNotes } from "../services/notes";
import { useNotes } from "../context/NoteContext";

export default function QuickNote({ navigation }) {
  const {
    notes,
    addNote,
    setContent,
    setTitle,
    title,
    content,
    visible,
    toggleModal,
  } = useNotes();
  const theme = useTheme();

  return (
    <React.Fragment>
      <View style={styles.searchContainer}>
        <Searchbar placeholder="Search" />
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotesItem note={item} />}
        style={{ flex: 1, padding: 5 }}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={toggleModal}
          contentContainerStyle={styles.modalContainer}
          style={styles.modal}
        >
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
          />
          <TextInput
            label="Note"
            value={content}
            onChangeText={setContent}
            mode="outlined"
            multiline
            // style={{ marginTop: 10, height: 100 }}
            style={[
              styles.noteDetailContent,
              { height: 100, backgroundColor: theme.colors.surface },
            ]}
          />
          <Button mode="contained" onPress={addNote} style={styles.button}>
            Save
          </Button>
        </Modal>
      </Portal>
      <FAB
        // style={{ position: "absolute", right: 16, bottom: 16 }}
        style={styles.fab}
        icon="plus"
        onPress={toggleModal}
      />
    </React.Fragment>
  );
}
