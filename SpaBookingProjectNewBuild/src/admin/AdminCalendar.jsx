// import { useState, useEffect } from 'react'
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   IconButton,
//   CircularProgress
// } from '@mui/material'
// import {
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon
// } from '@mui/icons-material'
// import axios from 'axios'

// export default function AdminCalendar () {
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [appointments, setAppointments] = useState([])
//   const [staff, setStaff] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchAppointmentsAndStaff = async () => {
//       try {
//         const token = sessionStorage.getItem('token')

//         const [appointmentsResponse, staffResponse] = await Promise.all([
//           axios.get('https://mcmapp.online/api/appointments', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get('https://mcmapp.online/api/account?role=1', {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         ])

//         const bookingsData = appointmentsResponse.data
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
//           axios.get('https://mcmapp.online/api/account', {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { ids: customerIds.join(',') }
//           }),
//           axios.get('https://mcmapp.online/api/service', {
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
//         const staffData = Array.isArray(staffResponse.data.data)
//           ? staffResponse.data.data
//           : []

//         const customerInfoMap = customers.reduce((acc, cust) => {
//           acc[cust._id] = `${cust.fName} ${cust.lName}`
//           return acc
//         }, {})

//         const serviceInfoMap = services.reduce((acc, service) => {
//           acc[service.id] = service.name
//           return acc
//         }, {})

//         // Tạo map cho staff
//         const staffInfoMap = staffData.reduce((acc, staff) => {
//           acc[staff._id] = `${staff.fName} ${staff.lName}`
//           return acc
//         }, {})

//         const formattedAppointments = appointmentsResponse.data.map(
//           appointment => ({
//             id: appointment._id,
//             date: new Date(appointment.date).toISOString().split('T')[0],
//             time: appointment.time,
//             status: appointment.status,
//             customer: appointment.customer
//               .flat()
//               .map(id => customerInfoMap[id] || 'Unknown')
//               .join(', '),
//             services: appointment.services
//               .flat()
//               .map(id => serviceInfoMap[id] || 'Unknown')
//               .join(', '),
//             // Thêm staff từ appointment
//             staff: appointment.staff 
//               ? staffInfoMap[appointment.staff] || 'Unassigned'
//               : 'Unassigned'
//           })
//         )

//         setAppointments(formattedAppointments)
//         setStaff(staffData)
//       } catch (error) {
//         setError('Error fetching data.')
//         console.error('Error fetching data:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAppointmentsAndStaff()
//   }, [])

//   const handlePrevMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     )
//   }

//   const handleNextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     )
//   }

//   const generateCalendarDays = () => {
//     const year = currentDate.getFullYear()
//     const month = currentDate.getMonth()
//     const firstDay = new Date(year, month, 1)
//     const lastDay = new Date(year, month + 1, 0)
//     const firstDayOfWeek = firstDay.getDay()
//     const daysInMonth = lastDay.getDate()

//     const days = Array(firstDayOfWeek).fill(null)
//     for (let day = 1; day <= daysInMonth; day++) {
//       const dateString = new Date(year, month, day).toISOString().split('T')[0]
//       const dayEvents = appointments.filter(event => event.date === dateString)
//       days.push({ day, dateString, events: dayEvents })
//     }
//     return days
//   }

//   if (loading) return <CircularProgress />
//   if (error) return <Typography color='error'>{error}</Typography>

//   const calendarDays = generateCalendarDays()
//   const monthYearString = currentDate.toLocaleString('default', {
//     month: 'long',
//     year: 'numeric'
//   })

//   return (
//     <Box>
//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 2
//           }}
//         >
//           <IconButton onClick={handlePrevMonth}>
//             <ChevronLeftIcon />
//           </IconButton>
//           <Typography variant='h5'>{monthYearString}</Typography>
//           <IconButton onClick={handleNextMonth}>
//             <ChevronRightIcon />
//           </IconButton>
//         </Box>
//         <Grid container spacing={1}>
//           {calendarDays.map((day, index) => (
//             <Grid
//               item
//               key={index}
//               xs={1.7}
//               sx={{ border: '1px solid #ddd', p: 1, minHeight: 100 }}
//             >
//               {day && (
//                 <>
//                   <Typography variant='body2'>{day.day}</Typography>
//                   {day.events.map(event => (
//                     <Paper
//                       key={event.id}
//                       sx={{ p: 1, mt: 1, backgroundColor: '#f5f5f5' }}
//                     >
//                       <Typography variant='caption'>{event.time}</Typography>
//                       <Typography variant='body2'>
//                         Customer: {event.customer}
//                       </Typography>
//                       <Typography variant='body2'>
//                         Services: {event.services}
//                       </Typography>
//                       <Typography variant='body2'>
//                         Staff: {event.staff}
//                       </Typography>
//                     </Paper>
//                   ))}
//                 </>
//               )}
//             </Grid>
//           ))}
//         </Grid>
//       </Paper>
//     </Box>
//   )
// }
import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import axios from 'axios';

