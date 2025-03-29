// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Header from "./Header & Footer/Header";
// import HomePage from "./Khang-component/HomePage";
// import Appointment from "./Khang-component/Appointment";
// import Footer from "./Header & Footer/Footer";
// import Login from "./Auth/login";
// import Register from "./Auth/register";
// import Payment from "./Auth/Payment";
// import Profile from "./Khang-component/Profile";
// import CancelPayment from "./Khang-component/CancelURL";
// import Message from "./Khang-component/Message";
// import Facial from "./Khang-component/Facial";
// import Bodytreatment from "./Khang-component/Bodytreatment";
// import Aromatherapy from "./Khang-component/aromatherapy";
// import Blog from "./staff/Blog";
// import AdminDashboard from "./admin/AdminDashboard";
// // Create theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#4caf50",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 600,
//     },
//     h2: {
//       fontWeight: 600,
//     },
//     h3: {
//       fontWeight: 500,
//     },
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/appointment" element={<Appointment />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/cancelpayment" element={<CancelPayment />} />
//           <Route path="/massage" element={<Message />} />
//           <Route path="/facial" element={<Facial />} />
//           <Route path="/body-treatment" element={<Bodytreatment />} />
//           <Route path="/aromatherapy" element={<Aromatherapy />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/blog" element={<Blog />} />
//         </Routes>
//         <Footer />
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header & Footer/Header';
import HomePage from './Khang-component/HomePage';
import Appointment from './Khang-component/Appointment';
import Footer from './Header & Footer/Footer';
import Login from './Auth/login';
import Register from './Auth/register';
import Payment from './Auth/Payment';
import Profile from './Khang-component/Profile';
import CancelPayment from './Khang-component/CancelURL';
import Message from './Khang-component/Message';
import Facial from './Khang-component/Facial';
import Bodytreatment from './Khang-component/Bodytreatment';
import Aromatherapy from './Khang-component/aromatherapy';
import Blog from './staff/Blog';
import AdminDashboard from './admin/AdminDashboard';
import Store from './Khang-component/Store';
import StaffDashboard from './Khang-component/staffStoreProductManager';
import axios from 'axios';
// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
  },
});

function AppContent({ cart, setCart, handleAddToCart }) {
  const location = useLocation();

  // Hàm cập nhật stock sau khi thanh toán thành công
  const updateStock = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const cartBeforeCheckout = JSON.parse(localStorage.getItem('cartBeforeCheckout') || '[]');
    if (cartBeforeCheckout.length === 0) return;

    try {
      // Cập nhật stock cho từng sản phẩm
      for (const item of cartBeforeCheckout) {
        const productId = item.id;
        const quantityPurchased = item.quantity;

        // Lấy thông tin sản phẩm hiện tại từ API
        const response = await axios.get(
          `https://mcmapp.online/api/products/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const currentProduct = response.data;

        // Tính stock mới
        const newStock = currentProduct.stock - quantityPurchased;
        if (newStock < 0) {
          console.warn(`Stock for product ${productId} would be negative. Skipping update.`);
          continue; // Bỏ qua nếu stock không đủ
        }

        // Gửi yêu cầu cập nhật stock
        await axios.put(
          `https://mcmapp.online/api/products/${productId}`,
          { stock: newStock },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(`Stock updated for product ${productId}: ${newStock}`);
      }

      console.log('All stock updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error.response?.data || error.message);
    }
  };

  // Kiểm tra URL path để xác định trạng thái thanh toán
  useEffect(() => {
    if (location.pathname === '/cancelpayment') {
      const savedCart = localStorage.getItem('cartBeforeCheckout');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      localStorage.setItem('paymentCancelled', 'true');
    } else if (location.pathname === '/') {
      const paymentCancelled = localStorage.getItem('paymentCancelled');
      if (paymentCancelled === 'true') {
        localStorage.removeItem('paymentCancelled');
      } else {
        // Thanh toán thành công: Cập nhật stock và xóa giỏ hàng
        updateStock();
        setCart([]);
        localStorage.removeItem('cartBeforeCheckout');
      }
    }
  }, [location.pathname, setCart]);

  return (
    <>
      <Header cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cancelpayment" element={<CancelPayment />} />
        <Route path="/massage" element={<Message />} />
        <Route path="/facial" element={<Facial />} />
        <Route path="/body-treatment" element={<Bodytreatment />} />
        <Route path="/aromatherapy" element={<Aromatherapy />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/store"
          element={
            <Store cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Đồng bộ cart với localStorage mỗi khi cart thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = product => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent
          cart={cart}
          setCart={setCart}
          handleAddToCart={handleAddToCart}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;