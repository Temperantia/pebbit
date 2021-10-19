import React, { useCallback, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import tailwindConfig from "../../tailwind.config";

import useAuth from "../hooks/useAuth";
import tw from "../tailwind";
import Icon from "./core/Icon";
import SafeViewAndroid from "./SafeViewAndroid";

const Header = ({ noMenu }: { noMenu?: boolean }) => {
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const onSetVisible = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [setModalVisible, modalVisible]);
  const onSignOut = useCallback(signOut, [signOut]);

  return (
    <SafeAreaView
      style={[tw("bg-black-background-2"), SafeViewAndroid.AndroidSafeArea]}
    >
      <View style={tw("flex-row items-center justify-between p-3")}>
        <Image
          style={{ width: 140, height: 45 }}
          source={require("../assets/images/logoWh.png")}
        ></Image>
        {!noMenu && (
          <TouchableOpacity onPress={onSetVisible}>
            <Icon
              color={tailwindConfig.theme.colors["grey-slate"]}
              size={32}
              name={
                modalVisible
                  ? "fluent-systems-regular/36/000000/x.png"
                  : "material-rounded/36/000000/menu--v1.png"
              }
            ></Icon>
          </TouchableOpacity>
        )}
      </View>
      {modalVisible && (
        <View>
          <View style={tw("w-full bg-black-background-2 absolute")}>
            <Button title="Sign Out" onPress={onSignOut}></Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Header;
