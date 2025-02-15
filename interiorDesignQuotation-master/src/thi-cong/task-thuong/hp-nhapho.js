import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./thicong.css";
import HomePageBody from "../../component/khang-components/HomePageBody";

export default function Hpnhapho() {
    return (
        <div>
            <p className="border p-3">
                <Link to="/" className="text-decoration-none">
                    Trang chủ{" "}
                </Link>
                /
                Thi công nội thất nhà phố
            </p>
            <div class="container text-center">
                <h1 class="mt-3 display-7">
                    Báo giá Thi công nội thất Nhà Phố trọn gói 2024
                </h1>
            </div>
            <div className="banner-time">
                <span>
                    <time dateTime="25-1-2024">27/02/2024</time>
                    <div>
                        <img className="banner-img" src="./assets/images/logo.jpg"></img>
                    </div>
                </span>
            </div>
            <div className="main-container">
                <div className="contain-items tc-main">
                    <img className="img-wrapper" src="./assets/img-thicong/np1.jpeg" alt="Thi công nội thất" />
                    <div className="tc-main-header"><h1>Tổng Quan</h1></div>
                    <p><strong>Thiết kế nội thất nhà phố</strong> là một trong những xu hướng thiết kế nhận được sự quan tâm của chủ đầu tư công trình xây dựng.
                        Các căn nhà ở phổ biến hiện nay với đa dạng phong cách khác nhau từ hiện đại, tân cổ điển cho đến cổ điển,…
                        Tùy theo sở thích, gia chủ có thể chọn kiểu không gian mở, sử dụng chất liệu mới hay đi theo lối tối giản, thông minh,…
                        Cùng G7 tham khảo nhiều mẫu thiết kế nội thất nhà ở, nhà phố đẹp, hiện đại để có lựa chọn lý tưởng cho không gian sống bạn nhé!</p>
                    <h4><strong>Các phong cách thiết kế nội thất nhà phố được ưa chuộng hiện nay</strong></h4>
                    <p>Các thiết kế nội thất được ưa chuộng nhất ngày nay bao gồm:</p>
                    
                    <h5>Thiết kế nội thất nhà phố hiện đại </h5>
                    <p>Thiết kế nhà phố theo phong cách thiết kế nội thất hiện đại hướng đến việc mở rộng không gian tối đa và loại bỏ các chi tiết rườm rà.
                        Việc phân chia bố cục cũng đòi hỏi thật hợp lý, đảm bảo đơn giản nhưng vẫn sang trọng và có giá trị thẩm mỹ cao.</p>
                    <img className="img-wrapper" src="./assets/img-thicong/np2.jpg"></img>
                    <p className="text-center">Phong cách thiết kế nội thất hiện đại và tiện ích</p>
                    <img className="img-wrapper" src="./assets/img-thicong/np3.jpg"></img>
                    <p className="text-center">Mẫu phòng khách nhà phố được thiết kế theo phong cách nội thất hiện đại, sang trọng</p>
                    <img className="img-wrapper" src="./assets/img-thicong/np4.jpg"></img>
                    <p className="text-center">Mẫu phòng ngủ nhà phố được thiết kế, decor theo phong cách hiện đại </p>

                    <h5>Thiết kế nội thất nhà phố Tân Cổ Điển </h5>
                    <p>Phong cách thiết kế nội thất tân cổ điển là sự kết hợp hoàn hảo giữa lối thiết kế cổ điển và hiện đại. 
                        Xu hướng thiết kế nội thất tân cổ điển được nhiều gia chủ yêu thích bởi sự đơn giản, bài trí khoa học nhưng lại vô cùng tinh tế, hài hoà và sang trọng.</p>
                    <img className="img-wrapper" src="./assets/img-thicong/np5.jpg"></img>
                    <p className="text-center">Phong cách thiết kế nội thất tân cổ điển</p>
                    <img className="img-wrapper" src="./assets/img-thicong/np6.webp"></img>
                    <p className="text-center">Nội thất phòng bếp nhà phố được thiết kế theo phong cách Tân cổ điển</p>
                    <img className="img-wrapper" src="./assets/img-thicong/np7.jpg"></img>
                    <p className="text-center">Phòng Ngủ nhà phố được thiết kế theo phong cách Tân cổ điển</p>

                    <h5>Thiết kế nội thất nhà phố Cổ Điển </h5>
                    <p>Đặc trưng của phong cách cổ điển trong thiết kế nội thất chính là cảm giác ấm cúng, sang trọng, tinh tế và đẹp mắt.
                        Từng chi tiết được bố trí tỉ mỉ, đường nét tinh xảo, hoạ tiết chuyển động lộng lẫy, tạo ấn tượng cực mạnh khi nhìn vào. </p>
                    <img className="img-wrapper" src="./assets/img-thicong/np8.jpg"></img>
                    <p className="text-center">Phong cách thiết kế nội thất cổ điển</p>
                    <img className="img-wrapper" src="./assets/img-thicong/np9.webp"></img>
                    <p className="text-center">Nội thất phòng bếp nhà phố được thiết kế theo phong cách Tân cổ điển</p>
                    <img className="img-wrapper" src="./assets/img-thicong/np10.jpg"></img>
                    <p className="text-center">Phòng Ngủ nhà phố được thiết kế theo phong cách Tân cổ điển</p>

                    <h4><strong>Báo giá thi công nội thất nhà phố trọn gói mới nhất:</strong></h4>
                    <p>Tùy thuộc vào phong cách thiết kế nội thất mà bảng giá thiết kế thi công nhà phố sẽ thay đổi. Sau đây là bảng giá theo phong cách thiết kế bạn có thể tham khảo:</p>
                    <div>
                        <table className="table table-hover" >
                            <tbody>
                                <tr class="table-dark rounded">
                                    <th style={{ width: '30%' }}>Gói</th>
                                    <th>Giá phần nội thất</th>
                                    <th>Giá phần thô</th>
                                </tr>

                                <tr >
                                    <td style={{ textAlign: 'center' }} colSpan={3}><strong>Phong cách thiết kế Địa Trung Hải</strong></td>
                                </tr>
                                <tr>
                                    <td >cơ bản</td>
                                    <td >30.000.000-50.000.000</td>
                                    <td >Liên hệ</td>
                                </tr>
                                <tr>
                                    <td >Nâng cao</td>
                                    <td >30.000.000 – 50.000.000</td>
                                    <td >20.000.000 – 40.000.000</td>
                                </tr>
                                <tr>
                                    <td >Cao cấp</td>
                                    <td >70.000.000 – 90.000.000</td>
                                    <td >40.000.000 – 60.000.000</td>
                                </tr>

                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={3}><strong>Phong cách thiết kế Tân Cổ Điển</strong></td>

                                </tr>
                                <tr>
                                    <td>cơ bản</td>
                                    <td >50.000.000-70.000.000</td>
                                    <td >Liên hệ</td>
                                </tr>
                                <tr>
                                    <td >Nâng cao</td>
                                    <td >50.000.000 – 70.000.000</td>
                                    <td >20.000.000 – 40.000.000</td>
                                </tr>
                                <tr>
                                    <td >Cao cấp</td>
                                    <td >90.000.000 – 120.000.000</td>
                                    <td >40.000.000 – 60.000.000</td>
                                </tr>

                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={3}><strong>Phong cách thiết kế Hiện Đại</strong></td>

                                </tr>
                                <tr>
                                    <td>cơ bản</td>
                                    <td >50.000.000-70.000.000</td>
                                    <td >Liên hệ</td>
                                </tr>
                                <tr>
                                    <td >Nâng cao</td>
                                    <td >50.000.000 – 70.000.000</td>
                                    <td >20.000.000 – 40.000.000</td>
                                </tr>
                                <tr>
                                    <td >Cao cấp</td>
                                    <td >90.000.000 – 120.000.000</td>
                                    <td >40.000.000 – 60.000.000</td>
                                </tr>

                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={3}><strong>Phong cách thiết kế Cổ Điển</strong></td>

                                </tr>
                                <tr>
                                    <td>cơ bản</td>
                                    <td >70.000.000-120.000.000</td>
                                    <td >Liên hệ</td>
                                </tr>
                                <tr>
                                    <td >Nâng cao</td>
                                    <td >200.000.000 – 250.000.000</td>
                                    <td >20.000.000 – 40.000.000</td>
                                </tr>
                                <tr>
                                    <td >Cao cấp</td>
                                    <td >360.000.000 – 1.000.000.000</td>
                                    <td >40.000.000 – 60.000.000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                   
                    <h4>Các gói dịch vụ thi công nội thất nổi bật tại G7:</h4>
                    <h5>Thi công nội thất bao Combo</h5>
                    <p>
                        Thay vì dành thời gian cho việc lên ý tưởng, <Link style={{ textDecoration: 'none' }} to='/Thiết kế nội thất chung cư'>thiết kế nội thất</Link>,…
                        thì việc lựa chọn đơn vị thi công trọn gói sẽ tiết kiệm thời gian. G7 là đơn vị thi công nội thất trọn gói sẽ thay bạn hoàn thành tất cả các quy trình, hoàn thiện không gian sống. Dịch vụ thi công nội thất giá rẻ trọn gói bao gồm thiết kế nội thất phòng khách, phòng bếp, phòng ngủ, phòng vệ sinh, hệ thống điện, nước… nhưng vẫn đảm bảo dựa trên ý tưởng của chủ nhà.
                    </p>
                    <img className="img-wrapper" src="./assets/img-thicong/cc3.jpg"></img>
                    <p style={{ textAlign: 'center' }}>Dịch vụ thi công nội thất bao Combo tại G7</p>
                    <h5>Thi công nội thất phần thô:</h5>
                    <ul><p>Trước khi tiến hành thi công nội thất thì thi công phần thô bước đầu tiên,
                        các hạng mục phần thô cần cải tạo lại như phân lại không gian,
                        hệ thống điện nước,… G7 sẽ tiến hành các bước sau:</p>
                        <li><p>Kiểm tra tổng thể mặt bằng, hiện trạng các hạng mục, thống kê các hạng mục cần chỉnh sửa</p></li>
                        <li><p>Trao đổi, thống nhất với khách hàng những hạng mục cần cải tạo lại</p></li>
                        <li><p>Tiến hành tháo dỡ các phần hạng mục cần thiết kế lại</p></li>
                        <li><p>Thi công, thiết kế lại các hạng mục đã tháo dỡ</p></li>
                    </ul>
                    <img className="img-wrapper" src="./assets/img-thicong/np11.jpg"></img>
                </div>

                <aside className="side-bar sticky-top contain-items tc-sidebar"> {/*đây là sideball*/}
                    <div className="br-blog-sidebar__list">
                        <h2><span>Các Bản Mẫu</span></h2>
                        <div className="br-blog-sidebar items">
                            <div className="br-blog-sidebar items-1">
                                <Link to={'/Blog_Nhà_Phố'}><div><img src="./assets/img-thicong/np7.jpg"></img></div></Link>
                                <h5>Các thiết kế Nhà Phố</h5>
                            </div>
                            <div className="br-blog-sidebar items-1">
                                <Link to={'/Blog_Biệt_Thự'}><div><img src="./assets/IMG-Blog/vl2.jpg"></img></div></Link>
                                <h5>Các thiết kế Biệt Thự</h5>
                            </div>
                            <div className="br-blog-sidebar items-2"><button><p><Link style={{ textDecoration: 'none', color: 'white' }} to={'/blog'}>Xem Thêm</Link></p></button></div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
