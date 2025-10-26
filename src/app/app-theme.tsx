import {
  createTheme,
  DEFAULT_THEME,
} from '@mantine/core';

export const appTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  primaryColor: 'brand',
});
