// import { useState, useEffect } from 'react'
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
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material'
// import axios from 'axios'

// const AppointmentStatusEnum = {
//   0: 'Pending',
//   1: 'Accepted',
//   2: 'Canceled',
//   3: 'Finished'
// }

// const PaymentStatusEnum = {
//   0: 'Pending',
//   1: 'Success',
//   2: 'Failed'
// }

// export default function AppointmentAssign ({ limit, filterToday }) {
//   const [bookings, setBookings] = useState([])
//   const [staffList, setStaffList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [assigning, setAssigning] = useState({})

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = sessionStorage.getItem('token')
//         const [appointmentsResponse, paymentsResponse, accountsResponse] =
//           await Promise.all([
//             axios.get('http://localhost:3000/api/appointments', {
//               headers: { Authorization: `Bearer ${token}` }
//             }),
//             axios.get('http://localhost:3000/api/payment', {
//               headers: { Authorization: `Bearer ${token}` }
//             }),
//             axios.get('http://localhost:3000/api/account', {
//               headers: { Authorization: `Bearer ${token}` }
//             })
//           ])

//         const bookingsData = appointmentsResponse.data
//         const paymentsData = paymentsResponse.data

//         const paymentMap = paymentsData.reduce((acc, payment) => {
//           if (payment.appointment?._id) {
//             acc[payment.appointment._id] =
//               PaymentStatusEnum[payment.status] || 'Unknown'
//           }
//           return acc
//         }, {})

//         const customerIds = [
//           ...new Set(
//             bookingsData.flatMap(appt =>
//               appt.customer.flatMap(customer => customer.flat())
//             )
//           )
//         ]
//         const serviceIds = [
//           ...new Set(
//             bookingsData.flatMap(appt =>
//               appt.services.flatMap(service => service.flat())
//             )
//           )
//         ]
//         const [customersResponse, servicesResponse] = await Promise.all([
//           axios.get('http://localhost:3000/api/account', {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { ids: customerIds.join(',') }
//           }),
//           axios.get('http://localhost:3000/api/service', {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { ids: serviceIds.join(',') }
//           })
//         ])

//         const customers = Array.isArray(customersResponse.data.data)
//           ? customersResponse.data.data
//           : []
//         const services = Array.isArray(servicesResponse.data.data)
//           ? servicesResponse.data.data
//           : []

//         const customerInfoMap = customers.reduce((acc, cust) => {
//           acc[cust._id] = `${cust.fName} ${cust.lName}`
//           return acc
//         }, {})

//         const serviceInfoMap = services.reduce((acc, service) => {
//           acc[service._id || service.id] = service.name
//           return acc
//         }, {})

//         const allAccounts = Array.isArray(accountsResponse.data.data)
//           ? accountsResponse.data.data
//           : []
//         const staffOnly = allAccounts.filter(account => account.role === 1)
//         setStaffList(staffOnly)

//         const staffInfoMap = staffOnly.reduce((acc, staff) => {
//           acc[staff._id] = `${staff.fName} ${staff.lName}`
//           return acc
//         }, {})

//         const formattedBookings = bookingsData.map(booking => {
//           console.log(`Booking ID: ${booking._id}, staff: ${booking.staff}`) // Debug giá trị staff
//           return {
//             id: booking._id,
//             date: new Date(booking.date).toISOString().split('T')[0],
//             time: booking.time,
//             status: AppointmentStatusEnum[booking.status] || 'Unknown',
//             paymentStatus: paymentMap[booking._id] || 'Unknown',
//             customer: booking.customer
//               .flat()
//               .map(id => customerInfoMap[id] || 'Unknown')
//               .join(', '),
//             services: booking.services
//               .flat()
//               .map(id => serviceInfoMap[id] || 'Unknown')
//               .join(', '),
//             staff: booking.staff || '', // Sử dụng field "staff" thay vì "spaStaff"
//             staffName: booking.staff
//               ? staffInfoMap[booking.staff] || 'Unknown'
//               : '',
//             raw: booking
//           }
//         })

//         setBookings(formattedBookings)
//       } catch (error) {
//         setError('Error fetching bookings.')
//         console.error('Error fetching data:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   const handleAssignStaff = async (bookingId, staffId) => {
//     setAssigning(prev => ({ ...prev, [bookingId]: true }))
//     try {
//       const booking = bookings.find(b => b.id === bookingId)
//       if (!booking) return

//       const customerId = booking.raw.customer.flat()[0]
//       const flatServices = booking.raw.services.flat()

//       const payload = {
//         customer: customerId,
//         total: booking.raw.total || 0,
//         status: booking.raw.status || 0,
//         staff: staffId, // Sử dụng "staff" trong payload
//         services: flatServices,
//         time: booking.raw.time || booking.time || '00:00',
//         date: booking.raw.date || booking.date
//       }

//       const token = sessionStorage.getItem('token')
//       await axios.put(
//         `http://localhost:3000/api/appointments/${bookingId}`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       )

