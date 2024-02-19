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
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';








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
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const decodedTokenObject = decodedToken as { [key: string]: any };
    const navigate = useNavigate()
    const theme = useMantineTheme();
    const handleLogout = () => {

        localStorage.removeItem('token');


        navigate('/');
    };
    return (
        <Menu withArrow>
            <Menu.Target>
                <UserButton
                    image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                    name={decodedTokenObject?.name || ""}
                    email={decodedTokenObject?.email || ""}
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
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                        />

                        <div>
                            <Text fw={500}>{decodedTokenObject?.name || "Unknown"}</Text>
                            <Text size="xs" c="dimmed">
                                {decodedTokenObject?.email || "Unknown"}
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
                    Liked Tasks
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
                    Saved Tasks
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
                    Your Tasks
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
                    color="red"
                    leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    onClick={handleLogout}
                >
                    Logout
                </Menu.Item>




            </Menu.Dropdown>
        </Menu>
    );
}

export default UserMenu