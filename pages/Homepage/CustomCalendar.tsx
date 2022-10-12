import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { Button, Modal, Text, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

type Evento = {
  title: string,
  start: Date,
};

export default function CustomCalendar() {
  const [newInfo, setInfo] = useState<Evento[]>([]);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<Evento[]>([]);
  const theme = useMantineTheme();


  const form = useForm ({
    initialValues: {
      title: '',
      time: '',
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Il nome dell evento deve essere lungo almeno 2 caratteri' : null),
  },
  });

  const handleSubmit= ( values: any) => {
    try {
      //console.log(values.time);
      const title = values.title;
      const currDate = values.time;
      if (values.title != null) {
        setEvents([
          ...events,
          {           
            title: title,
            start: currDate,
          },
        ]);
      }
    } catch(err) {
      console.log(err);
    }
    setAddModalOpen(false);
  }

  return (
    <div>
      <FullCalendar
        locales={allLocales}
        locale='it'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay new",
          end: "today prev,next"
        }}

        customButtons= {{
          new: {
            text: 'nuovo evento',
            click: () => setAddModalOpen(true),
            }
        }}
        editable
        selectable
        events={events}
        eventClick={(info) => {setInfo(info.event), setInfoModalOpen(true)}}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        nowIndicator
        displayEventTime
      /> <br />

      <Modal
        centered
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        transition="rotate-left"
        title="Nuovo Evento"
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack noValidate spacing={3}>
            <TextField mt="sm" label="Nome dell'evento" placeholder="Nome" {...form.getInputProps('title')} />
            <TextField mt="sm" label="Orario dell'evento" id="datetime-local" type="datetime-local" sx={{ width: 250 }} InputLabelProps={{ shrink: true, }} {...form.getInputProps('time')} /> <br />
            <Button mt="sm" type="submit">Invia</Button>
          </Stack>
        </form>
      </Modal>

      <Modal
        centered
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        transition="rotate-left"
        title="Descrizione Evento"
      >
        <Text> {newInfo.title} </Text>
        <Text> {newInfo.startStr} </Text>
        <Button color="red" mt="sm" type="submit" onClick={() => {newInfo.remove(), setInfoModalOpen(false)}}>Elimina</Button>
      </Modal>
      
    </div>
  );
}

