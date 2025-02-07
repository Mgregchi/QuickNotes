import React, { useEffect, useState } from "react";
import { BackHandler, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "./src/context/ThemeContext";
import MainApplication from "./src/MainApplication";

const App = () => {
  const [exitApp, setExitApp] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  if (Platform.OS !== "web") {
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
  }
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <ThemeProvider>
        <MainApplication
          setSnackbarVisible={setSnackbarVisible}
          snackbarVisible={snackbarVisible}
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
