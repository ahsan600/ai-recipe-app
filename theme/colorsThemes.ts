// theme.ts
export const theme = {
  colors: {
    primary: "#E63946",
    secondary: "#F07167",
    background: (op: number) => `rgba(255, 100, 50, ${op})`,

    text: "#FFFFFF",
    inputBackground: "#FFFFFF",
    inputBorder: "#E63946",
    placeholder: "#B0B0B0",
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  fontSize: {
    sm: 14,
    md: 16,
    lg: 20,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 20,
  },
};
