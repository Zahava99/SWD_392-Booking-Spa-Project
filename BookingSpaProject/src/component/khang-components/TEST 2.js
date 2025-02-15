import React, { useState, useEffect, Fragment } from 'react'

function ProductRow ({
  productID,
  productname,
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
      <td>{productname}</td>
      <td>{describe}</td>
      <td>
        Long: {size.long}, Wide: {size.wide}, Height: {size.height}
      </td>
      <td>{unit}</td>
      <td>{mass}</td>
      <td>${unitPrice.toFixed(2)}</td>
      <td>
        <input
          type='number'
          className='quantity productSelect'
          value={quantity}
          min='1'
          onChange={onQuantityChange}
        />
      </td>
      <td>
        <button
          className='fs-6 fw-normal AddButton m-0 ms-1'
          onClick={onDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default function BaoGia () {
  const [productList, setProductList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState('A')
  const [productOptions, setProductOptions] = useState([])
  useEffect(() => {
    updateTotalPrice()
    const options = Object.keys(productData).map(key => (
      <option key={key} value={key}>
        {productData[key].name}
      </option>
    ));
    setProductOptions(options);
  }, [productList, selectedProduct])
  function updateTotalPrice () {
    let total = 0
    productList.forEach(({ product, quantity }) => {
      const unitPrice = productData[product].unit_price
      total += quantity * unitPrice
    })
    setTotalPrice(total)
  }
  function handleProductChange (event) {
    setSelectedProduct(event.target.value)
  }
  function addProductRow () {
    const selectedProduct = document.getElementById('selectProduct').value
    const quantity = parseInt(document.getElementById('quantity').value) || 0

    const existingIndex = productList.findIndex(
      item => item.product === selectedProduct
    )
    if (existingIndex !== -1) {
      const updatedList = [...productList]
      updatedList[existingIndex].quantity += quantity
      setProductList(updatedList)
    } else {
      const newRow = {
        product: selectedProduct,
        quantity: quantity
      }
      setProductList([...productList, newRow])
    }
    updateTotalPrice()
  }

  function removeProductRow (product) {
    const updatedList = productList.filter(item => item.product !== product)
    setProductList(updatedList)
    updateTotalPrice()
  }

  return (
    <div className='container-fluid'>
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
              {/* <input type='text' placeholder='Nhập tên khách hàng' value/> */}
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
              Select product:
              <select
                id='selectProduct'
                value={selectedProduct}
                onChange={handleProductChange}
                class='form-select productSelect fs-6'
              >
                {productOptions}
              </select>
            </label>
            <label
              htmlFor='quantity'
              className='SelectProduct w-100 align-items-center'
            >
              Enter quantity:
              <input
                type='number'
                id='quantity'
                min='1'
                defaultValue='1'
                className='w-50 productSelect m-0 ms-1'
              />
              <button
                type='button'
                className='w-25 fs-6 fw-normal AddButton m-0 ms-1'
                onClick={addProductRow}
              >
                Add Product
              </button>
            </label>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Describe</th>
              <th>Size</th>
              <th>Unit</th>
              <th>Mass</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='product-table-body'>
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
                onQuantityChange={e => {
                  const updatedList = [...productList]
                  updatedList[index].quantity = parseInt(e.target.value)
                  setProductList(updatedList)
                  updateTotalPrice()
                }}
                onDelete={() => removeProductRow(item.product)}
              />
            ))}
          </tbody>
        </table>

        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </section>
    </div>
  )
}
const productData = {
  F: {
    name: 'Bàn làm việc / Bàn trang điểm ( chưa bao gồm gương soi )',
    describe:
      'Thùng MDF thường lõi vàng phủ melamine. Cánh MDF thường lõi vàng phủ melamine.',
    size: { long: 1, wide: 2, height: 3 },
    unit: 'Unit A',
    mass: 'Mass A',
    unit_price: 1
  },
  B: {
    name: 'Bàn làm việc / Bàn trang điểm ( chưa bao gồm gương soi )',
    describe: 'Product B Description',
    size: { long: 1, wide: 2, height: 3 },
    unit: 'Unit B',
    mass: 'Mass B',
    unit_price: 2
  },
  C: {
    name: 'Bàn làm việc / Bàn trang điểm ( chưa bao gồm gương soi )',
    describe: 'Product C Description',
    size: { long: 1, wide: 2, height: 3 },
    unit: 'Unit C',
    mass: 'Mass C',
    unit_price: 3
  }
}
console.log(productData)
