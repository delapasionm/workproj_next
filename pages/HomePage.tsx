import {useState, useContext, useEffect} from 'react';
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
    Text,
    UnstyledButton,
    Avatar
} from '@mantine/core';
import {Auth} from 'aws-amplify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from './components/UserContext';
import React from 'react';


const HomePage = ({children}:any) => {
    const image = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
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
                    <Navbar.Section>
                        {
                            !user ? null :
                            user.tutor ? 
                            <div>
                                <Link href="/Homepage/CustomCalendar"><Button variant='subtle' color="cyan" mt="sm">Calendario</Button></Link><br/>
                            </div> :
                            user.cliente ?
                            <div>
                                <Link href="/Homepage/CustomCalendar2"><Button variant='subtle' color="cyan" mt="sm">Calendario</Button></Link><br/>
                                <Link href="/Homepage/HoursPack"><Button variant='subtle' color="cyan" mt="sm">Pacchetti</Button></Link><br/>
                                <Link href="/Homepage/Orders"><Button variant='subtle' color="cyan" mt="sm">Ordini</Button></Link><br/>
                            </div> :
                            user.admin ?
                            <div><Link href="/Homepage/CustomTable"><Button variant='subtle' color="cyan" mt="sm">Tabella Utenti</Button></Link> <br/></div> :
                            null 
                        }
                    </Navbar.Section>
                    <br />
                    <br />
                    <Navbar.Section>
                        
                        <Group position="center">
                            <Menu withArrow position='top' transition='rotate-right' transitionDuration={150} shadow="md" width={150}>
                                <Menu.Target>
                                    <UnstyledButton>
                                        <Group>
                                            <Avatar size={40} src={image} radius="xl" color="blue"></Avatar>
                                            <div>
                                            <Text>{ !user ? null : user.username }</Text>
                                            <Text size="xs" color="dimmed">{ !user ? null : user.attributes.email }</Text>
                                            </div>
                                        </Group>
                                    </UnstyledButton> 
                                </Menu.Target>

                                <Menu.Dropdown >
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
                        <Text align="center">{user.username} sei nella parte Tutor</Text>
                        <Text align="center">Nella sezione Calendario potrai creare gli appuntamenti.</Text> 
                    </div> :
                    user.cliente ?
                    <div>
                        <Text align="center">{user.username} sei nella parte Cliente</Text>
                        <Text align="center">Nella sezione Calendario potrai visualizzare gli eventi disponibili</Text> 
                        <Text align="center">Nella sezione Pacchetti potrai acquistare i pacchetti ore</Text> 
                        <Text align="center">Nella sezione Ordini potrai visualizzaregli ordini acquistati precedentemente</Text> 
                    </div> :
                    user.admin ?
                    <div>
                        <Text align="center">{user.username} sei nella parte Admin</Text>
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

