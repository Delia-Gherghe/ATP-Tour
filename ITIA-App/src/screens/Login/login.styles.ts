import { StyleSheet } from "react-native";
import { ThemeColors } from "../../utils/theme/colors";

export const loginStyles = (colors: ThemeColors) => StyleSheet.create(
    {
        authContainer: {
            width: "86%",
            margin: "7%",
            flex: 1,
            justifyContent: "center",
          },
          errorMessage: {
            color: "#ba1a1a",
            fontWeight: "500",
            fontSize: 14,
          },
          signInLabel: {
            marginBottom: 20,
            fontSize: 22,
            fontWeight: "700",
          },
          signInButton: {
            marginVertical: 20,
            borderRadius: 20,
            backgroundColor: colors.dark,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          },
          signInText: {
            fontSize: 14,
            fontWeight: "400",
            color: colors.textDark,
          },
          passwordInput: {
            marginTop: 12,
          },
          input: {
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 10,
            color: "#1b1b1f",
            paddingHorizontal: 20,
            borderColor: "#1b1b1f",
            marginTop: 8,
          },
          orContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 16,
          },
          orContainerLine: {
            height: 1,
            backgroundColor: "#1b1b1f",
            flex: 0.48,
          },
          technical: {
            fontSize: 12,
            fontWeight: "300",
          },
          newAccount: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          },
          createNewAccount: {
            color: "#343dff",
            textAlign: "center",
          },
    }
)