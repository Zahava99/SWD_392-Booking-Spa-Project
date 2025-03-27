// import { useState, useEffect } from 'react'
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   Menu,
//   MenuItem,
//   InputBase,
//   IconButton
// } from '@mui/material'
// import { Link,useNavigate } from 'react-router-dom'
// import SearchIcon from '@mui/icons-material/Search'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import logo from '../assets/logo-image/logo.jpg'
// import axios from 'axios'

// const Header = () => {
//   const [serviceAnchorEl, setServiceAnchorEl] = useState(null)
//   //
//   const [isLoggedIn, setIsLoggedIn] = useState(false) // State theo dõi trạng thái đăng nhập
//   const [userName, setUserName] = useState('') // State lưu tên người dùng
//   //
//   const navigate = useNavigate();
//   //
//   // useEffect(() => {
//   //   const token = sessionStorage.getItem('token')
//   //   if (token) {
//   //     axios.get('http://localhost:3000/api/auth/profile', {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     })
//   //       .then(response => {
//   //         setIsLoggedIn(true);
//   //         setUserName(response.data.data.fName || 'Người dùng');
//   //         // window.location.reload();
//   //       })
//   //       .catch(() => {
//   //         setIsLoggedIn(false);
//   //         setUserName('');
//   //       });
//   //   }
//   // }, [])
//   useEffect(() => {
//     const updateAuthState = () => {
//       const token = sessionStorage.getItem('token');
//       if (token) {
//         axios
//           .get('http://localhost:3000/api/auth/profile', {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//           .then(response => {
//             setIsLoggedIn(true);
//             setUserName(response.data.data.fName || 'Người dùng');
//           })
//           .catch(() => {
//             setIsLoggedIn(false);
//             setUserName('');
//           });
//       } else {
//         setIsLoggedIn(false);
//         setUserName('');
//       }
//     };
  
//     updateAuthState();
//     window.addEventListener('authChange', updateAuthState);
  
//     return () => {
//       window.removeEventListener('authChange', updateAuthState);
//     };
//   }, []);
//   const handleClick = (event, setAnchorEl) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = setAnchorEl => {
//     setAnchorEl(null)
//   }

//   //
//   const handleLogout = () => {
//     // Logic đăng xuất: xóa token, reset state
//     sessionStorage.removeItem('token');
//     setIsLoggedIn(false);
//     setUserName('');
//     navigate('/login');
//     window.location.reload();
//   }
//   //
//   return (
//     <AppBar
//       position='static'
//       color='default'
//       sx={{ boxShadow: 1, backgroundColor: 'white' }}
//     >
//       <Toolbar>
//         <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
//           <Link to='/'>
//             <img
//               src={logo}
//               alt='logo'
//               style={{ width: '50px', height: '50px', marginRight: '10px' }}
//             />
//           </Link>
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Button
//             color='inherit'
//             component={Link}
//             to='/'
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Trang chủ
//           </Button>

//           <Button
//             color='inherit'
//             endIcon={<KeyboardArrowDownIcon />}
//             onClick={e => handleClick(e, setServiceAnchorEl)}
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Danh mục Spa
//           </Button>
//           <Menu
//             anchorEl={serviceAnchorEl}
//             open={Boolean(serviceAnchorEl)}
//             onClose={() => handleClose(setServiceAnchorEl)}
//           >
//             <MenuItem
//               component={Link}
//               to='/massage'
//               onClick={() => handleClose(setServiceAnchorEl)}
//             >
//               Massage
//             </MenuItem>
//             <MenuItem
//               component={Link}
//               to='/facial'
//               onClick={() => handleClose(setServiceAnchorEl)}
//             >
//               Facial
//             </MenuItem>
//             <MenuItem
//               component={Link}
//               to='/body-treatment'
//               onClick={() => handleClose(setServiceAnchorEl)}
//             >
//               Body Treatment
//             </MenuItem>
//             <MenuItem
//               component={Link}
//               to='/aromatherapy'
//               onClick={() => handleClose(setServiceAnchorEl)}
//             >
//               Aromatherapy
//             </MenuItem>
//           </Menu>

//           <Button
//             color='inherit'
//             component={Link}
//             to='/blog'
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Blog
//           </Button>

//           <Button
//             color='inherit'
//             component={Link}
//             to='/about'
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Về chúng tôi
//           </Button>

