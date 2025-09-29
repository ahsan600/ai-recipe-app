import { handleAuthError } from "@/utils/FirebaseError";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "@react-native-firebase/auth";
import { RegisterUserInput, RegisterUserOutput } from "./types";

const registerUser = async (
  args: RegisterUserInput
): Promise<RegisterUserOutput> => {
  const { fullName, email, password } = args;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    await Promise.all([
      updateProfile(userCredential.user, { displayName: fullName }),
      sendEmailVerification(userCredential.user),
    ]);
    return {
      message: "User registered successfully.",
      data: {
        ...userCredential.user,
        displayName: fullName,
      },
      success: true,
    };
  } catch (error: any) {
    const handleError = handleAuthError(error);

    return {
      message: handleError.message,
      error: handleError,
      data: null,
      success: false,
    };
  }
};

export default registerUser;
