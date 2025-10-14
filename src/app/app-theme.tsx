import {
  createTheme,
  DEFAULT_THEME
  // MantineProvider,
  // type MantineProviderProps
} from '@mantine/core';

export const appTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue
  },
  primaryColor: 'brand'

});

// export default function MantineProvider({
//   children,
//   theme = appTheme, ...props
// }: MantineProviderProps) {
//   return <MantineProvider theme={theme}
//                           defaultColorScheme="dark"
//                           {...props}>{children}</MantineProvider>;
// }
