import React, { useState } from "react";
import { Box, Typography, Rating, Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import RoomIcon from "@mui/icons-material/Room";
import EventCard from "@/components/Cards/Event";
import MapaConGoogleMaps from "@/components/common/Map";
import { allEvents } from "@/data";
import { useRouter } from "next/router";

export default function EventDetails() {
  const router = useRouter();
  const { event } = router.query;
  const eventID = parseInt(event);
  const eventDetails = allEvents.find((event) => event.id === eventID);

  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Event details
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-end",
        }}
      >
        <Box
          component="img"
          height="200"
          src={eventDetails.img}
          alt={`Image ${eventDetails.name}`}
          sx={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography variant="h5">{eventDetails.name}</Typography>
          <Typography variant="subtitle1">
            Categories: {eventDetails.categories.join(", ")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Rating
              name="half-rating-read"
              value={eventDetails.scoreAvg}
              readOnly
              precision={0.5}
            />
            <Typography variant="body1">
              ({eventDetails.reviewCount})
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingY: "24px" }}>
        <Typography variant="body2">Date: {eventDetails.dates}</Typography>
        <Typography variant="h5" sx={{ marginTop: "16px" }}>
          Description
        </Typography>
        <Typography variant="body1">{eventDetails.description}</Typography>
        {eventDetails.creator && (
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              width: "fit-content",
            }}
          >
            <Box
              sx={{
                background: "lightgray",
                borderRadius: "50%",
                padding: "6px",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Person />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Typography variant="subtitle1">
                {eventDetails.creator.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                {eventDetails.creator.eventCount} events created
              </Typography>
            </Box>
          </Box>
        )}
        <Typography variant="h5" sx={{ marginTop: "16px" }}>
          Location
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: showMap ? "flex-start" : "center",
            width: "fit-content",
          }}
        >
          <Box
            sx={{
              padding: "6px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RoomIcon />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography variant="subtitle1">{address}</Typography>
            <Button
              variant="text"
              color="primary"
              sx={{ width: "fit-content" }}
              onClick={() => setShowMap(!showMap)}
            >
              Show map
            </Button>
            <Box sx={{ display: showMap ? "block" : "none" }}>
              <MapaConGoogleMaps
                latProp={eventDetails.address.latitude}
                lngProp={eventDetails.address.longitude}
                setAddress={setAddress}
              />
            </Box>
          </Box>
        </Box>
        {/* <Typography variant="body1">
        Coordenadas: Longitud: {eventDetails.address.longitude}, Latitud:{" "}
        {eventDetails.address.latitude}
      </Typography> */}
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            width: "fit-content",
            marginBottom: "16px",
            marginTop: "16px",
          }}
        >
          <Typography variant="h6">User comments</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography variant="h5">{eventDetails.scoreAvg}</Typography>
            <Box>
              <Rating
                name="half-rating-read"
                value={eventDetails.scoreAvg}
                readOnly
                precision={0.5}
              />
              <Typography variant="body1">
                ({eventDetails.reviewCount} comments)
              </Typography>
            </Box>
          </Box>
        </Box>
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
          {eventDetails.comments.map((comment, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                border: "1px solid lightgray",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Person />
                <Typography variant="subtitle1">{comment.name}</Typography>
                <Rating
                  name="half-rating-read"
                  value={comment.rating}
                  readOnly
                  precision={0.5}
                />
              </Box>
              <Typography variant="subtitle2">23 april 2023</Typography>
              <Typography variant="body1">{comment.comment}</Typography>
            </Box>
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{ marginTop: "16px", marginBottom: "16px" }}
        >
          Highlighted events
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
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
            {allEvents
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
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
