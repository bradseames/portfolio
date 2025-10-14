//import React from 'react';
//import { useRouteError } from 'react-router';
//import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import { MantineProvider } from '@mantine/core';
//
//import '@mantine/core/styles.css';
//import '@mantinex/mantine-header/styles.css';
//import '@mantine/carousel/styles.css';
//import '@mantine/spotlight/styles.css';
//import 'mantine-datatable/styles.layer.css';
//
//import { ButtonGrid } from '@/components/Controls/ButtonGrid';
//import { SwitchesCard } from '@/components/Controls/SwitchesCard';
//import { GetInTouch } from '@/components/Forms/GetInTouch';
//import { SelectTable } from '@/components/Tables/SelectTable';
//import DashboardLayout from '@/pages/Dashboard.Layout';
//import Dashboard from '@/pages/Dashboard.page';
//import Experience from '@/pages/Experience/Experience';
//import Resume from '@/pages/Experience/resume';
//import Skills from '@/pages/Experience/skills';
//import TableOfContents from '@/pages/TableOfContents/TableOfContents';
//import { HomePage } from './pages/Home.page';
//import { theme } from './theme';
//
//function RootErrorBoundary() {
//  const error = useRouteError();
//
//  console.error(error); // Log the error for debugging
//  return (
//    <MantineProvider>
//      <div>
//        <h1>Oops! Something went wrong.</h1>
//        <p>An unexpected error has occurred.</p>
//      </div>
//    </MantineProvider>
//  );
//}
//
//// @ts-ignore
//// export function ErrorBoundary({error}) {
////     let message = "Oops!";
////     let details = "An unexpected error occurred.";
////     let stack: string | undefined;
////
////     if (isRouteErrorResponse(error)) {
////         message = error.status === 404 ? "404" : "Error";
////         details =
////             error.status === 404
////                 ? "The requested page could not be found."
////                 : error.statusText || details;
////     } else if (import.meta.env.DEV && error && error instanceof Error) {
////         details = error.message;
////         stack = error.stack;
////     }
////
////     return (
////         <main className="pt-16 p-4 container mx-auto">
////             <h1>{message}</h1>
////             <p>{details}</p>
////             {stack && (
////                 <pre className="w-full p-4 overflow-x-auto">
////           <code>{stack}</code>
////         </pre>
////             )}
////         </main>
////     );
//// }
//
//const router = createBrowserRouter([
//  {
//    Component: DashboardLayout,
//    children: [
//      { index: true, Component: HomePage },
//      { path: 'dashboard', Component: Dashboard },
//      { path: 'experience', Component: Experience },
//      { path: 'skills', Component: Skills },
//      { path: 'switch', Component: SwitchesCard },
//      { path: 'button', Component: ButtonGrid },
//      { path: 'contact', Component: GetInTouch },
//      { path: 'table', Component: SelectTable },
//      { path: 'resume', Component: Resume },
//      { path: 'toc', Component: TableOfContents },
//    ],
//  },
//]);
//
//export default function App() {
//  return (
//    <MantineProvider theme={theme} defaultColorScheme="dark">
//      <RouterProvider router={router} />;
//    </MantineProvider>
//  );
//}