const statusColors = {
  0: '#ffeb3b', // Pending - Vàng
  1: '#4caf50', // Accepted - Xanh lá
  2: '#f44336', // Canceled - Đỏ
  3: '#2196f3'  // Finished - Xanh dương
};

const statusLabels = ['Pending', 'Accepted', 'Canceled', 'Finished'];

export default function AdminCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentsAndStaff = async () => {
      try {
        const token = sessionStorage.getItem('token');

        const [appointmentsResponse, staffResponse] = await Promise.all([
          axios.get('https://mcmapp.online/api/appointments', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://mcmapp.online/api/account?role=1', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const bookingsData = appointmentsResponse.data;
        const customerIds = [
          ...new Set(
            bookingsData.flatMap(appt =>
              appt.customer.flatMap(customer => customer.flat())
            )
          )
        ];
        const serviceIds = [
          ...new Set(
            bookingsData.flatMap(appt =>
              appt.services.flatMap(service => service.flat())
            )
          )
        ];

        const [customersResponse, servicesResponse] = await Promise.all([
          axios.get('https://mcmapp.online/api/account', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: customerIds.join(',') }
          }),
          axios.get('https://mcmapp.online/api/service', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: serviceIds.join(',') }
          })
        ]);

        const customers = Array.isArray(customersResponse.data.data)
          ? customersResponse.data.data
          : [];
        const services = Array.isArray(servicesResponse.data.data)
          ? servicesResponse.data.data
          : [];
        const staffData = Array.isArray(staffResponse.data.data)
          ? staffResponse.data.data
          : [];

        const customerInfoMap = customers.reduce((acc, cust) => {
          acc[cust._id] = `${cust.fName} ${cust.lName}`;
          return acc;
        }, {});

        const serviceInfoMap = services.reduce((acc, service) => {
          acc[service.id] = service.name;
          return acc;
        }, {});

        const staffInfoMap = staffData.reduce((acc, staff) => {
          acc[staff._id] = `${staff.fName} ${staff.lName}`;
          return acc;
        }, {});

        const formattedAppointments = appointmentsResponse.data.map(
          appointment => ({
            id: appointment._id,
            date: new Date(appointment.date).toISOString().split('T')[0],
            time: appointment.time,
            status: appointment.status,
            customer: appointment.customer
              .flat()
              .map(id => customerInfoMap[id] || 'Unknown')
              .join(', '),
            services: appointment.services
              .flat()
              .map(id => serviceInfoMap[id] || 'Unknown')
              .join(', '),
            staff: appointment.staff
              ? staffInfoMap[appointment.staff] || 'Unassigned'
              : 'Unassigned',
            color: statusColors[appointment.status] || '#f5f5f5'
          })
        );

        setAppointments(formattedAppointments);
        setStaff(staffData);
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsAndStaff();
  }, []);

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

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = Array(firstDayOfWeek).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = new Date(year, month, day).toISOString().split('T')[0];
      const dayEvents = appointments.filter(event => event.date === dateString);
      days.push({ day, dateString, events: dayEvents });
    }
    return days;
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color='error'>{error}</Typography>;

  const calendarDays = generateCalendarDays();
  const monthYearString = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

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
        {/* Bảng Legend */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle1' sx={{ mb: 1 }}>
            Status Legend:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {statusLabels.map((label, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: statusColors[index],
                    mr: 1,
                    border: '1px solid #ddd'
                  }}
                />
                <Typography variant='body2'>{label}</Typography>
              </Box>
            ))}
          </Box>
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
                      sx={{ p: 1, mt: 1, backgroundColor: event.color }}
                    >
                      <Typography variant='caption'>
                        {event.time}
                      </Typography>
                      <Typography variant='body2'>
                        Customer: {event.customer}
                      </Typography>
                      <Typography variant='body2'>
                        Services: {event.services}
                      </Typography>
                      <Typography variant='body2'>
                        Staff: {event.staff}
                      </Typography>
                      {/* <Typography variant='body2' sx={{ backgroundColor: event.color }}> */}
                      <Typography variant='body2'>
                        Status: {statusLabels[event.status] || 'Unknown'}
                      </Typography>
                    </Paper>
                  ))}
                </>
              )}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}