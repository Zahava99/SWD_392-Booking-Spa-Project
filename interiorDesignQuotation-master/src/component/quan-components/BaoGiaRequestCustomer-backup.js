// import React, { useState, useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import logo from '../../assets/images/logo.jpg'
// import { Link } from 'react-router-dom'
// function ProductRow ({
//   productID,
//   productname,
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
//     <tr className='product-row' data-productID={productID}>
//       <td>{productname}</td>
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
//   )
// }

// export default function BaoGia () {
//   const [productList, setProductList] = useState([])
//   const [totalPrice, setTotalPrice] = useState(0)
//   const [selectedProduct, setSelectedProduct] = useState('A')
//   const [productOptions, setProductOptions] = useState([])
//   useEffect(() => {
//     updateTotalPrice()
//     const options = Object.keys(productData).map(key => (
//       <option key={key} value={key}>
//         {productData[key].name}
//       </option>
//     ))
//     setProductOptions(options)
//   }, [productList, selectedProduct])
//   function updateTotalPrice () {
//     let total = 0
//     productList.forEach(({ product, quantity }) => {
//       const unitPrice = productData[product].unit_price
//       total += quantity * unitPrice
//       console.log(productData.F.productname)
//     })
//     setTotalPrice(total)
//     localStorage.setItem('productList', JSON.stringify(productList))
//   }
//   function handleProductChange (event) {
//     setSelectedProduct(event.target.value)
//   }
//   //Khang Change Start
//   function addProductRow () {
//     const selectedProduct = document.getElementById('selectProduct').value
//     let quantity = parseInt(document.getElementById('quantity').value) || 0
//     // quantity = Math.max(quantity, 0);
//     if (quantity < 0) {
//       alert("Vui lòng nhập số lớn hơn 0!");
//       return;
//     }
//     // const existingIndex = productList.findIndex(
//     //   (item) => item.product === selectedProduct
//     // );
//     // if (existingIndex !== -1) {
//     //   const updatedList = [...productList];
//     //   updatedList[existingIndex].quantity += quantity;
//     //   setProductList(updatedList);
//     // } else {
//     const newRow = {
//       product: selectedProduct,
//       quantity: quantity
//     }
//     setProductList([...productList, newRow])
//     // }
//     updateTotalPrice()
//   }
//   //Khang Change End
//   function removeProductRow (product) {
//     const updatedList = productList.filter(item => item.product !== product)
//     setProductList(updatedList)
//     updateTotalPrice()
//     localStorage.setItem('productList', JSON.stringify(updatedList))
//   }

