import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import logo from "../assets/logo-image/logo.jpg";

const Footer = () => {
  return (
    //bgcolor: '#f5f5f5'
    <Box sx={{ bgcolor: 'white', pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Us Column */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img src={logo} alt="Spa Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                LUXURY SPA
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Chúng tôi cung cấp các dịch vụ spa cao cấp giúp bạn thư giãn, làm đẹp và cải thiện sức khỏe. Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                sx={{ 
                  bgcolor: '#f8a488', 
                  color: 'white',
                  '&:hover': { bgcolor: '#f7926e' }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: '#f8a488', 
                  color: 'white',
                  '&:hover': { bgcolor: '#f7926e' }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: '#f8a488', 
                  color: 'white',
                  '&:hover': { bgcolor: '#f7926e' }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: '#f8a488', 
                  color: 'white',
                  '&:hover': { bgcolor: '#f7926e' }
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
              Liên kết nhanh
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                component={RouterLink} 
                to="/" 
                sx={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  '&:hover': { color: '#f8a488' }
                }}
              >
                Trang chủ
              </Link>
              <Link 
                component={RouterLink} 
                to="/about" 
                sx={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  '&:hover': { color: '#f8a488' }
                }}
              >
                Về chúng tôi
              </Link>
              {/* <Link 
                component={RouterLink} 
                to="/services" 
                sx={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  '&:hover': { color: '#f8a488' }
                }}
              >
                Dịch vụ
              </Link> */}
              <Link 
                component={RouterLink} 
                to="/blog" 
                sx={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  '&:hover': { color: '#f8a488' }
                }}
              >
                Blog
              </Link>
              <Link 
                component={RouterLink} 
                to="/contact" 
                sx={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  '&:hover': { color: '#f8a488' }
                }}
              >
                Liên hệ
              </Link>
              <Link 
                component={RouterLink} 
                to="/appointment" 
                sx={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  '&:hover': { color: '#f8a488' }
                }}
              >
                Đặt lịch
              </Link>
            </Box>
          </Grid>

          {/* Contact Info Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
              Thông tin liên hệ
            </Typography>
            <List disablePadding>
              <ListItem disableGutters sx={{ pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <LocationOnIcon sx={{ color: '#f8a488' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="123 Đường Nguyễn Huệ, Quận 1, TP.HCM" 
                  primaryTypographyProps={{ variant: 'body2', color: '#666' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <PhoneIcon sx={{ color: '#f8a488' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="(123) 456-7890" 
                  primaryTypographyProps={{ variant: 'body2', color: '#666' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <EmailIcon sx={{ color: '#f8a488' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="info@luxuryspa.com" 
                  primaryTypographyProps={{ variant: 'body2', color: '#666' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <AccessTimeIcon sx={{ color: '#f8a488' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Thứ 2 - Thứ 7: 9:00 - 21:00" 
                  primaryTypographyProps={{ variant: 'body2', color: '#666' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Newsletter Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
              Đăng ký nhận tin
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Đăng ký để nhận thông tin về các ưu đãi và dịch vụ mới nhất của chúng tôi.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                placeholder="Email của bạn"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#f8a488',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f8a488',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#f8a488',
                  '&:hover': { bgcolor: '#f7926e' },
                  textTransform: 'none',
                  fontWeight: 'medium'
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            © {new Date().getFullYear()} Luxury Spa. Tất cả quyền được bảo lưu.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link 
              component={RouterLink} 
              to="/terms" 
              sx={{ 
                color: '#666', 
                textDecoration: 'none',
                '&:hover': { color: '#f8a488' },
                fontSize: '0.875rem'
              }}
            >
              Điều khoản dịch vụ
            </Link>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              sx={{ 
                color: '#666', 
                textDecoration: 'none',
                '&:hover': { color: '#f8a488' },
                fontSize: '0.875rem'
              }}
            >
              Chính sách bảo mật
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;