import React, { useState } from "react";
import { View, FlatList } from "react-native";
import {
  Card,
  IconButton,
  Menu,
  PaperProvider,
  Divider,
  Chip,
  Portal,
  Modal,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { useNotes, colors } from "../services/notes";
import { useNotes, colors } from "../context/NoteContext";
import { formatDate } from "../utils";
import styles from "../styles";

export function NoteItemV1({ note }) {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Card
              style={[styles.card, { backgroundColor: note.color }]}
              onPress={openMenu} // Open menu on long press
            >
              <Card.Title
                title={note.title}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="chevron-right"
                    onPress={() =>
                      navigation.navigate("DetailScreen", { id: note.id })
                    }
                  />
                )}
              />
            </Card>
          }
        >
          <Menu.note onPress={() => {}} title="note 1" />
          <Menu.note onPress={() => {}} title="note 2" />
          <Divider />
          <Menu.note onPress={() => {}} title="note 3" />
        </Menu>
      </View>
    </PaperProvider>
  );
}

export default function NoteItem({ note }) {
  const navigation = useNavigation();
  const { deleteNote, updateNote } = useNotes();
  const [visible, setVisible] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(note.color);
  const [colorsVisible, setColorsVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const showColorPicker = () => {
    setColorsVisible(true);
    closeMenu();
  };
  const hideColorPicker = () => {
    updateNote(note.id, note.title, note.content, selectedColor);
    setColorsVisible(false);
  };

  const handleViewDetail = () => {
    navigation.navigate("DetailScreen", { id: note.id });
    closeMenu();
  };

  return (
    <View>
      <Card
        style={[styles.card, { backgroundColor: selectedColor }]}
        onPress={handleViewDetail}
        onLongPress={openMenu}
      >
        <Card.Title
          title={note.title}
          titleStyle={{
            color: note.backgroundColor === "#fff" ? "#000" : "#fff",
          }}
          right={(props) => (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  {...props}
                  icon="dots-vertical"
                  onPress={openMenu}
                  iconColor={note.backgroundColor === "#fff" ? "#000" : "#fff"}
                />
              }
            >
              <Menu.Item onPress={handleViewDetail} title="Edit" />
              <Menu.Item onPress={showColorPicker} title="Change color" />
              <Divider />
              <Menu.Item
                onPress={() => deleteNote(note.id)}
                title="Delete"
                trailingIcon="delete"
              />
            </Menu>
          )}
          subtitle={formatDate(note.dateCreated)}
          subtitleStyle={{
            color: note.backgroundColor === "#fff" ? "#000" : "#fff",
          }}
        />
      </Card>

      {/* Color Picker Modal */}
      <Portal>
        <Modal
          visible={colorsVisible}
          onDismiss={hideColorPicker}
          contentContainerStyle={[styles.modal, {padding: 0}]}
        >
          <FlatList
            horizontal
            data={colors}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Chip
                compact
                onPress={() => {
                  setSelectedColor(item.color);
                  hideColorPicker();
                }}
                style={[{backgroundColor: item.color}, styles.colorChip]}
              />
            )}
          />
          {/* <Button onPress={hideColorPicker} mode="contained" style={{ marginTop: 10 }}>
            Done
          </Button> */}
        </Modal>
      </Portal>
    </View>
  );
}
