import React from "react";
import { ScrollView } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
// import { useNotes } from "../services/notes";
import styles from "../styles";

export default function QuickNoteDetail({
  setEditMode,
  setContent,
  content,
  setTitle,
  title,
  onSave,
  id,
}) {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.noteDetailContainer}>
      <TextInput
        value={title}
        placeholder="Title"
        style={{ backgroundColor: "transparent" }}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        onChangeText={setTitle}
        onFocus={() => setEditMode(true)}
        contentStyle={{ padding: 0 }}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.noteDetailContent, { backgroundColor: "transparent" }]}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        onFocus={() => setEditMode(true)}
        contentStyle={{ padding: 0 }}
      />
    </ScrollView>
  );
}
