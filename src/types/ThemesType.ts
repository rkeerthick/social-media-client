import { Palette } from "@mui/material/styles/createPalette";
export type PaletteModeType = "light" | "dark";

export type ColorTokensType = {
  primary: Record<number, string>;
  grey: Record<number, string>;
  // Add other color tokens if needed
};

export type ThemeSettingsType = {
  palette: {
    mode: PaletteModeType | undefined;
    primary: {
      dark: string;
      main: string;
      light: string;
    };
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
    background: {
      default: string;
      alt: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h2: {
      fontFamily: string;
      fontSize: number;
    };
    h3: {
      fontFamily: string;
      fontSize: number;
    };
    h4: {
      fontFamily: string;
      fontSize: number;
    };
    h5: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
};

export interface CustomPalette extends Palette {
  palette: {
    mode: "dark" | "light";
    primary: {
      dark: string;
      main: string;
      light: string;
    };
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
    background: {
      default: string;
      alt: string;
    };
  };
}
