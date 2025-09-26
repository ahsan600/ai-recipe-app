import { AuthErrorType } from "@/types/AuthResponseType";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type LoginUserInput = {
  fullName: string;
  email: string;
  password: string;
};
export type LoginUserOutput = {
  success: boolean;
  message: string;
  data?: FirebaseAuthTypes.User | null;
  error?: AuthErrorType;
};
