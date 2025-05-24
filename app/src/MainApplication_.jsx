import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { MessageProvider } from "./context/MessageContext";
import NoteProvider from "./context/NoteContext";
import { useTheme } from "./context/ThemeContext";
import Navigation from "./navigation";
import { PaperProvider, Snackbar } from "react-native-paper";

const MainApplication = (/*{ snackbarVisible, setSnackbarVisible }*/) => {
  const { theme } = useTheme();

  return (
    <>
    {/* <PaperProvider theme={theme}> */}
      <LoadingProvider>
        <MessageProvider>
          <AuthProvider>
            <NoteProvider>
              <Navigation />
            </NoteProvider>
          </AuthProvider>
        </MessageProvider>
      </LoadingProvider>
      {/* <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        Press back again to exit
      </Snackbar> */}
    {/* </PaperProvider> */}
    </>
  );
};

export default MainApplication;
