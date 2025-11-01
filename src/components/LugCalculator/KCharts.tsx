import { LineChart } from "@mantine/charts";
import { K_data, Kb_data, Kn_data } from "./coeff_data";

export function KChart({ h, w }: { h: number | string; w: number | string }) {
  return (
    <>
      <LineChart
        h={h}
        w={w}
        data={K_data}
        title="Allowable Axial Load Coeff"
        dataKey="eD"
        tickLine="xy"
        gridAxis="xy"
        xAxisLabel="e/D"
        yAxisLabel="K"
        xAxisProps={{ domain: [0.5, 2.4] }}
        yAxisProps={{ domain: [1.0, 2.0] }}
        curveType="linear"
        withDots={true}
        withLegend={true}
        valueFormatter={(value) => `${value.toFixed(2)}`}
        series={[
          {
            name: "K",
            label: "K, Allowable Uniform Axial Load Coefficient",
            color: "blue.6",
          },
        ]}
      />
    </>
  );
}

export function KbChart({ h, w }: { h: number; w: number }) {
  return (
    <>
      <LineChart
        h={h}
        w={w}
        data={Kb_data}
        dataKey="a_D"
        tickLine="y"
        gridAxis="xy"
        xAxisLabel="a/D"
        yAxisLabel="K_br"
        yAxisProps={{ domain: [0.0, 1.0] }}
        curveType="linear"
        withDots={true}
        withLegend={true}
        legendProps={{
          align: "center",
          height: 100,
          verticalAlign: "bottom",
          iconSize: 6,
          iconType: "line",
        }}
        valueFormatter={(value) => `${value.toFixed(2)}`}
        series={[
          { name: "Dt_2", label: "D/t<=2", color: "blue.2" },
          { name: "Dt_3", label: "D/t=3", color: "blue.4" },
          { name: "Dt_4", label: "D/t=4", color: "blue.6" },
          { name: "Dt_5", label: "D/t=5", color: "blue.8" },
          { name: "Dt_6", label: "D/t=6", color: "blue.9" },
          { name: "Dt_7", label: "D/t=7", color: "green.9" },
          { name: "Dt_8", label: "D/t=8", color: "green.8" },
          { name: "Dt_9", label: "D/t=9", color: "green.6" },
          { name: "Dt_10", label: "D/t=10", color: "green.4" },
          { name: "Dt_15", label: "D/t=15", color: "red.4" },
          { name: "Dt_20", label: "D/t=20", color: "red.5" },
          { name: "Dt_25", label: "D/t=25", color: "red.7" },
          { name: "Dt_30", label: "D/t=30", color: "red.9" },
        ]}
      />
    </>
  );
}

export function KnChart({ h, w }: { h: number; w: number }) {
  return (
    <>
      <LineChart
        h={h}
        w={w}
        data={Kn_data}
        dataKey="Dw"
        tickLine="y"
        gridAxis="xy"
        xAxisLabel="a/D"
        yAxisLabel="K_br"
        yAxisProps={{ domain: [1.0, 1.0] }}
        curveType="linear"
        withDots={true}
        withLegend={true}
        legendProps={{
          align: "center",
          height: 100,
          verticalAlign: "bottom",
          iconSize: 6,
          iconType: "line",
        }}
        valueFormatter={(value) => `${value.toFixed(2)}`}
        series={[
          { name: "Fty_E_eu_0", label: "Fty_E_eu_0", color: "blue.2" },
          { name: "Fty_E_eu_1", label: "Fty_E_eu_1", color: "blue.4" },
          { name: "Fty_E_eu_2", label: "Fty_E_eu_2", color: "blue.6" },
          { name: "Fty_E_eu_4", label: "Fty_E_eu_4", color: "blue.8" },
          { name: "Fty_E_eu_6", label: "Fty_E_eu_6", color: "blue.9" },
          { name: "Fty_E_eu_8", label: "Fty_E_eu_8", color: "green.9" },
          { name: "Fty_E_eu_10", label: "Fty_E_eu_10", color: "green.8" },
        ]}
      />
    </>
  );
}
