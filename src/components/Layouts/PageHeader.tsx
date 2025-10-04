import {
    IconBook,
    IconChartPie3,
    IconChevronDown,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
} from '@tabler/icons-react';
import {
    Anchor,
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';

import ColorToggle from "@/components/Themes/ColorToggle/ColorToggle";
import {useDisclosure} from '@mantine/hooks';

import classes from './PageHeader.module.css';

const mockdata = [
    {
        icon: IconCode,
        title: 'switch',
        path: "/switch",
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'button',
        path: "/button",
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'contact',
        path: "/contact",
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'table',
        path: "table",
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'resume',
        path: "/resume",
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        path: "/table",
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];
const link_data = [
    {
        title: 'Open source',
        path: "/switch",
    }


]
export default function PageHeader() {
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] =
        useDisclosure(false);
    const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);
    const theme = useMantineTheme();

    const links = mockdata.map((item) => (
        <UnstyledButton component='a' href={item.path} className={classes.subLink} key={item.title}>
            <Group wrap='nowrap' align='flex-start'>
                <ThemeIcon size={34} variant='default' radius='md'>
                    <item.icon size={22} color={theme.colors.blue[6]}/>
                </ThemeIcon>
                <div>
                    <Text size='sm' fw={500}>
                        {item.title}
                    </Text>
                    <Text size='xs' c='dimmed'>
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={0}>
            <header className={classes.header}>
                <Group justify='space-between' h='100%'>


                    <Group h='100%' gap={0} visibleFrom='sm'>
                        <a href='/' className={classes.link}>
                            Home
                        </a>
                        <HoverCard
                            width={600}
                            position='bottom'
                            radius='md'
                            shadow='md'
                            withinPortal
                        >
                            <HoverCard.Target>
                                <a href='/dashboard' className={classes.link}>
                                    <Center inline>
                                        <Box component='span' mr={5}>
                                            dashboard
                                        </Box>
                                        <IconChevronDown size={16} color={theme.colors.blue[6]}/>
                                    </Center>
                                </a>
                            </HoverCard.Target>


                            <HoverCard.Dropdown style={{overflow: 'hidden'}}>
                                <Group justify='space-between' px='md'>
                                    <Text fw={500}>Features</Text>
                                    <Anchor href='#' fz='xs'>
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider my='sm'/>

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group justify='space-between'>
                                        <div>
                                            <Text fw={500} fz='sm'>
                                                Get started
                                            </Text>
                                            <Text size='xs' c='dimmed'>
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant='default'>Get started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>

                        <a href='/experience' className={classes.link}>
                            Experience
                        </a>
                        <a href='/skills' className={classes.link}>
                            Skills
                        </a>
                        <a href='/resume' className={classes.link}>
                            Resume
                        </a>
                    </Group>

                    <Group visibleFrom='sm'>
                        <ColorToggle/>
                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            hiddenFrom='sm'
                        />
                    </Group>


                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size='100%'
                padding='md'
                title='Navigation'
                hiddenFrom='sm'
                zIndex={1000000}
            >
                <ScrollArea h='calc(100vh - 80px' mx='-md'>
                    <Divider my='sm'/>

                    <a href='/button' className={classes.link}>
                        button
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component='span' mr={5}>
                                Features
                            </Box>
                            <IconChevronDown size={16} color={theme.colors.blue[6]}/>
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href='/table' className={classes.link}>
                        Learn
                    </a>
                    <a href='/contact' className={classes.link}>
                        Academy
                    </a>

                    <Divider my='sm'/>

                    <Group justify='center' grow pb='xl' px='md'>
                        <Button variant='default'>Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
