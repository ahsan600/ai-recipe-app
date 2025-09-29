import { theme } from "@/theme/colorsThemes";
import {
  boldFont,
  lgFontSize,
  mdFontSize,
  xlFontSize,
} from "@/theme/fontTheme";
import { Marquee } from "@animatereactnative/marquee";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Landing() {
  const navigation = useNavigation() as any;
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
      <SafeAreaView>
        <View>
          <View>
            {[1.2, 0.5, 0.9].map((_, index) => (
              <Marquee
                key={index}
                spacing={20}
                speed={_}
                style={{
                  transform: [{ rotate: "-6deg" }],
                }}
              >
                <View className="flex-row gap-2 mt-4">
                  {images.map((img, index) => (
                    <Image
                      key={index}
                      source={img}
                      style={{
                        width: hp(20),
                        height: hp(18),
                        resizeMode: "cover",
                        borderRadius: wp(3),
                      }}
                    />
                  ))}
                </View>
              </Marquee>
            ))}
          </View>
          <View
            style={{
              marginTop: wp(8),
              paddingHorizontal: wp(4),
              gap: wp(3),
            }}
          >
            {/* Title */}
            <Text
              style={{
                fontFamily: boldFont,
                fontSize: wp(xlFontSize),
                textAlign: "center",
                letterSpacing: wp(0.4),
                lineHeight: wp(xlFontSize * 1.4), // better spacing
              }}
            >
              <Text style={{ color: theme.colors.background(1) }}>ChefAI</Text>
              {" – Your Personal "}
              <Text style={{ color: theme.colors.background(1) }}>AI Chef</Text>
              {"\nAnytime You Want.\n"}
              <Text style={{ color: theme.colors.background(1) }}>
                Effortless
              </Text>
              {", "}
              <Text style={{ color: theme.colors.background(1) }}>
                Delicious Recipes
              </Text>
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontFamily: boldFont,
                fontSize: wp(lgFontSize),
                textAlign: "center",
                letterSpacing: wp(0.4),
              }}
            >
              Generate any recipe within seconds with the power of{" "}
              <FontAwesome6
                name="robot"
                size={wp(6)}
                color={theme.colors.background(1)}
              />{" "}
              <Text
                style={{
                  fontFamily: boldFont,
                  fontSize: wp(xlFontSize),
                  color: theme.colors.background(0.8),
                }}
              >
                AI
              </Text>
            </Text>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VerificationEmailScreen", {
                  email: "testing@gmail.com",
                })
              }
            >
              <View
                className="items-center justify-center"
                style={{
                  backgroundColor: theme.colors.background(1),
                  borderRadius: theme.borderRadius.lg,
                  height: hp(6),
                  marginTop: hp(2),
                }}
              >
                <Text
                  style={{
                    color: theme.colors.text,
                    fontFamily: boldFont,
                    fontSize: hp(mdFontSize),
                  }}
                >
                  Get Started
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
