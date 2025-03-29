// import { useState, useEffect } from 'react'
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   Menu,
//   MenuItem,
//   IconButton,
//   Badge,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select
// } from '@mui/material'
// import { Link, useNavigate } from 'react-router-dom'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import logo from '../assets/logo-image/logo.jpg'
// import axios from 'axios'

// const Header = ({ cart = [], setCart, handleAddToCart }) => {
//   const [serviceAnchorEl, setServiceAnchorEl] = useState(null)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [userName, setUserName] = useState('')
//   const [openCart, setOpenCart] = useState(false)
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [paymentLink, setPaymentLink] = useState('')
//   const [promotions, setPromotions] = useState([]) // Danh sách mã khuyến mãi
//   const [selectedPromotion, setSelectedPromotion] = useState('') // Mã khuyến mãi được chọn
//   const [discountError, setDiscountError] = useState('') // Lỗi liên quan đến mã khuyến mãi

//   const navigate = useNavigate()

//   // Lấy danh sách mã khuyến mãi từ API
//   useEffect(() => {
//     const fetchPromotions = async () => {
//       const token = sessionStorage.getItem('token')
//       if (!token) {
//         setError('Bạn cần đăng nhập để xem mã khuyến mãi')
//         return
//       }

//       try {
//         const response = await axios.get(
//           'https://mcmapp.online/api/promotions',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         )
//         setPromotions(response.data)
//       } catch (err) {
//         console.error('Error fetching promotions:', err)
//         if (err.response && err.response.status === 401) {
//           setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.')
//           setIsLoggedIn(false)
//           sessionStorage.removeItem('token')
//           navigate('/login')
//         } else {
//           setError('Không thể tải danh sách mã khuyến mãi')
//         }
//       }
//     }

//     fetchPromotions()
//   }, [navigate])

//   useEffect(() => {
//     const updateAuthState = () => {
//       const token = sessionStorage.getItem('token')
//       if (token) {
//         axios
//           .get('https://mcmapp.online/api/auth/profile', {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//           .then(response => {
//             setIsLoggedIn(true)
//             setUserName(response.data.data.fName || 'Người dùng')
//           })
//           .catch(() => {
//             setIsLoggedIn(false)
//             setUserName('')
//           })
//       } else {
//         setIsLoggedIn(false)
//         setUserName('')
//       }
//     }

//     updateAuthState()
//     window.addEventListener('authChange', updateAuthState)

//     return () => {
//       window.removeEventListener('authChange', updateAuthState)
//     }
//   }, [])

//   // Kiểm tra và cập nhật discountError khi selectedPromotion hoặc cart thay đổi
//   useEffect(() => {
//     const total = calculateTotal()
//     // if (!selectedPromotion) {
//     //   setDiscountError('');
//     //   return;
//     // }
//     // Nếu selectedPromotion là "" hoặc "Không sử dụng mã khuyến mãi" thì không áp dụng
// if (
//   !selectedPromotion ||
//   selectedPromotion === 'Không sử dụng mã khuyến mãi'
// ) {
//   setDiscountError('')
//   return
// }
//     const selectedPromo = promotions.find(
//       promo => promo._id === selectedPromotion
//     )
//     if (!selectedPromo) {
//       setDiscountError('Mã khuyến mãi không hợp lệ')
//       return
//     }

//     const code = selectedPromo.code

//     if (code.endsWith('-FDA')) {
//       if (selectedPromo.fixedDiscountAmount > 0) {
//         setDiscountError('')
//       }
//     } else if (code.endsWith('-DP')) {
//       if (selectedPromo.discountPercentage > 0) {
//         setDiscountError('')
//       }
//     } else if (code.endsWith('-DPA')) {
//       if (total < selectedPromo.fixedDiscountAmount) {
//         setDiscountError(
//           `Tổng tiền phải lớn hơn ${formatPrice(
//             selectedPromo.fixedDiscountAmount
//           )} để áp dụng mã này`
//         )
//       } else if (selectedPromo.discountPercentage > 0) {
//         setDiscountError('')
//       }
//     } else {
//       setDiscountError('Loại mã khuyến mãi không được hỗ trợ')
//     }
//   }, [selectedPromotion, cart, promotions])

