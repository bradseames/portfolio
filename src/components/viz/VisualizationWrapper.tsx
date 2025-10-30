// src/components/viz/VisualizationWrapper.tsx

import React, { useRef, useEffect } from 'react';

interface VizProps {
  data: any[];
  options: { width: number; height: number; color: string };
  onReady: (ref: React.RefObject<HTMLDivElement>) => void; // Function to initialize D3
  onUpdate: (data: any[]) => void; // Function to update D3
}

const VisualizationWrapper: React.FC<VizProps> = ({ data, options, onReady, onUpdate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Initialization (Run once on mount)
  useEffect(() => {
    if (containerRef.current) {
      //onReady(containerRef); // Call the D3/Three.js initialization logic
    }
    // Cleanup function
    return () => {
      // Add logic here to remove event listeners or destroy Three.js scenes
    };
  }, []);

  // 2. Data/Prop Updates (Run on change)
  useEffect(() => {
    if (containerRef.current) {
      onUpdate(data); // Call the D3/Three.js update logic
    }
  }, [data, options, onUpdate]);

  return <div ref={containerRef} style={{ width: options.width, height: options.height }} />;
};

export default VisualizationWrapper;
