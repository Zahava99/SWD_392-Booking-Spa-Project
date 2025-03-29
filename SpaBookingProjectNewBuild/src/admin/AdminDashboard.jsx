// "use client";

// import { useState, useEffect } from "react";
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
// import axios from "axios";

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
//   const theme = useTheme();

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   return (
//     <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//         <Typography
//           variant="h4"
//           component="h1"
//           gutterBottom
//           sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
//         >
//           Spa Booking Administration
//         </Typography>
//         <Divider sx={{ mb: 3 }} />

//         <Box sx={{ width: "100%" }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             aria-label="admin dashboard tabs"
//             textColor="primary"
//             indicatorColor="primary"
//           >
//             <Tab label="Dashboard" {...a11yProps(0)} />
//             <Tab label="Bookings" {...a11yProps(1)} />
//             <Tab label="Calendar" {...a11yProps(2)} />
//           </Tabs>

//           <TabPanel value={tabValue} index={0}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <BookingStats />
//               </Grid>
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2 }}>
//                   <Typography variant="h6" gutterBottom>
//                     Today Appointments
//                   </Typography>
//                   <BookingsList limit={5} filterToday={true} />
//                 </Paper>
//               </Grid>
//             </Grid>
//           </TabPanel>

//           <TabPanel value={tabValue} index={1}>
//             <BookingsList />
//           </TabPanel>

//           <TabPanel value={tabValue} index={2}>
//             <AdminCalendar />
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
import AppointmentAssign from "../Khang-component/AppointmentAssign";
import AppointmentFinalPayment from "../Khang-component/AppointmentFinalPayment";
import TransactionHistory from "../Khang-component/TransactionHistory";
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
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          Spa Booking Administration
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ width: "100%" }}>
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
            <Tab label="Appointment Assign" {...a11yProps(3)} />
            <Tab label="Appointment Final Payment" {...a11yProps(4)} />
            <Tab label="Transaction History" {...a11yProps(5)} />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <BookingStats />
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Today Appointments
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
          <TabPanel value={tabValue} index={3}>
            <AppointmentAssign />
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <AppointmentFinalPayment />
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <TransactionHistory />
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}
