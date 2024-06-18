import React from 'react';
import { Button, Typography, Container, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

function App() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCreateOrderClick = () => {
    router.push("/catalog");
  };

  return (
    <div>
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', alignItems: 'center', py: 4 }}>
        
        {/* Lookbook Gallery */}
        <Box sx={{ flex: 1, pr: isMobile ? 0 : 2, order: isMobile ? 2 : 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            {['concha.jpeg','bolillo.webp','oreja.png','panque.webp','pastel.jpeg','piña.webp'].map((path, index) => (
              <Paper key={index} sx={{ overflow: 'hidden', borderRadius: '10px', height: '200px' }}>
                <img src={path} alt="Pan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Main Banner */}
        <Box sx={{ flex: 1, pl: isMobile ? 0 : 2, textAlign: isMobile ? 'center' : 'left', order: isMobile ? 1 : 2 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#004d40', marginBottom: 2 }}>
            ELIGE TU PAN FAVORITO!
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 4 }}>
            Selecciona de un menú semanal variado que incluye recetas de 15 minutos, recién preparadas y entregadas cómodamente a tu puerta!
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: '#ffeb3b', color: 'black', '&:hover': { backgroundColor: '#ffee58' } }} onClick={handleCreateOrderClick}>
            Crear Pedido
          </Button>
        </Box>

      </Container>
    </div>
  );
}

export default App;
