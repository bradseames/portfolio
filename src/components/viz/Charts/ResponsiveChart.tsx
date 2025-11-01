import { useEffect, useRef } from 'react';
import { Box } from '@mantine/core';

export default function ResponsiveChart({ renderChart }: {
  renderChart: (element: SVGSVGElement) => void
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      renderChart(ref.current);
    }
  }, [renderChart]);

  return (
      <Box style={{ width: '100%', height: '300px' }}>
        <svg ref={ref} width="100%" height="100%" />
      </Box>
  );
}
