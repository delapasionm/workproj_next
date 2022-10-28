import React, { useContext, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import allLocales from "@fullcalendar/core/locales-all";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useMantineTheme, Modal, Text, Button } from "@mantine/core";
import { UserContext } from "../components/UserContext";

export default function CustomCalendar2() {
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [newInfo, setInfo] = useState<any>([]);
    const theme = useMantineTheme();

    const events = [
        {
            title: "Prova1", 
            start: new Date('2022-10-01T00:00:00+02:00'),
        },
        {
            title: "Prova2", 
            start: new Date('2022-10-02T16:00:00+02:00'),
        },
        {
            title: "Prova3", 
            start: new Date('2022-10-12T11:00:00+02:00'),
        },
        {
            title: "Prova4", 
            start: new Date('2022-10-16T12:30:00+02:00'),
        },
        {
            title: "Prova5", 
            start: new Date('2022-10-20T18:45:00+02:00'),
        },
        {
            title: "Prova6", 
            start: new Date('2022-10-22T10:00:00+02:00'),
        },
    ]

  return (
    <div>
        <FullCalendar
            locales={allLocales}
            locale='it'
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
            start: "title",
            center: "dayGridMonth,timeGridWeek,timeGridDay",
            end: "today prev,next"
            }}
            editable
            selectable
            events={events}
            eventClick={(info: any) => {setInfo(info.event),setAddModalOpen(true)}}
            views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
            nowIndicator
            displayEventTime
        />

        <Modal
            size="xs"
            centered
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            transition="rotate-left"
            title="Vuoi confermare questo appuntamento?"
        >
            <Text>{newInfo.title}</Text>
            <Text>{newInfo.startStr}</Text>
            <Button mt="sm" type="submit" onClick={(newInfo: any) => {/*, updateEvent(newInfo), setColor('green'),*/console.log(newInfo), newInfo.color = 'green', setAddModalOpen(false)}}> Certo</Button>
        </Modal>
    </div>
  );
}

