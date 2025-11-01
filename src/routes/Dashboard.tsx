import { Tabs, Box, Title, Container, Card, CardSection, Group, ScrollArea } from "@mantine/core";
//import StressContour from "../components/viz/StressContour";
//import MaterialGraph from '../components/viz/MaterialGraph';
//import ConceptMap from '../components/viz/ConceptMap';
//import { lugStressData , type } from
// '../components/LugCalculator/lugStressData';
import LugCalculatorForm from "../components/LugCalculator/LugCalculatorForm";
import { KChart, KbChart, KnChart } from "../components/LugCalculator/coeff_data";
import GetInTouch from "../components/Forms/GetInTouch";
import LugCalculator from "../components/LugCalculator/LugCalculator";
import CalculationForm, { type LugInputs } from "../components/Forms/CalculationForm";
import classes from "./dashboard.module.css";

export default function Dashboard() {
  function calcs(data: LugInputs) {
    console.log(data);
  }

  function calcLugLoads({ FnuL, FnyL, PnuL }: { FnuL: number; FnyL: number; PnuL: number }) {
    console.log(FnuL, FnyL, PnuL);
  }

  return (
    <div>
      <Card bg="none" h="100%" p={0}>
        {/*<Title order={2}>Engineering Dashboard</Title>*/}
        <Tabs defaultValue="charts" h="100%" color="cyan" variant="pills">
          <Card h="100%">
            <CardSection bg="black" h={60}>
              <Tabs.List pt={20}>
                <Tabs.Tab value="charts">Charts</Tabs.Tab>
                <Tabs.Tab value="form1">Form 1</Tabs.Tab>
                <Tabs.Tab value="svg">SVG</Tabs.Tab>
                <Tabs.Tab value="contact">Contact Form</Tabs.Tab>
                <Tabs.Tab value="lug_form">Form 2</Tabs.Tab>
              </Tabs.List>
            </CardSection>
            <CardSection>
              <ScrollArea w="100%" h={450}>
                <Tabs.Panel value="charts">
                  <Group pt={10}>
                    {<KChart h={400} w={"45%"} />}
                    {<KbChart h={400} w={"50%"} />}
                  </Group>
                  {<KnChart h={400} w={800} />}
                </Tabs.Panel>
                <Tabs.Panel value="form1">
                  <Box p={16} maw={300}>
                    {<CalculationForm onCalculate={calcs} isLoading={false} />}
                  </Box>
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
              </ScrollArea>
            </CardSection>
          </Card>
        </Tabs>
      </Card>
    </div>
  );
}
