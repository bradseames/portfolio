import { Divider, Center, Image, Group, Container, Text } from "@mantine/core";
import Experience from "../../content/portfolio/Experience";

const skill_groups = [
  {
    category: "Mechanical Design",
    skills: ["SolidWorks", "Creo (Pro-E)", "MRB", "DFM", "GD&T"],
  },
  {
    category: "Stress Analysis",
    skills: [
      "NASTRAN",
      "Femap",
      "Patran",
      "linear",
      "nonlinear",
      "buckling",
      "modal",
      "fatigue",
      "crack growth",
      "composite",
    ],
  },
  {
    category: "Programming Languages",
    skills: ["Python", "SQL", "NodeJS", "JavaScript", "React", "VBA", "MathCad"],
  },
  {
    category: "Process Automation",
    skills: ["Full Stack Web Dev", "REST APIs", "ETL", "Continuous Improvement", "Agile"],
  },
  {
    category: "DevOps/Tools",
    skills: ["Git", "Jira", "Jenkins", "Airflow", "SharePoint", "Dynamics CRM"],
  },
];

export function Welcome() {
  return (
    <Center h={"100%"} p="lg" mx="auto" maw={500}>
      <Text c="dimmed" ta="center" size="lg" mx="auto" mt="lg" mb="lg">
        Analytical engineering with 20+ years of experience spanning mechanical design, structural
        analysis, and full-stack software development. Known for owning complex technical
        challenges, guiding strategic decisions, and driving measurable process improvements. Ready
        to lead complex engineering efforts in an organization that values quality, collaboration,
        and innovation.{" "}
      </Text>
    </Center>
  );
}
