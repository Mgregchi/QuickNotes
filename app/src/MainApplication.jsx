import { LoadingProvider } from "./context/LoadingContext";
import { MessageProvider } from "./context/MessageContext";
import NoteProvider from "./context/NoteContext";
// import theme from "./theme";
import { useTheme } from "./context/ThemeContext";
import Navigation from "./navigation";
import { PaperProvider, Snackbar } from "react-native-paper";

const MainApplication = ({ snackbarVisible, setSnackbarVisible }) => {
  const { theme } = useTheme();

  return (
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
  );
};

export default MainApplication;
