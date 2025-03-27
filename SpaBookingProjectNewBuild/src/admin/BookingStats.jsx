// "use client";
// import { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   useTheme,
//   CircularProgress,
// } from "@mui/material";
// import {
//   CalendarMonth as CalendarIcon,
//   CheckCircle as CheckCircleIcon,
//   AccessTime as AccessTimeIcon,
//   Cancel as CancelIcon,
//   DoneAll as DoneAllIcon,
// } from "@mui/icons-material";
// import axios from "axios";

// export default function BookingStats() {
//   const theme = useTheme();
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const response = await axios.get(
//           "http://localhost:3000/api/appointments",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setStats(response.data);
//       } catch (error) {
//         setError("Failed to load statistics.");
//         console.error("Error fetching stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return loading ? (
//     <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//       <CircularProgress />
//     </Box>
//   ) : error ? (
//     <Typography color="error">{error}</Typography>
//   ) : (
//     <Grid container spacing={3}>
//       <Grid item xs={12} sm={6} md={3}>
//         <Paper>
//           <Typography>Total Bookings: {stats.totalBookings}</Typography>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Paper>
//           <Typography>Accepted: {stats.acceptedBookings}</Typography>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Paper>
//           <Typography>Pending: {stats.pendingBookings}</Typography>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Paper>
//           <Typography>Canceled: {stats.canceledBookings}</Typography>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Cancel as CancelIcon,
  DoneAll as DoneAllIcon,
} from "@mui/icons-material";
import axios from "axios";

export default function BookingStats() {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/appointments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("API Response:", response.data.length);
        const appointments = response.data;
        console.log("Appointments:", appointments);
        
        const statsData = {
          totalBookings: appointments.length,
          acceptedBookings: appointments.filter(
            (appt) => appt.status === 1
          ).length,
          pendingBookings: appointments.filter(
            (appt) => appt.status === 0
          ).length,
          canceledBookings: appointments.filter(
            (appt) => appt.status === 2
          ).length,
          finishingBookings: appointments.filter(
            (appt) => appt.status === 3
          ).length,
        };
        console.log("Stats Data:", statsData);
        
        // setStats(response.data);
        setStats(statsData);
      } catch (error) {
        setError("Failed to load statistics.");
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <CircularProgress />
    </Box>
  ) : error ? (
    <Typography color="error">{error}</Typography>
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>
          <Typography>Total Bookings: {stats.totalBookings}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>
          <Typography>Accepted: {stats.acceptedBookings}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>
          <Typography>Pending: {stats.pendingBookings}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>
          <Typography>Canceled: {stats.canceledBookings}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>
          <Typography>Finished: {stats.finishingBookings}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
