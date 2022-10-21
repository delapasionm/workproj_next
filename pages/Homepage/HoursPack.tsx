import React, { useState } from 'react'
import { Text, Card, Group, Badge, Image, Button, SimpleGrid, Aside, MediaQuery } from '@mantine/core';
import { Pacchetti } from '../components/Pack';
import CartCard from '../components/CartCard';
import create from 'zustand';
import { useStore } from '../components/store';


const HoursPack = () => {

   const setCard = useStore((state: any) => state.updateCard)
   const setTitle = useStore((state: any) => state.updateTitle)
   const setPrice = useStore((state: any) => state.updatePrice)

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
                              {pacchetto.prezzo}
                           </Badge>
                        </Group>
                        <Button 
                           variant="light" 
                           color="teal" 
                           fullWidth 
                           mt="md" 
                           radius="md"
                           onClick={() => {setCard(true), setTitle(pacchetto.titolo), setPrice(pacchetto.prezzo)}}
                        >
                           Metti nel carrello
                        </Button>
                  </Card>
               </SimpleGrid>
            </div>   
        ))
        }
         <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside p="md"  width={{ sm: 200, lg: 300 }}>
               <Text size="xl" weight={700}  color="teal" align="center">Carrello:</Text>
               <CartCard />
            </Aside>
         </MediaQuery>
    </div>
  )
}

export default HoursPack