//           <Button
//             color='inherit'
//             component={Link}
//             to='/contact'
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Liên hệ
//           </Button>
//           {isLoggedIn ? (
//             <Button
//               color='inherit'
//               onClick={handleLogout}
//               sx={{
//                 color: '#000',
//                 textTransform: 'none',
//                 fontWeight: 'medium'
//               }}
//             >
//               Đăng xuất
//             </Button>
//           ) : (
//             <Button
//               color='inherit'
//               component={Link}
//               to='/login'
//               sx={{
//                 color: '#000',
//                 textTransform: 'none',
//                 fontWeight: 'medium'
//               }}
//             >
//               Đăng nhập
//             </Button>
//           )}
//         </Box>

//         {/* <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
//           <InputBase
//             placeholder="Tìm Kiếm..."
//             sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
//           />
//           <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//             <SearchIcon />
//           </IconButton>
//         </Box> */}
//         {/* Thanh tìm kiếm hoặc tên người dùng */}
//         {/* {isLoggedIn ? (
//           <Button
//             color='inherit'
//             component={Link}
//             to='/profile'
//             sx={{
//               ml: 2,
//               color: '#000',
//               textTransform: 'none',
//               fontWeight: 'medium'
//             }}
//           >
//             {userName || 'Người dùng'}
//           </Button>
//         ) : (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               ml: 2,
//               border: '1px solid #ddd',
//               borderRadius: '4px'
//             }}
//           >
//             <InputBase
//               placeholder='Tìm Kiếm...'
//               sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
//             />
//             <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
//               <SearchIcon />
//             </IconButton>
//           </Box>
//         )} */}
//                 {isLoggedIn && (
//           <Button color='inherit' component={Link} to='/profile' sx={{ ml: 2, color: '#000', textTransform: 'none', fontWeight: 'medium' }}>
//             {userName || 'Người dùng'}
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default Header
// import { useState, useEffect } from 'react'
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   Menu,
//   MenuItem,
//   InputBase,
//   IconButton
// } from '@mui/material'
// import { Link,useNavigate } from 'react-router-dom'
// import SearchIcon from '@mui/icons-material/Search'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import logo from '../assets/logo-image/logo.jpg'
// import axios from 'axios'

// const Header = () => {
//   const [serviceAnchorEl, setServiceAnchorEl] = useState(null)
//   //
//   const [isLoggedIn, setIsLoggedIn] = useState(false) // State theo dõi trạng thái đăng nhập
//   const [userName, setUserName] = useState('') // State lưu tên người dùng
//   //
//   const navigate = useNavigate();
//   //
//   // useEffect(() => {
//   //   const token = sessionStorage.getItem('token')
//   //   if (token) {
//   //     axios.get('http://localhost:3000/api/auth/profile', {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     })
//   //       .then(response => {
//   //         setIsLoggedIn(true);
//   //         setUserName(response.data.data.fName || 'Người dùng');
//   //         // window.location.reload();
//   //       })
//   //       .catch(() => {
//   //         setIsLoggedIn(false);
//   //         setUserName('');
//   //       });
//   //   }
//   // }, [])
//   useEffect(() => {
//     const updateAuthState = () => {
//       const token = sessionStorage.getItem('token');
//       if (token) {
//         axios
//           .get('http://localhost:3000/api/auth/profile', {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//           .then(response => {
//             setIsLoggedIn(true);
//             setUserName(response.data.data.fName || 'Người dùng');
//           })
//           .catch(() => {
//             setIsLoggedIn(false);
//             setUserName('');
//           });
//       } else {
//         setIsLoggedIn(false);
//         setUserName('');
//       }
//     };

//     updateAuthState();
//     window.addEventListener('authChange', updateAuthState);

//     return () => {
//       window.removeEventListener('authChange', updateAuthState);
//     };
//   }, []);
//   const handleClick = (event, setAnchorEl) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = setAnchorEl => {
//     setAnchorEl(null)
//   }

//   //
//   const handleLogout = () => {
//     // Logic đăng xuất: xóa token, reset state
//     sessionStorage.removeItem('token');
//     setIsLoggedIn(false);
//     setUserName('');
//     navigate('/login');
//     window.location.reload();
//   }
//   //
//   return (
//     <AppBar
//       position='static'
//       color='default'
//       sx={{ boxShadow: 1, backgroundColor: 'white' }}
//     >
//       <Toolbar>
//         <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
//           <Link to='/'>
//             <img
//               src={logo}
//               alt='logo'
//               style={{ width: '50px', height: '50px', marginRight: '10px' }}
//             />
//           </Link>
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Button
//             color='inherit'
//             component={Link}
//             to='/'
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Trang chủ
//           </Button>

