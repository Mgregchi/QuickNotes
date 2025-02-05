import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import Navigation from "./src/navigation";
import { PaperProvider, Snackbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadingProvider } from "./src/context/LoadingContext";
import { MessageProvider } from "./src/context/MessageContext";
import NoteProvider from "./src/context/NoteContext";
import theme from "./src/theme";

const App = () => {
  const [exitApp, setExitApp] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {

      if (exitApp) {
        BackHandler.exitApp();
      } else {
        setExitApp(true);
        setSnackbarVisible(true);
        setTimeout(() => setExitApp(false), 2000);
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [exitApp]);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <PaperProvider theme={theme}>
        <LoadingProvider>
          <MessageProvider>
            <NoteProvider>
              <Navigation />
            </NoteProvider>
          </MessageProvider>
        </LoadingProvider>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
        >
          Press back again to exit
        </Snackbar>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
