import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./thicong.css";
import HomePageBody from "../../component/khang-components/HomePageBody";

export default function Hpchungcu() {
    return (
        <div>
            <p className="border p-3">
                <Link to="/" className="text-decoration-none">
                    Trang chủ{" "}
                </Link>
                /
                Thi công nội thất chung cư
            </p>
            <div class="container text-center">
                <h1 class="mt-3 display-7">
                    Báo giá Thi công nội thất chung cư trọn gói 2024
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
                    <img className="img-wrapper" src="./assets/img-thicong/cc1.jpg" alt="Thi công nội thất" />
                    <div className="tc-main-header"><h1>Tổng Quan</h1></div>
                    <p>Cuộc sống hiện đại, con người luôn hướng đến những trải nghiệm hoàn hảo trong không gian sống. Bởi vậy, nhu cầu thiết kế,
                        thi công nội thất tăng theo từng ngày. Trong đó, thi công chính là quá trình hoàn thiện vẻ đẹp cho chung cư dựa trên thiết kế đã có.
                        Anh chị đang có nhu cầu thi công nội thất chung cư tại TPHCM
                        thì bài viết sau của G7 sẽ giới thiệu về dịch vụ cũng như <strong>báo giá thi công nội thất chung cư trọn gói.</strong></p>
                    <h4>Báo giá thi công nội thất chung cư trọn gói mới nhất:</h4>
                    <p>Mỗi căn chung cư sẽ có những phương án thiết kế, thi công nội thất riêng nên chi phí cũng có sự khác nhau.
                        Báo giá thi công nội thất chung cư thực tế tùy thuộc vào nhiều yếu tố như diện tích, phong cách, vật liệu,…</p>
                    <p>Dưới đây là một số bảng báo giá theo vật liệu và phong cách thiết kế nội thất tại G7:</p>
                    <h5 style={{ textAlign: 'center' }}>Bảng giá thi công nội thất căn hộ trọn gói 1 phòng ngủ</h5>
                    <p>Khi thi công thiết kế nội thất phòng ngủ, gia chủ có thể tham khảo các phong cách thiết kế hiện đại, Địa Trung Hải với đơn giá tham khảo sau:</p>
                    <div>
                        <table className="table table-hover" >
                            <tbody>
                                <tr class="table-dark rounded">
                                    <th style={{ width: '30%' }}>Gói</th>
                                    <th>Giá phần nội thất</th>
                                    <th>Giá phần thô</th>
                                </tr>

                                <tr >
                                    <td style={{ textAlign: 'left' }} colSpan={3}><strong>Phong cách thiết kế Địa Trung Hải</strong></td>
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
                                    <td style={{ textAlign: 'left' }} colSpan={3}><strong>Phong cách thiết kế Hiện Đại</strong></td>

                                </tr>
                                <tr>
                                    <td>cơ bản</td>
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
                            </tbody>
                        </table>
                    </div>
                    <h5 style={{ textAlign: 'center' }}>Chi phí thi công nội thất chung cư trọn gói 2 phòng ngủ</h5>
                    <p>Dựa trên nhu cầu và sở thích,
                        gia chủ có thể lựa chọn các phong cách thiết kế nội thất chung cư 2 phòng ngủ như:
                        Japandi, Industrial,…
                        Gia chủ có thể tham khảo bảng kinh phú dự trù sau:</p>
                    <table className="table table-hover" >
                        <tbody>
                            <tr class="table-dark rounded">
                                <th style={{ width: '30%' }}>Gói</th>
                                <th>Giá phần nội thất</th>
                                <th>Giá phần thô</th>
                            </tr>

                            <tr >
                                <td style={{ textAlign: 'left' }} colSpan={3}><strong>Phong cách Japandi</strong></td>
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
                                <td style={{ textAlign: 'left' }} colSpan={3}><strong>Phong cách Industrial (Phong cách thiết kế công nghiệp)</strong></td>

                            </tr>
                            <tr>
                                <td>cơ bản</td>
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
                        </tbody>
                    </table>

                    <h5 style={{ textAlign: 'center' }}>Chi phí thi công nội thất chung cư trọn gói 3 phòng ngủ</h5>
                    <p>Giá thi công nội thất trọn gói chung cư 3 phòng ngủ
                        thường dựa vào kích thước, số lượng đồ nội thất và phong cách thiết kế.
                        Dưới đây là bảng báo
                        giá thiết kế nội thất chung cư 3 phòng ngủ theo từng phong cách
                        mà bạn có thể tham khảo:</p>
                    <table className="table table-hover" >
                        <tbody>
                            <tr class="table-dark rounded">
                                <th style={{ width: '30%' }}>Gói</th>
                                <th>Giá phần nội thất</th>
                                <th>Giá phần thô</th>
                            </tr>

                            <tr >
                                <td style={{ textAlign: 'left' }} colSpan={3}><strong>Phong cách Scandinavian (Bắc Âu)</strong></td>
                            </tr>
                            <tr>
                                <td >cơ bản</td>
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
                                <td style={{ textAlign: 'left' }} colSpan={3}><strong>Phong cách tân cổ điển</strong></td>

                            </tr>
                            <tr>
                                <td >cơ bản</td>
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
                        </tbody>
                    </table>
                    <img className="img-wrapper" src="./assets/img-thicong/cc2.webp"></img>
                    <p className="text-center">G7 tư vấn và báo giá thi công nội thất trọn gói TPHCM</p>
                    <h4><strong>Chi phí thi công nội thất chung cư phụ thuộc vào những yếu tố nào?</strong></h4>
                    <h5>Chất lượng của đồ nội thất</h5>
                    <p>Chất lượng của đồ nội thất là yếu tố quan trọng quyết định đến chi phí thiết kế thi công
                        nội thất chung cư trọn gói.
                        Chất liệu của đồ nội thất càng cao cấp thì chi phí càng cao.
                        Ví dụ như khi bạn lựa chọn bộ bàn ghế được làm từ gỗ hương hay gỗ sồi thì giá thành sẽ
                        đắt hơn bàn ghế được làm bằng gỗ công nghiệp thông thường.
                        Chính vì vậy, khi lựa chọn các sản phẩm nội thất,
                        bạn cần cân đối mức tài chính của mình cho phù hợp.</p>
                    <h5>Tùy theo diện tích của căn hộ</h5>
                    <p>Diện tích căn hộ cũng là một trong những yếu tố tác động tới chi phí thi công.
                        Những căn hộ chung cư có diện tích lớn sẽ mất chi phí cao hơn cho thi công phần thô như trét bả, sơn tường… Đồng thời, các sản phẩm nội thất cũng sẽ được dùng nhiều hơn để đảm bảo phù hợp với không gian. Ngược lại, diện tích chung cư nhỏ, chi phí cho những phần này sẽ thấp hơn.</p>
                    <h5>Các phong cách thiết kế nội thất</h5>
                    <p>Có rất nhiều phong cách thiết kế nội thất chung cư như:
                        phong cách Rustic hiện đại, phong cách Wabi Sabi mộc mạc gần gũi,
                        phong cách Minimalism đơn giản, tinh tế, phong cách Scandinavian phóng khoáng tự do,
                        phong cách thiết kế nội thất Tân Cổ Điển hay phong cách Luxury sang trọng, đẳng cấp, phong cách Bauhaus ấn tượng, độc đáo… Mỗi một phong cách thiết kế nội thất sẽ phù hợp với những sản phẩm nội thất khác nhau,
                        vì vậy cũng sẽ có độ chênh lệch về chi phí thi công nội thất căn hộ.</p>

                    <h4>Các gói dịch vụ thi công nội thất nổi bật tại G7:</h4>
                    <h5>Thi công nội thất bao Combo</h5>
                    <p>
                        Thay vì dành thời gian cho việc lên ý tưởng, <Link style={{ textDecoration: 'none' }} to='/Thiết_kế_nội_thất_chung_cư'>thiết kế nội thất</Link>,…
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
                    <img className="img-wrapper" src="./assets/img-thicong/cc4.jpg"></img>
                </div>

                <aside className="side-bar sticky-top contain-items tc-sidebar"> {/*đây là sideball*/}
                    <div className="br-blog-sidebar__list">
                        <h2><span>Các Bản Mẫu</span></h2>
                        <div className="br-blog-sidebar items">
                            <div className="br-blog-sidebar items-1">
                                <Link to={'/Blog_Chung_Cư'}><div><img src="./assets/IMG-Blog/AP1.jpg"></img></div></Link>
                                <h5>Các thiết kế Chung Cư</h5>
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
