import React, { useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { t } from "react-native-tailwindcss";

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
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
  );
};

export default Header;
