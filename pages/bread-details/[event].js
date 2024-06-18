import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  useMediaQuery,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { allBreads } from "@/data";
import { useRouter } from "next/router";

export default function BreadDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { event } = router.query;
  const eventID = parseInt(event);
  const eventDetails = allBreads.find((bread) => bread.id === eventID);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("userSession");
      setIsUserLoggedIn(!!session);
      setLoading(false);
    }
  }, []);

  if (!eventDetails) {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
        Detalles del pan no encontrados.
      </Typography>
    );
  }

  const scoreSumatory = eventDetails.comments.reduce(
    (acc, comment) => acc + comment.score,
    0
  );
  const scoreAvg = scoreSumatory / eventDetails.comments.length;

  const addToCart = () => {
    if (isUserLoggedIn) {
      const user = JSON.parse(localStorage.getItem("userSession"));
      const users = JSON.parse(localStorage.getItem("users"));
      const userIndex = users.findIndex((u) => u.id === user.id);
      const itemToAdd = { breadId: eventID, quantity: 1 };

      if (userIndex >= 0) {
        users[userIndex].cart = users[userIndex].cart || [];
        const itemIndex = users[userIndex].cart.findIndex(
          (item) => item.breadId === eventID
        );
        if (itemIndex >= 0) {
          users[userIndex].cart[itemIndex].quantity += 1;
        } else {
          users[userIndex].cart.push(itemToAdd);
        }
        localStorage.setItem("users", JSON.stringify(users));
        alert("Producto añadido al carrito");
      }
    } else {
      alert("Por favor inicia sesión para añadir productos al carrito.");
    }
  };

  const comments = eventDetails.comments.map((comment) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.id === comment.userId);
    return {
      ...comment,
      name: `${user.firstName} ${user.lastName}`,
    };
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Detalles del pan
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "16px",
          alignItems: isMobile ? "center" : "flex-end",
        }}
      >
        <Box
          component="img"
          sx={{
            width: isMobile ? "100%" : "200px",
            height: isMobile ? "100%" : "200px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
          src={eventDetails.img}
          alt={`Imagen de ${eventDetails.name}`}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography variant="h5">{eventDetails.name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography variant="h5">{scoreAvg.toFixed(1)}</Typography>
            <Rating
              name="half-rating-read"
              value={scoreAvg}
              readOnly
              precision={0.5}
            />
            <Typography variant="body1">
              ({eventDetails.comments.length} comentarios)
            </Typography>
          </Box>
          {isUserLoggedIn && (
            <Button
              color="primary"
              variant="contained"
              onClick={addToCart}
              sx={{
                backgroundColor: "#ffeb3b",
                color: "black",
                "&:hover": { backgroundColor: "#ffee58" },
                marginTop: "16px",
              }}
            >
              Agregar al carrito
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={{ paddingY: "24px" }}>
        <Typography variant="h5">Descripción</Typography>
        <Typography variant="body1">{eventDetails.description}</Typography>
        <Typography
          variant="h6"
          sx={{ marginTop: "16px", marginBottom: "8px" }}
        >
          Comentarios de usuarios
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            overflowX: isMobile ? "hidden" : "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {comments.map((comment, index) => (
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
                  value={comment.score}
                  readOnly
                  precision={0.5}
                />
              </Box>
              <Typography variant="subtitle2">{comment.date}</Typography>
              <Typography variant="body1">{comment.comment}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
