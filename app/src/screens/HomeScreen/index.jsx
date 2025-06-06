import React from "react";
// import QuickNote from "../../components/QuickNote";
import { Appbar, useTheme } from "react-native-paper";
import styles from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header>
        <Appbar.Content title="Quick Note" />
        <Appbar.Action
          icon="cog"
          onPress={() => navigation.navigate("SettingsScreen")}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {/* <QuickNote navigation={navigation} theme={theme} /> */}
      </View>
    </SafeAreaView>
  );
}
