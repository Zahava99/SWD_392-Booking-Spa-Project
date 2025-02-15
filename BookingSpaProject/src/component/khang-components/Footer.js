import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
export default function Footer () {
  return (
    <div className='container-fluid'>
      <div className='row row-cols-3 bg-black FooterContainer'>
        <div className='cols'>
          <div className='FooterAddress'>
            <p>
              <strong className='FooterAddress'>THÔNG TIN LIÊN HỆ</strong>
            </p>
            <p>
              <strong>Showroom: </strong>
              <a href='#' className='FooterAddressLink'>
                Av. A Phillips, 1, Zona Industrial San Vicente
              </a>
            </p>
            <p>
              <strong>Xưởng: </strong>
              <a href='#' className='FooterAddressLink'>
                Av. A Phillips, 1, Zona Industrial San Vicente
              </a>
            </p>
            <p>
              <strong>Thời gian làm việc:</strong>
              <ul>
                <li>Thứ 2 đến CN: Từ 8h đến 17h</li>
                <li>Online: Hỗ trợ 24/7</li>
              </ul>
            </p>
            <p>Hotline: 0243 5536750</p>
            <p>Email: NotRealEmail@gmail.com</p>
          </div>
        </div>
        <div className='cols d-flex flex-row justify-content-between'>
          <div className='FooterAddress'>
            <p>
              <strong className='FooterAddress'>DỊCH VỤ NỔI BẬT</strong>
            </p>
            <p>
              <a href='#' className='FooterAddressLink'>
                Thiết kế nội thất{' '}
              </a>
            </p>
            <p>
              <a href='#' className='FooterAddressLink'>
                Thiết kế nội thất chung cư{' '}
              </a>
            </p>
            <p>
              <a href='#' className='FooterAddressLink'>
                Thiết kế nội thất nhà phố{' '}
              </a>
            </p>
            <p>
              <a href='#' className='FooterAddressLink'>
                Thiết kế nội thất biệt thự{' '}
              </a>
            </p>
            <p>
              <a href='#' className='FooterAddressLink'>
                Thi công nội thất
              </a>
            </p>
          </div>
          <div className='FooterAddress'>
            <p>
              <strong>HỖ TRỢ KHÁCH HÀNG</strong>
            </p>
            <p>
              <a href='#' className='FooterAddressLink'>
                Quy trình và Bảo hành
              </a>
            </p>
            <p>
              <a href='#' className='FooterAddressLink'>
                Chính sách trả góp
              </a>
            </p>
          </div>
        </div>
        <div className='cols'>
          <div className='FooterAddress'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11104.92093246045!2d-67.62883490944347!3d10.246864674545131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e803c6494d63abd%3A0xc23ea6cc6d8e969c!2sZona%20Industrial%20San%20Vicente%201%2C%20Maracay%202103%2C%20Aragua%2C%20Venezuela!5e0!3m2!1svi!2s!4v1705978452804!5m2!1svi!2s'
              width='400'
              height='200'
              style={{ border: '0' }}
              allowfullscreen=''
              loading='lazy'
              referrerpolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
          <div class='FooterAddress-social-media'>
            <a href='#'>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href='#'>
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a href='#'>
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href='#'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href='#'>
              <FontAwesomeIcon icon={faFacebookMessenger} />
            </a>
          </div>
        </div>
        <div className='dropdown-divider'></div>
        <div className='align-content-center container-fluid mt-2' style={{color:'white'}}>© Copyright 2024 by G7</div>
      </div>
    </div>
  )
}
