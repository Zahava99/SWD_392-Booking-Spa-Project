// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import logo from "../../assets/images/logo.jpg";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import emailjs from "emailjs-com";

// function ProductRow ({
//   productID,
//   productName,
//   description,
//   size,
//   unit,
//   unitPrice,
//   areaSquareValue,
//   quantity,
//   houseTypeOptions,
//   selectedHouseType,
//   onQuantityChange,
//   onDelete
// }) {
//   const selectedHouseTypeInfo = houseTypeOptions[selectedHouseType] || {}
//   // const houseTypePrice = selectedHouseTypeInfo[0].houseTypePrice || 'HI...'
//   // const houseTypePrice = selectedHouseTypeInfo|| 'HI...'
//   console.log("productName",productName);
//   console.log('selectedHouseTypeInfo',selectedHouseTypeInfo);
//   return (
//     <tr className='product-row' data-productid={productID}>
//       <td>{productName}</td>
//       <td>{description}</td>
//       <td>
//         <input
//           type='number'
//           className='quantity productSelect'
//           value={areaSquareValue}
//           min='1'
//           onChange={onQuantityChange}
//           readOnly
//         />
//         {/* {size.SQM} */}
//       </td>
//       <td>{selectedHouseType}</td>
//       <td>
//         <button className='AddButton m-0 ms-1' onClick={onDelete}>
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//       </td>
//     </tr>
//   )
// }

// export default function BaoGia() {
//   const [productList, setProductList] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [productOptions, setProductOptions] = useState([]);
//   const [areaSquareValue, setAreaSquareValue] = useState('')
//   const [apiData, setApiData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [customerName, setCustomerName] = useState('')
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [projectAddress, setProjectAddress] = useState('')
//   const [quotationDate, setQuotationDate] = useState('')
//   const [formSubmitted, setFormSubmitted] = useState(false)
//   const [requestId, setRequestId] = useState('')
//   const [houseTypeOptions, setHouseTypeOptions] = useState({})
//   const [selectedHouseType, setSelectedHouseType] = useState('')
//   // const { id } = useParams();
//   const { id } = useParams();
//   console.log('quotationId',id);
//   useEffect(() => {
//     axios
//       .get(
//         // 'https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDABaoGiaCustomer'
//         'https://localhost:7224/api/ComboDesign/GetAllCombo'
//       )
//       .then(response => {
//         setApiData(response.data)
//         setLoading(false)
//         console.log('SetApiData',response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error)
//         setLoading(false)
//       })
//   }, [])

//   useEffect(() => {
//     axios
//       .get(
//         // `https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDACustomerSubmit/${quotationId}`
//         `https://localhost:7224/api/ConstructionPriceQuotation/GetConstructionPriceQuotationById?id=${id}`
//       )
//       .then(response => {
//         const {
//           customerName,
//           phoneNumber,
//           projectAddress,
//           quotationDate,
//           requests
//         } = response.data
//         console.log('CustomerInfo',id)
//         setCustomerName(customerName)
//         setPhoneNumber(phoneNumber)
//         setProjectAddress(projectAddress)
//         setQuotationDate(quotationDate)
//         setProductList(
//           requests.map(product => ({
//             // product: product.Id,
//             areaSquareValue: product.areaSquareValue,
//             houseType: product.houseSType,
//             houseTypePrice: product.houseTypePrice
//           }))
//         )
//         console.log('SetProducts',requests);
//         console.log('SetProductALL',response.data);
//         // console.log('SetProductList',productList);
//       })
//       .catch(error => {
//         console.error('Error fetching customer data:', error)
//       })
//   }, [])

//   useEffect(() => {
//     if (apiData.length > 0 && selectedProduct === '') {
//       setSelectedProduct(apiData[0].Id)
//       console.log(apiData[0].Id)
//     }
//     const options = apiData.map(product => (
//       <option key={product.Id} value={product.Id}>
//         {product.name}
//       </option>
//     ))
//     setProductOptions(options)
//   }, [productList, selectedProduct, apiData])

