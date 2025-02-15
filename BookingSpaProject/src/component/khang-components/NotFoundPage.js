import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../khang-components/NotFoundPage.css' // Import custom CSS
import { Link } from 'react-router-dom'
function NotFoundPage () {
  return (
    <div className='container text-center flex-column'>
      <div className='dropdown-divider border-black mb-5'></div>
      <div className='display-1-container'>
      <h1 className='display-1'>
        Ô, có vẻ như bạn chưa đăng nhập hoặc đăng kí
      </h1>
      <p className='lead'>Vui lòng nhấn nút dưới để đăng nhập</p>
      <div className='d-flex justify-content-center'>
        <div className='HomepageBody-btn'>
          <Link
            to='/Đăng_nhập'
            className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button mx-2 mb-5'
          >
            Đến đăng nhập
          </Link>
        </div>
      </div>
      </div>
      <div className='dropdown-divider border-black mb-5'></div>
    </div>
  )
}

export default NotFoundPage
