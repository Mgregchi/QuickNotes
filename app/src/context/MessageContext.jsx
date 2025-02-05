// src/contexts/MessageContext.js
import React, { createContext, useContext } from "react";
import Toast from "react-native-toast-message";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const showMessage = ({ text, type = "success" }) => {
    Toast.show({
      type: type,
      text1: text,
      position: "top",
      autoHide: true,
    });
  };

  const clearMessage = () => {
    Toast.hide();
  };

  return (
    <MessageContext.Provider value={{ showMessage, clearMessage }}>
      {children}
      <Toast />
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);

