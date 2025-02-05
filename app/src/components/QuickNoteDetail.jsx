import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import {
  TextInput,
  Button,
  useTheme,
} from "react-native-paper";
// import { useNotes } from "../services/notes";
import { useNotes } from "../context/NoteContext";
import styles from "../styles";
import { useLoading } from "../context/LoadingContext";

export default function QuickNoteDetail() {
  const theme = useTheme();
  const { setLoading } = useLoading();
  const { getNote, setTitle, setContent, title, content, updateNote } =
    useNotes();
  const [backgroundColor, setBackgroundColor] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const note = await getNote(id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setBackgroundColor(note.backgroundColor);
      }
      setLoading(false);
    };

    fetchNote();
  }, [id]);

  const saveNote = () => {
    updateNote(id, title, content, backgroundColor);
    navigation.navigate("HomeScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.noteDetailContainer}>
      <TextInput
        label="Title"
        value={title}
        mode="outlined"
        onChangeText={setTitle}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.noteDetailContent, {backgroundColor: theme.colors.surface}]}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
      />
      <Button mode="contained" style={{ marginTop: 10 }} onPress={saveNote}>
        Save
      </Button>
    </ScrollView>
  );
}
