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
  Paper,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  DoneAll as DoneAllIcon,
} from "@mui/icons-material";
import axios from "axios";

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
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const [bookingsResponse, paymentsResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/payment", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const paymentMap = paymentsResponse.data.reduce((acc, payment) => {
          acc[payment._id.$oid] = payment;
          return acc;
        }, {});

        const enrichedBookings = bookingsResponse.data.map((booking) => ({
          ...booking,
          payment: paymentMap[booking._id.$oid] || null,
        }));

        setBookings(enrichedBookings);
      } catch (error) {
        setError("Error fetching bookings or payments.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Services</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id.$oid}>
              <TableCell>{booking._id.$oid}</TableCell>
              <TableCell>
                {booking.customer.map((cust) => cust[0].$oid).join(", ")}
              </TableCell>
              <TableCell>
                {booking.services.map((service) => service[0].$oid).join(", ")}
              </TableCell>
              <TableCell>{AppointmentStatusEnum[booking.status]}</TableCell>
              <TableCell>
                {new Date(booking.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>
                {PaymentStatusEnum[booking.payment?.status]}
              </TableCell>
              <TableCell>{booking.payment?.amount || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
