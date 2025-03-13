// // import 
// // // React, 
// // { useState } from 'react';
// // import {
// //   Container,
// //   Typography,
// //   Box,
// //   Paper,
// //   Breadcrumbs,
// //   Link as MuiLink,
// //   Grid,
// //   Avatar,
// //   Button,
// //   TextField,
// //   Divider,
// //   IconButton,
// //   Card,
// //   CardContent,
// // } from '@mui/material';
// // import { Link } from 'react-router-dom';
// // import HomeIcon from '@mui/icons-material/Home';
// // import EditIcon from '@mui/icons-material/Edit';
// // import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// // import { format } from 'date-fns';

// // const Profile = () => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [avatarPreview, setAvatarPreview] = useState(null);
  
// //   // Mock data - replace with actual data from API
// //   const [userData, setUserData] = useState({
// //     id: "usr123",
// //     email: "john.doe@example.com",
// //     phone: "0123456789",
// //     role: 0,
// //     createdAt: "2025-03-11T10:39:06.794Z",
// //     updatedAt: "2025-03-11T10:39:06.794Z",
// //     fName: "John",
// //     lName: "Doe",
// //     dob: "1990-01-01",
// //     avt: "https://example.com/avatar.jpg"
// //   });

// //   const handleAvatarChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setAvatarPreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleDateChange = (date) => {
// //     setUserData(prev => ({
// //       ...prev,
// //       dob: format(date, 'yyyy-MM-dd')
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Here you would typically send the updated data to your backend
// //     setIsEditing(false);
// //     console.log('Updated user data:', userData);
// //   };

// //   return (
// //     <>
// //       {/* Hero Section */}
// //       <Box
// //         sx={{
// //           height: '300px',
// //           backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
// //           backgroundSize: 'cover',
// //           backgroundPosition: 'center',
// //           display: 'flex',
// //           flexDirection: 'column',
// //           justifyContent: 'center',
// //           alignItems: 'center',
// //           position: 'relative',
// //           '&::before': {
// //             content: '""',
// //             position: 'absolute',
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //           }
// //         }}
// //       >
// //         <Typography 
// //           variant="h2" 
// //           component="h1" 
// //           sx={{ 
// //             color: 'white', 
// //             fontWeight: 'bold',
// //             position: 'relative',
// //             zIndex: 1,
// //             mb: 2
// //           }}
// //         >
// //           Hồ sơ cá nhân
// //         </Typography>
// //         <Breadcrumbs 
// //           aria-label="breadcrumb" 
// //           sx={{ 
// //             color: 'white',
// //             position: 'relative',
// //             zIndex: 1
// //           }}
// //         >
// //           <MuiLink
// //             component={Link}
// //             to="/"
// //             sx={{ 
// //               display: 'flex', 
// //               alignItems: 'center',
// //               color: 'white',
// //               textDecoration: 'none',
// //               '&:hover': {
// //                 textDecoration: 'underline'
// //               }
// //             }}
// //           >
// //             <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
// //             Trang chủ
// //           </MuiLink>
// //           <Typography color="white">Hồ sơ</Typography>
// //         </Breadcrumbs>
// //       </Box>

// //       {/* Profile Content */}
// //       <Container maxWidth="lg" sx={{ py: 8 }}>
// //         <Grid container spacing={4}>
// //           {/* Left Column - Avatar and Basic Info */}
// //           <Grid item xs={12} md={4}>
// //             <Paper 
// //               elevation={3} 
// //               sx={{ 
// //                 p: 4, 
// //                 borderRadius: 2,
// //                 textAlign: 'center'
// //               }}
// //             >
// //               <Box sx={{ position: 'relative', display: 'inline-block' }}>
// //                 <Avatar
// //                   src={avatarPreview || userData.avt}
// //                   sx={{
// //                     width: 200,
// //                     height: 200,
// //                     margin: '0 auto',
// //                     mb: 3,
// //                     border: '4px solid #f8a488'
// //                   }}
// //                 />
// //                 {isEditing && (
// //                   <label htmlFor="avatar-upload">
// //                     <input
// //                       accept="image/*"
// //                       id="avatar-upload"
// //                       type="file"
// //                       style={{ display: 'none' }}
// //                       onChange={handleAvatarChange}
// //                     />
// //                     <IconButton
// //                       sx={{
// //                         position: 'absolute',
// //                         bottom: 20,
// //                         right: 0,
// //                         backgroundColor: '#f8a488',
// //                         '&:hover': { backgroundColor: '#f7926e' }
// //                       }}
// //                       component="span"
// //                     >
// //                       <CloudUploadIcon sx={{ color: 'white' }} />
// //                     </IconButton>
// //                   </label>
// //                 )}
// //               </Box>
              
