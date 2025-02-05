import React from "react";
import { Table, Button } from "antd";

const ProductTable = ({ products, addToCart }) => {
  const productColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.product_image}
            alt={record.product_name}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span>{record.product_name}</span>
        </div>
      ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Counter",
      // dataIndex: ["counterId", "counterName"],
      dataIndex: "counter",
      key: "counter",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => record.type.type,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => new Intl.NumberFormat("vi-VN").format(price) + " VNĐ",
    },
    {
      title: "Available Quantity",
      dataIndex: "available_quantity",
      key: "available_quantity",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => addToCart(record)}>Add to Cart</Button>
      ),
    },
  ];

  return (
    <Table
      style={{ marginTop: "20px" }}
      columns={productColumns}
      dataSource={products}
      pagination={{ pageSize: 4 }}
    />
  );
};

export default ProductTable;
