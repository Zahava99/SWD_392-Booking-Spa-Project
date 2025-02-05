import React from "react";
import { Dropdown, Menu, Space, Table, Tag } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function OrderList({ ordersData, loading }) {
  const navigate = useNavigate();
  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => navigate(`/order/${record.orderId}`)}
      >
        <span>View Detail </span>
      </Menu.Item>
      {/* <Menu.Item key="edit">
        <span>Edit User</span>
      </Menu.Item> */}
    </Menu>
  );

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Order Code",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Create by",
      dataIndex: "createBy",
      key: "createBy",
    },
    // {
    //   title: "Counter",
    //   dataIndex: "counter",
    //   key: "counter",
    // },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: <div style={{ textAlign: "center" }}>Type</div>,
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <div style={{ textAlign: "center" }}>
          <Tag
            color={
              type === "sell"
                ? "#d7b14e"
                : type === "buy"
                ? "green"
                : type === "buy back"
                ? "blue"
                : "gray"
            }
          >
            {type === "sell"
              ? "SELL"
              : type === "buy"
              ? "BUY"
              : type === "buy back"
              ? "BUY BACK"
              : "UNKNOWN"}
          </Tag>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      dataIndex: "order_status",
      key: "order_status",
      render: (order_status) => (
        <div style={{ textAlign: "center" }}>
          <Tag
            color={
              order_status === 0
                ? "#d7b14e"
                : order_status === 1
                ? "green"
                : order_status === 2
                ? "red"
                : "gray"
            }
          >
            {order_status === 0
              ? "Paying"
              : order_status === 1
              ? "Complete"
              : order_status === 2
              ? "Cancel"
              : "UNKNOWN"}
          </Tag>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Payment</div>,
      dataIndex: "payment_method",
      key: "payment_method",
      render: (payment_method) => (
        <div style={{ textAlign: "center" }}>
          <Tag
            color={
              payment_method === 0
                ? "#d7b14e"
                : payment_method === 1
                ? "#aa146a"
                : "gray"
            }
          >
            {payment_method === 0
              ? "Cash"
              : payment_method === 1
              ? "Momo"
              : "UNKNOWN"}
          </Tag>
        </div>
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 60,
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={() => actionsMenu(record)} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <MoreHorizIcon style={{ color: "#333333" }} />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={ordersData}
        columns={columns}
        pagination={{
          pageSize: 5,
          showSizeChanger: false, // Ẩn phần chọn số lượng mục hiển thị trên mỗi trang
        }}
        loading={loading}
      />
    </div>
  );
}
