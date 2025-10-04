import {IconStarFilled} from '@tabler/icons-react';
import {Carousel} from '@mantine/carousel';
import {Button, Card, Group, Image, Text} from '@mantine/core';
import classes from './CarouselCard.module.css';

const images = [
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

export function CarouselCard() {
    const slides = images.map((image) => (
        <Carousel.Slide key={image}>
            <Image src={image} height={220} fit='scale-down'/>
        </Carousel.Slide>
    ));

    return (
        <Card radius='md' withBorder padding='xl'>
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

            <Group justify='space-between' mt='lg'>
                <Text fw={500} fz='lg'>
                    Forde, Norway
                </Text>

                <Group gap={5}>
                    <IconStarFilled size={16} color='var(--mantine-color-yellow-6)'/>
                    <Text fz='sm' fw={600}>
                        4.78
                    </Text>
                </Group>
            </Group>

            <Text fz='sm' c='dimmed' mt='sm'>
                Engineering leader with 20+ years of experience spanning mechanical
                design, struc tural analysis, and full-stack software development. Known
                for owning complex technical challenges, guiding strategic decisions,
                and driving measurable process improvements. Ready to lead complex
                engineering efforts in an organization that values quality,
                collaboration, and innovation
            </Text>

            <Group justify='space-between' mt='md'>
                <div>
                    <Text fz='xl' span fw={500} className={classes.price}>
                        397$
                    </Text>
                    <Text span fz='sm' c='dimmed'>
                        {' '}
                        / night
                    </Text>
                </div>

                <Button radius='md'>Book now</Button>
            </Group>
        </Card>
    );
}
