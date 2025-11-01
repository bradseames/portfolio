import { IconBulb, IconCheckbox, IconPlus, IconSearch, IconUser } from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Box,
  Code,
  Group,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  AppShellNavbar,
  AppShellSection,
  ScrollArea,
  type AppShellNavbarConfiguration,
  type AppShellNavbarProps,
} from "@mantine/core";
import classes from "./PageNavbar.module.css";

export interface LinkProps {
  key: number;
  label: string;
  href: string;
}

export default function PageNavbar(links: Array<LinkProps>) {
  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        {/*<link size={20} className={classes.mainLinkIcon} stroke={1.5} />*/}
        <span>{link.label}</span>
      </div>
      <Badge size="sm" variant="filled" className={classes.mainLinkBadge}></Badge>
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <Box component="span" mr={9} fz={16}>
        {collection.emoji}
      </Box>{" "}
      {collection.label}
    </a>
  ));

  return (
    <AppShellNavbar className={classes.navbar}>
      <AppShellSection>
        <TextInput
          placeholder="Search"
          size="xs"
          leftSection={<IconSearch size={12} stroke={1.5} />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{ section: { pointerEvents: "none" } }}
          mb="sm"
        />

        <div className={classes.mainLinks}>{mainLinks}</div>
      </AppShellSection>

      <AppShellSection>
        <Group className={classes.collectionsHeader} justify="space-between">
          <Text size="xs" fw={500} c="dimmed">
            Collections
          </Text>

          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <ScrollArea>
          <div className={classes.collections}>{collectionLinks}</div>
        </ScrollArea>
      </AppShellSection>

      <AppShellSection></AppShellSection>
    </AppShellNavbar>
  );
}
