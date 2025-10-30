import {index, route, layout, type RouteConfig} from '@react-router/dev/routes';

export default [
  //layout('app/ShellLayout.tsx', [
  index('pages/home.tsx'),
  route('form/', 'components/Forms/GetInTouch.tsx'),
  route('chart/', 'components/charts/MyChart.tsx'),
  route('work/', 'pages/Experience/Experience.tsx'),
  route('skills/', 'pages/Experience/skills.tsx'),
  route('table/', 'components/Tables/SelectTable.tsx'),
  route('lug/', 'components/LugCalculator/LugCalculator.tsx'),
  route('user_table/', 'components/Tables/UserTable.tsx'),
  route('/test/:category/:name', 'routes/RoutePage.tsx'),
  route('/docs/:category/:subject?/:name', 'routes/DynamicMdxPage.tsx'),
  route('*', 'pages/Errors/NothingFoundBackground.tsx'),
  //])
] satisfies RouteConfig;



