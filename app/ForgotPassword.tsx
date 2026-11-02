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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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

export default function ForgotPassword() {
  const navigation = useNavigation();

  const handleBackToSignIn = () => {
    navigation.navigate("SignIn" as never);
  };

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
            onPress={handleBackToSignIn}
          >
            <Ionicons name="arrow-back-sharp" color="white" size={hp(4)} />
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
                        fontFamily: boldFont,
                        fontSize: hp(headerFontSize),
                        marginTop: hp(2),
                        textAlign: "center",
                        letterSpacing: wp(0.2),
                        color: theme.colors.background(1),
                      }}
                    >
                      Forgot Password
                    </Text>
                    <Text
                      style={{
                        fontFamily: regularFont,
                        fontSize: hp(smFontSize),
                        textAlign: "center",
                        marginTop: hp(0.5),
                        paddingHorizontal: wp(8),
                        color: "gray",
                        lineHeight: hp(2.2),
                      }}
                    >
                      {
                        "  Enter your email address and we'll send you a link to reset your password"
                      }
                    </Text>
                  </View>

                  {/* Form */}
                  <View
                    style={{
                      paddingHorizontal: wp(5),
                      marginTop: hp(4),
                    }}
                  >
                    <View
                      className="flex-1"
                      style={{
                        minHeight: hp(35),
                        gap: hp(3),
                      }}
                    >
                      {/* Email Input */}
                      <View style={{ gap: hp(1) }}>
                        <Text
                          style={{
                            fontFamily: regularFont,
                            fontSize: hp(smFontSize),
                            color: theme.colors.background(1),
                            marginLeft: wp(1),
                          }}
                        >
                          Email Address
                        </Text>
                        <ThemedInput
                          leftIcon="mail"
                          placeholder="Enter your email address"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoComplete="email"
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
                          gap: hp(2.5),
                        }}
                      >
                        {/* Send Reset Link Button */}
                        <TouchableOpacity>
                          <View
                            className="items-center justify-center flex-row"
                            style={{
                              backgroundColor: theme.colors.background(1),
                              borderRadius: theme.borderRadius.lg,
                              height: hp(6),
                              gap: wp(2),
                            }}
                          >
                            <Text
                              style={{
                                color: theme.colors.text,
                                fontFamily: boldFont,
                                fontSize: hp(mdFontSize),
                              }}
                            >
                              Send Reset Link
                            </Text>
                          </View>
                        </TouchableOpacity>

                       

                        {/* Back to Sign In Link */}
                        <View className="flex-row justify-center items-center">
                          <Text
                            style={{
                              fontFamily: regularFont,
                              fontSize: hp(smFontSize),
                              color: "gray",
                            }}
                          >
                            Remember your password?{" "}
                          </Text>
                          <TouchableOpacity onPress={handleBackToSignIn}>
                            <Text
                              style={{
                                fontFamily: boldFont,
                                fontSize: hp(smFontSize),
                                color: theme.colors.background(1),
                              }}
                            >
                              Sign In
                            </Text>
                          </TouchableOpacity>
                        </View>

                        {/* Additional Help */}
                        <View
                          className="items-center"
                          style={{ marginTop: hp(2) }}
                        >
                          <Text
                            style={{
                              fontFamily: regularFont,
                              fontSize: hp(smFontSize),
                              color: "gray",
                              textAlign: "center",
                              paddingHorizontal: wp(4),
                              lineHeight: hp(2),
                            }}
                          >
                            {
                              " If you don't receive an email within a few minutes, please check your spam folder or contact support"
                            }
                          </Text>
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
