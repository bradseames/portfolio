import {IconStarFilled} from '@tabler/icons-react';
import {Carousel} from '@mantine/carousel';
import {
  Button,
  Text,
  Card,
  Group,
  Image
} from '@mantine/core';
import {useRef} from 'react'
// import useMediaQuery from '@mantine/hooks';
import classes from './CarouselCard.module.css';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade'

interface CardProps {
  image: string;
  title: string;
  category: string;
}


const data = [
  {
    image:
      '/src/assets/images/portfolio/1_7PV_1_Full.jpg',
    title: 'Best forests to visit in North America',
    category: 'nature'
  },
  {
    image:
      '/src/assets/images/portfolio/2_1x_1_Full.jpg',
    title: 'Hawaii beaches review: better than you think',
    category: 'beach'
  },
  {
    image:
      '/src/assets/images/portfolio/3_Tilt_1_Angles_of_Motion.jpg',
    title: 'Mountains at night: 12 best locations to enjoy the view',
    category: 'nature'
  },
  {
    image:
      '/src/assets/images/portfolio/3_Tilt_2_manifold connections.jpg',
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature'
  },
  {
    image:
      '/src/assets/images/portfolio/OBV1.jpg',
    title: 'Best places to visit this winter',
    category: 'tourism'
  },
  {
    image:
      '/src/assets/images/portfolio/engineMount.png',
    title: 'Active volcanos reviews: travel at your own risk',
    category: 'nature'
  }
];

// useMediaQuery


export default function CarouselCard({}) {

  const autoplay = useRef(Autoplay({delay: 2000}));
  const fade = useRef(Fade())
  const slides = data.map(image => (
    <Carousel.Slide key={image.image}>
      <Image src={image.image} fit="scale-down" height={220}/>
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder padding="xl">

      <Card.Section>
        <Carousel
          withIndicators
          height={220}
          plugins={[autoplay.current, fade.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={() => autoplay.current.play()}
          emblaOptions={{loop: true}}
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator
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