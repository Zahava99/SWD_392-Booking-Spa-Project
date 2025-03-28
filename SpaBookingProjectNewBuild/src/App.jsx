// // import { useState, useEffect } from 'react'
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// // import { ThemeProvider, createTheme } from '@mui/material/styles'
// // import CssBaseline from '@mui/material/CssBaseline'
// // import Header from './Header & Footer/Header'
// // import HomePage from './Khang-component/HomePage'
// // import Appointment from './Khang-component/Appointment'
// // import Footer from './Header & Footer/Footer'
// // import Login from './Auth/login'
// // import Register from './Auth/register'
// // import Payment from './Auth/Payment'
// // import Profile from './Khang-component/Profile'
// // import CancelPayment from './Khang-component/CancelURL'
// // import Message from './Khang-component/Message'
// // import Facial from './Khang-component/Facial'
// // import Bodytreatment from './Khang-component/Bodytreatment'
// // import Aromatherapy from './Khang-component/aromatherapy'
// // import Blog from './staff/Blog'
// // import AdminDashboard from './admin/AdminDashboard'
// // import Store from './Khang-component/Store'
// // import StaffDashboard from './Khang-component/staffStoreProductManager'
// // // Create theme
// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#4caf50'
// //     },
// //     secondary: {
// //       main: '#f50057'
// //     }
// //   },
// //   typography: {
// //     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
// //     h1: {
// //       fontWeight: 600
// //     },
// //     h2: {
// //       fontWeight: 600
// //     },
// //     h3: {
// //       fontWeight: 500
// //     }
// //   }
// // })

// // function App () {
// //   // const [cart, setCart] = useState([])
// //   const [cart, setCart] = useState(() => {
// //     // Khởi tạo cart từ localStorage khi ứng dụng bắt đầu
// //     const savedCart = localStorage.getItem('cart')
// //     return savedCart ? JSON.parse(savedCart) : []
// //   })


// //   useEffect(() => {
// //     const params = new URLSearchParams(location.search)
// //     const paymentStatus = params.get('status')
// //     if (paymentStatus === 'cancel') {
// //       const savedCart = localStorage.getItem('cartBeforeCheckout')
// //       if (savedCart) {
// //         setCart(JSON.parse(savedCart))
// //       }
// //     } else if (paymentStatus === 'success') {
// //       setCart([])
// //       localStorage.removeItem('cartBeforeCheckout')
// //     }
// //   }, [location])


  
// //   // Đồng bộ cart với localStorage mỗi khi cart thay đổi
// //   useEffect(() => {
// //     localStorage.setItem('cart', JSON.stringify(cart))
// //   }, [cart])

// //   // Hàm thêm sản phẩm vào giỏ hàng
// //   const handleAddToCart = product => {
// //     const existingProduct = cart.find(item => item.id === product.id)
// //     if (existingProduct) {
// //       setCart(
// //         cart.map(item =>
// //           item.id === product.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         )
// //       )
// //     } else {
// //       setCart([...cart, { ...product, quantity: 1 }])
// //     }
// //   }
// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <Router>
// //         <Header
// //           cart={cart}
// //           setCart={setCart}
// //           handleAddToCart={handleAddToCart}
// //         />
// //         {/* <Header /> */}
// //         {/* <Route path="/" element={<Header cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} />} /> */}
// //         <Routes>
// //           <Route path='/' element={<HomePage />} />
// //           <Route path='/appointment' element={<Appointment />} />
// //           <Route path='/admin' element={<AdminDashboard />} />
// //           <Route path='/login' element={<Login />} />
// //           <Route path='/register' element={<Register />} />
// //           <Route path='/payment' element={<Payment />} />
// //           <Route path='/profile' element={<Profile />} />
// //           <Route path='/cancelpayment' element={<CancelPayment />} />
// //           <Route path='/massage' element={<Message />} />
// //           <Route path='/facial' element={<Facial />} />
// //           <Route path='/body-treatment' element={<Bodytreatment />} />
// //           <Route path='/aromatherapy' element={<Aromatherapy />} />
// //           <Route path='/admin' element={<AdminDashboard />} />
// //           <Route path='/staff' element={<StaffDashboard />} />
// //           <Route path='/blog' element={<Blog />} />
// //           {/* <Route path="/store" element={<Store />} /> */}
// //           <Route
// //             path='/store'
// //             element={
// //               <Store
// //                 cart={cart}
// //                 setCart={setCart}
// //                 handleAddToCart={handleAddToCart}
// //               />
// //             }
// //           />
// //         </Routes>
// //         <Footer />
// //       </Router>
// //     </ThemeProvider>
// //   )
// // }

