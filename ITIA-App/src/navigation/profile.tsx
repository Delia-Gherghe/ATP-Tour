import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../utils/types";
import { Home } from "../screens/Home/home.screen";
import { Theme } from "../screens/ThemeChange/themechange.screen";
import { ProfileScreen } from "../screens/Profile/profile.screen";
import { About } from "../screens/About/about.screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Profile = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};
