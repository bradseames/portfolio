import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {HomePage} from './pages/Home.page';
import DashboardLayout from "@/pages/Dashboard.Layout";
import Experience from "@/components/Experience/Experience";
import Dashboard from "@/pages/Dashboard.page";
import Skills from "@/components/Experience/skills";
import {SwitchesCard} from "@/components/Controls/SwitchesCard";
import {ButtonGrid} from "@/components/Controls/ButtonGrid";
import {GetInTouch} from "@/components/Forms/GetInTouch";
import {SelectTable} from "@/components/Tables/SelectTable";
import Resume from "@/components/Experience/resume";
import TableOfContents from "@/components/TableOfContents/TableOfContents";

const router = createBrowserRouter([
    {
        Component: DashboardLayout,
        children: [
            {index: true, Component: HomePage},
            {path: "dashboard", Component: Dashboard},
            {path: "experience", Component: Experience},
            {path: "skills", Component: Skills},
            {path: "switch", Component: SwitchesCard},
            {path: "button", Component: ButtonGrid},
            {path: "contact", Component: GetInTouch},
            {path: "table", Component: SelectTable},
            {path: "resume", Component: Resume},
            {path: "toc", Component: TableOfContents},
        ],
    }
]);

export function Router() {
    return <RouterProvider router={router}/>;
}
