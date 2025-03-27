// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box, Typography, Grid, Card, CardMedia, CardContent, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, Select, MenuItem, Checkbox, FormControlLabel, Slider, FormGroup
// } from '@mui/material';

// const Store = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [openCart, setOpenCart] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [paymentLink, setPaymentLink] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [sortBy, setSortBy] = useState('default');
//   const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
//   const [priceRange, setPriceRange] = useState([0, 3000000]); // Khoảng giá: 0 đến 3.000.000 VNĐ
//   const [finishes, setFinishes] = useState({ cream: false, glimmer: false, glitter: false, glossy: false });

//   // Lấy danh sách sản phẩm từ MockAPI
//   useEffect(() => {
//     axios.get('https://6670f800e083e62ee4399f31.mockapi.io/API/ShopSPA')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   // Hàm thêm sản phẩm vào giỏ hàng
//   const handleAddToCart = (product) => {
//     const existingProduct = cart.find(item => item.id === product.id);
//     if (existingProduct) {
//       setCart(cart.map(item =>
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   // Hàm xóa sản phẩm khỏi giỏ hàng
//   const handleRemoveFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//   };

//   // Tính tổng tiền
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   // Hàm xử lý thanh toán
//   const handleCheckout = async () => {
//     setError('');
//     const token = sessionStorage.getItem('token');
//     if (!token) {
//       setError('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục thanh toán.');
//       return;
//     }

