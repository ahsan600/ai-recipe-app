import { Marquee } from "@animatereactnative/marquee";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
export default function Landing() {
  const images = [
    require("../assets/images/2.jpg"),
    require("../assets/images/1.jpg"),
    require("../assets/images/4.jpg"),
    require("../assets/images/3.jpg"),
    require("../assets/images/c2.jpg"),
    require("../assets/images/5.jpg"),
    require("../assets/images/c1.jpg"),
  ];

  return (
    <GestureHandlerRootView>
      <View>
        <Marquee spacing={20} speed={1}>
          <View className="flex-row gap-2">
            {images.map((img, index) => (
              <Image
                key={index}
                source={img}
                style={{
                  width: wp(40),
                  height: hp(20),
                  resizeMode: "cover",
                  borderRadius: wp(3),
                }}
              />
            ))}
          </View>
        </Marquee>
      </View>
    </GestureHandlerRootView>
  );
}
const marqueeStyles = StyleSheet.create({
  hidden: { opacity: 0, zIndex: -1 },
  row: { flexDirection: "row", overflow: "hidden" },
});
