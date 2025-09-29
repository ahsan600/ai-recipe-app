import { theme } from "@/theme/colorsThemes";
import { font } from "@/theme/fontTheme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
export default function RootLayout() {
  const [loaded, error] = useFonts(font);
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: theme.colors.background(1) }}
        text1Style={{
          fontSize: 14,
          fontWeight: "bold",
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
          fontWeight: "bold",
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
  };
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Landing" />
        <Stack.Screen name="ForgotPassword" />
        <Stack.Screen name="VerificationEmailScreen" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
}
