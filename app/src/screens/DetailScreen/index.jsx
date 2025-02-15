import QuickNoteDetail from "../../components/QuickNoteDetail";
import React, { Fragment, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ImageBackground, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoading } from "../../context/LoadingContext";
import { useNotes } from "../../context/NoteContext";

import styles from "../../styles";
import ThemeModal from "../../components/ThemeModal";

export default function DetailScreen({ navigation }) {
  const [editMode, setEditMode] = React.useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const theme = useTheme();
  const { setLoading } = useLoading();
  const { getNote, updateNote, addNote, visible, toggleModal } = useNotes();
  const [backgroundColor, setBackgroundColor] = useState("");
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

  const createNote = () => {
    if (title.trim() || content.trim()) {
      addNote(title, content);
      // setContent("");
      // setTitle("");
    }
  };

  const saveNote = () => {
    if (id) {
      updateNote(id, title, content, backgroundColor);
    } else {
      createNote();
    }
    // setContent("");
    // setTitle("");
    // navigation.navigate("HomeScreen");

    setEditMode(false);
  };

  const selectTheme = (color) => {
    setBackgroundColor(color);
    toggleModal();
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ImageBackground
        source={require("../../../assets/icon.png")}
        // src={"../../..assets/icon.png"}
        height={"100%"}
        style={{ height: "100%" }}
      >
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Quick Note" />
          {editMode ? (
            <Fragment>
              <Appbar.Action
                icon={"arrow-left-top"}
                onPress={() => {
                  console.log("Undo");
                }}
              />
              <Appbar.Action
                icon={"arrow-right-top"}
                onPress={() => {
                  console.log("Redo");
                }}
              />
              <Appbar.Action icon={"check"} onPress={saveNote} />
            </Fragment>
          ) : (
            <Fragment>
              <Appbar.Action icon="share-variant-outline" onPress={() => {}} />
              <Appbar.Action icon="tshirt-crew-outline" onPress={toggleModal} />
              <Appbar.Action
                icon="dots-vertical"
                onPress={() => {
                  console.log("Show menu - delete");
                }}
              />
            </Fragment>
          )}
        </Appbar.Header>
        <View style={styles.container}>
          <QuickNoteDetail
            id={id}
            setEditMode={setEditMode}
            onSave={saveNote}
            title={title}
            content={content}
            setContent={setContent}
            setTitle={setTitle}
          />
        </View>
        <ThemeModal
          visible={visible}
          onDismiss={toggleModal}
          onItemPress={selectTheme}
          theme={theme}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
