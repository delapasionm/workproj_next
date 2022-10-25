import { Badge, Button, Card, Group, Text } from '@mantine/core'
import React from 'react'
import { Order } from './Order';
import { useStore} from './store';

const CartCard = ({id, titolo, prezzo} : Order) => {
    const { removeOrder } = useStore();

  return (
    <div>
        <Card shadow="sm" p="xs" radius="md" withBorder mt="xl">
            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{titolo}</Text>
                <Badge color="pink">{prezzo}€</Badge>
            </Group>
                <Button
                    onClick={() => {removeOrder(id)}}
                    variant="light" 
                    color="teal" 
                    fullWidth 
                    mt="md" 
                    radius="md"
                >Annulla</Button>
        </Card>
    </div>
  )
}

export default CartCard
