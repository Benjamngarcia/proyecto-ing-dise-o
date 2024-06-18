import React from "react";
import {
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Rating,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";

function EventCard(props) {
  const router = useRouter();
  const { imageUrl, name, startDate, endDate, rating, id } = props;

  const redirectToEvent = (id) => {
    router.push(`/event-details/${id}`);
  };

  return (
    <Box
      sx={{
        padding: "8px",
        borderRadius: "8px",
        maxWidth: 345,
      }}
    >
      <CardActionArea onClick={() => redirectToEvent(id)}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={`Imagen de ${name}`}
          sx={{ borderRadius: "12px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {startDate}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            End date: {endDate}
          </Typography> */}
          {/* <Rating name="read-only" value={rating} readOnly /> */}
          <Rating
            name="half-rating-read"
            value={rating}
            readOnly
            precision={0.5}
          />
        </CardContent>
      </CardActionArea>
    </Box>
  );
}

export default EventCard;
