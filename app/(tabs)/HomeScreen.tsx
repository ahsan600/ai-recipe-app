import GenerateRecipeInput from "@/components/GenerateRecipeInput";
import { useAuth } from "@/hooks/useAuth";
import { boldFont, mdFontSize } from "@/theme/fontTheme";
import auth from "@react-native-firebase/auth";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const userAuth = useAuth();
  const signOutUser = async () => {
    await auth().signOut();
    Toast.show({
      type: "success",
      text1: "User Sign out Successfully",
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{ paddingHorizontal: wp(4), gap: heightPercentageToDP(2) }}
        >
          <View className="flex-row items-center gap-2 justify-between">
            <View>
              <Text
                style={{
                  fontFamily: boldFont,
                  fontSize: heightPercentageToDP(mdFontSize),
                }}
              >
                Hello, {userAuth?.user?.displayName}
              </Text>
            </View>
            {/* <TouchableOpacity
            style={{
              backgroundColor: theme.colors.background(1),
              padding: heightPercentageToDP(1),
              borderRadius: wp(2),
            }}
            onPress={signOutUser}
          >
            <Text
              style={{
                fontFamily: regularFont,
                fontSize: heightPercentageToDP(1.6),
              }}
              className="text-white"
            >
              Sign Out
            </Text>
          </TouchableOpacity> */}
          </View>
          <GenerateRecipeInput />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
