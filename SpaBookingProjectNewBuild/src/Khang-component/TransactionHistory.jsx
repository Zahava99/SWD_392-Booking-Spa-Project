import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = sessionStorage.getItem("token"); // Điều chỉnh key theo hệ thống của bạn

        // Kiểm tra xem token có tồn tại không
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }
        const response = await axios.get("https://mcmapp.online/api/product-payment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Lọc chỉ các giao dịch có address là "Payment Success"
        const successTransactions = response.data.filter(
          (transaction) => transaction.address !== "Payment Success"
        );
        console.log("Transactions:", successTransactions);
        
        setTransactions(successTransactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <Typography>Đang tải dữ liệu...</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Lịch sử giao dịch
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell>Số tiền</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Ngày tạo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{transaction.orderCode}</TableCell>
              <TableCell>{transaction.totalAmount.toLocaleString()} VNĐ</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.address}</TableCell>
              <TableCell>{transaction.status === 0 ? "Thành công" : "Thất bại"}</TableCell>
              <TableCell>
                {new Date(transaction.createdAt).toLocaleDateString("vi-VN")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionHistory;