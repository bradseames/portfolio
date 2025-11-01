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
      padding={0}
      header={{ height: 60 }}
      navbar={{
        width: 150,
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
          <NavLink label="Home" href="/" />
          <NavLink label="Dashboard" href="/dashboard/" />
          <NavLink label="Lug" href="/lug/" />
          <NavLink label="Docs" href="/docs/analysis/lug/00-0-lug-analysis" />
        </AppShell.Section>
        <AppShell.Section id="navFooter" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
