import registerUser from "@/api/register-user/register-user";
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
interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

//TODO: Implement Toastify
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation() as any;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setLoading(true);
    const { fullName, email, password } = data;
    try {
      const result = await registerUser({
        email,
        fullName,
        password,
      });

      if (result.success) {
        reset();

        Toast.show({
          type: "success",
          text1: "Registration Successful",
          text2: "Verification email sent",
        });
        navigation.navigate("VerificationEmailScreen" as never, {
          email: email,
        });
      } else {
        Toast.show({
          type: "error",
          text1: result.error?.message,
        });
      }
    } catch (error) {
      const handleError = handleAuthError(error);
      Toast.show({
        type: "success",
        text1: handleError.message,
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
                        {/* Full Name */}
                        <View>
                          <Controller
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <ThemedInput
                                leftIcon="person"
                                placeholder="Full Name"
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
                            name="fullName"
                          />
                          {errors.fullName && (
                            <Text style={{ color: "red" }}>
                              Full Name is required.
                            </Text>
                          )}
                        </View>

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

                        {/* Confirm Password */}
                        <View>
                          <Controller
                            control={control}
                            rules={{
                              required: "Please confirm your password.",
                              validate: (value, formData) =>
                                value === formData.password ||
                                "Passwords do not match.",
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <ThemedInput
                                leftIcon="lock-closed"
                                placeholder="Confirm Password"
                                secureTextEntry={!showConfirmPassword}
                                rightIcon={
                                  showConfirmPassword ? "eye" : "eye-off"
                                }
                                onRightIconPress={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
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
                            name="confirmPassword"
                          />
                          {errors.confirmPassword && (
                            <Text style={{ color: "red" }}>
                              {errors.confirmPassword.message}
                            </Text>
                          )}
                        </View>
                      </View>

                      {/* Buttons */}
                      <View
                        className="flex-1 align-end justify-end"
                        style={{
                          gap: hp(2),
                        }}
                      >
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
                              {loading ? "Signing Up..." : "Sign Up"}
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
                              Sign In
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
