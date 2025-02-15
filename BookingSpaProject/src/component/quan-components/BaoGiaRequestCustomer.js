import React, { useState, useEffect } from 'react'
import axios from 'axios' // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
function ProductRow ({
  productID,
  productName,
  describe,
  size,
  unit,
  mass,
  unitPrice,
  quantity,
  houseTypeOptions,
  selectedHouseType,
  onQuantityChange,
  onDelete
}) {
  const houseTypeTranslations = {
    Apartment: 'Chung cư',
    House: 'Căn Hộ',
    Office: 'Văn Phòng',
    Villa: 'Biệt Thự'
  }
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
      </td>
      <td>{houseTypeTranslations[selectedHouseType]}</td>
      <td>
        <button className='AddButton m-0 ms-1' onClick={onDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  )
}

export default function BaoGiaRequestCustomer () {
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
  const [searchTerm, setSearchTerm] = useState('')
  const [houseTypeOptions, setHouseTypeOptions] = useState({})
  const [selectedHouseType, setSelectedHouseType] = useState('')
  const [isProductAdded, setIsProductAdded] = useState(false)
  useEffect(() => {
    axios
      .get(
        'https://localhost:7224/api/ComboDesign/GetAllCombo'
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
    setSelectedProduct('')
  }, [searchTerm])
  useEffect(() => {
    const filteredData = apiData.filter(product =>
      product.typeName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const options = filteredData.map(product => (
      <option key={product.comboId} value={product.comboId}>
        {product.typeName}
      </option>
    ))

    setProductOptions(options)
  }, [searchTerm, apiData])
  useEffect(() => {
    if (selectedProduct) {
      const selectedProductData = apiData.find(
        product => product.comboId === selectedProduct
      )
      if (selectedProductData && selectedProductData.houseTypeOptions) {
        setHouseTypeOptions(selectedProductData.houseTypeOptions)
      }
      console.log('houseTypeOptions:', houseTypeOptions)
    }
  }, [selectedProduct, apiData])

  
  function updateTotalPrice () {
    let total = 0
    productList.forEach(({ product, quantity }) => {
      const unitPrice = apiData.find(
        item => item.comboId === product
      ).unit_price
      total += quantity * unitPrice
    })
    setTotalPrice(total)
    localStorage.setItem('productList', JSON.stringify(productList))
  }

  function handleProductChange (event) {
    const selectedProductId = event.target.value
    setSelectedProduct(selectedProductId)
  }

  function handleAreaSquareValue (event) {
    const inputValue = event.target.value
    if (!/^\d*$/.test(inputValue)) {
      toast.warning('Vui lòng chỉ nhập số cho diện tích!')
      setAreaSquareValue('')
    } else {
      setAreaSquareValue(inputValue)
    }
  }

  function addProductRow () {
    console.log('Adding product row...')
    if (areaSquareValue <= 0 || !selectedHouseType) {
      toast.error(
        'Vui lòng chọn diện tích, chọn loại công trình và thiết kế!'
      )
      return
    }
    if (isProductAdded === true) {
      toast.error('Chỉ được chọn một thiết kế trong một yêu cầu')
      return
    }
    const newRow = {
      product: selectedProduct,
      quantity: areaSquareValue,
      houseType: selectedHouseType
    }
    setProductList([...productList, newRow])
    setIsProductAdded(true)
    updateTotalPrice()
  }

  function removeProductRow (product) {
    const updatedList = productList.filter(item => item.product !== product)
    setProductList(updatedList)
    setIsProductAdded(false)
    setProductList([])
    setSelectedProduct('')
    setAreaSquareValue('')
    setSelectedHouseType('')
    localStorage.setItem('productList', JSON.stringify(updatedList))
  }

  function handlePhoneNumber (e) {
    const inputValue = e.target.value
    if (isNaN(inputValue)) {
      toast.error('Vui lòng chỉ nhập số cho Số điện thoại!')
    } else {
      setPhoneNumber(inputValue)
    }
  }

  const onlyCharactersRegex = /^[a-zA-Z\sÀ-Ỹà-ỹ]*$/
  function handleCustomerNameChange (event) {
    const value = event.target.value
    if (onlyCharactersRegex.test(value) || value === '') {
      setCustomerName(value)
    } else {
      toast.error('Tên khách hàng chỉ được chứa ký tự chữ cái và dấu cách!')
    }
  }

  function handleHouseTypeChange (event) {
    const selectedHouseType = event.target.value
    console.log('Selected House Type:', selectedHouseType)
    console.log('House Type Options:', houseTypeOptions)
    setSelectedHouseType(selectedHouseType)
  }
  //Alert Start
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  function handleGoToRequestManager () {
    navigate('/Customers_Request_Management')
    setShowModal(false)
  }

  function handleGoToHomepage () {
    navigate('/')
    setShowModal(false)
  }

  function handleClose () {
    setShowModal(false)
  }
  //Alert End
  const houseTypeTranslations = {
    Apartment: 'Chung cư',
    House: 'Căn Hộ',
    Office: 'Văn Phòng',
    Villa: 'Biệt Thự'
  }
  function handleSubmit () {
    if (!customerName || !phoneNumber || !projectAddress || !quotationDate) {
      toast.error('Vui lòng điền đầy đủ thông tin khách hàng!')
      return
    }

    if (productList.length === 0) {
      toast.error('Vui lòng nhập diện tích và thêm sản phẩm!')
      return
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    console.log("decoToken", decodedToken);

    const userId =
      decodedToken[
        "Id"
      ];
      console.log("userId", userId);
    const dataToSend = {
      customerId: userId, 
      customerName: customerName,
      phoneNumber: phoneNumber,
      projectAddress: projectAddress,
      quotationDate: quotationDate,
      requests: productList.map(item => {
        const selectedProductData = apiData.find(
          product => product.comboId === item.product
        )
        const houseTypePrice =
          selectedProductData?.houseTypeOptions.find(
            option => option.houseType === item.houseType
          )?.houseTypePrice || 'Price Loading...'
        console.log('selectedHouseTypeInfo', houseTypePrice)
        return {
          name:
            apiData.find(product => product.comboId === item.product)?.typeName ||
            'Product Name Loading...',
          describe:
            apiData.find(product => product.comboId === item.product)
              ?.describe || 'Description Loading...',
          unit_price:
            apiData.find(product => product.comboId === item.product)
              ?.unit_price || 'Price Loading...',
          areaSquareValue: item.quantity,
          houseSType: item.houseType,
          houseTypePrice: houseTypePrice
        }
      })
    }

    axios
      .post(
        'https://localhost:7224/api/ConstructionPriceQuotation/Create',
        dataToSend
      )
      .then(response => {
        console.log('Data sent successfully:', response)
        toast.success('Yêu cầu báo giá thanh cong!')
        setFormSubmitted(true)

        setCustomerName('')
        setPhoneNumber('')
        setProjectAddress('')
        setQuotationDate('')
        setProductList([])
        setSelectedProduct('')
        setAreaSquareValue('')
        setSelectedHouseType('')

        setShowModal(true)

        const requestId = response.data.comboId;
        console.log('Request ID:', response);
        const requests = JSON.parse(localStorage.getItem('comboId')) || [];
        requests.push(requestId);
        localStorage.setItem('comboId', JSON.stringify(requests));
      })
      .catch(error => {
        console.error('Error sending data:', error)
        toast.error('Đã có lỗi xảy ra khi gửi yêu cầu!')
      })
  }
  return (
    <div className='container-fluid'>
      <div className='LogoAndTitle'>
        <div className='dropdown-divider border-black mb-5'></div>
        <div className='Title'>Yêu cầu báo giá</div>
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
                <strong>Ngày yêu cầu báo giá:</strong>
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
          <form className='d-flex flex-column'>
            <div className='d-flex w-100 justify-content-between'>
              <label
                htmlFor='selectProduct'
                className='SelectProduct w-100 justify-content-between me-1 align-items-center'
              >
                Chọn thiết kế:
                <input
                  type='text'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='SearchInputBaoGia'
                  placeholder='Tìm kiếm sản phẩm...'
                />
                <select
                  id='selectProduct'
                  value={selectedProduct}
                  onChange={handleProductChange}
                  className='form-select productSelect fs-6 DropdownBaoGia'
                >
                  <option value='' disabled hidden>
                    Chọn thiết kế
                  </option>
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
                  className='Quantity productSelect m-0 ms-1'
                  placeholder='Nhập số diện tích - Đơn vị: m2'
                />
                <button
                  type='button'
                  className='w-25 fs-6 fw-normal AddProduct m-0 ms-1'
                  onClick={addProductRow}
                >
                  Thêm sản phẩm
                </button>
              </label>
            </div>
            <div className='d-flex'>
              <label
                htmlFor='selectHouseType'
                className='SelectHouseType w-100 text-black fw-normal align-items-center justify-content-start'
              >
                Chọn loại công trình:
                <select
                  id='selectHouseType'
                  value={selectedHouseType}
                  onChange={handleHouseTypeChange}
                  className='form-select houseTypeSelect fs-6 DropdownLoaiNha'
                >
                  <option value='' disabled hidden>
                    --Chọn loại công trình--
                  </option>
                  {Object.entries(houseTypeOptions).map(
                    ([houseType, houseTypeName]) => (
                      <option
                        key={houseTypeName.houseType}
                        value={houseTypeName.houseType}
                      >
                        {console.log('HouseTypeOptions', houseTypeName)}
                        {houseTypeTranslations[houseTypeName.houseType]}
                      </option>
                    )
                  )}
                </select>
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
                  apiData.find(product => product.comboId === item.product)
                    ?.typeName || 'Product Name Loading...'
                }
                describe={
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
                quantity={item.quantity}
                houseTypeOptions={houseTypeOptions}
                selectedHouseType={item.houseType}
                onDelete={() => removeProductRow(item.product)}
                />
              ))}
            </tbody>
          </table>

          <button
            type='button'
            className='Finish_button'
            onClick={handleSubmit}
          >
            Gửi yêu cầu
          </button>
          <div className={`modal fade ${showModal ? 'active' : ''}`}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <p>
                  Yêu cầu đã được gửi thành công <br />
                  Bạn có muốn đến trang quản lý yêu cầu báo giá ?
                </p>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                    onClick={handleGoToRequestManager}
                  >
                    Đến
                  </button>
                  ,
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleGoToHomepage}
                  >
                    Quay về trang chủ
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleClose}
                  >
                    Đóng thông báo
                  </button>
                </div>
              </div>
            </div>
          </div>
          {formSubmitted}
          <div className='dropdown-divider border-black mb-5'></div>
        </section>
      )}
      <ToastContainer position='top-right' />
    </div>
  )
}
