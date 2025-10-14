import {MantineProvider, createTheme, type MantineColorsTuple} from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#f2f7f7',
  '#e8eaea',
  '#ccd5d5',
  '#acbfc0',
  '#92acad',
  '#81a0a2',
  '#769a9d',
  '#648688',
  '#56787a',
  '#3a5a5c'
];

const theme = createTheme({
  colors: {
    myColor
  }
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}