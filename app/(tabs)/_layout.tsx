// tabs layout
import ProtectRoute from "@/components/Auth/ProtectRoute";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <ProtectRoute>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="HomeScreen"
          options={{
            title: "Home",
          }}
        />
      </Tabs>
    </ProtectRoute>
  );
}
