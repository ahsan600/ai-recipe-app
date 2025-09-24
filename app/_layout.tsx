import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // "roboto-bold": require("../assets/fonts/Roboto_Condensed-Bold.ttf"),
    // "roboto-regular": require("../assets/fonts/Roboto_Condensed-Regular.ttf"),
  });
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Landing" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
