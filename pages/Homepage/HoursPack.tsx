import React, { useState, useEffect } from 'react'
import { Text, Card, Group, Badge, Image, Button, SimpleGrid, Aside, MediaQuery } from '@mantine/core';
import { Pacchetti } from '../components/Order';
import CartCard from '../components/CartCard';
import { useStore } from '../components/store';

const HoursPack = () => {

   const { addOrders, orders, updateCard, prezzo } = useStore();
   const [ show, setShow ] = useState<boolean>(false);
   
  return (
    <div>
        <Text size="xl" weight={700}  color="teal" align="center">Pacchetti</Text>
        {Pacchetti.map((pacchetto) => (
            <div>
                
               <SimpleGrid cols={2}>
                  <Card shadow="sm" p="xs" radius="md" withBorder mt="xl">
                        <Card.Section>  
                           <Image src="/pacchetto.jpg" height={160} />
                        </Card.Section>
                        
                        <Group position="apart" mt="md" mb="xs">
                           <Text weight={500}>{pacchetto.titolo}</Text>
                           <Badge color="pink" variant="light">
                              {pacchetto.prezzo} €
                           </Badge>
                        </Group>
                        <Button 
                           variant="light" 
                           color="teal" 
                           fullWidth 
                           mt="md" 
                           radius="md"
                           onClick={() => {
                              addOrders(pacchetto.titolo, pacchetto.prezzo);
                              setShow(true); 
                           }}
                        >
                           Metti nel carrello
                        </Button>
                  </Card>
               </SimpleGrid>
            </div>   
        )) }

         <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside p="md"  width={{ sm: 200, lg: 300 }}>
            <Text size="xl" weight={700}  color="teal" align="center">Carrello:</Text>
               {show ?
                  <div>
                     {orders.map((order) => (
                        <div key={order.id}>
                           <CartCard id={order.id} titolo={order.titolo} prezzo={order.prezzo} />
                        </div>
                     ))}
                     <Button 
                        variant="light" 
                        fullWidth 
                        mt="md" 
                        radius="md"
                        onClick={() => { updateCard(true) }}
                     >
                        Procedi all'acquisto
                     </Button>
                     <hr />
                     <Text>{prezzo}€</Text>
                  </div>
                  : null
               }
            </Aside>
         </MediaQuery>
    </div>
  )
}

export default HoursPack
