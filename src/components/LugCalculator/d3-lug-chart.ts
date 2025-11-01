import * as d3 from "d3";

// Define the chart's core dimensions and margins
const margin = { top: 20, right: 30, bottom: 40, left: 50 };
let width = 0;
let height = 0;

// --- 1. Initialization Logic ---
/**
 * Initializes the SVG canvas and all static elements (axes, labels).
 * This runs only once when the React component mounts.
 * @param containerElement The raw DOM element reference from React's useRef.
 * @param dimensions Initial width and height for the SVG.
 */
export function initLugChart(
  containerElement: HTMLDivElement,
  dimensions: { width: number; height: number },
): void {
  // Clear any previous chart elements to ensure a clean slate
  d3.select(containerElement).select("svg").remove();

  width = dimensions.width - margin.left - margin.right;
  height = dimensions.height - margin.top - margin.bottom;

  // Create the main SVG canvas
  const svg = d3
    .select(containerElement)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .attr("class", "lug-chart-group"); // Add a class for easy selection later

  // Append static axes groups (these will be populated in update)
  svg.append("g").attr("class", "x-axis").attr("transform", `translate(0,${height})`);
  svg.append("g").attr("class", "y-axis");

  // Append a group for the data visualization elements (e.g., points, lines)
  svg.append("g").attr("class", "data-elements");

  // Add a chart title
  svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Lug Calculation Visualization");

  console.log("D3 Chart Initialized.");
}

// --- 2. Update Logic ---
/**
 * Updates the chart with new data, handling scales, axes, and drawing the visual elements.
 * This runs every time the React component's data prop changes.
 * @param containerElement The raw DOM element where the SVG lives.
 * @param data New data to be visualized (e.g., from the input form).
 */
export function updateLugChart(
  containerElement: HTMLDivElement,
  data: { length: number; angle: number }[],
): void {
  if (!data || data.length === 0) {
    // Optionally display a "No data" message here
    return;
  }

  const svg = d3.select(containerElement).select(".lug-chart-group");
  if (svg.empty()) {
    console.error("D3 update called before initialization. Check useEffect dependencies.");
    return;
  }

  // --- A. Scales ---
  // Example: X-scale for Lug Length
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.length) as [number, number]) // Use D3 extent for min/max
    .range([0, width])
    .nice();

  // Example: Y-scale for Angle
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.angle) || 10] as [number, number])
    .range([height, 0])
    .nice();

  // --- B. Axes ---
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Transition the axes to new values
  svg
    .select<SVGGElement>(".x-axis")
    .transition()
    .duration(500)
    .call(xAxis as any);
  svg
    .select<SVGGElement>(".y-axis")
    .transition()
    .duration(500)
    .call(yAxis as any);

  // --- C. Data Binding (Example: Scatter Plot for Lug Points) ---
  const points = svg
    .select(".data-elements")
    .selectAll("circle")
    .data(data, (d) => `${d.length}-${d.angle}` as string); // Key function for smooth transitions

  // EXIT: Remove old points
  points
    .exit()
    .transition()
    .duration(500)
    .attr("r", 0) // Shrink out
    .remove();

  // ENTER: Add new points
  const enterSelection = points.enter().append("circle").attr("r", 0); // Start small

  enterSelection
    .merge(
      points as d3.Selection<
        SVGCircleElement,
        {
          length: number;
          angle: number;
        },
        any,
        any
      >,
    )
    .transition()
    .duration(500)
    .attr("cx", (d) => xScale(d.length))
    .attr("cy", (d) => yScale(d.angle))
    .attr("r", 5) // Final size
    .style("fill", "var(--mantine-color-blue-6)"); // Use Mantine CSS variable for color

  console.log("D3 Chart Updated with new data.");
}

// --- 3. Cleanup Logic  ---
/**
 * Cleanup function definition (can be called from the React wrapper's useEffect cleanup).
 */
export function cleanupLugChart(containerElement: HTMLDivElement): void {
  d3.select(containerElement).select("svg").remove();
  console.log("D3 Chart Cleaned Up.");
}