//   const handleClick = (event, setAnchorEl) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = setAnchorEl => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     sessionStorage.removeItem('token')
//     localStorage.removeItem('cart')
//     localStorage.removeItem('cartBeforeCheckout')
//     localStorage.removeItem('paymentCancelled')
//     setCart([])
//     setIsLoggedIn(false)
//     setUserName('')
//     navigate('/login')
//     window.location.reload()
//   }

//   const handleRemoveFromCart = productId => {
//     setCart(cart.filter(item => item.id !== productId))
//   }

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0)
//   }

//   // Tính tổng tiền sau khi áp dụng khuyến mãi (không cập nhật state trong hàm này)
//   const calculateTotalAfterDiscount = () => {
//     const total = calculateTotal()
//     if (!selectedPromotion) {
//       return total
//     }

//     const selectedPromo = promotions.find(
//       promo => promo._id === selectedPromotion
//     )
//     if (!selectedPromo) {
//       return total
//     }

//     let discountedTotal = total
//     const code = selectedPromo.code

//     if (code.endsWith('-FDA')) {
//       if (selectedPromo.fixedDiscountAmount > 0) {
//         discountedTotal = total - selectedPromo.fixedDiscountAmount
//       }
//     } else if (code.endsWith('-DP')) {
//       if (selectedPromo.discountPercentage > 0) {
//         const discount = (total * selectedPromo.discountPercentage) / 100
//         discountedTotal = total - discount
//       }
//     } else if (code.endsWith('-DPA')) {
//       if (
//         total >= selectedPromo.fixedDiscountAmount &&
//         selectedPromo.discountPercentage > 0
//       ) {
//         const discount = (total * selectedPromo.discountPercentage) / 100
//         discountedTotal = total - discount
//       }
//     }

//     return Math.max(0, discountedTotal)
//   }

//   const formatPrice = price => {
//     return new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: 'VND'
//     }).format(price)
//   }

//   const handleCheckout = async () => {
//     setError('')
//     const token = sessionStorage.getItem('token')
//     if (!token) {
//       setError('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục thanh toán.')
//       return
//     }

//     const totalAmount = calculateTotalAfterDiscount()
//     if (totalAmount === 0) {
//       setError('Giỏ hàng trống!')
//       return
//     }

//     if (discountError) {
//       setError(discountError)
//       return
//     }

//     const payload = {
//       totalAmount: totalAmount,
//       description: 'Thanh toán đơn hàng từ giỏ hàng',
//       promotion: selectedPromotion || null,
//       cancelUrl: 'http://localhost:5173/cancelpayment',
//       successUrl: 'http://localhost:5173/success'
//     }
//     console.log('PayloadCheckOut:', payload)

//     try {
//       setLoading(true)
//       localStorage.setItem('cartBeforeCheckout', JSON.stringify(cart))
//       localStorage.removeItem('paymentCancelled')

//       const response = await axios.post(
//         'https://mcmapp.online/api/product-payment/create',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       )

//       if (response.data && response.data.paymentLink) {
//         setPaymentLink(response.data.paymentLink)
//         window.location.href = response.data.paymentLink
//         setOpenCart(false)
//       } else {
//         setError('Không nhận được link thanh toán từ server')
//       }
//     } catch (err) {
//       console.error('Error during checkout:', err)
//       if (err.response) {
//         setError(
//           err.response.data.message ||
//             'Có lỗi xảy ra trong quá trình thanh toán'
//         )
//       } else {
//         setError('Không thể kết nối đến server')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

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

//           <IconButton onClick={() => setOpenCart(true)} sx={{ ml: 2 }}>
//             <Badge badgeContent={cart.length || 0} color='primary'>
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//         </Box>

