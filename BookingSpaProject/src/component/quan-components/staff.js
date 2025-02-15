import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './staff.css'

function Staff () {
  const [notificationList, setNotificationList] = useState([])

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        // 'https://65e4119b3070132b3b242651.mockapi.io/api/InteriorDesignArticle/IDACustomerSubmit'
        'https://localhost:7224/api/ConstructionPriceQuotation/GetAllQuotation'
      )
      setNotificationList(response.data)
      console.log('setNotificationList', response.data)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const chunkArray = (array, size) => {
    const chunkedArr = []
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size))
    }
    return chunkedArr
  }

  return (
    <div>
      <h1>Trang nhận và quản lý thông báo</h1>
      <div className='container-fluid'>
        {chunkArray(notificationList, 4).map((row, rowIndex) => (
          <div key={rowIndex} className='d-flex justify-content-between w-100'>
            {row.map(notification => (
              // console.log('Notification status:', notification.status),
              // console.log('Notification id:', notification.id),

              // console.log('Notification id:', notification.id),
              console.log('Notification Id:', notification.quotationId),

              // <div key={notification.id} className={`notification m-2 w-100 overflow-hidden ${notification.status === 'true' ? 'blue' : 'red'}`}>
              <div  className={`notification m-2 w-100 overflow-hidden ${notification.status === 'true' ? 'green' : notification.status === 'Still on going' ? 'yellow':'red'}`}>
                <h3>Thông báo mới:</h3>
                <div className='customerLeft'>
                  <p>
                    <strong>Id:</strong> {notification.customerId}
                  </p>
                  <p>
                    <strong>Tên khách hàng:</strong> {notification.customerName}
                  </p>
                  <p>
                    <strong>Địa chỉ dự án:</strong>{' '}
                    {notification.projectAddress}
                  </p>
                  <Link to={`/Báo_Giá/${notification.quotationId}`}>
                    <button datatype=''>Chi tiết</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className='scrollToTopBtn' onClick={scrollToTop}>
        <span className='arrow-up'></span>
      </button>
    </div>
  )
}

export default Staff
