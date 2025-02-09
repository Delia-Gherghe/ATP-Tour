import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, LogBox } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { useUserConsumer } from "../../utils/user/user.consumer";
import { useRef, useEffect } from "react";
import { Video, ResizeMode } from "expo-av";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const Home = ({ navigation }: HomeProps) => {
  LogBox.ignoreAllLogs();

  const {
    theme: { colors },
  } = useThemeConsumer();

  const { usr, changeUser } = useUserConsumer();

  const video = useRef<Video>(null);

  useEffect(() => {
    video.current?.playAsync();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 5 }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            fontStyle: "italic",
            marginTop: 10,
          }}
        >
          ITIA-App
        </Text>
        <Text style={{ fontSize: 20, marginTop: 10, color: colors.dark }}>
          Welcome, {usr.nume}!
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Video
          ref={video}
          style={{ alignSelf: "center", height: 200, width: 350 }}
          source={require("../../../assets/thisistennis.mp4")}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
        <TouchableOpacity
          style={{
            width: 150,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 1,
            backgroundColor: colors.light,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            marginTop: 30,
          }}
          onPress={() => {
            video.current?.pauseAsync();
            navigation.navigate("Theme");
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "400", color: colors.textLight }}
          >
            Change Theme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            marginTop: 30,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 1,
            backgroundColor: colors.medium,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
          onPress={() => {
            video.current?.pauseAsync();
            navigation.navigate("Profile");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: colors.textMedium,
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            marginTop: 30,
            borderRadius: 20,
            backgroundColor: colors.dark,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
          onPress={() => {
            video.current?.pauseAsync();
            changeUser({ id: null, nume: null });
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "400", color: colors.textDark }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            marginTop: 30,
          }}
          onPress={() => {
            video.current?.pauseAsync();
            navigation.navigate("About");
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: colors.dark }}
          >
            About
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