//     const totalAmount = calculateTotal();
//     if (totalAmount === 0) {
//       setError('Giỏ hàng trống!');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://localhost:3000/api/payment/create',
//         {
//           totalAmount: totalAmount,
//           appointmentId: "67e37d1cc9f3b27626f4ea84",
//           method: 0,
//           cancelUrl: 'http://localhost:3000/cancel'
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data && response.data.paymentLink) {
//         setPaymentLink(response.data.paymentLink);
//         window.location.href = response.data.paymentLink;
//         setCart([]);
//         setOpenCart(false);
//       } else {
//         setError('Không nhận được link thanh toán từ server');
//       }
//     } catch (err) {
//       console.error('Error during checkout:', err);
//       setError('Có lỗi xảy ra trong quá trình thanh toán');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Tạo danh sách danh mục duy nhất từ sản phẩm
//   const categories = [...new Set(products.map(product => product.category).filter(cat => cat))];

//   // Lọc sản phẩm dựa trên các bộ lọc
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
//     const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
//     const matchesAvailability = 
//       (!availability.inStock && !availability.outOfStock) ||
//       (availability.inStock && product.inStock) ||
//       (availability.outOfStock && !product.inStock);
//     const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
//     const matchesFinish = 
//       (!finishes.cream && !finishes.glimmer && !finishes.glitter && !finishes.glossy) ||
//       (finishes.cream && product.finish === 'Cream') ||
//       (finishes.glimmer && product.finish === 'Glimmer') ||
//       (finishes.glitter && product.finish === 'Glitter') ||
//       (finishes.glossy && product.finish === 'Glossy');

//     return matchesSearch && matchesCategory && matchesAvailability && matchesPrice && matchesFinish;
//   });

//   // Sắp xếp sản phẩm
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortBy === 'priceLowToHigh') {
//       return a.price - b.price;
//     } else if (sortBy === 'priceHighToLow') {
//       return b.price - a.price;
//     }
//     return 0;
//   });

//   return (
//     <Box sx={{ p: 4, display: 'flex' }}>
//       {/* Bộ lọc bên trái */}
//       <Box sx={{ width: '20%', pr: 3 }}>
//         <Typography variant="h6" gutterBottom>Availability</Typography>
//         <FormGroup>
//           <FormControlLabel
//             control={<Checkbox checked={availability.inStock} onChange={(e) => setAvailability({ ...availability, inStock: e.target.checked })} />}
//             label="In stock"
//           />
//           <FormControlLabel
//             control={<Checkbox checked={availability.outOfStock} onChange={(e) => setAvailability({ ...availability, outOfStock: e.target.checked })} />}
//             label="Out of stock"
//           />
//         </FormGroup>

//         <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Price</Typography>
//         <Slider
//           value={priceRange}
//           onChange={(e, newValue) => setPriceRange(newValue)}
//           valueLabelDisplay="auto"
//           min={0}
//           max={3000000} // Tối đa 3.000.000 VNĐ
//           step={10000} // Bước nhảy 10.000 VNĐ
//           sx={{ width: '100%' }}
//         />
//         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography>{priceRange[0].toLocaleString('vi-VN')} VNĐ</Typography>
//           <Typography>{priceRange[1].toLocaleString('vi-VN')} VNĐ</Typography>
//         </Box>

//         <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Finish</Typography>
//         <FormGroup>
//           <FormControlLabel
//             control={<Checkbox checked={finishes.cream} onChange={(e) => setFinishes({ ...finishes, cream: e.target.checked })} />}
//             label="Cream"
//           />
//           <FormControlLabel
//             control={<Checkbox checked={finishes.glimmer} onChange={(e) => setFinishes({ ...finishes, glimmer: e.target.checked })} />}
//             label="Glimmer"
//           />
//           <FormControlLabel
//             control={<Checkbox checked={finishes.glitter} onChange={(e) => setFinishes({ ...finishes, glitter: e.target.checked })} />}
//             label="Glitter"
//           />
//           <FormControlLabel
//             control={<Checkbox checked={finishes.glossy} onChange={(e) => setFinishes({ ...finishes, glossy: e.target.checked })} />}
//             label="Glossy"
//           />
//         </FormGroup>
//       </Box>

//       {/* Nội dung chính */}
//       <Box sx={{ width: '80%' }}>
//         {/* Thanh tìm kiếm, danh mục và sắp xếp */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <TextField
//               label="Tìm kiếm sản phẩm"
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               displayEmpty
//               sx={{ minWidth: 200 }}
//             >
//               <MenuItem value="">Tất cả danh mục</MenuItem>
//               {categories.map(category => (
//                 <MenuItem key={category} value={category}>{category}</MenuItem>
//               ))}
//             </Select>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography>{sortedProducts.length} products</Typography>
//             <Select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               sx={{ minWidth: 150 }}
//             >
//               <MenuItem value="default">Sort by</MenuItem>
//               <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
//               <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
//             </Select>
//           </Box>
//         </Box>

//         {/* Danh sách sản phẩm */}
//         {sortedProducts.length === 0 ? (
//           <Typography sx={{ mt: 2 }}>Không tìm thấy sản phẩm nào.</Typography>
//         ) : (
//           <Grid container spacing={3}>
//             {sortedProducts.map(product => (
//               <Grid item xs={12} sm={6} md={4} key={product.id}>
//                 <Card>
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={product.image}
//                     alt={product.name}
//                   />
//                   <CardContent>
//                     <Typography variant="h6">{product.name}</Typography>
//                     <Box sx={{ display: 'flex', gap: 1 }}>
//                       <Typography variant="h6" color="primary">
//                         {product.price.toLocaleString('vi-VN')} VNĐ
//                       </Typography>
//                       {product.originalPrice && (
//                         <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
//                           {product.originalPrice.toLocaleString('vi-VN')} VNĐ
//                         </Typography>
//                       )}
//                     </Box>
//                     <Button
//                       variant="contained"
//                       sx={{ mt: 2 }}
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Thêm vào giỏ hàng
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         {/* Nút mở giỏ hàng */}
//         <Button
//           variant="outlined"
//           sx={{ mt: 3 }}
//           onClick={() => setOpenCart(true)}
//         >
//           Xem giỏ hàng ({cart.length})
//         </Button>

//         {/* Dialog giỏ hàng */}
//         <Dialog open={openCart} onClose={() => setOpenCart(false)}>
//           <DialogTitle>Giỏ hàng của bạn</DialogTitle>
//           <DialogContent>
//             {error && (
//               <Typography color="error" sx={{ mb: 2 }}>
//                 {error}
//               </Typography>
//             )}
//             {cart.length === 0 ? (
//               <Typography>Giỏ hàng trống</Typography>
//             ) : (
//               <Box>
//                 {cart.map(item => (
//                   <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                     <Typography>{item.name} (x{item.quantity})</Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Typography>{(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ</Typography>
//                       <Button
//                         color="error"
//                         sx={{ ml: 2 }}
//                         onClick={() => handleRemoveFromCart(item.id)}
//                       >
//                         Xóa
//                       </Button>
//                     </Box>
//                   </Box>
//                 ))}
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6">
//                   Tổng cộng: {calculateTotal().toLocaleString('vi-VN')} VNĐ
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
//                 variant="contained"
//                 onClick={handleCheckout}
//                 disabled={loading}
//               >
//                 {loading ? 'Đang xử lý...' : 'Thanh toán'}
//               </Button>
//             )}
//           </DialogActions>
//         </Dialog>

//         {/* Hiển thị paymentLink nếu có */}
//         {paymentLink && (
//           <Box sx={{ mt: 2 }}>
//             <Typography>Link thanh toán: <a href={paymentLink}>{paymentLink}</a></Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Store;
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent, Button,
  TextField, Select, MenuItem, Checkbox, FormControlLabel, Slider, FormGroup
} from '@mui/material';

