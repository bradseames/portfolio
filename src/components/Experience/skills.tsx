import {Group, List} from '@mantine/core';
import {skill_groups} from './data';

export default function Skills() {
    const skill_cats = skill_groups.map((skill) => (
        <List>
            <List.Item>
                <Group justify='space-between' align='flex-start'>
                    <>{skill.category}:</>
                    <>
                        {skill.skills.map((bullet) => (
                            <span> {bullet},</span>
                        ))}
                    </>
                </Group>
            </List.Item>
        </List>
    ));

    return (
        <>
            <h3>Skills</h3>
            {skill_cats}
        </>
    );
}
