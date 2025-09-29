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
import { handleAuthError } from "@/utils/FirebaseError";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, sendPasswordResetEmail } from "@react-native-firebase/auth";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import Toast from "react-native-toast-message";
interface ForgotPasswordFormData {
  email: string;
}
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleBackToSignIn = () => {
    navigation.navigate("SignIn" as never);
  };

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    setLoading(true);

    try {
      const { email } = data;
      await sendPasswordResetEmail(getAuth(), email);
      Toast.show({
        type: "success",
        text1: "Password reset email sent",
        text2: "Redirecting to sign-in...",
      });
      setTimeout(() => {
        navigation.navigate("SignIn" as never);
      }, 2000);
    } catch (error) {
      const handleError = handleAuthError(error);
      Toast.show({
        type: "error",
        text1: handleError.message,
        text2: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
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
                        {/* Email */}
                        <View>
                          <Controller
                            control={control}
                            rules={{
                              required: "Email Address is required.",
                              validate: (value) =>
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                "Invalid email format",
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <ThemedInput
                                leftIcon="mail"
                                placeholder="Email Address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                inputStyle={{
                                  color: "black",
                                  fontFamily: regularFont,
                                  fontSize: hp(placeHolderFontSize),
                                }}
                              />
                            )}
                            name="email"
                          />
                          {errors.email && (
                            <Text style={{ color: "red" }}>
                              {errors.email.message}
                            </Text>
                          )}
                        </View>
                      </View>

                      <View
                        className="flex-1 align-end justify-end"
                        style={{
                          gap: hp(2.5),
                        }}
                      >
                        {/* Send Reset Link Button */}
                        <TouchableOpacity
                          disabled={loading}
                          onPress={handleSubmit(onSubmit)}
                          style={{
                            opacity: loading ? 0.6 : 1,
                          }}
                        >
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
                              {loading ? "Sending..." : "Send Reset Link"}
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
