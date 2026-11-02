// tabs layout
import ProtectRoute from "@/components/Auth/ProtectRoute";
import { theme } from "@/theme/colorsThemes";
import { regularFont } from "@/theme/fontTheme";
import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function TabsLayout() {
  return (
    <ProtectRoute>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.background(1),
          tabBarStyle: {
            padding: hp(10),
          },

          tabBarItemStyle: {
            paddingVertical: hp(1),
          },
        }}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            title: "Home",
            tabBarLabelStyle: {
              fontSize: wp(regularFont),
            },
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/homeIcon.png")}
                style={{
                  width: hp(5),
                  height: hp(5),
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ExploreScreen"
          options={{
            title: "Explore",
            tabBarLabelStyle: {
              fontSize: wp(regularFont),
            },
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/dishIcon.png")}
                style={{
                  width: hp(5),
                  height: hp(5),
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="CookBookScreen"
          options={{
            title: "CookBook",
            tabBarLabelStyle: {
              fontSize: wp(regularFont),
            },
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/bookIcon.png")}
                style={{
                  width: hp(5),
                  height: hp(5),
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            title: "Profile",
            tabBarLabelStyle: {
              fontSize: wp(regularFont),
            },
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/personIcon.png")}
                style={{
                  width: hp(5),
                  height: hp(5),
                }}
              />
            ),
          }}
        />
      </Tabs>
    </ProtectRoute>
  );
}
