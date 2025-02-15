
import React, { useState } from "react";


export default function Staff () {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    quotationDate: ''
  })

  function handleChange (event) {
    const { name, value } = event.target
    setCustomerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }))
  }

  function handleSubmit (event) {
    event.preventDefault()

    console.log('Customer Info:', customerInfo)

    setCustomerInfo({
      name: '',
      phoneNumber: '',
      address: '',
      quotationDate: ''
    })
  }

  return (
    <div>
      <h2>Staff Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="customerName" htmlFor="name">
            Tên Khách Hàng:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={customerInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="customerName" htmlFor="phoneNumber">
            Số Điện Thoại:
          </label>
          <input
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            value={customerInfo.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="customerName" htmlFor="address">
            Địa Chỉ Công Trình:
          </label>
          <input
            type='text'
            id='address'
            name='address'
            value={customerInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="customerName" htmlFor="quotationDate">
            Ngày Soạn Báo Giá:
          </label>
          <input
            type='text'
            id='quotationDate'
            name='quotationDate'
            value={customerInfo.quotationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='HomepageBody-btn'>
          {/* <a
            href='#'
            className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button'
          >
            Xem Thêm
          </a> */}
          <button type='submit' className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button rounded' >Submit</button>
        </div>
      </form>
    </div>
  )
}
