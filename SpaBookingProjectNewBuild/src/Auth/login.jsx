import { useState } from 'react'
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
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [
    // error
    , setError] = useState('');
  const handleChange = e => {
    const { name, value, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'rememberMe' ? checked : value
    }))
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    console.log(formData)
    // Here you would typically authenticate the user
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          email: formData.email,
          password: formData.password
        }
      )
      console.log('LoL',response.data)
      if (response.data.data.accessToken) {
        sessionStorage.setItem('token', response.data.data.accessToken)
        navigate('/')
      }else {
        toast.error(response.data.message || 'Login failed',{autoClose: 2000});
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      // Handle login error
      console.error(error)
      setError( error.response.data.message || 'Server Error');
      if(error.response){
        const {status, data} = error.response;
        if (status === 401) {
          toast.error(data.message || 'Login failed',{autoClose: 2000});
        }else {
          toast.error(data.message || 'Server Error',{autoClose: 2000});
        }
        setError(data.message || 'Server Error888');
      }else{
        toast.error(error.message || 'Server Error',{autoClose: 2000});
        setError(error.message || 'Server Error');
      }
    }
    
    // alert('Login successful!');
    // navigate('/');
  }

  return (
    <>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          height: '300px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
          Đăng nhập
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
          <Typography color='white'>Đăng nhập</Typography>
        </Breadcrumbs>
      </Box>

      {/* Login Form Section */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={6}>
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
                Đăng nhập tài khoản
              </Typography>
              <Box component='form' onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
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
                      variant='outlined'
                    />
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
                      variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
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
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='rememberMe'
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          sx={{
                            color: '#f8a488',
                            '&.Mui-checked': {
                              color: '#f8a488'
                            }
                          }}
                        />
                      }
                      label='Ghi nhớ đăng nhập'
                    />
                    <MuiLink
                      component={Link}
                      to='/forgot-password'
                      sx={{
                        color: '#f8a488',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Quên mật khẩu?
                    </MuiLink>
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
                      Đăng nhập
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 3, mb: 3 }}>
                <Divider>
                  <Typography variant='body2' sx={{ color: '#666', px: 1 }}>
                    Hoặc đăng nhập với
                  </Typography>
                </Divider>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant='outlined'
                    startIcon={<FacebookIcon />}
                    sx={{
                      py: 1,
                      borderColor: '#3b5998',
                      color: '#3b5998',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 89, 152, 0.1)',
                        borderColor: '#3b5998'
                      },
                      textTransform: 'none'
                    }}
                  >
                    Facebook
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant='outlined'
                    startIcon={<GoogleIcon />}
                    sx={{
                      py: 1,
                      borderColor: '#db4437',
                      color: '#db4437',
                      '&:hover': {
                        backgroundColor: 'rgba(219, 68, 55, 0.1)',
                        borderColor: '#db4437'
                      },
                      textTransform: 'none'
                    }}
                  >
                    Google
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant='body2' sx={{ color: '#666' }}>
                  Chưa có tài khoản?{' '}
                  <MuiLink
                    component={Link}
                    to='/register'
                    sx={{
                      color: '#f8a488',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Đăng ký ngay
                  </MuiLink>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <ToastContainer position="top-right" />
    </>
  )
}

export default Login
