import {useState, useContext, useEffect} from 'react';
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
    Button,
    Text
} from '@mantine/core';
import {Auth} from 'aws-amplify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from './components/UserContext';
import React from 'react';


const HomePage = ({children}:any) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const navigate = useRouter();
    const { user } = useContext(UserContext);
    console.log(user);

    useEffect(() => {
        if(user === null) {
          navigate.push('/');
        }
      },[]);


    async function signOut(): Promise<void> {
        try {
            await Auth.signOut();
            navigate.push("/");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    function handleClick(): void {
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
                        {
                            user === null ? null :
                            user.tutor ? 
                            <div>
                                <Link href="/Homepage/CustomCalendar"><Button variant='subtle' color="cyan" mt="sm">Calendario</Button></Link><br/>
                            </div> :
                            user.student ?
                            <div>
                                <Link href="/Homepage/CustomCalendar2"><Button variant='subtle' color="cyan" mt="sm">Calendario</Button></Link><br/>
                                <Link href="/Homepage/HoursPack"><Button variant='subtle' color="cyan" mt="sm">Pacchetti</Button></Link><br/>
                            </div> :
                            user.admin ?
                            <div><Link href="/Homepage/CustomTable"><Button variant='subtle' color="cyan" mt="sm">Tabella Utenti</Button></Link> <br/></div> :
                            null 
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
                                        name={user === null ? null : user.username}
                                        email={user === null ? null : user.attributes.email}
                                    />
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item icon={<IconLogout size={14}/>}
                                               onClick={() => signOut()}>
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
                <Text size="xl" weight={700}  color="teal" align="center">Benvenutə {!user ? null : user.username}!</Text>
                {   
                    !user ? null :
                    user.tutor ? 
                    <div>
                        <Text align="center">{user.username} Sei nella parte Tutor</Text>
                        <Text align="center">Nella sezione Calendario potrai creare gli appuntamenti.</Text> 
                    </div> :
                    user.student ?
                    <div>
                        <Text align="center">{user.username} Sei nella parte Cliente</Text>
                        <Text align="center">Nella sezione Calendario potrai visualizzare gli eventi disponibili</Text> 
                    </div> :
                    user.admin ?
                    <div>
                        <Text align="center">{user.username} Sei nella parte Admin</Text>
                        <Text align="center">Nella sezione Tabella Utenti potrai vedere gli utenti iscritti alla community.</Text> 
                    </div>:
                    <Text align="center">Attenzione! Non hai selezionato alcun ruolo!!</Text>
                }
                <Text align="center">Cliccando il tuo utente in basso potrai cambiare la Password o fare il Logout.</Text>
            </div> : null
        }
        </AppShell>
    );
}

export default HomePage;