import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

function ProductRow({
  productID,
  productname,
  describe,
  size,
  unit,
  mass,
  unitPrice,
  quantity,
  onQuantityChange,
  onDelete,
}) {
  return (
    <tr className="product-row" data-productID={productID}>
      <td>{productname}</td>
      <td>{describe}</td>
      <td>
        Long: {size.long}, Wide: {size.wide}, Height: {size.height}
      </td>
      <td>{unit}</td>
      <td>{mass}</td>
      <td>{unitPrice.toLocaleString()}₫</td>
      <td>
        <input
          type="number"
          className="quantity productSelect"
          value={quantity}
          min="1"
          onChange={onQuantityChange}
          readOnly
        />
      </td>
      <td>
        <button className="AddButton m-0 ms-1" onClick={onDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
}

export default function BaoGia() {
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [productData, setProductData] = useState({});
  
  useEffect(() => {
    axios
      .get("https://65e5f5e5d7f0758a76e7d715.mockapi.io/baogia")
      .then((response) => {
        setProductData(response.data);
        const options = Object.keys(response.data).map((key) => (
          <option key={key} value={key}>
            {response.data[key].name}
          </option>
        ));
        setProductOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  useEffect(() => {
    updateTotalPrice();
  }, [productList]);

  function updateTotalPrice() {
    let total = 0;
    productList.forEach(({ product, quantity }) => {
      const unitPrice = productData[product].unit_price;
      total += quantity * unitPrice;
    });
    setTotalPrice(total);
    localStorage.setItem("productList", JSON.stringify(productList));
  }

  function handleProductChange(event) {
    setSelectedProduct(event.target.value);
  }

  function addProductRow() {
    const selectedProduct = document.getElementById("selectProduct").value;
    const quantity = parseInt(document.getElementById("quantity").value) || 0;

    if (quantity < 0) {
      alert("Vui lòng nhập số lớn hơn 0!");
      return;
    }

    const existingIndex = productList.findIndex(
      (item) => item.product === selectedProduct
    );

    if (existingIndex !== -1) {
      const updatedList = [...productList];
      updatedList[existingIndex].quantity += quantity;
      setProductList(updatedList);
    } else {
      const newRow = {
        product: selectedProduct,
        quantity: quantity,
      };
      setProductList([...productList, newRow]);
    }
    updateTotalPrice();
  }

  function removeProductRow(product) {
    const updatedList = productList.filter((item) => item.product !== product);
    setProductList(updatedList);
    updateTotalPrice();
    localStorage.setItem("productList", JSON.stringify(updatedList));
  }

  return (
    <div className="container-fluid">
      <div className="LogoAndTitle">
        <div className="dropdown-divider border-black mb-5"></div>
        <div className="Title">Bảng báo giá</div>
      </div>
      <section id="infoAndCustomer">
        <div className="d-flex justify-content-between">
          <div className="leftText providerInfo">
            <div className="providerInfoContent">
              <h4>
                <strong>Email</strong>: NotRealEmail@gmail.com
              </h4>
            </div>
            <div className="providerInfoContent">
              <h4>
                <strong>Số điện thoại</strong>: 0243 5536750
              </h4>
            </div>
            <div className="providerInfoContent">
              <h4>
                <strong>Showroom</strong>: Av. A Phillips, 1, Zona Industrial
                San Vicente
              </h4>
            </div>
            <div className="providerInfoContent">
              <h4>
                <strong>Xưởng</strong>: Av. A Phillips, 1, Zona Industrial San
                Vicente
              </h4>
            </div>
          </div>
          <div className="rightText providerInfo d-flex flex-column CustomerInput ">
            <div className="d-flex align-items-center">
              <strong>Khách Hàng:</strong>
              <input type="text" placeholder="Nhập tên khách hàng" />
            </div>
            <div className="d-flex align-items-center">
              <strong>Số điện thoại:</strong>
              <input type="text" placeholder="Nhập số điện thoại" />
            </div>
            <div className="d-flex align-items-center">
              <strong>Địa chỉ công trình:</strong>
              <input type="text" placeholder="Nhập địa chỉ công trình" />
            </div>
            <div className="d-flex align-items-center">
              <strong>Ngày soạn báo giá:</strong>
              <input type="text" placeholder="Nhập ngày soạn báo giá" />
            </div>
          </div>
        </div>
      </section>
      <section id="quotation">
        <form className="d-flex">
          <div className="d-flex w-100 justify-content-between">
            <label
              htmlFor="selectProduct"
              className="SelectProduct w-100 justify-content-between me-1 align-items-center"
            >
              Chọn sản phẩm:
              <select
                id="selectProduct"
                value={selectedProduct}
                onChange={handleProductChange}
                className="form-select productSelect fs-6"
              >
                {productOptions}
              </select>
            </label>
            <label
              htmlFor="quantity"
              className="SelectProduct w-100 align-items-center"
            >
              Nhập số lượng:
              <input
                type="number"
                id="quantity"
                min="1"
                defaultValue="1"
                className="w-50 productSelect m-0 ms-1"
              />
              <button
                type="button"
                className="w-25 fs-6 fw-normal AddProduct m-0 ms-1"
                onClick={addProductRow}
              >
                Thêm sản phẩm
              </button>
            </label>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>Sản Phẩm</th>
              <th>Mô tả</th>
              <th>Kích thước</th>
              <th>Loại nhà</th>
              <th>Khối lượng</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="product-table-body">
            {productList.map((item, index) => (
              <ProductRow
                key={index}
                productID={item.product}
                productname={productData[item.product].name}
                describe={productData[item.product].describe}
                size={productData[item.product].size}
                unit={productData[item.product].unit}
                mass={productData[item.product].mass}
                unitPrice={productData[item.product].unit_price}
                quantity={item.quantity}
                onQuantityChange={(e) => {
                  const updatedList = [...productList];
                  updatedList[index].quantity = parseInt(e.target.value);
                  setProductList(updatedList);
                  updateTotalPrice();
                }}
                onDelete={() => removeProductRow(item.product)}
              />
            ))}
          </tbody>
        </table>

        <p className="TotalPrice">
          Tổng giá tiền: {totalPrice.toLocaleString()}₫{" "}
        </p>
        <button type="button" className="Finish_button">
          Submit
        </button>
        <div className="dropdown-divider border-black mb-5"></div>
      </section>
    </div>
  );
}
