import { Outlet } from 'react-router';
import {
  AppShell,
  Text,
  Group,
  Container,
  ScrollArea,
  Burger,
  ActionIcon,
  NavLink,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ColorToggle from '../components/Themes/ColorToggle/ColorToggle';
import classes from './ShellLayout.module.css';
import {
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconCircleOff,
} from '@tabler/icons-react';

const navLinkData = [
  { href: '/form', label: 'Form' },
  { href: '/chart', label: 'My Chart' },
  { href: '/work', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/lug', label: 'Lug' },
  { href: '/table', label: 'Select Table' },
  { href: '/user_table', label: 'User Table' },
  { href: '/test/analysis/lug-analysis', label: 'Lug Design' },
  { label: 'lug 0-0', href: '/docs/analysis/lug/00-0-lug-analysis' },
  { label: 'lug 1-0', href: '/docs/analysis/lug/01-0-introduction-to-lug-analysis' },
  { label: 'lug 2-0', href: '/docs/analysis/lug/02-0-lug-analysis-nomenclature' },
  {
    label: 'lug 3-0',
    href: '/docs/analysis/lug/03-0-lug-and-bushing-strength-under-uniform-axial-load',
  },
  {
    label: 'lug 3-1', href: '/docs/analysis/lug/03-1-lug-bearing-strength-under-uniform-axial-load',
  },
  {
    label: 'lug 3-2',
    href: '/docs/analysis/lug/03-2-lug-net-section-strength-under-uniform-axial-load',
  },
  {
    label: 'lug 3-3', href: '/docs/analysis/lug/03-3-lug-design-strength-under-uniform-axial-load',
  },
  {
    label: 'lug 3-4',
    href: '/docs/analysis/lug/03-4-bushing-bearing-strength-under-uniform-axial-load',
  },
  {
    label: 'lug 3-5',
    href: '/docs/analysis/lug/03-5-combined-lug-bushing-design-strength-under-uniform-axial-load',
  },
  {
    label: 'lug 4-0',
    href: '/docs/analysis/lug/04-0-double-shear-joint-strength-under-uniform-axial-load',
  },
  {
    label: 'lug 4-1',
    href: '/docs/analysis/lug/04-1-lug-bushing-design-strength-for-double-shear-joints-under-uniform-axial-load',
  },
  {
    label: 'lug 4-2',
    href: '/docs/analysis/lug/04-2-pin-shear-strength-for-double-shear-joints-under-uniform-axial-load',
  },
  {
    label: 'lug 4-3',
    href: '/docs/analysis/lug/04-3-pin-bending-strength-for-double-shear-joints-under-uniform-axial-load',
  },
  {
    label: 'lug 4-4',
    href: '/docs/analysis/lug/04-4-lug-tang-strength-for-double-shear-joints-under-uniform-axial-load',
  },
  {
    label: 'lug 5-0',
    href: '/docs/analysis/lug/05-0-single-shear-joint-strength-under-uniform-axial-load',
  },
  {
    label: 'lug 5-1',
    href: '/docs/analysis/lug/05-1-lug-bearing-strength-for-single-shear-joints-under-uniform-axial-loads',
  },
  {
    label: 'lug 5-2',
    href: '/docs/analysis/lug/05-2-lug-net-section-strength-for-single-shear-joints-under-uniform-axial-load',
  },
  {
    label: 'lug 5-3',
    href: '/docs/analysis/lug/05-3-bushing-strength-for-single-shear-joints-under-uniform-axial-load',
  },
  {
    label: 'lug 5-4',
    href: '/docs/analysis/lug/05-4-pin-shear-strength-for-single-shear-joints-under-uniform-axial-load',
  },
  {
    label: 'lug 5-5',
    href: '/docs/analysis/lug/05-5-pin-bending-strength-for-single-shear-joints-under-uniform-axial-load',
  },
  {
    label: 'lug 6-0',
    href: '/docs/analysis/lug/06-0-example-of-uniform-axially-loaded-lug-analysis',
  },
  {
    label: 'lug 7-0',
    href: '/docs/analysis/lug/07-0-lug-and-bushing-strength-under-transverse-load',
  },
  { label: 'lug 7-1', href: '/docs/analysis/lug/07-1-lug-strength-under-transverse-load' },
  { label: 'lug 7-2', href: '/docs/analysis/lug/07-2-bushing-strength-under-transverse-load' },
  { label: 'lug 8-0', href: '/docs/analysis/lug/08-0-double-shear-joints-under-transverse-load' },
  { label: 'lug 9-0', href: '/docs/analysis/lug/09-0-single-shear-joints-under-transverse-load' },
  {
    label: 'lug 10-0', href: '/docs/analysis/lug/10-0-lug-and-bushing-strength-under-oblique-load',
  },
  { label: 'lug 10-1', href: '/docs/analysis/lug/10-1-lug-strength-under-oblique-load' },
  { label: 'lug 10-2', href: '/docs/analysis/lug/10-2-bushing-strength-under-oblique-load' },
  { label: 'lug 11-0', href: '/docs/analysis/lug/11-0-double-shear-joints-under-oblique-load' },
  { label: 'lug 12-0', href: '/docs/analysis/lug/12-0-single-shear-joints-under-oblique-load' },
  { label: 'lug 13-0', href: '/docs/analysis/lug/13-0-multiple-shear-and-single-shear-connection' },
  { label: 'lug 14-0', href: '/docs/analysis/lug/14-0-axially-loaded-lug-design' },
];

const navLinkDoc = [
  { href: '/docs/analysis/lug-allowables', label: 'Lugs' },
  {
    href: '/docs/analysis/shear-force-and-bending-moments-in-beams',
    label: 'Beams',
  },
  { href: '/docs/charts/samples', label: 'Chart' },
  { href: '/docs/math/math-example', label: 'Math Example' },
  { href: '/docs/math/quadratic-formula', label: 'Quadratic' },
  { href: '/docs/portfolio/about-me', label: 'About Me' },
  { href: '/docs/math/integration', label: 'integration' },
];


const dq = [
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
const docLinks = navLinkDoc.map((link) => {
      return (
          <NavLink key={link.href} href={link.href} label={link.label} />
      );
    },
);

export default function ShellLayout({ children }: {
  children: React.ReactNode
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  // const pinned = useHeadroom({ fixedAt: 120 });
  return (
      <AppShell
          padding="md"
          //header={{ height: 60, collapsed: !pinned, offset: false }}
          header={{ height: 60 }}
          // footer={{height: 30}}
          navbar={{
            width: { base: 200, md: 200, lg: 200 },
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
          // aside={{width: 300, breakpoint: 'md', collapsed: {desktop: false, mobile: true}}}
      >
        <AppShell.Header py="md" className={classes.header}>
          <Group h="100%" px="md" justify="space-between" align="stretch">
            <Group justify="flex-start" align="center">
              <Burger opened={desktopOpened} onClick={toggleDesktop}
                      visibleFrom="sm" size="sm" />
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm"
                      size="sm" />
              <Text size="xl">Brad Seames</Text>
            </Group>
            <Group grow justify="flex-end" align="center">
              <ColorToggle></ColorToggle>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          {/*<Group h="var(--app-shell-header-height)" p="my" justify="flex-start" align="stretch">*/}
          {/*  <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />*/}
          {/*  <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />*/}
          {/*</Group>*/}
          <AppShell.Section>
            <NavLink
                href="  /"
                label="home"
                leftSection={<IconHome2 size={16} stroke={1.5} />}
            />
          </AppShell.Section>
          <AppShell.Section grow component={ScrollArea}>

            {navLinks}
            <Text>Docs</Text>
            <NavLink
                href="#required-for-focus"
                label="Docs"
                leftSection={<IconGauge size={16} stroke={1.5} />}
                rightSection={
                  <IconChevronRight size={12} stroke={1.5}
                                    className="mantine-rotate-rtl" />
                }
            >
              {docLinks}
            </NavLink>

          </AppShell.Section>
          {/*</Container>*/}

        </AppShell.Navbar>


        <AppShell.Main pt="var(--app-shell-header-height)">
          {children}
        </AppShell.Main>
        {/*<AppShell.Navbar component={NavbarNested}></AppShell.Navbar>*/}
        {/*<AppShell.Footer>Footer</AppShell.Footer>*/}
        {/*<AppShell.Aside>*/}
        {/*</AppShell.Aside>*/}
      </AppShell>);
}
