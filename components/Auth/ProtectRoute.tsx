import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";

export default function ProtectRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const user = auth?.user;
  const navigation = useNavigation();

  const validateUser = () => {
    if (!user) {
      navigation.navigate("Landing" as never);
    }
  };

  useEffect(() => {
    validateUser();
  }, [user, navigation]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
