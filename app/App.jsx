import React from "react";
import Navigation from "./src/navigation";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
