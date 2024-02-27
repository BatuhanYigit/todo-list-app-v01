import { Card, Avatar, Text, Progress, Badge, Group, ActionIcon } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { IconUpload } from '@tabler/icons-react';

const avatars = [
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
];

interface CardData {
    title: string;
    description: string;
    completedTasks: number;
    totalTasks: number;
    avatars: string[];
}

export function CardTest({ data }: { data: CardData }) {
    const { title, description, completedTasks, totalTasks, avatars } = data;

    return (
        <Card withBorder padding="lg" radius="md">
            <Group justify="space-between">
                <MantineLogo type="mark" size="2rem" />
                <Badge>12 days left</Badge>
            </Group>

            <Text fz="lg" fw={500} mt="md">
                {title}
            </Text>
            <Text fz="sm" c="dimmed" mt={5}>
                {description}
            </Text>

            <Text c="dimmed" fz="sm" mt="md">
                Tasks completed:{' '}
                <Text span fw={500} c="bright">
                    {completedTasks}/{totalTasks}
                </Text>
            </Text>

            <Progress value={(completedTasks / totalTasks) * 100} mt={5} />

            <Group justify="space-between" mt="md">
                <Avatar.Group spacing="sm">
                    {avatars.map((avatar, index) => (
                        <Avatar key={index} src={avatar} radius="xl" />
                    ))}
                    <Avatar radius="xl">+5</Avatar>
                </Avatar.Group>
                <ActionIcon variant="default" size="lg" radius="md">
                    <IconUpload size="1.1rem" />
                </ActionIcon>
            </Group>
        </Card>
    );
}

export default CardTest