//       const staffName = staffList.find(s => s._id === staffId)
//       const updatedBookings = bookings.map(b =>
//         b.id === bookingId
//           ? {
//               ...b,
//               staff: staffId, // Cập nhật "staff" thay vì "spaStaff"
//               staffName: staffName ? `${staffName.fName} ${staffName.lName}` : 'Unknown'
//             }
//           : b
//       )
//       setBookings(updatedBookings)
//     } catch (err) {
//       console.error('Error assigning staff', err)
//     } finally {
//       setAssigning(prev => ({ ...prev, [bookingId]: false }))
//     }
//   }

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
//                 <TableCell>Appointment Status & Assign Staff</TableCell>
//                 <TableCell>Payment Status</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Time</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {bookings.map(booking => (
//                 <TableRow key={booking.id}>
//                   <TableCell>{booking.id}</TableCell>
//                   <TableCell>{booking.customer}</TableCell>
//                   <TableCell>{booking.services}</TableCell>
//                   <TableCell>
//                     <Typography variant='body2'>{booking.status}</Typography>
//                     {/* Kiểm tra field "staff" thay vì "spaStaff" */}
//                     {booking.staff && booking.staffName ? (
//                       <Typography variant='body2' color='textSecondary'>
//                         Assigned to: {booking.staffName}
//                       </Typography>
//                     ) : (
//                       <FormControl fullWidth size='small' sx={{ mt: 1 }}>
//                         <InputLabel>Assign Staff</InputLabel>
//                         <Select
//                           value={booking.staff || ''} // Sử dụng "staff"
//                           label='Assign Staff'
//                           onChange={e =>
//                             handleAssignStaff(booking.id, e.target.value)
//                           }
//                           disabled={assigning[booking.id] === true}
//                         >
//                           <MenuItem value=''>
//                             <em>Select Staff</em>
//                           </MenuItem>
//                           {staffList.map(staff => (
//                             <MenuItem key={staff._id} value={staff._id}>
//                               {staff.fName} {staff.lName}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     )}
//                   </TableCell>
//                   <TableCell>{booking.paymentStatus}</TableCell>
//                   <TableCell>{booking.date}</TableCell>
//                   <TableCell>{booking.time}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   )
// }
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
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
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

