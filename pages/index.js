import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Typography, Grid, Button } from "@mui/material";;
import EventCard from "@/components/Cards/Event";
import { allBreads, allUsers } from "@/data";

export default function Home() {

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || allBreads;
    localStorage.setItem("events", JSON.stringify(events));

    const users = JSON.parse(localStorage.getItem("users")) || allUsers;
    localStorage.setItem("users", JSON.stringify(users));
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
        <Typography variant="h4" gutterBottom>
          Ver todas nuestras opciones de panes
        </Typography>
        
      </Box>
    </>
  );
}
