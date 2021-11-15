import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";

import tailwindConfig from "../../tailwind.config";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";
import Button from "./core/Button";
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
        />
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
            />
          </TouchableOpacity>
        )}
      </View>
      {modalVisible && (
        <View>
          <View style={tw("w-full bg-black-background-2")}>
            <Button
              color={
                routes[routes.length - 1].name === "Root"
                  ? "text-red-main"
                  : "text-white"
              }
              title="Home"
              onPress={onNavigate("Root")}
            />
            <Button
              color={
                routes[routes.length - 1].name === "Profile"
                  ? "text-red-main"
                  : "text-white"
              }
              title="My Profile"
              onPress={onNavigate("Profile")}
            />
            <Button
              color={
                routes[routes.length - 1].name === "Settings"
                  ? "text-red-main"
                  : "text-white"
              }
              title="Account Settings"
              onPress={onNavigate("Settings")}
            />
            <Button color="text-white" title="Sign Out" onPress={onSignOut} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Header;
