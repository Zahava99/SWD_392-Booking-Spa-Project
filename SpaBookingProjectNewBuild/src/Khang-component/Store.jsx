// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box, Typography, Grid, Card, CardMedia, CardContent, Button,
//   TextField, Select, MenuItem, Checkbox, FormControlLabel, Slider, FormGroup
// } from '@mui/material';

// const Store = ({ cart, setCart, handleAddToCart }) => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [sortBy, setSortBy] = useState('default');
//   const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
//   const [priceRange, setPriceRange] = useState([0, 3000000]);
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
//           max={3000000}
//           step={10000}
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
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [finishes, setFinishes] = useState({ cream: false, glimmer: false, glitter: false, glossy: false });

  // Lấy danh sách sản phẩm và danh mục từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/products', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3000/api/category', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProducts(productsResponse.data.data || productsResponse.data || []);
        setCategories(categoriesResponse.data.data || categoriesResponse.data || []);

        console.log('Products:', productsResponse.data);
        console.log('Categories:', categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Hàm lấy tên danh mục từ categoryId
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  // Định dạng giá tiền theo VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Tạo danh sách danh mục duy nhất từ sản phẩm
  const uniqueCategories = [...new Set(products.map(product => product.category))];

  // Lọc sản phẩm dựa trên các bộ lọc
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesAvailability =
      (!availability.inStock && !availability.outOfStock) ||
      (availability.inStock && product.stock > 0) ||
      (availability.outOfStock && product.stock === 0);
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
          valueLabelFormat={(value) => formatPrice(value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{formatPrice(priceRange[0])}</Typography>
          <Typography>{formatPrice(priceRange[1])}</Typography>
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
              {uniqueCategories.map(categoryId => (
                <MenuItem key={categoryId} value={categoryId}>
                  {getCategoryName(categoryId)}
                </MenuItem>
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
              <Grid item xs={12} sm={6} md={4} key={product._id}>
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
                        {formatPrice(product.price)}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => handleAddToCart({ ...product, id: product._id })}
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