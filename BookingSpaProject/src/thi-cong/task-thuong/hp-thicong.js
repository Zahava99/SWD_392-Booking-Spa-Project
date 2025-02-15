import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./thicong.css";
import HomePageBody from "../../component/khang-components/HomePageBody";

export default function Hpthicong() {
  return (
    <div>
      <p className="border p-3">
        <Link to="/" className="text-decoration-none">
          Trang chủ{" "}
        </Link>
        /
        Thi Công
      </p>
      <div class="container text-center">
        <h1 class="mt-3 display-7">
          Báo Giá Thiết Kế Thi Công Nội Thất Trọn Gói 2024
        </h1>
      </div>
      <div className="banner-time">
        <span>
          <time dateTime="25-1-2024">25/01/2024</time>
          <div>
            <img className="banner-img" src="./assets/images/logo.jpg"></img>
          </div>
        </span>
      </div>
      <div className="main-container">
        <div className="contain-items tc-main">
          <img className="img-wrapper" src="./assets/images/MK2.jpg" alt="Thi công nội thất" />
          <div className="tc-main-header"><h1>Tổng Quan</h1></div>
          <p><strong>Thi công nội thất trọn gói</strong> là một dịch vụ đem lại nhiều tiện ích. Thay vì phải tự tay lên kế hoạch, thiết kế ý tưởng, dự tính chi phí,… tốn nhiều thời gian và công sức thì việc lựa chọn đơn vị thiết kế là phương án không nên bỏ qua.
            Nội thất Là Nhà là đơn vị uy tín sẽ thay bạn thực hiện thiết kế không gian sống theo phong cách thiết kế ntối ưu cho khách hàng nội thất phù hợp nhất, mang tính thẩm mỹ cao cùng với mức chi phí vô cùng hợp lý.</p>
          <h4>Bảng giá thi công nội thất theo phong cách thiết kế:</h4>
          <div>
            <table className="table table-hover" >
              <tbody>
                <tr class="table-dark rounded">
                  <th>Phong cách thiết kế</th>
                  <th>Mức độ đầu tư</th>
                  <th>Giá phần nội thất</th>
                  <th>Giá phần thô</th>
                </tr>

                <tr >
                  <td className="table_header"  rowSpan={3}>Phong cách Địa Trung Hải</td>
                  <td >cơ bản</td>
                  <td >30.000.000-50.000.000</td>
                  <td >Không thực hiện</td>
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
                  <td className="table_header" rowSpan={3}>Phong cách Tân Cổ Điển</td>
                  <td >cơ bản</td>
                  <td >50.000.000 – 70.000.000</td>
                  <td >Không thực hiện</td>
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
                  <td className="table_header" rowSpan={3}>Phong cách hiện đại</td>
                  <td >cơ bản</td>
                  <td >30.000.000-50.000.000</td>
                  <td >Không thực hiện</td>
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
                  <td className="table_header" rowSpan={3}>Phong cách Luxury</td>
                  <td >cơ bản</td>
                  <td >30.000.000-50.000.000</td>
                  <td >Không thực hiện</td>
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
          <h4>Các gói dịch vụ thi công nội thất nổi bật tại G7:</h4>
          <h5>Thi công nội thất bao Combo</h5>
          <p>
          Thay vì dành thời gian cho việc lên ý tưởng, <Link style={{ textDecoration: 'none' }} to='/Thiết kế nội thất chung cư'>thiết kế nội thất</Link>,… 
          thì việc lựa chọn đơn vị thi công trọn gói sẽ tiết kiệm thời gian. G7 là đơn vị thi công nội thất trọn gói sẽ thay bạn hoàn thành tất cả các quy trình, hoàn thiện không gian sống. Dịch vụ thi công nội thất giá rẻ trọn gói bao gồm thiết kế nội thất phòng khách, phòng bếp, phòng ngủ, phòng vệ sinh, hệ thống điện, nước… nhưng vẫn đảm bảo dựa trên ý tưởng của chủ nhà.
          </p>
          <img className="img-wrapper" src="./assets/img-thicong/m1.jpeg"></img>
          <p style={{textAlign:'center'}}>Dịch vụ thi công nội thất bao Combo tại G7</p>
          <h5>Thi công nội thất phần thô:</h5>
          <ul><p>Trước khi tiến hành thi công nội thất thì thi công phần thô bước đầu tiên, 
            các hạng mục phần thô cần cải tạo lại như phân lại không gian, 
            hệ thống điện nước,… G7 sẽ tiến hành các bước sau:</p>
            <li><p>Kiểm tra tổng thể mặt bằng, hiện trạng các hạng mục, thống kê các hạng mục cần chỉnh sửa</p></li>
            <li><p>Trao đổi, thống nhất với khách hàng những hạng mục cần cải tạo lại</p></li>
            <li><p>Tiến hành tháo dỡ các phần hạng mục cần thiết kế lại</p></li>
            <li><p>Thi công, thiết kế lại các hạng mục đã tháo dỡ</p></li>
          </ul>
          <img className="img-wrapper" src="./assets/img-thicong/m3.jpg"></img>
          <ul><h5><strong>Một số</strong> bản tham khảo nội thất:</h5>
            <Link style={{textDecoration: 'none'}} to={'/Thi_Công_nội_thất_chung_cư'}><li className="hyperlink-footer">Chung Cư</li></Link>
            <Link style={{textDecoration: 'none'}} to={'/Thi_Công_nội_thất_nhà_phố'}><li className="hyperlink-footer">Nhà Phố</li></Link>
            <Link style={{textDecoration: 'none'}} to={'/Thi_Công_nội_thất_văn_phòng'}><li className="hyperlink-footer">Văn Phòng</li></Link>
            <Link style={{textDecoration: 'none'}} to={'/Thi_Công_nội_thất_biệt_thự'}><li className="hyperlink-footer">Biệt Thự</li></Link>
          </ul>
        </div>
        <aside className="contain-items tc-sidebar"> {/*đây là sideball*/}
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
