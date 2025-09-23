import { theme } from "@/theme/colorsThemes";
import { Marquee } from "@animatereactnative/marquee";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Landing() {
  const router = useRouter();
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
                        width: wp(38),
                        height: hp(19),
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
                fontFamily: "roboto-bold",
                fontSize: wp(6),
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              <Text style={{ color: theme.colors.background(1) }}>ChefAI</Text>{" "}
              – Your Personal{" "}
              <Text style={{ color: theme.colors.background(1) }}>AI Chef</Text>
              , Anytime You Want{" "}
              <Text style={{ color: theme.colors.background(1) }}>
                Effortless
              </Text>
              ,{" "}
              <Text style={{ color: theme.colors.background(1) }}>
                Delicious Recipes
              </Text>
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontFamily: "roboto-regular",
                fontSize: wp(4),
                textAlign: "center",
                letterSpacing: 0.8,
                lineHeight: wp(6),
              }}
            >
              Generate any recipe within seconds with the power of{" "}
              <FontAwesome6
                name="robot"
                size={20}
                color={theme.colors.background(1)}
              />{" "}
              <Text
                style={{
                  fontFamily: "roboto-bold",
                  fontSize: wp(5),
                  color: theme.colors.background(0.8),
                }}
              >
                AI
              </Text>
            </Text>

            <TouchableHighlight
              className=" flex items-center "
              style={{
                backgroundColor: theme.colors.background(1),
                padding: wp(3),
                marginTop: hp(1),
                borderRadius: wp(4),
              }}
              onPress={() => router.replace("/SignUp")}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: "roboto-bold",
                  fontSize: wp(4.5),
                }}
              >
                Sign In
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
