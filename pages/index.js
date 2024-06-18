import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Typography } from "@mui/material";
import EventCard from "@/components/Cards/Event";
import ReviewModal from "@/components/Forms/ReviewForms";
import { allEvents, allUsers } from "@/data";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [allEventsState, setAllEventsState] = useState([]);
  const [allUsersState, setAllUsersState] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events"));
    if (!events) {
      localStorage.setItem("events", JSON.stringify(allEvents));
    } else {
      setAllEventsState(events);
    }
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      localStorage.setItem("users", JSON.stringify(allUsers));
    } else {
      setAllUsersState(users);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Cultura sin fronteras</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h6">Highlighted events</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          overflowX: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* {allEventsState
          .filter((event) => event.isBoosted.valueOf() === true)
          .map((event) => (
            <EventCard
              key={event.id}
              imageUrl={event.img}
              name={event.name}
              startDate={event.dates}
              endDate={event.endDate}
              rating={event.scoreAvg}
              id={event.id}
            />
          ))} */}
      </Box>
      <Typography variant="h6">Explore cultural events</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          overflowX: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {allEventsState
          .filter((event) => event.categories.includes("Culture"))
          .map((event) => (
            <EventCard
              key={event.id}
              imageUrl={event.img}
              name={event.name}
              startDate={event.dates}
              endDate={event.endDate}
              rating={event.scoreAvg}
              id={event.id}
            />
          ))}
      </Box>
      <Typography variant="h6">Explore adventure</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          overflowX: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {allEventsState
          .filter((event) => event.categories.includes("Adventure"))
          .map((event) => (
            <EventCard
              key={event.id}
              imageUrl={event.img}
              name={event.name}
              startDate={event.dates}
              endDate={event.endDate}
              rating={event.scoreAvg}
              id={event.id}
            />
          ))}
      </Box>
      {/* <Button variant="contained" color="primary" onClick={handleModalOpen}>
        Deja un review
      </Button> */}
      <ReviewModal open={modalOpen} onClose={handleModalClose} />
    </>
  );
}
