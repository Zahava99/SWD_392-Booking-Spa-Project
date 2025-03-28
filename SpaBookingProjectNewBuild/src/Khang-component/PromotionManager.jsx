// 'use client'

// import { useState, useEffect } from 'react'
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
//   MenuItem
// } from '@mui/material'
// import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
// import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// const formatDate = dateString => {
//   if (!dateString) return ''
//   return dateString.split('T')[0] // Xóa phần T00:00:00.000Z
// }
// // Hàm chuyển đổi status thành chữ
// const getStatusLabel = status => {
//   return status === 0 ? 'Available' : 'Expired'
// } // Hàm định dạng tiền tệ VND
// const formatCurrency = amount => {
//   return new Intl.NumberFormat('vi-VN', {
//     style: 'currency',
//     currency: 'VND'
//   }).format(amount)
// }
// export default function PromotionManager () {
//   const [promotions, setPromotions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [openCreateDialog, setOpenCreateDialog] = useState(false)
//   const [openEditDialog, setOpenEditDialog] = useState(false)
//   const [selectedPromotion, setSelectedPromotion] = useState(null)
//   const [newPromotion, setNewPromotion] = useState({
//     code: '',
//     status: 0,
//     startDate: '',
//     endDate: '',
//     fixedDiscountAmount: 0,
//     discountPercentage: 0
//   })

//   // Lấy danh sách promotions khi component mount
//   useEffect(() => {
//     const fetchPromotions = async () => {
//       try {
//         setLoading(true)
//         const token = sessionStorage.getItem('token')
//         const response = await axios.get(
//           'https://mcmapp.online/api/promotions',
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         )
//         setPromotions(response.data || [])
//         setLoading(false)
//       } catch (err) {
//         setError('Failed to fetch promotions')
//         setLoading(false)
//         console.error(err)
//       }
//     }

//     fetchPromotions()
//   }, [])

//   // Cập nhật danh sách promotions sau khi tạo, sửa, xóa
//   const fetchPromotions = async () => {
//     try {
//       const token = sessionStorage.getItem('token')
//       const response = await axios.get('https://mcmapp.online/api/promotions', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       setPromotions(response.data || [])
//     } catch (err) {
//       setError('Failed to fetch promotions')
//       console.error(err)
//     }
//   }

//   // Xử lý tạo mới promotion
//   const handleCreatePromotion = async () => {
//     try {
//       const token = sessionStorage.getItem('token')
//       await axios.post('https://mcmapp.online/api/promotions', newPromotion, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       setOpenCreateDialog(false)
//       setNewPromotion({
//         code: '',
//         status: 0,
//         startDate: '',
//         endDate: '',
//         fixedDiscountAmount: 0,
//         discountPercentage: 0
//       })
//       fetchPromotions()
//     } catch (err) {
//       setError('Failed to create promotion')
//       console.error(err)
//     }
//     console.log(newPromotion)
//   }

//   // Xử lý cập nhật promotion
//   const handleUpdatePromotion = async () => {
//     try {
//       const token = sessionStorage.getItem('token')
//       await axios.put(
//         `https://mcmapp.online/api/promotions/${selectedPromotion._id}`,
//         selectedPromotion,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       )
//       setOpenEditDialog(false)
//       setSelectedPromotion(null)
//       fetchPromotions()
//     } catch (err) {
//       setError('Failed to update promotion')
//       console.error(err)
//     }
//   }

//   // Xử lý xóa promotion
//   // const handleDeletePromotion = async (promotionId) => {
//   //   try {
//   //     const token = sessionStorage.getItem("token");
//   //     await axios.delete(`https://mcmapp.online/api/promotions/${promotionId}`, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });
//   //     fetchPromotions();
//   //   } catch (err) {
//   //     setError("Failed to delete promotion");
//   //     console.error(err);
//   //   }
//   // };
//   const handleDeletePromotion = async promotionId => {
//     toast(
//       ({ closeToast }) => (
//         <div>
//           <p>Are you sure you want to delete this promotion?</p>
//           <Button
//             onClick={async () => {
//               try {
//                 const token = sessionStorage.getItem('token')
//                 await axios.delete(
//                   `https://mcmapp.online/api/promotions/${promotionId}`,
//                   {
//                     headers: { Authorization: `Bearer ${token}` }
//                   }
//                 )
//                 fetchPromotions()
//                 toast.success('Promotion deleted successfully')
//               } catch (err) {
//                 setError('Failed to delete promotion')
//                 toast.error('Failed to delete promotion')
//                 console.error(err)
//               }
//               closeToast()
//             }}
//             variant='contained'
//             color='error'
//             size='small'
//             sx={{ mr: 1 }}
//           >
//             Yes
//           </Button>
//           <Button onClick={closeToast} variant='outlined' size='small'>
//             No
//           </Button>
//         </div>
//       ),
//       {
//         autoClose: false,
//         closeOnClick: false,
//         closeButton: false,
//         draggable: false
//       }
//     )
//   }

