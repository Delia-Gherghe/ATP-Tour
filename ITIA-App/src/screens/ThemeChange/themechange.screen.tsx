import { SafeAreaView } from "react-native-safe-area-context";
import {
  TouchableOpacity,
  View,
  Text,
  useAnimatedValue,
  Animated,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import {
  blueColors,
  greenColors,
  purpleColors,
  pinkColors,
  redColors,
} from "../../utils/theme/colors";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themeChangeStyles } from "./themechange.styles";

type ThemeProps = NativeStackScreenProps<RootStackParamList, "Theme">;

export const Theme = ({ navigation }: ThemeProps) => {
  const {
    changeTheme,
    theme: { colors },
  } = useThemeConsumer();

  const rotateBlue = useAnimatedValue(0);
  const rotatePink = useAnimatedValue(0);
  const rotateGreen = useAnimatedValue(0);
  const rotatePurple = useAnimatedValue(0);
  const rotateRed = useAnimatedValue(0);

  const handleBlueAnimation = () => {
    Animated.timing(rotateBlue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 400,
    }).start(() => {
      rotateBlue.setValue(0);
    });
  };

  const handlePinkAnimation = () => {
    Animated.timing(rotatePink, {
      toValue: 1,
      useNativeDriver: true,
      delay: 100,
      duration: 400,
    }).start(() => {
      rotatePink.setValue(0);
    });
  };

  const handleGreenAnimation = () => {
    Animated.timing(rotateGreen, {
      toValue: 1,
      useNativeDriver: true,
      delay: 200,
      duration: 400,
    }).start(() => {
      rotateGreen.setValue(0);
    });
  };

  const handlePurpleAnimation = () => {
    Animated.timing(rotatePurple, {
      toValue: 1,
      useNativeDriver: true,
      delay: 300,
      duration: 400,
    }).start(() => {
      rotatePurple.setValue(0);
    });
  };

  const handleRedAnimation = () => {
    Animated.timing(rotateRed, {
      toValue: 1,
      useNativeDriver: true,
      delay: 400,
      duration: 400,
    }).start(() => {
      rotateRed.setValue(0);
    });
  };

  useEffect(() => {
    handleBlueAnimation();
    handlePinkAnimation();
    handleGreenAnimation();
    handlePurpleAnimation();
    handleRedAnimation();
  }, []);

  const styles = themeChangeStyles();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          padding: 10,
          borderBottomColor: colors.medium,
          borderBottomWidth: 3,
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          name={"arrow-back-outline"}
          size={35}
          color={colors.dark}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.dark, fontSize: 24, fontWeight: "600" }}>
          Pick your favorite color!
        </Text>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateBlue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={[{ backgroundColor: blueColors.medium }, styles.button]}
              onPress={() => changeTheme("blue")}
            >
              <Text
                style={[
                  {
                    color: blueColors.textMedium,
                  },
                  styles.text,
                ]}
              >
                Blue
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotatePink.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={[{ backgroundColor: pinkColors.medium }, styles.button]}
              onPress={() => changeTheme("pink")}
            >
              <Text
                style={[
                  {
                    color: pinkColors.textMedium,
                  },
                  styles.text,
                ]}
              >
                Pink
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateGreen.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={[
                {
                  backgroundColor: greenColors.medium,
                },
                styles.button,
              ]}
              onPress={() => changeTheme("green")}
            >
              <Text
                style={[
                  {
                    color: greenColors.textMedium,
                  },
                  styles.text,
                ]}
              >
                Green
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotatePurple.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={[
                {
                  backgroundColor: purpleColors.medium,
                },
                styles.button,
              ]}
              onPress={() => changeTheme("purple")}
            >
              <Text
                style={[
                  {
                    color: purpleColors.textMedium,
                  },
                  styles.text,
                ]}
              >
                Purple
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateRed.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={[
                {
                  backgroundColor: redColors.medium,
                },
                styles.button,
              ]}
              onPress={() => changeTheme("red")}
            >
              <Text
                style={[
                  {
                    color: redColors.textMedium,
                  },
                  styles.text,
                ]}
              >
                Red
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};
