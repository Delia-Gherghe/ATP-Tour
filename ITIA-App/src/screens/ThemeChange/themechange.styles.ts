import { StyleSheet } from "react-native";

export const themeChangeStyles = () =>
  StyleSheet.create({
    button: {
      width: 150,
      marginVertical: 30,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
    },
    text: {
      fontSize: 16,
      fontWeight: "500",
    },
  });