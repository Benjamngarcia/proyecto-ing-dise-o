import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Typography, Grid, Button } from "@mui/material";;
import EventCard from "@/components/Cards/Event";
import { allBreads, allUsers } from "@/data";

export default function Home() {
  const [allBreadsState, setAllBreadsState] = useState([]);
  const [allUsersState, setAllUsersState] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || allBreads;
    localStorage.setItem("events", JSON.stringify(events));
    setAllBreadsState(events);

    const users = JSON.parse(localStorage.getItem("users")) || allUsers;
    localStorage.setItem("users", JSON.stringify(users));
    setAllUsersState(users);
  }, []);

  return (
    <>
      <Head>
        <title>Panadería Montpellier</title>
        <meta name="description" content="Explore nuestro delicioso surtido de panes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2} sx={{ overflowX: 'auto', padding: 1 }}>
          {allBreadsState.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
              <EventCard
                imageUrl={event.img}
                name={event.name}
                price={event.price}
                id={event.id}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
