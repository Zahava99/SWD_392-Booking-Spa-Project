import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./thicong.css";
import HomePageBody from "../../component/khang-components/HomePageBody";

export default function Hpvanphong() {
    return (
        <div>
            <p className="border p-3">
                <Link to="/" className="text-decoration-none">
                    Trang chủ{" "}
                </Link>
                /
                Thi công nội thất văn phòng
            </p>
            <div class="container text-center">
                <h1 class="mt-3 display-7">
                    Báo giá Thi công nội thất Văn Phòng trọn gói 2024
                </h1>
            </div>
            <div className="banner-time">
                <span>
                    <time dateTime="25-1-2024">28/02/2024</time>
                    <div>
                        <img className="banner-img" src="./assets/images/logo.jpg"></img>
                    </div>
                </span>
            </div>
            <div className="main-container">
                <div className="contain-items tc-main">
                    <img className="img-wrapper" src="./assets/img-thicong/vp2.jpeg" alt="Thi công nội thất" />
                    <div className="tc-main-header"><h1>Tổng Quan</h1></div>
                    <p><strong>Thi công nội thất văn phòng</strong> đòi hỏi phải tìm kiếm đơn vị thiết kế chuyên nghiệp, uy tín nhằm đảm bảo hoàn thiện quy trình đúng tiến độ và đem lại kết quả hài lòng nhất.
                         Hiện nay, G7 là một trong những lựa chọn ưu tiên số một của phần lớn khách hàng.
                         Chúng tôi tự hào sở hữu đội ngũ nhân viên có tay nghề cao, quy trình khép kín không qua trung gian với chi phí thiết kế, thi công nội thất cạnh tranh và cam kết mang lại trải nghiệm hài lòng nhất. </p>
                    <h4><strong>Tiêu chí lựa chọn đơn vị thiết kế thi công nội thất văn phòng uy tín</strong></h4>
                    <ul><p>Thiết kế thi công nội thất văn phòng là một quy trình tương đối phức tạp, đòi hỏi phải cân nhắc kỹ lưỡng nhiều yếu tố để đảm bảo đạt được kết quả hài lòng nhất.
                         Do đó, khách hàng nên ưu tiên lựa chọn đơn vị thi công chuyên nghiệp, dày dặn kinh nghiệm và có chuyên môn cao trong lĩnh vực này.
                         Theo kinh nghiệm của G7, dưới đây là một số tiêu chí quan trọng bạn nên đặc biệt cân nhắc:</p>
                         <li><p>Công ty có hồ sơ năng lực, giấy phép kinh doanh và thông tin địa chỉ rõ ràng. </p></li>
                         <li><p>Website công ty thường xuyên cập nhật thông tin dự án mới, đảm bảo nội dung chất lượng, hình ảnh đa dạng. </p></li>
                         <li><p>Quy trình làm việc chuyên nghiệp, không qua trung gian phức tạp, đảm bảo tiến độ đã đề ra.</p></li>
                         <li><p>Chi phí hợp lý, giá tại xưởng, không qua bước trung gian giúp tiết kiệm chi phí đáng kể</p></li>
                         </ul>
                         <h4><strong>Những hạng mục trong thiết kế thi công nội thất văn phòng</strong></h4>
                            <ul>
                                <p>Dưới đây là những hạng mục quan trọng khi thi công một văn phòng hoàn chỉnh.</p>
                                <li>Phòng họp</li>
                                <li>Phòng giám đốc</li>
                                <li>Phòng làm việc nhân viên</li>
                                <li>Quầy lễ tân</li>
                            </ul>
                    
                    <h5>Thiết kế thi công nội thất phòng họp </h5>
                    <p>Phòng họp là nơi diễn các cuộc họp chiến lược và triển khai dự án của công ty. Vì vậy, khi thiết kế thi công nội thất phòng họp cần trang bị đầy đủ máy chiếu, thiết bị âm thanh, ánh sáng chuyên nghiệp.
                         Thậm chí, với những phòng họp cấp cao yêu cầu gồm cả tiêu chuẩn cách âm cao.</p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp3.jpg"></img>
                    <p className="text-center">Phong cách thiết kế nội thất hiện đại và tiện ích</p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp4.webp"></img>
                    <p className="text-center">Phòng họp cần trang bị đầy đủ máy chiếu, thiết bị âm thanh, ánh sáng chuyên nghiệp</p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp5.webp"></img>
                    <p className="text-center">Thiết kế nội thất văn phòng phải trang nhã, sang trọng để đón tiếp khách hàng </p>

                    <h5>Thiết kế thi công nội thất phòng lãnh đạo </h5>
                    <p>Thiết kế thi công nội thất phòng lãnh đạo, giám đốc phải thể hiện được vị trí và quyền uy của người đứng đầu công ty.
                         Do đó, ngoài yếu tố thẩm mỹ, khách hàng cũng cần quan tâm đến yếu tố phong thuỷ để công ty vượng khí và thu hút nhiều tài lộc.</p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp6.jpg"></img>
                    <p className="text-center">Phòng lãnh đạo cũng là nơi tiếp đón đối tác, khách hàng nên phải đảm bảo tính thẩm mỹ</p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp7.jpeg"></img>
                    <p className="text-center">Thiết kế thi công nội thất phòng lãnh đạo phải đảm bảo tiện nghi và vị thế của người lãnh đạo</p>

                    <h5>Thiết kế thi công nội thất phòng nhân viên</h5>
                    <ul>
                        <p>Đối với phòng làm việc của nhân viên, khi thi công thiết kế nội thất văn phòng cần lưu ý những yếu tố sau: </p>
                        <li><p>Ưu tiên thiết kế không gian mở để tạo môi trường làm việc thoải mái và giúp nhân viên trao đổi, tương tác dễ dàng.</p></li>
                        <li><p>Không gian làm việc cần đảm bảo thông thoáng, đầy đủ ánh sáng và tính riêng tư.</p></li>
                        <li><p>Nên thiết kế không gian xanh để tạo không khí thư giãn và hỗ trợ nhân viên làm việc tốt hơn.</p></li>
                        <li><p>Ưu tiên sử dụng các gam màu trung tính trong văn phòng để tăng khả năng tập trung.</p></li>
                    </ul>
                    <img className="img-wrapper" src="./assets/img-thicong/vp8.webp"></img>
                    <p className="text-center">Phong cách thiết kế nội thất nhân viên</p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp9.jpg"></img>
                    <p className="text-center">Văn phòng làm việc của nhân viên phải đảm bảo thoáng đãng và đầy đủ ánh sáng</p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp10.jfif"></img>
                    <p className="text-center">Văn phòng thiết kế xanh</p>

                    <h5>Thiết kế thi công nội thất phòng lễ tân </h5>
                    <p>Quầy lễ tân được ví như bộ mặt của doanh nghiệp, là nơi đầu tiên mà khách hàng, đối tác, ứng viên tiếp xúc với công ty.
                         Do đó, cần chú trọng thiết kế và sử dụng các trang thiết bị chất lượng, thẩm mỹ để tạo sự uy tín đối với khách hàng. </p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp11.avif"></img>
                    <p className="text-center">Quầy lễ tân phải đảm bảo tính thẩm mỹ để tạo sự uy tín cho khách hàng</p>
                    <img className="img-wrapper" src="./assets/img-thicong/vp14.webp"></img>
                    <p className="text-center">Nên lồng ghép các yếu tố thương hiệu vào thiết kế quầy lễ tân để tạo dấu ấn riêng</p>

                    <h4><strong>Báo giá dịch vụ thi công nội thất văn phòng trọn gói</strong></h4>
                    <p>Tùy thuộc vào phong cách thiết kế nội thất mà bảng giá thiết kế thi công văn phòng sẽ thay đổi. Sau đây là bảng giá theo phong cách thiết kế bạn có thể tham khảo:</p>
                    <div>
                        <table className="table table-hover" >
                            <tbody>
                                <tr class="table-dark rounded">
                                    <th style={{ width: '30%' }}>Gói</th>
                                    <th>Giá phần nội thất</th>
                                    <th>Giá phần thô</th>
                                </tr>

                                <tr >
                                    <td style={{ textAlign: 'center' }} colSpan={3}><strong>Phong cách thiết kế Xanh</strong></td>
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
                                    <td style={{ textAlign: 'center' }} colSpan={3}><strong> Phong cách Scandinavian</strong></td>

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
                    <img className="img-wrapper" src="./assets/img-thicong/vp9.jpg"></img>
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
                    <img className="img-wrapper" src="./assets/img-thicong/vp15.jpg"></img>
                </div>

                <aside className="side-bar sticky-top contain-items tc-sidebar"> {/*đây là sideball*/}
                    <div className="br-blog-sidebar__list">
                        <h2><span>Các Bản Mẫu</span></h2>
                        <div className="br-blog-sidebar items">
                            <div className="br-blog-sidebar items-1">
                                <Link to={'/Blog_Văn_Phòng'}><div><img src="./assets/img-thicong/vp3.jpg"></img></div></Link>
                                <h5>Các thiết kế Văn Phòng</h5>
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
