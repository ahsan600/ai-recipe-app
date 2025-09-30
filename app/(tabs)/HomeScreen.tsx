import auth from "@react-native-firebase/auth";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const signOutUser = async () => {
    await auth().signOut();
    Toast.show({
      type: "success",
      text1: "User Sign out Successfully",
    });
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signOutUser}>
        <Text>SignOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
