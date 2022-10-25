import { Card } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useStore } from '../components/store';

const Orders = () => {
    const { orders, card } = useStore(); 

    return (
        <div>
            
            <h1>Ordini</h1>
            { card ?
                <div>
                    {orders.map((order) => (
                        <div key={order.id}>
                            <Card 
                                shadow="sm" 
                                p="xs" 
                                radius="md" 
                                withBorder 
                                mt="xl"
                                style={{width : "30vw"}}
                            >
                                <h3>{order.titolo}</h3>
                                <h3>{order.prezzo}</h3>
                            </Card>
                        </div>
                    ))}
                </div>
                : null
            }
        </div>
    )
}

export default Orders
