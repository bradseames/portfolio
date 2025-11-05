import { index, route, layout, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("app/LayoutShell.tsx", [
    index("routes/TabView.tsx"),
    route("home/", "pages/home.tsx"),
    route("dashboard/", "routes/Dashboard.tsx"),
    route("lug/", "components/LugCalculator/LugCalculator.tsx"),
    route("docs/:category/:subject?/:name", "routes/DynamicMdxPage.tsx"),
    route("*", "pages/Errors/NothingFoundBackground.tsx"),
  ]),
] satisfies RouteConfig;