//   useEffect(() => {
//     updateTotalPrice();
//   }, [productList]);
//   function updateTotalPrice() {
//     let total = 0;
//     console.log('productList',productList);
//     productList.forEach(({ houseTypePrice  }) => {
//       const unitPrice = parseFloat(houseTypePrice);
//       total =  unitPrice;
//     });
//     const totalInt = parseInt(total);
//     const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
//     const totalPriceDisplay = formattedTotal;
//     // console.log('productList',productList);
//     console.log('total',formattedTotal);
//     setTotalPrice(totalPriceDisplay);
//   }
  

//   function handleProductChange (event) {
//     setSelectedProduct(event.target.value)
//   }

//   function handleAreaSquareValue (event) {
//     setAreaSquareValue(parseInt(event.target.value) || 0)
//   }

//   function addProductRow () {
//     if (areaSquareValue <= 0) {
//       alert('Vui lòng nhập số lớn hơn 0!')
//       return
//     }
//     const newRow = {
//       product: selectedProduct,
//       quantity: areaSquareValue
//     }
//     setProductList([...productList, newRow])
//     // updateTotalPrice();
//   }

//   function removeProductRow (product) {
//     const updatedList = productList.filter(item => item.product !== product)
//     setProductList(updatedList)
//     // updateTotalPrice();
//     localStorage.setItem('productList', JSON.stringify(updatedList))
//   }
// //https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDACustomerSubmit
// function handleSubmit() {
//   const templateId = "template_lafo0i4"; // Replace with your email template ID
//   const userId = "tTHDASuBbuhbKgXVb"; // Replace with your EmailJS user ID
//   const serviceId = "service_sidpz22"; // Replace with your EmailJS service ID
//   const confirmationLink = window.location.origin + `/Confirm_Bao_Gia_Request_Customer/${id}`;
//   const templateParams = {
//     requestId: id,
//     totalPrice: totalPrice,
//     customerName: customerName,
//     phoneNumber: phoneNumber,
//     projectAddress: projectAddress,
//     quotationDate: quotationDate,
//     confirmationLink: confirmationLink,
//     productList: productList.map((item) => ({
//       productName:
//         item.product.name || "Product Name Loading...",
//       unitPrice:
//         item.product.unit_price || "Price Loading...",
//       quantity: item.quantity,
//     })),
//   };
//   console.log('SetTemplateParams',templateParams);
//   emailjs
//     .send(serviceId, templateId, templateParams, userId)
//     .then((response) => {
//       console.log("Email sent successfully:", response);
//       toast.success("Báo giá đã được gửi đi!");
//     })
//     .catch((error) => {
//       console.error("Error sending email:", error);
//       toast.error("Có lỗi xảy ra khi gửi email!");
//     });
// }
// console.log('total',totalPrice);
// function handlePhoneNumber (e) {
//   const inputValue = e.target.value
//   if (isNaN(inputValue)) {
//     toast.error('Vui lòng chỉ nhập số cho Số điện thoại!')
//   } else {
//     setPhoneNumber(inputValue)
//   }
// }

