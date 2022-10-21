import { Badge, Button, Card, Group, Text } from '@mantine/core'
import React from 'react'
import { useStore} from './store';

const CartCard = () => {
    const card = useStore((state: any) => state.card);
    const setCard = useStore((state:any) => state.updateCard);
    const title = useStore((state: any) => state.title);
    const price = useStore((state: any) => state.price);

  return (
    <div>
        {card ?
            <div>
                <Card shadow="sm" p="xs" radius="md" withBorder mt="xl">
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>{title}</Text>
                        <Badge color="pink">{price}</Badge>
                    </Group>
                        <Button
                            onClick={() => setCard(false)}
                            variant="light" 
                            color="teal" 
                            fullWidth 
                            mt="md" 
                            radius="md"
                        >Annulla</Button>
                    
                </Card>
                <Button 
                    variant="light" 
                    fullWidth 
                    mt="md" 
                    radius="md"
                >
                    Procedi all'acquisto
                </Button>
            </div>
        : null}
    </div>
  )
}

export default CartCard