//   return (
//     <div className='container-fluid'>
//       <div className='LogoAndTitle'>
//         {/* <div className='Logo'>
//           <Link to='/' className='navbar-brand'>
//             <img src={logo} />
//           </Link>
//         </div> */}
//         <div className='dropdown-divider border-black mb-5'></div>
//         <div className='Title'>Bảng báo giá</div>
//       </div>
//       <section id='infoAndCustomer'>
//         <div className='d-flex justify-content-between'>
//           <div className='leftText providerInfo'>
//             <div className='providerInfoContent'>
//               <h4>
//                 <strong>Email</strong>: NotRealEmail@gmail.com
//               </h4>
//             </div>
//             <div className='providerInfoContent'>
//               <h4>
//                 <strong>Số điện thoại</strong>: 0243 5536750
//               </h4>
//             </div>
//             <div className='providerInfoContent'>
//               <h4>
//                 <strong>Showroom</strong>: Av. A Phillips, 1, Zona Industrial
//                 San Vicente
//               </h4>
//             </div>
//             <div className='providerInfoContent'>
//               <h4>
//                 <strong>Xưởng</strong>: Av. A Phillips, 1, Zona Industrial San
//                 Vicente
//               </h4>
//             </div>
//           </div>
//           <div className='rightText providerInfo d-flex flex-column CustomerInput '>
//             <div className='d-flex align-items-center'>
//               <strong>Khách Hàng:</strong>
//               {/* <input type='text' placeholder='Nhập tên khách hàng' value/> */}
//               <input type='text' placeholder='Nhập tên khách hàng' />
//             </div>
//             <div className='d-flex align-items-center'>
//               <strong>Số điện thoại:</strong>
//               <input type='text' placeholder='Nhập số điện thoại' />
//             </div>
//             <div className='d-flex align-items-center'>
//               <strong>Địa chỉ công trình:</strong>
//               <input type='text' placeholder='Nhập địa chỉ công trình' />
//             </div>
//             <div className='d-flex align-items-center'>
//               <strong>Ngày soạn báo giá:</strong>
//               <input type='text' placeholder='Nhập ngày soạn báo giá' />
//             </div>
//           </div>
//         </div>
//       </section>
//       <section id='quotation'>
//         <form className='d-flex'>
//           <div className='d-flex w-100 justify-content-between'>
//             <label
//               htmlFor='selectProduct'
//               className='SelectProduct w-100 justify-content-between me-1 align-items-center'
//             >
//               Chọn thiết kế:
//               <select
//                 id='selectProduct'
//                 value={selectedProduct}
//                 onChange={handleProductChange}
//                 class='form-select productSelect fs-6'
//               >
//                 {productOptions}
//               </select>
//             </label>
//             <label
//               htmlFor='quantity'
//               className='SelectProduct w-100 align-items-center'
//             >
//               Nhập diện tích:
//               <input
//                 type='number'
//                 id='quantity'
//                 min='0'
//                 defaultValue='m2'
//                 className='w-50 productSelect m-0 ms-1'
//                 placeholder='Nhập số diện tích - Đơn vị: m2'
//               />
//               <button
//                 type='button'
//                 className='w-25 fs-6 fw-normal AddProduct m-0 ms-1'
//                 onClick={addProductRow}
//               >
//                 Add
//               </button>
//             </label>
//           </div>
//         </form>

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
//             {productList.map((item, index) => (
//               <ProductRow
//                 key={index}
//                 productID={item.product}
//                 productname={productData[item.product].name}
//                 describe={productData[item.product].describe}
//                 size={productData[item.product].size}
//                 unit={productData[item.product].unit}
//                 mass={productData[item.product].mass}
//                 unitPrice={productData[item.product].unit_price}
//                 quantity={item.quantity}
//                 onQuantityChange={e => {
//                   const updatedList = [...productList]
//                   updatedList[index].quantity = parseInt(e.target.value)
//                   setProductList(updatedList)
//                   updateTotalPrice()
//                 }}
//                 onDelete={() => removeProductRow(item.product)}
//               />
//             ))}
//           </tbody>
//         </table>

