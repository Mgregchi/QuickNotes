import QuickNoteDetail from "../../components/QuickNoteDetail";
import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles";

export default function DetailScreen({ id, navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Quick Note" />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.container}>
        <QuickNoteDetail id={id} />
      </View>
    </SafeAreaView>
  );
}
