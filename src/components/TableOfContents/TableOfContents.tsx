import {useState} from 'react';
import {IconListSearch} from '@tabler/icons-react';
import cx from 'clsx';
import {Box, Group, Text} from '@mantine/core';
import classes from './TableOfContents.module.css';

const links = [
    {label: 'Home', link: '/', order: 1},
    {label: 'Experience', link: '#/experience', order: 1},
    {label: 'Resume', link: '#/resumes', order: 1},
    {label: 'Skills', link: '/skills', order: 1},
    {label: 'Examples', link: '#1', order: 1},
    {label: 'Show on focus', link: '#2', order: 2},
    {label: 'Show on hover', link: '#3', order: 2},
    {label: 'With form', link: '#4', order: 2},
];

// <NavLink href='/' label='Home' />
//     <NavLink href='/skills' label='Skills' />
//     {/* <NavLink href='/experience' label='Experience' /> */}
//     <NavLink href='/resume' label='Resume' />
//     {/* <NavLink href='/toc' label='toc' />
//     <NavLink href='/charts' label='charts' /> */}

export default function TableOfContentsFloating() {
    const [active, setActive] = useState(2);

    const items = links.map((item, index) => (
        <Box<'a'>
            component='a'
            href={item.link}
            onClick={(event) => {
                event.preventDefault();
                setActive(index);
            }}
            key={item.label}
            className={cx(classes.link, {[classes.linkActive]: active === index})}
            style={{paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))`}}
        >
            {item.label}
        </Box>
    ));
    return (
        <>
            <div className={classes.root}>
                <Group mb='md'>
                    <IconListSearch size={18} stroke={1.5}/>
                    <Text>Table of contents</Text>
                </Group>
                <div className={classes.links}>
                    <div
                        className={classes.indicator}
                        style={{
                            transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`,
                        }}
                    />
                    {items}
                </div>
            </div>
        </>
    );
}
