// import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
  Card,
  CardContent
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import QrCodeIcon from '@mui/icons-material/QrCode2'

const Payment = () => {
  const location = useLocation() // Lấy dữ liệu từ state
  const {
    //  formData, 
    selectedService } = location.state || {}

  // Tính số tiền cần trả trước (15% giá dịch vụ)
  const depositAmount = selectedService
    ? (selectedService.price * 0.15).toLocaleString()
    : '0'
  return (
    <>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          height: '300px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
          Thanh toán
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
          <Typography color='white'>Thanh toán</Typography>
        </Breadcrumbs>
      </Box>

      {/* Payment Content */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Grid container justifyContent='center' spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <Typography
                variant='h4'
                component='h2'
                sx={{
                  mb: 4,
                  color: '#333',
                  fontWeight: 'bold'
                }}
              >
                Đặt cọc
              </Typography>

              <Typography
                variant='h5'
                sx={{
                  mb: 4,
                  color: '#f8a488',
                  fontWeight: 'medium'
                }}
              >
                {selectedService
                  ? `Vui lòng trả trước 15% cho dịch vụ "${selectedService.name}"`
                  : 'Vui lòng trả trước 15% cho dịch vụ'}
              </Typography>
              <Typography
                variant='h6'
                sx={{
                  mb: 4,
                  color: '#333'
                }}
              >
                Số tiền cần trả trước: {depositAmount} VND
              </Typography>
              {/* QR Code Placeholder */}
              <Box
                sx={{
                  width: '300px',
                  height: '300px',
                  margin: '0 auto',
                  border: '2px dashed #f8a488',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  mb: 4
                }}
              >
                <QrCodeIcon
                  sx={{
                    fontSize: 100,
                    color: '#f8a488',
                    mb: 2
                  }}
                />
                <Typography
                  variant='body1'
                  sx={{
                    color: '#666'
                  }}
                >
                  Quét mã QR để thanh toán
                </Typography>
              </Box>

              <Card
                sx={{
                  backgroundColor: '#f8f8f8',
                  mb: 3
                }}
              >
                <CardContent>
                  <Typography
                    variant='body1'
                    sx={{
                      color: '#666',
                      mb: 1
                    }}
                  >
                    Thông tin chuyển khoản:
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: '#333',
                      fontWeight: 'medium'
                    }}
                  >
                    Ngân hàng: BIDV
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: '#333',
                      fontWeight: 'medium'
                    }}
                  >
                    Số tài khoản: 1234567890
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: '#333',
                      fontWeight: 'medium'
                    }}
                  >
                    Chủ tài khoản: LUXURY SPA
                  </Typography>
                </CardContent>
              </Card>

              <Typography
                variant='body2'
                sx={{
                  color: '#666',
                  fontStyle: 'italic'
                }}
              >
                Sau khi thanh toán, chúng tôi sẽ gửi xác nhận qua email của bạn
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Payment
