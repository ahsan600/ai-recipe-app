import { theme } from "@/theme/colorsThemes";
import {
  boldFont,
  headerFontSize,
  mdFontSize,
  regularFont,
  smFontSize,
} from "@/theme/fontTheme";
import { handleAuthError } from "@/utils/FirebaseError";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  reload,
  sendEmailVerification,
} from "@react-native-firebase/auth";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Linking,
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

interface Props {
  params: {
    email: string;
  };
}

//TODO: Implement Toastify
export default function VerificationEmailScreen() {
  const route = useRoute() as Props;
  const navigation = useNavigation() as any;
  const params = route.params;
  const [buttonLoading, setButtonLoading] = useState({
    resendEmail: false,
    openEmailApp: false,
    checkVerificationEmail: false,
  });
  const handleBackToSignIn = () => {
    navigation.navigate("SignIn" as never);
  };
  const resendVerificationEmail = async () => {
    setButtonLoading((pv) => ({ ...pv, resendEmail: true }));
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      if (!user) {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "No user found. Please sign in again.",
        });
        return;
      }
      await sendEmailVerification(user);
    } catch (error) {
      const handleError = handleAuthError(error);
      Toast.show({
        type: "error",
        text1: handleError.message,
        text2: "Please try again later",
      });
    } finally {
      setButtonLoading((pv) => ({ ...pv, resendEmail: false }));
    }
  };

  const checkEmailVerification = async () => {
    setButtonLoading((pv) => ({ ...pv, checkVerificationEmail: true }));
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (!user) {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "No user found. Please sign in again.",
        });
        return;
      }

      await reload(user);

      if (user.emailVerified) {
        Toast.show({
          type: "success",
          text1: "Email verified successfully!",
        });
        navigation.navigate("(tabs)" as never);
      } else {
        Toast.show({
          type: "error",
          text1: "Email not verified yet",
          text2: "Please check your email and verify your account",
        });
      }
    } catch (error: any) {
      const handleError = handleAuthError(error);
      Toast.show({
        type: "error",
        text1: handleError.message,
        text2: "Please try again later",
      });
    } finally {
      setButtonLoading((pv) => ({ ...pv, checkVerificationEmail: false }));
    }
  };

  const handleOpenGmailApp = async () => {
    setButtonLoading((pv) => ({ ...pv, checkVerificationEmail: true }));

    try {
      const gmailUrl = "googlegmail://";
      const canOpen = await Linking.canOpenURL(gmailUrl);

      if (canOpen) {
        await Linking.openURL(gmailUrl);
      } else {
        await Linking.openURL("mailto:");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Could not open email app",
        text2: "Please open it manually",
      });
    } finally {
      setButtonLoading((pv) => ({ ...pv, checkVerificationEmail: false }));
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "white",
      }}
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
              {/* Background section with email icon */}
              <View className="items-center">
                <View
                  style={{
                    width: hp(40),
                    height: hp(40),
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Image
                    source={require("../assets/images/backgroundImage.png")}
                    style={{
                      width: hp(40),
                      height: hp(40),
                    }}
                    resizeMode="cover"
                  />
                </View>
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
                <View style={{ paddingHorizontal: wp(5) }}>
                  <Text
                    style={{
                      fontFamily: boldFont,
                      fontSize: hp(headerFontSize),
                      marginTop: hp(3),
                      textAlign: "center",
                      letterSpacing: wp(0.2),
                      color: theme.colors.background(1),
                    }}
                  >
                    Verify Your Email
                  </Text>
                  <Text
                    style={{
                      fontFamily: regularFont,
                      fontSize: hp(smFontSize),
                      textAlign: "center",
                      marginTop: hp(1),
                      paddingHorizontal: wp(2),
                      color: "gray",
                      lineHeight: hp(2.2),
                    }}
                  >
                    {" We've sent a verification link to"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: boldFont,
                      fontSize: hp(smFontSize),
                      textAlign: "center",
                      marginTop: hp(0.5),
                      color: theme.colors.background(1),
                    }}
                  >
                    {params.email}
                  </Text>
                  <Text
                    style={{
                      fontFamily: regularFont,
                      fontSize: hp(smFontSize),
                      textAlign: "center",
                      marginTop: hp(0.5),
                      paddingHorizontal: wp(2),
                      color: "gray",
                      lineHeight: hp(2.2),
                    }}
                  >
                    {
                      " Check your spam folder if you don't see the email. The verification link will expire in 24 hours."
                    }
                  </Text>
                </View>

                {/* Action Buttons */}
                <View
                  style={{
                    paddingHorizontal: wp(5),
                    marginTop: hp(4),
                  }}
                >
                  <View
                    className="flex-1"
                    style={{
                      minHeight: hp(30),
                      gap: hp(2.5),
                    }}
                  >
                    {/* Open Email App Button */}
                    <TouchableOpacity
                      onPress={handleOpenGmailApp}
                      disabled={buttonLoading.openEmailApp}
                      style={{ opacity: buttonLoading.openEmailApp ? 0.6 : 1 }}
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
                        <Ionicons
                          name="mail-open"
                          size={hp(2.5)}
                          color={theme.colors.text}
                        />
                        <Text
                          style={{
                            color: theme.colors.text,
                            fontFamily: boldFont,
                            fontSize: hp(mdFontSize),
                          }}
                        >
                          Open Email App
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* I've Verified Button */}
                    <TouchableOpacity
                      onPress={checkEmailVerification}
                      disabled={buttonLoading.checkVerificationEmail}
                      style={{
                        opacity: buttonLoading.checkVerificationEmail ? 0.6 : 1,
                      }}
                    >
                      <View
                        className="items-center justify-center flex-row"
                        style={{
                          backgroundColor: "white",
                          borderColor: theme.colors.background(1),
                          borderWidth: 2,
                          borderRadius: theme.borderRadius.lg,
                          height: hp(6),
                          gap: wp(2),
                        }}
                      >
                        <Ionicons
                          name="checkmark-circle"
                          size={hp(2.5)}
                          color={theme.colors.background(1)}
                        />
                        <Text
                          style={{
                            color: theme.colors.background(1),
                            fontFamily: boldFont,
                            fontSize: hp(mdFontSize),
                          }}
                        >
                          {" I've Verified My Email"}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* Resend Button */}
                    <View style={{ marginTop: hp(1) }}>
                      <Text
                        style={{
                          fontFamily: regularFont,
                          fontSize: hp(smFontSize),
                          textAlign: "center",
                          color: "gray",
                        }}
                      >
                        {" Didn't receive the email?"}
                      </Text>

                      <TouchableOpacity
                        onPress={resendVerificationEmail}
                        disabled={buttonLoading.resendEmail}
                        style={{
                          opacity: buttonLoading.resendEmail ? 0.6 : 1,
                        }}
                      >
                        <View
                          className="items-center justify-center flex-row"
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: theme.borderRadius.lg,
                            height: hp(5),
                            gap: wp(2),
                          }}
                        >
                          <Text
                            style={{
                              color: theme.colors.background(1),
                              fontFamily: boldFont,
                              fontSize: hp(smFontSize),
                              textDecorationLine: "underline",
                            }}
                          >
                            Resend Verification Email
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* Back to Sign In Link */}
                    <View
                      className="flex-row justify-center items-center"
                      style={{ marginTop: hp(2) }}
                    >
                      <Text
                        style={{
                          fontFamily: regularFont,
                          fontSize: hp(smFontSize),
                          color: "gray",
                        }}
                      >
                        Want to try a different email?{" "}
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("SignIn")}
                      >
                        <Text
                          style={{
                            fontFamily: boldFont,
                            fontSize: hp(smFontSize),
                            color: theme.colors.background(1),
                          }}
                        >
                          Back to Sign In
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
