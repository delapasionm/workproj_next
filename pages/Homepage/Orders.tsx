import { Card, Text, Badge } from '@mantine/core';
import React, { useContext } from 'react'
import { useStore } from '../components/store';
import { UserContext } from '../components/UserContext';

const Orders = () => {
    const { newOrders, card } = useStore(); 
    const { user } = useContext(UserContext);

    console.log(newOrders);

    return (
        <div>
            
            <Text size="xl" weight={700}  color="teal">Ordini</Text>
            { card ?
                <div>
                    <Text>{user.username}, ecco gli ordini che hai acquistato:</Text>
                    {newOrders.map((newOrder) => (
                        <div key={newOrder.id}>
                            <Card 
                                shadow="sm" 
                                p="xs" 
                                radius="md" 
                                withBorder 
                                mt="xl"
                                style={{width : "30vw"}}
                            >
                                <Text weight={500} color="teal">{newOrder.titolo}</Text>
                                <Badge size='xl' color="pink">{newOrder.prezzo}€</Badge>
                            </Card>
                        </div>
                    ))}
                </div>
                : <Text>Non hai ancora fatto nessun ordine</Text>
            }
        </div>
    )
}

export default Orders
