import React, { useState, useEffect } from 'react'
import axios from 'axios' // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'
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
      {/* <td>
        <button className='AddButton m-0 ms-1' onClick={onDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td> */}
    </tr>
  )
}

export default function ConfirmBaoGiRequestCustomer () {
  const [productList, setProductList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [productOptions, setProductOptions] = useState([])
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
  const { id } = useParams()
  useEffect(() => {
    axios
      .get(
        `https://localhost:7224/api/ComboDesign/GetAllCombo`
      )
      .then(response => {
        setApiData(response.data)
        setLoading(false)
        console.log('CustomerRequestTest', response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        // `https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDACustomerSubmit/${id}`
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
        console.log(requests);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error)
      })
  }, [])

  // useEffect(() => {
  //   if (apiData.length > 0 && selectedProduct === '') {
  //     setSelectedProduct(apiData[0].Id)
  //     console.log(apiData[0].Id)
  //   }
  //   // updateTotalPrice();
  //   const options = apiData.map(product => (
  //     <option key={product.Id} value={product.Id}>
  //       {product.name}
  //     </option>
  //   ))
  //   setProductOptions(options)
  // }, [productList, selectedProduct, apiData])

  // function updateTotalPrice() {
  //   let total = 0;
  //   productList.forEach(({ product, quantity }) => {
  //     const unitPrice = apiData.find(item => item.Id === product).unit_price;
  //     total += quantity * unitPrice;
  //   });
  //   setTotalPrice(total);
  //   localStorage.setItem('productList', JSON.stringify(productList));
  // }

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
  function handleAccept () {
    handleSubmit('true')
  }
  function handleDecline () {
    handleSubmit('decline')
  }
  function handleSubmit (status) {
    if (!customerName || !phoneNumber || !projectAddress || !quotationDate) {
      toast.error('Vui lòng điền đầy đủ thông tin khách hàng!')
      return
    }

    if (productList.length === 0) {
      toast.error('Vui lòng thêm ít nhất một sản phẩm!')
      return
    }

    const dataToSend = {
      // customerName: customerName,
      status: status,
      // phoneNumber: phoneNumber,
      // projectAddress: projectAddress,
      // quotationDate: quotationDate,
      // products: productList.map(item => ({
      //   Id: item.product,
      //   areaSquareValue: item.quantity
      // }))
    }

    axios
      .put(
        `https://localhost:7224/api/ConstructionPriceQuotation/QuotationId/Update?id=${id}`,
        dataToSend
      )
      .then(response => {
        console.log('Data updated successfully:', response.data)
        if (status === 'true') {
          toast.success('Xác nhận thành công')
        } else {
          toast.success('Từ chối xác nhận thành công')
        }
      })
      .catch(error => {
        console.error('Error updating data:', error)
        toast.error('Có lỗi xảy ra khi cập nhật báo giá!')
      })
  }
  //Alert Start
  const [showModal, setShowModal] = useState(false)

  function handleDecline () {
    setShowModal(true)
  }

  function confirmDecline () {
    handleSubmit('decline')
    setShowModal(false)
  }

  function cancelDecline () {
    setShowModal(false)
  }

  //Alert End
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
                <input
                  type='text'
                  id='customerName'
                  placeholder='Nhập tên khách hàng'
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
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
                  onChange={e => setPhoneNumber(e.target.value)}
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
      </div>
      {loading ? (
        <div id='preloader'>
          <div class='spinner-border' role='status'>
            <span class='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <section id='quotation'>
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
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody id='product-table-body'>
              {productList.map((item, index) => (
                <ProductRow
                  key={index}
                  productID={item.product}
                  productName={
                    apiData.find(product => product.Id === item.product)
                      ?.name || 'Product Name Loading...'
                  }
                  description={
                    apiData.find(product => product.Id === item.product)
                      ?.describe || 'Description Loading...'
                  }
                  unit={
                    apiData.find(product => product.Id === item.product)
                      ?.unit || 'Unit Loading...'
                  }
                  mass={
                    apiData.find(product => product.Id === item.product)
                      ?.mass || 'Mass Loading...'
                  }
                  unitPrice={
                    apiData.find(product => product.Id === item.product)
                      ?.unit_price || 'Price Loading...'
                  }
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
          <div className='button-area justify-content-center'>
            <button
              type='button'
              className='Finish_button BaogiaAccept-button'
              onClick={handleAccept}
            >
              Gửi xác nhận
            </button>
            <button
              type='button'
              className='Finish_button BaogiaDecline-button'
              onClick={handleDecline}
            >
              Gửi từ chối
            </button>
            <div className={`modal fade ${showModal ? 'active' : ''}`}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <p>Bạn có chắc chắn muốn gửi từ chối?</p>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                      onClick={confirmDecline}
                    >
                      Có
                    </button>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={cancelDecline}
                    >
                      Không
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {formSubmitted && <p style={{color: 'green'}}>Báo giá đã được gửi!</p>} */}
          {formSubmitted}
          <div className='dropdown-divider border-black mb-5'></div>
        </section>
      )}
      <ToastContainer position='top-right' />
    </div>
  )
}
