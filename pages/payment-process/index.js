import React from "react";
import { Box, Typography } from "@mui/material";

export default function PaymentProcess() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Payment Process
      </Typography>
    </Box>
  );
}
