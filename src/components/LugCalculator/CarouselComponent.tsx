import { useCallback, useEffect, useState } from 'react';
import { type EmblaCarouselType } from 'embla-carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Progress, Image } from '@mantine/core';
import classes from '../../_archive/carosel/CarouselCard.module.css';
import Fade from 'embla-carousel-fade';


export default function CarouselComponent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const fade = useRef(Fade({}));

  //const slides = data.map(image => (
  //    <Carousel.Slide key={image.key}>
  //      <Image/>
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
            plugins={[autoplay.current, fade.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={() => autoplay.current.play()}
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
        >
          {/*{slides}*/}
        </Carousel>
        <Progress value={scrollProgress} maw={320} size="sm" mt="xl" mx="auto" />
      </>
  );
}
