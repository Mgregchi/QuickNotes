import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, Switch } from "react-native";
import {
  TextInput,
  Button,
  Appbar,
  List,
  Divider,
  Modal,
  Portal,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { useNotes } from "../../context/NoteContext";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles";

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme.isDark);
  const [autoSave, setAutoSave] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(false);
  // const [user, setUser] = useState({ email: "mgregchi@gmail.com" });
  const { syncNotesWithFirebase } = useNotes();
  const {
    user,
    signIn,
    signOut,
    createAccount,
    signInWithGoogle,
    updatePassword,
  } = useAuth();

  // Account Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [isSignin, setIsSignin] = useState(true);

  // useEffect(() => {
  //   setEmail(user?.email);
  // }, [user]);

  const handleThemeChange = () => {
    setIsDark(!isDark);
    toggleTheme();
  };

  const handleAuthentication = () => {
    if (isSignin) {
      signIn(email, password);
    } else {
      createAccount(email, password);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
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
              <Switch value={isDark} onValueChange={handleThemeChange} />
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
            onPress={() => syncNotesWithFirebase("to")}
          />
          <List.Item
            title="Restore Backup"
            left={(props) => <List.Icon {...props} icon="restore" />}
            onPress={() => syncNotesWithFirebase()}
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
        <Divider style={{ marginVertical: 10 }} />

        {/* Clear Notes Button */}
        <Button onPress={() => console.log("Clear All Notes")}>
          Clear all notes
        </Button>
      </ScrollView>

      {/* Account Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background },
          ]}
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
            focusable
          />
          <TextInput
            label={user?.uid ? "New Password" : "Password"}
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            autoCapitalize="none"
            focusable
          />
          <Button
            value={isSignin}
            onPress={() => setIsSignin(!isSignin)}
            style={{ alignSelf: "flex-end" }}
          >
            {isSignin ? "Create An Account" : "Sign-in"}
          </Button>
          {user?.uid ? (
            <Fragment>
              <Button
                mode="contained"
                onPress={() => updatePassword(password)}
                style={styles.button}
              >
                Change Password
              </Button>
              <Button
                mode="contained"
                onPress={signOut}
                style={styles.button}
                icon={"logout"}
              >
                Sign-out
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                mode="contained"
                onPress={handleAuthentication}
                style={styles.button}
                icon={"login"}
              >
                {isSignin ? "Sign-in" : "Create Account"}
              </Button>
              <Button
                mode="contained"
                onPress={() => signInWithGoogle()}
                style={styles.button}
                icon={"google"}
              >
                Google
              </Button>
            </Fragment>
          )}
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default SettingsScreen;
