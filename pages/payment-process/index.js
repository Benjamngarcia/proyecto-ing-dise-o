import React from 'react';
import { TextField, Button, Paper, Grid, Typography } from '@mui/material';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        {/* Receipt section */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>Total: $52.50</Typography>
            <Typography variant="body1">Suc. 3026 - Fray Servando</Typography>
            <Typography variant="body1">Fecha Ticket: 2013-03-16 12:44 PM</Typography>
            <Typography variant="body1">Cajero: Lab. Gerente</Typography>
            <Typography variant="body1">301104 CONCHA - $12.00</Typography>
            <Typography variant="body2" style={{ marginTop: 20 }}>
              A partir de su compra usted tiene 7 días para generar su factura.
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
              ¿Tienes algún cupón de descuento?
            </Button>
          </Paper>
        </Grid>

        {/* Payment form section */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>PAGO</Typography>
            <TextField fullWidth label="Nombre Titular de la Tarjeta" variant="outlined" margin="normal" />
            <TextField fullWidth label="Número de Tarjeta" variant="outlined" margin="normal" />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Fecha de Vencimiento" variant="outlined" margin="normal" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="CVV" variant="outlined" margin="normal" />
              </Grid>
            </Grid>
            <TextField fullWidth label="Dirección" variant="outlined" margin="normal" />
            <Button variant="contained" color="primary" style={{ marginTop: 20, marginBottom: 10 }}>
              Recoger en Sucursal
            </Button>
            <Button variant="contained" color="secondary" style={{ marginTop: 20 }}>
              Envío a domicilio
            </Button>
            <Button variant="contained" color="success" style={{ marginTop: 20 }}>
              Finalizar Pedido
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;