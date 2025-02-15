import React, { Fragment, useEffect, useState } from "react";
import { View, FlatList, Modal as RModal } from "react-native";
import { Portal, Card, Modal, List } from "react-native-paper";
import styles from "../styles";

const backgrounds = [
  {
    id: 1,
    source: "",
  },
  {
    id: 2,
    source: "",
  },
  {
    id: 3,
    source: "",
  },
  {
    id: 4,
    source: "",
  },
  {
    id: 5,
    source: "",
  },
];

function ThemeModalV1({ visible, onDismiss, onItemPress, theme }) {
  return (
    <Portal>
      <RModal
        animationType="slide"
        transparent={true}
        visible={visible}
        onDismiss={onDismiss}
        presentationStyle="pageSheet"
      >
        <View
          style={[
            styles.themeModalContent,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <FlatList
            horizontal
            data={backgrounds}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card onPress={onItemPress} style={styles.themeCard}>
                <Card.Cover source={item.source} />
              </Card>
            )}
          />
        </View>
      </RModal>
    </Portal>
  );
}

export default function ThemeModal({ visible, onDismiss, onItemPress, theme }) {
  return (
    <Portal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          //   styles.modalContainer,
          styles.themeModalContent,
          { backgroundColor: theme.colors.background },
        ]}
        style={styles.modal}
        theme={theme}
        presentationStyle={"pageSheet"}
      >
        <FlatList
          horizontal
          data={backgrounds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              onPress={() => onItemPress(item)}
              style={{
                height: 70,
                width: 70,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 5,
              }}
            >
              {/* <Card.Cover source={item.source} /> */}
              <List.Icon icon={"account"} />
            </Card>
          )}
          contentContainerStyle={{
            margin: 0,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        />
      </Modal>
    </Portal>
  );
}
