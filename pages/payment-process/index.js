// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import {
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Typography,
//   MenuItem,
//   Box,
//   CardMedia,
// } from "@mui/material";
// import { allBreads } from "@/data";

// function Checkout() {
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [name, setName] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [address, setAddress] = useState("");
//   const [currentDate, setCurrentDate] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const session = localStorage.getItem("userSession");
//     if (session) {
//       const user = JSON.parse(session);
//       const users = JSON.parse(localStorage.getItem("users"));
//       const currentUser = users.find((u) => u.id === user.id);
//       const userCartItems = currentUser.cart || [];
// 			console.log("TCL: Checkout -> userCartItems", userCartItems)
//       setCartItems(userCartItems);
//       const totalAmount = userCartItems.reduce(
//         (sum, item) => sum + (item.price * item.quantity || 0),
//         0
//       );
//       setTotal(totalAmount);
//     }
//     setCurrentDate(new Date().toLocaleString());
//   }, []);

//   const handleSubmit = () => {
//     if (!name || !cardNumber || !expiryDate || !cvv || !address) {
//       alert("Todos los campos son obligatorios.");
//       return;
//     }

//     const session = localStorage.getItem("userSession");
//     if (session) {
//       const user = JSON.parse(session);
//       const users = JSON.parse(localStorage.getItem("users"));
//       const currentUserIndex = users.findIndex((u) => u.id === user.id);

//       users[currentUserIndex].purchases.push([...cartItems]);
//       users[currentUserIndex].cart = [];

//       localStorage.setItem("users", JSON.stringify(users));

//       router.push("/");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Grid container spacing={3}>
//         {/* Receipt section */}
//         <Grid item xs={12} sm={6}>
//           <Paper style={{ padding: 20 }}>
//             <Typography variant="h4" gutterBottom>
//               Total: ${total ? total.toFixed(2) : "0.00"}
//             </Typography>
//             <Typography variant="body1">Suc. 3026 - Fray Servando</Typography>
//             <Typography variant="body1">Fecha Ticket: {currentDate}</Typography>
//             <Typography variant="body1">Cajero: Lab. Gerente</Typography>
//             {cartItems.map((item, index) => (
//               <ItemCard key={index} item={item} />
//             ))}
//             <Typography variant="body2" style={{ marginTop: 20 }}>
//               A partir de su compra usted tiene 7 días para generar su factura.
//             </Typography>
//           </Paper>
//         </Grid>

//         {/* Payment form section */}
//         <Grid item xs={12} sm={6}>
//           <Paper style={{ padding: 20 }}>
//             <Typography variant="h5" gutterBottom>
//               PAGO
//             </Typography>
//             <TextField
//               fullWidth
//               label="Nombre Titular de la Tarjeta"
//               variant="outlined"
//               margin="normal"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               label="Número de Tarjeta"
//               variant="outlined"
//               margin="normal"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//             />
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="Fecha de Vencimiento"
//                   variant="outlined"
//                   margin="normal"
//                   value={expiryDate}
//                   onChange={(e) => setExpiryDate(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="CVV"
//                   variant="outlined"
//                   margin="normal"
//                   value={cvv}
//                   onChange={(e) => setCvv(e.target.value)}
//                 />
//               </Grid>
//             </Grid>
//             <TextField
//               fullWidth
//               label="Dirección"
//               variant="outlined"
//               margin="normal"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="success"
//               style={{ marginTop: 20 }}
//               onClick={handleSubmit}
//             >
//               Finalizar Pedido
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Checkout;

// const ItemCard = ({ item }) => {
//   const bread = allBreads.find((bread) => bread.id === item.breadId);
//   console.log("TCL: ItemCard -> bread", bread);
//   return (
//     <MenuItem
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         width: "100%",
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <CardMedia
//           component="img"
//           sx={{
//             width: 48,
//             height: 48,
//             objectFit: "cover",
//             borderRadius: 1,
//             marginRight: 2,
//           }}
//           image={bread.img}
//           alt={bread.name}
//         />
//         <Typography variant="body1">
//           {bread.name}: ${bread.price.toFixed(2)} x {item.quantity}
//         </Typography>
//       </Box>
//     </MenuItem>
//   );
// };




import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  MenuItem,
  Box,
  CardMedia,
} from "@mui/material";
import { allBreads } from "@/data";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      const user = JSON.parse(session);
      const users = JSON.parse(localStorage.getItem("users"));
      const currentUser = users.find((u) => u.id === user.id);
      const userCartItems = currentUser.cart || [];

      const updatedCartItems = userCartItems.map((item) => {
        const bread = allBreads.find((bread) => bread.id === item.breadId);
        return { ...item, price: bread.price, name: bread.name, img: bread.img };
      });

      setCartItems(updatedCartItems);

      const totalAmount = updatedCartItems.reduce(
        (sum, item) => sum + (item.price * item.quantity || 0),
        0
      );
      setTotal(totalAmount);
    }
    setCurrentDate(new Date().toLocaleString());
  }, []);

  const handleSubmit = () => {
    if (!name || !cardNumber || !expiryDate || !cvv || !address) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const session = localStorage.getItem("userSession");
    if (session) {
      const user = JSON.parse(session);
      const users = JSON.parse(localStorage.getItem("users"));
      const currentUserIndex = users.findIndex((u) => u.id === user.id);

      users[currentUserIndex].purchases.push([...cartItems]);
      users[currentUserIndex].cart = [];

      localStorage.setItem("users", JSON.stringify(users));

      router.push("/");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        {/* Receipt section */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 20, backgroundColor: "transparent" }}>
            <Typography variant="h4" gutterBottom>
              Total: ${total ? total.toFixed(2) : "0.00"}
            </Typography>
            <Typography variant="body1">Suc. 3026 - Fray Servando</Typography>
            <Typography variant="body1">Fecha Ticket: {currentDate}</Typography>
            <Typography variant="body1">Cajero: Lab. Gerente</Typography>
            {cartItems.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}
            <Typography variant="body2" style={{ marginTop: 20 }}>
              A partir de su compra usted tiene 7 días para generar su factura.
            </Typography>
          </Paper>
        </Grid>

        {/* Payment form section */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 20, backgroundColor: "transparent" }}>
            <Typography variant="h5" gutterBottom>
              PAGO
            </Typography>
            <TextField
              fullWidth
              label="Nombre Titular de la Tarjeta"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Número de Tarjeta"
              variant="outlined"
              margin="normal"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Fecha de Vencimiento"
                  variant="outlined"
                  margin="normal"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  variant="outlined"
                  margin="normal"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              style={{ marginTop: 20 }}
              onClick={handleSubmit}
            >
              Finalizar Pedido
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;

const ItemCard = ({ item }) => {
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
          image={item.img}
          alt={item.name}
        />
        <Typography variant="body1">
          {item.name}: ${item.price.toFixed(2)} x {item.quantity}
        </Typography>
      </Box>
    </MenuItem>
  );
};
