import { Modal, Pressable, View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

const QModal = ({
  children,
  contentContainerStyle,
  isVisible,
  onClose,
  titleContainerStyle,
  title,
  titleStyle,
  closeIconColor,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={
          contentContainerStyle
            ? contentContainerStyle
            : defaultStyle.modalContent
        }
      >
        <View
          style={
            titleContainerStyle
              ? titleContainerStyle
              : defaultStyle.titleContainer
          }
        >
          <Text style={titleStyle}>{title}</Text>

          <IconButton
            onPress={onClose}
            icon="close"
            color={closeIconColor}
            size={24}
          />
        </View>
        {children}
      </View>
    </Modal>
  );
};

const defaultStyle = StyleSheet.create({
  modalContent: {
    height: "35%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    marginHorizontal: 10,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});

export default QModal;
