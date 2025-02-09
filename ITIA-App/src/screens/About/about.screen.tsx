import Ionicons from "@expo/vector-icons/Ionicons";
import { RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";

type AboutProps = NativeStackScreenProps<RootStackParamList, "About">;

export const About = ({ navigation }: AboutProps) => {
  const {
    theme: { colors },
    activeSchema,
  } = useThemeConsumer();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          paddingBottom: 5,
          borderBottomColor: colors.medium,
          borderBottomWidth: 3,
        }}
      >
        <View style={{ width: "15%" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name={"arrow-back-outline"}
            size={35}
            color={colors.dark}
          />
        </View>

        <View
          style={{
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 28 }}>About</Text>
        </View>
        <View style={{ width: "15%" }}></View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          The ITIA-App is tennis' easy to use and accessible way to ensure the
          integrity of the sport! Make sure every day that your profile is up to
          date by providing the location and time interval when our doping
          control team may find you available! Please make sure the address is
          valid by choosing one of the options that appear as you type. The one
          hour interval can be selected by providing its start time. Be aware
          that in case our team does not find you using the provided
          information, you will receive a strike and 3 strikes will result in an
          18 month ban from competition!
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
          padding: 10,
          paddingTop: 0,
        }}
      >
        <View style={{ height: 270, aspectRatio: 1.8 }}>
          <LottieView
            source={
              activeSchema === "blue"
                ? require("../../../assets/Animation-blue.json")
                : activeSchema === "green"
                ? require("../../../assets/Animation-green.json")
                : activeSchema === "purple"
                ? require("../../../assets/Animation-purple.json")
                : activeSchema === "pink"
                ? require("../../../assets/Animation-pink.json")
                : require("../../../assets/Animation-red.json")
            }
            autoPlay
            loop
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
