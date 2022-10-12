import {useState, useContext, createContext, ReactElement} from 'react';
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
import { Router, useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from './components/UserContext';
import React from 'react';


const HomePage = ({children}:any) => {
    const router = useRouter();
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
                            {router.pathname.startsWith("/Nipote/") ?
                                <div> <Link href="/Homepage/CustomCalendar"><Button variant='subtle' color="cyan" mt="sm">Calendario</Button></Link><br/></div> :
                                router.pathname.startsWith("/Nonno/") ?
                                <div><Link href="/Homepage/CustomCalendar2"><Button variant='subtle' color="cyan" mt="sm">Calendario2</Button></Link><br/></div> :
                                <div><Link href="/Homepage/CustomTable"><Button variant='subtle' color="cyan" mt="sm">Tabella Utenti</Button></Link> <br/></div>
                            }
                            {/* <div>
                                <Link href="/Homepage/CustomTable"><Button variant='subtle' color="cyan" mt="sm">Tabella Utenti</Button></Link> <br/>
                                <Link href="/Homepage/CustomCalendar2"><Button variant='subtle' color="cyan" mt="sm">Calendario2</Button></Link><br/>
                                <Link href="/Homepage/CustomCalendar"><Button variant='subtle' color="cyan" mt="sm">Calendario</Button></Link><br/>
                            </div> */}
                    </Navbar.Section>
                    <Navbar.Section>
                        <Group position="center">
                            <Menu withArrow position='top' transition='rotate-right' transitionDuration={150} shadow="md" width={200}>
                                <Menu.Target>
                                    <UserButton
                                        image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                                        name={"User"}
                                        email={"user@gmail.com"}
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
                <Header id="header" height={70} p="md" style={{backgroundColor: 'aquamarine'}}>
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
                        <Link href='/HomePage'><IconBook className='homebutton' size={50}/></Link>
                    </div>
                </Header>
            }
        >
            {children}
            {router.pathname === "/HomePage" ? 
            <div>
                <h2>Benvenut* {user.username}</h2>
                <p>Nella sezione Calendario potrai creare gli appuntamenti.</p>
                <p>Nella sezione Calendario2 potrai visualizzare gli eventi disponibili</p>
                <p>Nella sezione Tabella Utenti potrai vedere gli utenti iscritti alla community.</p>
                <p>Cliccando il tuo utente in basso potrai cambiare la Password o fare il Logout.</p>
            </div> : null
        }
            
        </AppShell>
    );
}

export default HomePage;