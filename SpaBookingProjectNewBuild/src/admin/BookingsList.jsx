import { useState, useEffect } from 'react'
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
  Typography
} from '@mui/material'
import axios from 'axios'

const AppointmentStatusEnum = {
  0: 'Pending',
  1: 'Accepted',
  2: 'Canceled',
  3: 'Finished'
}

const PaymentStatusEnum = {
  0: 'Pending',
  1: 'Success',
  2: 'Failed'
}

export default function BookingsList ({ limit, filterToday }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem('token')
        const [appointmentsResponse, paymentsResponse] = await Promise.all([
          axios.get('https://mcmapp.online/api/appointments', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://mcmapp.online/api/payment', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        const bookingsData = appointmentsResponse.data
        const paymentsData = paymentsResponse.data
        // console.log('Raw Bookings Data:', bookingsData) //co du lieu
        // console.log('Raw Payments Data:', paymentsData) //co du lieu

        // const paymentMap = paymentsData.reduce((acc, payment) => {
        //   acc[payment.orderCode] =
        //     PaymentStatusEnum[payment.status] || 'Unknown'
        //   return acc
        // }, {})
        const paymentMap = paymentsData.reduce((acc, payment) => {
          if (payment.appointment?._id) {
            acc[payment.appointment._id] = PaymentStatusEnum[payment.status] || "Unknown";
          }
          return acc;
        }, {});

        // console.log('Payment Map:', paymentMap)
        // Extract unique customer and service IDs

        // const customerIds = [
        //   ...new Set(bookingsData.map((appt) => appt.customer[0]?.$oid)),
        // ];
        const customerIds = [
          ...new Set(
            bookingsData.flatMap(appt =>
              appt.customer.flatMap(customer => customer.flat())
            )
          )
        ]
        const serviceIds = [
          ...new Set(
            bookingsData.flatMap(appt =>
              appt.services.flatMap(service => service.flat())
            )
          )
        ]
        // const serviceIds = [
        //   ...new Set(
        //     bookingsData.flatMap((appt) =>
        //       appt.services.map((service) => service[0]?.$oid)
        //     )
        //   ),
        // ];

        // console.log('Extracted Customer IDs:', customerIds)
        // console.log('Extracted Service IDs:', serviceIds)

        const [customersResponse, servicesResponse] = await Promise.all([
          axios.get('https://mcmapp.online/api/account', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: customerIds.join(',') }
          }),
          axios.get('https://mcmapp.online/api/service', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: serviceIds.join(',') }
          })
        ])

        // console.log('Customers Response:', customersResponse.data)
        // console.log('Services Response:', servicesResponse.data)

        // const customers = Array.isArray(customersResponse.data)
        //   ? customersResponse.data
        //   : []
        //Code sửa
        const customers = Array.isArray(customersResponse.data.data)
        ? customersResponse.data.data
        : []
        //
        // const services = Array.isArray(servicesResponse.data)
        //   ? servicesResponse.data
        //   : []
        //Code sửa
        const services = Array.isArray(servicesResponse.data.data)
        ? servicesResponse.data.data
        : []
        //
        const customerMap = customers.reduce((acc, cust) => {
          acc[cust._id] = cust.fName
          return acc
        }, {})

        const serviceMap = services.reduce((acc, service) => {
          acc[service._id] = service.name
          return acc
        }, {})

//
        // bookingsData.forEach((booking) => {
        //   console.log(`Checking payment for booking ID: ${booking._id}, Found: ${paymentMap[booking._id] || "Not Found"}`);
        // });
        // console.log("Payments Data:", paymentsData.map(p => ({
        //   paymentID: p._id,
        //   appointmentID: p.appointment._id,
        //   status: p.status
        // })));
//
        // console.log('Updated Customer Map:', customerMap)
        // console.log('Updated Service Map:', serviceMap)

        // const formattedBookings = bookingsData.map(booking => ({
        //   id: booking._id,
        //   date: new Date(booking.date).toISOString().split('T')[0],
        //   time: booking.time,
        //   status: AppointmentStatusEnum[booking.status] || 'Unknown',
        //   paymentStatus: paymentMap[booking._id] || 'Unknown',
        //   customer: customerMap[booking.customer[0]?.$oid] || 'Unknown',
        //   services: booking.services
        //     .map(service => serviceMap[service[0]?.$oid] || 'Unknown')
        //     .join(', ')
        // }))


        //Lay ten nguoi dung
        const customerInfoMap = customers.reduce((acc, cust) => {
          acc[cust._id] = `${cust.fName} ${cust.lName}`;
          return acc;
        }, {});
        //
        //Lay service
        const serviceInfoMap = services.reduce((acc, service) => {
          acc[service.id] = service.name;
          return acc;
        }, {});
        //

        const formattedBookings = bookingsData.map((booking) => ({
          id: booking._id,
          date: new Date(booking.date).toISOString().split("T")[0],
          time: booking.time,
          status: AppointmentStatusEnum[booking.status] || "Unknown",
          // paymentStatus: paymentMap[booking._id] || "Unknown",
          paymentStatus: paymentMap[booking._id] || "Unknown",
          // customer: booking.customer.flat().join(", "), // Làm phẳng và join
          customer: booking.customer.flat().map(id => customerInfoMap[id] || "Unknown").join(", "),
          // services: booking.services.flat().join(", ")  // Làm phẳng và join
          services: booking.services.flat().map(id => serviceInfoMap[id] || "Unknown").join(", "),
        }));
        // console.log('Formatted Bookings:', formattedBookings)
        setBookings(formattedBookings)
      } catch (error) {
        setError('Error fetching bookings.')
        // console.error('Error fetching bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

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
                <TableCell>Appointment Status</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.services}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>{booking.paymentStatus}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
