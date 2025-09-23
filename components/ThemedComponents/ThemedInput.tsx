// ThemedInput.tsx
import { theme } from "@/theme/colorsThemes";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";


interface ThemedInputProps extends TextInputProps {}

export const ThemedInput: React.FC<ThemedInputProps> = ({
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={theme.colors.placeholder}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.inputBackground,
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
});
