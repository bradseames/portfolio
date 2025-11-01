import React, { useRef, useEffect, useCallback } from "react";
import { Box, Paper, Loader, Center } from "@mantine/core";
// Import your D3 functions (to be created in the next step)
import {
  initLugChart,
  updateLugChart,
  cleanupLugChart,
} from "../../components/LugCalculator/d3-lug-chart";

interface LugData {
  length: number;
  angle: number;
}

interface LugChartProps {
  lugData: LugData[]; // Example data structure
  isLoading: boolean;
  width?: number;
  height?: number;
}

const LugChart: React.FC<LugChartProps> = ({ lugData, isLoading, width = 600, height = 400 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize the update function to prevent unnecessary re-renders of the wrapper
  const handleUpdate = useCallback((data: LugData[]) => {
    if (containerRef.current) {
      updateLugChart(containerRef.current, data);
    }
  }, []);

  // 1. Initialization (Runs once on mount)
  useEffect(() => {
    if (containerRef.current) {
      // Initialize the D3/SVG structure inside the container
      initLugChart(containerRef.current, { width, height });
    }
    // Cleanup function: remove D3 elements when the component unmounts
    return () => {
      if (containerRef.current) {
        cleanupLugChart(containerRef.current);
      }
      // You'll define the cleanup in your D3 utility file if needed
    };
  }, [width, height]); // Re-initialize only if dimensions change

  // 2. Data/Prop Updates (Runs whenever lugData changes)
  useEffect(() => {
    handleUpdate(lugData);
  }, [lugData, handleUpdate]);

  if (isLoading) {
    return (
      <Center w={width} h={height}>
        <Loader />
      </Center>
    );
  }

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Box
        ref={containerRef}
        style={{ overflow: "visible" }} // Allows SVG elements to extend slightly
        w={width}
        h={height}
      />
    </Paper>
  );
};

export default LugChart;
