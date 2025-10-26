import { default as App, ErrorBoundary, Layout } from './app';

export { App as default, ErrorBoundary, Layout };

// import React from 'react';
// import {
//   isRouteErrorResponse,
//   Links,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration
// } from 'react-router';

// import {
//   Box,
//   Code,
//   Container,
//   mantineHtmlProps,
//   Text,
//   Title,
//   LoadingOverlay
// } from '@mantine/core';

//import NothingFoundBackground from './pages/Errors/NothingFoundBackground';
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