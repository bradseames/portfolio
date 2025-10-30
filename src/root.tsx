import { ErrorBoundary } from './app';
import React from 'react';
import { Outlet } from 'react-router';
import { type MantineProviderProps, MantineProvider } from '@mantine/core';
import { appTheme } from './app/app-theme';
import ShellLayout from './app/ShellLayout';
//import ShellLayoutRoute from './routes/ShellLayoutRoute';
import './app/app.css';
import { MDXProvider } from '@mdx-js/react';
//import { MathJaxContext } from 'better-react-mathjax/MathJaxContext';
//import { mathJaxConfig } from './components/MathJaxProvider';
import { components } from './routes/MDXProvider';

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
        {children}
      </MantineProvider>
  );
}

//import React from 'react';
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';
import { mantineHtmlProps } from '@mantine/core';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <Providers>
        {children}
      </Providers>
      <ScrollRestoration />
      <Scripts />
      </body>
      </html>
  );
}

export default function App() {
  return (
      <ShellLayout>
        <Outlet />
      </ShellLayout>
  );
}

export { ErrorBoundary };

//import type { Route } from './+types/root';

// function getVersion() {
//   return 1.0
// };

// export async function loader() {
//   return {
//     version: getVersion()
//   };
// }
//
// export function HydrateFallback({
//   loaderData
// }: Route.ComponentProps) {
//   return <NothingFoundBackground/>
// }
//
// export default function App() {
//   return <Outlet/>;
// }
//
