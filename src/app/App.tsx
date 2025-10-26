import React from 'react';
import { Outlet } from 'react-router';
import { type MantineProviderProps, MantineProvider } from '@mantine/core';
import { AppShell, NavLink, ScrollArea, Text } from '@mantine/core';
import { MDXProvider } from '@mdx-js/react';
import MathJaxContext from 'better-react-mathjax/MathJaxContext';
import { mathJaxConfig } from '../components/MathJaxProvider';
import './app.css';
import { appTheme } from './app-theme';
import ShellLayout from './PageShell';
import { components } from '../components/MDXProvider';


function Providers({
  children,
  theme = appTheme,
  ...props
}: MantineProviderProps) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      {...props}
    >
      <MDXProvider components={components}>
        <MathJaxContext config={mathJaxConfig}>
          {children}
        </MathJaxContext>
      </MDXProvider>
    </MantineProvider>
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