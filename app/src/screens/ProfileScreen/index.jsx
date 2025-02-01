import React from "react";
import { View, Text } from "react-native";
import {
  FAB,
  Modal,
  Portal,
  TextInput,
  Button,
  Card,
  IconButton,
  Appbar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Account Settings" />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>                
      <View style={styles.container}>
        <Text style={styles.title}>Profile Screen</Text>
        {/* Add more profile details here */}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
