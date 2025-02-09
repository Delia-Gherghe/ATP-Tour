import { NavigationContainer } from "@react-navigation/native";
import { Authentication } from "./authentication";
import { Profile } from "./profile";
import { useUserConsumer } from "../utils/user/user.consumer";

export const Navigator = () => {
  const { usr } = useUserConsumer();
  return (
    <NavigationContainer>
      {usr.id ? <Profile /> : <Authentication />}
    </NavigationContainer>
  );
};
