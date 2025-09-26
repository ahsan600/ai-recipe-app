import { theme } from "@/theme/colorsThemes";
import {
  boldFont,
  headerFontSize,
  mdFontSize,
  regularFont,
  smFontSize,
} from "@/theme/fontTheme";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  reload,
  sendEmailVerification,
} from "@react-native-firebase/auth";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  Keyboard,
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

interface Props {
  params: {
    email: string;
  };
}

//TODO: Implement Toastify
export default function VerificationEmailScreen() {
  const route = useRoute() as Props;
  const navigation = useNavigation();
  const params = route.params;
  const handleBackToSignIn = () => {
    navigation.navigate("SignIn" as never);
  };
  const resendVerificationEmail = async () => {
    const user = getAuth().currentUser;
    if (user) {
      await sendEmailVerification(user);
    }
  };

  const checkEmailVerification = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      await reload(user);
      if (user.emailVerified) {
        console.log("✅ Email is verified!");
        navigation.navigate("HomeScreen" as never);
      } else {
        console.log("❌ Email not verified yet.");
        return false;
      }
    }

    console.log("⚠️ No user found.");
    return false;
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
                    <TouchableOpacity onPress={() => {}}>
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
                    <TouchableOpacity onPress={checkEmailVerification}>
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

                      <TouchableOpacity onPress={resendVerificationEmail}>
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
                      <TouchableOpacity onPress={() => {}}>
                        <Text
                          style={{
                            fontFamily: boldFont,
                            fontSize: hp(smFontSize),
                            color: theme.colors.background(1),
                            textDecorationLine: "underline",
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
