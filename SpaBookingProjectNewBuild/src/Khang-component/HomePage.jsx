// import { useRef, useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   // CardActions,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import StarIcon from "@mui/icons-material/Star";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import "../Khang-component-css/homePage.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useLocation } from 'react-router-dom';
// // Placeholder images
// const heroImage =
//   "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop";
// const service1 =
//   "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop";
// const service2 =
//   "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop";
// const service3 =
//   "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop";
// const service4 =
//   "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop";

// // Array of service images to cycle through
// const serviceImages = [service1, service2, service3, service4];

// const HeroSection = styled(Box)(() => ({
//   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   height: "80vh",
//   display: "flex",
//   alignItems: "center",
//   color: "white",
// }));

// const ServiceCard = styled(Card)(({ theme }) => ({
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "translateY(-10px)",
//     boxShadow: theme.shadows[10],
//   },
// }));

// const TestimonialCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   backgroundColor: "#f8f9fa",
// }));

// const HomePage = () => {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [services, setServices] = useState([]);

//   // Check login status
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       axios
//         .get("https://mcmapp.online/api/auth/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setIsLoggedIn(true);
//         })
//         .catch(() => {
//           setIsLoggedIn(false);
//         });
//     }
//   }, []);
//   const handleBookingClick = () => {
//     if (isLoggedIn) {
//       window.location.href = "/appointment";
//     } else {
//       toast.warning("Bạn cần đăng nhập để đặt lịch hẹn!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         theme: "colored",
//       });
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500); // Chuyển hướng sau 3.5 giây
//     }
//   };

//   // Fetch services from API
//   useEffect(() => {
//     axios
//       .get("https://6670f800e083e62ee4399f31.mockapi.io/API/Test01")
//       .then((response) => {
//         const fetchedServices = response.data.map((service, index) => ({
//           id: service.id,
//           title: service.name,
//           image: serviceImages[index % serviceImages.length],
//           description: service.description,
//           price: service.price,
//         }));
//         setServices(fetchedServices);
//       })
//       .catch((error) => {
//         console.error("Error fetching services:", error);
//       });
//   }, []);

//   const location = useLocation()

//   const updatePaymentStatus = async (paymentData) => {
//     const token = sessionStorage.getItem('token');
//     try {
//       console.log('Gọi API cập nhật với paymentData:', paymentData);
//       const response = await axios.put(
//         `https://mcmapp.online/api/payment/${paymentData.paymentId}`,
//         {
//           status: 1,
//           totalAmount: paymentData.totalAmount,
//           method: paymentData.method
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log('Phản hồi từ API:', response.data);
//       toast.success('Payment status updated to Paid!');
//     } catch (error) {
//       console.error('Lỗi API:', error.response?.data || error.message);
//       toast.error('Error updating payment status: ' + error.message);
//     }
//   };

//   const fetchPaymentByOrderCode = async (orderCode) => {
//     const token = sessionStorage.getItem('token');
//     try {
//       console.log('Tìm payment với orderCode:', orderCode);
//       const response = await axios.get(
//         'https://mcmapp.online/api/payment',
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const payment = response.data.find(p => p.orderCode === orderCode);
//       console.log('Payment tìm được:', payment);
//       return payment
//         ? { paymentId: payment._id, totalAmount: payment.amount, method: payment.method }
//         : null;
//     } catch (error) {
//       console.error('Lỗi khi tìm payment:', error.response?.data || error.message);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const paymentDataFromLocal = JSON.parse(localStorage.getItem('PayNowAnchor'));
//     const queryParams = new URLSearchParams(location.search);
//     const payosStatus = queryParams.get('status');
//     const orderCode = queryParams.get('orderCode');

//     console.log('Current pathname:', location.pathname);
//     console.log('Full URL:', window.location.href);
//     console.log('Payment Data từ localStorage:', paymentDataFromLocal);
//     console.log('PayOS Status:', payosStatus);
//     console.log('Order Code:', orderCode);

//     const handlePaymentUpdate = async () => {
//       let paymentData = paymentDataFromLocal;

