import { createContext, useCallback, useMemo, useState } from "react";
import { User, UserContextType } from "../types";

export const UserContext = createContext<UserContextType>({
  usr: { id: null, nume: null },
  changeUser: (u: User) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ id: null, nume: null });

  const changeUser = useCallback(
    (u: User) => {
      setUser(u);
    },
    [user]
  );

  const userContextValue = useMemo(
    () => ({
      usr: user,
      changeUser,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
