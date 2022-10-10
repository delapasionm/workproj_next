import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import image from '../images/image.svg';
import { Link } from 'react-router-dom';
import React from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function ErrorPage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        {/*<Image src={image} className={classes.mobileImage} />*/}
        <div>
          <Title className={classes.title}>Qualcosa è andato storto...</Title>
          <Text color="dimmed" size="lg">
            La pagina che stai cercando di aprire non esiste. Forse hai sbagliato a scrivere l indirizzo, o la pagina è stata spostata.
          </Text>
          <Link to='/'>
            <Button variant="outline" size="md" mt="xl" className={classes.control}>
              Torna alla sezione Login
            </Button>
          </Link>
          
        </div>
        <Image src={image}  />
      </SimpleGrid>
    </Container>
  );
}