//           <Button
//             color='inherit'
//             endIcon={<KeyboardArrowDownIcon />}
//             onClick={e => handleClick(e, setServiceAnchorEl)}
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Danh mục Spa
//           </Button>
//           <Menu
//             anchorEl={serviceAnchorEl}
//             open={Boolean(serviceAnchorEl)}
//             onClose={() => handleClose(setServiceAnchorEl)}
//           >
//             <MenuItem
//               component={Link}
//               to='/massage'
//               onClick={() => handleClose(setServiceAnchorEl)}
//             >
//               Massage
//             </MenuItem>
//             <MenuItem
//               component={Link}
//               to='/facial'
//               onClick={() => handleClose(setServiceAnchorEl)}
//             >
//               Facial
//             </MenuItem>
//             <MenuItem
//               component={Link}
//               to='/body-treatment'
//               onClick={() => handleClose(setServiceAnchorEl)}
//             >
//               Body Treatment
//             </MenuItem>
//             <MenuItem
//               component={Link}
//               to='/aromatherapy'
//               onClick={() => handleClose(setServiceAnchorEl)}
//             >
//               Aromatherapy
//             </MenuItem>
//           </Menu>

//           <Button
//             color='inherit'
//             component={Link}
//             to='/blog'
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Blog
//           </Button>

//           <Button
//             color='inherit'
//             component={Link}
//             to='/store'
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Store
//           </Button>

//           <Button
//             color='inherit'
//             component={Link}
//             to='/contact'
//             sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
//           >
//             Liên hệ
//           </Button>
//           {isLoggedIn ? (
//             <Button
//               color='inherit'
//               onClick={handleLogout}
//               sx={{
//                 color: '#000',
//                 textTransform: 'none',
//                 fontWeight: 'medium'
//               }}
//             >
//               Đăng xuất
//             </Button>
//           ) : (
//             <Button
//               color='inherit'
//               component={Link}
//               to='/login'
//               sx={{
//                 color: '#000',
//                 textTransform: 'none',
//                 fontWeight: 'medium'
//               }}
//             >
//               Đăng nhập
//             </Button>
//           )}
//         </Box>

//         {/* <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
//           <InputBase
//             placeholder="Tìm Kiếm..."
//             sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
//           />
//           <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//             <SearchIcon />
//           </IconButton>
//         </Box> */}
//         {/* Thanh tìm kiếm hoặc tên người dùng */}
//         {/* {isLoggedIn ? (
//           <Button
//             color='inherit'
//             component={Link}
//             to='/profile'
//             sx={{
//               ml: 2,
//               color: '#000',
//               textTransform: 'none',
//               fontWeight: 'medium'
//             }}
//           >
//             {userName || 'Người dùng'}
//           </Button>
//         ) : (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               ml: 2,
//               border: '1px solid #ddd',
//               borderRadius: '4px'
//             }}
//           >
//             <InputBase
//               placeholder='Tìm Kiếm...'
//               sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
//             />
//             <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
//               <SearchIcon />
//             </IconButton>
//           </Box>
//         )} */}
//                 {isLoggedIn && (
//           <Button color='inherit' component={Link} to='/profile' sx={{ ml: 2, color: '#000', textTransform: 'none', fontWeight: 'medium' }}>
//             {userName || 'Người dùng'}
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default Header
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '../assets/logo-image/logo.jpg';
import axios from 'axios';

