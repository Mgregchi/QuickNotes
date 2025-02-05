import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  button: { marginVertical: 10 },
  noteDetailContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 0,
  },
  noteDetailContent: {
    flex: 1,
    textAlignVertical: "top",
    fontFamily: "monospace",
    fontSize: 16,
    borderRadius: 8,
    padding: 5,
    marginTop: 10,
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
  modal: {
    position: "absolute", top: "auto",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    margin: 16,
    right: 0,
    bottom: 0,
  },
  colorChip: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default styles;
