import {IconStarFilled} from '@tabler/icons-react';
import {Carousel} from '@mantine/carousel';
import {
    Button,

    Text,

    Card,
    Group,
    Image,
} from '@mantine/core';
// import useMediaQuery from '@mantine/hooks';
import classes from './CarouselCard.module.css';

// interface CardProps {
//     image: string;
//     title: string;
//     category: string;
// }

const d1 = [
    'images/portfolio/1_7PV_1_Full.jpg',
    'images/portfolio/1_7PV_2_Drive Stress.jpg',
    'images/portfolio/1_7PV_3_Construction.jpg',
    'images/portfolio/1_7PV_4_Shipping1.jpg',
    'images/portfolio/1_7PV_5_Shipping2.jpg ',
    'images/portfolio/2_1x_1_Full.jpg',
    'images/portfolio/2_1x_2_Steel.jpg',
    'images/portfolio/2_1x_3_Stress1.jpg',
    'images/portfolio/2_1x_4_Stress2.jpg',
    'images/portfolio/3_Tilt_1_Angles_of_Motion.jpg',
    'images/portfolio/3_Tilt_2_manifold connections.jpg',
    'images/portfolio/3_Tilt_3_Field.jpg',
    'images/portfolio/Top-View-Hose.jpg',
];

const data = [
    {
        image:
            'images/portfolio/2_1x_1_Full.jpg',
        title: 'Best forests to visit in North America',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Hawaii beaches review: better than you think',
        category: 'beach',
    },
    {
        image:
            'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Mountains at night: 12 best locations to enjoy the view',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Aurora in Norway: when to visit for best experience',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Best places to visit this winter',
        category: 'tourism',
    },
    {
        image:
            'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Active volcanos reviews: travel at your own risk',
        category: 'nature',
    },
];

// useMediaQuery

export function CarouselCard() {
    const slides = data.map(info => (
        <Carousel.Slide key={info.image}>
            <Image src={info.image} height={220}/>
        </Carousel.Slide>
    ));

    return (
        <Card radius="md" withBorder padding="xl">
            <Card.Section>
                <Carousel
                    withIndicators
                    emblaOptions={{loop: true}}
                    classNames={{
                        root: classes.carousel,
                        controls: classes.carouselControls,
                        indicator: classes.carouselIndicator,
                    }}
                >
                    {slides}
                </Carousel>
            </Card.Section>

            <Group justify="space-between" mt="lg">
                <Text fw={500} fz="lg">
                    fgdfg
                </Text>

                <Group gap={5}>
                    <IconStarFilled size={16} color="var(--mantine-color-yellow-6)"/>
                    <Text fz="sm" fw={600}>
                        dgdg
                    </Text>
                </Group>
            </Group>

            <Text fz="sm" c="dimmed" mt="sm">
             dggg
            </Text>

            <Group justify="space-between" mt="md">
                <div>
                    <Text fz="xl" span fw={500} className={classes.price}>
                        397$
                    </Text>
                    <Text span fz="sm" c="dimmed">
                        {' '}
                        / night
                    </Text>
                </div>

                <Button radius="md">"item.category"</Button>
            </Group>
        </Card>
    );
}