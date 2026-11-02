import { AuthErrorType } from "@/types/AuthResponseType";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type RegisterUserInput = {
  fullName: string;
  email: string;
  password: string;
};
export type RegisterUserOutput = {
  success: boolean;
  message: string;
  data?: FirebaseAuthTypes.User | null;
  error?: AuthErrorType;
};
