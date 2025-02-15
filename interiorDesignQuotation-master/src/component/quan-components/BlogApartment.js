import React from "react";
import "./Blog.css";

const BlogApartment = ({ post }) => {
  return (
    <div className="col mt-3 blog-post">
      <div className="homePageBody-hover">
        <div className="HPB">
          <img
            src="../assets/IMG-Blog/apartment.jpg"
            alt="Apartment"
            className="card-img homePageBody-hover card-img-bg homePageBody-link"
          />
          <div className="HPB-layer">
            <h3 className="HPB-text">BlogApartment</h3>
          </div>
        </div>
      </div>
      <h4>
        Báo giá thiết kế nội thất Chung Cư trọn gói, chủ nhà cần phải biết
      </h4>
      <img
        src="../assets/IMG-Blog/AP6.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h5>Mẫu phòng ngủ chính với bàn trang điểm đặt cạnh giường ngủ</h5>
      <img
        src="../assets/IMG-Blog/AP1.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Thiết kế nội thất căn hộ chung cư 35m2 1 ngủ cộng 1</h6>
      <img
        src="../assets/IMG-Blog/AP2.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Thiết kế nội thất căn hộ chung cư 35m2 1 ngủ cộng 1</h6>
      <img
        src="../assets/IMG-Blog/AP2.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>
        Thiết kế nội thất phòng khách với bộ ghế sofa bằng nỉ cao cấp là điểm
        nhấn cho toàn bộ không gian
      </h6>
      <img
        src="../assets/IMG-Blog/AP3.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Trang trí nội thất và tiện nghi khu vực bếp ăn</h6>
      <img
        src="../assets/IMG-Blog/AP4.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Mẫu phòng ngủ chính với bàn trang điểm đặt cạnh giường ngủ</h6>
      <img
        src="../assets/IMG-Blog/AP5.jpg"
        alt="Apartment"
        className="blog-image"
      />
    </div>
  );
};

export default BlogApartment;