//         {isLoggedIn && (
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
//         )}

//         <Dialog open={openCart} onClose={() => setOpenCart(false)}>
//           <DialogTitle>Giỏ hàng của bạn</DialogTitle>
//           <DialogContent>
//             {error && (
//               <Typography color='error' sx={{ mb: 2 }}>
//                 {error}
//               </Typography>
//             )}
//             {discountError && (
//               <Typography color='error' sx={{ mb: 2 }}>
//                 {discountError}
//               </Typography>
//             )}
//             {cart.length === 0 ? (
//               <Typography>Giỏ hàng trống</Typography>
//             ) : (
//               <Box>
//                 {cart.map(item => (
//                   <Box
//                     key={item.id}
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       mb: 2
//                     }}
//                   >
//                     <Typography>
//                       {item.name} (x{item.quantity})
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Typography>
//                         {formatPrice(item.price * item.quantity)}
//                       </Typography>
//                       <Button
//                         color='error'
//                         sx={{ ml: 2 }}
//                         onClick={() => handleRemoveFromCart(item.id)}
//                       >
//                         Xóa
//                       </Button>
//                     </Box>
//                   </Box>
//                 ))}
//                 <Divider sx={{ my: 2 }} />

//                 {/* Dropdown chọn mã khuyến mãi */}
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel>Chọn mã khuyến mãi</InputLabel>
//                   <Select
//                     value={selectedPromotion}
//                     onChange={e => {
//                       setSelectedPromotion(e.target.value)
//                       setDiscountError('') // Xóa lỗi khi chọn mã mới
//                     }}
//                     label='Chọn mã khuyến mãi'
//                     disabled={!isLoggedIn}
//                   >
//                     <MenuItem value='Không sử dụng mã khuyến mãi'>
//                       <em>Không sử dụng mã khuyến mãi</em>
//                     </MenuItem>
//                     {promotions.map(promo => (
//                       <MenuItem key={promo._id} value={promo._id}>
//                         {promo.code} - Giảm {promo.discountPercentage}%
//                         {promo.fixedDiscountAmount > 0}
//                         (Hết hạn: {new Date(promo.endDate).toLocaleDateString()}
//                         )
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 {/* Hiển thị tổng tiền */}
//                 <Typography variant='h6'>
//                   Tổng tiền ban đầu: {formatPrice(calculateTotal())}
//                 </Typography>
//                 {calculateTotal() - calculateTotalAfterDiscount() > 0 && (
//                   <Typography variant='body1' color='green'>
//                     Đã giảm:{' '}
//                     {formatPrice(
//                       calculateTotal() - calculateTotalAfterDiscount()
//                     )}
//                   </Typography>
//                 )}
//                 <Typography variant='h6' color='primary'>
//                   Tổng tiền sau khuyến mãi:{' '}
//                   {formatPrice(calculateTotalAfterDiscount())}
//                 </Typography>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenCart(false)} disabled={loading}>
//               Đóng
//             </Button>
//             {cart.length > 0 && (
//               <Button
//                 variant='contained'
//                 onClick={handleCheckout}
//                 disabled={loading || !!discountError}
//               >
//                 {loading ? 'Đang xử lý...' : 'Thanh toán'}
//               </Button>
//             )}
//           </DialogActions>
//         </Dialog>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default Header

import { useState, useEffect } from 'react'
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
  Divider,
  FormControl,
  InputLabel,
  Select
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import logo from '../assets/logo-image/logo.jpg'
import axios from 'axios'

