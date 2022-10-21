import { Button, Card, Text } from '@mantine/core'
import React from 'react'
import { useStore } from '../Homepage/HoursPack';

const CartCard = () => {
    const card = useStore((state: any) => state.card);
    const setCard = useStore((state:any) => state.updateCard);
  return (
    <div>
        {card ?
            <Card shadow="sm" p="xs" radius="md" withBorder mt="xl">
                <Text></Text>
                <Button onClick={() => setCard(false)}>Annulla</Button>
            </Card>
        : null}
    </div>
  )
}

export default CartCard
