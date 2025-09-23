import { theme } from "@/theme/colorsThemes";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.placeholder}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background(0.1),
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.colors.background(0.9),
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    width: "85%",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.lg,
    textAlign: "center",
    marginBottom: theme.spacing.md,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.inputBackground,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  buttonText: {
    color: "#fff",
    fontSize: theme.fontSize.md,
    fontWeight: "bold",
  },
  link: {
    marginTop: theme.spacing.sm,
    textAlign: "center",
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
  },
});
