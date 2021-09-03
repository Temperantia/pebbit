/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { t } from "react-native-tailwindcss";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import tailwindConfig from "../tailwind.config";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...tailwindConfig.theme.colors,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme} linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          header: () => (
            <SafeAreaView>
              <View style={[t.flexRow, t.justifyBetween]}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/images/favicon.png")}
                ></Image>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
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
                  ></View>
                </View>
              )}
            </SafeAreaView>
          ),
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
