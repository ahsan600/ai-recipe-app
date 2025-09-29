import { getAuth, signOut } from "@react-native-firebase/auth";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const signOutUser = async () => {
    await signOut(getAuth());
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signOutUser}>
        <Text>SignOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
