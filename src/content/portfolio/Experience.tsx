import {
  Container,
  ThemeIcon,
  Grid,
  Text,
  Avatar,
  Timeline,
  Accordion,
  Group,
  NumberFormatter,
  List,
} from "@mantine/core";

import CollinsLogo from "~/assets/images/logos/collins_aerospace_logo.jpg";
import CoolwellLogo from "~/assets/images/logos/coolwell_logo.jpg";
import OrbitalSciencesLogo from "~/assets/images/logos/orbital-sciences-logo.svg";
import RaytechLogo from "~/assets/images/logos/raytech_logo.jpg";
import UtasLogo from "~/assets/images/logos/United_technologies_logo.svg";
import VgLogo from "~/assets/images/logos/virgin_galactic_logo.jpg";

const experience = [
  {
    company: "Virgin Galactic",
    logo: VgLogo,
    start: "3/2024",
    end: "6/2024",
    months: 4,
    roles: [
      {
        title: "Stress Engineer",
        group: "Structural Integrity Methods",
        start: "3/2024",
        end: "6/2024",
        months: 4,
        accomplishments: [
          "Developed and documented standard stress methodologies for the Delta Spaceship certification report, ensuring traceability and compliance",
          "Automated margin of safety calculations by designing a configurable, FEA-based joint analysis template (Excel VBA), significantly reducing report preparation time",
        ],
      },
    ],
  },
  {
    company: "Collins Aerospace",
    logo: CollinsLogo,
    start: "06/2013",
    end: "03/2024",
    months: 130,
    roles: [
      {
        title: "Principal Stress Engineer",
        group: "Aftermarket New Programs SRM",
        start: "06/2023",
        end: "03/2024",
        months: 10,
        accomplishments: [
          "Rejoined as a Principal Engineer to apply newly developed software and automation skills, leading the development of digital tools for the global support analysis team",
          "Performed structural evaluations of nacelle repairs and damage limits using NASTRAN/PATRAN FEA tools and hand calculations",
          "Collaborated with global support analysis teams to develop cloud storage standards and SQL-based logging automation of FEA result files, enabling multi-run comparisons",
          "Procured and configured application servers, databases, and DevOps tools to support development of stress analysis tools",
        ],
      },
      {
        title: "Digital Tool Engineer",
        group: "Data Science & Analytics",
        start: "03/2020",
        end: "06/2023",
        months: 39,
        accomplishments: [
          "Designed and maintained full-stack web applications (Python/Flask, NodeJS, SQL, JavaScript) to support data-driven initiatives for the Data Science & Analytics team, increasing manufacturing process visibility and operational insight",
          "Created customizable web app to manage tooling design tasks, track production status, and identify potential conflicts or delays",
          "Developed application to automate quality reporting by extracting autoclave data and validating part-specific compliance by part number",
          "Modeled production data structures in SQL database and constructed ETL data pipelines and application API's",
        ],
      },
      {
        title: "Application Developer",
        group: "Engineering Design Methods & Standards",
        start: "08/2018",
        end: "03/2020",
        months: 19,
        accomplishments: [
          "Developed an award-winning, interactive web application for program milestone tracking adopted enterprise-wise, significantly improving cross-functional visibility",
          "Provided Agile leadership by representing the engineering department in cross-functional collaboration meetings",
          "Maintained and enhanced legacy engineering tools built with VBA, CATIA, .NET, and SharePoint",
        ],
      },
      {
        title: "Senior Engineer",
        group: "Aftermarket Strategic Initiatives",
        start: "08/2016",
        end: "08/2018",
        months: 24,
        accomplishments: [
          "Led the technical transition to Microsoft Dynamics CRM by designing custom workflows, automating business processes, andintegrating SharePoint document storage",
          "Led cross-functional Lean initiatives, deploying a configuration-controlled Standard Work SharePoint library to enforce standardized workflows across departments",
          "Consolidated 22 legacy SharePoint sites into a unified, searchable platform, increasing data access and team productivity",
        ],
      },
      {
        title: "Senior Stress Engineer",
        group: "Aftermarket One-Off Repair",
        start: "06/2013",
        end: "08/2016",
        months: 38,
        accomplishments: [
          "Created stress reports to substantiate urgent one-off repairs for metallic and composite nacelle components and engine mounts using classical hand calculations and coordinated sign-off with Airworthiness organization",
          "Cut engine mount repair analysis turnaround times by half through continuous improvement initiatives",
          "Developed stress, fatigue and crack growth analysis templates using Mathcad and Excel/VBA adopted as team standards",
          "Led training sessions to upskill team in stress tools, improving consistency and shortening ramp-up time for new hires",
          "Served as team focal during manager absences, represented the department during engineering tool initiative events",
        ],
      },
    ],
  },
  {
    company: "Orbital Sciences",
    logo: OrbitalSciencesLogo,
    start: "9/2006",
    end: "6/2013",
    months: 82,
    roles: [
      {
        title: "Senior Stress Engineer",
        group: "Structural Analysis",
        start: "10/2011",
        end: "6/2013",
        months: 21,
        accomplishments: [
          "Built primary flight structure FEMs and performed linear, nonlinear, buckling, and modal analyses (Femap, NASTRAN), validated results with hand calculations and documented in formal stress reports",
          "Delivered critical analysis on a trailer retrofit under a 3-month deadline; recognized by the Missile Defense Agency for analysis quality and delivery speed that directly led to Orbital winning follow-on work",
          "Eliminated a costly classified test by reassessing conservative assumptions to validate untested margins, and lead crossfunctional alignment saving significant program budget and complexity",
          "Avoided more than $100K in destructive test costs by optimizing fixture structural design via iterative analysis; completed iterations within budget and predicted strain within 5% of test results (Creo, Femap, NASTRAN)",
        ],
      },
      {
        title: "Senior Engineer",
        group: "Design, Integration & Test",
        start: "9/2006",
        end: "9/2011",
        months: 61,
        accomplishments: [
          "Led design trade studies for Flight Test Equipment (FTE) packaging on new boosters, evaluating mounting configurations, integration, and qualification impacts and using a decision matrix to present selected design rationale",
          "Averted potential mission failure by identifying underreported loads in coupled models; designed new bulkhead configuration to withstand corrected loads on a one-week timeline to meet critical deadlines",
          "Seamlessly incorporated late-stage battery changes with minimal manufacturing impact through design of an isolated bracket and universal adapter plate accommodating different battery types and locations",
          "Produced engineering reports, drawings, work instructions and test procedures to support missile fleet",
          "Selected for program proposal team, delivering design concepts, CAD/FEA support, and time/cost estimates",
        ],
      },
    ],
  },
  {
    company: "Coolwell Inc",
    logo: CoolwellLogo,
    start: "10/2005",
    end: "6/2006",
    months: 10,
    roles: [
      {
        title: "Director of Product Engineering",
        group: "",
        start: "10/2005",
        end: "6/2006",
        months: 10,
        accomplishments: [
          "Designed injection-molded plastic and metal structural components for startup's flagship consumer product (SolidWorks)",
          "Implemented PDM/CRM systems and established QA/nonconformance processes to improve traceability and quality",
          "Oversaw first-run assembly in China, inspecting parts and driving tooling changes to enhance manufacturability",
        ],
      },
    ],
  },
  {
    company: "Raytech Corp",
    logo: RaytechLogo,
    start: "12/2001",
    end: "9/2005",
    months: 46,
    roles: [
      {
        title: "Product Design Engineer",
        group: "",
        start: "12/2001",
        end: "9/2005",
        months: 46,
        accomplishments: [
          "Managed full lifecycle development of commercial and consumer products, from trade studies to CAD, stress analysis, prototyping, and manufacturing support",
          "Delivered quality-assured injection-molded and metal part designs and stress analysis (SolidWorks, CosmosWorks)",
          "Redesigned hydraulic solar tracking drive for electric utility client, increasing load capacity by 40% while reducing material costs",
        ],
      },
    ],
  },
];

export default function Experience() {
  const companies = experience.map((company) => (
    <Timeline.Item
      m={0}
      p={0}
      title={
        <Group>
          <Text size={"md"}>{company.company}</Text>
          {/*<Text size={"md"}>*/}
          {/*  {company.start} - {company.end}*/}
          {/*</Text>*/}
        </Group>
      }
      bullet={<Avatar size={22} radius="xl" src={company.logo} />}
    >
      <>
        <Accordion>
          {company.roles.map((role) => (
            <Accordion.Item key={role.title} value={role.title}>
              <Accordion.Control>
                <Group>
                  <Text c="cyan" size={"md"}>
                    {role.title}
                  </Text>
                  <Text c="grey" size={"xs"}>
                    {role.group}
                  </Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <List key={role.title} size={"xs"}>
                  {role.accomplishments.map((bullet) => (
                    <List.Item my="xs">{bullet}</List.Item>
                  ))}
                </List>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </>
    </Timeline.Item>
  ));

  return (
    <Timeline maw={500} mx="auto" mt={0}>
      {companies}
    </Timeline>
  );
}
