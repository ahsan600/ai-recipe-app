import { theme } from "@/theme/colorsThemes";
import { boldFont, mdFontSize, regularFont } from "@/theme/fontTheme";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function GenerateRecipeInput() {
  return (
    <View className="flex-1 rounded-2xl shadow-lg p-2 bg-white" style={{}}>
      {/* Image */}
      <View className="items-center">
        <Image
          source={require("@/assets/images/cooking.gif")}
          style={{
            width: heightPercentageToDP(28),
            height: heightPercentageToDP(20),
            borderRadius: heightPercentageToDP(1.5),
          }}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text
        className="text-center text-white font-bold"
        style={{
          color: theme.colors.background(1),
          fontSize: heightPercentageToDP(3),
          fontFamily: boldFont,
        }}
      >
        🍳 AI Recipe Generator
      </Text>

      {/* Description */}
      <Text
        className="text-center mt-2"
        style={{
          fontSize: heightPercentageToDP(2),
          fontFamily: regularFont,
          lineHeight: heightPercentageToDP(2.2),
          letterSpacing: widthPercentageToDP(0.3),
          paddingHorizontal: heightPercentageToDP(2),
        }}
      >
        Enter your ingredients and let AI create delicious, step-by-step recipes
        for you.
      </Text>

      {/* Input Section */}
      <View
        className="w-full"
        style={{
          borderRadius: heightPercentageToDP(1.5),
          padding: heightPercentageToDP(1.5),
          marginTop: heightPercentageToDP(0.4),
        }}
      >
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="e.g. Chicken, Rice, Onion..."
          className="text-black rounded-xl"
          style={{
            minHeight: heightPercentageToDP(15),
            textAlignVertical: "top",
            color: "black",
            padding: widthPercentageToDP(4),
            fontSize: heightPercentageToDP(1.8),
            fontFamily: regularFont,
            backgroundColor: theme.colors.background(0.2),
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          paddingHorizontal: widthPercentageToDP(2),
        }}
      >
        <View
          className="items-center justify-center"
          style={{
            backgroundColor: theme.colors.background(1),
            borderRadius: theme.borderRadius.lg,
            height: heightPercentageToDP(6),
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: boldFont,
              fontSize: heightPercentageToDP(mdFontSize),
            }}
          >
            Generate
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
