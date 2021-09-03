export {};

declare module "react-native-tailwindcss" {
  import {
    TailwindColors as DefaultTailwindColors,
    TailwindStyles as DefaultTailwindStyles,
  } from "react-native-tailwindcss";

  interface CustomColors {
    bgPrimary: any;
    bgCard: any;
    bgText: any;
    textGrey: any;
    textPrimary: any;
  }

  export interface TailwindStyles extends DefaultTailwindStyles, CustomColors {}
  export interface TailwindColors extends DefaultTailwindColors, CustomColors {}
}