//   // Mở dialog tạo mới
//   const handleOpenCreateDialog = () => {
//     setOpenCreateDialog(true)
//   }

//   // Mở dialog chỉnh sửa
//   const handleOpenEditDialog = promotion => {
//     setSelectedPromotion(promotion)
//     setOpenEditDialog(true)
//   }

//   // Đóng dialog
//   const handleCloseDialog = () => {
//     setOpenCreateDialog(false)
//     setOpenEditDialog(false)
//     setSelectedPromotion(null)
//   }

//   // Cập nhật dữ liệu form
//   const handleInputChange = (e, isEdit = false) => {
//     const { name, value } = e.target
//     if (isEdit) {
//       setSelectedPromotion(prev => ({ ...prev, [name]: value }))
//     } else {
//       setNewPromotion(prev => ({ ...prev, [name]: value }))
//     }
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
//         <CircularProgress />
//       </Box>
//     )
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography color='error'>{error}</Typography>
//       </Box>
//     )
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <ToastContainer
//         position='top-right'
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>
//         Promotion Manager
//       </Typography>
//       <Button
//         variant='contained'
//         color='primary'
//         onClick={handleOpenCreateDialog}
//         sx={{ mb: 2 }}
//       >
//         Create New Promotion
//       </Button>

//       {/* Bảng danh sách promotions */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Code</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Fixed Discount</TableCell>
//               <TableCell>Discount %</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {promotions.map(promotion => (
//               <TableRow key={promotion._id}>
//                 <TableCell>{promotion.code}</TableCell>
//                 <TableCell>{getStatusLabel(promotion.status)}</TableCell>
//                 {/* <TableCell>{promotion.status}</TableCell> */}
//                 {/* <TableCell>{promotion.startDate}</TableCell>
//                 <TableCell>{promotion.endDate}</TableCell> */}
//                 <TableCell>{formatDate(promotion.startDate)}</TableCell>
//                 <TableCell>{formatDate(promotion.endDate)}</TableCell>
//                 {/* <TableCell>{promotion.fixedDiscountAmount}</TableCell> */}
//                 <TableCell>
//                   {formatCurrency(promotion.fixedDiscountAmount)}
//                 </TableCell>
//                 <TableCell>{promotion.discountPercentage}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     color='primary'
//                     onClick={() => handleOpenEditDialog(promotion)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     color='error'
//                     onClick={() => handleDeletePromotion(promotion._id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog tạo mới promotion */}
//       <Dialog open={openCreateDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Create New Promotion</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label='Code'
//             name='code'
//             value={newPromotion.code}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Status</InputLabel>
//             <Select
//               name='status'
//               value={newPromotion.status}
//               onChange={handleInputChange}
//               label='Status'
//             >
//               <MenuItem value={0}>Available</MenuItem>
//               <MenuItem value={1}>Expire</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             label='Start Date (YYYY/MM/DD)'
//             name='startDate'
//             value={newPromotion.startDate}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//             placeholder='YYYY/MM/DD'
//           />
//           <TextField
//             fullWidth
//             label='End Date (YYYY/MM/DD)'
//             name='endDate'
//             value={newPromotion.endDate}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//             placeholder='YYYY/MM/DD'
//           />
//           <TextField
//             fullWidth
//             label='Fixed Discount Amount'
//             name='fixedDiscountAmount'
//             type='number'
//             value={newPromotion.fixedDiscountAmount}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label='Discount Percentage'
//             name='discountPercentage'
//             type='number'
//             value={newPromotion.discountPercentage}
//             onChange={handleInputChange}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleCreatePromotion} variant='contained'>
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Dialog chỉnh sửa promotion */}
//       <Dialog open={openEditDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Edit Promotion</DialogTitle>
//         <DialogContent>
//           {selectedPromotion && (
//             <>
//               <TextField
//                 fullWidth
//                 label='Code'
//                 name='code'
//                 value={selectedPromotion.code || ''}
//                 onChange={e => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   name='status'
//                   value={selectedPromotion.status || 0}
//                   onChange={e => handleInputChange(e, true)}
//                   label='Status'
//                 >
//                   <MenuItem value={0}>Available</MenuItem>
//                   <MenuItem value={1}>Expire</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 fullWidth
//                 label='Start Date (YYYY/MM/DD)'
//                 name='startDate'
//                 // value={selectedPromotion.startDate || ""}
//                 value={formatDate(selectedPromotion.startDate) || ''}
//                 onChange={e => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//                 placeholder='YYYY/MM/DD'
//               />
//               <TextField
//                 fullWidth
//                 label='End Date (YYYY/MM/DD)'
//                 name='endDate'
//                 // value={selectedPromotion.endDate || ""}
//                 value={formatDate(selectedPromotion.endDate) || ''}
//                 onChange={e => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//                 placeholder='YYYY/MM/DD'
//               />
//               <TextField
//                 fullWidth
//                 label='Fixed Discount Amount'
//                 name='fixedDiscountAmount'
//                 type='number'
//                 value={selectedPromotion.fixedDiscountAmount || 0}
//                 onChange={e => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label='Discount Percentage'
//                 name='discountPercentage'
//                 type='number'
//                 value={selectedPromotion.discountPercentage || 0}
//                 onChange={e => handleInputChange(e, true)}
//                 sx={{ mt: 2 }}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleUpdatePromotion} variant='contained'>
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }




