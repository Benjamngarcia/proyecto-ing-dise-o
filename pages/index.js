import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
          <Button sx={{ color: '#004d40' }}>Menú</Button>
          <Button sx={{ color: '#004d40' }}>Carrito</Button>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: '#004d40' }}>
            MONTPELLIER
          </Typography>
          <Button sx={{ color: '#004d40' }}>Buscar</Button>
          <Button sx={{ color: '#004d40' }}>Contacto</Button>
        </Toolbar>
      </AppBar>

      {/* Main Banner */}
      <Container maxWidth="md" sx={{ textAlign: 'center', padding: '40px 0', backgroundColor: '#ffffff' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#004d40', marginBottom: 2 }}>
          ELIGE TU PAN FAVORITO!
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 4 }}>
          Selecciona de un menú semanal variado que incluye recetas de 15 minutos, recién preparadas y entregadas cómodamente a tu puerta!
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: '#ffeb3b', color: 'black', '&:hover': { backgroundColor: '#ffee58' } }}>
          Crear Pedido
        </Button>
      </Container>

      {/* Images Grid */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {['concha.jpeg','bolillo.webp','oreja.png','panque.webp','pastel.jpeg','piña.webp'].map((path, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ m: 1, overflow: 'hidden', borderRadius: '10px' }}>
                <img src={path} alt="Pan" style={{ width: '100%', display: 'block' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;