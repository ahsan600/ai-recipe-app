// ThemedText.tsx
import { theme } from "@/theme/colorsThemes";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface ThemedTextProps extends TextProps {
  variant?: "sm" | "md" | "lg";
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = "md",
  style,
  ...props
}) => {
  return (
    <Text style={[styles[variant], style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  sm: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  md: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  lg: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.text,
  },
});
