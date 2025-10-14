import React from 'react';
import type { Route } from '../+types/root';
import { isRouteErrorResponse } from 'react-router';
import { Box, Code, Container, Text, Title } from '@mantine/core';


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error))
    {
      message = error.status === 404 ? '404' : 'Error';
      details =
        error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error)
    {
      details = error.message;
      stack = error.stack;
    }

  return (
    <Container component="main" pt="xl" p="md" mx="auto">
      <Title>{message}</Title>
      <Text>{details}</Text>
      {stack && (
        <Box component="pre" w="100%" style={{ overflowX: 'auto' }} p="md">
          <Code>{stack}</Code>
        </Box>
      )}
    </Container>
  );
}