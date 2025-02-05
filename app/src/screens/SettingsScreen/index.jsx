import React, { useState } from "react";
import { View, ScrollView, Switch } from "react-native";
import {
  TextInput,
  Button,
  Card,
  IconButton,
  Appbar,
  List,
  Divider,
  Modal,
  Portal,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles";

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(false);
  const [user, setUser] = useState({ email: "mgregchi@gmail.com" });

  // Account Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* App Bar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.container}
        style={{ marginVertical: 10 }}
      >
        {/* Account Settings */}
        <List.Section title="Account">
          <List.Item
            title="Account Option"
            left={(props) => <List.Icon {...props} icon="account" />}
            right={() => <List.Icon icon={"chevron-right"} />}
            onPress={() => setModalVisible(true)}
          />
        </List.Section>
        <Divider style={{ marginVertical: 10 }} />

        {/* Appearance Settings */}
        <List.Section title="Appearance">
          <List.Item
            title="Dark Mode"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={() => setDarkMode(!darkMode)}
              />
            )}
          />
        </List.Section>
        <Divider style={{ marginVertical: 10 }} />

        {/* Notes Settings */}
        <List.Section title="Notes">
          <List.Item
            title="Auto-save Notes"
            left={(props) => <List.Icon {...props} icon="content-save" />}
            right={() => (
              <Switch
                value={autoSave}
                onValueChange={() => setAutoSave(!autoSave)}
              />
            )}
          />
        </List.Section>
        <Divider style={{ marginVertical: 10 }} />

        {/* Backup Settings */}
        <List.Section title="Backup & Sync">
          <List.Item
            title="Enable Cloud Backup"
            left={(props) => <List.Icon {...props} icon="cloud-upload" />}
            right={() => (
              <Switch
                value={cloudBackup}
                onValueChange={() => setCloudBackup(!cloudBackup)}
              />
            )}
          />
          <List.Item
            title="Backup Now"
            left={(props) => <List.Icon {...props} icon="backup-restore" />}
            onPress={() => console.log("Backup initiated")}
          />
          <List.Item
            title="Restore Backup"
            left={(props) => <List.Icon {...props} icon="restore" />}
            onPress={() => console.log("Restore initiated")}
          />
        </List.Section>
        <Divider style={{ marginVertical: 10 }} />

        {/* Reset Button */}
        <Button
          mode="contained"
          onPress={() => console.log("Resetting all settings")}
        >
          Reset to Default
        </Button>
      </ScrollView>

      {/* Account Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
          style={styles.modal}
        >
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
            disabled={user?.email}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            mode="contained"
            onPress={() => console.log("Change password")}
            style={styles.button}
          >
            Change Password
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default SettingsScreen;
