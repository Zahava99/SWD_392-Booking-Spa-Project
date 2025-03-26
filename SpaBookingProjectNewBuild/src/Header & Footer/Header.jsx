import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  InputBase,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../assets/logo-image/logo.jpg";
import axios from "axios";

const Header = () => {
  const [serviceAnchorEl, setServiceAnchorEl] = useState(null);
  //
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State theo dõi trạng thái đăng nhập
  const [userName, setUserName] = useState(""); // State lưu tên người dùng
  //
  const navigate = useNavigate();
  //
  // useEffect(() => {
  //   const token = sessionStorage.getItem('token')
  //   if (token) {
  //     axios.get('http://160.30.137.106:3000/api/auth/profile', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //       .then(response => {
  //         setIsLoggedIn(true);
  //         setUserName(response.data.data.fName || 'Người dùng');
  //         // window.location.reload();
  //       })
  //       .catch(() => {
  //         setIsLoggedIn(false);
  //         setUserName('');
  //       });
  //   }
  // }, [])
  useEffect(() => {
    const updateAuthState = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        axios
          .get("http://160.30.137.106:3000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setIsLoggedIn(true);
            setUserName(response.data.data.fName || "Người dùng");
          })
          .catch(() => {
            setIsLoggedIn(false);
            setUserName("");
          });
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    updateAuthState();
    window.addEventListener("authChange", updateAuthState);

    return () => {
      window.removeEventListener("authChange", updateAuthState);
    };
  }, []);
  const handleClick = (event, setAnchorEl) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (setAnchorEl) => {
    setAnchorEl(null);
  };

  //
  const handleLogout = () => {
    // Logic đăng xuất: xóa token, reset state
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
    window.location.reload();
  };
  //
  return (
    <AppBar
      position="static"
      color="default"
      sx={{ boxShadow: 1, backgroundColor: "white" }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
          </Link>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ color: "#000", textTransform: "none", fontWeight: "medium" }}
          >
            Trang chủ
          </Button>

          <Button
            color="inherit"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => handleClick(e, setServiceAnchorEl)}
            sx={{ color: "#000", textTransform: "none", fontWeight: "medium" }}
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
              to="/massage"
              onClick={() => handleClose(setServiceAnchorEl)}
            >
              Massage
            </MenuItem>
            <MenuItem
              component={Link}
              to="/facial"
              onClick={() => handleClose(setServiceAnchorEl)}
            >
              Facial
            </MenuItem>
            <MenuItem
              component={Link}
              to="/body-treatment"
              onClick={() => handleClose(setServiceAnchorEl)}
            >
              Body Treatment
            </MenuItem>
            <MenuItem
              component={Link}
              to="/aromatherapy"
              onClick={() => handleClose(setServiceAnchorEl)}
            >
              Aromatherapy
            </MenuItem>
          </Menu>

          <Button
            color="inherit"
            component={Link}
            to="/blog"
            sx={{ color: "#000", textTransform: "none", fontWeight: "medium" }}
          >
            Blog
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/about"
            sx={{ color: "#000", textTransform: "none", fontWeight: "medium" }}
          >
            Về chúng tôi
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{ color: "#000", textTransform: "none", fontWeight: "medium" }}
          >
            Liên hệ
          </Button>
          {isLoggedIn ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: "#000",
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              Đăng xuất
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                color: "#000",
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>

        {/* <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
          <InputBase
            placeholder="Tìm Kiếm..."
            sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box> */}
        {/* Thanh tìm kiếm hoặc tên người dùng */}
        {/* {isLoggedIn ? (
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
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 2,
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <InputBase
              placeholder='Tìm Kiếm...'
              sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Box>
        )} */}
        {isLoggedIn && (
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            sx={{
              ml: 2,
              color: "#000",
              textTransform: "none",
              fontWeight: "medium",
            }}
          >
            {userName || "Người dùng"}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
