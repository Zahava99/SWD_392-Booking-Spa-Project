"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  DoneAll as DoneAllIcon,
} from "@mui/icons-material";
import axios from "axios";

// Enum Mapping
const AppointmentStatusEnum = {
  0: "Pending",
  1: "Accepted",
  2: "Canceled",
  3: "Finished",
};

const PaymentMethodEnum = {
  0: "Cash",
  1: "Credit Card",
};

const PaymentStatusEnum = {
  0: "Pending",
  1: "Success",
  2: "Failed",
};

export default function BookingsList({ limit, filterToday }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/appointments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data);
      } catch (error) {
        setError("Error fetching bookings.");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === parseInt(statusFilter);

    const matchesToday =
      !filterToday || booking.date === new Date().toISOString().split("T")[0];

    return matchesSearch && matchesStatus && matchesToday;
  });

  const getStatusChip = (status) => {
    switch (status) {
      case 0:
        return (
          <Chip
            icon={<AccessTimeIcon />}
            label="Pending"
            color="warning"
            size="small"
          />
        );
      case 1:
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Accepted"
            color="success"
            size="small"
          />
        );
      case 2:
        return (
          <Chip
            icon={<CancelIcon />}
            label="Canceled"
            color="error"
            size="small"
          />
        );
      case 3:
        return (
          <Chip
            icon={<DoneAllIcon />}
            label="Finished"
            color="info"
            size="small"
          />
        );
      default:
        return <Chip label="Unknown" size="small" />;
    }
  };

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="bookings table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking) => (
                    <TableRow key={booking.id} hover>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.time}</TableCell>
                      <TableCell>{getStatusChip(booking.status)}</TableCell>
                      <TableCell>
                        {PaymentMethodEnum[booking.paymentMethod]}
                      </TableCell>
                      <TableCell>
                        {PaymentStatusEnum[booking.paymentStatus]}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
