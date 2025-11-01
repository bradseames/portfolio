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
} from '@mantine/core';

// const logos_folder = '/assets/images/logos/';
// const portfolio_folder = '/assets/images/portfolio/';
import { experience } from './data';
// import { experience } from '../../data/portfolio-images.json'

export default function Experience() {
  const companies = experience.map((company) => (
      <Timeline.Item
          title={
            <Group>
              <Text>{company.company}</Text>
              <Text>
                {company.start} - {company.end}
              </Text>
            </Group>
          }
          bullet={
            <Avatar size={22} radius="xl" src={company.logo} />}
      >
        <>
          <Accordion>
            {company.roles.map((role) => (
                <Accordion.Item key={role.title} value={role.title}>
                  <Accordion.Control>
                    <Group>
                      <Text>{role.title}</Text>
                      <Text>{role.group}</Text>

                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <List key={role.title}>
                      {role.accomplishments.map((bullet) => (
                          <List.Item>{bullet}</List.Item>
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
      <Timeline>
        {companies}
      </Timeline>
  );
}
