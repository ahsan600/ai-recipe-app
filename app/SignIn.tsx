import { ThemedInput } from "@/components/ThemedComponents/ThemedInput";
import { theme } from "@/theme/colorsThemes";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View className="flex-1 relative">
          <TouchableOpacity
            className="absolute z-50 rounded-full"
            style={{
              backgroundColor: theme.colors.background(0.7),
              padding: hp(1),
              top: hp(2),
              left: wp(3),
            }}
          >
            <Ionicons
              name="arrow-back-sharp"
              color="white"
              size={hp(4)}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="flex-1">
                {/* Background section */}
                <View className="items-center">
                  <Image
                    source={require("../assets/images/backgroundImage.png")}
                    style={{
                      width: hp(40),
                      height: hp(40),
                    }}
                    resizeMode="cover"
                  />
                </View>

                {/* White Card Section */}
                <View
                  className="flex-1 bg-white z-50"
                  style={{
                    borderTopEndRadius: wp(14),
                    borderTopStartRadius: wp(14),
                    paddingBottom: hp(4),
                    marginTop: hp(-8),
                    borderTopWidth: wp(0.3),
                    borderColor: theme.colors.background(1),
                  }}
                >
                  {/* Title */}
                  <View>
                    <Text
                      style={{
                        fontFamily: "roboto-bold",
                        fontSize: hp(4),
                        marginTop: hp(2),
                        textAlign: "center",
                        letterSpacing: wp(0.2),
                        color: theme.colors.background(1),
                      }}
                    >
                      Sign In
                    </Text>
                    <Text
                      style={{
                        fontFamily: "roboto-regular",
                        fontSize: hp(1.8),
                        textAlign: "center",
                        marginTop: hp(0.5),
                        color: "gray",
                      }}
                    >
                      Sign In to your account
                    </Text>
                  </View>

                  {/* Form */}
                  <View
                    style={{
                      paddingHorizontal: wp(5),
                      marginTop: hp(3),
                    }}
                  >
                    <View
                      className="flex-1"
                      style={{
                        minHeight: hp(44),
                        gap: hp(2),
                      }}
                    >
                      <View style={{ gap: hp(2) }}>
                        <ThemedInput
                          leftIcon="mail"
                          placeholder="Email"
                          inputStyle={{
                            color: "black",
                            fontFamily: "roboto-regular",
                            fontSize: hp(2.1),
                          }}
                        />
                        <ThemedInput
                          leftIcon="lock-closed"
                          placeholder="Password"
                          secureTextEntry={!showPassword}
                          rightIcon={showPassword ? "eye" : "eye-off"}
                          onRightIconPress={() =>
                            setShowPassword(!showPassword)
                          }
                          inputStyle={{
                            color: "black",
                            fontFamily: "roboto-regular",
                            fontSize: hp(2.1),
                          }}
                        />
                      </View>
                      <View
                        className="flex-1 align-end justify-end"
                        style={{
                          gap: hp(2),
                        }}
                      >
                        {/* Sign Up Button */}
                        <TouchableOpacity onPress={() => {}}>
                          <View
                            className="items-center justify-center"
                            style={{
                              backgroundColor: theme.colors.background(1),
                              borderRadius: theme.borderRadius.lg,
                              height: hp(6),
                            }}
                          >
                            <Text
                              style={{
                                color: theme.colors.text,
                                fontFamily: "roboto-bold",
                                fontSize: hp(2.5),
                              }}
                            >
                              Sign In
                            </Text>
                          </View>
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View className="flex-row justify-center items-center">
                          <Text
                            style={{
                              fontFamily: "roboto-regular",
                              fontSize: hp(1.8),
                              color: "gray",
                            }}
                          >
                            Don't have an account?{" "}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("SignUp" as never);
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "roboto-bold",
                                fontSize: hp(2),
                                color: theme.colors.background(1),
                              }}
                            >
                              Register
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
