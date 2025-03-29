// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TableSortLabel
// } from '@mui/material';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useLocation } from 'react-router-dom';

// const AppointmentStatusEnum = {
//   0: 'Pending',
//   1: 'Accepted',
//   2: 'Canceled',
//   3: 'Finished'
// };

// const PaymentStatusEnum = {
//   0: 'Pending',
//   1: 'Success',
//   2: 'Failed'
// };

// export default function AppointmentFinalPayment({ limit, filterToday }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [promotions, setPromotions] = useState([]);
//   const [servicesData, setServicesData] = useState({});
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const location = useLocation();

//   const fetchData = async () => {
//     try {
//       const token = sessionStorage.getItem('token');
//       const [
//         appointmentsResponse,
//         paymentsResponse,
//         servicesResponse,
//         promotionsResponse
//       ] = await Promise.all([
//         axios.get('https://mcmapp.online/api/appointments', {
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get('https://mcmapp.online/api/payment', {
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get('https://mcmapp.online/api/service', {
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get('https://mcmapp.online/api/promotions', {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       ]);

//       const bookingsData = appointmentsResponse.data;
//       const paymentsData = paymentsResponse.data;
//       const services = servicesResponse.data.data;
//       const promotionsData = promotionsResponse.data;

//       const paymentMap = paymentsData.reduce((acc, payment) => {
//         if (payment.appointment?._id) {
//           acc[payment.appointment._id] = {
//             paymentId: payment._id,
//             status: PaymentStatusEnum[payment.status] || 'Unknown'
//           };
//         }
//         return acc;
//       }, {});

//       const serviceMap = services.reduce((acc, service) => {
//         acc[service.id] = { name: service.name, price: service.price };
//         return acc;
//       }, {});
//       setServicesData(serviceMap);
//       setPromotions(promotionsData);

//       const customerIds = [
//         ...new Set(bookingsData.flatMap(appt => appt.customer.flat()))
//       ];
//       const serviceIds = [
//         ...new Set(bookingsData.flatMap(appt => appt.services.flat()))
//       ];

//       const [customersResponse] = await Promise.all([
//         axios.get('https://mcmapp.online/api/account', {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { ids: customerIds.join(',') }
//         })
//       ]);

//       const customers = Array.isArray(customersResponse.data.data)
//         ? customersResponse.data.data
//         : [];
//       const customerInfoMap = customers.reduce((acc, cust) => {
//         acc[cust._id] = `${cust.fName} ${cust.lName}`;
//         return acc;
//       }, {});

//       const formattedBookings = bookingsData.map(booking => ({
//         id: booking._id,
//         date: new Date(booking.date).toISOString().split('T')[0],
//         time: booking.time,
//         status: AppointmentStatusEnum[booking.status] || 'Unknown',
//         paymentStatus: paymentMap[booking._id]?.status || 'Unknown',
//         paymentId: paymentMap[booking._id]?.paymentId || null,
//         customer: booking.customer
//           .flat()
//           .map(id => customerInfoMap[id] || 'Unknown')
//           .join(', '),
//         services: booking.services
//           .flat()
//           .map(id => serviceMap[id]?.name || 'Unknown'),
//         serviceIds: booking.services.flat()
//       }));

//       setBookings(formattedBookings);
//     } catch (error) {
//       setError('Error fetching bookings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const updatePaymentStatus = async (paymentId) => {
//     const token = sessionStorage.getItem('token');
//     try {
//       console.log('Gọi API cập nhật với paymentId:', paymentId);
//       const response = await axios.put(
//         `https://mcmapp.online/api/payment/${paymentId}`,
//         { status: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log('Phản hồi từ API:', response.data);
//       setBookings(prevBookings =>
//         prevBookings.map(booking =>
//           booking.paymentId === paymentId
//             ? { ...booking, paymentStatus: 'Success' }
//             : booking
//         )
//       );
//       await fetchData();
//       toast.success('Payment status updated to Paid!');
//     } catch (error) {
//       console.error('Lỗi API:', error.response?.data || error.message);
//       toast.error('Error updating payment status: ' + error.message);
//     }
//   };

//   useEffect(() => {
//     const paymentId = localStorage.getItem('PayNowAnchor');
//     const queryParams = new URLSearchParams(location.search);
//     const payosStatus = queryParams.get('status');
//     const orderCode = queryParams.get('orderCode');

//     console.log('Current pathname:', location.pathname);
//     console.log('Full URL:', window.location.href);
//     console.log('Payment ID từ localStorage:', paymentId);
//     console.log('PayOS Status:', payosStatus);
//     console.log('Order Code:', orderCode);

//     if (paymentId && location.pathname === '/' && payosStatus === 'PAID') {
//       console.log('Chuẩn bị cập nhật trạng thái với paymentId:', paymentId);
//       updatePaymentStatus(paymentId);
//       localStorage.removeItem('PayNowAnchor');
//       console.log('PayNowAnchor sau khi xóa:', localStorage.getItem('PayNowAnchor'));
//     } else if (location.pathname === '/cancelpayment') {
//       toast.info('Payment was cancelled.');
//       localStorage.removeItem('PayNowAnchor');
//     } else {
//       console.log('Điều kiện không khớp hoặc không có paymentId');
//     }
//   }, [location.pathname, location.search]);

//   const handleOpenDialog = booking => {
//     setSelectedBooking(booking);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedBooking(null);
//   };

//   // const calculateTotalAmount = serviceIds => {
//   //   const totalServicePrice = serviceIds.reduce(
//   //     (sum, id) => sum + (servicesData[id]?.price || 0),
//   //     0
//   //   );
//   //   return totalServicePrice * 0.15;
//   // };
//   const calculateTotalAmount = serviceIds => {
//     const totalServicePrice = serviceIds.reduce(
//       (sum, id) => sum + (servicesData[id]?.price || 0),
//       0
//     );
//     return totalServicePrice - totalServicePrice * 0.15; // Giá gốc - 15% giá gốc
//   };

// //   const handlePayment = async () => {
// //     if (!selectedBooking) return;

// //     const token = sessionStorage.getItem('token');
// //     const totalAmount = calculateTotalAmount(selectedBooking.serviceIds);
// //     const description = `Thanh toán số tiền còn lại cho lịch hẹn ${selectedBooking.id}`;
// //     const promotionId = promotions.length > 0 ? promotions[0]._id : null;

// //     try {
// //       console.log('Payment ID trước khi lưu:', selectedBooking.paymentId);
// //       localStorage.setItem('PayNowAnchor', selectedBooking.paymentId);
// //       console.log('PayNowAnchor đã lưu:', localStorage.getItem('PayNowAnchor'));
// //       const response = await axios.post(
// //         'https://mcmapp.online/api/product-payment/create',
// //         { totalAmount, description, promotion: null },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success('Payment created successfully!');
// //       handleCloseDialog();
// //       window.location.href = response.data.paymentLink;
// //     } catch (error) {
// //       toast.error('Error creating payment: ' + error.message);
// //     }
// //   };
// const handlePayment = async () => {
//     if (!selectedBooking) return;
  
//     const token = sessionStorage.getItem('token');
//     const totalAmount = calculateTotalAmount(selectedBooking.serviceIds);
//     const description = `Thanh toán số tiền còn lại cho lịch hẹn ${selectedBooking.id}`;
//     const promotionId = promotions.length > 0 ? promotions[0]._id : null;
  
//     try {
//       console.log('Selected Booking:', selectedBooking);
//       console.log('Payment ID trước khi lưu:', selectedBooking.paymentId);
//       console.log('Total Amount trước khi lưu:', totalAmount);
//       if (!selectedBooking.paymentId) {
//         throw new Error('Payment ID không tồn tại trong selectedBooking!');
//       }
//       localStorage.setItem('PayNowAnchor', JSON.stringify({
//         paymentId: selectedBooking.paymentId,
//         totalAmount: totalAmount,
//         method: 0
//       }));
//       console.log('PayNowAnchor đã lưu:', localStorage.getItem('PayNowAnchor'));
//       const response = await axios.post(
//         'https://mcmapp.online/api/product-payment/create',
//         { totalAmount, description, promotion: null },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Payment created successfully!');
//       handleCloseDialog();
//       window.location.href = response.data.paymentLink;
//     } catch (error) {
//       console.error('Lỗi trong handlePayment:', error.message);
//       toast.error('Error creating payment: ' + error.message);
//     }
//   };
//   const handleDelete = async bookingId => {
//     const token = sessionStorage.getItem('token');
//     try {
//       await axios.delete(
//         `https://mcmapp.online/api/appointments/${bookingId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       setBookings(bookings.filter(booking => booking.id !== bookingId));
//       toast.success('Appointment deleted successfully!');
//     } catch (error) {
//       toast.error('Error deleting appointment: ' + error.message);
//     }
//   };

//   const handleSort = key => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });

//     const sortedBookings = [...bookings].sort((a, b) => {
//       if (key === 'date') {
//         return direction === 'asc'
//           ? new Date(a.date) - new Date(b.date)
//           : new Date(b.date) - new Date(a.date);
//       }
//       if (key === 'time') {
//         return direction === 'asc'
//           ? a.time.localeCompare(b.time)
//           : b.time.localeCompare(a.time);
//       }
//       return direction === 'asc'
//         ? a[key].localeCompare(b[key])
//         : b[key].localeCompare(a[key]);
//     });
//     setBookings(sortedBookings);
//   };

//   return (
//     <Box>
//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color='error'>{error}</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Customer</TableCell>
//                 <TableCell>Services</TableCell>
//                 <TableCell>
//                   <TableSortLabel
//                     active={sortConfig.key === 'status'}
//                     direction={
//                       sortConfig.key === 'status' ? sortConfig.direction : 'asc'
//                     }
//                     onClick={() => handleSort('status')}
//                   >
//                     Appointment Status
//                   </TableSortLabel>
//                 </TableCell>
//                 <TableCell>
//                   <TableSortLabel
//                     active={sortConfig.key === 'paymentStatus'}
//                     direction={
//                       sortConfig.key === 'paymentStatus'
//                         ? sortConfig.direction
//                         : 'asc'
//                     }
//                     onClick={() => handleSort('paymentStatus')}
//                   >
//                     Payment
//                   </TableSortLabel>
//                 </TableCell>
//                 <TableCell>
//                   <TableSortLabel
//                     active={sortConfig.key === 'date'}
//                     direction={
//                       sortConfig.key === 'date' ? sortConfig.direction : 'asc'
//                     }
//                     onClick={() => handleSort('date')}
//                   >
//                     Date
//                   </TableSortLabel>
//                 </TableCell>
//                 <TableCell>
//                   <TableSortLabel
//                     active={sortConfig.key === 'time'}
//                     direction={
//                       sortConfig.key === 'time' ? sortConfig.direction : 'asc'
//                     }
//                     onClick={() => handleSort('time')}
//                   >
//                     Time
//                   </TableSortLabel>
//                 </TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {bookings.map(booking => (
//                 <TableRow key={booking.id}>
//                   <TableCell>{booking.id}</TableCell>
//                   <TableCell>{booking.customer}</TableCell>
//                   <TableCell>{booking.services.join(', ')}</TableCell>
//                   <TableCell>{booking.status}</TableCell>
//                   <TableCell>
//                     {booking.paymentStatus === 'Success' ? (
//                       'Paid'
//                     ) : (
//                       <Button
//                         variant='contained'
//                         color='primary'
//                         onClick={() => handleOpenDialog(booking)}
//                         disabled={booking.paymentStatus !== 'Pending'}
//                       >
//                         Pay Now
//                       </Button>
//                     )}
//                   </TableCell>
//                   <TableCell>{booking.date}</TableCell>
//                   <TableCell>{booking.time}</TableCell>
//                   <TableCell>
//                     {booking.paymentStatus === 'Success' && (
//                       <Button
//                         variant='outlined'
//                         color='error'
//                         onClick={() => handleDelete(booking.id)}
//                       >
//                         Delete
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Payment for Appointment</DialogTitle>
//         <DialogContent>
//           {selectedBooking && (
//             <>
//               <Typography>Appointment ID: {selectedBooking.id}</Typography>
//               <Typography>Customer: {selectedBooking.customer}</Typography>
//               <Typography>
//                 Services: {selectedBooking.services.join(', ')}
//               </Typography>
//               <Typography>
//                 Total Amount:{' '}
//                 {calculateTotalAmount(
//                   selectedBooking.serviceIds
//                 ).toLocaleString()}{' '}
//                 VND
//               </Typography>
//               <Typography>Description: Thanh toán số tiền còn lại</Typography>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color='secondary'>
//             Cancel
//           </Button>
//           <Button onClick={handlePayment} color='primary'>
//             Confirm Payment
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <ToastContainer
//         position='top-right'
//         autoClose={3000}
//         hideProgressBar={false}
//       />
//     </Box>
//   );
// }
import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const AppointmentStatusEnum = {
  0: 'Pending',
  1: 'Accepted',
  2: 'Canceled',
  3: 'Finished'
};

const PaymentStatusEnum = {
  0: 'Pending',
  1: 'Success',
  2: 'Failed'
};

export default function AppointmentFinalPayment({ limit, filterToday }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [servicesData, setServicesData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedPromo, setSelectedPromo] = useState(null);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const [
        appointmentsResponse,
        paymentsResponse,
        servicesResponse,
        promotionsResponse
      ] = await Promise.all([
        axios.get('https://mcmapp.online/api/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://mcmapp.online/api/payment', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://mcmapp.online/api/service', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://mcmapp.online/api/promotions', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const bookingsData = appointmentsResponse.data;
      const paymentsData = paymentsResponse.data;
      const services = servicesResponse.data.data;
      const promotionsData = promotionsResponse.data;

      const paymentMap = paymentsData.reduce((acc, payment) => {
        if (payment.appointment?._id) {
          acc[payment.appointment._id] = {
            paymentId: payment._id,
            status: PaymentStatusEnum[payment.status] || 'Unknown'
          };
        }
        return acc;
      }, {});

      const serviceMap = services.reduce((acc, service) => {
        acc[service.id] = { name: service.name, price: service.price };
        return acc;
      }, {});
      setServicesData(serviceMap);
      setPromotions(promotionsData);

      const customerIds = [
        ...new Set(bookingsData.flatMap(appt => appt.customer.flat()))
      ];
      const serviceIds = [
        ...new Set(bookingsData.flatMap(appt => appt.services.flat()))
      ];

      const [customersResponse] = await Promise.all([
        axios.get('https://mcmapp.online/api/account', {
          headers: { Authorization: `Bearer ${token}` },
          params: { ids: customerIds.join(',') }
        })
      ]);

      const customers = Array.isArray(customersResponse.data.data)
        ? customersResponse.data.data
        : [];
      const customerInfoMap = customers.reduce((acc, cust) => {
        acc[cust._id] = `${cust.fName} ${cust.lName}`;
        return acc;
      }, {});

      const formattedBookings = bookingsData.map(booking => ({
        id: booking._id,
        date: new Date(booking.date).toISOString().split('T')[0],
        time: booking.time,
        status: AppointmentStatusEnum[booking.status] || 'Unknown',
        paymentStatus: paymentMap[booking._id]?.status || 'Unknown',
        paymentId: paymentMap[booking._id]?.paymentId || null,
        customer: booking.customer
          .flat()
          .map(id => customerInfoMap[id] || 'Unknown')
          .join(', '),
        services: booking.services
          .flat()
          .map(id => serviceMap[id]?.name || 'Unknown'),
        serviceIds: booking.services.flat()
      }));

      setBookings(formattedBookings);
    } catch (error) {
      setError('Error fetching bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updatePaymentStatus = async paymentId => {
    const token = sessionStorage.getItem('token');
    try {
      console.log('Gọi API cập nhật với paymentId:', paymentId);
      const response = await axios.put(
        `https://mcmapp.online/api/payment/${paymentId}`,
        { status: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Phản hồi từ API:', response.data);
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.paymentId === paymentId
            ? { ...booking, paymentStatus: 'Success' }
            : booking
        )
      );
      await fetchData();
      toast.success('Payment status updated to Paid!');
    } catch (error) {
      console.error('Lỗi API:', error.response?.data || error.message);
      toast.error('Error updating payment status: ' + error.message);
    }
  };

  useEffect(() => {
    const paymentId = localStorage.getItem('PayNowAnchor');
    const queryParams = new URLSearchParams(location.search);
    const payosStatus = queryParams.get('status');
    const orderCode = queryParams.get('orderCode');

    console.log('Current pathname:', location.pathname);
    console.log('Full URL:', window.location.href);
    console.log('Payment ID từ localStorage:', paymentId);
    console.log('PayOS Status:', payosStatus);
    console.log('Order Code:', orderCode);

    if (paymentId && location.pathname === '/' && payosStatus === 'PAID') {
      console.log('Chuẩn bị cập nhật trạng thái với paymentId:', paymentId);
      updatePaymentStatus(paymentId);
      localStorage.removeItem('PayNowAnchor');
      console.log('PayNowAnchor sau khi xóa:', localStorage.getItem('PayNowAnchor'));
    } else if (location.pathname === '/cancelpayment') {
      toast.info('Payment was cancelled.');
      localStorage.removeItem('PayNowAnchor');
    } else {
      console.log('Điều kiện không khớp hoặc không có paymentId');
    }
  }, [location.pathname, location.search]);

  const handleOpenDialog = booking => {
    setSelectedBooking(booking);
    setSelectedPromo(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
    setSelectedPromo(null);
  };

  const calculateTotalAmount = serviceIds => {
    const totalServicePrice = serviceIds.reduce(
      (sum, id) => sum + (servicesData[id]?.price || 0),
      0
    );
    return totalServicePrice - totalServicePrice * 0.15;
  };

  const handlePayment = async () => {
    if (!selectedBooking) return;

    const token = sessionStorage.getItem('token');
    const totalAmount = calculateTotalAmount(selectedBooking.serviceIds);
    const description = `Thanh toán số tiền còn lại cho lịch hẹn ${selectedBooking.id}`;
    const promotionId = selectedPromo;

    try {
      console.log('Selected Booking:', selectedBooking);
      console.log('Payment ID trước khi lưu:', selectedBooking.paymentId);
      console.log('Total Amount trước khi lưu:', totalAmount);
      console.log('Selected Promotion:', promotionId);
      if (!selectedBooking.paymentId) {
        throw new Error('Payment ID không tồn tại trong selectedBooking!');
      }
      localStorage.setItem(
        'PayNowAnchor',
        JSON.stringify({
          paymentId: selectedBooking.paymentId,
          totalAmount: totalAmount,
          method: 0
        })
      );
      console.log('PayNowAnchor đã lưu:', localStorage.getItem('PayNowAnchor'));
      const response = await axios.post(
        'https://mcmapp.online/api/product-payment/create',
        { totalAmount, description, promotion: promotionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Payment created successfully!');
      handleCloseDialog();
      window.location.href = response.data.paymentLink;
    } catch (error) {
      console.error('Lỗi trong handlePayment:', error.message);
      console.error('Chi tiết lỗi từ server:', error.response?.data);
      toast.error('Error creating payment: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async bookingId => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.delete(`https://mcmapp.online/api/appointments/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      toast.success('Appointment deleted successfully!');
    } catch (error) {
      toast.error('Error deleting appointment: ' + error.message);
    }
  };

  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedBookings = [...bookings].sort((a, b) => {
      if (key === 'date') {
        return direction === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (key === 'time') {
        return direction === 'asc'
          ? a.time.localeCompare(b.time)
          : b.time.localeCompare(a.time);
      }
      return direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
    setBookings(sortedBookings);
  };

  const currentDate = new Date(); // Ngày hiện tại: 28/03/2025
  const filteredPromotions = promotions.filter(
    promo =>
      promo.status === 0 &&
      (promo.code?.endsWith('-FDA') || promo.code?.endsWith('-DP')) &&
      new Date(promo.startDate) <= currentDate &&
      new Date(promo.endDate) >= currentDate
  );

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color='error'>{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'status'}
                    direction={
                      sortConfig.key === 'status' ? sortConfig.direction : 'asc'
                    }
                    onClick={() => handleSort('status')}
                  >
                    Appointment Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'paymentStatus'}
                    direction={
                      sortConfig.key === 'paymentStatus'
                        ? sortConfig.direction
                        : 'asc'
                    }
                    onClick={() => handleSort('paymentStatus')}
                  >
                    Payment
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'date'}
                    direction={
                      sortConfig.key === 'date' ? sortConfig.direction : 'asc'
                    }
                    onClick={() => handleSort('date')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'time'}
                    direction={
                      sortConfig.key === 'time' ? sortConfig.direction : 'asc'
                    }
                    onClick={() => handleSort('time')}
                  >
                    Time
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.services.join(', ')}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    {booking.paymentStatus === 'Success' ? (
                      'Paid'
                    ) : (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleOpenDialog(booking)}
                        disabled={booking.paymentStatus !== 'Pending'}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>
                    {booking.paymentStatus === 'Success' && (
                      <Button
                        variant='outlined'
                        color='error'
                        onClick={() => handleDelete(booking.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Payment for Appointment</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <>
              <Typography>Appointment ID: {selectedBooking.id}</Typography>
              <Typography>Customer: {selectedBooking.customer}</Typography>
              <Typography>
                Services: {selectedBooking.services.join(', ')}
              </Typography>
              <Typography>
                Total Amount:{' '}
                {calculateTotalAmount(
                  selectedBooking.serviceIds
                ).toLocaleString()}{' '}
                VND
              </Typography>
              <Typography>Description: Thanh toán số tiền còn lại</Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Promotion Code</InputLabel>
                <Select
                  value={selectedPromo === null ? 'none' : selectedPromo}
                  onChange={e =>
                    setSelectedPromo(e.target.value === 'none' ? null : e.target.value)
                  }
                  label="Promotion Code"
                >
                  <MenuItem value="none">
                    <em>None</em>
                  </MenuItem>
                  {filteredPromotions.map(promo => (
                    <MenuItem key={promo._id} value={promo._id}>
                      {promo.code.endsWith('-FDA')
                        ? `${promo.code} (Giảm ${promo.fixedDiscountAmount?.toLocaleString() || 0} VND)`
                        : `${promo.code} (Giảm ${promo.discountPercentage || 0}%)`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handlePayment} color='primary'>
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
      />
    </Box>
  );
}