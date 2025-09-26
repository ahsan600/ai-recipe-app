import { handleAuthError } from "@/utils/FirebaseError";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { LoginUserInput, LoginUserOutput } from "./types";

const loginUser = async (args: LoginUserInput): Promise<LoginUserOutput> => {
  const { email, password } = args;

  try {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    return {
      message: "User login successfully.",
      data: {
        ...userCredential.user,
      },
      success: true,
    };
  } catch (error: any) {
    console.error("Error login user:", error);
    const handleError = handleAuthError(error);

    return {
      message: handleError.message,
      error: handleError,
      data: null,
      success: false,
    };
  }
};

export default loginUser;
