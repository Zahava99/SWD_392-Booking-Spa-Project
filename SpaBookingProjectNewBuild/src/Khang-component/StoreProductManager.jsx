// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
// import axios from "axios";

// export default function StoreProductManager() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [promotions, setPromotions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openCreateDialog, setOpenCreateDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     quantity: 0,
//     description: "",
//     price: 0,
//     promotion: "",
//     category: "",
//     image: "",
//     stock: 0,
//   });

//   // Lấy danh sách sản phẩm, category và promotion khi component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const token = sessionStorage.getItem("token");
//         const [productsResponse, categoriesResponse, promotionsResponse] = await Promise.all([
//           axios.get("https://mcmapp.online/api/products", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get("https://mcmapp.online/api/category", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get("https://mcmapp.online/api/promotions", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         setProducts(productsResponse.data.data || productsResponse.data || []);
//         setCategories(categoriesResponse.data.data || []);
//         setPromotions(promotionsResponse.data || []);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch data");
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await axios.get("https://mcmapp.online/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(response.data.data || response.data || []);
//     } catch (err) {
//       setError("Failed to fetch products");
//       console.error(err);
//     }
//   };

//   // Xử lý tạo mới product
//   const handleCreateProduct = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       await axios.post("https://mcmapp.online/api/products", newProduct, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOpenCreateDialog(false);
//       setNewProduct({
//         name: "",
//         quantity: 0,
//         description: "",
//         price: 0,
//         promotion: "",
//         category: "",
//         image: "",
//         stock: 0,
//       });
//       fetchProducts();
//     } catch (err) {
//       setError("Failed to create product");
//       console.error(err);
//     }
//   };

//   // Xử lý cập nhật product
//   const handleUpdateProduct = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       await axios.put(
//         `https://mcmapp.online/api/products/${selectedProduct._id}`,
//         selectedProduct,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setOpenEditDialog(false);
//       setSelectedProduct(null);
//       fetchProducts();
//     } catch (err) {
//       setError("Failed to update product");
//       console.error(err);
//     }
//   };

//   // Xử lý xóa product
//   const handleDeleteProduct = async (productId) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       await axios.delete(`https://mcmapp.online/api/products/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchProducts();
//     } catch (err) {
//       setError("Failed to delete product");
//       console.error(err);
//     }
//   };

//   // Mở dialog tạo mới
//   const handleOpenCreateDialog = () => {
//     setOpenCreateDialog(true);
//   };

//   // Mở dialog chỉnh sửa
//   const handleOpenEditDialog = (product) => {
//     const validCategory = categories.some(cat => cat.id === product.category) ? product.category : "";
//     const validPromotion = promotions.some(promo => promo._id === product.promotion) ? product.promotion : "";
//     setSelectedProduct({
//       ...product,
//       category: validCategory,
//       promotion: validPromotion,
//     });
//     setOpenEditDialog(true);
//   };

//   // Đóng dialog
//   const handleCloseDialog = () => {
//     setOpenCreateDialog(false);
//     setOpenEditDialog(false);
//     setSelectedProduct(null);
//   };

//   // Cập nhật dữ liệu form
//   const handleInputChange = (e, isEdit = false) => {
//     const { name, value } = e.target;
//     if (isEdit) {
//       setSelectedProduct((prev) => ({ ...prev, [name]: value }));
//     } else {
//       setNewProduct((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Store Product Manager
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleOpenCreateDialog}
//         sx={{ mb: 2 }}
//       >
//         Create New Product
//       </Button>

