import {
  Tabs,
  Box,
  Title,
  Container,
  AppShellHeader,
  Card,
  CardSection,
  Group,
  ScrollArea,
  TableOfContents,
} from "@mantine/core";

import { useState, useRef } from "react";
import { useElementSize, useDisclosure, useHeadroom } from "@mantine/hooks";

import GetInTouch from "../components/Forms/GetInTouch";
import LugCalculatorForm from "../components/LugCalculator/calc1/LugCalculatorForm";
import CalculationForm, { type LugInputs } from "../components/Forms/CalculationForm";

import UsersTable from "../components/Tables/UserTable";
import SelectTable from "../components/Tables/SelectTable";

import InteractiveStressContour from "../components/viz/InteractiveStressContour";
import LinePlot from "../components/viz/Charts/LinePlot";

import { KChart, KbChart, KnChart } from "../components/LugCalculator/coeff_data";
//import LugCalculator from "../components/LugCalculator/LugCalculator";
import LugDoc from "../content/analysis/lug/00-0-lug-analysis.mdx";
import { useMDXComponents } from "../components/mdx-components";
import classes from "./dashboard.module.css";
import Subgrid from "../components/Grids/SubGrid";
//import StressContour from "../components/viz/StressContour";
//import ConceptMap from '../components/viz/ConceptMap';
//import { ParentCalculatorPage } from "../components/LugCalculator/calc1/LugParent";
import ResponsiveMultiLineChart from "../components/viz/ResponsiveMultiLineChart";
import LugCalculator from "../components/LugCalculator/LugDrawing";
import { DEFAULT_PARAMS } from "../components/LugCalculator/Calcs";
import Example from "../components/viz/ScalableDimensions";