// //               <Typography variant="h4" sx={{ mb: 1 }}>
// //                 {userData.fName} {userData.lName}
// //               </Typography>
// //               <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
// //                 {userData.email}
// //               </Typography>
              
// //               <Button
// //                 variant="contained"
// //                 startIcon={<EditIcon />}
// //                 onClick={() => setIsEditing(!isEditing)}
// //                 sx={{
// //                   backgroundColor: '#f8a488',
// //                   '&:hover': { backgroundColor: '#f7926e' },
// //                   textTransform: 'none'
// //                 }}
// //               >
// //                 {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa thông tin'}
// //               </Button>
// //             </Paper>

// //             {/* Account Information Card */}
// //             <Card sx={{ mt: 3 }}>
// //               <CardContent>
// //                 <Typography variant="h6" sx={{ mb: 2 }}>Thông tin tài khoản</Typography>
// //                 <Grid container spacing={2}>
// //                   <Grid item xs={6}>
// //                     <Typography color="textSecondary">ID</Typography>
// //                     <Typography>{userData.id}</Typography>
// //                   </Grid>
// //                   <Grid item xs={6}>
// //                     <Typography color="textSecondary">Vai trò</Typography>
// //                     <Typography>{userData.role === 0 ? 'Khách hàng' : 'Admin'}</Typography>
// //                   </Grid>
// //                   <Grid item xs={12}>
// //                     <Divider sx={{ my: 1 }} />
// //                   </Grid>
// //                   <Grid item xs={6}>
// //                     <Typography color="textSecondary">Ngày tạo</Typography>
// //                     <Typography>{new Date(userData.createdAt).toLocaleDateString()}</Typography>
// //                   </Grid>
// //                   <Grid item xs={6}>
// //                     <Typography color="textSecondary">Cập nhật</Typography>
// //                     <Typography>{new Date(userData.updatedAt).toLocaleDateString()}</Typography>
// //                   </Grid>
// //                 </Grid>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           {/* Right Column - Editable Information */}
// //           <Grid item xs={12} md={8}>
// //             <Paper 
// //               elevation={3} 
// //               sx={{ 
// //                 p: 4, 
// //                 borderRadius: 2
// //               }}
// //             >
// //               <Typography variant="h5" sx={{ mb: 4 }}>Thông tin cá nhân</Typography>
// //               <Box component="form" onSubmit={handleSubmit}>
// //                 <Grid container spacing={3}>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="Họ"
// //                       name="fName"
// //                       value={userData.fName}
// //                       onChange={handleInputChange}
// //                       disabled={!isEditing}
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="Tên"
// //                       name="lName"
// //                       value={userData.lName}
// //                       onChange={handleInputChange}
// //                       disabled={!isEditing}
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12}>
// //                     <TextField
// //                       fullWidth
// //                       label="Email"
// //                       name="email"
// //                       value={userData.email}
// //                       onChange={handleInputChange}
// //                       disabled={!isEditing}
// //                       type="email"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12}>
// //                     <TextField
// //                       fullWidth
// //                       label="Số điện thoại"
// //                       name="phone"
// //                       value={userData.phone}
// //                       onChange={handleInputChange}
// //                       disabled={!isEditing}
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12}>
// //                     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //                       <DatePicker
// //                         label="Ngày sinh"
// //                         value={new Date(userData.dob)}
// //                         onChange={handleDateChange}
// //                         disabled={!isEditing}
// //                         renderInput={(params) => (
// //                           <TextField {...params} fullWidth />
// //                         )}
// //                       />
// //                     </LocalizationProvider>
// //                   </Grid>
// //                   {isEditing && (
// //                     <Grid item xs={12}>
// //                       <Button
// //                         type="submit"
// //                         variant="contained"
// //                         fullWidth
// //                         sx={{
// //                           mt: 2,
// //                           backgroundColor: '#f8a488',
// //                           '&:hover': { backgroundColor: '#f7926e' },
// //                           textTransform: 'none'
// //                         }}
// //                       >
// //                         Lưu thay đổi
// //                       </Button>
// //                     </Grid>
// //                   )}
// //                 </Grid>
// //               </Box>
// //             </Paper>
// //           </Grid>
// //         </Grid>
// //       </Container>
// //     </>
// //   );
// // };