//         {/* <p className="TotalPrice">Tổng giá tiền: {totalPrice.toLocaleString()}₫ </p> */}
//         <button type='button' class='Finish_button'>
//           Submit
//         </button>
//         <div className='dropdown-divider border-black mb-5'></div>
//       </section>
//     </div>
//   )
// }
// const productData = {
//   A: {
//     name: 'Cozy Cottage',
//     describe:
//       ' A charming one-bedroom cottage nestled in a serene neighborhood, featuring a cozy living room, a compact kitchen, and a quaint garden.',
//     // size: {SQM: '50 m2'},
//     unit: 'Căn Hộ',
//     mass: '30kg',
//     unit_price: 2_464_950_000
//   },
//   B: {
//     name: 'Abstract Apartment',
//     describe:
//       'A sleek and contemporary apartment with two bedrooms, offering an open-plan layout, stylish furnishings, and access to communal facilities like a gym and rooftop terrace.',
//     // size: {SQM:'80 m2'},
//     unit: 'Apartment',
//     mass: '40kg',
//     unit_price: 4_929_900_000
//   },
//   C: {
//     name: 'Executive Office',
//     describe:
//       'A professional office space situated in a prime business district, boasting ample room for meetings, private offices, and a reception area, with modern amenities and elegant decor.',
//     // size: {SQM:'150 m2'},
//     unit: 'Office',
//     mass: '3kg',
//     unit_price: 12_324_750_000
//   },
//   D: {
//     name: 'Luxury Villa',
//     describe:
//       'Bức tranh trang trí phòng khách với hình ảnh trừu tượng mang đến sự nghệ thuật và phong cách cho không gian sống của bạn. Với các màu sắc tươi sáng và chi tiết độc đáo, nó là một điểm nhấn hoàn hảo cho bất kỳ phòng khách nào.',
//     // size: {SQM:'300 m2'},
//     unit: 'Villa',
//     mass: '2kg',
//     unit_price: 36_974_250_000
//   },
//   E: {
//     name: 'Executive Penthouse',
//     describe:
//       'An opulent penthouse suite located in a prestigious high-rise, boasting panoramic city views, luxurious finishes, spacious living areas, private elevator access, and exclusive amenities such as a rooftop pool and concierge services.',
//     // size: { SQM: ' 500 m2'},
//     unit: 'Villa',
//     mass: '25kg',
//     unit_price: 73_948_500_000
//   },
//   F: {
//     name: 'Rustic Farmhouse',
//     describe:
//       'A rustic farmhouse retreat set amidst rolling countryside, offering a blend of traditional charm and modern comforts, with exposed wooden beams, a country-style kitchen, and expansive grounds.',
//     // size: {SQM:'200 m2'},
//     unit: '3',
//     mass: '0.5kg (mỗi chiếc)',
//     unit_price: 14_789_700_000
//   },
//   G: {
//     name: 'City Loft',
//     describe:
//       'A trendy loft apartment located in the heart of the city, boasting industrial-chic design elements, high ceilings, exposed brick walls, and an open-plan layout perfect for urban living.',
//     // size: {SQM:'100 m2'},
//     unit: 'Apartment',
//     mass: '30kg',
//     unit_price: 7_394_850_000
//   },
//   H: {
//     name: 'Corporate Headquarters',
//     describe:
//       'A prestigious corporate headquarters designed for large-scale operations, featuring multiple floors of office space, state-of-the-art conference rooms, executive suites, and onsite parking.',
//     // size: {SQM: '1000 m2'},
//     unit: 'Office',
//     mass: ' 3kg',
//     unit_price: 123_247_500_000
//   },
//   I: {
//     name: 'Seaside Retreat',
//     describe:
//       ' A tranquil seaside retreat offering panoramic ocean views, with spacious living areas, expansive decks for outdoor entertaining, private beach access, and luxurious amenities.',
//     // size: {SQM:'400 m2'},
//     unit: 'Villa',
//     mass: '5kg',
//     unit_price: 49_299_000_000
//   },
//   J: {
//     name: 'Compact Studio',
//     describe:
//       'A compact yet stylish studio apartment ideal for young professionals or students, with a functional layout maximizing space, modern fixtures, and convenient access to amenities.',
//     // size: {SQM:'40 m2'},
//     unit: 'Office',
//     mass: '15kg',
//     unit_price: 1_971_960_000
//   }
// }
// console.log(productData)

//Khang TEST 2 Start
// import React, { useState, useEffect } from 'react';
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
//     <tr className='product-row' data-productID={productID}>
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

// export default function BaoGia() {
//   const [productList, setProductList] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState('A');
//   const [productOptions, setProductOptions] = useState([]);

//   useEffect(() => {
//     updateTotalPrice();
//     const options = productData.map(product => (
//       <option key={product.Id} value={product.Id}>
//         {product.name}
//       </option>
//     ));
//     setProductOptions(options);
//   }, [productList, selectedProduct]);

