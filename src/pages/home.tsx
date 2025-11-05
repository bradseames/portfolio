import { Welcome } from "./Welcome/Welcome";
import LugCalculator from "../components/LugCalculator/LugDrawing";
import { Container } from "@mantine/core";

export default function Home() {
  return (
    <Container w="50%">
      <LugCalculator />
    </Container>
  );

  //return <div>Hello</div>;
}
