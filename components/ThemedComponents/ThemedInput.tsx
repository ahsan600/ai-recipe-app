// ThemedInput.tsx
import { theme } from "@/theme/colorsThemes";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

interface ThemedInputProps extends TextInputProps {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
  isPassword?: boolean;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({
  style,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  iconSize = 2.3,
  iconColor = theme.colors.placeholder,
  isPassword = false,
  secureTextEntry,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Handle password visibility toggle
  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Determine if we should show password toggle
  const showPasswordToggle = isPassword && !rightIcon;
  const actualRightIcon = showPasswordToggle
    ? isPasswordVisible
      ? "eye-outline"
      : "eye-off-outline"
    : rightIcon;

  const actualOnRightIconPress = showPasswordToggle
    ? handlePasswordToggle
    : onRightIconPress;

  // Determine secure text entry
  const actualSecureTextEntry = isPassword
    ? !isPasswordVisible
    : secureTextEntry;

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
        containerStyle,
      ]}
    >
      {/* Left Icon */}
      {leftIcon && (
        <View style={styles.leftIconContainer}>
          <Ionicons
            name={leftIcon}
            size={heightPercentageToDP(iconSize)}
            color={isFocused ? theme.colors.primary : iconColor}
          />
        </View>
      )}

      {/* Text Input */}
      <TextInput
        style={[
          styles.input,
          leftIcon && styles.inputWithLeftIcon,
          (actualRightIcon || showPasswordToggle) && styles.inputWithRightIcon,
          inputStyle,
          style,
        ]}
        placeholderTextColor={theme.colors.placeholder}
        secureTextEntry={actualSecureTextEntry}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />

      {/* Right Icon */}
      {(actualRightIcon || showPasswordToggle) && (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={actualOnRightIconPress}
          disabled={!actualOnRightIconPress}
        >
          <Ionicons
            name={actualRightIcon as keyof typeof Ionicons.glyphMap}
            size={heightPercentageToDP(iconSize)}
            color={isFocused ? theme.colors.primary : iconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBackground,
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    minHeight: heightPercentageToDP(2), // Ensure consistent height
  },
  containerFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    minHeight: 46, // Slightly less than container to account for border
  },
  inputWithLeftIcon: {},
  inputWithRightIcon: {},
  leftIconContainer: {
    paddingLeft: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIconContainer: {
    paddingRight: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    minWidth: 44,
  },
});

// Export additional component variants for common use cases
export const ThemedPasswordInput: React.FC<
  Omit<ThemedInputProps, "isPassword">
> = (props) => <ThemedInput {...props} isPassword={true} />;

export const ThemedEmailInput: React.FC<ThemedInputProps> = (props) => (
  <ThemedInput
    {...props}
    leftIcon="mail-outline"
    keyboardType="email-address"
    autoCapitalize="none"
    autoComplete="email"
  />
);

export const ThemedSearchInput: React.FC<ThemedInputProps> = (props) => (
  <ThemedInput {...props} leftIcon="search-outline" placeholder="Search..." />
);

export const ThemedPhoneInput: React.FC<ThemedInputProps> = (props) => (
  <ThemedInput
    {...props}
    leftIcon="call-outline"
    keyboardType="phone-pad"
    autoComplete="tel"
  />
);
