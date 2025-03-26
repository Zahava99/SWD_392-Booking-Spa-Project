import { useState, useEffect } from "react";
import axios from "axios";
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
  Snackbar,
  Alert,
  Modal,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import EventIcon from "@mui/icons-material/Event";
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
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [openModal, setOpenModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [services, setServices] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("GET Response:", response.data);
          if (response.data && response.data.data) {
            console.log("Danh sách người dùng:", response.data.data);

            setUserData(response.data.data);
            setAvatarPreview(response.data.data.avt || "");
          } else {
            console.error("Không có dữ liệu người dùng từ GET:", response.data);
          }
        })
        .catch((error) => {
          console.error(
            "Lỗi khi lấy thông tin hồ sơ:",
            error.response || error.message
          );
        });
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setUserData((prev) => ({ ...prev, avt: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setUserData((prev) => ({ ...prev, dob: format(date, "yyyy-MM-dd") }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (token) {
      const updatedData = {
        email: userData.email || "",
        fName: userData.fName || "",
        lName: userData.lName || "",
        phone: userData.phone || "",
        role: userData.role || 0,
        avt: userData.avt || "",
        dob: userData.dob || "",
        password: userData.password || "",
      };
      console.log("Dữ liệu gửi lên:", updatedData);
      axios
        .put("http://localhost:3000/api/auth/profile", updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("PUT Response:", response.data.message);
          if (response.data.message) {
            setSnackbarMessage("Cập nhật hồ sơ thành công!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
          } else {
            console.error("Không có dữ liệu người dùng từ PUT:", response.data);
          }
        })
        .catch((error) => {
          console.error(
            "Lỗi khi cập nhật hồ sơ:",
            error.response || error.message
          );
          if (error.response) {
            console.log("Chi tiết lỗi từ server:", error.response.data);
          }
          setSnackbarMessage("Cập nhật thất bại. Vui lòng thử lại.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    fetchAppointments();
  };

  const fetchAppointments = () => {
    setLoadingAppointments(true);
    const token = sessionStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Danh sách cuộc hẹn:", response.data);

        setAppointments(response.data || []);
        setLoadingAppointments(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách cuộc hẹn:", error);
        setLoadingAppointments(false);
      });
  };

  useEffect(() => {
    if (userData && appointments.length > 0) {
      const filtered = appointments.filter((app) => {
        const customerIds = app.customer.flat();

        return customerIds.includes(userData.id);
      });

      setFilteredAppointments(filtered);
    }
  }, [userData, appointments]);

  useEffect(() => {
    const fetchServices = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/service", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Dữ liệu dịch vụ:", response.data);
        if (response.data && response.data.data) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      }
    };


    fetchServices();
  }, []);

  const findServiceNameById = (id) => {
    console.log("Danh services:", services);
    const service = services.find((service) => service.id === id);
    console.log("Service:", service);
    return service ? service.name : "Không tìm thấy dịch vụ";
  };

  const statusMap = {
    0: "PENDING",
    1: "ACCEPTED",
    2: "CANCELED",
    3: "FINISHED",
  };
  const statusColors = {
    0: "orange",
    1: "green",
    2: "red",
    3: "blue",
  };
  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          height: "300px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: "white",
            fontWeight: "bold",
            position: "relative",
            zIndex: 1,
            mb: 2,
          }}
        >
          Hồ sơ cá nhân
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            color: "white",
            position: "relative",
            zIndex: 1,
          }}
        >
          <MuiLink
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
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
            <Paper
              elevation={3}
              sx={{ p: 4, borderRadius: 2, textAlign: "center" }}
            >
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={avatarPreview || userData?.avt || ""}
                  sx={{
                    width: 200,
                    height: 200,
                    margin: "0 auto",
                    mb: 3,
                    border: "4px solid #f8a488",
                  }}
                />
                {isEditing && (
                  <label htmlFor="avatar-upload">
                    <input
                      accept="image/*"
                      id="avatar-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleAvatarChange}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 20,
                        right: 0,
                        backgroundColor: "#f8a488",
                        "&:hover": { backgroundColor: "#f7926e" },
                      }}
                      component="span"
                    >
                      <CloudUploadIcon sx={{ color: "white" }} />
                    </IconButton>
                  </label>
                )}
              </Box>

              <Typography variant="h4" sx={{ mb: 1 }}>
                {userData?.fName || ""} {userData?.lName || ""}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                {userData?.email || ""}
              </Typography>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{
                  backgroundColor: "#f8a488",
                  "&:hover": { backgroundColor: "#f7926e" },
                  textTransform: "none",
                }}
              >
                {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
              </Button>
              {/* Button mở Modal danh sách Appointment
              <Button
                variant='contained'
                startIcon={<EventIcon />}
                onClick={
                }
                sx={{
                  backgroundColor: '#f8a488',
                  '&:hover': { backgroundColor: '#f7926e' },
                  textTransform: 'none',
                  marginTop: '20px'
                }}
              >
                Xem lịch hẹn
              </Button> */}
            </Paper>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Thông tin lịch hẹn
                </Typography>
                <Button
                  variant='contained'
                  startIcon={<EventIcon />}
                  onClick={handleOpenModal}
                  sx={{
                    backgroundColor: '#f8a488',
                    '&:hover': { backgroundColor: '#f7926e' },
                    textTransform: 'none'
                  }}
                >
                  Xem lịch hẹn
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Thông tin cá nhân
              </Typography>
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
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
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
                          backgroundColor: "#f8a488",
                          "&:hover": { backgroundColor: "#f7926e" },
                          textTransform: "none",
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
      {/* Modal hiển thị danh sách cuộc hẹn */}
      {/* <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ p: 4, width: 400, maxHeight: 500, overflowY: 'auto' }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Danh sách cuộc hẹn
          </Typography>

          {loadingAppointments ? (
            <CircularProgress />
          ) : appointments.length === 0 ? (
            <Typography>Không có cuộc hẹn nào.</Typography>
          ) : (
            <List>
              {appointments.map((appointment, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Dịch vụ: ${appointment.service}`}
                    secondary={`Ngày: ${appointment.date}`}
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Button
            onClick={() => setOpenModal(false)}
            variant='contained'
            fullWidth
            sx={{ mt: 2 }}
          >
            Đóng
          </Button>
        </Paper>
      </Modal> */}
      {/* <Button
        variant='contained'
        color='primary'
        onClick={() => setOpenModal(true)}
      >
        Xem cuộc hẹn của tôi
      </Button> */}

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Danh sách cuộc hẹn</DialogTitle>
        <DialogContent>
          <List>
            {filteredAppointments.map((app, index) => {
              const serviceIds = app.services[0];
              const serviceNames = serviceIds
                .map((id) => findServiceNameById(id))
                .join(", ");
              console.log("app.services:", app.services);
              console.log("serviceId:", app.services[0][0]);
              console.log(
                "serviceName:",
                findServiceNameById(app.services[0][0])
              );
          {/* <List>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(app => (
                <ListItem key={app._id}>
                  <ListItemText
                    // primary={`Khách hàng: ${app.customerName}`}
                    secondary={`Dịch vụ: ${getServiceName(app.services)} | Tổng: ${
                      app.total
                    } | Trạng thái: ${app.status}`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary='Không có cuộc hẹn nào.' />
              </ListItem>
            )}
          </List> */}
          {/* <List>
            {filteredAppointments.map((app, index) => (
              <ListItem key={index}>
                <ListItemText
                  // primary={`Dịch vụ: ${findServiceNameById(app.service)}`}
                  primary={`Dịch vụ: ${
                    console.log("app.services:", app.services),
                    app.services.map(
                    id => findServiceNameById(id)).join(', ')}`}
                  secondary={`Thời gian: ${new Date(
                    app.date
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List> */}
          <List>
            {filteredAppointments.map((app, index) => {
              const serviceIds = app.services[0] // Lấy mảng ID: ['67d40c48b9bd59b6d080263e']
              const serviceNames = serviceIds
                .map(id => findServiceNameById(id))
                .join(', ') // Lấy tên và nối bằng dấu phẩy
              console.log('app.services:', app.services)
              console.log('serviceId:', app.services[0][0])
              console.log(
                'serviceName:',
                findServiceNameById(app.services[0][0])
              )
              return (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Dịch vụ: ${serviceNames}`}
                    secondary={
                      <>
                        Thời gian: {new Date(app.date).toLocaleString()} | Trạng
                        thái:{" "}
                        <span
                          style={{ color: statusColors[app.status] || "black" }}
                        >
                          {statusMap[app.status] || "UNKNOWN"}
                        </span>
                      </>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Đóng
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
