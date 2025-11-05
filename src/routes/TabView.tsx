import {
  Tabs,
  Box,
  Title,
  Container,
  AppShellHeader,
  Card,
  CardSection,
  Group,
  Flex,
  ScrollArea,
  TableOfContents,
  Image,
} from "@mantine/core";

import { useState, useRef } from "react";
import { useElementSize, useDisclosure, useHeadroom } from "@mantine/hooks";

import { useMDXComponents } from "../components/mdx-components";
import classes from "./dashboard.module.css";
import Subgrid from "../components/Grids/SubGrid";
import Experience from "../content/portfolio/Experience";
import { Welcome } from "../pages/Welcome/Welcome";
import CarouselComponent, { SlideComponent } from "../components/CarouselComponent";
import { Carousel } from "@mantine/carousel";

import APS_7PV_1_Full from "~/assets/images/portfolio/1_7PV_1_Full.jpg";
import APS_7PV_2_Drive_Stress from "~/assets/images/portfolio/1_7PV_2_Drive_Stress.jpg";
import APS_7PV_3_Construction from "~/assets/images/portfolio/1_7PV_3_Construction.jpg";
import APS_7PV_4_Shipping from "~/assets/images/portfolio/1_7PV_4_Shipping1.jpg";
import APS_7PV_5_Shipping from "~/assets/images/portfolio/1_7PV_5_Shipping2.jpg";

import APS_SingleAxis_1_Full from "~/assets/images/portfolio/2_1x_1_Full.jpg";
import APS_SingleAxis_2_Steel from "~/assets/images/portfolio/2_1x_2_Steel.jpg";
import APS_SingleAxis_3_Stress1 from "~/assets/images/portfolio/2_1x_3_Stress1.jpg";
import APS_SingleAxis_4_Stress2 from "~/assets/images/portfolio/2_1x_4_Stress2.jpg";

import APS_Tilt_1_Angles_of_Motion from "~/assets/images/portfolio/3_Tilt_1_Angles_of_Motion.jpg";
import APS_Tilt_2_manifold_connections from "~/assets/images/portfolio/3_Tilt_2_manifold_connections.jpg";
import APS_Tilt_3_Field from "~/assets/images/portfolio/3_Tilt_3_Field.jpg";
import Skills from "../content/portfolio/Skills";
import Coolwell from "~/assets/images/portfolio/Top-View-Hose.jpg";

import OBV1 from "~/assets/images/portfolio/OBV1.jpg";

import EngineMount from "~/assets/images/portfolio/engineMount.jpg";

import CollinsAward2020 from "~/assets/images/portfolio/CollinsAward2020.jpg";
import VGdelta from "~/assets/images/portfolio/vg_delta.jpg";

const data = [
  { src: APS_7PV_1_Full },
  { src: APS_7PV_2_Drive_Stress },
  { src: APS_7PV_3_Construction },
  { src: APS_7PV_4_Shipping },
  { src: APS_7PV_5_Shipping },

  { src: APS_SingleAxis_1_Full },
  { src: APS_SingleAxis_2_Steel },
  { src: APS_SingleAxis_3_Stress1 },
  { src: APS_SingleAxis_4_Stress2 },

  { src: APS_Tilt_1_Angles_of_Motion },
  { src: APS_Tilt_2_manifold_connections },
  { src: APS_Tilt_3_Field },

  { src: Coolwell },
  { src: OBV1 },
  { src: EngineMount },
  { src: CollinsAward2020 },
  { src: VGdelta },
];

export default function Dashboard() {
  const { ref, width, height } = useElementSize();

  return (
    <Group bg="none" w="100%" h="100%" p={0} m={0}>
      {/*<Title order={2}>Engineering Dashboard</Title>*/}
      <Tabs
        defaultValue="home"
        h="100%"
        w="100%"
        p={0}
        m={0}
        color="cyan"
        autoContrast={true}
        variant="outline"
        classNames={{
          root: classes.tabs,
          list: classes.tabsList,
          tab: classes.tab,
        }}
      >
        <Group
          p={0}
          m={0}
          //style={{
          //  height: `calc(100dvh - var(--app-shell-header-height))`,
          //}}
        >
          <Group
            c="var(--mantine-color-white)"
            bg="var(--mantine-color-black)"
            w="100%"
            p={0}
            m={0}
          >
            <Tabs.List p={0} m={0}>
              <Tabs.Tab value="home">About Me</Tabs.Tab>
              <Tabs.Tab value="skills">Skills</Tabs.Tab>
              <Tabs.Tab value="experience">Experience</Tabs.Tab>
              <Tabs.Tab value="projects">Projects</Tabs.Tab>
            </Tabs.List>
          </Group>

          <Group ref={ref} w="100%" p={0} m={0}>
            <ScrollArea offsetScrollbars="y" w="100%" h={500} mx="auto" p={0} m={0}>
              <Tabs.Panel value="home" w="100%" p={0} m={0}>
                <Group p={0} mx={"auto"} w="100%">
                  <Welcome />
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="skills" w="100%" p={0} m={0}>
                <Group p={0} mx={"auto"} w="100%">
                  <Skills />
                </Group>
              </Tabs.Panel>

              <Tabs.Panel value="experience" w="100%" h="100%">
                <Flex direction="row" justify="stretch" w="100%" p={"md"} mx="auto">
                  {/*<Container>*/}
                  <Experience />
                  {/*</Container>*/}
                  {/*<Container w="50%">*/}
                  {/*  <CarouselComponent*/}
                  {/*    slides={data.map((image) => {*/}
                  {/*      return (*/}
                  {/*        <Carousel.Slide key={image.src}>*/}
                  {/*          <Image src={image.src} fit="scale-down" height={300} />*/}
                  {/*        </Carousel.Slide>*/}
                  {/*      );*/}
                  {/*    })}*/}
                  {/*  />*/}
                  {/*</Container>*/}
                </Flex>
              </Tabs.Panel>
              <Tabs.Panel value="projects" w="100%" h="100%" p={0} m={0}>
                <Group p={0} m={"auto"} w="100%">
                  <Container w="50%">
                    <CarouselComponent
                      slides={data.map((image) => {
                        return (
                          <Carousel.Slide key={image.src}>
                            <Image src={image.src} fit="scale-down" height={350} />
                          </Carousel.Slide>
                        );
                      })}
                    />
                  </Container>
                </Group>
              </Tabs.Panel>
            </ScrollArea>
          </Group>
        </Group>
      </Tabs>
    </Group>
  );
}
