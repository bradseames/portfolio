import { AppShell, NavLink, ScrollArea, Text } from '@mantine/core';
import { Outlet } from 'react-router';
import { appTheme } from './app-theme';
import { type MantineProviderProps, MantineProvider } from '@mantine/core';
import './app.css';
import React from 'react';

import { MDXProvider } from '@mdx-js/react';
import MathJaxContext from 'better-react-mathjax/MathJaxContext'; // Better for dynamic rendering
import { components } from '../components/MDXProvider';

import ShellLayout from './PageShell';

const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
  },
};


// const navLinkData = [
//   { href: '/', label: 'Home' },
//   { href: '/form', label: 'Form' },
//   { href: '/chart', label: 'My Chart' },
//   { href: '/work', label: 'Experience' },
//   { href: '/skills', label: 'Skills' },
//   // {href: '/math', label: 'Math'},
//   // {href: '/mdx', label: 'MDX'},
//   // {href: '/table', label: 'Table'},
//   { href: '/docs/analysis/shear-force-and-bending-moments-in-beams', label: 'Beams' },
//   { href: '/docs/charts/samples', label: 'Chart' },
//   // { href: '/docs/math/integration', label: 'Integration' },
//   { href: '/docs/math/math-example', label: 'Math Example' },
//   { href: '/docs/math/quadratic-formula', label: 'Quadratic' },
//   { href: '/docs/portfolio/about-me', label: 'About Me' },
//   // { href: '/about', label: 'About' },
//   // {href: '/work', label: 'Work'}
// ];

function Providers({
  children,
  theme = appTheme,
  ...props
}: MantineProviderProps) {
  return <MantineProvider theme={theme}
                          defaultColorScheme="dark"
                          {...props}
  >
    <MDXProvider components={components}>
      <MathJaxContext config={mathJaxConfig}>
        <MDXProvider>
          {children}
        </MDXProvider>
      </MathJaxContext>
    </MDXProvider>
  </MantineProvider>;
}

// const navLinks = navLinkData.map((link) => {
//     return (
//       <NavLink key={link.href} href={link.href} label={link.label} />
//     );
//   },
// );
// function Providers({children}: {children: React.ReactNode}) {
//   return (
//     <MantineProvider>
//       {/*<BaseMDXProvider>*/}
//         {children}
//       {/*</BaseMDXProvider>*/}
//     {/*// </MantineProvider>*/}
//   );
// }

function MyAppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 60 }}
              navbar={{
                width: { base: 200, md: 200, lg: 200 },
                breakpoint: 'sm',
                // collapsed: {mobile: !mobileOpened, desktop: !desktopOpened}
              }}
              padding="md">
      <AppShell.Header>
        Header
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <NavLink href="/" label="Home" />
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <Text>Docs</Text>
          {/*{navLinks}*/}
        </AppShell.Section>

        {/*<Container>*/}
        {/*  <div>Resume</div>*/}
        {/*  <div>*/}
        {/*    <ActionIcon*/}
        {/*      component="a"*/}
        {/*      href="/app/assets/resume.pdf"*/}
        {/*      target="_blank"*/}
        {/*      size="xl"*/}
        {/*      aria-label="pdf Resume"*/}
        {/*      // onClick={(event: { preventDefault: () => any; }) => event.preventDefault()}*/}
        {/*    >*/}
        {/*      <IconFileTypePdf/>*/}
        {/*    </ActionIcon>*/}
        {/*  </div>*/}
        {/*</Container>*/}

      </AppShell.Navbar>
    </AppShell>
  );
}


export default function App() {
  return (
    <Providers>
      <ShellLayout>
        <Outlet />
      </ShellLayout>
    </Providers>
  );
}