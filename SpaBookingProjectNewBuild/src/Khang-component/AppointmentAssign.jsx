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
            axios.get('https://mcmapp.online/api/appointments', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('https://mcmapp.online/api/payment', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('https://mcmapp.online/api/account', {
              headers: { Authorization: `Bearer ${token}` }
            })
          ])

        const bookingsData = appointmentsResponse.data
        const paymentsData = paymentsResponse.data
        console.log('Raw paymentsResponse Data:', paymentsData)

        const paymentMap = paymentsData.reduce((acc, payment) => {
          if (payment.appointment?._id) {
            acc[payment.appointment._id] = {
              statusText: PaymentStatusEnum[payment.status] || 'Unknown',
              statusCode: payment.status,
              paymentId: payment._id
            }
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
          axios.get('https://mcmapp.online/api/account', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: customerIds.join(',') }
          }),
          axios.get('https://mcmapp.online/api/service', {
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
        // const staffOnly = allAccounts.filter(account => account.role === 1)
        // setStaffList(staffOnly)
        const staffOnly = allAccounts.filter(
          account => account.role === 1 && account.status !== undefined // Đảm bảo có trường status
        );
        setStaffList(staffOnly);

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
            statusCode: booking.status,
            paymentStatus: paymentMap[booking._id]?.statusText || 'Unknown',
            paymentStatusCode: paymentMap[booking._id]?.statusCode ?? '',
            paymentId: paymentMap[booking._id]?.paymentId || '',
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

  // const handleAssignStaff = async (bookingId, staffId) => {
  //   setAssigning(prev => ({ ...prev, [bookingId]: true }))
  //   try {
  //     const booking = bookings.find(b => b.id === bookingId)
  //     if (!booking) return

  //     const customerId = booking.raw.customer.flat()[0]
  //     const flatServices = booking.raw.services.flat()

  //     const payload = {
  //       customer: customerId,
  //       total: booking.raw.total || 0,
  //       status: booking.statusCode || 0,
  //       staff: staffId,
  //       services: flatServices,
  //       time: booking.raw.time || booking.time || '00:00',
  //       date: booking.raw.date || booking.date
  //     }

  //     const token = sessionStorage.getItem('token')
  //     await axios.put(
  //       `https://mcmapp.online/api/appointments/${bookingId}`,
  //       payload,
  //       {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }
  //     )

  //     const staffName = staffList.find(s => s._id === staffId)
  //     const updatedBookings = bookings.map(b =>
  //       b.id === bookingId
  //         ? {
  //             ...b,
  //             staff: staffId,
  //             staffName: staffName ? `${staffName.fName} ${staffName.lName}` : 'Unknown'
  //           }
  //         : b
  //     )
  //     setBookings(updatedBookings)
  //   } catch (err) {
  //     console.error('Error assigning staff', err)
  //   } finally {
  //     setAssigning(prev => ({ ...prev, [bookingId]: false }))
  //   }
  // }

  const handleAssignStaff = async (bookingId, staffId) => {
    setAssigning(prev => ({ ...prev, [bookingId]: true }))
    try {
      const booking = bookings.find(b => b.id === bookingId)
      if (!booking) return

      const customerId = booking.raw.customer.flat()[0]
      const flatServices = booking.raw.services.flat()

      const token = sessionStorage.getItem('token')

      // 1. Cập nhật appointment với staff mới
      const appointmentPayload = {
        customer: customerId,
        total: booking.raw.total || 0,
        status: booking.statusCode || 0,
        staff: staffId,
        services: flatServices,
        time: booking.raw.time || booking.time || '00:00',
        date: booking.raw.date || booking.date
      }

      await axios.put(
        `https://mcmapp.online/api/appointments/${bookingId}`,
        appointmentPayload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      // 2. Lấy thông tin hiện tại của staff từ API
      const staffResponse = await axios.get(
        `https://mcmapp.online/api/account/${staffId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const staffData = staffResponse.data.data || staffResponse.data

      // 3. Cập nhật status của staff (ví dụ: đổi từ 0 thành 1)
      const newStaffStatus = 1 // Giả sử 1 là trạng thái "đã được assign", bạn có thể thay đổi logic này
      const staffPayload = {
        email: staffData.email,
        phone: staffData.phone,
        password: staffData.password, // Có thể không cần gửi nếu API không yêu cầu
        role: staffData.role,
        fName: staffData.fName,
        lName: staffData.lName,
        dob: staffData.dob,
        avt: staffData.avt,
        status: newStaffStatus
      }

      await axios.put(
        `https://mcmapp.online/api/account/${staffId}`,
        staffPayload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      // 4. Cập nhật UI
      const staffName = staffList.find(s => s._id === staffId)
      const updatedBookings = bookings.map(b =>
        b.id === bookingId
          ? {
              ...b,
              staff: staffId,
              staffName: staffName
                ? `${staffName.fName} ${staffName.lName}`
                : 'Unknown'
            }
          : b
      )
      setBookings(updatedBookings)

      // 5. Cập nhật staffList nếu cần (tùy thuộc vào việc bạn muốn hiển thị status của staff trong UI)
      const updatedStaffList = staffList.map(staff =>
        staff._id === staffId ? { ...staff, status: newStaffStatus } : staff
      )
      setStaffList(updatedStaffList)
    } catch (err) {
      console.error('Error assigning staff or updating staff status', err)
      setError('Error assigning staff or updating staff status')
    } finally {
      setAssigning(prev => ({ ...prev, [bookingId]: false }))
    }
  }

  // const handleUnassignStaff = async (bookingId) => {
  //   setAssigning(prev => ({ ...prev, [bookingId]: true }))
  //   try {
  //     const booking = bookings.find(b => b.id === bookingId)
  //     if (!booking) return

  //     const customerId = booking.raw.customer.flat()[0]
  //     const flatServices = booking.raw.services.flat()

  //     const payload = {
  //       customer: customerId,
  //       total: booking.raw.total || 0,
  //       status: booking.statusCode || 0,
  //       staff: '',
  //       services: flatServices,
  //       time: booking.raw.time || booking.time || '00:00',
  //       date: booking.raw.date || booking.date
  //     }

  //     const token = sessionStorage.getItem('token')
  //     await axios.put(
  //       `https://mcmapp.online/api/appointments/${bookingId}`,
  //       payload,
  //       {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }
  //     )

  //     const updatedBookings = bookings.map(b =>
  //       b.id === bookingId
  //         ? { ...b, staff: '', staffName: '' }
  //         : b
  //     )
  //     setBookings(updatedBookings)
  //   } catch (err) {
  //     console.error('Error unassigning staff', err)
  //   } finally {
  //     setAssigning(prev => ({ ...prev, [bookingId]: false }))
  //   }
  // }

  const handleUpdateStaffStatus = async bookingId => {
    setAssigning(prev => ({ ...prev, [bookingId]: true }))
    try {
      const booking = bookings.find(b => b.id === bookingId)
      if (!booking || !booking.staff) return

      const staffId = booking.staff
      const token = sessionStorage.getItem('token')

      // 1. Lấy thông tin hiện tại của staff từ API
      const staffResponse = await axios.get(
        `https://mcmapp.online/api/account/${staffId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const staffData = staffResponse.data.data || staffResponse.data

      // 2. Cập nhật status của staff (ví dụ: đổi từ 1 thành 0)
      const newStaffStatus = 0 // Giả sử 0 là trạng thái "rảnh" sau khi unassign
      const staffPayload = {
        email: staffData.email,
        phone: staffData.phone,
        password: staffData.password, // Có thể không cần gửi nếu API không yêu cầu
        role: staffData.role,
        fName: staffData.fName,
        lName: staffData.lName,
        dob: staffData.dob,
        avt: staffData.avt,
        status: newStaffStatus
      }

      await axios.put(
        `https://mcmapp.online/api/account/${staffId}`,
        staffPayload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      // 3. Xóa staff khỏi booking trong UI (không gửi request tới API appointment)
      const updatedBookings = bookings.map(b =>
        b.id === bookingId
          ? { ...b, staff: '', staffName: '' }
          : b
      )
      setBookings(updatedBookings)
      // 4. Cập nhật staffList trong state (không thay đổi booking)
      const updatedStaffList = staffList.map(staff =>
        staff._id === staffId ? { ...staff, status: newStaffStatus } : staff
      )
      setStaffList(updatedStaffList)
    } catch (err) {
      console.error('Error updating staff status', err)
      setError('Error updating staff status')
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
        status: newStatusCode,
        staff: booking.staff || '',
        services: flatServices,
        time: booking.raw.time || booking.time || '00:00',
        date: booking.raw.date || booking.date
      }

      const token = sessionStorage.getItem('token')
      await axios.put(
        `https://mcmapp.online/api/appointments/${bookingId}`,
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

  // Hàm xử lý xóa appointment
  const handleDeleteAppointment = async bookingId => {
    if (!window.confirm('Are you sure you want to delete this appointment?'))
      return
    setAssigning(prev => ({ ...prev, [bookingId]: true }))
    try {
      const token = sessionStorage.getItem('token')
      await axios.delete(
        `https://mcmapp.online/api/appointments/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      // Cập nhật danh sách bookings sau khi xóa
      const updatedBookings = bookings.filter(b => b.id !== bookingId)
      setBookings(updatedBookings)
    } catch (err) {
      console.error('Error deleting appointment', err)
      setError('Failed to delete appointment')
    } finally {
      setAssigning(prev => ({ ...prev, [bookingId]: false }))
    }
  }
  // Hàm xử lý thay đổi payment status
  const handleChangePaymentStatus = async (
    bookingId,
    paymentId,
    newStatusCode
  ) => {
    if (!paymentId) return // Nếu không có paymentId thì không làm gì

    setAssigning(prev => ({ ...prev, [bookingId]: true }))
    try {
      const booking = bookings.find(b => b.id === bookingId)
      if (!booking) return

      const payload = {
        totalAmount: booking.raw.total || 0,
        method: 0, // Giả sử mặc định là 0, bạn có thể cần lấy giá trị thực tế từ dữ liệu
        status: newStatusCode
      }

      const token = sessionStorage.getItem('token')
      await axios.put(
        `https://mcmapp.online/api/payment/${paymentId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const updatedBookings = bookings.map(b =>
        b.id === bookingId
          ? {
              ...b,
              paymentStatus: PaymentStatusEnum[newStatusCode] || 'Unknown',
              paymentStatusCode: newStatusCode
            }
          : b
      )
      setBookings(updatedBookings)
    } catch (err) {
      console.error('Error updating payment status', err)
    } finally {
      setAssigning(prev => ({ ...prev, [bookingId]: false }))
    }
  }
  const handlePaymentStatusChange = (bookingId, paymentId) => event => {
    const newStatusCode = parseInt(event.target.value)
    handleChangePaymentStatus(bookingId, paymentId, newStatusCode)
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
                {/* <TableCell>Actions</TableCell> Cột mới cho nút Delete */}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.services}</TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      <FormControl fullWidth size='small'>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={booking.statusCode}
                          label='Status'
                          onChange={e =>
                            handleChangeStatus(
                              booking.id,
                              parseInt(e.target.value)
                            )
                          }
                          disabled={assigning[booking.id] === true}
                        >
                          {Object.entries(AppointmentStatusEnum).map(
                            ([code, label]) => (
                              <MenuItem key={code} value={parseInt(code)}>
                                {label}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      {booking.staff && booking.staffName ? (
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Typography variant='body2' color='textSecondary'>
                            Assigned to: {booking.staffName}
                          </Typography>
                          {/* <Button
                            variant='outlined'
                            size='small'
                            color='error'
                            onClick={() => handleUnassignStaff(booking.id)}
                            disabled={assigning[booking.id] === true}
                          >
                            Unassign
                          </Button> */}
                          <Button
                            variant='outlined'
                            size='small'
                            color='primary' // Đổi màu để phân biệt với Delete
                            onClick={() => handleUpdateStaffStatus(booking.id)}
                            disabled={assigning[booking.id] === true}
                          >
                            Swap Staff
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
                            {staffList
                            .filter(staff => staff.status === 0)
                            .map(staff => (
                              <MenuItem key={staff._id} value={staff._id}>
                                {staff.fName} {staff.lName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{booking.paymentStatus}</Typography>
                    {/* <FormControl fullWidth size='small'>
                      <InputLabel>Payment Status</InputLabel>
                      <Select
                        value={booking.paymentStatusCode}
                        label='Payment Status'
                        onChange={handlePaymentStatusChange(
                          booking.id,
                          booking.paymentId
                        )}
                        disabled={
                          assigning[booking.id] === true || !booking.paymentId
                        }
                      >
                        {Object.entries(PaymentStatusEnum).map(
                          ([code, label]) => (
                            <MenuItem key={code} value={parseInt(code)}>
                              {label}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl> */}
                  </TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  {/* <TableCell>
                    {(booking.statusCode === 2 || booking.statusCode === 3) && (
                      <Button
                        variant='contained'
                        color='error'
                        size='small'
                        onClick={() => handleDeleteAppointment(booking.id)}
                        disabled={assigning[booking.id] === true}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}