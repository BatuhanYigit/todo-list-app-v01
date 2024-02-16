import { forwardRef } from 'react';
import { Menu, Group, Text, Avatar, useMantineTheme, ActionIcon, rem, UnstyledButton } from '@mantine/core';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronRight,
    IconDots,
} from '@tabler/icons-react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            style={{
                padding: 'var(--mantine-spacing-md)',
                color: 'var(--mantine-color-text)',
                borderRadius: 'var(--mantine-radius-sm)',
            }}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <IconChevronRight size="1rem" />}
            </Group>
        </UnstyledButton>
    )
);

function UserMenu() {
    const theme = useMantineTheme();
    return (
        <Menu withArrow>
            <Menu.Target>
                <UserButton
                    image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                    name="Batuhan Yiğit"
                    email="batuhan-test@outlook.com"
                />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    rightSection={
                        <IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                >
                    <Group>
                        <Avatar
                            radius="xl"
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                        />

                        <div>
                            <Text fw={500}>Batuhan Yiğit</Text>
                            <Text size="xs" c="dimmed">
                                batuhan-test@outlook.com
                            </Text>
                        </div>
                    </Group>
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                    leftSection={
                        <IconHeart
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                            color={theme.colors.red[6]}
                        />
                    }
                >
                    Liked posts
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconStar
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                            color={theme.colors.yellow[6]}
                        />
                    }
                >
                    Saved posts
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconMessage
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                            color={theme.colors.blue[6]}
                        />
                    }
                >
                    Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                    leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                    Account settings
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                >
                    Change account
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                    Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    leftSection={
                        <IconPlayerPause style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                >
                    Pause subscription
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                    Delete account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default UserMenu