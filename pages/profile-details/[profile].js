import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  CircularProgress
} from "@mui/material";
import { allBreads } from "@/data";
import DeleteIcon from "@mui/icons-material/Delete";

const ItemCard = ({ item, isCart, onDelete }) => {
  const bread = allBreads.find((bread) => bread.id === item.breadId);
  return (
    <Card sx={{ display: "flex", my: 2, p: 1, boxShadow: 3, backgroundColor: "transparent" }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
        image={bread.img}
        alt={bread.name}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6">{bread.name}</Typography>
          <Typography variant="body1">
            <strong>Cantidad:</strong> {item.quantity}
          </Typography>
        </Box>
        {isCart && (
          <IconButton
            aria-label="delete"
            onClick={() => onDelete(item.breadId)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default function ProfileDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (router.isReady) {
      const { profile } = router.query;
      const users = JSON.parse(localStorage.getItem("users"));
      const userFound = users.find(
        (user) => user.id === parseInt(profile)
      );
      setUser(userFound);
      setLoading(false);
    }
  }, [router.isReady, router.query]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Typography>User not found.</Typography>;
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteItem = (itemId) => {
    const updatedCart = user.cart.filter((item) => item.breadId !== itemId);
    user.cart = updatedCart;
    const updatedUsers = JSON.parse(localStorage.getItem("users")).filter(
      (u) => u.id !== user.id
    );
    updatedUsers.push(user);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    router.push('/');
  };

  return (
    <>
      <Box sx={{ my: 4, p: isMobile ? 1 : 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Detalles de cuenta
        </Typography>
        <Typography variant="body1">
          <strong>First Name:</strong> {user.firstName}
        </Typography>
        <Typography variant="body1">
          <strong>Last Name:</strong> {user.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Button color="secondary" variant="contained" onClick={handleLogout} sx={{ my: 2 }}>
          Cerrar Sesión
        </Button>
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="profile tabs"
        variant="fullWidth"
        centered
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Compras" />
        <Tab label="Carrito" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {tabValue === 0 &&
          user.purchases.map((purchase, index) => (
            <Box key={index} sx={{ my: 2 }}>
              <Typography variant="h6" component="h2">
                Compra {index + 1}
              </Typography>
              {purchase.map((item, index) => (
                <ItemCard key={index} item={item} isCart={false} />
              ))}
            </Box>
          ))}
        {tabValue === 1 &&
          user.cart.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isCart={true}
              onDelete={handleDeleteItem}
            />
          ))}
      </Box>
    </>
  );
}