//       if (!paymentData?.paymentId && orderCode && payosStatus === 'PAID') {
//         paymentData = await fetchPaymentByOrderCode(orderCode);
//       }

//       if (paymentData?.paymentId && location.pathname === '/' && payosStatus === 'PAID') {
//         console.log('Chuẩn bị cập nhật trạng thái với paymentData:', paymentData);
//         await updatePaymentStatus(paymentData);
//         localStorage.removeItem('PayNowAnchor');
//         console.log('PayNowAnchor sau khi xóa:', localStorage.getItem('PayNowAnchor'));
//       } else {
//         console.log('Không có paymentId hợp lệ hoặc điều kiện không khớp');
//       }
//     };

//     handlePaymentUpdate();
//   }, [location.pathname, location.search]);
//   return (
//     <Box>
//       {/* Hero Section */}
//       <HeroSection>
//         <Container>
//           <Box maxWidth="600px">
//             <Typography
//               variant="h2"
//               component="h1"
//               gutterBottom
//               fontWeight="bold"
//               sx={{ color: "white" }}
//             >
//               Relax & Rejuvenate
//             </Typography>
//             <Typography variant="h5" paragraph>
//               Experience the ultimate relaxation with our premium spa services
//             </Typography>
//             {/* <Button
//               variant='contained'
//               size='large'
//               component={Link}
//               onClick={() => {
//                 if (isLoggedIn) {
//                   window.location.href = '/appointment'
//                 } else {
//                   alert('Bạn cần đăng nhập để đặt lịch hẹn!')
//                   window.location.href = '/login'
//                 }
//               }}
//               sx={{
//                 mt: 2,
//                 backgroundColor: '#4caf50',
//                 '&:hover': { backgroundColor: '#388e3c' },
//                 borderRadius: '25px',
//                 px: 4
//               }}
//             >
//               Book Now
//             </Button> */}
//             <Button
//               variant="contained"
//               size="large"
//               onClick={handleBookingClick}
//               sx={{
//                 mt: 2,
//                 backgroundColor: "#4caf50",
//                 "&:hover": { backgroundColor: "#388e3c" },
//                 borderRadius: "25px",
//                 px: 4,
//               }}
//             >
//               Book Now
//             </Button>
//           </Box>
//           <ToastContainer />
//         </Container>
//       </HeroSection>

//       {/* Services Section */}
//       <Box py={8} bgcolor="white" position="relative">
//         <Container>
//           <Typography
//             variant="h3"
//             component="h2"
//             textAlign="center"
//             mb={6}
//             fontWeight="medium"
//           >
//             Các dịch vụ của chúng tôi
//           </Typography>
//           <Swiper
//             modules={[Navigation, Pagination]}
//             spaceBetween={20}
//             slidesPerView={3}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             onSwiper={(swiper) => {
//               setTimeout(() => {
//                 swiper.params.navigation.prevEl = prevRef.current;
//                 swiper.params.navigation.nextEl = nextRef.current;
//                 swiper.navigation.destroy();
//                 swiper.navigation.init();
//                 swiper.navigation.update();
//               }, 100);
//             }}
//             breakpoints={{
//               600: { slidesPerView: 1 },
//               960: { slidesPerView: 2 },
//               1280: { slidesPerView: 3 },
//             }}
//           >
//             {services.map((service) => (
//               <SwiperSlide key={service.id}>
//                 <ServiceCard>
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={service.image}
//                     alt={service.title}
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h5" component="h3">
//                       {service.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {service.description}
//                     </Typography>
//                     <Typography
//                       variant="body1"
//                       color="text.secondary"
//                       sx={{ mt: 1 }}
//                     >
//                       Giá tiền: {service.price.toLocaleString()} VND
//                     </Typography>
//                   </CardContent>
//                   {/* <CardActions>
//                     <Button size="small" color="primary">
//                       Learn More
//                     </Button>
//                   </CardActions> */}
//                 </ServiceCard>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Custom Prev Button */}
//           <IconButton
//             ref={prevRef}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: 0,
//               transform: "translateY(-50%)",
//               backgroundColor: "rgba(0,0,0,0.5)",
//               color: "white",
//               "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
//               zIndex: 10,
//               marginLeft: "5vw",
//             }}
//           >
//             <ArrowBackIosNewIcon />
//           </IconButton>

