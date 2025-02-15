// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import logo from '../../assets/images/logo.jpg';
// import { Link } from 'react-router-dom';

// function ProductRow({
//   productID,
//   productName,
//   describe,
//   size,
//   unit,
//   mass,
//   unitPrice,
//   quantity,
//   onQuantityChange,
//   onDelete
// }) {
//   return (
//     <tr className='product-row' data-productid={productID}>
//       <td>{productName}</td>
//       <td>{describe}</td>
//       <td>
//         <input
//           type='number'
//           className='quantity productSelect'
//           value={quantity}
//           min='1'
//           onChange={onQuantityChange}
//           readOnly
//         />
//         {/* {size.SQM} */}
//       </td>
//       <td>{unit}</td>
//       <td>
//         <button className='AddButton m-0 ms-1' onClick={onDelete}>
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//       </td>
//     </tr>
//   );
// }

// export default function BaoGiaRequestCustomer() {
//   const [productList, setProductList] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [productOptions, setProductOptions] = useState([]);
//   const [areaSquareValue, setAreaSquareValue] = useState('');
//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [customerName, setCustomerName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [projectAddress, setProjectAddress] = useState('');
//   const [quotationDate, setQuotationDate] = useState('');

//   useEffect(() => {
//     // Fetch data from the API when the component mounts
//     axios.get('https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDABaoGiaCustomer')
//       .then(response => {
//         setApiData(response.data);
//         setLoading(false);
//         console.log('CustomerRequestTest', response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []); // Run this effect only once when the component mounts

//   useEffect(() => {
//     if (apiData.length > 0 && selectedProduct === '') {
//       setSelectedProduct(apiData[0].Id);
//       console.log(apiData[0].Id);
//     }
//     updateTotalPrice();
//     const options = apiData.map(product => (
//       <option key={product.Id} value={product.Id}>
//         {product.name}
//       </option>
//     ));
//     setProductOptions(options);
//   }, [productList, selectedProduct, apiData]);

//   function updateTotalPrice() {
//     let total = 0;
//     productList.forEach(({ product, quantity }) => {
//       const unitPrice = apiData.find(item => item.Id === product).unit_price;
//       total += quantity * unitPrice;
//     });
//     setTotalPrice(total);
//     localStorage.setItem('productList', JSON.stringify(productList));
//   }

//   function handleProductChange(event) {
//     setSelectedProduct(event.target.value);
//   }

//   function handleAreaSquareValue(event) {
//     setAreaSquareValue(parseInt(event.target.value) || 0);
//   }

//   function addProductRow() {
//     if (areaSquareValue <= 0) {
//       alert('Vui lòng nhập số lớn hơn 0!');
//       return;
//     }
//     const newRow = {
//       product: selectedProduct,
//       quantity: areaSquareValue
//     };
//     setProductList([...productList, newRow]);
//     updateTotalPrice();
//   }

//   function removeProductRow(product) {
//     const updatedList = productList.filter(item => item.product !== product);
//     setProductList(updatedList);
//     updateTotalPrice();
//     localStorage.setItem('productList', JSON.stringify(updatedList));
//   }

//   function handleSubmit() {
//     const requestData = {
//       customerName,
//       phoneNumber,
//       projectAddress,
//       quotationDate,
//       // productList: productList.map(item => ({
//       //   Id: item.product,
//       //   quantity: item.quantity
//       // }))
//     };

//     // Send data to the API using Axios PUT method
//     axios.post('https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDACustomerSubmit', requestData)
//       .then(response => {
//         console.log('Data sent successfully:', response.data);
//         // Reset form fields or show success message as per your requirement
//       })
//       .catch(error => {
//         console.error('Error sending data:', error);
//         console.log('Error sending data:', error);
//         // Handle error, show error message, etc.
//       });
//   }

