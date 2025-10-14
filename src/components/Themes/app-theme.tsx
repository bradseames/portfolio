// theme.tsx
import {
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  type MantineProviderProps,
  mergeMantineTheme,
} from '@mantine/core';

import { type MantineColorScheme, useMantineColorScheme } from '@mantine/core';

function getComputedColorScheme(colorScheme: MantineColorScheme) {
  return colorScheme === 'auto' ? 'light' : colorScheme;
}

function Demo() {
  const { colorScheme } = useMantineColorScheme();
  const computed = getComputedColorScheme(colorScheme);
}

const themeOverride = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

// export const appTheme = createTheme({
//   colors: {
//     deepBlue: [
//       '#eef3ff',
//       '#dce4f5',
//       '#b9c7e2',
//       '#94a8d0',
//       '#748dc1',
//       '#5f7cb8',
//       '#5474b4',
//       '#44639f',
//       '#39588f',
//       '#2d4b81',
//     ],
//     blue: [
//       '#eef3ff',
//       '#dee2f2',
//       '#bdc2de',
//       '#98a0ca',
//       '#7a84ba',
//       '#6672b0',
//       '#5c68ac',
//       '#4c5897',
//       '#424e88',
//       '#364379',
//     ],
//   },

//   shadows: {
//     md: '1px 1px 3px rgba(0, 0, 0, .25)',
//     xl: '5px 5px 3px rgba(0, 0, 0, .25)',
//   },

//   headings: {
//     fontFamily: 'Roboto, sans-serif',
//     sizes: {
//       h1: { fontSize: '36px' },
//     },
//   },
// });

export const appTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  primaryColor: 'brand',
});

// export function AppTheme({
//   children,
//   theme = appTheme,
//   ...props
// }: MantineProviderProps) {
//   return (
//     <MantineProvider theme={theme} {...props}>
//       {children}
//     </MantineProvider>
//   );
// }
