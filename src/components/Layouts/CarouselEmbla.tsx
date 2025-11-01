import { useCallback, useEffect, useState } from 'react';
import { type EmblaCarouselType } from 'embla-carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Progress, Image } from '@mantine/core';
import classes from '../../_archive/carosel/CarouselCard.module.css';
import Fade from 'embla-carousel-fade';
import React from 'react';


const data = [
  {
    key: 1,
    src: 'src/assets/images/portfolio/1_7PV_1_Full.jpg',
  },
  {
    key: 2,
    src: 'src/assets/images/portfolio/1_7PV_2_Drive Stress.jpg',
  },
  {
    key: 3,
    src: 'src/assets/images/portfolio/1_7PV_3_Construction.jpg',
  },
  {
    key: 4,
    src: 'src/assets/images/portfolio/1_7PV_4_Shipping1.jpg',
  },
  {
    key: 5,
    src: 'src/assets/images/portfolio/1_7PV_5_Shipping2.jpg',
  },
  {
    key: 6,
    src: 'src/assets/images/portfolio/2_1x_1_Full.jpg',
  },
  {
    key: 7,
    src: 'src/assets/images/portfolio/2_1x_2_Steel.jpg',
  },
  {
    key: 8,
    src: 'src/assets/images/portfolio/2_1x_3_Stress1.jpg',
  },
  {
    key: 9,
    src: 'src/assets/images/portfolio/2_1x_4_Stress2.jpg',
  },
  {
    key: 10,
    src: 'src/assets/images/portfolio/3_Tilt_1_Angles_of_Motion.jpg',
  },

  {
    key: 11,
    src: 'src/assets/images/portfolio/3_Tilt_2_manifold connections.jpg',
  },
  {
    key: 12,
    src: 'src/assets/images/portfolio/3_Tilt_3_Field.jpg',
  },
  {
    key: 13,
    src: 'src/assets/images/portfolio/IMG_2076.JPG',
  },
  {
    key: 14,
    src: 'src/assets/images/portfolio/OBV1.jpg',
  },
  {
    key: 15,
    src: 'src/assets/images/portfolio/Top-View-Hose.jpg',
  },
  {
    key: 16,
    src: 'src/assets/images/portfolio/vg_delta.jpg',
  },
];

export function SlideComponent() {

  return (
      <Carousel.Slide>

      </Carousel.Slide>
  );
}

export default function CarouselEmbla({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const fade = useRef(Fade({}));

  //const slides = slideData.map((content: React.ReactNode) => (
  //    <Carousel.Slide key={1}>
  //      {/*<Image src={image.src} fit="scale-down" height={500} />*/}
  //      {content}
  //
  //    </Carousel.Slide>
  //));

  const handleScroll = useCallback(() => {
    if (!embla) {
      return;
    }
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
  }, [embla]);

  return (
      <>
        <Carousel
            emblaOptions={{ slidesToScroll: 1, inViewThreshold: 1 }}
            withIndicators={true}
            withControls={true}
            height={500}
            getEmblaApi={setEmbla}
            initialSlide={1}
            //plugins={[autoplay.current, fade.current]}
            //onMouseEnter={autoplay.current.stop}
            //onMouseLeave={() => autoplay.current.play()}
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
        >
          {children}

        </Carousel>
        <Progress value={scrollProgress} maw={320} size="sm" mt="xl" mx="auto" />
      </>
  );
}
