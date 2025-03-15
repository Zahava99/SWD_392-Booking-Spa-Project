import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpaIcon from '@mui/icons-material/Spa';

const Message = () => {

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch('https://66931ef7c6be000fa079c642.mockapi.io/KhangLPSE161421/Test')
      .then(response => response.json())
      .then(data => {
        setServices(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setIsLoading(false);
      });
  }, []); 


  const benefits = [
    'Giảm căng thẳng và stress',
    'Cải thiện tuần hoàn máu',
    'Giảm đau nhức cơ bắp',
    'Tăng cường sức khỏe tinh thần',
    'Cải thiện chất lượng giấc ngủ',
    'Tăng cường hệ miễn dịch'
  ];

  return (
    <>

      <Box
        sx={{
          height: '300px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
            mb: 2
          }}
        >
          Danh mục Massage
        </Typography>
        <Breadcrumbs 
          aria-label="breadcrumb" 
          sx={{ 
            color: 'white',
            position: 'relative',
            zIndex: 1
          }}
        >
          <MuiLink
            component={Link}
            to="/"
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
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Trang chủ
          </MuiLink>
          <Typography color="white">Dịch vụ</Typography>
        </Breadcrumbs>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                mb: 4,
                color: '#333',
                fontWeight: 'bold'
              }}
            >
              Chào mừng đến với Luxury Spa
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                color: '#666',
                lineHeight: 1.8
              }}
            >
              Chúng tôi tự hào mang đến cho bạn trải nghiệm spa cao cấp với đội ngũ massage therapist chuyên nghiệp và không gian thư giãn sang trọng. Mỗi liệu trình được thiết kế riêng để đáp ứng nhu cầu của từng khách hàng.
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  color: '#333',
                  fontWeight: 'bold'
                }}
              >
                Lợi ích khi sử dụng dịch vụ:
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#f8a488' }} />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                height: '100%',
                minHeight: 400,
                backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2
              }}
            />
          </Grid>
        </Grid>

        {/* Services Section - Updated to use API data */}
        <Box sx={{ mt: 8 }}>
          <Typography 
            variant="h4" 
            component="h3" 
            sx={{ 
              mb: 4,
              color: '#333',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Các Dịch Vụ Của Chúng Tôi
          </Typography>
          {isLoading ? (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
              Đang tải dịch vụ...
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {services.map((service) => (
                <Grid item xs={12} md={4} key={service.id}>
                  <Card 
                    elevation={3}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={service.img}
                      alt={service.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3"
                        sx={{ 
                          color: '#333',
                          fontWeight: 'bold'
                        }}
                      >
                        {service.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {service.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          <SpaIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle', color: '#f8a488' }} />
                          {service.duration || 'N/A'} {/* Fallback if duration is missing */}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: '#f8a488',
                            fontWeight: 'bold'
                          }}
                        >
                          {service.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Message;