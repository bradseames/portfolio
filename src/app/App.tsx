import React from 'react';
import { Outlet } from 'react-router';
import { type MantineProviderProps, MantineProvider } from '@mantine/core';
import { appTheme } from './app-theme';
import ShellLayout from './ShellLayout';
import './app.css';
import ShellLayoutRoute from '../routes/ShellLayoutRoute';

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

export default function App() {
  return (
      <Providers>
        <ShellLayout>
          <Outlet />
        </ShellLayout>
      </Providers>
  );
}
