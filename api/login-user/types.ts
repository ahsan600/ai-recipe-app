import { AuthErrorType } from "@/types/AuthResponseType";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type LoginUserInput = {
  email: string;
  password: string;
};
export type LoginUserOutput = {
  success: boolean;
  message: string;
  data?: FirebaseAuthTypes.User | null;
  error?: AuthErrorType;
};
