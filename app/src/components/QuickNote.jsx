import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { FAB, Searchbar, Text } from "react-native-paper";
import NotesItem from "./NotesItem";
import styles from "../styles";
import { useNotes } from "../context/NoteContext";

export default function QuickNote({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const { notes } = useNotes();

  // Filter notes based on search input
  const filteredNotes = notes.filter(
    (note) =>
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
        ListEmptyComponent={
          <View style={styles.emptyMessage}>
            <Text>No notes found</Text>
          </View>
        }
      />
      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("DetailScreen")}
      />
    </React.Fragment>
  );
}
