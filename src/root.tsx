import {default as App, ErrorBoundary, Layout} from "./app";

export {App as default, ErrorBoundary, Layout};

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

import NothingFoundBackground from './pages/Errors/NothingFoundBackground'
import type {Route} from './+types/root';
// import './app.css'
// import {AppTheme} from './app-theme';

// export function Layout({children}: {children: React.ReactNode}) {
//   return (
//     <html lang="en" {...mantineHtmlProps}>
//     <head>
//       <meta charSet="utf-8"/>
//       <meta name="viewport" content="width=device-width, initial-scale=1"/>
//       <Meta/>
//       <Links/>
//     </head>
//     <body>
//     <AppTheme>{children}</AppTheme>
//     <ScrollRestoration/>
//     <Scripts/>
//     </body>
//     </html>
//   );
// }

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