import React, { useCallback, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";

import useAuth from "../hooks/useAuth";
import tw from "../tailwind";

const Header = ({ noMenu }: { noMenu?: boolean }) => {
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const onSetVisible = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [setModalVisible, modalVisible]);
  const onSignOut = useCallback(signOut, [signOut]);

  return (
    <SafeAreaView style={tw("bg-black-background-1")}>
      <View style={tw("flex-row justify-between p-3")}>
        <Image
          style={{ width: 140, height: 45 }}
          source={require("../assets/images/logoWh.png")}
        ></Image>
        {!noMenu && (
          <TouchableOpacity onPress={onSetVisible}>
            <Image
              style={{
                width: 36,
                height: 36,
                tintColor: "#95949A",
                marginRight: 10,
              }}
              source={{
                uri: modalVisible
                  ? "https://img.icons8.com/fluent-systems-regular/36/000000/x.png"
                  : "https://img.icons8.com/material-rounded/36/000000/menu--v1.png",
              }}
            ></Image>
          </TouchableOpacity>
        )}
      </View>
      {modalVisible && (
        <View>
          <View
            style={{
              width: "100%",
              height: 200,
              backgroundColor: "red",
              position: "absolute",
            }}
          >
            <Button title="Sign Out" onPress={onSignOut}></Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Header;
