import { AuthContext } from "@/context/Auth/AuthContext";
import { useContext } from "react";
import Toast from "react-native-toast-message";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    Toast.show({
      type: "error",
      text1: "useAuth must be used within an AuthProvider",
    });
  }
  return context;
};
