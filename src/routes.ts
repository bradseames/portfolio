import { index, route, layout, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('routes/ShellLayoutRoute.tsx', [
      index('pages/home.tsx'),
      route('/docs/:category/:name', 'routes/DynamicMdxPage.tsx'),
      route('*', 'pages/Errors/NothingFoundBackground.tsx'),
    ],
  ),
] satisfies RouteConfig;


//route('form/', 'components/Forms/GetInTouch.tsx'),
// route('chart/', 'components/charts/MyChart.tsx'),
// route('work/', 'pages/Experience/Experience.tsx'),
// route('skills/', 'pages/Experience/skills.tsx'),
// route('table/', 'components/Tables/SelectTable.tsx'),
// route('lug/', 'components/LugCalculator/LugCalculator.tsx'),
// route('user_table/', 'components/Tables/UserTable.tsx'),
// route('about/', 'content/portfolio/About.tsx'),
