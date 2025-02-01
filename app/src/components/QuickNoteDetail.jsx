import React, { useEffect, useState } from "react";
import { View, FlatList, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FAB,
  Modal,
  Portal,
  TextInput,
  Button,
  Text,
  Card,
  IconButton,
  useTheme,
} from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../utils";
import notes from "../services/notes";
import styles from "../styles";

export default function QuickNoteDetail({id}) {
    const theme = useTheme();
  const navigation = useNavigation();
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState(note?.content);
    const getNote = () => {
        return notes.find((note) => note.id === id);
    };

    useEffect(() => {
        const note = getNote();
        setNote(note);
    }, []);

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const saveNote = () => {
    const updatedNotes = notes.map((note) => {
        if (note.id === id) {
            return { ...note, title, content };
        }
        return note;
    });
    setNotes(updatedNotes);
    navigation.navigate("HomeScreen");
  }

  return (
    <React.Fragment>
        <ScrollView contentContainerStyle={styles.noteDetailContainer}>
            <TextInput label="Title" value={title} mode="outlined" onChangeText={setTitle} />
            <TextInput
                // label="Content"
                value={content}
                onChangeText={setContent}
                // mode="outlined"
                multiline
                style={{
                    flex: 1,
                    textAlignVertical: "top",
                    fontFamily: "monospace",
                    fontSize: 16,
                    // backgroundColor: "#FFFBEA",
                    backgroundColor: theme.colors.surface,
                    borderRadius: 8,
                    padding: 5,
                    marginTop: 10,
                  }}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent" 
            />
            
            <Button
                mode="contained"
                style={{ marginTop: 10 }}
                onPress={saveNote}
            >
                Save
            </Button>
        </ScrollView>
    </React.Fragment>
   );
}