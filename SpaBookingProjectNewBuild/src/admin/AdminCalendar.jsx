"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
} from "@mui/icons-material";

// Mock data for calendar events
const mockEvents = [
  {
    id: 1,
    title: "John Doe - Deep Tissue Massage",
    date: "2025-03-13",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Jane Smith - Facial Treatment",
    date: "2025-03-13",
    time: "11:30 AM",
    status: "pending",
  },
  {
    id: 3,
    title: "Robert Johnson - Hot Stone Massage",
    date: "2025-03-14",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: 4,
    title: "Emily Davis - Aromatherapy",
    date: "2025-03-14",
    time: "4:00 PM",
    status: "cancelled",
  },
  {
    id: 5,
    title: "Michael Wilson - Swedish Massage",
    date: "2025-03-15",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 6,
    title: "Sarah Brown - Manicure & Pedicure",
    date: "2025-03-15",
    time: "1:00 PM",
    status: "pending",
  },
  {
    id: 7,
    title: "David Miller - Back Massage",
    date: "2025-03-16",
    time: "11:00 AM",
    status: "confirmed",
  },
  {
    id: 8,
    title: "Lisa Taylor - Facial Treatment",
    date: "2025-03-16",
    time: "3:30 PM",
    status: "pending",
  },
  {
    id: 9,
    title: "James Anderson - Full Body Massage",
    date: "2025-03-17",
    time: "9:00 AM",
    status: "confirmed",
  },
  {
    id: 10,
    title: "Patricia Thomas - Foot Massage",
    date: "2025-03-17",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: 11,
    title: "Jennifer White - Facial Treatment",
    date: "2025-03-18",
    time: "11:00 AM",
    status: "pending",
  },
  {
    id: 12,
    title: "Charles Harris - Deep Tissue Massage",
    date: "2025-03-18",
    time: "3:00 PM",
    status: "confirmed",
  },
];

export default function AdminCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date("2025-03-13"));
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddBooking = () => {
    // Logic to add a new booking
    setOpenDialog(false);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();

    // Total days in the month
    const daysInMonth = lastDay.getDate();

    // Array to hold all calendar days
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];

      // Get events for this day
      const dayEvents = mockEvents.filter((event) => event.date === dateString);

      days.push({
        day,
        date,
        dateString,
        events: dayEvents,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Format the month and year for display
  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Get events for the selected date
  const selectedDateEvents = selectedDate
    ? mockEvents.filter((event) => event.date === selectedDate)
    : [];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h5">{monthYearString}</Typography>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Grid container spacing={1}>
          {/* Weekday headers */}
          {weekdays.map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 1,
                  fontWeight: "bold",
                  color: "text.secondary",
                }}
              >
                {day}
              </Box>
            </Grid>
          ))}

          {/* Calendar days */}
          {calendarDays.map((dayData, index) => (
            <Grid item xs={12 / 7} key={index}>
              {dayData ? (
                <Paper
                  elevation={0}
                  sx={{
                    height: 120,
                    p: 1,
                    position: "relative",
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleDateClick(dayData.dateString)}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      fontWeight: "medium",
                    }}
                  >
                    {dayData.day}
                  </Typography>

                  <Box sx={{ mt: 3, overflow: "hidden" }}>
                    {dayData.events.slice(0, 2).map((event, idx) => (
                      <Tooltip title={event.title} key={idx}>
                        <Box
                          sx={{
                            backgroundColor:
                              event.status === "confirmed"
                                ? "success.light"
                                : event.status === "pending"
                                ? "warning.light"
                                : "error.light",
                            p: 0.5,
                            borderRadius: 1,
                            mb: 0.5,
                            fontSize: "0.75rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {event.time} - {event.title.split(" - ")[0]}
                        </Box>
                      </Tooltip>
                    ))}

                    {dayData.events.length > 2 && (
                      <Typography variant="caption" color="text.secondary">
                        +{dayData.events.length - 2} more
                      </Typography>
                    )}
                  </Box>
                </Paper>
              ) : (
                <Box
                  sx={{ height: 120, backgroundColor: "background.default" }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Add New Booking Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add New Booking
        </Button>
      </Box>

      {/* Dialog for adding/viewing bookings */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedDate ? `Bookings for ${selectedDate}` : "Add New Booking"}
        </DialogTitle>
        <DialogContent>
          {selectedDate && selectedDateEvents.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {selectedDateEvents.map((event) => (
                <Paper key={event.id} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1">{event.title}</Typography>
                  <Typography variant="body2">Time: {event.time}</Typography>
                  <Typography variant="body2">
                    Status:{" "}
                    <span
                      style={{
                        color:
                          event.status === "confirmed"
                            ? "green"
                            : event.status === "pending"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField label="Customer Name" fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" type="email" fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone" fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Service</InputLabel>
                  <Select label="Service" defaultValue="">
                    <MenuItem value="Deep Tissue Massage">
                      Deep Tissue Massage
                    </MenuItem>
                    <MenuItem value="Swedish Massage">Swedish Massage</MenuItem>
                    <MenuItem value="Hot Stone Massage">
                      Hot Stone Massage
                    </MenuItem>
                    <MenuItem value="Aromatherapy">Aromatherapy</MenuItem>
                    <MenuItem value="Facial Treatment">
                      Facial Treatment
                    </MenuItem>
                    <MenuItem value="Manicure & Pedicure">
                      Manicure & Pedicure
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  required
                  defaultValue={
                    selectedDate || new Date().toISOString().split("T")[0]
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Time"
                  type="time"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Duration</InputLabel>
                  <Select label="Duration" defaultValue="60 min">
                    <MenuItem value="30 min">30 min</MenuItem>
                    <MenuItem value="45 min">45 min</MenuItem>
                    <MenuItem value="60 min">60 min</MenuItem>
                    <MenuItem value="75 min">75 min</MenuItem>
                    <MenuItem value="90 min">90 min</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Add any special requests or notes"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBooking}
          >
            {selectedDate && selectedDateEvents.length > 0
              ? "Close"
              : "Add Booking"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
