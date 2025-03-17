// import { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Tabs,
//   Tab,
//   Divider,
//   useTheme,
// } from "@mui/material";
// import BookingsList from "./BookingsList";
// import BookingStats from "./BookingStats";
// import AdminCalendar from "./AdminCalendar";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`admin-tabpanel-${index}`}
//       aria-labelledby={`admin-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `admin-tab-${index}`,
//     "aria-controls": `admin-tabpanel-${index}`,
//   };
// }

// export default function AdminDashboard() {
//   const [tabValue, setTabValue] = useState(0);
//   const [appointments, setAppointments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const theme = useTheme();

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   useEffect(() => {
//     fetch("http://localhost:3000/api/appointments")
//       .then((response) => response.json())
//       .then((data) => setAppointments(data))
//       .catch((error) => console.error("Error fetching appointments:", error));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:3000/api/account")
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   return (
//     <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//       <Paper
//         elevation={3}
//         sx={{
//           p: 3,
//           borderRadius: 2,
//           backgroundColor: "background.paper",
//         }}
//       >
//         <Typography
//           variant="h4"
//           component="h1"
//           gutterBottom
//           sx={{
//             fontWeight: "bold",
//             color: theme.palette.primary.main,
//           }}
//         >
//           Spa Booking Administration
//         </Typography>
//         <Divider sx={{ mb: 3 }} />

//         <Box sx={{ width: "100%" }}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs
//               value={tabValue}
//               onChange={handleTabChange}
//               aria-label="admin dashboard tabs"
//               textColor="primary"
//               indicatorColor="primary"
//             >
//               <Tab label="Dashboard" {...a11yProps(0)} />
//               <Tab label="Bookings" {...a11yProps(1)} />
//               <Tab label="Calendar" {...a11yProps(2)} />
//             </Tabs>
//           </Box>

//           <TabPanel value={tabValue} index={0}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <BookingStats />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     height: 240,
//                   }}
//                 >
//                   <Typography variant="h6" gutterBottom>
//                     Recent Activity
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     • New booking from John Doe - 10 minutes ago
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     • Booking #1234 was confirmed - 1 hour ago
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     • Booking #1230 was completed - 3 hours ago
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     • New booking from Jane Smith - 5 hours ago
//                   </Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={12}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Typography variant="h6" gutterBottom>
//                     Today's Appointments
//                   </Typography>
//                   <BookingsList
//                     limit={5}
//                     filterToday={true}
//                     appointments={appointments}
//                   />
//                 </Paper>
//               </Grid>
//             </Grid>
//           </TabPanel>

//           <TabPanel value={tabValue} index={1}>
//             <BookingsList appointments={appointments} />
//           </TabPanel>

//           <TabPanel value={tabValue} index={2}>
//             <AdminCalendar appointments={appointments} />
//           </TabPanel>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Divider,
  useTheme,
} from "@mui/material";
import BookingsList from "./BookingsList";
import BookingStats from "./BookingStats";
import AdminCalendar from "./AdminCalendar";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `admin-tab-${index}`,
    "aria-controls": `admin-tabpanel-${index}`,
  };
}

export default function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get("http://localhost:3000/api/service")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          Spa Booking Administration
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="admin dashboard tabs"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Dashboard" {...a11yProps(0)} />
              <Tab label="Bookings" {...a11yProps(1)} />
              <Tab label="Calendar" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <BookingStats />
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • New booking from John Doe - 10 minutes ago
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Booking #1234 was confirmed - 1 hour ago
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Booking #1230 was completed - 3 hours ago
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • New booking from Jane Smith - 5 hours ago
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Today's Appointments
                  </Typography>
                  <BookingsList limit={5} filterToday={true} />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <BookingsList />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <AdminCalendar />
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}
