import { Group, Container, Stack } from '@mantine/core';
import { skill_groups } from './data';
// import Carousel from '../../components/Carousel'
import CarouselEmbla from '../../components/CarouselEmbla';

export default function Skills() {

  const skill_cats = skill_groups.map((skill) => (
    <Stack>

      <Group key={skill.category} justify="flex-start" align="flex-start">
        <div>{skill.category}:</div>
        <Group>
          {skill.skills.map((bullet) => (
            <span> {bullet},</span>
          ))}
        </Group>
      </Group>

    </Stack>
  ));

  return (
    <Container>
      <CarouselEmbla></CarouselEmbla>
      <h4>Skills</h4>
      {skill_cats}
    </Container>
  );
}
