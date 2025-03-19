import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid2,
  MenuItem,
  //   Paper,
  Breadcrumbs,
  Link as MuiLink
  //   IconButton
} from '@mui/material'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import axios from 'axios'
const tomorrow = dayjs().add(1, 'day')
const Appointment = () => {
  //Test
  const [subjects, setSubjects] = useState([])
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  //
  const [selectedDate, setSelectedDate] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    date: null,
    comment: ''
  })
  //
  const navigate = useNavigate()
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token')
        if (!token) {
          console.error('No token found, please log in.')
          return
        }

        // Fetch Subjects (Categories)
        const categoryResponse = await axios.get(
          'http://localhost:3000/api/category',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        if (categoryResponse.data?.data) {
          setSubjects(categoryResponse.data.data)
        }
        console.log('categoryresponse', categoryResponse.data.data)

        // Fetch Services
        const serviceResponse = await axios.get(
          'http://localhost:3000/api/service',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        if (serviceResponse.data?.data) {
          setServices(serviceResponse.data.data)
        }
      } catch (error) {
        console.error(
          'Error fetching data:',
          error.response?.data || error.message
        )
      }
    }

    fetchData()
  }, [])
  //

  const handleChange = e => {

    const { name, value } = e.target
    if (name === 'subject') {
      setFormData(prevState => ({
        ...prevState,
        subject: value,
        service: ''
      }))
      filterServices(value)
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }
  useEffect(() => {
    console.log('Filtered services:', filteredServices)
  }, [filteredServices])
  const filterServices = selectedSubject => {
    const filtered = services.filter(service =>
      service.categories.some(catId => catId == selectedSubject)
    )
    setFilteredServices(filtered)
  }

  const handleDateChange = date => {
    setSelectedDate(date)
    setFormData(prevState => ({
      ...prevState,
      date: date
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(formData)
  
    // Lấy token từ sessionStorage (nếu cần xác thực)
    const token = sessionStorage.getItem('token')
    if (!token) {
      console.error('No token found, please log in.')
      return
    }
    const profileResponse = await axios.get("http://localhost:3000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const customerId = profileResponse.data.data.id;
    console.log("Customer DATA.ID:", profileResponse.data.data.id);
    console.log("Customer ID:", customerId);

    // Tìm dịch vụ đã chọn từ filteredServices (để truyền dữ liệu sang trang Payment)
    const selectedService = filteredServices.find(
      service => service.id === formData.service
    )
  
    const payload = {
      customer: customerId,
      spa: "67cc0adaace5f25ef430927f",
      spaStaff: "67cd40d6a198bf386d304364",
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      total: 0,
      status: 0,
      services: [formData.service] // sử dụng id của service được chọn
    }
  
    try {
      // Gọi API tạo appointment
      const appointmentResponse = await axios.post(
        'http://localhost:3000/api/appointments',
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log('Appointment created:', appointmentResponse.data)
      const appointmentId = appointmentResponse.data._id;
      localStorage.setItem("appointmentId", appointmentId);
      // Sau khi tạo appointment thành công, chuyển hướng sang trang Payment
      navigate('/payment', {
        state: {
          formData,
          selectedService,
          appointment: appointmentResponse.data
        }
      })
    } catch (error) {
      console.error(
        'Error creating appointment:',
        error.response?.data || error.message
      )
    }
  }
  return (
    <>
      <Box
        sx={{
          height: '300px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{
            color: 'white',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
            mb: 2
          }}
        >
          Appointment
        </Typography>
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{
            color: 'white',
            position: 'relative',
            zIndex: 1
          }}
        >
          <MuiLink
            component={Link}
            to='/'
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            Home
          </MuiLink>
          <Typography color='white'>Appointment</Typography>
        </Breadcrumbs>
      </Box>

      {/* Appointment Form Section */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} md={6}>
            <Typography
              variant='h3'
              component='h2'
              sx={{
                mb: 4,
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Treatment Inquiry
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate>
              <Grid2 container spacing={3}>
                <Grid2 item size={{ xs: 6, md: 6 }}>
                  <TextField
                    required
                    fullWidth
                    id='fullName'
                    label='Full Name'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    variant='outlined'
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Your Email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    variant='outlined'
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }}>
                  <TextField
                    required
                    fullWidth
                    id='phone'
                    label='Phone Number'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    variant='outlined'
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Date'
                      value={selectedDate}
                      onChange={handleDateChange}
                      defaultValue={tomorrow}
                      // disableFuture
                      disablePast
                      renderInput={params => (
                        <TextField
                          {...params}
                          fullWidth
                          required
                          variant='outlined'
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid2>
                <Grid2 item size={{ xs: 12, md: 12 }}>
                  {/* <TextField
                    select
                    required
                    fullWidth
                    id='subject'
                    label='Select Subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    variant='outlined'
                  >
                    {subjects.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  <TextField
                    select
                    fullWidth
                    id='subject'
                    label='Select Subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    variant='outlined'
                    required
                  >
                    {subjects.length > 0 ? (
                      subjects.map(subject => (
                        <MenuItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No subjects available</MenuItem>
                    )}
                  </TextField>
                </Grid2>
                <Grid2 item size={{ xs: 12, md: 12 }}>
                  {/* Select Service */}
                  {/* Select Service - Chỉ hiển thị các service thuộc subject đã chọn */}
                  <TextField
                    select
                    fullWidth
                    id='service'
                    label='Select Service'
                    name='service'
                    value={formData.service}
                    onChange={handleChange}
                    variant='outlined'
                    required
                    disabled={!formData.subject}
                  >
                    {filteredServices.length > 0 ? (
                      filteredServices.map(service => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.name} - {service.price.toLocaleString()} VND
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No services available</MenuItem>
                    )}
                  </TextField>
                  {/* <TextField
                    select
                    fullWidth
                    id='service'
                    label='Select Service'
                    name='service'
                    value={formData.service}
                    onChange={handleChange}
                    variant='outlined'
                    required
                  >
                    {services.length > 0 ? (
                      services.map(service => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.name} - {service.price.toLocaleString()} VND
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No services available</MenuItem>
                    )}
                  </TextField> */}
                </Grid2>
                {/* <Grid2 item size={{ xs: 12, md: 12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Date'
                      value={selectedDate}
                      onChange={handleDateChange}
                      renderInput={params => (
                        <TextField
                          {...params}
                          fullWidth
                          required
                          variant='outlined'
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid2> */}
                <Grid2 item size={{ xs: 12, md: 12 }}>
                  <TextField
                    fullWidth
                    id='comment'
                    label='Comment'
                    name='comment'
                    multiline
                    rows={4}
                    value={formData.comment}
                    onChange={handleChange}
                    variant='outlined'
                  />
                </Grid2>
                <Grid2 item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{
                      py: 1.5,
                      px: 4,
                      backgroundColor: '#f8a488',
                      '&:hover': {
                        backgroundColor: '#f7926e'
                      },
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Make Appointment
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          {/* <Grid2
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant='body1' sx={{ mb: 2, color: '#666' }}>
                Motivation is not an accident or something that someone else can
                give you with the power to motivate you.
              </Typography>
              <Button
                variant='contained'
                sx={{
                  py: 1.5,
                  px: 4,
                  backgroundColor: '#f8a488',
                  '&:hover': {
                    backgroundColor: '#f7926e'
                  },
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                (123) 456-7890
              </Button>
            </Box>
          </Grid2> */}
        </Grid2>
      </Container>
    </>
  )
}

export default Appointment
