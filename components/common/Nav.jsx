import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Button,
  CardMedia,
  Toolbar,
} from "@mui/material";
import { Person, ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import Close from "@mui/icons-material/Close";
import Link from "next/link";
import LoginModal from "../Forms/AuthForm";
import { allBreads } from "@/data";

const ItemCard = ({ item, isCart, onDelete }) => {
  const bread = allBreads.find((bread) => bread.id === item.breadId);
  return (
    <MenuItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          sx={{
            width: 48,
            height: 48,
            objectFit: "cover",
            borderRadius: 1,
            marginRight: 2,
          }}
          image={bread.img}
          alt={bread.name}
        />
        <Typography variant="body1">
          {bread.name}: {item.quantity}
        </Typography>
      </Box>
      {isCart && (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => onDelete(item.breadId)}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </MenuItem>
  );
};

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [cartMenuAnchorEl, setCartMenuAnchorEl] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      setSession(JSON.parse(userSession));
    } else {
      setSession(null);
    }
  }, []);

  useEffect(() => {
    if (session) {
      const users = JSON.parse(localStorage.getItem("users"));
      const currentUser = users.find((u) => u.id === session.id);
      setCartItems(currentUser.cart || []);
    } else {
      setCartItems([]);
    }
  }, [session]);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleLoginModalToggle = () => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const user = JSON.parse(userSession);
      router.push(`/profile-details/${user.id}`);
    } else {
      setLoginModalOpen((prev) => !prev);
    }
  };

  const handleCartMenuOpen = (event) => {
    setCartMenuAnchorEl(event.currentTarget);
  };

  const handleCartMenuClose = () => {
    setCartMenuAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ margin: "8px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 4px",
        }}
      >
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          Panadería Montpellier
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem
          sx={{
            borderRadius: "8px",
            transition: ".3s",
            "&:hover": { backgroundColor: "#EBEBEE" },
          }}
        >
          <Link
            href="/catalog"
            className="links-styles"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Menú</Typography>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          position: "static",
          padding: "16px 0px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link
                href="/catalog"
                style={{ textDecoration: "none", color: "#004d40" }}
              >
                <Typography variant="h6">Menú</Typography>
              </Link>
            </Box>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#004d40",
                marginLeft: { xs: 0, sm: "auto" },
                backgroundColor: "#ffeb3b",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: { xs: "left", sm: "center" },
                  fontWeight: "bold",
                }}
              >
                MONTPELLIER
              </Typography>
            </Link>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: { xs: "flex", sm: "none" },
                  alignItems: "center",
                }}
              >
                <IconButton onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleLoginModalToggle}>
                  <Person />
                </IconButton>
                <IconButton onClick={handleCartMenuOpen}>
                  <Badge badgeContent={cartItems.length} color="primary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="top"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          transitionDuration={500}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              borderRadius: "0 0 8px 8px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Menu
        anchorEl={cartMenuAnchorEl}
        open={Boolean(cartMenuAnchorEl)}
        onClose={handleCartMenuClose}
      >
        {cartItems.map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            isCart
            onDelete={(breadId) => {
              const newCart = cartItems.filter(
                (item) => item.breadId !== breadId
              );
              setCartItems(newCart);
              const session = localStorage.getItem("userSession");
              if (session) {
                const user = JSON.parse(session);
                const users = JSON.parse(localStorage.getItem("users"));
                const currentUser = users.find((u) => u.id === user.id);
                currentUser.cart = newCart;
                localStorage.setItem("users", JSON.stringify(users));
              }
            }}
          />
        ))}
        <Divider />
        <MenuItem>
          <Button fullWidth onClick={() => router.push("/payment-process")}>
            Pagar Carrito
          </Button>
        </MenuItem>
      </Menu>
      <LoginModal
        open={loginModalOpen}
        onClose={handleLoginModalToggle}
        setLoginModalOpen={setLoginModalOpen}
      />
    </>
  );
}
