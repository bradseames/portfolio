import type { Route } from "./+types/root";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { isRouteErrorResponse } from "react-router";
import { Outlet } from "react-router";
import React from "react";
import { mantineHtmlProps } from "@mantine/core";
import { Box, Code, Container, Text, Title } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { MDXProvider } from "@mdx-js/react";
import { CacheProvider } from "@emotion/react";
import { cache } from "./app/emotion";
import { appTheme } from "./app/app-theme";
import { mathJaxConfig } from "./components/Equations";
import "./app/app.css";
import * as MathJaxModule from "better-react-mathjax";

export const { MathJaxContext, MathJax } = MathJaxModule;

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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <meta name="emotion-insertion-point" content="" />
      <CacheProvider value={cache}>
        <MantineProvider theme={appTheme}>
          <MathJaxContext config={mathJaxConfig}>
            <MDXProvider>
              <Outlet />
            </MDXProvider>
          </MathJaxContext>
        </MantineProvider>
      </CacheProvider>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  return (
    <Container component="main" pt="xl" p="md" mx="auto">
      <Title>{message}</Title>
      <Text>{details}</Text>
      {stack && (
        <Box component="pre" w="100%" style={{ overflowX: "auto" }} p="md">
          <Code>{stack}</Code>
        </Box>
      )}
    </Container>
  );
}
