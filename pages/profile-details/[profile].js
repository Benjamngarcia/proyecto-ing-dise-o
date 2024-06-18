// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { Typography, Box, Tab, Tabs, Button } from "@mui/material";
// import { allUsers, allEvents } from "@/data";

// export default function ProfileDetails() {
//   const router = useRouter();
//   const { profile } = router.query;

//   const user = allUsers.find((user) => user.id === parseInt(profile));
//   const [tabValue, setTabValue] = useState(0);

//   if (!user) {
//     return <Typography>User not found.</Typography>;
//   }

//   const handleChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const myEvents = allEvents.filter(
//     (event) => event.creator && event.creator.id_user === user.id
//   );

//   return (
//     <>
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           User Profile Details
//         </Typography>
//         <Typography variant="body1">
//           <strong>First Name:</strong> {user.firstName}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Last Name:</strong> {user.lastName}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Email:</strong> {user.email}
//         </Typography>
//       </Box>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={tabValue}
//           onChange={handleChange}
//           aria-label="profile tabs"
//         >
//           <Tab label="My Tickets" />
//           <Tab label="My Events" />
//         </Tabs>
//       </Box>
//       <Box>
//         {tabValue === 0 && <Typography sx={{ p: 3 }}>Coming soon</Typography>}
//         {tabValue === 1 && (
//           <Box sx={{ p: 3 }}>
//             <Button variant="contained" color="primary" sx={{ mb: 2 }}>
//               Create Event
//             </Button>
//             {myEvents.length > 0 ? (
//               myEvents.map((event) => (
//                 <Box
//                   key={event.id}
//                   sx={{ my: 2, display: "flex", gap: "12px" }}
//                 >
//                   <Box
//                     component="img"
//                     height="200"
//                     src={event.img}
//                     alt={`Image ${event.name}`}
//                     sx={{
//                       width: "70px",
//                       height: "70px",
//                       objectFit: "cover",
//                       borderRadius: "12px",
//                     }}
//                   />
//                   <Box>
//                     <Typography variant="h6">{event.name}</Typography>
//                     <Typography>{event.description}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {event.dates}
//                     </Typography>
//                   </Box>
//                 </Box>
//               ))
//             ) : (
//               <Typography>No events created yet.</Typography>
//             )}
//           </Box>
//         )}
//       </Box>
//     </>
//   );
// }

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Typography, Box, Tab, Tabs, Button } from "@mui/material";
import NewEventForm from "@/components/Forms/NewEventForm";
import { allUsers, allEvents } from "@/data";

export default function ProfileDetails() {
  const router = useRouter();
  const { profile } = router.query;

  const user = allUsers.find((user) => user.id === parseInt(profile));
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  if (!user) {
    return <Typography>User not found.</Typography>;
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const myEvents = allEvents.filter(
    (event) => event.creator && event.creator.id_user === user.id
  );

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile Details
        </Typography>
        <Typography variant="body1">
          <strong>First Name:</strong> {user.firstName}
        </Typography>
        <Typography variant="body1">
          <strong>Last Name:</strong> {user.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="profile tabs"
        >
          <Tab label="My Tickets" />
          <Tab label="My Events" />
        </Tabs>
      </Box>
      <Box>
        {tabValue === 0 && <Typography sx={{ p: 3 }}>Coming soon</Typography>}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              sx={{ mb: 2 }}
            >
              Create Event
            </Button>
            {myEvents.length > 0 ? (
              myEvents.map((event) => (
                <Box
                  key={event.id}
                  sx={{ my: 2, display: "flex", gap: "12px" }}
                >
                  <Box
                    component="img"
                    height="200"
                    src={event.img}
                    alt={`Image ${event.name}`}
                    sx={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  <Box>
                    <Typography variant="h6">{event.name}</Typography>
                    <Typography>{event.description}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.dates}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>No events created yet.</Typography>
            )}
            <NewEventForm open={openModal} handleClose={handleCloseModal} />
          </Box>
        )}
      </Box>
    </>
  );
}
