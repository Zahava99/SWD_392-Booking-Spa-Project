import React from "react";
import "./Blog.css";

const BlogOffice = ({ post }) => {
  return (
    <div className="col mt-3">
      {/* <a href={post.link} title='buzz hover text' className='homePageBody-link' onClick={() => handleBlogClick(post.link)}> */}
      <a href="#" title="buzz hover text" className="homePageBody-link">
        <div className="homePageBody-hover ">
          <div className="HPB">
            <img
              src="../assets/IMG-Blog/office.jpg"
              alt="Office"
              className="card-img homePageBody-hover card-img-bg homePageBody-link"
            />
            <div className="HPB-layer">
              <h3 className="HPB-text">BlogOffice</h3>
            </div>
          </div>
        </div>
      </a>
      <h4>
        Báo giá thiết kế nội thất văn phòng trọn gói, chủ nhà cần phải biết
      </h4>
      <img
        src="../assets/IMG-Blog/vp1.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h5>
        Khu vực đón tiếp khách hàng, đối tác được bố trí nội thất cách tân,
        thiết kế thanh thoát nhưng vẫn giữ được nét cổ điển kết hợp hài hòa với
        các họa tiết trang trí mềm mại.
      </h5>
      <img
        src="../assets/IMG-Blog/vp2.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>
        Văn phòng sử dụng bàn ghế gỗ mộc mạc, kiểu dáng thiết kế đơn giản làm
        điểm nhấn cùng với những bức tranh trang trí độc đáo để gia tăng vẻ đẹp
        sinh động, bắt mắt
      </h6>
      <img
        src="../assets/IMG-Blog/vp3.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>
        Lối đi lại thông thoáng, nội thất văn phòng bố trí hợp lý sẽ mang lại sự
        tiện nghi cho đội ngũ cán bộ nhân viên làm việc.
      </h6>
      <img
        src="../assets/IMG-Blog/vp4.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Phòng làm việc hiện đại</h6>
      <img
        src="../assets/IMG-Blog/vp5.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Không gian làm việc chuyên nghiệp</h6>
      <img
        src="../assets/IMG-Blog/vp6.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Góc làm việc được thiết kế thêm không gian lưu trữ</h6>
      <img
        src="../assets/IMG-Blog/vp7.jpg"
        alt="Apartment"
        className="blog-image"
      />{" "}
      */
    </div>
  );
};

export default BlogOffice;