//           {/* Custom Next Button */}
//           <IconButton
//             ref={nextRef}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               right: 0,
//               transform: "translateY(-50%)",
//               backgroundColor: "rgba(0,0,0,0.5)",
//               color: "white",
//               "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
//               zIndex: 10,
//               marginRight: "5vw",
//             }}
//           >
//             <ArrowForwardIosIcon />
//           </IconButton>
//         </Container>
//       </Box>

//       {/* About Section */}
//       <Box py={8} bgcolor="#f5f5f5">
//         <Container>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Typography
//                 variant="h3"
//                 component="h2"
//                 gutterBottom
//                 fontWeight="medium"
//               >
//                 Về Spa của chúng tôi
//               </Typography>
//               <Typography variant="body1" paragraph>
//                 Chào mừng bạn đến với khu nghỉ dưỡng spa sang trọng của chúng
//                 tôi, nơi sự yên bình hòa quyện với sự tái tạo năng lượng. Với
//                 hơn 10 năm kinh nghiệm, chúng tôi cung cấp các dịch vụ spa tuyệt
//                 vời được thiết kế để nuôi dưỡng cơ thể, tâm trí và tinh thần của
//                 bạn.
//               </Typography>
//               <Typography variant="body1" paragraph>
//                 Đội ngũ chuyên viên trị liệu được chứng nhận của chúng tôi cam
//                 kết mang đến những liệu trình cá nhân hóa phù hợp với nhu cầu
//                 riêng của bạn. Chúng tôi chỉ sử dụng các sản phẩm hữu cơ cao cấp
//                 để đảm bảo kết quả tốt nhất cho khách hàng.
//               </Typography>
//               <Button
//                 variant="outlined"
//                 size="large"
//                 sx={{
//                   mt: 2,
//                   borderColor: "#4caf50",
//                   color: "#4caf50",
//                   "&:hover": {
//                     borderColor: "#388e3c",
//                     backgroundColor: "rgba(76, 175, 80, 0.04)",
//                   },
//                 }}
//               >
//                 Tìm hiểu thêm
//               </Button>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box
//                 component="img"
//                 src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
//                 alt="Spa interior"
//                 sx={{
//                   width: "100%",
//                   borderRadius: 2,
//                   boxShadow: 3,
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Testimonials */}
//       <Box py={8} bgcolor="white">
//         <Container>
//           <Typography
//             variant="h3"
//             component="h2"
//             textAlign="center"
//             mb={6}
//             fontWeight="medium"
//           >
//             Đánh giá của khách hàng
//           </Typography>
//           <Grid container spacing={4}>
//             {[
//               {
//                 name: "Minh Anh",
//                 comment:
//                   "Liệu pháp mát-xa thật tuyệt vời! Tôi cảm thấy hoàn toàn tươi mới sau buổi trị liệu. Đội ngũ nhân viên chuyên nghiệp và chu đáo với nhu cầu của tôi.",
//                 rating: 5,
//               },
//               {
//                 name: "Thanh Hoa",
//                 comment:
//                   "Tôi đã thử nhiều spa, nhưng spa này nổi bật vì dịch vụ đặc biệt và không khí yên bình. Liệu pháp chăm sóc da mặt giúp da tôi sáng tự nhiên.",
//                 rating: 5,
//               },
//               {
//                 name: "Van Nguyen",
//                 comment:
//                   "Buổi trị liệu bằng hương thơm chính xác là thứ tôi cần sau một tuần căng thẳng. Chuyên gia trị liệu có kiến ​​thức và đã tạo ra một hỗn hợp tùy chỉnh cho tôi.",
//                 rating: 5,
//               },
//             ].map((testimonial, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <TestimonialCard elevation={2}>
//                   <Box display="flex" mb={2}>
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         sx={{
//                           color: i < testimonial.rating ? "#ffc107" : "#e0e0e0",
//                         }}
//                       />
//                     ))}
//                   </Box>
//                   <Typography
//                     variant="body1"
//                     paragraph
//                     sx={{ flexGrow: 1, fontStyle: "italic" }}
//                   >
//                     {testimonial.comment}
//                   </Typography>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {testimonial.name}
//                   </Typography>
//                 </TestimonialCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Call to Action */}
//       <Box py={10} bgcolor="#4caf50" color="white" textAlign="center">
//         <Container>
//           <Typography
//             variant="h3"
//             component="h2"
//             gutterBottom
//             sx={{ color: "white" }}
//           >
//             Ready to Experience Luxury?
//           </Typography>
//           <Typography variant="h6" paragraph>
//             Hãy đặt lịch hẹn ngay hôm nay và bắt đầu hành trình thư giãn và chăm
//             sóc sức khỏe.
//           </Typography>
//           {/* <Button
//             variant="contained"
//             size="large"
//             sx={{
//               mt: 2,
//               backgroundColor: 'white',
//               color: '#4caf50',
//               '&:hover': {
//                 backgroundColor: '#f5f5f5',
//               },
//               borderRadius: '25px',
//               px: 4,
//             }}
//           >
//             Book Now
//           </Button> */}
//           <Button
//             variant="contained"
//             size="large"
//             component={Link}
//             onClick={() => {
//               if (isLoggedIn) {
//                 window.location.href = "/appointment";
//               } else {
//                 alert("Bạn cần đăng nhập để đặt lịch hẹn!");
//                 window.location.href = "/login";
//               }
//             }}
//             sx={{
//               mt: 2,
//               backgroundColor: "white",
//               color: "#4caf50",
//               "&:hover": {
//                 backgroundColor: "#f5f5f5",
//               },
//               borderRadius: "25px",
//               px: 4,
//             }}
//           >
//             Book Now
//           </Button>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../Khang-component-css/homePage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Placeholder images
const heroImage =
  "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop";
const serviceImages = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
];

const HeroSection = styled(Box)(() => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "80vh",
  display: "flex",
  alignItems: "center",
  color: "white",
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f8f9fa",
}));

const PromotionCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  backgroundColor: "#fff3e0",
  borderRadius: "8px",
  boxShadow: theme.shadows[3],
  minWidth: "250px",
}));

const HomePage = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [services, setServices] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const location = useLocation();

  // Check login status
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get("https://mcmapp.online/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setIsLoggedIn(true))
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  // Fetch services from API
  useEffect(() => {
    axios
      .get("https://6670f800e083e62ee4399f31.mockapi.io/API/Test01")
      .then((response) => {
        const fetchedServices = response.data.map((service, index) => ({
          id: service.id,
          title: service.name,
          image: serviceImages[index % serviceImages.length],
          description: service.description,
          price: service.price,
        }));
        setServices(fetchedServices);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  // Fetch promotions from API
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("https://mcmapp.online/api/promotions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const activePromotions = response.data.filter((promo) => promo.status === 0);
        setPromotions(activePromotions);
      })
      .catch((error) => console.error("Error fetching promotions:", error));
  }, []);

  const handleBookingClick = () => {
    if (isLoggedIn) {
      window.location.href = "/appointment";
    } else {
      toast.warning("Bạn cần đăng nhập để đặt lịch hẹn!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
      });
      setTimeout(() => (window.location.href = "/login"), 1500);
    }
  };

  // Payment handling logic
  const updatePaymentStatus = async (paymentData) => {
    const token = sessionStorage.getItem("token");
    try {
      console.log("Gọi API cập nhật với paymentData:", paymentData);
      const response = await axios.put(
        `https://mcmapp.online/api/payment/${paymentData.paymentId}`,
        { status: 1, totalAmount: paymentData.totalAmount, method: paymentData.method },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Phản hồi từ API:", response.data);
      toast.success("Payment status updated to Paid!");
    } catch (error) {
      console.error("Lỗi API:", error.response?.data || error.message);
      toast.error("Error updating payment status: " + error.message);
    }
  };

  const fetchPaymentByOrderCode = async (orderCode) => {
    const token = sessionStorage.getItem("token");
    try {
      console.log("Tìm payment với orderCode:", orderCode);
      const response = await axios.get("https://mcmapp.online/api/payment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payment = response.data.find((p) => p.orderCode === orderCode);
      console.log("Payment tìm được:", payment);
      return payment
        ? { paymentId: payment._id, totalAmount: payment.amount, method: payment.method }
        : null;
    } catch (error) {
      console.error("Lỗi khi tìm payment:", error.response?.data || error.message);
      return null;
    }
  };

  useEffect(() => {
    const paymentDataFromLocal = JSON.parse(localStorage.getItem("PayNowAnchor"));
    const queryParams = new URLSearchParams(location.search);
    const payosStatus = queryParams.get("status");
    const orderCode = queryParams.get("orderCode");

    console.log("Current pathname:", location.pathname);
    console.log("Full URL:", window.location.href);
    console.log("Payment Data từ localStorage:", paymentDataFromLocal);
    console.log("PayOS Status:", payosStatus);
    console.log("Order Code:", orderCode);

    const handlePaymentUpdate = async () => {
      let paymentData = paymentDataFromLocal;
      if (!paymentData?.paymentId && orderCode && payosStatus === "PAID") {
        paymentData = await fetchPaymentByOrderCode(orderCode);
      }

      if (paymentData?.paymentId && location.pathname === "/" && payosStatus === "PAID") {
        console.log("Chuẩn bị cập nhật trạng thái với paymentData:", paymentData);
        await updatePaymentStatus(paymentData);
        localStorage.removeItem("PayNowAnchor");
        console.log("PayNowAnchor sau khi xóa:", localStorage.getItem("PayNowAnchor"));
      } else {
        console.log("Không có paymentId hợp lệ hoặc điều kiện không khớp");
      }
    };

    handlePaymentUpdate();
  }, [location.pathname, location.search]);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Box maxWidth="600px">
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ color: "white" }}>
              Relax & Rejuvenate
            </Typography>
            <Typography variant="h5" paragraph>
              Experience the ultimate relaxation with our premium spa services
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleBookingClick}
              sx={{
                mt: 2,
                backgroundColor: "#4caf50",
                "&:hover": { backgroundColor: "#388e3c" },
                borderRadius: "25px",
                px: 4,
              }}
            >
              Book Now
            </Button>
          </Box>
          <ToastContainer />
        </Container>
      </HeroSection>

      {/* Promotions Slider */}
      <Box py={4} borderBottom={"1px solid #ccc"}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" mb={4} fontWeight="medium">
            Ưu đãi đặc biệt
          </Typography>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              600: { slidesPerView: 1 },
              960: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
          >
            {promotions.map((promo) => {
              let discountText = "";
              if (promo.code.endsWith("-FDA")) {
                discountText = `Giảm ${formatPrice(promo.fixedDiscountAmount)}`;
              } else if (promo.code.endsWith("-DP")) {
                discountText = `Giảm ${promo.discountPercentage}% giá tiền`;
              } else if (promo.code.includes("-DPA-")) {
                const match = promo.code.match(/-DPA-(\d+)$/);
                if (match) {
                  const minAmount = parseInt(match[1], 10) * 1000;
                  discountText = `Giảm ${promo.discountPercentage}% cho đơn từ ${formatPrice(minAmount)}`;
                }
              }

              return (
                <SwiperSlide key={promo._id}>
                  <PromotionCard>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {promo.code}
                    </Typography>
                    <Typography variant="body1">{discountText}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Từ {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                    </Typography>
                  </PromotionCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      </Box>

      {/* Services Section */}
      <Box py={8} bgcolor="white" position="relative">
        <Container>
          <Typography variant="h3" component="h2" textAlign="center" mb={6} fontWeight="medium">
            Các dịch vụ của chúng tôi
          </Typography>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }, 100);
            }}
            breakpoints={{
              600: { slidesPerView: 1 },
              960: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard>
                  <CardMedia component="img" height="200" image={service.image} alt={service.title} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                      Giá tiền: {service.price.toLocaleString()} VND
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </SwiperSlide>
            ))}
          </Swiper>
          <IconButton
            ref={prevRef}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
              zIndex: 10,
              marginLeft: "5vw",
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            ref={nextRef}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
              zIndex: 10,
              marginRight: "5vw",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Container>
      </Box>

      {/* About Section */}
      <Box py={8} bgcolor="#f5f5f5">
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom fontWeight="medium">
                Về Spa của chúng tôi
              </Typography>
              <Typography variant="body1" paragraph>
                Chào mừng bạn đến với khu nghỉ dưỡng spa sang trọng của chúng tôi, nơi sự yên bình hòa quyện với sự tái tạo năng lượng. Với hơn 10 năm kinh nghiệm, chúng tôi cung cấp các dịch vụ spa tuyệt vời được thiết kế để nuôi dưỡng cơ thể, tâm trí và tinh thần của bạn.
              </Typography>
              <Typography variant="body1" paragraph>
                Đội ngũ chuyên viên trị liệu được chứng nhận của chúng tôi cam kết mang đến những liệu trình cá nhân hóa phù hợp với nhu cầu riêng của bạn. Chúng tôi chỉ sử dụng các sản phẩm hữu cơ cao cấp để đảm bảo kết quả tốt nhất cho khách hàng.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                sx={{ mt: 2, borderColor: "#4caf50", color: "#4caf50", "&:hover": { borderColor: "#388e3c", backgroundColor: "rgba(76, 175, 80, 0.04)" } }}
              >
                Tìm hiểu thêm
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                alt="Spa interior"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box py={8} bgcolor="white">
        <Container>
          <Typography variant="h3" component="h2" textAlign="center" mb={6} fontWeight="medium">
            Đánh giá của khách hàng
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: "Minh Anh",
                comment: "Liệu pháp mát-xa thật tuyệt vời! Tôi cảm thấy hoàn toàn tươi mới sau buổi trị liệu. Đội ngũ nhân viên chuyên nghiệp và chu đáo với nhu cầu của tôi.",
                rating: 5,
              },
              {
                name: "Thanh Hoa",
                comment: "Tôi đã thử nhiều spa, nhưng spa này nổi bật vì dịch vụ đặc biệt và không khí yên bình. Liệu pháp chăm sóc da mặt giúp da tôi sáng tự nhiên.",
                rating: 5,
              },
              {
                name: "Van Nguyen",
                comment: "Buổi trị liệu bằng hương thơm chính xác là thứ tôi cần sau một tuần căng thẳng. Chuyên gia trị liệu có kiến thức và đã tạo ra một hỗn hợp tùy chỉnh cho tôi.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard elevation={2}>
                  <Box display="flex" mb={2}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: i < testimonial.rating ? "#ffc107" : "#e0e0e0" }} />
                    ))}
                  </Box>
                  <Typography variant="body1" paragraph sx={{ flexGrow: 1, fontStyle: "italic" }}>
                    {testimonial.comment}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={10} bgcolor="#4caf50" color="white" textAlign="center">
        <Container>
          <Typography variant="h3" component="h2" gutterBottom sx={{ color: "white" }}>
            Ready to Experience Luxury?
          </Typography>
          <Typography variant="h6" paragraph>
            Hãy đặt lịch hẹn ngay hôm nay và bắt đầu hành trình thư giãn và chăm sóc sức khỏe.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleBookingClick}
            sx={{
              mt: 2,
              backgroundColor: "white",
              color: "#4caf50",
              "&:hover": { backgroundColor: "#f5f5f5" },
              borderRadius: "25px",
              px: 4,
            }}
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;