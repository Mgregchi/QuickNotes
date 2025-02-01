import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  Card,
  IconButton,
  Menu,
  PaperProvider,
  Button,
  Divider,
  Chip,
    Portal,
    Modal,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
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
  const [visible, setVisible] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(note.color);
  const [colorsVisible, setColorsVisible] = React.useState(false);
  const colors = [
    { id: "1", color: "#fff" },
    { id: "2", color: "#f00" },
    { id: "3", color: "#0f0" },
    { id: "4", color: "#00f" },
    { id: "5", color: "#ff0" },
    { id: "6", color: "#f0f" },
    { id: "7", color: "#0ff" },
  ];

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const showColorPicker = () => {
    setColorsVisible(true);
    closeMenu();
  };
  const hideColorPicker = () => setColorsVisible(false);

  return (
    <View>
      <Card style={[styles.card, { backgroundColor: selectedColor }]}>
        <Card.Title
          title={note.title}
          right={(props) => (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton {...props} icon="dots-vertical" onPress={openMenu} />
              }
            >
              <Menu.Item onPress={() => navigation.navigate("DetailScreen", { id: note.id })} title="Edit" />
              <Menu.Item onPress={showColorPicker} title="Change color" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Delete" trailingIcon="delete" />
            </Menu>
          )}
          subtitle={formatDate(note.dateCreated)}
        />
      </Card>

      {/* Color Picker Modal */}
      <Portal>
        <Modal visible={colorsVisible} onDismiss={hideColorPicker} contentContainerStyle={styles.modal}>
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
                style={{ backgroundColor: item.color, margin: 5 }}
              />
            )}
          />
          <Button onPress={hideColorPicker} mode="contained" style={{ marginTop: 10 }}>
            Done
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}