//       {/* Bảng danh sách sản phẩm */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Promotion</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Stock</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product._id}>
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell>{product.quantity}</TableCell>
//                 <TableCell>{product.description}</TableCell>
//                 <TableCell>{product.price}</TableCell>
//                 <TableCell>{product.promotion}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>{product.stock}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="primary"
//                     onClick={() => handleOpenEditDialog(product)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     color="error"
//                     onClick={() => handleDeleteProduct(product._id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog tạo mới product */}
//       <Dialog open={openCreateDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Create New Product</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={newProduct.name}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Quantity"
//             name="quantity"
//             type="number"
//             value={newProduct.quantity}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={newProduct.description}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Price"
//             name="price"
//             type="number"
//             value={newProduct.price}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Promotion"
//             name="promotion"
//             value={newProduct.promotion}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Category"
//             name="category"
//             value={newProduct.category}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Image URL"
//             name="image"
//             value={newProduct.image}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Stock"
//             name="stock"
//             type="number"
//             value={newProduct.stock}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleCreateProduct} variant="contained">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Dialog chỉnh sửa product */}
//       <Dialog open={openEditDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Edit Product</DialogTitle>
//         <DialogContent>
//           {selectedProduct && (
//             <>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 value={selectedProduct.name || ""}
//                 onChange={(e) => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Quantity"
//                 name="quantity"
//                 type="number"
//                 value={selectedProduct.quantity || 0}
//                 onChange={(e) => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={selectedProduct.description || ""}
//                 onChange={(e) => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Price"
//                 name="price"
//                 type="number"
//                 value={selectedProduct.price || 0}
//                 onChange={(e) => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Promotion</InputLabel>
//                 <Select
//                   name="promotion"
//                   value={selectedProduct.promotion || ""}
//                   onChange={(e) => handleInputChange(e, true)}
//                   label="Promotion"
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {promotions.map((promo) => (
//                     <MenuItem key={promo._id} value={promo._id}>
//                       {promo.code || promo._id}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   name="category"
//                   value={selectedProduct.category || ""}
//                   onChange={(e) => handleInputChange(e, true)}
//                   label="Category"
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {categories.map((cat) => (
//                     <MenuItem key={cat.id} value={cat.id}>
//                       {cat.name || cat.id}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <TextField
//                 fullWidth
//                 label="Image URL"
//                 name="image"
//                 value={selectedProduct.image || ""}
//                 onChange={(e) => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Stock"
//                 name="stock"
//                 type="number"
//                 value={selectedProduct.stock || 0}
//                 onChange={(e) => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleUpdateProduct} variant="contained">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import axios from 'axios'

export default function StoreProductManager () {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [promotions, setPromotions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    description: '',
    price: 0,
    promotion: '',
    category: '',
    image: '',
    stock: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = sessionStorage.getItem('token')
        const [productsResponse, categoriesResponse, promotionsResponse] =
          await Promise.all([
            axios.get('https://mcmapp.online/api/products', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('https://mcmapp.online/api/category', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('https://mcmapp.online/api/promotions', {
              headers: { Authorization: `Bearer ${token}` }
            })
          ])

        const productsData =
          productsResponse.data.data || productsResponse.data || []
        const categoriesData = categoriesResponse.data.data || []
        const promotionsData = promotionsResponse.data || []

        setProducts(productsData)
        setCategories(categoriesData)
        console.log("Categories:", categoriesData);
        setPromotions(promotionsData)

        console.log('Products:', productsData)
        console.log('Categories:', categoriesData)
        console.log('Promotions:', promotionsData)

        setLoading(false)
      } catch (err) {
        setError('Failed to fetch data')
        setLoading(false)
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log('newProduct sau khi cập nhật:', newProduct)
  }, [newProduct])

  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get('https://mcmapp.online/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(response.data.data || response.data || [])
    } catch (err) {
      setError('Failed to fetch products')
      console.error(err)
    }
  }

  const handleCreateProduct = async () => {
    try {
      if (!newProduct.name.trim()) {
        setError('Name is required')
        return
      }
      if (!newProduct.category) {
        setError('Category is required')
        return
      }
      if (!newProduct.promotion) {
        setError('Promotion is required')
        return
      }

      const token = sessionStorage.getItem('token')
      console.log('Dữ liệu gửi lên API:', newProduct)

      const response = await axios.post(
        'https://mcmapp.online/api/products',
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      console.log('Phản hồi từ server:', response.data)

      setOpenCreateDialog(false)
      setNewProduct({
        name: '',
        quantity: 0,
        description: '',
        price: 0,
        promotion: '',
        category: '',
        image: '',
        stock: 0
      })
      fetchProducts()
    } catch (err) {
      if (err.response) {
        console.error('Chi tiết lỗi từ server:', err.response.data)
        setError(
          `Failed to create product: ${
            err.response.data.message || 'Bad Request'
          }`
        )
      } else {
        console.error('Lỗi không xác định:', err.message)
        setError('Failed to create product: ' + err.message)
      }
    }
  }
  const handleCreateInputChange = e => {
    const { name, value } = e.target
    console.log(`Create - Đổi ${name} thành:`, value)
    setNewProduct(prev => ({ ...prev, [name]: value }))
  }
  const handleUpdateProduct = async () => {
    try {
      const token = sessionStorage.getItem('token')
      await axios.put(
        `https://mcmapp.online/api/products/${selectedProduct._id}`,
        selectedProduct,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setOpenEditDialog(false)
      setSelectedProduct(null)
      fetchProducts()
    } catch (err) {
      setError('Failed to update product')
      console.error(err)
    }
  }
  const handleEditInputChange = e => {
    const { name, value } = e.target
    console.log(`Edit - Đổi ${name} thành:`, value)
    setSelectedProduct(prev => ({ ...prev, [name]: value }))
  }
  const handleDeleteProduct = async productId => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      const token = sessionStorage.getItem('token')
      await axios.delete(`https://mcmapp.online/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchProducts()
    } catch (err) {
      setError('Failed to delete product')
      console.error(err)
    }
  }

  const handleOpenCreateDialog = () => {
    console.log('Mở dialog Create')
    setOpenCreateDialog(true)
  }

  const handleOpenEditDialog = product => {
    console.log('Mở dialog Edit')
    const validCategory = categories.some(cat => cat.id === product.category)
      ? product.category
      : ''
    const validPromotion = promotions.some(
      promo => promo._id === product.promotion
    )
      ? product.promotion
      : ''
    setSelectedProduct({
      ...product,
      category: validCategory,
      promotion: validPromotion
    })
    setOpenEditDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenCreateDialog(false)
    setOpenEditDialog(false)
    setSelectedProduct(null)
  }

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target
    console.log(`Đổi ${name} thành:`, value)
    console.log('isEdit:', isEdit) // Log để kiểm tra giá trị isEdit
    if (isEdit) {
      setSelectedProduct(prev => {
        const updated = { ...prev, [name]: value }
        console.log('Updated selectedProduct:', updated)
        return updated
      })
    } else {
      setNewProduct(prev => {
        const updated = { ...prev, [name]: value }
        console.log('Updated newProduct:', updated)
        return updated
      })
    }
  }
  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Unknown'
  }

  const getPromotionCode = promotionId => {
    const promotion = promotions.find(promo => promo._id === promotionId)
    return promotion ? promotion.code : 'None'
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color='error'>{error}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Store Product Manager
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={handleOpenCreateDialog}
        sx={{ mb: 2 }}
      >
        Create New Product
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Promotion</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {products.map(product => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.promotion}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    onClick={() => handleOpenEditDialog(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
          <TableBody>
            {products.map(product => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.description}</TableCell>
                {/* <TableCell>{product.price}</TableCell> */}
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>{getPromotionCode(product.promotion)}</TableCell>
                <TableCell>{getCategoryName(product.category)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    onClick={() => handleOpenEditDialog(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openCreateDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label='Name'
            name='name'
            value={newProduct.name}
            onChange={handleCreateInputChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label='Quantity'
            name='quantity'
            type='number'
            value={newProduct.quantity}
            onChange={handleCreateInputChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label='Description'
            name='description'
            value={newProduct.description}
            onChange={handleCreateInputChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label='Price'
            name='price'
            type='number'
            value={newProduct.price}
            onChange={handleCreateInputChange}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Promotion</InputLabel>
            <Select
              name='promotion'
              value={newProduct.promotion || ''}
              onChange={handleCreateInputChange}
              label='Promotion'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {promotions.map(promo => (
                <MenuItem key={promo._id} value={promo._id}>
                  {promo.code || promo._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name='category'
              value={newProduct.category || ''}
              onChange={handleCreateInputChange}
              label='Category'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name || cat.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label='Image URL'
            name='image'
            value={newProduct.image}
            onChange={handleCreateInputChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label='Stock'
            name='stock'
            type='number'
            value={newProduct.stock}
            onChange={handleCreateInputChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateProduct} variant='contained'>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <TextField
                fullWidth
                label='Name'
                name='name'
                value={selectedProduct.name || ''}
                onChange={e => handleEditInputChange(e, true)}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label='Quantity'
                name='quantity'
                type='number'
                value={selectedProduct.quantity || 0}
                onChange={e => handleEditInputChange(e, true)}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label='Description'
                name='description'
                value={selectedProduct.description || ''}
                onChange={e => handleEditInputChange(e, true)}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label='Price'
                name='price'
                type='number'
                value={selectedProduct.price || 0}
                onChange={e => handleEditInputChange(e, true)}
                sx={{ mt: 2 }}
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Promotion</InputLabel>
                <Select
                  name='promotion'
                  value={selectedProduct.promotion || ''}
                  onChange={e => handleEditInputChange(e, true)}
                  label='Promotion'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {promotions.map(promo => (
                    <MenuItem key={promo._id} value={promo._id}>
                      {promo.code || promo._id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  name='category'
                  value={selectedProduct.category || ''}
                  onChange={e => handleEditInputChange(e, true)}
                  label='Category'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name || cat.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label='Image URL'
                name='image'
                value={selectedProduct.image || ''}
                onChange={e => handleEditInputChange(e, true)}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label='Stock'
                name='stock'
                type='number'
                value={selectedProduct.stock || 0}
                onChange={e => handleEditInputChange(e, true)}
                sx={{ mt: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateProduct} variant='contained'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
