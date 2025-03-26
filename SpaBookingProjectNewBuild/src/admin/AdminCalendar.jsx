import { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material'
import axios from 'axios'

export default function AdminCalendar () {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [shiftAssignments, setShiftAssignments] = useState({})

  useEffect(() => {
    const fetchAppointmentsAndStaff = async () => {
      try {
        const token = sessionStorage.getItem('token')

        const [appointmentsResponse, staffResponse] = await Promise.all([
          axios.get('http://160.30.137.106:3000/api/appointments', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://160.30.137.106:3000/api/account?role=1', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        console.log('Staff API Response:', staffResponse.data)
        //
        const bookingsData = appointmentsResponse.data
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
          axios.get('http://160.30.137.106:3000/api/account', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: customerIds.join(',') }
          }),
          axios.get('http://160.30.137.106:3000/api/service', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: serviceIds.join(',') }
          })
        ])
        console.log('Customers Response:', customersResponse.data)
        console.log('Services Response:', servicesResponse.data)

        const customers = Array.isArray(customersResponse.data.data)
          ? customersResponse.data.data
          : []
        console.log('Customers:', customersResponse.data.data)
        const services = Array.isArray(servicesResponse.data.data)
          ? servicesResponse.data.data
          : []
        const customerInfoMap = customers.reduce((acc, cust) => {
          acc[cust._id] = `${cust.fName} ${cust.lName}`
          return acc
        }, {})
        console.log('Customer Info Map:', customerInfoMap)

        const serviceInfoMap = services.reduce((acc, service) => {
          acc[service.id] = service.name
          return acc
        }, {})
        //
        const formattedAppointments = appointmentsResponse.data.map(
          appointment => ({
            id: appointment._id,
            date: new Date(appointment.date).toISOString().split('T')[0],
            time: appointment.time,
            status: appointment.status,
            // customer: appointment.customer[0] || "Unknown",
            customer: appointment.customer
              .flat()
              .map(id => customerInfoMap[id] || 'Unknown')
              .join(', '),
            // services: appointment.services
            //   .map((service) => service[0] || "Unknown")
            //   .join(", "),
            services: appointment.services
              .flat()
              .map(id => serviceInfoMap[id] || 'Unknown')
              .join(', ')
          })
        )
        console.log('Formatted Appointments:', formattedAppointments)

        setAppointments(formattedAppointments)
        setStaff(
          Array.isArray(staffResponse.data.data) ? staffResponse.data.data : []
        )
      } catch (error) {
        setError('Error fetching data.')
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointmentsAndStaff()
  }, [])

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  // const assignStaffToShift = (date, time, staffId) => {
  //   setShiftAssignments((prevAssignments) => ({
  //     ...prevAssignments,
  //     [`${date}-${time}`]: staffId,
  //   }));
  // };
  // Thay đổi hàm assignStaffToShift để nhận appointmentId làm key
  // const assignStaffToShift = (appointmentId, staffId) => {
  //   setShiftAssignments((prevAssignments) => ({
  //     ...prevAssignments,
  //     [appointmentId]: staffId,
  //   }));
  // };
  const isStaffAlreadyAssigned = (
    date,
    time,
    staffId,
    currentAppointmentId
  ) => {
    return appointments.some(appt => {
      // Bỏ qua chính cuộc hẹn hiện tại
      if (appt.id === currentAppointmentId) return false

      // Nếu appt trùng ngày & giờ
      if (appt.date === date && appt.time === time) {
        // Kiểm tra xem staff được gán (trong shiftAssignments) có đúng là staffId hay không
        return shiftAssignments[appt.id] === staffId
      }

      return false
    })
  }
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDay.getDay()
    const daysInMonth = lastDay.getDate()

    const days = Array(firstDayOfWeek).fill(null)
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = new Date(year, month, day).toISOString().split('T')[0]
      const dayEvents = appointments.filter(event => event.date === dateString)
      days.push({ day, dateString, events: dayEvents })
    }
    return days
  }

  if (loading) return <CircularProgress />
  if (error) return <Typography color='error'>{error}</Typography>

  const calendarDays = generateCalendarDays()
  const monthYearString = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant='h5'>{monthYearString}</Typography>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Grid container spacing={1}>
          {calendarDays.map((day, index) => (
            <Grid
              item
              key={index}
              xs={1.7}
              sx={{ border: '1px solid #ddd', p: 1, minHeight: 100 }}
            >
              {day && (
                <>
                  <Typography variant='body2'>{day.day}</Typography>
                  {day.events.map(event => (
                    <Paper
                      key={event.id}
                      sx={{ p: 1, mt: 1, backgroundColor: '#f5f5f5' }}
                    >
                      <Typography variant='caption'>{event.time}</Typography>
                      <Typography variant='body2'>
                        Customer: {event.customer}
                      </Typography>
                      <Typography variant='body2'>
                        Services: {event.services}
                      </Typography>
                      <FormControl fullWidth size='small' sx={{ mt: 1 }}>
                        <InputLabel>Assign Staff</InputLabel>
                        {/* <Select
                          // value={
                          //   shiftAssignments[`${event.date}-${event.time}`] ||
                          //   ""
                          // }
                          // onChange={(e) =>
                          //   assignStaffToShift(
                          //     event.date,
                          //     event.time,
                          //     e.target.value
                          //   )
                          // }
                          value={shiftAssignments[event.id] || ""}
                          onChange={(e) =>
                            assignStaffToShift(event.id, e.target.value)
                          }
                        >
                          {staff.length > 0 ? (
                            staff.map((member) => (
                              <MenuItem key={member._id} value={member._id}>
                                {member.fName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No staff available</MenuItem>
                          )}
                        </Select> */}
                        <Select
                          // Lấy staff hiện tại (nếu có)
                          value={shiftAssignments[event.id] || ''}
                          onChange={e =>
                            setShiftAssignments(prev => ({
                              ...prev,
                              [event.id]: e.target.value
                            }))
                          }
                        >
                          {staff.length > 0 ? (
                            staff.map(member => (
                              <MenuItem
                                key={member._id}
                                value={member._id}
                                // Disable nếu hàm kiểm tra trả về true
                                disabled={isStaffAlreadyAssigned(
                                  event.date,
                                  event.time,
                                  member._id,
                                  event.id
                                )}
                              >
                                {member.fName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No staff available</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Paper>
                  ))}
                </>
              )}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  )
}
