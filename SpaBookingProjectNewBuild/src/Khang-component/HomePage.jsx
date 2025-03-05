import { useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Paper,
  IconButton
} from '@mui/material'
import { styled } from '@mui/material/styles'
import StarIcon from '@mui/icons-material/Star'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import '../Khang-component-css/homePage.css'
// Placeholder images - replace with actual images in your project
const heroImage =
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop'
const service1 =
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
const service2 =
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop'
const service3 =
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop'
const service4 =
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop'

const HeroSection = styled(Box)(() => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  color: 'white'
}))

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10]
  }
}))

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f8f9fa'
}))

const HomePage = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  // Danh sách dịch vụ
  const services = [
    {
      title: 'Massage Therapy',
      image: service1,
      description:
        'Relieve tension and promote relaxation with our therapeutic massage treatments.'
    },
    {
      title: 'Facial Treatments',
      image: service2,
      description:
        'Rejuvenate your skin with our customized facial treatments for all skin types.'
    },
    {
      title: 'Body Treatments',
      image: service3,
      description:
        'Pamper your body with our luxurious scrubs, wraps, and therapeutic treatments.'
    },
    {
      title: 'Aromatherapy',
      image: service4,
      description:
        'Experience the healing power of essential oils with our aromatherapy services.'
    }
  ]
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Box maxWidth='600px'>
            <Typography
              variant='h2'
              component='h1'
              gutterBottom
              fontWeight='bold'
            >
              Relax & Rejuvenate
            </Typography>
            <Typography variant='h5' paragraph>
              Experience the ultimate relaxation with our premium spa services
            </Typography>
            <Button
              variant='contained'
              size='large'
              component={Link}
              to='/appointment'
              sx={{
                mt: 2,
                backgroundColor: '#4caf50',
                '&:hover': { backgroundColor: '#388e3c' },
                borderRadius: '25px',
                px: 4
              }}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Services Section */}
      <Box py={8} bgcolor='white' position='relative'>
        <Container>
          <Typography
            variant='h3'
            component='h2'
            textAlign='center'
            mb={6}
            fontWeight='medium'
          >
            Our Services
          </Typography>
          {/*           
          <Grid container spacing={4}>
            {[
              { title: 'Massage Therapy', image: service1, description: 'Relieve tension and promote relaxation with our therapeutic massage treatments.' },
              { title: 'Facial Treatments', image: service2, description: 'Rejuvenate your skin with our customized facial treatments for all skin types.' },
              { title: 'Body Treatments', image: service3, description: 'Pamper your body with our luxurious scrubs, wraps, and therapeutic treatments.' },
              { title: 'Aromatherapy', image: service4, description: 'Experience the healing power of essential oils with our aromatherapy services.' }
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ServiceCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">Learn More</Button>
                  </CardActions>
                </ServiceCard>
              </Grid>
            ))}
          </Grid> */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            // Gán ref cho navigation trong onBeforeInit
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }, 100); // Đợi 100ms để ref được gán
            }}
            breakpoints={{
              600: { slidesPerView: 1 },
              960: { slidesPerView: 2 },
              1280: { slidesPerView: 3 }
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <ServiceCard>
                  <CardMedia
                    component='img'
                    height='200'
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h3'>
                      {service.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size='small' color='primary'>
                      Learn More
                    </Button>
                  </CardActions>
                </ServiceCard>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Prev Button */}
          <IconButton
            ref={prevRef}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
              zIndex: 10,
              marginLeft: '5vw'
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Custom Next Button */}
          <IconButton
            ref={nextRef}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
              zIndex: 10,
              marginRight: '5vw'
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Container>
      </Box>

      {/* About Section */}
      <Box py={8} bgcolor='#f5f5f5'>
        <Container>
          <Grid container spacing={6} alignItems='center'>
            <Grid item xs={12} md={6}>
              <Typography
                variant='h3'
                component='h2'
                gutterBottom
                fontWeight='medium'
              >
                About Our Spa
              </Typography>
              <Typography variant='body1' paragraph>
                Welcome to our luxury spa retreat, where tranquility meets
                rejuvenation. With over 10 years of experience, we provide
                exceptional spa services designed to nurture your body, mind,
                and spirit.
              </Typography>
              <Typography variant='body1' paragraph>
                Our team of certified therapists is dedicated to providing
                personalized treatments that cater to your unique needs. We use
                only premium, organic products to ensure the best results for
                our clients.
              </Typography>
              <Button
                variant='outlined'
                size='large'
                sx={{
                  mt: 2,
                  borderColor: '#4caf50',
                  color: '#4caf50',
                  '&:hover': {
                    borderColor: '#388e3c',
                    backgroundColor: 'rgba(76, 175, 80, 0.04)'
                  }
                }}
              >
                Learn More About Us
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component='img'
                src='https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop'
                alt='Spa interior'
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box py={8} bgcolor='white'>
        <Container>
          <Typography
            variant='h3'
            component='h2'
            textAlign='center'
            mb={6}
            fontWeight='medium'
          >
            What Our Clients Say
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                name: 'Minh Anh',
                comment:
                  'The massage therapy was incredible! I felt completely renewed after my session. The staff was professional and attentive to my needs.',
                rating: 5
              },
              {
                name: 'Thanh Hoa',
                comment:
                  "I've tried many spas, but this one stands out for its exceptional service and peaceful atmosphere. The facial treatment gave my skin a natural glow.",
                rating: 5
              },
              {
                name: 'Van Nguyen',
                comment:
                  'The aromatherapy session was exactly what I needed after a stressful week. The therapist was knowledgeable and created a custom blend for me.',
                rating: 4
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard elevation={2}>
                  <Box display='flex' mb={2}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{
                          color: i < testimonial.rating ? '#ffc107' : '#e0e0e0'
                        }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant='body1'
                    paragraph
                    sx={{ flexGrow: 1, fontStyle: 'italic' }}
                  >
                    {testimonial.comment}
                  </Typography>
                  <Typography variant='subtitle1' fontWeight='bold'>
                    {testimonial.name}
                  </Typography>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={10} bgcolor='#4caf50' color='white' textAlign='center'>
        <Container>
          <Typography variant='h3' component='h2' gutterBottom>
            Ready to Experience Luxury?
          </Typography>
          <Typography variant='h6' paragraph>
            Book your appointment today and start your journey to relaxation and
            wellness.
          </Typography>
          <Button
            variant='contained'
            size='large'
            sx={{
              mt: 2,
              backgroundColor: 'white',
              color: '#4caf50',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              },
              borderRadius: '25px',
              px: 4
            }}
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage
