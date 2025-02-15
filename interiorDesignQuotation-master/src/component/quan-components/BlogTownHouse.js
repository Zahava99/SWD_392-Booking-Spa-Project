import React from "react";
import "./Blog.css";

const BlogTownHouse = ({ post, handleBlogClick }) => {
  return (
    <div className="col mt-3">
      {/* <a href={post.link} title='buzz hover text' className='homePageBody-link' onClick={() => handleBlogClick(post.link)}> */}
      <a href="#" title="buzz hover text" className="homePageBody-link">
        <div className="homePageBody-hover ">
          <div className="HPB">
            <img
              src="../assets/IMG-Blog/townhouse.jpeg"
              alt="Townhouse"
              className="card-img homePageBody-hover card-img-bg homePageBody-link"
            />
            <div className="HPB-layer">
              <h3 className="HPB-text">BlogTownHouse</h3>
            </div>
          </div>
        </div>
      </a>
      <h4>Báo giá thiết kế nội thất nhà phố trọn gói, chủ nhà cần phải biết</h4>
      <img
        src="../assets/IMG-Blog/np1.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h5>Thiết kế nội thất nhà phố phong cách hiện đại</h5>
      <img
        src="../assets/IMG-Blog/np2.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>
        phòng khách kết hợp càu thang kính tạo cảm giác không gian lớn hơn
      </h6>
      <img
        src="../assets/IMG-Blog/np3.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>phòng ngủ 1 phong cách Luxury</h6>
      <img
        src="../assets/IMG-Blog/np4.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>phòng ngủ 2 đầy đủ tiện nghi</h6>
      <img
        src="../assets/IMG-Blog/np5.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>phòng ngủ có tủ âm tường </h6>
      <img
        src="../assets/IMG-Blog/np6.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>phòng ngủ diện tích nhỏ,tối ưu diện tích</h6>
      <img
        src="../assets/IMG-Blog/np7.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>phòng nghỉ cho khách</h6>
    </div>
  );
};

export default BlogTownHouse;
