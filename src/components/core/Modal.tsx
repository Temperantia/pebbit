import { t } from "i18next";
import React from "react";
import {
  Modal as RNModal,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { theme } from "../../../tailwind.config";

const Modal = ({
  text,
  visible,
  onDismiss,
  onValidate,
}: {
  text: string;
  visible: boolean;
  onDismiss: () => void;
  onValidate: () => void;
}) =>
  visible ? (
    <RNModal animationType="slide" transparent={true} visible={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[
                styles.button,
                { backgroundColor: theme.colors["black-background-1"] },
              ]}
              onPress={onDismiss}
            >
              <Text style={styles.textStyle}>{t("common:cancel")}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onValidate}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </RNModal>
  ) : (
    <></>
  );

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: theme.colors["red-main"],
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Modal;