// // export default Profile;
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   Breadcrumbs,
//   Link as MuiLink,
//   Grid,
//   Avatar,
//   Button,
//   TextField,
//   IconButton,
//   Card,
//   CardContent,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';
// import EditIcon from '@mui/icons-material/Edit';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { format } from 'date-fns';

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [userData, setUserData] = useState({
//     id: "",
//     email: "",
//     phone: "",
//     role: 0,
//     createdAt: "",
//     updatedAt: "",
//     fName: "",
//     lName: "",
//     dob: "",
//     avt: ""
//   });

//   // Lấy thông tin người dùng từ API khi component mount
//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       axios.get('http://localhost:3000/api/auth/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then(response => {
//           console.log('Response',response.data);
//           console.log('API Response:', response);
//           setUserData(response.data.data);
//           setAvatarPreview(response.data.data.avt);
//         })
//         .catch(error => console.error('Lỗi khi lấy thông tin hồ sơ:', error));
//     }
//   }, []);

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarPreview(reader.result);
//         setUserData(prev => ({ ...prev, avt: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (date) => {
//     setUserData(prev => ({ ...prev, dob: format(date, 'yyyy-MM-dd') }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const token = sessionStorage.getItem('token');
//   //   if (token) {
//   //     axios.put('http://localhost:3000/api/auth/profile', userData, {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     })
//   //       .then(response => {
//   //         console.log('Cập nhật hồ sơ thành công:', response.data);
//   //         setIsEditing(false);
//   //       })
//   //       .catch(error => console.error('Lỗi khi cập nhật hồ sơ:', error));
//   //   }
//   // // };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       const updatedData = {
//         email: userData.email || '',
//         fName: userData.fName || '',
//         lName: userData.lName || '',
//         phone: userData.phone || '',
//         role: userData.role || 0,
//         avt: userData.avt || '',
//         dob: userData.dob || '',
//         password: userData.password || '' // Thêm password
//       };
//       console.log('Dữ liệu gửi lên:', updatedData);
//       axios.put('http://localhost:3000/api/auth/profile', updatedData, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       })
//         .then(response => {
//           console.log('Cập nhật hồ sơ thành công:', response.data);
//           setUserData(response.data.data);
//           setAvatarPreview(response.data.data.avt);
//           setIsEditing(false);
//           setUserData(prev => ({ ...prev, password: "" })); // Xóa mật khẩu sau khi gửi
//         })
//         .catch(error => {
//           console.error('Lỗi khi cập nhật hồ sơ:', error.response || error.message);
//           if (error.response) {
//             console.log('Chi tiết lỗi từ server:', error.response.data);
//           }
//         });
//     } else {
//       console.log('Không tìm thấy token trong localStorage');
//     }
//   };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const token = sessionStorage.getItem('token');
//   //   if (token) {
//   //     console.log('Dữ liệu gửi lên:', userData); // Log dữ liệu gửi lên server
//   //     axios.put('http://localhost:3000/api/auth/profile', userData, {
//   //       headers: { 
//   //         Authorization: `Bearer ${token}`,
//   //         'Content-Type': 'application/json' // Đảm bảo header này có mặt
//   //       }
//   //     })
//   //       .then(response => {
//   //         console.log('Cập nhật hồ sơ thành công:', response.data);
//   //         setUserData(response.data.data);
//   //         setAvatarPreview(response.data.data.avt);
//   //         setIsEditing(false);
//   //       })
//   //       .catch(error => {
//   //         console.error('Lỗi khi cập nhật hồ sơ:', error.response || error.message);
//   //         if (error.response) {
//   //           console.log('Chi tiết lỗi từ server:', error.response.data); // Log phản hồi từ server
//   //         }
//   //       });
//   //   } else {
//   //     console.log('Không tìm thấy token trong localStorage');
//   //   }
//   // };
//   return (
//     <>
//       {/* Hero Section */}
//       <Box
//         sx={{
//           height: '300px',
//           backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           position: 'relative',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           }
//         }}
//       >
//         <Typography 
//           variant="h2" 
//           component="h1" 
//           sx={{ 
//             color: 'white', 
//             fontWeight: 'bold',
//             position: 'relative',
//             zIndex: 1,
//             mb: 2
//           }}
//         >
//           Hồ sơ cá nhân
//         </Typography>
//         <Breadcrumbs 
//           aria-label="breadcrumb" 
//           sx={{ 
//             color: 'white',
//             position: 'relative',
//             zIndex: 1
//           }}
//         >
//           <MuiLink
//             component={Link}
//             to="/"
//             sx={{ 
//               display: 'flex', 
//               alignItems: 'center',
//               color: 'white',
//               textDecoration: 'none',
//               '&:hover': { textDecoration: 'underline' }
//             }}
//           >
//             <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
//             Trang chủ
//           </MuiLink>
//           <Typography color="white">Hồ sơ</Typography>
//         </Breadcrumbs>
//       </Box>

//       {/* Profile Content */}
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <Grid container spacing={4}>
//           {/* Left Column - Avatar and Basic Info */}
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
//               <Box sx={{ position: 'relative', display: 'inline-block' }}>
//                 <Avatar
//                   src={avatarPreview || userData.avt}
//                   sx={{ width: 200, height: 200, margin: '0 auto', mb: 3, border: '4px solid #f8a488' }}
//                 />
//                 {isEditing && (
//                   <label htmlFor="avatar-upload">
//                     <input
//                       accept="image/*"
//                       id="avatar-upload"
//                       type="file"
//                       style={{ display: 'none' }}
//                       onChange={handleAvatarChange}
//                     />
//                     <IconButton
//                       sx={{
//                         position: 'absolute',
//                         bottom: 20,
//                         right: 0,
//                         backgroundColor: '#f8a488',
//                         '&:hover': { backgroundColor: '#f7926e' }
//                       }}
//                       component="span"
//                     >
//                       <CloudUploadIcon sx={{ color: 'white' }} />
//                     </IconButton>
//                   </label>
//                 )}
//               </Box>
              
//               <Typography variant="h4" sx={{ mb: 1 }}>
//                 {userData.fName} {userData.lName}
//               </Typography>
//               <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
//                 {userData.email}
//               </Typography>
              
//               <Button
//                 variant="contained"
//                 startIcon={<EditIcon />}
//                 onClick={() => setIsEditing(!isEditing)}
//                 sx={{
//                   backgroundColor: '#f8a488',
//                   '&:hover': { backgroundColor: '#f7926e' },
//                   textTransform: 'none'
//                 }}
//               >
//                 {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa thông tin'}
//               </Button>
//             </Paper>

//             {/* Account Information Card */}
//             <Card sx={{ mt: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" sx={{ mb: 2 }}>Thông tin tài khoản</Typography>
//                 <Grid container spacing={2}>
//                   {/* <Grid item xs={6}>
//                     <Typography color="textSecondary">ID</Typography>
//                     <Typography>{userData.id}</Typography>
//                   </Grid> */}
//                   <Grid item xs={6}>
//                     <Typography color="textSecondary">Vai trò</Typography>
//                     <Typography>{userData.role === 0 ? 'Khách hàng' : 'Admin'}</Typography>
//                   </Grid>
//                   {/* <Grid item xs={6}>
//                     <Typography color="textSecondary">Ngày tạo</Typography>
//                     <Typography>{new Date(userData.createdAt).toLocaleDateString()}</Typography>
//                   </Grid> */}
//                   <Grid item xs={6}>
//                     <Typography color="textSecondary">Cập nhật</Typography>
//                     <Typography>{new Date(userData.updatedAt).toLocaleDateString()}</Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Right Column - Editable Information */}
//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
//               <Typography variant="h5" sx={{ mb: 4 }}>Thông tin cá nhân</Typography>
//               <Box component="form" onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Họ"
//                       name="fName"
//                       value={userData.fName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Tên"
//                       name="lName"
//                       value={userData.lName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       name="email"
//                       value={userData.email}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       type="email"
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Số điện thoại"
//                       name="phone"
//                       value={userData.phone}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                       <DatePicker
//                         label="Ngày sinh"
//                         value={new Date(userData.dob)}
//                         onChange={handleDateChange}
//                         disabled={!isEditing}
//                         renderInput={(params) => <TextField {...params} fullWidth />}
//                       />
//                     </LocalizationProvider>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Mật khẩu"
//                       name="password"
//                       type="password"
//                       value={userData.password || ""}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       required
//                     />
//                   </Grid>
//                   {isEditing && (
//                     <Grid item xs={12}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         fullWidth
//                         sx={{
//                           mt: 2,
//                           backgroundColor: '#f8a488',
//                           '&:hover': { backgroundColor: '#f7926e' },
//                           textTransform: 'none'
//                         }}
//                       >
//                         Lưu thay đổi
//                       </Button>
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default Profile;
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
  Avatar,
  Button,
  TextField,
  IconButton,
  Card,
  // CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    phone: "",
    role: 0,
    createdAt: "",
    updatedAt: "",
    fName: "",
    lName: "",
    dob: "",
    avt: "",
    password: ""
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          console.log('GET Response:', response.data);
          if (response.data && response.data.data) {
            setUserData(response.data.data);
            setAvatarPreview(response.data.data.avt || '');
          } else {
            console.error('Không có dữ liệu người dùng từ GET:', response.data);
          }
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin hồ sơ:', error.response || error.message);
        });
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setUserData(prev => ({ ...prev, avt: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setUserData(prev => ({ ...prev, dob: format(date, 'yyyy-MM-dd') }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (token) {
      const updatedData = {
        email: userData.email || '',
        fName: userData.fName || '',
        lName: userData.lName || '',
        phone: userData.phone || '',
        role: userData.role || 0,
        avt: userData.avt || '',
        dob: userData.dob || '',
        password: userData.password || ''
      };
      console.log('Dữ liệu gửi lên:', updatedData);
      axios.put('http://localhost:3000/api/auth/profile', updatedData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('PUT Response:', response.data.data);
          if (response.data.data) {
            setUserData(response.data.data);
            setAvatarPreview(response.data.data.avt || '');
            setIsEditing(false);
            setUserData(prev => ({ ...prev, password: "" }));
          } else {
            console.error('Không có dữ liệu người dùng từ PUT:', response.data);
          }
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật hồ sơ:', error.response || error.message);
          if (error.response) {
            console.log('Chi tiết lỗi từ server:', error.response.data);
          }
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '300px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
            mb: 2
          }}
        >
          Hồ sơ cá nhân
        </Typography>
        <Breadcrumbs 
          aria-label="breadcrumb" 
          sx={{ 
            color: 'white',
            position: 'relative',
            zIndex: 1
          }}
        >
          <MuiLink
            component={Link}
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'white',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Trang chủ
          </MuiLink>
          <Typography color="white">Hồ sơ</Typography>
        </Breadcrumbs>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={avatarPreview || (userData?.avt || '')}
                  sx={{ width: 200, height: 200, margin: '0 auto', mb: 3, border: '4px solid #f8a488' }}
                />
                {isEditing && (
                  <label htmlFor="avatar-upload">
                    <input
                      accept="image/*"
                      id="avatar-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleAvatarChange}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 20,
                        right: 0,
                        backgroundColor: '#f8a488',
                        '&:hover': { backgroundColor: '#f7926e' }
                      }}
                      component="span"
                    >
                      <CloudUploadIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </label>
                )}
              </Box>
              
              <Typography variant="h4" sx={{ mb: 1 }}>
                {userData?.fName || ''} {userData?.lName || ''}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                {userData?.email || ''}
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{
                  backgroundColor: '#f8a488',
                  '&:hover': { backgroundColor: '#f7926e' },
                  textTransform: 'none'
                }}
              >
                {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa thông tin'}
              </Button>
            </Paper>

            <Card sx={{ mt: 3 }}>
              {/* <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Thông tin tài khoản</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">ID</Typography>
                    <Typography>{userData?.id || ''}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Vai trò</Typography>
                    <Typography>{userData?.role === 0 ? 'Khách hàng' : 'Admin'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Ngày tạo</Typography>
                    <Typography>{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : ''}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Cập nhật</Typography>
                    <Typography>{userData?.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : ''}</Typography>
                  </Grid>
                </Grid>
              </CardContent> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ mb: 4 }}>Thông tin cá nhân</Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Họ"
                      name="fName"
                      value={userData?.fName || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tên"
                      name="lName"
                      value={userData?.lName || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={userData?.email || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name="phone"
                      value={userData?.phone || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Ngày sinh"
                        value={userData?.dob ? new Date(userData.dob) : null}
                        onChange={handleDateChange}
                        disabled={!isEditing}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mật khẩu"
                      name="password"
                      type="password"
                      value={userData?.password || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                    />
                  </Grid>
                  {isEditing && (
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          backgroundColor: '#f8a488',
                          '&:hover': { backgroundColor: '#f7926e' },
                          textTransform: 'none'
                        }}
                      >
                        Lưu thay đổi
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;