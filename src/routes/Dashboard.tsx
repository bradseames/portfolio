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
  Collapse,
} from "@mantine/core";
import LugDoc from "../content/analysis/lug/00-0-lug-analysis.mdx";
import InteractiveStressContour from "../components/viz/InteractiveStressContour";
import StressContour from "../components/viz/StressContour";
//import ConceptMap from '../components/viz/ConceptMap';
//import { lugStressData , type } from
// '../components/LugCalculator/lugStressData';
import LinePlot from "../components/viz/Charts/LinePlot";
import UsersTable from "../components/Tables/UserTable";
import SelectTable from "../components/Tables/SelectTable";
import LugCalculatorForm from "../components/LugCalculator/LugCalculatorForm";
import { KChart, KbChart, KnChart } from "../components/LugCalculator/coeff_data";
import GetInTouch from "../components/Forms/GetInTouch";
import LugCalculator from "../components/LugCalculator/LugCalculator";
import CalculationForm, { type LugInputs } from "../components/Forms/CalculationForm";
import classes from "./dashboard.module.css";
import { useState, useRef } from "react";
import { useElementSize } from "@mantine/hooks";
import { useHeadroom } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";
import { useMDXComponents } from "../components/mdx-components";
import { TableOfContents } from "@mantine/core";

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
        <Card h="100%">
          <CardSection bg="black">
            <Tabs.List>
              <Tabs.Tab value="charts">Charts</Tabs.Tab>
              <Tabs.Tab value="form1">Form 1</Tabs.Tab>
              <Tabs.Tab value="svg">SVG</Tabs.Tab>
              <Tabs.Tab value="contact">Contact Form</Tabs.Tab>
              <Tabs.Tab value="lug_form">Form 2</Tabs.Tab>
              <Tabs.Tab value="select_table">Table</Tabs.Tab>
              <Tabs.Tab value="user_table">UserTable</Tabs.Tab>
              <Tabs.Tab value="stress">Stress</Tabs.Tab>
              <Tabs.Tab value="stress_contour">Stress Contour</Tabs.Tab>
            </Tabs.List>
          </CardSection>

          <Group h={"100%"}>
            <ScrollArea offsetScrollbars="y" w="100%" h={500} m="auto">
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
                  {<CalculationForm onCalculate={calcs} isLoading={false} />}
                  {<LinePlot data={[1, 2, 5, 3, 2, 0]} />}
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="svg">{<LugCalculator />}</Tabs.Panel>
              <Tabs.Panel value="contact">
                <Box p={16} maw={300}>
                  {<GetInTouch />}
                </Box>
              </Tabs.Panel>
              <Tabs.Panel value="lug_form">
                <Box p={16} maw={300}>
                  {<LugCalculatorForm onCalculate={calcLugLoads} />}
                </Box>
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
        </Card>
      </Tabs>
    </Group>
  );
}
