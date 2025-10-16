import { Avatar, Badge, Group, Select, Table, Text } from '@mantine/core';
// @ts-ignore
const data = [
  {
    avatar:
      'src/assets/images/logos/virgin_galactic_logo.jpg',
    name: 'Virgin Galactic (Contact)',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    role: 'Stress',
    lastActive: '2 days ago',
    active: true,
  },
  {
    avatar:
      'src/assets/images/logos/collins_aerospace_logo.jpg',
    name: 'Collins Aerospace',
    job: 'Stress',
    email: 'jj@breaker.com',
    role: 'Stress',
    lastActive: '6 days ago',
    active: true,
  },
  {
    avatar:
      'src/assets/images/logos/orbital_logo.jpg',
    name: 'Orbital Sciences',
    job: 'Sevel',
    email: 'henry@silkeater.io',
    role: 'Developer',
    lastActive: '2 days ago',
    active: false,
  },
  {
    avatar:
      'src/assets/images/logos/coolwell_logo.jpg',
    name: 'Coolwell',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    role: 'Design',
    lastActive: '5 days ago',
    active: true,
  },
  {
    avatar:
      'src/assets/images/logos/raytech_logo.jpg',
    name: 'Raytech',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    role: 'Design',
    lastActive: '3 days ago',
    active: false,
  },
];

const rolesData = ['Design', 'Stress', 'Developer'];


export default function SelectTable() {

  const rows = data.map((item) => (

    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="xs">
          <Avatar size={30} src={item.avatar} radius={30} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Select
          data={rolesData}
          defaultValue={item.role}
          variant="unstyled"
          allowDeselect={false}
        />
      </Table.Td>
      <Table.Td>{item.lastActive}</Table.Td>
      <Table.Td>
        {item.active ? (
          <Badge fullWidth variant="light">
            Active
          </Badge>
        ) : (
          <Badge color="gray" fullWidth variant="light">
            Disabled
          </Badge>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Last active</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
