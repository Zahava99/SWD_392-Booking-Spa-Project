// import React, { useState } from 'react'

// export default function Staff () {
//   const [customerInfo, setCustomerInfo] = useState({
//     name: "",
//     phoneNumber: "",
//     address: "",
//     quotationDate: "",
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setCustomerInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     console.log("Customer Info:", customerInfo);

//     setCustomerInfo({
//       name: "",
//       phoneNumber: "",
//       address: "",
//       quotationDate: "",
//     });
//   }

//   return (
//     <div className='container-fluid'>
//       <h2>Trang nhân viên</h2>
//       <form onSubmit={handleSubmit}>
//         <section className='d-flex justify-content-between'>
//         <div className='leftText providerInfo'>
//           <div className='providerInfoContent'>
//             <h4>
//               <strong>Email</strong>: NotRealEmail@gmail.com
//             </h4>
//           </div>
//           <div className='providerInfoContent'>
//             <h4>
//               <strong>Số điện thoại</strong>: 0243 5536750
//             </h4>
//           </div>
//           <div className='providerInfoContent'>
//             <h4>
//               <strong>Showroom</strong>: Av. A Phillips, 1, Zona Industrial San
//               Vicente
//             </h4>
//           </div>
//           <div className='providerInfoContent'>
//             <h4>
//               <strong>Xưởng</strong>: Av. A Phillips, 1, Zona Industrial San
//               Vicente
//             </h4>
//           </div>
//         </div>
//         <div className='rightText providerInfo d-flex flex-column CustomerInput'>
//         <div className="customerNameField d-flex align-items-center">
//           <label className="customerName" htmlFor="name">
//             Tên Khách Hàng:
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={customerInfo.name}
//             onChange={handleChange}
//             placeholder="Nhập tên khách hàng"
//             required
//           />
//         </div>
//         <div className="SoDienThoaiField  d-flex align-items-center">
//           <label className="customerName" htmlFor="phoneNumber">
//             Số Điện Thoại:
//           </label>
//           <input
//             type="text"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={customerInfo.phoneNumber}
//             onChange={handleChange}
//             placeholder="Nhập số điện thoại"
//             required
//           />
//         </div>
//         <div className="DiaChiCongTrinhField  d-flex align-items-center">
//           <label className="customerName" htmlFor="address">
//             Địa Chỉ Công Trình:
//           </label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={customerInfo.address}
//             onChange={handleChange}
//             placeholder="Nhập địa chỉ công trình"
//             required
//           />
//         </div>
//         <div className="NgaySoanBaoGiaField d-flex align-items-center">
//           <label className="customerName" htmlFor="quotationDate">
//             Ngày Soạn Báo Giá:
//           </label>
//           <input
//             type="text"
//             id="quotationDate"
//             name="quotationDate"
//             value={customerInfo.quotationDate}
//             onChange={handleChange}
//             placeholder="Nhập ngày soạn báo giá"
//             required
//           />
//         </div>
//         </div>
//         </section>
//         <section className='QuotationSummary'>
//         <h2>Bảng báo giá của khách hàng</h2>
//           <div className='QuotationSummaryContent'>
//             <img src='assets/images/Screenshot 2024-02-28 235608.png' className='img-fluid'/>
//           </div>
//         </section>
//         <div className='HomepageBody-btn'>
//           <button
//             type='submit'
//             className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button rounded'
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function Staff() {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    quotationDate: "",
  });
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu từ local storage khi trang được load
    const storedProductList =
      JSON.parse(localStorage.getItem("productList")) || [];
    setProductList(storedProductList);
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Customer Info:", customerInfo);

    localStorage.removeItem("productList");

    setCustomerInfo({
      name: "",
      phoneNumber: "",
      address: "",
      quotationDate: "",
    });
  }

  return (
    <div className="container-fluid">
      <h2>Trang nhân viên</h2>
      <form onSubmit={handleSubmit}>
        <section className="d-flex justify-content-between">
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
          <div className="rightText providerInfo d-flex flex-column CustomerInput">
            <div className="customerNameField d-flex align-items-center">
              <label className="customerName" htmlFor="name">
                Tên Khách Hàng:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleChange}
                placeholder="Nhập tên khách hàng"
                required
              />
            </div>
            <div className="SoDienThoaiField  d-flex align-items-center">
              <label className="customerName" htmlFor="phoneNumber">
                Số Điện Thoại:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={customerInfo.phoneNumber}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div className="DiaChiCongTrinhField  d-flex align-items-center">
              <label className="customerName" htmlFor="address">
                Địa Chỉ Công Trình:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ công trình"
                required
              />
            </div>
            <div className="NgaySoanBaoGiaField d-flex align-items-center">
              <label className="customerName" htmlFor="quotationDate">
                Ngày Soạn Báo Giá:
              </label>
              <input
                type="text"
                id="quotationDate"
                name="quotationDate"
                value={customerInfo.quotationDate}
                onChange={handleChange}
                placeholder="Nhập ngày soạn báo giá"
                required
              />
            </div>
          </div>
        </section>
        <section className="QuotationSummary">
          <h2>Bảng báo giá của khách hàng</h2>
          <div className="QuotationSummaryContent">
            <img
              src="assets/images/Screenshot 2024-02-28 235608.png"
              className="img-fluid"
            />
          </div>
        </section>
        <div className="HomepageBody-btn">
          <button
            type="submit"
            className="btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button rounded mb-5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
