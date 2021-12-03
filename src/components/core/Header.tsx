import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import tailwindConfig from "../../../tailwind.config";
import useAuth from "../../hooks/useAuth";
import tw from "../../tailwind";
import Button from "./Button";
import Icon from "./Icon";
import SafeViewAndroid from "./SafeViewAndroid";

const Header = ({ noMenu }: { noMenu?: boolean }) => {
  const { t } = useTranslation(["auth", "navigation"]);
  const { user, signOut } = useAuth();
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
    [navigate, setModalVisible]
  );
  const onSignOut = useCallback(() => {
    setModalVisible(false);
    signOut(navigate);
  }, [signOut, navigate]);

  return (
    <SafeAreaView
      style={[tw("bg-black-background-2"), SafeViewAndroid.AndroidSafeArea]}
    >
      <View style={tw("flex-row items-center justify-between p-3")}>
        <Image
          style={{ width: 140, height: 45 }}
          source={require("../../assets/images/logoWh.png")}
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
              title={t("navigation:home")}
              onPress={onNavigate("Home")}
            />
            {user ? (
              <>
                <Button
                  color={
                    routes[routes.length - 1].name === "Profile"
                      ? "text-red-main"
                      : "text-white"
                  }
                  title={t("navigation:myProfile")}
                  onPress={onNavigate("Profile")}
                />
                <Button
                  color={
                    routes[routes.length - 1].name === "Settings"
                      ? "text-red-main"
                      : "text-white"
                  }
                  title={t("navigation:accountSettings")}
                  onPress={onNavigate("Settings")}
                />
                <Button
                  color="text-white"
                  title={t("auth:signOut")}
                  onPress={onSignOut}
                />
              </>
            ) : (
              <Button
                color="text-white"
                title={t("auth:signIn")}
                onPress={onNavigate("SignIn")}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Header;