const Store = ({ cart, setCart, handleAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [finishes, setFinishes] = useState({ cream: false, glimmer: false, glitter: false, glossy: false });

  // Lấy danh sách sản phẩm từ MockAPI
  useEffect(() => {
    axios.get('https://6670f800e083e62ee4399f31.mockapi.io/API/ShopSPA')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Tạo danh sách danh mục duy nhất từ sản phẩm
  const categories = [...new Set(products.map(product => product.category).filter(cat => cat))];

  // Lọc sản phẩm dựa trên các bộ lọc
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesAvailability = 
      (!availability.inStock && !availability.outOfStock) ||
      (availability.inStock && product.inStock) ||
      (availability.outOfStock && !product.inStock);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesFinish = 
      (!finishes.cream && !finishes.glimmer && !finishes.glitter && !finishes.glossy) ||
      (finishes.cream && product.finish === 'Cream') ||
      (finishes.glimmer && product.finish === 'Glimmer') ||
      (finishes.glitter && product.finish === 'Glitter') ||
      (finishes.glossy && product.finish === 'Glossy');

    return matchesSearch && matchesCategory && matchesAvailability && matchesPrice && matchesFinish;
  });

  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sortBy === 'priceHighToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <Box sx={{ p: 4, display: 'flex' }}>
      {/* Bộ lọc bên trái */}
      <Box sx={{ width: '20%', pr: 3 }}>
        <Typography variant="h6" gutterBottom>Availability</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={availability.inStock} onChange={(e) => setAvailability({ ...availability, inStock: e.target.checked })} />}
            label="In stock"
          />
          <FormControlLabel
            control={<Checkbox checked={availability.outOfStock} onChange={(e) => setAvailability({ ...availability, outOfStock: e.target.checked })} />}
            label="Out of stock"
          />
        </FormGroup>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Price</Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={3000000}
          step={10000}
          sx={{ width: '100%' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{priceRange[0].toLocaleString('vi-VN')} VNĐ</Typography>
          <Typography>{priceRange[1].toLocaleString('vi-VN')} VNĐ</Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Finish</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={finishes.cream} onChange={(e) => setFinishes({ ...finishes, cream: e.target.checked })} />}
            label="Cream"
          />
          <FormControlLabel
            control={<Checkbox checked={finishes.glimmer} onChange={(e) => setFinishes({ ...finishes, glimmer: e.target.checked })} />}
            label="Glimmer"
          />
          <FormControlLabel
            control={<Checkbox checked={finishes.glitter} onChange={(e) => setFinishes({ ...finishes, glitter: e.target.checked })} />}
            label="Glitter"
          />
          <FormControlLabel
            control={<Checkbox checked={finishes.glossy} onChange={(e) => setFinishes({ ...finishes, glossy: e.target.checked })} />}
            label="Glossy"
          />
        </FormGroup>
      </Box>

      {/* Nội dung chính */}
      <Box sx={{ width: '80%' }}>
        {/* Thanh tìm kiếm, danh mục và sắp xếp */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Tìm kiếm sản phẩm"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">Tất cả danh mục</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>{sortedProducts.length} products</Typography>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="default">Sort by</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Danh sách sản phẩm */}
        {sortedProducts.length === 0 ? (
          <Typography sx={{ mt: 2 }}>Không tìm thấy sản phẩm nào.</Typography>
        ) : (
          <Grid container spacing={3}>
            {sortedProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Typography variant="h6" color="primary">
                        {product.price.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                      {product.originalPrice && (
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          {product.originalPrice.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Store;