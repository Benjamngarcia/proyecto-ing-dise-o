import { Nav } from "@/components/common/Nav";
import { Box, Container } from "@mui/material";

export default function MainLayout(props) {
  const { children } = props;
  return (
    <Container maxWidth="xl" sx={{ margin: "auto", backgroundColor: "#FFF0DB" }}>
      <Box component="header">
        <Nav />
      </Box>
      <Box sx={{ marginTop: "32px" }}>{children}</Box>
    </Container>
  );
}