export default function Dashboard() {
  const { ref, width, height } = useElementSize();

  function calcs(data: LugInputs) {
    console.log(data);
  }

  function calcLugLoads({ FnuL, FnyL, PnuL }: { FnuL: number; FnyL: number; PnuL: number }) {
    console.log(FnuL, FnyL, PnuL);
  }

  //const items = tabs.map((tab) => (
  //  <Tabs.Tab value={tab} key={tab}>
  //    {tab}
  //  </Tabs.Tab>
  //));

  return (
    <Group bg="none" h="100%" w="100%" p={0}>
      {/*<Title order={2}>Engineering Dashboard</Title>*/}
      <Tabs
        defaultValue="charts"
        h="100%"
        w="100%"
        color="cyan"
        autoContrast={true}
        variant="outline"
        classNames={{
          root: classes.tabs,
          list: classes.tabsList,
          tab: classes.tab,
        }}
      >
        <Group h="100%" w="100%">
          <Group bg="black" w="100%">
            <Tabs.List>
              <Tabs.Tab value="charts">Charts</Tabs.Tab>
              <Tabs.Tab value="calc">Calc</Tabs.Tab>
              <Tabs.Tab value="form1">Form 1</Tabs.Tab>
              <Tabs.Tab value="svg">SVG</Tabs.Tab>
              <Tabs.Tab value="contact">Contact Form</Tabs.Tab>
              <Tabs.Tab value="lug_form">Form 2</Tabs.Tab>
              <Tabs.Tab value="select_table">Table</Tabs.Tab>
              <Tabs.Tab value="user_table">UserTable</Tabs.Tab>
              <Tabs.Tab value="stress">Stress</Tabs.Tab>
              <Tabs.Tab value="stress_contour">Stress Contour</Tabs.Tab>
            </Tabs.List>
          </Group>

          <Group h={"100%"} w="100%">
            <ScrollArea offsetScrollbars="y" w="100%" h={450} m="auto">
              <Tabs.Panel value="charts" w="100%" p={0} m={0}>
                <Group p={0} m={"auto"} w="100%">
                  <Group bg="green.5" p={0} m={"auto"} w={"45%"}>
                    {
                      <KChart
                        h={400}
                        w={"100%"}
                        style={{
                          backgroundColor: "white",
                          padding: "20px",
                          margin: "20px",
                        }}
                      />
                    }
                  </Group>
                  <Group bg="red.8" p={0} m={"auto"} w={700}>
                    {
                      <KbChart
                        h={400}
                        w={700}
                        style={{
                          backgroundColor: "white",
                          padding: "20px",
                          margin: "20px",
                        }}
                      />
                    }
                  </Group>

                  <Group w={"80%"} p={0} m={"auto"} bg={"orange"}>
                    {
                      <KnChart
                        h={400}
                        w={"100%"}
                        style={{
                          backgroundColor: "white",
                          padding: "20px",
                          margin: "20px",
                        }}
                      />
                    }
                  </Group>
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="form1">
                <Group p={16} w={"100%"}>
                  {/*{<Subgrid />}*/}
                  {<CalculationForm onCalculate={calcs} isLoading={false} />}
                  {<LinePlot data={[1, 2, 5, 3, 2, 0]} />}
                </Group>
              </Tabs.Panel>

              <Tabs.Panel value="calc">
                <Group w={600} mx="auto" px="sm">
                  {
                    <ResponsiveMultiLineChart
                      data={[
                        //{
                        //  name: "test1",
                        //  values: [
                        //    { x: 0, y: 0 },
                        //    { x: 1, y: 1 },
                        //    { x: 2, y: 4 },
                        //    { x: 3, y: 9 },
                        //    { x: 4, y: 16 },
                        //    { x: 4, y: 0 },
                        //    { x: 0, y: 0 },
                        //  ],
                        //},
                        //{
                        //  name: "test2",
                        //  values: [
                        //    { x: 0, y: 0 },
                        //    { x: 1, y: 12 },
                        //    { x: 2, y: 2 },
                        //    { x: 3, y: 5 },
                        //    { x: 4, y: 10 },
                        //  ],
                        //},
                        {
                          name: "lug",
                          values: [
                            { x: -2, y: 0 },
                            { x: -2, y: -3 },
                            { x: 2, y: -3 },
                            { x: 2, y: 0 },
                            { x: 1.4, y: 1.4 },
                            { x: 0, y: 2 },
                            { x: -1.4, y: 1.4 },
                            { x: -2, y: 0 },
                          ],
                        },
                      ]}
                    />
                  }
                </Group>
              </Tabs.Panel>
              {/*<Tabs.Panel value="svg">{<LugCalculator />}</Tabs.Panel>*/}
              <Tabs.Panel value="svg">
                <Group>
                  <Group>{<LugCalculator />}</Group>
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="contact">
                <Card p={16} maw={300}>
                  {<GetInTouch />}
                </Card>
              </Tabs.Panel>
              <Tabs.Panel value="lug_form">
                <Group p={16} maw={300}>
                  {<LugCalculatorForm onCalculate={calcLugLoads} />}
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="select_table">
                <Group p={16} w={"100%"}>
                  {<SelectTable />}
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="user_table">
                <Group p={16} w={"100%"}>
                  {<UsersTable />}
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="stress">
                <Group p={16} w={"100%"}>
                  {<InteractiveStressContour />}
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="stress_contour">
                <Group p={16} w={"100%"}>
                  {
                    <TableOfContents
                      variant="filled"
                      color="blue"
                      size="sm"
                      radius="sm"
                      scrollSpyOptions={{
                        selector: "#mdx :is(h1, h2, h3, h4, h5, h6)",
                      }}
                      getControlProps={({ data }) => ({
                        onClick: () => data.getNode().scrollIntoView(),
                        children: data.value,
                      })}
                    />
                  }
                  {<LugDoc components={useMDXComponents()} />}
                </Group>
              </Tabs.Panel>
            </ScrollArea>
          </Group>
        </Group>
      </Tabs>
    </Group>
  );
}
