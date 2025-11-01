import { AppShell, ScrollArea, Group, Burger, Text } from "@mantine/core";
import ColorToggle from "../components/Layouts/ColorToggle/ColorToggle";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "@mantine/core";
import { Outlet } from "react-router";

export default function LayoutShell() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group>
          <Group justify="flex-start" align="center">
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Text size="xl">Brad Seames</Text>
          </Group>
          <Group grow justify="flex-end" align="center">
            <ColorToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section id="navHeader" />
        <AppShell.Section id="navBody" grow component={ScrollArea}>
          <NavLink key="home" href="/" label="Home" />
          <NavLink key="dashboard" href="/dashboard/" label="Dashboard" />
          <NavLink key="lug" href="/lug/" label="Lug" />
          <NavLink key="docs" href="/docs/analysis/lug/00-0-lug-analysis" label="Docs" />
        </AppShell.Section>
        <AppShell.Section id="navFooter" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

const navLinkData = [
  { href: "/form", label: "Form" },
  { href: "/chart", label: "My Chart" },
  { href: "/work", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/lug", label: "Lug" },
  { href: "/table", label: "Select Table" },
  { href: "/user_table", label: "User Table" },
  { href: "/docs/analysis/lug-allowables", label: "Lug Design1" },
  { href: "/test/analysis/lug-analysis", label: "Lug Design2" },
  { label: "lug 0-0", href: "/docs/analysis/lug/00-0-lug-analysis" },
  { label: "lug 1-0", href: "/docs/analysis/lug/01-0-introduction-to-lug-analysis" },
  { label: "lug 2-0", href: "/docs/analysis/lug/02-0-lug-analysis-nomenclature" },
  {
    label: "lug 3-0",
    href: "/docs/analysis/lug/03-0-lug-and-bushing-strength-under-uniform-axial-load",
  },
  {
    label: "lug 3-1",
    href: "/docs/analysis/lug/03-1-lug-bearing-strength-under-uniform-axial-load",
  },
  {
    label: "lug 3-2",
    href: "/docs/analysis/lug/03-2-lug-net-section-strength-under-uniform-axial-load",
  },
  {
    label: "lug 3-3",
    href: "/docs/analysis/lug/03-3-lug-design-strength-under-uniform-axial-load",
  },
  {
    label: "lug 3-4",
    href: "/docs/analysis/lug/03-4-bushing-bearing-strength-under-uniform-axial-load",
  },
  {
    label: "lug 3-5",
    href: "/docs/analysis/lug/03-5-combined-lug-bushing-design-strength-under-uniform-axial-load",
  },
  {
    label: "lug 4-0",
    href: "/docs/analysis/lug/04-0-double-shear-joint-strength-under-uniform-axial-load",
  },
  {
    label: "lug 4-1",
    href: "/docs/analysis/lug/04-1-lug-bushing-design-strength-for-double-shear-joints-under-uniform-axial-load",
  },
  {
    label: "lug 4-2",
    href: "/docs/analysis/lug/04-2-pin-shear-strength-for-double-shear-joints-under-uniform-axial-load",
  },
  {
    label: "lug 4-3",
    href: "/docs/analysis/lug/04-3-pin-bending-strength-for-double-shear-joints-under-uniform-axial-load",
  },
  {
    label: "lug 4-4",
    href: "/docs/analysis/lug/04-4-lug-tang-strength-for-double-shear-joints-under-uniform-axial-load",
  },
  {
    label: "lug 5-0",
    href: "/docs/analysis/lug/05-0-single-shear-joint-strength-under-uniform-axial-load",
  },
  {
    label: "lug 5-1",
    href: "/docs/analysis/lug/05-1-lug-bearing-strength-for-single-shear-joints-under-uniform-axial-loads",
  },
  {
    label: "lug 5-2",
    href: "/docs/analysis/lug/05-2-lug-net-section-strength-for-single-shear-joints-under-uniform-axial-load",
  },
  {
    label: "lug 5-3",
    href: "/docs/analysis/lug/05-3-bushing-strength-for-single-shear-joints-under-uniform-axial-load",
  },
  {
    label: "lug 5-4",
    href: "/docs/analysis/lug/05-4-pin-shear-strength-for-single-shear-joints-under-uniform-axial-load",
  },
  {
    label: "lug 5-5",
    href: "/docs/analysis/lug/05-5-pin-bending-strength-for-single-shear-joints-under-uniform-axial-load",
  },
  {
    label: "lug 6-0",
    href: "/docs/analysis/lug/06-0-example-of-uniform-axially-loaded-lug-analysis",
  },
  {
    label: "lug 7-0",
    href: "/docs/analysis/lug/07-0-lug-and-bushing-strength-under-transverse-load",
  },
  { label: "lug 7-1", href: "/docs/analysis/lug/07-1-lug-strength-under-transverse-load" },
  { label: "lug 7-2", href: "/docs/analysis/lug/07-2-bushing-strength-under-transverse-load" },
  { label: "lug 8-0", href: "/docs/analysis/lug/08-0-double-shear-joints-under-transverse-load" },
  { label: "lug 9-0", href: "/docs/analysis/lug/09-0-single-shear-joints-under-transverse-load" },
  {
    label: "lug 10-0",
    href: "/docs/analysis/lug/10-0-lug-and-bushing-strength-under-oblique-load",
  },
  { label: "lug 10-1", href: "/docs/analysis/lug/10-1-lug-strength-under-oblique-load" },
  { label: "lug 10-2", href: "/docs/analysis/lug/10-2-bushing-strength-under-oblique-load" },
  { label: "lug 11-0", href: "/docs/analysis/lug/11-0-double-shear-joints-under-oblique-load" },
  { label: "lug 12-0", href: "/docs/analysis/lug/12-0-single-shear-joints-under-oblique-load" },
  {
    label: "lug 13-0",
    href: "/docs/analysis/lug/13-0-multiple-shear-and-single-shear-connection",
  },
  { label: "lug 14-0", href: "/docs/analysis/lug/14-0-axially-loaded-lug-design" },
];

const navLinkDoc = [
  { href: "/docs/analysis/lug-allowables", label: "Lugs" },
  {
    href: "/docs/analysis/shear-force-and-bending-moments-in-beams",
    label: "Beams",
  },
  { href: "/docs/charts/samples", label: "Chart" },
  { href: "/docs/math/math-example", label: "Math Example" },
  { href: "/docs/math/quadratic-formula", label: "Quadratic" },
  { href: "/docs/portfolio/about-me", label: "About Me" },
  { href: "/docs/math/integration", label: "integration" },
];

const navLinks = navLinkData.map((link) => {
  return <NavLink key={link.href} href={link.href} label={link.label} />;
});
const docLinks = navLinkDoc.map((link) => {
  return <NavLink key={link.href} href={link.href} label={link.label} />;
});
