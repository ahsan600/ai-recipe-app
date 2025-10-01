import { mdFontSize } from "@/theme/fontTheme";
import React from "react";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { ThemedInput } from "./ThemedComponents/ThemedInput";

export default function GenerateRecipeInput() {
  return (
    <View className="flex-1 ">
      {/* Image Card */}
      <View
        className="items-center flex-1"
        style={{
          borderRadius: heightPercentageToDP(4),
        }}
      >
        <Image
          source={require("@/assets/images/cooking.gif")}
          style={{
            width: heightPercentageToDP(30),
            height: heightPercentageToDP(20),
          }}
        />

        {/* Title */}
        <Text
          className="text-white"
          style={{
            fontSize: heightPercentageToDP(mdFontSize),
          }}
        >
          AI Recipe Generator
        </Text>

        {/* Description */}
        <Text
          style={{
            fontSize: heightPercentageToDP(2),
            textAlign: "center",
            paddingHorizontal: heightPercentageToDP(2),
          }}
        >
          Enter your ingredients and let AI create delicious, step-by-step
          recipes for you.
        </Text>

        {/* Recipe Generator Input */}
        <View
          className="w-full bg-blue-900"
          style={{
            paddingHorizontal: heightPercentageToDP(1),
          }}
        >
          <ThemedInput className="flex-1" />
        </View>
      </View>
    </View>
  );
}
