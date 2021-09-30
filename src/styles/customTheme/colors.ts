import { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
export const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  brand: {
    100: "",
    200: "",
    300: "#33323E", //Border
    400: "#6C6B7B", //Text
    500: "#853BCE", //Selected/Hover
    600: "#33323E", //Button/Link/Important
    700: "#211F2D", //Nested
    800: "#181622", //Content
    900: "#13111C", //Background
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
