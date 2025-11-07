import { Tabs, Group, Paper, Divider, Title } from "@mantine/core";
import { LugConfigForm, type LugConfigInputs } from "./LugConfigForm";
import PinInputForm from "./PinInputForm";
import LugInputForm from "./LugInputForm";
import BushingInputForm from "./BushingInputForm";
import { LugDrawing, type LugParams, type LugMode } from "../LugCalculator/LugDrawing";

interface LugFormProps {
  params: LugParams;
  onUpdate?: (params: LugParams) => void;
  //hoveredDimension?: string | null;
  //onDimensionHover?: (id: string | null) => void;
}

export function CombinedLugForm(props: LugFormProps) {
  function onChange(data: LugConfigInputs) {
    props.onUpdate(data);
  }

  return (
    <Tabs defaultValue="Config" variant="pills" h="100%">
      <Tabs.List>
        <Tabs.Tab value="Config">Config</Tabs.Tab>
        <Tabs.Tab value="Bushing">Bushing</Tabs.Tab>
        <Tabs.Tab value="Pin">Pin</Tabs.Tab>
        <Tabs.Tab value="Lug1">Lug 1</Tabs.Tab>
        <Tabs.Tab value="Lug2">Lug 2</Tabs.Tab>
      </Tabs.List>

      <Paper w="100%" shadow="lg" p="md" withBorder>
        <Group align="stretch">
          <Tabs.Panel h="100%" value="Config">
            <Title order={4}>Lug Configuration</Title>
            <Divider my={"sm"} />
            {<LugConfigForm onCalculate={onChange} isLoading={false} />}
          </Tabs.Panel>

          <Tabs.Panel h="100%" value="Bushing">
            <Title order={4}>Bushing Inputs</Title>
            <Divider my={"sm"} />
            {<BushingInputForm onCalculate={(e) => console.log(e)} isLoading={false} />}
          </Tabs.Panel>

          <Tabs.Panel h="100%" value="Pin">
            <Title order={4}>Pin Inputs</Title>
            <Divider my={"sm"} />
            {<PinInputForm onCalculate={(e) => console.log(e)} isLoading={false} />}
          </Tabs.Panel>

          <Tabs.Panel value="Lug1">
            <Title order={4}>Lug 1 Inputs</Title>
            <Divider my={"sm"} />
            {<LugInputForm onCalculate={(e) => console.log(e)} isLoading={false} lugName="1" />}
          </Tabs.Panel>

          <Tabs.Panel value="Lug2">
            <Title order={4}>Lug 2 Inputs</Title>
            <Divider my={"sm"} />
            {<LugInputForm onCalculate={(e) => console.log(e)} isLoading={false} lugName="2" />}
          </Tabs.Panel>
        </Group>
      </Paper>
    </Tabs>
  );
}

export default CombinedLugForm;
