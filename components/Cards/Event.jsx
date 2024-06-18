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
      const userIndex = users.findIndex(u => u.id === user.id);
      const itemToAdd = { breadId: id, quantity: 1 }; // Suponiendo que siempre se añade 1 cantidad

      if (userIndex >= 0) {
        users[userIndex].cart = users[userIndex].cart || [];
        // Comprueba si el artículo ya está en el carrito para incrementar la cantidad
        const itemIndex = users[userIndex].cart.findIndex(item => item.breadId === id);
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
        maxWidth: 345,
      }}
    >
      <CardActionArea onClick={() => redirectToEvent(id)}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={`Imagen de ${name}`}
          sx={{ borderRadius: "12px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${(price).toFixed(2)}
          </Typography>        
        </CardContent>
      </CardActionArea>
      {isUserLoggedIn && (
        <Button 
          color="primary" 
          variant="contained" 
          onClick={() => addToCart(id)}
          sx={{ margin: "8px" }}
        >
          Agregar al carrito
        </Button>
      )}
    </Box>
  );
}

export default EventCard;