// const onlyCharactersRegex = /^[a-zA-Z\s]*$/
// function handleCustomerNameChange (event) {
//   const value = event.target.value
//   if (onlyCharactersRegex.test(value) || value === '') {
//     setCustomerName(value)
//   } else {
//     toast.error('Tên khách hàng chỉ được chứa ký tự chữ cái và dấu cách!')
//   }
// }
//   return (
//     <div className="container-fluid">
//       <div className="LogoAndTitle">
//         <div className="dropdown-divider border-black mb-5"></div>
//         <div className="Title">Bảng báo giá</div>
//       </div>
//       <section id="infoAndCustomer">
//         <div className="d-flex justify-content-between">
//           <div className="leftText providerInfo">
//             <div className="providerInfoContent">
//               <h4>
//                 <strong>Email</strong>: NotRealEmail@gmail.com
//               </h4>
//             </div>
//             <div className="providerInfoContent">
//               <h4>
//                 <strong>Số điện thoại</strong>: 0243 5536750
//               </h4>
//             </div>
//             <div className="providerInfoContent">
//               <h4>
//                 <strong>Showroom</strong>: Av. A Phillips, 1, Zona Industrial
//                 San Vicente
//               </h4>
//             </div>
//             <div className="providerInfoContent">
//               <h4>
//                 <strong>Xưởng</strong>: Av. A Phillips, 1, Zona Industrial San
//                 Vicente
//               </h4>
//             </div>
//           </div>
//           <div className='rightText providerInfo d-flex flex-column CustomerInput '>
//               <div className='d-flex align-items-center'>
//                 <strong>Khách Hàng:</strong>
//                 <input
//                   type='text'
//                   id='customerName'
//                   placeholder='Nhập tên khách hàng'
//                   required
//                   value={customerName}
//                   onChange={handleCustomerNameChange}
//                 />
//               </div>
//               <div className='d-flex align-items-center'>
//                 <strong>Số điện thoại:</strong>
//                 <input
//                   type='text'
//                   id='phoneNumber'
//                   placeholder='Nhập số điện thoại'
//                   required
//                   value={phoneNumber}
//                   onChange={handlePhoneNumber}
//                 />
//               </div>
//               <div className='d-flex align-items-center'>
//                 <strong>Địa chỉ công trình:</strong>
//                 <input
//                   type='text'
//                   id='projectAddress'
//                   placeholder='Nhập địa chỉ công trình'
//                   required
//                   value={projectAddress}
//                   onChange={e => setProjectAddress(e.target.value)}
//                 />
//               </div>
//               <div className='d-flex align-items-center'>
//                 <strong>Ngày soạn báo giá:</strong>
//                 <input
//                   type='text'
//                   id='quotationDate'
//                   placeholder='Nhập ngày soạn báo giá'
//                   required
//                   value={quotationDate}
//                   onChange={e => setQuotationDate(e.target.value)}
//                 />
//               </div>
//             </div>
//         </div>
//       </section>
//       <section id="quotation">
//       <form className='d-flex'>
//             <div className='d-flex w-100 justify-content-between'>
//               {/* <label
//                 htmlFor='selectProduct'
//                 className='SelectProduct w-100 justify-content-between me-1 align-items-center'
//               >
//                 Chọn thiết kế:
//                 <select
//                   id='selectProduct'
//                   value={selectedProduct}
//                   onChange={handleProductChange}
//                   className='form-select productSelect fs-6'
//                 >
//                   {productOptions}
//                 </select>
//               </label>
//               <label
//                 htmlFor='quantity'
//                 className='SelectProduct w-100 align-items-center'
//               >
//                 Nhập diện tích:
//                 <input
//                   type='number'
//                   id='quantity'
//                   value={areaSquareValue}
//                   onChange={handleAreaSquareValue}
//                   className='w-50 productSelect m-0 ms-1'
//                   placeholder='Nhập số diện tích - Đơn vị: m2'
//                 />
//                 <button
//                   type='button'
//                   className='w-25 fs-6 fw-normal AddProduct m-0 ms-1'
//                   onClick={addProductRow}
//                   disabled={areaSquareValue <= 0}
//                 >
//                   Thêm thiết kế
//                 </button>
//               </label> */}
//             </div>
//           </form>

//         <table>
//           <thead>
//             <tr>
//               <th>Sản Phẩm</th>
//               <th>Mô tả</th>
//               <th>Kích thước</th>
//               <th>Loại nhà</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody id='product-table-body'>
//               {productList.map((item, index) => (
//                 <ProductRow
//                   key={index}
//                   productID={item.product}
//                   productName={
//                     apiData.find(product => product.comboId === item.product)
//                       ?.typeName || 'Product Name Loading...'
//                   }
//                   description={
//                     apiData.find(product => product.comboId === item.product)
//                       ?.describe || 'Description Loading...'
//                   }
//                   unit={
//                     apiData.find(product => product.comboId === item.product)
//                       ?.unit || 'Unit Loading...'
//                   }
//                   mass={
//                     apiData.find(product => product.comboId === item.product)
//                       ?.mass || 'Mass Loading...'
//                   }
//                   unitPrice={
//                     apiData.find(product => product.comboId === item.product)
//                       ?.unit_price || 'Price Loading...'
//                   }
//                   // quantity={item.areaSquareValue}
//                   areaSquareValue={item.areaSquareValue}
//                   houseTypeOptions={houseTypeOptions}
//                   selectHouseType={item.houseType}
//                   onQuantityChange={e => {
//                     const updatedList = [...productList]
//                     updatedList[index].quantity = parseInt(e.target.value)
//                     setProductList(updatedList)
//                     // updateTotalPrice();
//                   }}
//                   onDelete={() => removeProductRow(item.product)}
//                 />
//               ))}
//             </tbody>
//         </table>

