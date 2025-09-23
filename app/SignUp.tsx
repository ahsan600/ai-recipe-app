import { theme } from "@/theme/colorsThemes";
import React from "react";
import { Image, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

//TODO: Complete the SignUp
export default function SignUp() {
  return (
    <SafeAreaView className="flex-1 bg-red-950">
      <View className="flex-1">
        {/* Background section */}
        <View className="bg-blue-950 items-center">
          <Image source={require("../assets/images/backgroundImage.png")} />
        </View>
        <View
          className="flex-1"
          style={{
            backgroundColor: theme.colors.background(1),
            paddingHorizontal: wp(4),
            borderTopEndRadius: wp(2),
            borderTopStartRadius: wp(2),
          }}
        >
          <Text>Hi</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