//   function updateTotalPrice() {
//     let total = 0;
//     productList.forEach(({ product, quantity }) => {
//       const unitPrice = productData.find(item => item.Id === product).unit_price;
//       total += quantity * unitPrice;
//     });
//     setTotalPrice(total);
//     localStorage.setItem('productList', JSON.stringify(productList));
//   }

//   function handleProductChange(event) {
//     setSelectedProduct(event.target.value);
//   }

//   function addProductRow() {
//     const selectedProduct = document.getElementById('selectProduct').value;
//     let quantity = parseInt(document.getElementById('quantity').value) || 0;
//     if (quantity < 0) {
//       alert('Vui lòng nhập số lớn hơn 0!');
//       return;
//     }
//     if (quantity = null) {
//       alert('Vui ');
//       return;
//     }
//     quantity = Math.max(quantity, 0);
//     const newRow = {
//       product: selectedProduct,
//       quantity: quantity
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

//   return (
//     <div className='container-fluid'>
//       <div className='LogoAndTitle'>
//         <div className='dropdown-divider border-black mb-5'></div>
//         <div className='Title'>Bảng báo giá</div>
//       </div>
//       <section id='infoAndCustomer'>
//         <div className='d-flex justify-content-between'>
//           <div className='leftText providerInfo'>
//             <div className='providerInfoContent'>
//               <h4>
//                 <strong>Email</strong>: NotRealEmail@gmail.com
//               </h4>
//             </div>
//             <div className='providerInfoContent'>
//               <h4>
//                 <strong>Số điện thoại</strong>: 0243 5536750
//               </h4>
//             </div>
//             <div className='providerInfoContent'>
//               <h4>
//                 <strong>Showroom</strong>: Av. A Phillips, 1, Zona Industrial
//                 San Vicente
//               </h4>
//             </div>
//             <div className='providerInfoContent'>
//               <h4>
//                 <strong>Xưởng</strong>: Av. A Phillips, 1, Zona Industrial San
//                 Vicente
//               </h4>
//             </div>
//           </div>
//           <div className='rightText providerInfo d-flex flex-column CustomerInput '>
//             <div className='d-flex align-items-center'>
//               <strong>Khách Hàng:</strong>
//               <input type='text' placeholder='Nhập tên khách hàng' />
//             </div>
//             <div className='d-flex align-items-center'>
//               <strong>Số điện thoại:</strong>
//               <input type='text' placeholder='Nhập số điện thoại' />
//             </div>
//             <div className='d-flex align-items-center'>
//               <strong>Địa chỉ công trình:</strong>
//               <input type='text' placeholder='Nhập địa chỉ công trình' />
//             </div>
//             <div className='d-flex align-items-center'>
//               <strong>Ngày soạn báo giá:</strong>
//               <input type='text' placeholder='Nhập ngày soạn báo giá' />
//             </div>
//           </div>
//         </div>
//       </section>
//       <section id='quotation'>
//         <form className='d-flex'>
//           <div className='d-flex w-100 justify-content-between'>
//             <label
//               htmlFor='selectProduct'
//               className='SelectProduct w-100 justify-content-between me-1 align-items-center'
//             >
//               Chọn thiết kế:
//               <select
//                 id='selectProduct'
//                 value={selectedProduct}
//                 onChange={handleProductChange}
//                 className='form-select productSelect fs-6'
//               >
//                 {productOptions}
//               </select>
//             </label>
//             <label
//               htmlFor='quantity'
//               className='SelectProduct w-100 align-items-center'
//             >
//               Nhập diện tích:
//               <input
//                 type='number'
//                 id='quantity'
//                 min='0'
//                 defaultValue='m2'
//                 className='w-50 productSelect m-0 ms-1'
//                 placeholder='Nhập số diện tích - Đơn vị: m2'
//               />
//               <button
//                 type='button'
//                 className='w-25 fs-6 fw-normal AddProduct m-0 ms-1'
//                 onClick={addProductRow}
//               >
//                 Add
//               </button>
//             </label>
//           </div>
//         </form>

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
//             {productList.map((item, index) => (
//               <ProductRow
//                 key={index}
//                 productID={item.product}
//                 productName={productData.find(product => product.Id === item.product).name}
//                 describe={productData.find(product => product.Id === item.product).describe}
//                 size={productData.find(product => product.Id === item.product).size}
//                 unit={productData.find(product => product.Id === item.product).unit}
//                 mass={productData.find(product => product.Id === item.product).mass}
//                 unitPrice={productData.find(product => product.Id === item.product).unit_price}
//                 quantity={item.quantity}
//                 onQuantityChange={e => {
//                   const updatedList = [...productList];
//                   updatedList[index].quantity = parseInt(e.target.value);
//                   setProductList(updatedList);
//                   updateTotalPrice();
//                 }}
//                 onDelete={() => removeProductRow(item.product)}
//               />
//             ))}
//           </tbody>
//         </table>

