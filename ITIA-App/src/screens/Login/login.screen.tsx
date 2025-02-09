import { loginStyles } from "./login.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Player, RootStackParamList } from "../../utils/types";
import { useEffect, useState } from "react";
import * as Crypto from "expo-crypto";
import { useUserConsumer } from "../../utils/user/user.consumer";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import Constants from "expo-constants";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

export const Login = ({ navigation }: LoginProps) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const {
    theme: { colors },
  } = useThemeConsumer();

  const { changeUser } = useUserConsumer();

  const [error, setError] = useState("");

  const [player, setPlayer] = useState<Player>();
  const [hash, setHash] = useState("");

  const styles = loginStyles(colors);

  const convertSHA = async () => {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${
        loginForm.password
      }NC8SVB9DTQ6ZK810PXLG${loginForm.username.toUpperCase()}0PXLGWZUJSA`
    );
    setHash(digest.toUpperCase());
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.4:8088/ords/atp_tour/itiaservice/isplayer?nume_user=${encodeURIComponent(
          loginForm.username
        )}&parola=${encodeURIComponent(hash)}`
      );
      const json = await response.json();
      setPlayer(json);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (hash != "") {
      handleLogin();
    }
  }, [hash]);

  useEffect(() => {
    if (player && player!.mesaj != "mesaj") {
      setError(player!.mesaj);
    } else if (player && player!.mesaj == "mesaj") {
      setError("");
      changeUser({ id: player!.cod, nume: player!.nume });
    }
  }, [player]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.authContainer}>
        <Text style={styles.signInLabel}>Sign In</Text>
        <View>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            value={loginForm.username}
            autoCapitalize="sentences"
            autoCorrect={false}
            onChangeText={(text) =>
              setLoginForm({
                ...loginForm,
                username: text,
              })
            }
          />
        </View>
        <View>
          <Text style={styles.passwordInput}>Password</Text>
          <TextInput
            style={styles.input}
            value={loginForm.password}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) =>
              setLoginForm({
                ...loginForm,
                password: text,
              })
            }
          />
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={convertSHA}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
        {error && (
          <Text style={[styles.technical, styles.errorMessage]}>{error}</Text>
        )}
        <View style={styles.orContainer}>
          <View style={styles.orContainerLine} />
          <Text style={styles.technical}>OR</Text>
          <View style={styles.orContainerLine} />
        </View>
        <View style={styles.newAccount}>
          <Text style={styles.technical}>Don't have an account?</Text>
        </View>
        <View style={styles.newAccount}>
          <Text style={[styles.technical, styles.createNewAccount]}>
            Create one on www.atptour.com and get registered as an ATP player!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
