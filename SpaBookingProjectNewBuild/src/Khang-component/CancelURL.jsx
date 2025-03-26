// import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CancelPayment = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "10vw", marginBottom: "10vw" }}>
      <Box
        sx={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Thanh toán bị hủy
        </Typography>
        <Typography variant="body1" gutterBottom>
          Giao dịch của bạn đã bị hủy. Nếu đây là lỗi, vui lòng thử lại.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ marginTop: "20px" }}
        >
          Quay lại thanh toán
        </Button>
      </Box>
    </Container>
  );
};

export default CancelPayment;
