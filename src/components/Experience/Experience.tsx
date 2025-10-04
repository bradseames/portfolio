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

import {experience} from './data';

export default function Experience() {
    const companies = experience.map((company) => (
        <Timeline.Item
            title={
                <Group justify='space-between' align='flex-start'>
                    <Text>{company.company}</Text>
                    <Text size='sm' pr='md'>
                        {company.start} - {company.end}
                    </Text>
                </Group>
            }
            bullet={<Avatar size={22} radius='xl' src={company.logo}/>}
        >
            <>
                <Accordion chevronPosition='left' variant='filled'>
                    {company.roles.map((role) => (
                        <Accordion.Item key={role.title} value={role.title}>
                            <Accordion.Control>
                                <Group justify='space-between' align='center'>
                                    <Group justify='left' align='center'>
                                        <Text>{role.title}</Text>
                                        <Text c='dimmed' size='sm'>
                                            {role.group}
                                        </Text>
                                    </Group>

                                    <Text c='dimmed' size='sm'>
                                        <NumberFormatter
                                            value={role.months / 12}
                                            decimalScale={1}
                                        />
                                        {' yr'}
                                    </Text>
                                </Group>
                            </Accordion.Control>

                            <Accordion.Panel>
                                <List size='sm' pl='xl' pr='xl'>
                                    {role.accomplishments.map((bullet) => (
                                        <List.Item c='gray'>{bullet}</List.Item>
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
        <Timeline bulletSize={24} h='500' p='xl'>
            {companies}
        </Timeline>
    );
}
