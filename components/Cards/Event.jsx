import React, { useState, useEffect } from "react";
import {
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

function EventCard(props) {
  const router = useRouter();
  const { imageUrl, name, price, id } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica si hay una sesión de usuario activa
    const session = localStorage.getItem("userSession");
    setIsUserLoggedIn(!!session);
  }, []);

  const redirectToEvent = (id) => {
    router.push(`/bread-details/${id}`);
  };

  const addToCart = (id) => {
    const session = localStorage.getItem("userSession");
    if (session) {
      const user = JSON.parse(session);
      const users = JSON.parse(localStorage.getItem("users"));
      const userIndex = users.findIndex((u) => u.id === user.id);
      const itemToAdd = { breadId: id, quantity: 1 }; // Suponiendo que siempre se añade 1 cantidad

      if (userIndex >= 0) {
        users[userIndex].cart = users[userIndex].cart || [];
        // Comprueba si el artículo ya está en el carrito para incrementar la cantidad
        const itemIndex = users[userIndex].cart.findIndex(
          (item) => item.breadId === id
        );
        if (itemIndex >= 0) {
          users[userIndex].cart[itemIndex].quantity += 1;
        } else {
          users[userIndex].cart.push(itemToAdd);
        }
        localStorage.setItem("users", JSON.stringify(users));
        alert("Producto añadido al carrito");
      }
    }
  };

  return (
    <Box
      sx={{
        padding: "8px",
        borderRadius: "8px",
        maxWidth: 200,
        backgroundColor: "transparent",
        textAlign: "center",
        border: "1px solid #eceff1",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <CardActionArea onClick={() => redirectToEvent(id)}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={`Imagen de ${name}`}
          sx={{
            borderRadius: "12px",
            // margin: "8px",
            border: "2px solid #ffeb3b",
          }}
        />
      </CardActionArea>
      <CardContent
        sx={{
          padding: "8px 0",
          backgroundColor: "#29a636",
          margin: "8px 0px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "white" }}>
          {name} ${price.toFixed(2)}
        </Typography>
      </CardContent>
      {isUserLoggedIn && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => addToCart(id)}
          sx={{
            // margin: "8px",
            backgroundColor: "#ffeb3b",
            color: "black",
            "&:hover": { backgroundColor: "#ffee58" },
            width: "100%",
            borderRadius: "8px",
          }}
        >
          Agregar al carrito
        </Button>
      )}
    </Box>
  );
}

export default EventCard;
