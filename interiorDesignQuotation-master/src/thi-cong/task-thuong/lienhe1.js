import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import "./thicong.css";

import HomePageBody from "../../component/khang-components/HomePageBody";

export default function Lienhe() {
    return (
        <div>
            <p className="border p-3">
                <Link to="/" className="text-decoration-none">
                    Trang chủ{" "}
                </Link>
                /
                Liên Hệ
            </p>

            <div className="main-container">
                <div className="contain-items tc-main">
                    <h1 style={{textAlign: 'center', marginBottom: '12px'}}>ĐƠN VỊ THI CÔNG & BÁO GIÁ NỘI THẤT G7</h1>
                    <img className="img-wrapper" src="./assets/img-thicong/bt1.jpg" alt="Thi công nội thất" />
                    <p>Khởi nguồn từ xưởng mộc sản xuất nội thất, chúng tôi luôn phát triển với phương châm “Chất Lượng Bù Số Lượng”
                        và dần trở thành thương hiệu uy tín về dịch vụ Thiết Kế - Thi Công – Sản Xuất nội thất chuyên nghiệp.
                        Sở hữu đội ngũ nhân viên giàu kinh nghiệm, đầy sáng tạo,
                        không ngừng cập nhật những phong cách nội thất thời thượng để đáp ứng được những nhu cầu của quý khách hàng,
                        cũng như đem đến trải nghiệm tuyệt vời nhất khi bạn lựa chọn đến với G7.</p>
                    <div>
                        <ul style={{textAlign:'center', listStyleType: 'none'}}>
                            <h4>THÔNG TIN LIÊN HỆ</h4>
                            <li><strong>Hotline:</strong> 0243.553.6750 </li>
                            <li><strong>Email:</strong> NotRealEmail@gmail.com</li>
                        </ul>
                    </div>
                    
                    <div class='FooterAddress-social-media icon-footer'>
                        <a href='#'>
                            <FontAwesomeIcon className="items-icon" icon={faFacebookSquare} />
                        </a>
                        <a href='#'>
                            <FontAwesomeIcon className="items-icon" icon={faTiktok} />
                        </a>
                        <a href='#'>
                            <FontAwesomeIcon className="items-icon" icon={faYoutube} />
                        </a>
                        <a href='#'>
                            <FontAwesomeIcon className="items-icon" icon={faTwitter} />
                        </a>
                        <a href='#'>
                            <FontAwesomeIcon className="items-icon" icon={faFacebookMessenger} />
                        </a>
                    </div>
                    <div style={{ padding: '10px' }}></div>

                </div>
            </div>
        </div>)
}