//   return (
//     <div className='container-fluid'>
//       <div className='LogoAndTitle'>
//         <div className='dropdown-divider border-black mb-5'></div>
//         <div className='Title'>Bảng báo giá</div>
//         <section id='infoAndCustomer'>
//           <div className='d-flex justify-content-between'>
//             <div className='leftText providerInfo'>
//               <div className='providerInfoContent'>
//                 <h4>
//                   <strong>Email</strong>: NotRealEmail@gmail.com
//                 </h4>
//               </div>
//               <div className='providerInfoContent'>
//                 <h4>
//                   <strong>Số điện thoại</strong>: 0243 5536750
//                 </h4>
//               </div>
//               <div className='providerInfoContent'>
//                 <h4>
//                   <strong>Showroom</strong>: Av. A Phillips, 1, Zona Industrial
//                   San Vicente
//                 </h4>
//               </div>
//               <div className='providerInfoContent'>
//                 <h4>
//                   <strong>Xưởng</strong>: Av. A Phillips, 1, Zona Industrial San
//                   Vicente
//                 </h4>
//               </div>
//             </div>
//             <div className='rightText providerInfo d-flex flex-column CustomerInput '>
//               <div className='d-flex align-items-center'>
//                 <strong>Khách Hàng:</strong>
//                 <input type='text' placeholder='Nhập tên khách hàng' onChange={e => setCustomerName(e.target.value)} />
//               </div>
//               <div className='d-flex align-items-center'>
//                 <strong>Số điện thoại:</strong>
//                 <input type='text' placeholder='Nhập số điện thoại' onChange={e => setPhoneNumber(e.target.value)} />
//               </div>
//               <div className='d-flex align-items-center'>
//                 <strong>Địa chỉ công trình:</strong>
//                 <input type='text' placeholder='Nhập địa chỉ công trình' onChange={e => setProjectAddress(e.target.value)} />
//               </div>
//               <div className='d-flex align-items-center'>
//                 <strong>Ngày soạn báo giá:</strong>
//                 <input type='text' placeholder='Nhập ngày soạn báo giá' onChange={e => setQuotationDate(e.target.value)} />
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       {loading ? (
//         <div id="preloader">
//           <div class="spinner-border" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         <section id='quotation'>
//           <form className='d-flex'>
//             <div className='d-flex w-100 justify-content-between'>
//               <label
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
//                   Add
//                 </button>
//               </label>
//             </div>
//           </form>

//           <table>
//             <thead>
//               <tr>
//                 <th>Sản Phẩm</th>
//                 <th>Mô tả</th>
//                 <th>Kích thước</th>
//                 <th>Loại nhà</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody id='product-table-body'>
//               {productList.map((item, index) => (
//                 <ProductRow
//                   key={index}
//                   productID={item.product}
//                   productName={
//                     apiData.find(product => product.Id === item.product)?.name ||
//                     'Product Name Loading...'
//                   }
//                   describe={
//                     apiData.find(product => product.Id === item.product)?.describe ||
//                     'Description Loading...'
//                   }
//                   size={
//                     apiData.find(product => product.Id === item.product)?.size ||
//                     'Size Loading...'
//                   }
//                   unit={
//                     apiData.find(product => product.Id === item.product)?.unit ||
//                     'Unit Loading...'
//                   }
//                   mass={
//                     apiData.find(product => product.Id === item.product)?.mass ||
//                     'Mass Loading...'
//                   }
//                   unitPrice={
//                     apiData.find(product => product.Id === item.product)?.unit_price ||
//                     'Price Loading...'
//                   }
//                   quantity={item.quantity}
//                   onQuantityChange={e => {
//                     const updatedList = [...productList];
//                     updatedList[index].quantity = parseInt(e.target.value);
//                     setProductList(updatedList);
//                     updateTotalPrice();
//                   }}
//                   onDelete={() => removeProductRow(item.product)}
//                 />
//               ))}
//             </tbody>
//           </table>

//           <button type='button' className='Finish_button' onClick={handleSubmit}>
//             Submit
//           </button>
//           <div className='dropdown-divider border-black mb-5'></div>
//         </section>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductRow({
  productID,
  productName,
  describe,
  size,
  unit,
  mass,
  unitPrice,
  quantity,
  onQuantityChange,
  onDelete
}) {
  return (
    <tr className='product-row' data-productid={productID}>
      <td>{productName}</td>
      <td>{describe}</td>
      <td>
        <input
          type='number'
          className='quantity productSelect'
          value={quantity}
          min='1'
          onChange={onQuantityChange}
          readOnly
        />
        {/* {size.SQM} */}
      </td>
      <td>{unit}</td>
      <td>
        <button className='AddButton m-0 ms-1' onClick={onDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
}

export default function BaoGiaRequestCustomer() {
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productOptions, setProductOptions] = useState([]);
  const [areaSquareValue, setAreaSquareValue] = useState('');
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDABaoGiaCustomer')
      .then(response => {
        setApiData(response.data);
        setLoading(false);
        console.log('CustomerRequestTest', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (apiData.length > 0 && selectedProduct === '') {
      setSelectedProduct(apiData[0].Id);
      console.log(apiData[0].Id);
    }
    updateTotalPrice();
    const options = apiData.map(product => (
      <option key={product.Id} value={product.Id}>
        {product.name}
      </option>
    ));
    setProductOptions(options);
  }, [productList, selectedProduct, apiData]);

  function updateTotalPrice() {
    let total = 0;
    productList.forEach(({ product, quantity }) => {
      const unitPrice = apiData.find(item => item.Id === product).unit_price;
      total += quantity * unitPrice;
    });
    setTotalPrice(total);
    localStorage.setItem('productList', JSON.stringify(productList));
  }

  function handleProductChange(event) {
    setSelectedProduct(event.target.value);
  }

  function handleAreaSquareValue(event) {
    setAreaSquareValue(parseInt(event.target.value) || 0);
  }

  function addProductRow() {
    if (areaSquareValue <= 0) {
      alert('Vui lòng nhập số lớn hơn 0!');
      return;
    }
    const newRow = {
      product: selectedProduct,
      quantity: areaSquareValue
    };
    setProductList([...productList, newRow]);
    updateTotalPrice();
  }

  function removeProductRow(product) {
    const updatedList = productList.filter(item => item.product !== product);
    setProductList(updatedList);
    updateTotalPrice();
    localStorage.setItem('productList', JSON.stringify(updatedList));
  }

  function handleSubmit() {
    const dataToSend = {
      customerName: document.getElementById('customerName').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      projectAddress: document.getElementById('projectAddress').value,
      quotationDate: document.getElementById('quotationDate').value,
      products: productList.map(item => ({
        Id: item.product,
        name: apiData.find(product => product.Id === item.product)?.name || 'Product Name Loading...',
        describe: apiData.find(product => product.Id === item.product)?.describe || 'Description Loading...',
        unit: apiData.find(product => product.Id === item.product)?.unit || 'Unit Loading...',
        unit_price: apiData.find(product => product.Id === item.product)?.unit_price || 'Price Loading...',
        size: apiData.find(product => product.Id === item.product)?.size || 'Size Loading...'
      }))
    };
    axios.post('https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDACustomerSubmit', dataToSend)
      .then(response => {
        console.log('Data sent successfully:', response.data);
        toast.success('Gửi báo giá thành công');
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  }

  return (
    <div className='container-fluid'>
      <div className='LogoAndTitle'>
        <div className='dropdown-divider border-black mb-5'></div>
        <div className='Title'>Bảng báo giá</div>
        <section id='infoAndCustomer'>
        <div className='d-flex justify-content-between'>
          <div className='leftText providerInfo'>
            <div className='providerInfoContent'>
              <h4>
                <strong>Email</strong>: NotRealEmail@gmail.com
              </h4>
            </div>
            <div className='providerInfoContent'>
              <h4>
                <strong>Số điện thoại</strong>: 0243 5536750
              </h4>
            </div>
            <div className='providerInfoContent'>
              <h4>
                <strong>Showroom</strong>: Av. A Phillips, 1, Zona Industrial
                San Vicente
              </h4>
            </div>
            <div className='providerInfoContent'>
              <h4>
                <strong>Xưởng</strong>: Av. A Phillips, 1, Zona Industrial San
                Vicente
              </h4>
            </div>
          </div>
          <div className='rightText providerInfo d-flex flex-column CustomerInput '>
            <div className='d-flex align-items-center'>
              <strong>Khách Hàng:</strong>
              <input type='text' id='customerName' placeholder='Nhập tên khách hàng' />
            </div>
            <div className='d-flex align-items-center'>
              <strong>Số điện thoại:</strong>
              <input type='text' id='phoneNumber' placeholder='Nhập số điện thoại' />
            </div>
            <div className='d-flex align-items-center'>
              <strong>Địa chỉ công trình:</strong>
              <input type='text' id='projectAddress' placeholder='Nhập địa chỉ công trình' />
            </div>
            <div className='d-flex align-items-center'>
              <strong>Ngày soạn báo giá:</strong>
              <input type='text' id='quotationDate' placeholder='Nhập ngày soạn báo giá' />
            </div>
          </div>
        </div>
      </section>
      </div>
      {loading ? (
      //   <div class="spinner-border" role="status">
      //   <span class="visually-hidden">Loading...</span>
      // </div>
      <div id="preloader">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
      ) : (
        <section id='quotation'>
          <form className='d-flex'>
            <div className='d-flex w-100 justify-content-between'>
              <label
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
                  // min='0'
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
                  Add
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
                <th></th>
              </tr>
            </thead>
            <tbody id='product-table-body'>
              {productList.map((item, index) => (
                <ProductRow
                  key={index}
                  productID={item.product}
                  productName={
                    apiData.find(product => product.Id === item.product)?.name ||
                    'Product Name Loading...'
                  }
                  describe={
                    apiData.find(product => product.Id === item.product)?.describe ||
                    'Description Loading...'
                  }
                  size={
                    apiData.find(product => product.Id === item.product)?.size ||
                    'Size Loading...'
                  }
                  unit={
                    apiData.find(product => product.Id === item.product)?.unit ||
                    'Unit Loading...'
                  }
                  mass={
                    apiData.find(product => product.Id === item.product)?.mass ||
                    'Mass Loading...'
                  }
                  unitPrice={
                    apiData.find(product => product.Id === item.product)?.unit_price ||
                    'Price Loading...'
                  }
                  quantity={item.quantity}
                  onQuantityChange={e => {
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

          <button type='button' className='Finish_button' onClick={handleSubmit}>
            Gửi báo giá
          </button>
          <div className='dropdown-divider border-black mb-5'></div>
        </section>
      )}
      <ToastContainer position='top-center' />
    </div>
  );
}
