// // import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
// import logo from "../assets/logo-image/logo.jpg"
// const Header = () => {
//   return (
//     <AppBar position='static'>
//       <Toolbar>
//       <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
//           <Link to="/">
//             <img src={logo} alt="logo" style={{ width: "100px", height: "auto" }} />
//           </Link>
//         </Box>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           LUXURY
//         </Typography>
//         {/* <Button color="inherit">Home</Button>
//         <Button color="inherit">About Us</Button>
//         <Button color="inherit">Blog</Button>
//         <Button color="inherit">Shop</Button>
//         <Button color="inherit">Contact Us</Button>
//         <Button color="inherit" variant="outlined">Book Now</Button> */}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
// //     <AppBar position="static" color="default">
// //       <Toolbar>
//         // <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
//         //   <Link to="/">
//         //     <img src={logo} alt="logo" style={{ width: "100px", height: "auto" }} />
//         //   </Link>
//         // </Box>

// //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //           <Button color="inherit" component={Link} to="/">Trang chủ</Button>

// //           <Button
// //             color="inherit"
// //             onClick={(e) => handleClick(e, setServiceAnchorEl)}
// //           >
// //             Dịch vụ Spa
// //           </Button>
// //           <Menu
// //             anchorEl={serviceAnchorEl}
// //             open={Boolean(serviceAnchorEl)}
// //             onClose={() => handleClose(setServiceAnchorEl)}
// //           >
// //             <MenuItem component={Link} to="/Appointment" onClick={() => handleClose(setServiceAnchorEl)}>Test1</MenuItem>
// //             <MenuItem component={Link} to="/Thiết_kế_nội_thất_nhà_phố" onClick={() => handleClose(setServiceAnchorEl)}>Test2</MenuItem>
// //             <MenuItem component={Link} to="/Thiết_kế_nội_thất_biệt_thự" onClick={() => handleClose(setServiceAnchorEl)}>Test3</MenuItem>
// //             <MenuItem component={Link} to="/Thiết_kế_nội_thất_văn_phòng" onClick={() => handleClose(setServiceAnchorEl)}>Test4</MenuItem>
// //           </Menu>

// //           <Button color="inherit" component={Link} to="/Dự_án_đã_thi_công">Blog</Button>
// //           <Button color="inherit" component={Link} to="/Blog">Về chúng tôi</Button>
// //           <Button color="inherit" component={Link} to="/Liên_Hệ">Liên hệ</Button>

// //           {isLoggedIn && (
// //             <>
// //               <Button
// //                 color="inherit"
// //                 onClick={(e) => handleClick(e, setAccountAnchorEl)}
// //               >
// //                 Tài khoản
// //               </Button>
// //               <Menu
// //                 anchorEl={accountAnchorEl}
// //                 open={Boolean(accountAnchorEl)}
// //                 onClose={() => handleClose(setAccountAnchorEl)}
// //               >
// //                 <MenuItem component={Link} to="/Customers_Request_Management" onClick={() => handleClose(setAccountAnchorEl)}>Hồ sơ</MenuItem>
// //                 <MenuItem onClick={onLogout}>Đăng xuất</MenuItem>
// //               </Menu>
// //             </>
// //           )}

// //           {!isLoggedIn && (
// //             <Button color="inherit" component={Link} to="/Đăng_nhập">Đăng nhập</Button>
// //           )}
// //         </Box>

// //         <Searchbar />
// //       </Toolbar>
// //     </AppBar>
// //   );
// // }
import { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, InputBase, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from "../assets/logo-image/logo.jpg";

const Header = () => {
  const [serviceAnchorEl, setServiceAnchorEl] = useState(null);
  
  const handleClick = (event, setAnchorEl) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (setAnchorEl) => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 1, backgroundColor: 'white' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Trang chủ
          </Button>

          <Button
            color="inherit"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => handleClick(e, setServiceAnchorEl)}
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Dịch vụ Spa
          </Button>
          <Menu
            anchorEl={serviceAnchorEl}
            open={Boolean(serviceAnchorEl)}
            onClose={() => handleClose(setServiceAnchorEl)}
          >
            <MenuItem component={Link} to="/massage" onClick={() => handleClose(setServiceAnchorEl)}>Massage</MenuItem>
            <MenuItem component={Link} to="/facial" onClick={() => handleClose(setServiceAnchorEl)}>Facial</MenuItem>
            <MenuItem component={Link} to="/body-treatment" onClick={() => handleClose(setServiceAnchorEl)}>Body Treatment</MenuItem>
            <MenuItem component={Link} to="/aromatherapy" onClick={() => handleClose(setServiceAnchorEl)}>Aromatherapy</MenuItem>
          </Menu>

          <Button 
            color="inherit" 
            component={Link} 
            to="/blog"
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Blog
          </Button>
          
          <Button 
            color="inherit" 
            component={Link} 
            to="/about"
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Về chúng tôi
          </Button>
          
          <Button 
            color="inherit" 
            component={Link} 
            to="/contact"
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Liên hệ
          </Button>

          <Button 
            color="inherit" 
            component={Link} 
            to="/login"
            sx={{ color: '#000', textTransform: 'none', fontWeight: 'medium' }}
          >
            Đăng nhập
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
          <InputBase
            placeholder="Tìm Kiếm..."
            sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;