"use client";

import { useState, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatDate = (dateString) => {
  if (!dateString) return "";
  return dateString.split("T")[0];
};

const getStatusLabel = (status) => {
  return status === 0 ? "Available" : "Expired";
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export default function PromotionManager() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [newPromotion, setNewPromotion] = useState({
    code: "",
    status: 0,
    startDate: "",
    endDate: "",
    fixedDiscountAmount: 0,
    discountPercentage: 0,
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await axios.get("https://mcmapp.online/api/promotions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPromotions(response.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch promotions");
        setLoading(false);
        console.error(err);
      }
    };

    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("https://mcmapp.online/api/promotions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPromotions(response.data || []);
    } catch (err) {
      setError("Failed to fetch promotions");
      console.error(err);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedPromotions = [...promotions].sort((a, b) => {
      if (key === 'status') {
        return direction === 'asc' 
          ? a.status - b.status 
          : b.status - a.status;
      }
      if (key === 'startDate' || key === 'endDate') {
        const dateA = new Date(a[key] || '1970-01-01');
        const dateB = new Date(b[key] || '1970-01-01');
        return direction === 'asc' 
          ? dateA - dateB 
          : dateB - dateA;
      }
      return 0;
    });
    setPromotions(sortedPromotions);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />;
  };

  const handleCreatePromotion = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post("https://mcmapp.online/api/promotions", newPromotion, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenCreateDialog(false);
      setNewPromotion({
        code: "",
        status: 0,
        startDate: "",
        endDate: "",
        fixedDiscountAmount: 0,
        discountPercentage: 0,
      });
      fetchPromotions();
      toast.success("Promotion created successfully");
    } catch (err) {
      setError("Failed to create promotion");
      toast.error("Failed to create promotion");
      console.error(err);
    }
  };

  const handleUpdatePromotion = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `https://mcmapp.online/api/promotions/${selectedPromotion._id}`,
        selectedPromotion,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOpenEditDialog(false);
      setSelectedPromotion(null);
      fetchPromotions();
      toast.success("Promotion updated successfully");
    } catch (err) {
      setError("Failed to update promotion");
      toast.error("Failed to update promotion");
      console.error(err);
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this promotion?</p>
          <Button
            onClick={async () => {
              try {
                const token = sessionStorage.getItem("token");
                await axios.delete(`https://mcmapp.online/api/promotions/${promotionId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                fetchPromotions();
                toast.success("Promotion deleted successfully");
              } catch (err) {
                setError("Failed to delete promotion");
                toast.error("Failed to delete promotion");
                console.error(err);
              }
              closeToast();
            }}
            variant="contained"
            color="error"
            size="small"
            sx={{ mr: 1 }}
          >
            Yes
          </Button>
          <Button
            onClick={closeToast}
            variant="outlined"
            size="small"
          >
            No
          </Button>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleOpenEditDialog = (promotion) => {
    setSelectedPromotion(promotion);
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenCreateDialog(false);
    setOpenEditDialog(false);
    setSelectedPromotion(null);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setSelectedPromotion((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewPromotion((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Typography variant="h6" gutterBottom>
        Promotion Manager
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateDialog}
        sx={{ mb: 2 }}
      >
        Create New Promotion
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell onClick={() => handleSort('status')} sx={{ cursor: 'pointer' }}>
                Status {getSortIcon('status')}
              </TableCell>
              <TableCell onClick={() => handleSort('startDate')} sx={{ cursor: 'pointer' }}>
                Start Date {getSortIcon('startDate')}
              </TableCell>
              <TableCell onClick={() => handleSort('endDate')} sx={{ cursor: 'pointer' }}>
                End Date {getSortIcon('endDate')}
              </TableCell>
              <TableCell>Fixed Discount</TableCell>
              <TableCell>Discount %</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions.map((promotion) => (
              <TableRow key={promotion._id}>
                <TableCell>{promotion.code}</TableCell>
                <TableCell>{getStatusLabel(promotion.status)}</TableCell>
                <TableCell>{formatDate(promotion.startDate)}</TableCell>
                <TableCell>{formatDate(promotion.endDate)}</TableCell>
                <TableCell>{formatCurrency(promotion.fixedDiscountAmount)}</TableCell>
                <TableCell>{promotion.discountPercentage}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEditDialog(promotion)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeletePromotion(promotion._id)}
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
        <DialogTitle>Create New Promotion</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Code"
            name="code"
            value={newPromotion.code}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newPromotion.status}
              onChange={handleInputChange}
              label="Status"
            >
              <MenuItem value={0}>Available</MenuItem>
              <MenuItem value={1}>Expire</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Start Date (YYYY/MM/DD)"
            name="startDate"
            value={newPromotion.startDate}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
            placeholder="YYYY/MM/DD"
          />
          <TextField
            fullWidth
            label="End Date (YYYY/MM/DD)"
            name="endDate"
            value={newPromotion.endDate}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
            placeholder="YYYY/MM/DD"
          />
          <TextField
            fullWidth
            label="Fixed Discount Amount"
            name="fixedDiscountAmount"
            type="number"
            value={newPromotion.fixedDiscountAmount}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Discount Percentage"
            name="discountPercentage"
            type="number"
            value={newPromotion.discountPercentage}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreatePromotion} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Promotion</DialogTitle>
        <DialogContent>
          {selectedPromotion && (
            <>
              <TextField
                fullWidth
                label="Code"
                name="code"
                value={selectedPromotion.code || ""}
                onChange={(e) => handleInputChange(e, true)}
                sx={{ mt: 2 }}
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={selectedPromotion.status || 0}
                  onChange={(e) => handleInputChange(e, true)}
                  label="Status"
                >
                  <MenuItem value={0}>Available</MenuItem>
                  <MenuItem value={1}>Expire</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Start Date (YYYY/MM/DD)"
                name="startDate"
                value={formatDate(selectedPromotion.startDate) || ""}
                onChange={(e) => handleInputChange(e, true)}
                sx={{ mt: 2 }}
                placeholder="YYYY/MM/DD"
              />
              <TextField
                fullWidth
                label="End Date (YYYY/MM/DD)"
                name="endDate"
                value={formatDate(selectedPromotion.endDate) || ""}
                onChange={(e) => handleInputChange(e, true)}
                sx={{ mt: 2 }}
                placeholder="YYYY/MM/DD"
              />
              <TextField
                fullWidth
                label="Fixed Discount Amount"
                name="fixedDiscountAmount"
                type="number"
                value={selectedPromotion.fixedDiscountAmount || 0}
                onChange={(e) => handleInputChange(e, true)}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Discount Percentage"
                name="discountPercentage"
                type="number"
                value={selectedPromotion.discountPercentage || 0}
                onChange={(e) => handleInputChange(e, true)}
                sx={{ mt: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdatePromotion} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}