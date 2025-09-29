import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