// // export default App

// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Header from './Header & Footer/Header';
// import HomePage from './Khang-component/HomePage';
// import Appointment from './Khang-component/Appointment';
// import Footer from './Header & Footer/Footer';
// import Login from './Auth/login';
// import Register from './Auth/register';
// import Payment from './Auth/Payment';
// import Profile from './Khang-component/Profile';
// import CancelPayment from './Khang-component/CancelURL';
// import Message from './Khang-component/Message';
// import Facial from './Khang-component/Facial';
// import Bodytreatment from './Khang-component/Bodytreatment';
// import Aromatherapy from './Khang-component/aromatherapy';
// import Blog from './staff/Blog';
// import AdminDashboard from './admin/AdminDashboard';
// import Store from './Khang-component/Store';
// import StaffDashboard from './Khang-component/staffStoreProductManager';

// // Create theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#4caf50',
//     },
//     secondary: {
//       main: '#f50057',
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

// // Component con để sử dụng useLocation
// function AppContent({ cart, setCart, handleAddToCart }) {
//   const location = useLocation(); // Bây giờ useLocation sẽ hoạt động vì được bọc trong Router

//   // Kiểm tra URL path để xác định trạng thái thanh toán
//   useEffect(() => {
//     if (location.pathname === '/') {
//       // Giả định thanh toán thành công khi redirect về homepage
//       setCart([]);
//       localStorage.removeItem('cartBeforeCheckout');
//     } else if (location.pathname === '/cancelpayment') {
//       // Giả định hủy thanh toán khi redirect về /cancelpayment
//       const savedCart = localStorage.getItem('cartBeforeCheckout');
//       if (savedCart) {
//         setCart(JSON.parse(savedCart));
//       }
//     }
//   }, [location.pathname, setCart]); // Chỉ chạy khi pathname thay đổi

//   return (
//     <>
//       <Header cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/appointment" element={<Appointment />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cancelpayment" element={<CancelPayment />} />
//         <Route path="/massage" element={<Message />} />
//         <Route path="/facial" element={<Facial />} />
//         <Route path="/body-treatment" element={<Bodytreatment />} />
//         <Route path="/aromatherapy" element={<Aromatherapy />} />
//         <Route path="/staff" element={<StaffDashboard />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route
//           path="/store"
//           element={
//             <Store cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} />
//           }
//         />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// function App() {
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Đồng bộ cart với localStorage mỗi khi cart thay đổi
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // Hàm thêm sản phẩm vào giỏ hàng
//   const handleAddToCart = product => {
//     const existingProduct = cart.find(item => item.id === product.id);
//     if (existingProduct) {
//       setCart(
//         cart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AppContent
//           cart={cart}
//           setCart={setCart}
//           handleAddToCart={handleAddToCart}
//         />
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

// Component con để sử dụng useLocation
function AppContent({ cart, setCart, handleAddToCart }) {
  const location = useLocation();

  // Kiểm tra URL path để xác định trạng thái thanh toán
  useEffect(() => {
    // Khi hủy thanh toán
    if (location.pathname === '/cancelpayment') {
      const savedCart = localStorage.getItem('cartBeforeCheckout');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      // Lưu cờ để biết rằng thanh toán đã bị hủy
      localStorage.setItem('paymentCancelled', 'true');
    }
    // Khi redirect về homepage
    else if (location.pathname === '/') {
      const paymentCancelled = localStorage.getItem('paymentCancelled');
      if (paymentCancelled === 'true') {
        // Nếu vừa hủy thanh toán, không xóa giỏ hàng
        localStorage.removeItem('paymentCancelled'); // Xóa cờ sau khi xử lý
      } else {
        // Nếu không phải hủy thanh toán, giả định thanh toán thành công và xóa giỏ hàng
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