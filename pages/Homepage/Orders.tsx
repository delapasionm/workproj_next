import { Card } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useStore } from '../components/store';

interface CustomOrders {
    title : string,
    price : number,
}

const Orders = () => {
    const text = useStore((state: any) => state.orderTitle);
    const price = useStore((state: any) => state.orderPrice);
    const [setOrders] = useState<CustomOrders[]>([]);
    const { orders } = useStore(); 

   /*  useEffect(() => {
        setOrders([...orders, {title : text, price : price},])
    }, [text]) */

    return (
        <div>
            <h1>Ordini</h1>
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
    )
}

export default Orders
