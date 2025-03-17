// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
//   Chip,
//   IconButton,
//   TextField,
//   InputAdornment,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   AccessTime as AccessTimeIcon,
// } from "@mui/icons-material";

// const mockBookings = [
//   {
//     id: 1,
//     customerName: "khang",
//     service: "Deep Tissue Massage",
//     date: "2025-03-13",
//     time: "10:00 AM",
//     duration: "60 min",
//     status: "confirmed",
//     phone: "555-123-4567",
//     email: "john.doe@example.com",
//   },
//   {
//     id: 2,
//     customerName: "aka khang",
//     service: "Facial Treatment",
//     date: "2025-03-13",
//     time: "11:30 AM",
//     duration: "45 min",
//     status: "pending",
//     phone: "555-987-6543",
//     email: "jane.smith@example.com",
//   },
//   {
//     id: 3,
//     customerName: "khangmotlan",
//     service: "Hot Stone Massage",
//     date: "2025-03-14",
//     time: "2:00 PM",
//     duration: "90 min",
//     status: "completed",
//     phone: "555-456-7890",
//     email: "robert.j@example.com",
//   },
//   {
//     id: 4,
//     customerName: "khonlang",
//     service: "Aromatherapy",
//     date: "2025-03-14",
//     time: "4:00 PM",
//     duration: "60 min",
//     status: "cancelled",
//     phone: "555-789-0123",
//     email: "emily.d@example.com",
//   },
//   {
//     id: 5,
//     customerName: "kiet",
//     service: "Swedish Massage",
//     date: "2025-03-15",
//     time: "10:00 AM",
//     duration: "60 min",
//     status: "confirmed",
//     phone: "555-234-5678",
//     email: "michael.w@example.com",
//   },
//   {
//     id: 6,
//     customerName: "long",
//     service: "Manicure & Pedicure",
//     date: "2025-03-15",
//     time: "1:00 PM",
//     duration: "75 min",
//     status: "pending",
//     phone: "555-345-6789",
//     email: "sarah.b@example.com",
//   },
//   {
//     id: 7,
//     customerName: "akakiet",
//     service: "Back Massage",
//     date: "2025-03-16",
//     time: "11:00 AM",
//     duration: "30 min",
//     status: "confirmed",
//     phone: "555-456-7890",
//     email: "david.m@example.com",
//   },
//   {
//     id: 8,
//     customerName: "akaducanh",
//     service: "Facial Treatment",
//     date: "2025-03-16",
//     time: "3:30 PM",
//     duration: "45 min",
//     status: "pending",
//     phone: "555-567-8901",
//     email: "lisa.t@example.com",
//   },
// ];

// export default function BookingsList({ limit, filterToday }) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const filteredBookings = mockBookings.filter((booking) => {
//     const matchesSearch =
//       booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.email.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || booking.status === statusFilter;

//     const matchesToday = !filterToday || booking.date === "2025-03-13";

//     return matchesSearch && matchesStatus && matchesToday;
//   });

//   const displayedBookings = limit
//     ? filteredBookings.slice(0, limit)
//     : filteredBookings;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(Number.parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleEditClick = (booking) => {
//     setSelectedBooking(booking);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedBooking(null);
//   };

//   const getStatusChip = (status) => {
//     switch (status) {
//       case "confirmed":
//         return (
//           <Chip
//             icon={<CheckCircleIcon />}
//             label="Confirmed"
//             color="success"
//             size="small"
//           />
//         );
//       case "pending":
//         return (
//           <Chip
//             icon={<AccessTimeIcon />}
//             label="Pending"
//             color="warning"
//             size="small"
//           />
//         );
//       case "cancelled":
//         return (
//           <Chip
//             icon={<CancelIcon />}
//             label="Cancelled"
//             color="error"
//             size="small"
//           />
//         );
//       case "completed":
//         return (
//           <Chip
//             icon={<CheckCircleIcon />}
//             label="Completed"
//             color="info"
//             size="small"
//           />
//         );
//       default:
//         return <Chip label={status} size="small" />;
//     }
//   };

//   return (
//     <Box>
//       <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ flexGrow: 1 }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//           <InputLabel id="status-filter-label">Status</InputLabel>
//           <Select
//             labelId="status-filter-label"
//             id="status-filter"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             label="Status"
//           >
//             <MenuItem value="all">All</MenuItem>
//             <MenuItem value="confirmed">Confirmed</MenuItem>
//             <MenuItem value="pending">Pending</MenuItem>
//             <MenuItem value="completed">Completed</MenuItem>
//             <MenuItem value="cancelled">Cancelled</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <TableContainer component={Paper} sx={{ mb: 2 }}>
//         <Table sx={{ minWidth: 650 }} aria-label="bookings table">
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Customer</TableCell>
//               <TableCell>Service</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Time</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedBookings
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((booking) => (
//                 <TableRow key={booking.id} hover>
//                   <TableCell>{booking.id}</TableCell>
//                   <TableCell>{booking.customerName}</TableCell>
//                   <TableCell>{booking.service}</TableCell>
//                   <TableCell>{booking.date}</TableCell>
//                   <TableCell>{booking.time}</TableCell>
//                   <TableCell>{getStatusChip(booking.status)}</TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       size="small"
//                       onClick={() => handleEditClick(booking)}
//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small" color="error">
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             {displayedBookings.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   No bookings found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {!limit && (
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredBookings.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       )}

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>Edit Booking #{selectedBooking?.id}</DialogTitle>
//         <DialogContent>
//           {selectedBooking && (
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Customer Name"
//                   fullWidth
//                   defaultValue={selectedBooking.customerName}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Email"
//                   fullWidth
//                   defaultValue={selectedBooking.email}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Phone"
//                   fullWidth
//                   defaultValue={selectedBooking.phone}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Service"
//                   fullWidth
//                   defaultValue={selectedBooking.service}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Date"
//                   type="date"
//                   fullWidth
//                   defaultValue={selectedBooking.date}
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Time"
//                   fullWidth
//                   defaultValue={selectedBooking.time}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Duration"
//                   fullWidth
//                   defaultValue={selectedBooking.duration}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel>Status</InputLabel>
//                   <Select defaultValue={selectedBooking.status} label="Status">
//                     <MenuItem value="confirmed">Confirmed</MenuItem>
//                     <MenuItem value="pending">Pending</MenuItem>
//                     <MenuItem value="completed">Completed</MenuItem>
//                     <MenuItem value="cancelled">Cancelled</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Notes"
//                   fullWidth
//                   multiline
//                   rows={3}
//                   placeholder="Add notes about this booking"
//                 />
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleCloseDialog}
//           >
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import axios from "axios";

useEffect(() => {
  axios
    .get("http://localhost:3000/api/account")
    .then((response) => {
      setBookings(response.data);
    })
    .catch((error) => console.error("Error fetching bookings:", error));
}, []);