const Header = ({ cart = [], setCart, handleAddToCart }) => {
  const [serviceAnchorEl, setServiceAnchorEl] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [openCart, setOpenCart] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentLink, setPaymentLink] = useState('')
  const [promotions, setPromotions] = useState([]) // Danh sách mã khuyến mãi
  const [selectedPromotion, setSelectedPromotion] = useState('') // Mã khuyến mãi được chọn
  const [discountError, setDiscountError] = useState('') // Lỗi liên quan đến mã khuyến mãi

  const navigate = useNavigate()

  // Hàm định dạng tiền tệ VND
  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  // Lấy danh sách mã khuyến mãi từ API
  useEffect(() => {
    const fetchPromotions = async () => {
      const token = sessionStorage.getItem('token')
      if (!token) {
        setError('Bạn cần đăng nhập để xem mã khuyến mãi')
        return
      }

      try {
        const response = await axios.get(
          'https://mcmapp.online/api/promotions',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setPromotions(response.data)
      } catch (err) {
        console.error('Error fetching promotions:', err)
        if (err.response && err.response.status === 401) {
          setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.')
          setIsLoggedIn(false)
          sessionStorage.removeItem('token')
          navigate('/login')
        } else {
          setError('Không thể tải danh sách mã khuyến mãi')
        }
      }
    }

    fetchPromotions()
  }, [navigate])

  useEffect(() => {
    const updateAuthState = () => {
      const token = sessionStorage.getItem('token')
      if (token) {
        axios
          .get('https://mcmapp.online/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            setIsLoggedIn(true)
            setUserName(response.data.data.fName || 'Người dùng')
          })
          .catch(() => {
            setIsLoggedIn(false)
            setUserName('')
          })
      } else {
        setIsLoggedIn(false)
        setUserName('')
      }
    }

    updateAuthState()
    window.addEventListener('authChange', updateAuthState)

    return () => {
      window.removeEventListener('authChange', updateAuthState)
    }
  }, [])

  useEffect(() => {
    const total = calculateTotal()
    if (
      !selectedPromotion ||
      selectedPromotion === 'Không sử dụng mã khuyến mãi'
    ) {
      setDiscountError('')
      return
    }
    const selectedPromo = promotions.find(
      promo => promo._id === selectedPromotion
    )
    if (!selectedPromo) {
      setDiscountError('Mã khuyến mãi không hợp lệ')
      return
    }

    const code = selectedPromo.code

    //   if (code.endsWith('-FDA')) {
    //     if (selectedPromo.fixedDiscountAmount > 0) {
    //       setDiscountError('')
    //     }
    //   } else if (code.endsWith('-DP')) {
    //     if (selectedPromo.discountPercentage > 0) {
    //       setDiscountError('')
    //     }
    //   } else if (code.endsWith('-DPA')) {
    //     if (total < selectedPromo.fixedDiscountAmount) {
    //       setDiscountError(
    //         `Tổng tiền phải lớn hơn ${formatPrice(
    //           selectedPromo.fixedDiscountAmount
    //         )} để áp dụng mã này`
    //       )
    //     } else if (selectedPromo.discountPercentage > 0) {
    //       setDiscountError('')
    //     }
    //   } else {
    //     setDiscountError('Loại mã khuyến mãi không được hỗ trợ')
    //   }
    // }, [selectedPromotion, cart, promotions])
    if (code.endsWith('-FDA')) {
      if (selectedPromo.fixedDiscountAmount > 0) {
        setDiscountError('')
      }
    } else if (code.endsWith('-DP')) {
      if (selectedPromo.discountPercentage > 0) {
        setDiscountError('')
      }
    } else if (code.includes('-DPA-')) {
      const match = code.match(/-DPA-(\d+)$/)
      if (match) {
        const minAmount = parseInt(match[1], 10) * 1000 // Đơn vị nghìn VND
        if (total < minAmount) {
          setDiscountError(
            `Tổng tiền phải lớn hơn hoặc bằng ${formatPrice(
              minAmount
            )} để áp dụng mã này`
          )
        } else {
          setDiscountError('')
        }
      } else {
        setDiscountError('Mã khuyến mãi không hợp lệ')
      }
    } else {
      setDiscountError('Loại mã khuyến mãi không được hỗ trợ')
    }
  }, [selectedPromotion, cart, promotions])

  const handleClick = (event, setAnchorEl) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = setAnchorEl => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('cart')
    localStorage.removeItem('cartBeforeCheckout')
    localStorage.removeItem('paymentCancelled')
    setCart([])
    setIsLoggedIn(false)
    setUserName('')
    navigate('/login')
    window.location.reload()
  }

  const handleRemoveFromCart = productId => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // const calculateTotalAfterDiscount = () => {
  //   const total = calculateTotal()
  //   // if (!selectedPromotion) {
  //   //   return total
  //   // }
  //   if (
  //     !selectedPromotion ||
  //     selectedPromotion === 'Không sử dụng mã khuyến mãi'
  //   ) {
  //     return total
  //   }
  //   const selectedPromo = promotions.find(
  //     promo => promo._id === selectedPromotion
  //   )
  //   if (!selectedPromo) {
  //     return total
  //   }

  //   let discountedTotal = total
  //   const code = selectedPromo.code

  //   if (code.endsWith('-FDA')) {
  //     if (selectedPromo.fixedDiscountAmount > 0) {
  //       discountedTotal = total - selectedPromo.fixedDiscountAmount
  //     }
  //   } else if (code.endsWith('-DP')) {
  //     if (selectedPromo.discountPercentage > 0) {
  //       const discount = (total * selectedPromo.discountPercentage) / 100
  //       discountedTotal = total - discount
  //     }
  //   } else if (code.endsWith('-DPA')) {
  //     if (
  //       total >= selectedPromo.fixedDiscountAmount &&
  //       selectedPromo.discountPercentage > 0
  //     ) {
  //       const discount = (total * selectedPromo.discountPercentage) / 100
  //       discountedTotal = total - discount
  //     }
  //   }

  //   return Math.max(0, discountedTotal)
  // }
  const calculateTotalAfterDiscount = () => {
    const total = calculateTotal()
    if (!selectedPromotion || selectedPromotion === 'Không sử dụng mã khuyến mãi') {
      return total
    }
    const selectedPromo = promotions.find(promo => promo._id === selectedPromotion)
    if (!selectedPromo) {
      return total
    }
  
    let discountedTotal = total
    const code = selectedPromo.code
  
    if (code.endsWith('-FDA')) {
      if (selectedPromo.fixedDiscountAmount > 0) {
        discountedTotal = total - selectedPromo.fixedDiscountAmount
      }
    } else if (code.endsWith('-DP')) {
      if (selectedPromo.discountPercentage > 0) {
        const discount = (total * selectedPromo.discountPercentage) / 100
        discountedTotal = total - discount
      }
    } else if (code.includes('-DPA-')) {
      const match = code.match(/-DPA-(\d+)$/)
      if (match) {
        const minAmount = parseInt(match[1], 10) * 1000 // Đơn vị nghìn VND
        if (total >= minAmount && selectedPromo.discountPercentage > 0) {
          const discount = (total * selectedPromo.discountPercentage) / 100
          discountedTotal = total - discount
        }
      }
    }
  
    return Math.max(0, discountedTotal)
  }

  const handleCheckout = async () => {
    setError('')
    const token = sessionStorage.getItem('token')
    if (!token) {
      setError('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục thanh toán.')
      return
    }

    // const totalAmount = calculateTotalAfterDiscount()
    // if (totalAmount === 0) {
    //   setError('Giỏ hàng trống!')
    //   return
    // }
    const totalAmount = calculateTotal()
    if (totalAmount === 0) {
      setError('Giỏ hàng trống!')
      return
    }

    if (discountError) {
      setError(discountError)
      return
    }

    const payload = {
      totalAmount: totalAmount,
      description: 'Thanh toán đơn hàng',
      // promotion: "null",
      // promotion: selectedPromotion || null,
      promotion:
        selectedPromotion === 'Không sử dụng mã khuyến mãi' ||
        !selectedPromotion
          ? null
          : selectedPromotion,
      cancelUrl: 'http://localhost:5173/cancelpayment',
      successUrl: 'http://localhost:5173/success'
    }
    console.log('PayloadCheckOut:', payload)

    try {
      setLoading(true)
      localStorage.setItem('cartBeforeCheckout', JSON.stringify(cart))
      localStorage.removeItem('paymentCancelled')

      const response = await axios.post(
        'https://mcmapp.online/api/product-payment/create',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data && response.data.paymentLink) {
        setPaymentLink(response.data.paymentLink)
        window.location.href = response.data.paymentLink
        setOpenCart(false)
      } else {
        setError('Không nhận được link thanh toán từ server')
      }
    } catch (err) {
      console.error('Error during checkout:', err)
      if (err.response) {
        setError(
          err.response.data.message ||
            'Có lỗi xảy ra trong quá trình thanh toán'
        )
      } else {
        setError('Không thể kết nối đến server')
      }
    } finally {
      setLoading(false)
    }
  }

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

          <IconButton onClick={() => setOpenCart(true)} sx={{ ml: 2 }}>
            <Badge badgeContent={cart.length || 0} color='primary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {isLoggedIn && (
          <Button
            color='inherit'
            component={Link}
            to='/profile'
            sx={{
              ml: 2,
              color: '#000',
              textTransform: 'none',
              fontWeight: 'medium'
            }}
          >
            {userName || 'Người dùng'}
          </Button>
        )}

        <Dialog open={openCart} onClose={() => setOpenCart(false)}>
          <DialogTitle>Giỏ hàng của bạn</DialogTitle>
          <DialogContent>
  {error && (
    <Typography color='error' sx={{ mb: 2 }}>
      {error}
    </Typography>
  )}
  {discountError && (
    <Typography color='error' sx={{ mb: 2 }}>
      {discountError}
    </Typography>
  )}
  {cart.length === 0 ? (
    <Typography>Giỏ hàng trống</Typography>
  ) : (
    <Box>
      {cart.map(item => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Typography>
            {item.name} (x{item.quantity})
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>
              {formatPrice(item.price * item.quantity)}
            </Typography>
            <Button
              color='error'
              sx={{ ml: 2 }}
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />

      {/* Dropdown chọn mã khuyến mãi */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Chọn mã khuyến mãi</InputLabel>
        <Select
          value={selectedPromotion}
          onChange={e => {
            setSelectedPromotion(e.target.value)
            setDiscountError('') // Xóa lỗi khi chọn mã mới
          }}
          label='Chọn mã khuyến mãi'
          disabled={!isLoggedIn}
        >
          <MenuItem value='Không sử dụng mã khuyến mãi'>
            <em>Không sử dụng mã khuyến mãi</em>
          </MenuItem>
          {promotions
            .filter(promo => promo.status === 0)
            .map(promo => (
              <MenuItem key={promo._id} value={promo._id}>
                {promo.code.endsWith('-FDA')
                  ? `${promo.code} - Giảm ${formatPrice(promo.fixedDiscountAmount)}`
                  : `${promo.code} - Giảm ${promo.discountPercentage}%`}
                (Hết hạn: {new Date(promo.endDate).toLocaleDateString()})
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Hiển thị tổng tiền */}
      <Typography variant='h6'>
        Tổng tiền ban đầu: {formatPrice(calculateTotal())}
      </Typography>
      {calculateTotal() !== calculateTotalAfterDiscount() && (
        <>
          <Typography variant='body1' color='green'>
            Đã giảm: {formatPrice(calculateTotal() - calculateTotalAfterDiscount())}
          </Typography>
          <Typography variant='h6' color='primary'>
            Tổng tiền sau khuyến mãi: {formatPrice(calculateTotalAfterDiscount())} (tham khảo)
          </Typography>
        </>
      )}
    </Box>
  )}
</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCart(false)} disabled={loading}>
              Đóng
            </Button>
            {cart.length > 0 && (
              <Button
                variant='contained'
                onClick={handleCheckout}
                disabled={loading || !!discountError}
              >
                {loading ? 'Đang xử lý...' : 'Thanh toán'}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  )
}

export default Header
