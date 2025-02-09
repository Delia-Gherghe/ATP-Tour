import { ThemeColors, blueColors, purpleColors, pinkColors, redColors, greenColors } from "./colors";

export type AppTheme = {
  colors: ThemeColors;
};

export const blueTheme = {
  colors: { ...blueColors },
};

export const greenTheme = {
  colors: { ...greenColors },
};

export const purpleTheme = {
  colors: { ...purpleColors },
};

export const pinkTheme = {
  colors: { ...pinkColors },
}

export const redTheme = {
  colors: { ...redColors },
}

