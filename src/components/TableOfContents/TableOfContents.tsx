// import {
//   useState,
//   type JSXElementConstructor,
//   type Key,
//   type ReactElement,
//   type ReactNode,
//   type ReactPortal
// } from 'react';
// import {IconListSearch} from '@tabler/icons-react';
// import cx from 'clsx';
// import {Box, Group, Text} from '@mantine/core';
// import classes from './TableOfContents.module.css';
//
// interface ITableOfContentsItemProps {
//   link: string;
//   label: string;
//   order: number;
// }
//
// export default function TableOfContentsFloating() {
//   const [active, setActive] = useState(2);
//
//   const items = links.map((item: ITableOfContentsItemProps) => {
//     return (
//       <Box<'a'>
//         component="a"
//         href={item.link}
//         onClick={(event) => {
//           event.preventDefault();
//           setActive(index);
//         }}
//         key={item.label}
//         className={cx(classes.link, {[classes.linkActive]: active === index})}
//         style={{paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))`}}
//       >
//         {item.label}
//       </Box>
//     );
//   });
//   return (
//     <>
//       <div className={classes.root}>
//         <Group mb="md">
//           <IconListSearch size={18} stroke={1.5}/>
//           <Text>Table of contents</Text>
//         </Group>
//         <div className={classes.links}>
//           <div
//             className={classes.indicator}
//             style={{
//               transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`
//             }}
//           />
//           {items}
//         </div>
//       </div>
//     </>
//   );
// }
