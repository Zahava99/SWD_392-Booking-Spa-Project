"use client";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import {
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Cancel as CancelIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

export default function BookingStats() {
  const theme = useTheme();

  // Mock data for statistics
  const stats = {
    totalBookings: 124,
    confirmedBookings: 78,
    pendingBookings: 32,
    cancelledBookings: 14,
    percentageIncrease: 18,
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 140,
        borderTop: `4px solid ${color}`,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: "50%",
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography
        variant="h4"
        component="p"
        sx={{ mt: "auto", fontWeight: "bold" }}
      >
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Booking Statistics</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TrendingUpIcon color="success" fontSize="small" />
          <Typography variant="body2" color="success.main">
            {stats.percentageIncrease}% increase from last month
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<CalendarIcon sx={{ color: theme.palette.primary.main }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Confirmed"
            value={stats.confirmedBookings}
            icon={
              <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
            }
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={stats.pendingBookings}
            icon={<AccessTimeIcon sx={{ color: theme.palette.warning.main }} />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cancelled"
            value={stats.cancelledBookings}
            icon={<CancelIcon sx={{ color: theme.palette.error.main }} />}
            color={theme.palette.error.main}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
