import { createContext, useCallback, useMemo, useState } from "react";
import {
  blueTheme,
  greenTheme,
  purpleTheme,
  pinkTheme,
  redTheme,
} from "./theme";

type ThemeSchemaProps = "blue" | "green" | "purple" | "pink" | "red";

export const ThemeContext = createContext({
  theme: blueTheme,
  changeTheme: (color: ThemeSchemaProps) => {},
  activeSchema: "blue",
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeSchema, setThemeSchema] = useState<ThemeSchemaProps>("blue");
  const activeTheme =
    themeSchema === "blue"
      ? blueTheme
      : themeSchema === "green"
      ? greenTheme
      : themeSchema === "purple"
      ? purpleTheme
      : themeSchema === "pink"
      ? pinkTheme
      : redTheme;

  const changeTheme = useCallback(
    (color: ThemeSchemaProps) => {
      setThemeSchema(color);
    },
    [themeSchema]
  );

  const contextValue = useMemo(
    () => ({
      theme: activeTheme,
      changeTheme,
      activeSchema: themeSchema,
    }),
    [themeSchema]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
