//TODO: create components for Head and Nav

import { Nav } from "@/components/common/Nav";
// import { Footer } from "../components/common/Footer";
// import { ScrollToTopBtn } from "../components/Buttons/ScrollToTopBtn";
import { Box, Container } from "@mui/material";

export default function MainLayout(props) {
  const { children } = props;
  return (
    <Container maxWidth="lg" sx={{ margin: "auto" }}>
      <Box component="header">
        <Nav />
      </Box>
      <Box sx={{ marginTop: "32px" }}>{children}</Box>
      {/* <ScrollToTopBtn />
      <Footer /> */}
    </Container>
  );
}
