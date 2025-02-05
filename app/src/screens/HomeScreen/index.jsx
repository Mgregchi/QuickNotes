import React from "react";
import QuickNote from "../../components/QuickNote";
import { Appbar } from "react-native-paper";
import styles from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.Content title="Quick Note" />
        <Appbar.Action
          icon="cog"
          onPress={() => navigation.navigate("SettingsScreen")}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <QuickNote />
      </View>
    </SafeAreaView>
  );
}
