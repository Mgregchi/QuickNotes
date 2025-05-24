// import { AuthProvider } from "./context/AuthContext";
import Navigation from "./navigation";
import NoteProvider from "./context/NoteContext";

import { LoadingProvider } from "./context/LoadingContext";
import { MessageProvider } from "./context/MessageContext";
import { useTheme } from "./context/ThemeContext";
import { PaperProvider, Snackbar } from "react-native-paper";

const MainApplication = (/*{ snackbarVisible, setSnackbarVisible }*/) => {
  const { theme } = useTheme();

  return (
    <>
    <PaperProvider theme={theme}>
    <LoadingProvider>
      <MessageProvider>
        <Navigation />
      </MessageProvider>
      </LoadingProvider>
    </PaperProvider>
    </>
  );
};

export default MainApplication;
