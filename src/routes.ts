import {index, type RouteConfig, route} from '@react-router/dev/routes';

export default [
  // layout('layout.tsx', [
  index('pages/home.tsx'),
  route('form/', 'components/Forms/GetInTouch.tsx'),
  route('chart/', 'components/charts/MyChart.tsx'),
  route('work/', 'pages/Experience/Experience.tsx'),
  route('skills/', 'pages/Experience/skills.tsx'),
  // route('table/', 'content/Tables/SelectTable.tsx'),
  route('about/', 'content/portfolio/About.tsx'),
  route('/docs/:category/:name', 'routes/DynamicMdxPage.tsx'),
  // ]),
  route('*', 'pages/Errors/NothingFoundBackground.tsx')
] satisfies RouteConfig;
