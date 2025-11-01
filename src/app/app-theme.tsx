import cx from 'clsx';
import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';
import { type MantineColorScheme, useMantineColorScheme } from '@mantine/core';
import { TextInput, Button } from '@mantine/core';


//const themeOverride = createTheme({
//  primaryColor: 'orange',
//  defaultRadius: 0,
//});
//
//export const theme2 = mergeMantineTheme(DEFAULT_THEME, themeOverride);
//
//
//function getComputedColorScheme(colorScheme: MantineColorScheme) {
//  return colorScheme === 'auto' ? 'light' : colorScheme;
//}
//
//function Demo() {
//  const { colorScheme } = useMantineColorScheme();
//  const computed = getComputedColorScheme(colorScheme);
//}


export const appTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  primaryColor: 'brand',
});


//const theme1 = createTheme({
//  components: {
//    TextInput: TextInput.extend({
//      classNames: (_theme, props) => ({
//        label: cx({ [classes.labelRequired]: props.required }),
//        input: cx({ [classes.inputError]: props.error }),
//      }),
//    }),
//  },
//});


//const theme = createTheme({
//  components: {
//    TextInput: TextInput.extend({
//      classNames: {
//        root: classes.root,
//        input: classes.input,
//        label: classes.label,
//      },
//    }),
//    Button: Button.extend({
//      classNames: {
//        root: 'my-root-class',
//        label: 'my-label-class',
//        inner: 'my-inner-class',
//      },
//      styles: {
//        root: { backgroundColor: 'red' },
//        label: { color: 'blue' },
//        inner: { fontSize: 20 },
//      },
//    }),
//  },
//});


//--button-bg	Controls background
//--button-bd	Control border
//--button-hover	Controls background when hovered
//--button-color	Control text color
//--button-hover-color	Control text color when hovered
//--button-radius	Controls border-radius
//--button-height	Controls height of the button
//--button-padding-x	Controls horizontal padding of the button
//--button-fz	Controls font-size of the button
//--button-justify	Controls justify-content of inner element


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


