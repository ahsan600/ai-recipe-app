import { font } from "@/theme/fontTheme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  const [loaded, error] = useFonts(font);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Landing" />
      <Stack.Screen name="ForgotPassword" />
      <Stack.Screen name="VerificationEmailScreen" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
