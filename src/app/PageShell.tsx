import { Outlet } from 'react-router';
import { AppShell, Text, Group, Container, ScrollArea, Burger, ActionIcon, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import {IconMail, IconFileTypePdf} from '@tabler/icons-react';
import ColorToggle from '../components/Themes/ColorToggle/ColorToggle';


const navLinkData = [
  // { href: '/', label: 'Home' },
  { href: '/form', label: 'Form' },
  { href: '/chart', label: 'My Chart' },
  { href: '/work', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  // {href: '/math', label: 'Math'},
  // {href: '/mdx', label: 'MDX'},
  // {href: '/table', label: 'Table'},
  { href: '/docs/analysis/shear-force-and-bending-moments-in-beams', label: 'Beams' },
  { href: '/docs/charts/samples', label: 'Chart' },
  // { href: '/docs/math/integration', label: 'Integration' },
  { href: '/docs/math/math-example', label: 'Math Example' },
  { href: '/docs/math/quadratic-formula', label: 'Quadratic' },
  { href: '/docs/portfolio/about-me', label: 'About Me' },
  // { href: '/about', label: 'About' },
  // {href: '/work', label: 'Work'}
];


const d = [
  {
    href: 'docs/analysis', label: 'analysis', children: [
      {
        href: 'docs/analysis/shear-force-and-bending-moments-in-beams',
        label: 'Shear Force and Bending Moments in Beams',
      },
    ],
  },
  {
    href: 'docs/charts', label: 'charts', children: [
      { href: 'docs/charts/samples', label: 'samples' },
    ],
  },
  {
    href: 'docs/design', label: 'design',
  },
  {
    href: 'docs/math', label: 'math', children: [
      { href: 'docs/math/integration', label: 'integration' },
      { href: 'docs/math/math-example', label: 'Example' },
      { href: 'docs/math/quadratic-formula', label: 'Quadratic Formula' },
    ],
  },
  {
    href: 'docs/portfolio', label: 'portfolio', children: [
      { href: 'docs/portfolio/about-me', label: 'About Me' },
    ],
  },
  { href: 'docs/programming', label: 'programming' },
];

interface INavTOC {
  href: string;
  label: string;
  children: [INavTOC] | undefined;
}

//
// function NavTOC(props: INavTOC) {
//
//   if (props.children)
//     {
//       const childNavs = props.children.forEach({child}:INavTOC => {
//         return NavTOC(child)
//       })
//
//       return (
//         <NavLink href={props.href} label={props.label}>
//           {childNavs}
//         </NavLink>
//       )
//     }
//
//       < NavLink
//         href={props.href}
//         label={props.label}
//       />
//
//     } else
//     {
//       return <NavLink href={props.href} label={props.label}/>
//     }
//
// .
//   forEach(childProps => {
//     NavTOC(childProps)
//   })
//   {
//     const elem =
//   }
//
//
// }


const navLinks = navLinkData.map((link) => {
    return (
      <NavLink key={link.href} href={link.href} label={link.label} />
    );
  },
);

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      // footer={{height: 30}}
      navbar={{
        width: { base: 200, md: 200, lg: 200 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      // aside={{width: 300, breakpoint: 'md', collapsed: {desktop: false, mobile: true}}}
    >
      <AppShell.Header py={0}>
        <Group h="100%" px="md" justify="space-between" align="stretch">
          <Group justify="flex-start" align="center">
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Text size="xl">Brad Seames</Text>
          </Group>
          <Group grow justify="flex-end" align="center">
            <ColorToggle></ColorToggle>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        {children}
      </AppShell.Main>
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <NavLink href="/" label="Home" />
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <Text>Docs</Text>
          {navLinks}
        </AppShell.Section>

        {/*<Container>*/}
        {/*  <div>Resume</div>*/}
        {/*  <div>*/}
        {/*    <ActionIcon*/}
        {/*      component="a"*/}
        {/*      href="/src/assets/resume.pdf"*/}
        {/*      target="_blank"*/}
        {/*      size="xl"*/}
        {/*      aria-label="pdf Resume"*/}
        {/*      // onClick={(event: { preventDefault: () => any; }) => event.preventDefault()}*/}
        {/*    >*/}
        {/*      <IconFileTypePdf/>*/}
        {/*    </ActionIcon>*/}
        {/*  </div>*/}
        {/*</Container>*/}

      </AppShell.Navbar>
      {/*<AppShell.Footer>Footer</AppShell.Footer>*/}
      {/*<AppShell.Aside>*/}
      {/*</AppShell.Aside>*/}
    </AppShell>);
}
