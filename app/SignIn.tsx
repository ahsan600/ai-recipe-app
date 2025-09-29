import loginUser from "@/api/login-user/login-user";
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
import { sendEmailVerification } from "@react-native-firebase/auth";
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

interface SignInFormData {
  email: string;
  password: string;
}
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation() as any;
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

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setLoading(true);
    const { email, password } = data;
    try {
      const result = await loginUser({ email, password });
      const user = result.data;

      if (user && !user.emailVerified) {
        Toast.show({
          type: "error",
          text1: "Email not verified",
          text2: "Please verify your email",
        });
        await sendEmailVerification(user);
        navigation.navigate("VerificationEmailScreen");
        return;
      }

      Toast.show({
        type: "success",
        text1: "Login successfully !",
      });
      navigation.navigate("(tabs)");
    } catch (error) {
      console.log(error);
      const handelError = handleAuthError(error);
      Toast.show({
        type: "error",
        text1: handelError.message,
        text2: "Please try again",
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
          >
            <Ionicons
              name="arrow-back-sharp"
              color="white"
              size={hp(4)}
              onPress={() => navigation.navigate("Landing" as never)}
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
                      Welcome Back
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
                      Sign in to continue to your account
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
                        {/* Password */}
                        <View>
                          <Controller
                            control={control}
                            rules={{
                              required: true,
                              minLength: {
                                value: 8,
                                message:
                                  "Password must be at least 8 characters.",
                              },
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <ThemedInput
                                leftIcon="lock-closed"
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                rightIcon={showPassword ? "eye" : "eye-off"}
                                onRightIconPress={() =>
                                  setShowPassword(!showPassword)
                                }
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
                            name="password"
                          />
                          {errors.password && (
                            <Text style={{ color: "red" }}>
                              {errors.password.message ||
                                "Password is required."}
                            </Text>
                          )}
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ForgotPassword" as never)
                          }
                        >
                          <Text
                            className="text-right"
                            style={{
                              fontFamily: regularFont,
                              fontSize: hp(smFontSize),
                              color: theme.colors.background(1),
                            }}
                          >
                            Forgot Password?
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        className="flex-1 align-end justify-end"
                        style={{
                          gap: hp(2),
                        }}
                      >
                        {/* Sign Up Button */}
                        <TouchableOpacity
                          disabled={loading}
                          onPress={handleSubmit(onSubmit)}
                          style={{ opacity: loading ? 0.6 : 1 }}
                        >
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
                              {loading ? "Signing" : "Sign In"}
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
                            {"Don't have an account?"}{" "}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("SignUp" as never);
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: boldFont,
                                fontSize: hp(smFontSize),
                                color: theme.colors.background(1),
                              }}
                            >
                              Create Account
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
