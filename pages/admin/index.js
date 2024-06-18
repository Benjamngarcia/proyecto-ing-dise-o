import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, LinearProgress } from '@mui/material';
import { PieChart, Pie, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

// Random data for the charts
const dataPie = [
  { name: 'Pan de Dulce', value: 400 },
  { name: 'Bolillos', value: 300 },
  { name: 'Café', value: 300 },
  { name: 'Frappes', value: 200 },
];

const dataLine = [
  { month: 'ENE', Ventas: 2400 },
  { month: 'FEB', Ventas: 1398 },
  { month: 'MAR', Ventas: 9800 },
  { month: 'ABR', Ventas: 3908 },
  { month: 'MAY', Ventas: 4800 },
  { month: 'JUN', Ventas: 3800 },
  { month: 'JUL', Ventas: 4300 },
];

const dataBar = [
  { name: 'Pan', inventario: 400 },
  { name: 'Café y Bebidas', inventario: 300 },
  { name: 'Pasteles', inventario: 300 },
];

const currentSales = 1944174;
const targetSales = 1990000;

function Dashboard() {
  const [salesProgress, setSalesProgress] = useState(0);
  const [formattedCurrentSales, setFormattedCurrentSales] = useState('');
  const [formattedTargetSales, setFormattedTargetSales] = useState('');

  useEffect(() => {
    const calculatedProgress = (currentSales / targetSales) * 100;
    setSalesProgress(calculatedProgress);
    setFormattedCurrentSales(currentSales.toLocaleString());
    setFormattedTargetSales(targetSales.toLocaleString());
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h2" align="center" style={{ color: 'blue' }} gutterBottom>
        Bienvenido Administrador
      </Typography>

      <Grid item xs={12}>
        <Paper style={{ padding: 20, backgroundColor: "transparent" }}>
          <Typography variant="h6" gutterBottom>Total Ventas</Typography>
          <Typography variant="h5">${formattedCurrentSales}</Typography>
          <Typography variant="body1" color="textSecondary">
            Total: ${formattedTargetSales}
          </Typography>
          <LinearProgress variant="determinate" value={salesProgress} />
          <Typography variant="body2" color="textSecondary">
            {Math.round(salesProgress)}% de Meta Mensual
          </Typography>
        </Paper>
      </Grid>

      <Grid container spacing={5}>
        {/* Goal Section */}
        <Grid item xs={12} sm={30}>
          <Paper style={{ padding: 30, textAlign: 'center', backgroundColor: "transparent" }}>
            <Typography variant="h6" gutterBottom>Ventas</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={dataPie}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#52E1F7"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Sales by Month */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 20, textAlign: 'center', backgroundColor: "transparent" }}>
            <Typography variant="h6" gutterBottom>Ventas por mes</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Ventas" stroke="#6C52F7" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Inventario Status */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 20, textAlign: 'center', backgroundColor: "transparent" }}>
            <Typography variant="h6" gutterBottom>Inventario</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inventario" fill="#F7528A" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
