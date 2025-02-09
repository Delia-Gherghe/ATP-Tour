import { useContext } from "react";
import { UserContext } from "./user.provider";

export const useUserConsumer = () => useContext(UserContext);
