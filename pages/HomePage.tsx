import {useState, useContext, createContext} from 'react';
import {UserButton} from './components/UserButton';
import {IconLogout, IconEdit, IconBook} from '@tabler/icons';
import {
    AppShell,
    Header,
    Navbar,
    useMantineTheme,
    MediaQuery,
    Burger,
    Group,
    Menu,
    Button
} from '@mantine/core';
import {Auth} from 'aws-amplify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from './components/UserContext';
import { UserValues } from './components/LoginForm';
import React from 'react';


export default function HomePage() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    let navigate = useRouter();

    const { user } = useContext(UserContext);

    console.log(user);
    

    /* async function signOut() {
        try {
            await Auth.signOut();
            navigate("/", {replace: true});
        } catch (error) {
            console.log('error signing out: ', error);
        }
    } */

    function handleClick() {
        navigate.push("/ChangePsw");
    }

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}

            navbarOffsetBreakpoint="sm"

            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                    <Navbar.Section grow>
                        <Link href="/components/CustomCalendar"><Button color="cyan" mt="sm">Calendario</Button></Link><br/>
                        <Link href="/components/CustomTable"><Button color="cyan" mt="sm">Tabella Utenti</Button></Link> <br/>
                        <Link href="/components/CustomCalendar2"><Button color="cyan" mt="sm">Calendario2</Button></Link><br/>
                    </Navbar.Section>
                    <Navbar.Section>
                        <Group position="center">
                            <Menu transition='rotate-right' transitionDuration={150} shadow="md" width={200}>
                                <Menu.Target>
                                    <UserButton
                                        image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                                        name={user}
                                        email={user + "@gmail.com"}
                                    />
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item icon={<IconLogout size={14}/>}
                                               onClick={() => navigate.push("/")}>
                                        Logout
                                    </Menu.Item>
                                    <Menu.Item icon={<IconEdit size={14}/>}
                                                onClick={() => handleClick()}>
                                        Cambia Password
                                    </Menu.Item>
                                </Menu.Dropdown>

                            </Menu>
                        </Group>
                    </Navbar.Section>
                </Navbar>
            }

            header={
                <Header id="header" height={70} p="md">
                    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <Link href='/components/Home'><IconBook size={50}/></Link>
                    </div>
                </Header>
            }
        >
            
        </AppShell>
    );
}