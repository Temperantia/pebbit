import { useNavigation } from "@react-navigation/core";
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
  const { navigate, getState } = useNavigation();
  const { routes } = getState();
  const [modalVisible, setModalVisible] = useState(false);

  const onSetVisible = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [setModalVisible, modalVisible]);
  const onNavigate = useCallback(
    (route: string) => () => {
      setModalVisible(false);
      navigate(route);
    },
    [navigate]
  );
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
                  ? "small/36/000000/delete-sign.png"
                  : "material-rounded/36/000000/menu--v1.png"
              }
            ></Icon>
          </TouchableOpacity>
        )}
      </View>
      {modalVisible && (
        <View>
          <View style={tw("w-full bg-black-background-2 absolute")}>
            <Button
              color={
                tailwindConfig.theme.colors[
                  routes[routes.length - 1].name === "Root"
                    ? "red-main"
                    : "white"
                ]
              }
              title="Home"
              onPress={onNavigate("Root")}
            ></Button>
            <Button
              color={
                tailwindConfig.theme.colors[
                  routes[routes.length - 1].name === "Profile"
                    ? "red-main"
                    : "white"
                ]
              }
              title="My Profile"
              onPress={onNavigate("Profile")}
            ></Button>
            <Button
              color={
                tailwindConfig.theme.colors[
                  routes[routes.length - 1].name === "Settings"
                    ? "red-main"
                    : "white"
                ]
              }
              title="Account Settings"
              onPress={onNavigate("Settings")}
            ></Button>
            <Button
              color={tailwindConfig.theme.colors.white}
              title="Sign Out"
              onPress={onSignOut}
            ></Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Header;