//         <button type='button' className='Finish_button'>
//           Submit
//         </button>
//         <div className='dropdown-divider border-black mb-5'></div>
//       </section>
//     </div>
//   );
// }

// const productData = [
//   {
//     Id: 'A',
//     name: 'Cozy Cottage',
//     describe:
//       ' A charming one-bedroom cottage nestled in a serene neighborhood, featuring a cozy living room, a compact kitchen, and a quaint garden.',
//     // size: {SQM: '50 m2'},
//     unit: 'Căn Hộ',
//     mass: '30kg',
//     unit_price: 2_464_950_000
//   },
//   {
//     Id: 'B',
//     name: 'Abstract Apartment',
//     describe:
//       'A sleek and contemporary apartment with two bedrooms, offering an open-plan layout, stylish furnishings, and access to communal facilities like a gym and rooftop terrace.',
//     // size: {SQM:'80 m2'},
//     unit: 'Apartment',
//     mass: '40kg',
//     unit_price: 4_929_900_000
//   },
//   {
//     Id: 'C',
//     name: 'Executive Office',
//     describe:
//       'A professional office space situated in a prime business district, boasting ample room for meetings, private offices, and a reception area, with modern amenities and elegant decor.',
//     // size: {SQM:'150 m2'},
//     unit: 'Office',
//     mass: '3kg',
//     unit_price: 12_324_750_000
//   },
//   {
//     Id: 'D',
//     name: 'Luxury Villa',
//     describe:
//       'Bức tranh trang trí phòng khách với hình ảnh trừu tượng mang đến sự nghệ thuật và phong cách cho không gian sống của bạn. Với các màu sắc tươi sáng và chi tiết độc đáo, nó là một điểm nhấn hoàn hảo cho bất kỳ phòng khách nào.',
//     // size: {SQM:'300 m2'},
//     unit: 'Villa',
//     mass: '2kg',
//     unit_price: 36_974_250_000
//   },
//   {
//     Id: 'E',
//     name: 'Executive Penthouse',
//     describe:
//       'An opulent penthouse suite located in a prestigious high-rise, boasting panoramic city views, luxurious finishes, spacious living areas, private elevator access, and exclusive amenities such as a rooftop pool and concierge services.',
//     // size: { SQM: ' 500 m2'},
//     unit: 'Villa',
//     mass: '25kg',
//     unit_price: 73_948_500_000
//   },
//   {
//     Id: 'F',
//     name: 'Rustic Farmhouse',
//     describe:
//       'A rustic farmhouse retreat set amidst rolling countryside, offering a blend of traditional charm and modern comforts, with exposed wooden beams, a country-style kitchen, and expansive grounds.',
//     // size: {SQM:'200 m2'},
//     unit: '3',
//     mass: '0.5kg (mỗi chiếc)',
//     unit_price: 14_789_700_000
//   },
//   {
//     Id: 'G',
//     name: 'City Loft',
//     describe:
//       'A trendy loft apartment located in the heart of the city, boasting industrial-chic design elements, high ceilings, exposed brick walls, and an open-plan layout perfect for urban living.',
//     // size: {SQM:'100 m2'},
//     unit: 'Apartment',
//     mass: '30kg',
//     unit_price: 7_394_850_000
//   },
//   {
//     Id: 'H',
//     name: 'Corporate Headquarters',
//     describe:
//       'A prestigious corporate headquarters designed for large-scale operations, featuring multiple floors of office space, state-of-the-art conference rooms, executive suites, and onsite parking.',
//     // size: {SQM: '1000 m2'},
//     unit: 'Office',
//     mass: ' 3kg',
//     unit_price: 123_247_500_000
//   },
//   {
//     Id: 'I',
//     name: 'Seaside Retreat',
//     describe:
//       ' A tranquil seaside retreat offering panoramic ocean views, with spacious living areas, expansive decks for outdoor entertaining, private beach access, and luxurious amenities.',
//     // size: {SQM:'400 m2'},
//     unit: 'Villa',
//     mass: '5kg',
//     unit_price: 49_299_000_000
//   },
//   {
//     Id: 'J',
//     name: 'Compact Studio',
//     describe:
//       'A compact yet stylish studio apartment ideal for young professionals or students, with a functional layout maximizing space, modern fixtures, and convenient access to amenities.',
//     // size: {SQM:'40 m2'},
//     unit: 'Office',
//     mass: '15kg',
//     unit_price: 1_971_960_000
//   }
// ];
//KhangTEST2 End


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.jpg';
import { Link } from 'react-router-dom';

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
    <tr className='product-row' data-productID={productID}>
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

