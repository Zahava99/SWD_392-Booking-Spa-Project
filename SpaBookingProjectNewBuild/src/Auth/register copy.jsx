import {
  // React,
  useState
} from 'react'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  IconButton,
  InputAdornment,
  Avatar
  //   FormHelperText
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import axios from 'axios'
import { format} from 'date-fns'
const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    fName: '',
    lName: '',
    dob: null,
    avt: ''
  })
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleDateChange = date => {
    setFormData(prevState => ({
      ...prevState,
      dob: date
    }))
  }

  const handleAvatarChange = e => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        avt: file
      }))
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải có 10 chữ số'
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
    }

    // Name validation
    if (!formData.fName.trim()) {
      newErrors.fName = 'Vui lòng nhập họ'
    }
    if (!formData.lName.trim()) {
      newErrors.lName = 'Vui lòng nhập tên'
    }

    // Date of birth validation
    if (!formData.dob) {
      newErrors.dob = 'Vui lòng chọn ngày sinh'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (validateForm()) {
      console.log('Form Data:', formData)
      try {
        const formDataToSend = new FormData()
        formDataToSend.append('email', formData.email)
        formDataToSend.append('phone', formData.phone)
        formDataToSend.append('password', formData.password)
        formDataToSend.append('fName', formData.fName)
        formDataToSend.append('lName', formData.lName)
        // formDataToSend.append(
        //   'dob',
        //   formData.dob ? formData.dob.toISOString() : ''
        // )
        if (formData.dob) {
            // Chuyển đổi ngày sinh thành định dạng YYYY/MM/DD
            const formattedDOB = format(formData.dob, 'yyyy-MM-dd')
            formDataToSend.append('dob', formattedDOB)
          }
        if (formData.avt) {
          formDataToSend.append('avt', formData.avt)
        }
        console.log('Form data to send:', formDataToSend);
        const response = await axios.post(
          'http://localhost:3000/api/auth/register',
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        console.log('Registration successful:', response.data)
        alert(
          'Registration successful. Please check your email for verification.'
        )
        navigate('/login')
      } catch (error) {
        console.error('Registration failed:', error)
        if (error.response) {
            console.error('Response error:', error.response.data);
            // console.error('Response status:', error.response.status);
            // console.error('Response headers:', error.response.headers);
          } else {
            console.error('Error', error.message);
          }
        alert('Registration failed. Please try again.')
      }
    }
  }

  return (
    <>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          height: '300px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
          Đăng ký
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
            Trang chủ
          </MuiLink>
          <Typography color='white'>Đăng ký</Typography>
        </Breadcrumbs>
      </Box>

      {/* Register Form Section */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography
                variant='h4'
                component='h2'
                align='center'
                sx={{
                  mb: 4,
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                Tạo tài khoản mới
              </Typography>

              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* Avatar Upload */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='avatar-upload'
                    type='file'
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor='avatar-upload'>
                    <Avatar
                      src={avatarPreview}
                      sx={{
                        width: 100,
                        height: 100,
                        cursor: 'pointer',
                        mb: 1
                      }}
                    />
                    <Button
                      component='span'
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        color: '#f8a488',
                        '&:hover': {
                          backgroundColor: 'rgba(248, 164, 136, 0.1)'
                        }
                      }}
                    >
                      Tải ảnh đại diện
                    </Button>
                  </label>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id='fName'
                      label='Họ'
                      name='fName'
                      value={formData.fName}
                      onChange={handleChange}
                      error={!!errors.fName}
                      helperText={errors.fName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id='lName'
                      label='Tên'
                      name='lName'
                      value={formData.lName}
                      onChange={handleChange}
                      error={!!errors.lName}
                      helperText={errors.lName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='email'
                      label='Email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='phone'
                      label='Số điện thoại'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label='Ngày sinh'
                        value={formData.dob}
                        onChange={handleDateChange}
                        renderInput={params => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!errors.dob}
                            helperText={errors.dob}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='password'
                      label='Mật khẩu'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowPassword(!showPassword)}
                              edge='end'
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{
                        py: 1.5,
                        backgroundColor: '#f8a488',
                        '&:hover': {
                          backgroundColor: '#f7926e'
                        },
                        textTransform: 'none',
                        fontSize: '1rem'
                      }}
                    >
                      Đăng ký
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant='body2' sx={{ color: '#666' }}>
                    Đã có tài khoản?{' '}
                    <MuiLink
                      component={Link}
                      to='/login'
                      sx={{
                        color: '#f8a488',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Đăng nhập
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Register