const Header = ({ cart = [], setCart, handleAddToCart }) => { // Add default value for cart
  const [serviceAnchorEl, setServiceAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [openCart, setOpenCart] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const updateAuthState = () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        axios
          .get('http://localhost:3000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => {
            setIsLoggedIn(true);
            setUserName(response.data.data.fName || 'Người dùng');
          })
          .catch(() => {
            setIsLoggedIn(false);
            setUserName('');
          });
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    updateAuthState();
    window.addEventListener('authChange', updateAuthState);

    return () => {
      window.removeEventListener('authChange', updateAuthState);
    };
  }, []);

  const handleClick = (event, setAnchorEl) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = setAnchorEl => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/login');
    window.location.reload();
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    setError('');
    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục thanh toán.');
      return;
    }

    const totalAmount = calculateTotal();
    if (totalAmount === 0) {
      setError('Giỏ hàng trống!');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/api/payment/create',
        {
          totalAmount: totalAmount,
          appointmentId: "67e37d1cc9f3b27626f4ea84",
          method: 0,
          cancelUrl: 'http://localhost:3000/cancel'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data && response.data.paymentLink) {
        setPaymentLink(response.data.paymentLink);
        window.location.href = response.data.paymentLink;
        setCart([]);
        setOpenCart(false);
      } else {
        setError('Không nhận được link thanh toán từ server');
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      setError('Có lỗi xảy ra trong quá trình thanh toán');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar
      position='static'
      color='default'
      sx={{ boxShadow: 1, backgroundColor: 'white' }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to='/'>
            <img
              src={logo}
              alt='logo'
              style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color='inherit'
            component={Link}
            to='/'
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Trang chủ
          </Button>

          <Button
            color='inherit'
            endIcon={<KeyboardArrowDownIcon />}
            onClick={e => handleClick(e, setServiceAnchorEl)}
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Danh mục Spa
          </Button>
          <Menu
            anchorEl={serviceAnchorEl}
            open={Boolean(serviceAnchorEl)}
            onClose={() => handleClose(setServiceAnchorEl)}
          >
            <MenuItem
              component={Link}
              to='/massage'
              onClick={() => handleClose(setServiceAnchorEl)}
            >
              Massage
            </MenuItem>
            <MenuItem
              component={Link}
              to='/facial'
              onClick={() => handleClose(setServiceAnchorEl)}
            >
              Facial
            </MenuItem>
            <MenuItem
              component={Link}
              to='/body-treatment'
              onClick={() => handleClose(setServiceAnchorEl)}
            >
              Body Treatment
            </MenuItem>
            <MenuItem
              component={Link}
              to='/aromatherapy'
              onClick={() => handleClose(setServiceAnchorEl)}
            >
              Aromatherapy
            </MenuItem>
          </Menu>

          <Button
            color='inherit'
            component={Link}
            to='/blog'
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Blog
          </Button>

          <Button
            color='inherit'
            component={Link}
            to='/store'
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Store
          </Button>

          <Button
            color='inherit'
            component={Link}
            to='/contact'
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Liên hệ
          </Button>

          {isLoggedIn ? (
            <Button
              color='inherit'
              onClick={handleLogout}
              sx={{
                color: '#000',
                textTransform: 'none',
                fontWeight: 'medium'
              }}
            >
              Đăng xuất
            </Button>
          ) : (
            <Button
              color='inherit'
              component={Link}
              to='/login'
              sx={{
                color: '#000',
                textTransform: 'none',
                fontWeight: 'medium'
              }}
            >
              Đăng nhập
            </Button>
          )}

          {/* Nút giỏ hàng */}
          <IconButton onClick={() => setOpenCart(true)} sx={{ ml: 2 }}>
            <Badge badgeContent={cart.length || 0} color="primary"> {/* Add fallback for cart.length */}
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {isLoggedIn && (
          <Button color='inherit' component={Link} to='/profile' sx={{ ml: 2, color: '#000', textTransform: 'none', fontWeight: 'medium' }}>
            {userName || 'Người dùng'}
          </Button>
        )}

        {/* Dialog giỏ hàng */}
        <Dialog open={openCart} onClose={() => setOpenCart(false)}>
          <DialogTitle>Giỏ hàng của bạn</DialogTitle>
          <DialogContent>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            {cart.length === 0 ? (
              <Typography>Giỏ hàng trống</Typography>
            ) : (
              <Box>
                {cart.map(item => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>{item.name} (x{item.quantity})</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>{(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ</Typography>
                      <Button
                        color="error"
                        sx={{ ml: 2 }}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Xóa
                      </Button>
                    </Box>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">
                  Tổng cộng: {calculateTotal().toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCart(false)} disabled={loading}>
              Đóng
            </Button>
            {cart.length > 0 && (
              <Button
                variant="contained"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Thanh toán'}
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* {paymentLink && (
          <Box sx={{ mt: 2 }}>
            <Typography>Link thanh toán: <a href={paymentLink}>{paymentLink}</a></Typography>
          </Box>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
