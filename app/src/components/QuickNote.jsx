import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image } from "react-native";
import {
  FAB,
  Modal,
  Portal,
  TextInput,
  Button,
  Card,
  IconButton,
  Searchbar,
} from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../utils";
import data from "../services/notes";
import styles from "../styles";

export default function QuickNote() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [notes, setNotes] = useState(data);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("#fff");

  const toggleModal = () => setVisible(!visible);

  const addNote = () => {
    if (title || content) {
      setNotes([
        ...notes,
        {
          id: uuidv4(),
          title,
          content,
          color: selectedColor,
          dateCreated: new Date().toISOString(),
        },
      ]);
      setTitle("");
      setContent("");
      setSelectedColor("#fff");
      toggleModal();
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <React.Fragment>
      <View style={styles.searchContainer}>
        <Searchbar placeholder="Search" />
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={[styles.card, { backgroundColor: item.color }]}>
            <Card.Title
              title={item.title}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  onPress={() =>
                    navigation.navigate("DetailScreen", { id: item.id })
                  }
                />
              )}
              subtitle={formatDate(item.dateCreated)}
            />
          </Card>
        )}
        style={{ flex: 1, padding: 5 }}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={toggleModal}
          contentContainerStyle={styles.modal}
          
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
            style={{ marginTop: 10, height: 100 }}
          />
          <Button mode="contained" onPress={addNote} style={{ marginTop: 20 }}>
            Save
          </Button>
        </Modal>
      </Portal>
      <FAB
        style={{ position: "absolute", right: 16, bottom: 16 }}
        icon="plus"
        onPress={toggleModal}
      />
    </React.Fragment>
  );
}
