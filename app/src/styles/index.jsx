import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  noteDetailContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 0,
  },
  searchContainer: {
    // padding: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
  modal: { backgroundColor: "white", padding: 20, margin: 10, borderRadius: 10 },
});
export default styles;