export default function AppointmentAssign ({ limit, filterToday }) {
  const [bookings, setBookings] = useState([])
  const [staffList, setStaffList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [assigning, setAssigning] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token')
        const [appointmentsResponse, paymentsResponse, accountsResponse] =
          await Promise.all([
            axios.get('http://localhost:3000/api/appointments', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:3000/api/payment', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:3000/api/account', {
              headers: { Authorization: `Bearer ${token}` }
            })
          ])

        const bookingsData = appointmentsResponse.data
        const paymentsData = paymentsResponse.data

        const paymentMap = paymentsData.reduce((acc, payment) => {
          if (payment.appointment?._id) {
            acc[payment.appointment._id] =
              PaymentStatusEnum[payment.status] || 'Unknown'
          }
          return acc
        }, {})

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
        const [customersResponse, servicesResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/account', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: customerIds.join(',') }
          }),
          axios.get('http://localhost:3000/api/service', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: serviceIds.join(',') }
          })
        ])

        const customers = Array.isArray(customersResponse.data.data)
          ? customersResponse.data.data
          : []
        const services = Array.isArray(servicesResponse.data.data)
          ? servicesResponse.data.data
          : []

        const customerInfoMap = customers.reduce((acc, cust) => {
          acc[cust._id] = `${cust.fName} ${cust.lName}`
          return acc
        }, {})

        const serviceInfoMap = services.reduce((acc, service) => {
          acc[service._id || service.id] = service.name
          return acc
        }, {})

        const allAccounts = Array.isArray(accountsResponse.data.data)
          ? accountsResponse.data.data
          : []
        const staffOnly = allAccounts.filter(account => account.role === 1)
        setStaffList(staffOnly)

        const staffInfoMap = staffOnly.reduce((acc, staff) => {
          acc[staff._id] = `${staff.fName} ${staff.lName}`
          return acc
        }, {})

        const formattedBookings = bookingsData.map(booking => {
          console.log(`Booking ID: ${booking._id}, staff: ${booking.staff}`)
          return {
            id: booking._id,
            date: new Date(booking.date).toISOString().split('T')[0],
            time: booking.time,
            status: AppointmentStatusEnum[booking.status] || 'Unknown',
            statusCode: booking.status, // Lưu mã trạng thái để dễ cập nhật
            paymentStatus: paymentMap[booking._id] || 'Unknown',
            customer: booking.customer
              .flat()
              .map(id => customerInfoMap[id] || 'Unknown')
              .join(', '),
            services: booking.services
              .flat()
              .map(id => serviceInfoMap[id] || 'Unknown')
              .join(', '),
            staff: booking.staff || '',
            staffName: booking.staff
              ? staffInfoMap[booking.staff] || 'Unknown'
              : '',
            raw: booking
          }
        })

        setBookings(formattedBookings)
      } catch (error) {
        setError('Error fetching bookings.')
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAssignStaff = async (bookingId, staffId) => {
    setAssigning(prev => ({ ...prev, [bookingId]: true }))
    try {
      const booking = bookings.find(b => b.id === bookingId)
      if (!booking) return

      const customerId = booking.raw.customer.flat()[0]
      const flatServices = booking.raw.services.flat()

      const payload = {
        customer: customerId,
        total: booking.raw.total || 0,
        status: booking.statusCode || 0,
        staff: staffId,
        services: flatServices,
        time: booking.raw.time || booking.time || '00:00',
        date: booking.raw.date || booking.date
      }

      const token = sessionStorage.getItem('token')
      await axios.put(
        `http://localhost:3000/api/appointments/${bookingId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const staffName = staffList.find(s => s._id === staffId)
      const updatedBookings = bookings.map(b =>
        b.id === bookingId
          ? {
              ...b,
              staff: staffId,
              staffName: staffName ? `${staffName.fName} ${staffName.lName}` : 'Unknown'
            }
          : b
      )
      setBookings(updatedBookings)
    } catch (err) {
      console.error('Error assigning staff', err)
    } finally {
      setAssigning(prev => ({ ...prev, [bookingId]: false }))
    }
  }

  const handleUnassignStaff = async (bookingId) => {
    setAssigning(prev => ({ ...prev, [bookingId]: true }))
    try {
      const booking = bookings.find(b => b.id === bookingId)
      if (!booking) return

      const customerId = booking.raw.customer.flat()[0]
      const flatServices = booking.raw.services.flat()

      const payload = {
        customer: customerId,
        total: booking.raw.total || 0,
        status: booking.statusCode || 0,
        staff: '', // Xóa staff bằng cách gửi chuỗi rỗng
        services: flatServices,
        time: booking.raw.time || booking.time || '00:00',
        date: booking.raw.date || booking.date
      }

      const token = sessionStorage.getItem('token')
      await axios.put(
        `http://localhost:3000/api/appointments/${bookingId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const updatedBookings = bookings.map(b =>
        b.id === bookingId
          ? { ...b, staff: '', staffName: '' }
          : b
      )
      setBookings(updatedBookings)
    } catch (err) {
      console.error('Error unassigning staff', err)
    } finally {
      setAssigning(prev => ({ ...prev, [bookingId]: false }))
    }
  }

  const handleChangeStatus = async (bookingId, newStatusCode) => {
    setAssigning(prev => ({ ...prev, [bookingId]: true }))
    try {
      const booking = bookings.find(b => b.id === bookingId)
      if (!booking) return

      const customerId = booking.raw.customer.flat()[0]
      const flatServices = booking.raw.services.flat()

      const payload = {
        customer: customerId,
        total: booking.raw.total || 0,
        status: newStatusCode, // Cập nhật status mới
        staff: booking.staff || '',
        services: flatServices,
        time: booking.raw.time || booking.time || '00:00',
        date: booking.raw.date || booking.date
      }

      const token = sessionStorage.getItem('token')
      await axios.put(
        `http://localhost:3000/api/appointments/${bookingId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const updatedBookings = bookings.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: AppointmentStatusEnum[newStatusCode] || 'Unknown',
              statusCode: newStatusCode
            }
          : b
      )
      setBookings(updatedBookings)
    } catch (err) {
      console.error('Error updating status', err)
    } finally {
      setAssigning(prev => ({ ...prev, [bookingId]: false }))
    }
  }

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
                <TableCell>Appointment Status & Assign Staff</TableCell>
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
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {/* Dropdown để chỉnh status */}
                      <FormControl fullWidth size='small'>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={booking.statusCode}
                          label='Status'
                          onChange={e =>
                            handleChangeStatus(booking.id, parseInt(e.target.value))
                          }
                          disabled={assigning[booking.id] === true}
                        >
                          {Object.entries(AppointmentStatusEnum).map(([code, label]) => (
                            <MenuItem key={code} value={parseInt(code)}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {/* Logic hiển thị Assign/Unassign Staff */}
                      {booking.staff && booking.staffName ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant='body2' color='textSecondary'>
                            Assigned to: {booking.staffName}
                          </Typography>
                          <Button
                            variant='outlined'
                            size='small'
                            color='error'
                            onClick={() => handleUnassignStaff(booking.id)}
                            disabled={assigning[booking.id] === true}
                          >
                            Unassign
                          </Button>
                        </Box>
                      ) : (
                        <FormControl fullWidth size='small'>
                          <InputLabel>Assign Staff</InputLabel>
                          <Select
                            value={booking.staff || ''}
                            label='Assign Staff'
                            onChange={e =>
                              handleAssignStaff(booking.id, e.target.value)
                            }
                            disabled={assigning[booking.id] === true}
                          >
                            <MenuItem value=''>
                              <em>Select Staff</em>
                            </MenuItem>
                            {staffList.map(staff => (
                              <MenuItem key={staff._id} value={staff._id}>
                                {staff.fName} {staff.lName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  </TableCell>
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