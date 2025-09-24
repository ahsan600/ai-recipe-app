import { ThemedInput } from "@/components/ThemedComponents/ThemedInput";
import { theme } from "@/theme/colorsThemes";
import {
  boldFont,
  headerFontSize,
  mdFontSize,
  placeHolderFontSize,
  regularFont,
  smFontSize,
} from "@/theme/fontTheme";
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

export default function SignUp() {
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
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
                  className="flex-1 bg-white  z-50"
                  style={{
                    borderTopEndRadius: wp(14),
                    borderTopStartRadius: wp(14),
                    marginTop: hp(-8),
                    borderTopWidth: wp(0.3),
                    borderColor: theme.colors.background(1),
                  }}
                >
                  {/* Title */}
                  <View>
                    <Text
                      style={{
                        fontFamily: boldFont,
                        fontSize: hp(headerFontSize),
                        marginTop: hp(2),
                        textAlign: "center",
                        letterSpacing: wp(0.2),
                        color: theme.colors.background(1),
                      }}
                    >
                      Sign Up
                    </Text>
                    <Text
                      style={{
                        fontFamily: regularFont,
                        fontSize: hp(smFontSize),
                        textAlign: "center",
                        marginTop: hp(0.5),
                        color: "gray",
                      }}
                    >
                      Create your account to get started
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
                          leftIcon="person"
                          placeholder="Full Name"
                          inputStyle={{
                            color: "black",
                            fontFamily: regularFont,
                            fontSize: hp(placeHolderFontSize),
                          }}
                        />
                        <ThemedInput
                          leftIcon="mail"
                          placeholder="Email"
                          inputStyle={{
                            color: "black",
                            fontFamily: regularFont,
                            fontSize: hp(placeHolderFontSize),
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
                            fontFamily: regularFont,
                            fontSize: hp(placeHolderFontSize),
                          }}
                        />
                        <ThemedInput
                          leftIcon="lock-closed"
                          placeholder="Confirm Password"
                          secureTextEntry={!showConfirmPassword}
                          rightIcon={showConfirmPassword ? "eye" : "eye-off"}
                          onRightIconPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          inputStyle={{
                            color: "black",
                            fontFamily: regularFont,
                            fontSize: hp(placeHolderFontSize),
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
                              marginTop: hp(2),
                            }}
                          >
                            <Text
                              style={{
                                color: theme.colors.text,
                                fontFamily: boldFont,
                                fontSize: hp(mdFontSize),
                              }}
                            >
                              Sign Up
                            </Text>
                          </View>
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View className="flex-row justify-center items-center">
                          <Text
                            style={{
                              fontFamily: regularFont,
                              fontSize: hp(smFontSize),
                              color: "gray",
                            }}
                          >
                            Already have an account?{" "}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("SignIn" as never);
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: boldFont,
                                fontSize: hp(smFontSize),
                                color: theme.colors.background(1),
                              }}
                            >
                              Login
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