//         {productList.map((item, index) => (
//           <p key={index} className="houseTypePrice">
//             Giá tiền cho thiết kế: {new Intl.NumberFormat('vi-VN',{style: 'currency', currency: 'VND'}).format(item.houseTypePrice)}
//           </p>
//         ))}
//         <button type="button" className="Finish_button" onClick={handleSubmit}>
//           Gửi xác nhận
//         </button>
//         <div className="dropdown-divider border-black mb-5"></div>
//       </section>
//       <ToastContainer position='top-right' />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "../../assets/images/logo.jpg";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emailjs from "emailjs-com";

function ProductRow ({
  productID,
  productName,
  description,
  size,
  unit,
  unitPrice,
  areaSquareValue,
  quantity,
  houseTypeOptions,
  selectedHouseType,
  onQuantityChange,
  selectHouseType,
  designName,
  describe,
  onDelete
}) {
  const selectedHouseTypeInfo = houseTypeOptions[selectedHouseType] || {}
  // const houseTypePrice = selectedHouseTypeInfo[0].houseTypePrice || 'HI...'
  // const houseTypePrice = selectedHouseTypeInfo|| 'HI...'
  console.log("productName",productName);
  console.log('selectedHouseTypeInfo',selectHouseType);
  console.log('areaSquareValue',areaSquareValue);
  const houseTypeTranslations = {
    Apartment: 'Chung cư',
    House: 'Căn Hộ',
    Office: 'Văn Phòng',
    Villa: 'Biệt Thự'
  }
  return (
    <tr className='product-row' data-productid={productID}>
      <td>{designName}</td>
      <td>{describe}</td>
      <td>
        <input
          type='number'
          className='quantity productSelect'
          value={areaSquareValue}
          min='1'
          onChange={onQuantityChange}
          readOnly
        />
        {/* {size.SQM} */}
      </td>
      <td>{houseTypeTranslations[selectHouseType]}</td>
      <td>
        <button className='AddButton m-0 ms-1' onClick={onDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  )
}

export default function BaoGia() {
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [areaSquareValue, setAreaSquareValue] = useState('')
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [projectAddress, setProjectAddress] = useState('')
  const [quotationDate, setQuotationDate] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [requestId, setRequestId] = useState('')
  const [houseTypeOptions, setHouseTypeOptions] = useState({})
  const [selectedHouseType, setSelectedHouseType] = useState('')
  // const { id } = useParams();
  const { id } = useParams();
  console.log('quotationId',id);
  useEffect(() => {
    axios
      .get(
        // 'https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDABaoGiaCustomer'
        'https://localhost:7224/api/ComboDesign/GetAllCombo'
      )
      .then(response => {
        setApiData(response.data)
        setLoading(false)
        console.log('SetApiData',response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        // `https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDACustomerSubmit/${quotationId}`
        `https://localhost:7224/api/ConstructionPriceQuotation/GetConstructionPriceQuotationById?id=${id}`
      )
      .then(response => {
        const {
          customerName,
          phoneNumber,
          projectAddress,
          quotationDate,
          requests
        } = response.data
        console.log('CustomerInfo',requests)
        setCustomerName(customerName)
        setPhoneNumber(phoneNumber)
        setProjectAddress(projectAddress)
        setQuotationDate(quotationDate)
        setProductList(
          requests.map(product => (
            console.log('SetProducts',product.name),{
            // product: product.Id,
            proDu:product.name,
            description:product.describe,
            areaSquareValue: product.areaSquareValue,
            houseType: product.houseSType,
            houseTypePrice: product.houseTypePrice
          }))
        )
        console.log('SetProductALL',response.data);
        // console.log('SetProductList',productList);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error)
      })
  }, [])

  useEffect(() => {
    if (apiData.length > 0 && selectedProduct === '') {
      setSelectedProduct(apiData[0].Id)
      console.log(apiData[0].Id)
    }
    const options = apiData.map(product => (
      <option key={product.Id} value={product.Id}>
        {product.name}
      </option>
    ))
    setProductOptions(options)
  }, [productList, selectedProduct, apiData])

  useEffect(() => {
    updateTotalPrice();
  }, [productList]);
  function updateTotalPrice() {
    let total = 0;
    console.log('productList',productList);
    productList.forEach(({ houseTypePrice  }) => {
      const unitPrice = parseFloat(houseTypePrice);
      total =  unitPrice;
    });
    const totalInt = parseInt(total);
    const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
    const totalPriceDisplay = formattedTotal;
    // console.log('productList',productList);
    console.log('total',formattedTotal);
    setTotalPrice(totalPriceDisplay);
  }
  

  function handleProductChange (event) {
    setSelectedProduct(event.target.value)
  }

  function handleAreaSquareValue (event) {
    setAreaSquareValue(parseInt(event.target.value) || 0)
  }

  function addProductRow () {
    if (areaSquareValue <= 0) {
      alert('Vui lòng nhập số lớn hơn 0!')
      return
    }
    const newRow = {
      product: selectedProduct,
      quantity: areaSquareValue
    }
    setProductList([...productList, newRow])
    // updateTotalPrice();
  }

  function removeProductRow (product) {
    const updatedList = productList.filter(item => item.product !== product)
    setProductList(updatedList)
    // updateTotalPrice();
    localStorage.setItem('productList', JSON.stringify(updatedList))
  }
//https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDACustomerSubmit
function handleSubmit() {
  const templateId = "template_lafo0i4"; // Replace with your email template ID
  const userId = "tTHDASuBbuhbKgXVb"; // Replace with your EmailJS user ID
  const serviceId = "service_sidpz22"; // Replace with your EmailJS service ID
  const confirmationLink = window.location.origin + `/Confirm_Bao_Gia_Request_Customer/${id}`;
  const templateParams = {
    requestId: id,
    totalPrice: totalPrice,
    customerName: customerName,
    phoneNumber: phoneNumber,
    projectAddress: projectAddress,
    quotationDate: quotationDate,
    confirmationLink: confirmationLink,
    // productList: productList.map((item) => ({
    //   productName:
    //     item.product.name || "Product Name Loading...",
    //   unitPrice:
    //     item.product.unit_price || "Price Loading...",
    //   quantity: item.quantity,
    // })),
  };
  console.log('SetTemplateParams',templateParams);
  emailjs
    .send(serviceId, templateId, templateParams, userId)
    .then((response) => {
      console.log("Email sent successfully:", response);
      toast.success("Báo giá đã được gửi đi!");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      toast.error("Có lỗi xảy ra khi gửi email!");
    });
}
console.log('total',totalPrice);
function handlePhoneNumber (e) {
  const inputValue = e.target.value
  if (isNaN(inputValue)) {
    toast.error('Vui lòng chỉ nhập số cho Số điện thoại!')
  } else {
    setPhoneNumber(inputValue)
  }
}

const onlyCharactersRegex = /^[a-zA-Z\s]*$/
function handleCustomerNameChange (event) {
  const value = event.target.value
  if (onlyCharactersRegex.test(value) || value === '') {
    setCustomerName(value)
  } else {
    toast.error('Tên khách hàng chỉ được chứa ký tự chữ cái và dấu cách!')
  }
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
          <div className='rightText providerInfo d-flex flex-column CustomerInput '>
              <div className='d-flex align-items-center'>
                <strong>Khách Hàng:</strong>
                <input
                  type='text'
                  id='customerName'
                  placeholder='Nhập tên khách hàng'
                  required
                  value={customerName}
                  onChange={handleCustomerNameChange}
                />
              </div>
              <div className='d-flex align-items-center'>
                <strong>Số điện thoại:</strong>
                <input
                  type='text'
                  id='phoneNumber'
                  placeholder='Nhập số điện thoại'
                  required
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                />
              </div>
              <div className='d-flex align-items-center'>
                <strong>Địa chỉ công trình:</strong>
                <input
                  type='text'
                  id='projectAddress'
                  placeholder='Nhập địa chỉ công trình'
                  required
                  value={projectAddress}
                  onChange={e => setProjectAddress(e.target.value)}
                />
              </div>
              <div className='d-flex align-items-center'>
                <strong>Ngày soạn báo giá:</strong>
                <input
                  type='text'
                  id='quotationDate'
                  placeholder='Nhập ngày soạn báo giá'
                  required
                  value={quotationDate}
                  onChange={e => setQuotationDate(e.target.value)}
                />
              </div>
            </div>
        </div>
      </section>
      <section id="quotation">
      <form className='d-flex'>
            <div className='d-flex w-100 justify-content-between'>
              {/* <label
                htmlFor='selectProduct'
                className='SelectProduct w-100 justify-content-between me-1 align-items-center'
              >
                Chọn thiết kế:
                <select
                  id='selectProduct'
                  value={selectedProduct}
                  onChange={handleProductChange}
                  className='form-select productSelect fs-6'
                >
                  {productOptions}
                </select>
              </label>
              <label
                htmlFor='quantity'
                className='SelectProduct w-100 align-items-center'
              >
                Nhập diện tích:
                <input
                  type='number'
                  id='quantity'
                  value={areaSquareValue}
                  onChange={handleAreaSquareValue}
                  className='w-50 productSelect m-0 ms-1'
                  placeholder='Nhập số diện tích - Đơn vị: m2'
                />
                <button
                  type='button'
                  className='w-25 fs-6 fw-normal AddProduct m-0 ms-1'
                  onClick={addProductRow}
                  disabled={areaSquareValue <= 0}
                >
                  Thêm thiết kế
                </button>
              </label> */}
            </div>
          </form>

        <table>
          <thead>
            <tr>
              <th>Sản Phẩm</th>
              <th>Mô tả</th>
              <th>Kích thước</th>
              <th>Loại nhà</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='product-table-body'>
              {productList.map((item, index) => (
                console.log('item', item),
                <ProductRow
                  key={index}
                  productID={item.product}
                  productName={
                    apiData.find(product => product.comboId === item.product)
                      ?.typeName || 'Product Name Loading...'
                  }
                  description={
                    apiData.find(product => product.comboId === item.product)
                      ?.describe || 'Description Loading...'
                  }
                  unit={
                    apiData.find(product => product.comboId === item.product)
                      ?.unit || 'Unit Loading...'
                  }
                  mass={
                    apiData.find(product => product.comboId === item.product)
                      ?.mass || 'Mass Loading...'
                  }
                  unitPrice={
                    apiData.find(product => product.comboId === item.product)
                      ?.unit_price || 'Price Loading...'
                  }
                  // quantity={item.areaSquareValue}
                  designName={item.proDu}
                  describe={item.description}
                  areaSquareValue={item.areaSquareValue}
                  houseTypeOptions={houseTypeOptions}
                  selectHouseType={item.houseType}
                  onQuantityChange={e => {
                    const updatedList = [...productList]
                    updatedList[index].quantity = parseInt(e.target.value)
                    setProductList(updatedList)
                    // updateTotalPrice();
                  }}
                  onDelete={() => removeProductRow(item.product)}
                />
              ))}
            </tbody>
        </table>

        {productList.map((item, index) => (
          <p key={index} className="houseTypePrice">
            Giá tiền cho thiết kế: {new Intl.NumberFormat('vi-VN',{style: 'currency', currency: 'VND'}).format(item.houseTypePrice)}
          </p>
        ))}
        <button type="button" className="Finish_button" onClick={handleSubmit}>
          Gửi xác nhận
        </button>
        <div className="dropdown-divider border-black mb-5"></div>
      </section>
      <ToastContainer position='top-right' />
    </div>
  );
}
