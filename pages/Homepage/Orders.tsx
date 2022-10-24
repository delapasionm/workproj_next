import { Button, TextInput, Card } from '@mantine/core';
import { formContainer } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { useStore } from '../components/store';

interface CustomOrders {
    title : string,
    price : number,
}

const Orders = () => {
    const text = useStore((state: any) => state.title);
    const price = useStore((state: any) => state.price);
    const [orders, setOrders] = useState<CustomOrders[]>([]);

    useEffect(() => {
        setOrders([...orders, {title : text, price : price}])
    }, [])

    return (
        <div>
            <h1>Ordini</h1>
            {orders.map((order) => (
                <div key={order.title}>
                    <Card shadow="sm" p="xs" radius="md" withBorder mt="xl">
                        <h3>{order.title}</h3>
                        <h3>{order.price}</h3>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default Orders