export default function BaoGia() {
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(productData[0].Id);
  const [productOptions, setProductOptions] = useState([]);
  const [areaSquareValue, setAreaSquareValue] = useState(' ');

  useEffect(() => {
    updateTotalPrice();
    const options = productData.map(product => (
      <option key={product.Id} value={product.Id}>
        {product.name}
      </option>
    ));
    setProductOptions(options);
  }, [productList, selectedProduct]);

  function updateTotalPrice() {
    let total = 0;
    productList.forEach(({ product, quantity }) => {
      const unitPrice = productData.find(item => item.Id === product).unit_price;
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

  return (
    <div className='container-fluid'>
      <div className='LogoAndTitle'>
        <div className='dropdown-divider border-black mb-5'></div>
        <div className='Title'>Bảng báo giá</div>
      </div>
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
              <input type='text' placeholder='Nhập tên khách hàng' />
            </div>
            <div className='d-flex align-items-center'>
              <strong>Số điện thoại:</strong>
              <input type='text' placeholder='Nhập số điện thoại' />
            </div>
            <div className='d-flex align-items-center'>
              <strong>Địa chỉ công trình:</strong>
              <input type='text' placeholder='Nhập địa chỉ công trình' />
            </div>
            <div className='d-flex align-items-center'>
              <strong>Ngày soạn báo giá:</strong>
              <input type='text' placeholder='Nhập ngày soạn báo giá' />
            </div>
          </div>
        </div>
      </section>
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
                productName={productData.find(product => product.Id === item.product).name}
                describe={productData.find(product => product.Id === item.product).describe}
                size={productData.find(product => product.Id === item.product).size}
                unit={productData.find(product => product.Id === item.product).unit}
                mass={productData.find(product => product.Id === item.product).mass}
                unitPrice={productData.find(product => product.Id === item.product).unit_price}
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

        <button type='button' className='Finish_button'>
          Submit
        </button>
        <div className='dropdown-divider border-black mb-5'></div>
      </section>
    </div>
  );
}

const productData = [
  {
    Id: 'A',
    name: 'Cozy Cottage',
    describe:
      ' A charming one-bedroom cottage nestled in a serene neighborhood, featuring a cozy living room, a compact kitchen, and a quaint garden.',
    // size: {SQM: '50 m2'},
    unit: 'Căn Hộ',
    mass: '30kg',
    unit_price: 2_464_950_000
  },
  {
    Id: 'B',
    name: 'Abstract Apartment',
    describe:
      'A sleek and contemporary apartment with two bedrooms, offering an open-plan layout, stylish furnishings, and access to communal facilities like a gym and rooftop terrace.',
    // size: {SQM:'80 m2'},
    unit: 'Apartment',
    mass: '40kg',
    unit_price: 4_929_900_000
  },
  {
    Id: 'C',
    name: 'Executive Office',
    describe:
      'A professional office space situated in a prime business district, boasting ample room for meetings, private offices, and a reception area, with modern amenities and elegant decor.',
    // size: {SQM:'150 m2'},
    unit: 'Office',
    mass: '3kg',
    unit_price: 12_324_750_000
  },
  {
    Id: 'D',
    name: 'Luxury Villa',
    describe:
      'Bức tranh trang trí phòng khách với hình ảnh trừu tượng mang đến sự nghệ thuật và phong cách cho không gian sống của bạn. Với các màu sắc tươi sáng và chi tiết độc đáo, nó là một điểm nhấn hoàn hảo cho bất kỳ phòng khách nào.',
    // size: {SQM:'300 m2'},
    unit: 'Villa',
    mass: '2kg',
    unit_price: 36_974_250_000
  },
  {
    Id: 'E',
    name: 'Executive Penthouse',
    describe:
      'An opulent penthouse suite located in a prestigious high-rise, boasting panoramic city views, luxurious finishes, spacious living areas, private elevator access, and exclusive amenities such as a rooftop pool and concierge services.',
    // size: { SQM: ' 500 m2'},
    unit: 'Villa',
    mass: '25kg',
    unit_price: 73_948_500_000
  },
  {
    Id: 'F',
    name: 'Rustic Farmhouse',
    describe:
      'A rustic farmhouse retreat set amidst rolling countryside, offering a blend of traditional charm and modern comforts, with exposed wooden beams, a country-style kitchen, and expansive grounds.',
    // size: {SQM:'200 m2'},
    unit: '3',
    mass: '0.5kg (mỗi chiếc)',
    unit_price: 14_789_700_000
  },
  {
    Id: 'G',
    name: 'City Loft',
    describe:
      'A trendy loft apartment located in the heart of the city, boasting industrial-chic design elements, high ceilings, exposed brick walls, and an open-plan layout perfect for urban living.',
    // size: {SQM:'100 m2'},
    unit: 'Apartment',
    mass: '30kg',
    unit_price: 7_394_850_000
  },
  {
    Id: 'H',
    name: 'Corporate Headquarters',
    describe:
      'A prestigious corporate headquarters designed for large-scale operations, featuring multiple floors of office space, state-of-the-art conference rooms, executive suites, and onsite parking.',
    // size: {SQM: '1000 m2'},
    unit: 'Office',
    mass: ' 3kg',
    unit_price: 123_247_500_000
  },
  {
    Id: 'I',
    name: 'Seaside Retreat',
    describe:
      ' A tranquil seaside retreat offering panoramic ocean views, with spacious living areas, expansive decks for outdoor entertaining, private beach access, and luxurious amenities.',
    // size: {SQM:'400 m2'},
    unit: 'Villa',
    mass: '5kg',
    unit_price: 49_299_000_000
  },
  {
    Id: 'J',
    name: 'Compact Studio',
    describe:
      'A compact yet stylish studio apartment ideal for young professionals or students, with a functional layout maximizing space, modern fixtures, and convenient access to amenities.',
    // size: {SQM:'40 m2'},
    unit: 'Office',
    mass: '15kg',
    unit_price: 1_971_960_000
  }
];

console.log(productData);
