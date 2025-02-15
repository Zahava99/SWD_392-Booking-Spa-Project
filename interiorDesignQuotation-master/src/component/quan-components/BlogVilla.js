import React from "react";
import "./Blog.css";

const BlogVilla = ({ post }) => {
  return (
    <div className="col mt-3">
      {/* <a href={post.link} title='buzz hover text' className='homePageBody-link' onClick={() => handleBlogClick(post.link)}> */}
      <a href="#" title="buzz hover text" className="homePageBody-link">
        <div className="homePageBody-hover ">
          <div className="HPB">
            <img
              src="../assets/IMG-Blog/villa.jpg"
              alt="Villa"
              className="card-img homePageBody-hover card-img-bg homePageBody-link"
            />
            <div className="HPB-layer">
              <h3 className="HPB-text">BlogVilla</h3>
            </div>
          </div>
        </div>
      </a>
      <h4>
        Báo giá thiết kế nội thất biệt thự trọn gói, chủ nhà cần phải biết
      </h4>
      <img
        src="../assets/IMG-Blog/vl1.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h5>Thiết kế nội thất biệt thự phong cách đơn giản</h5>
      <img
        src="../assets/IMG-Blog/vl2.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Thiết kế nội thất biệt thự phong cách hiện đại</h6>
      <img
        src="../assets/IMG-Blog/vl3.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Thiết kế nội thất biệt thự phong cách Luxury</h6>
      <img
        src="../assets/IMG-Blog/vl4.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Thiết kế nội thất biệt thự phong cách tân cổ điển</h6>
      <img
        src="../assets/IMG-Blog/vl5.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Thiết kế nội thất biệt thự phong cách cổ điển</h6>
      <img
        src="../assets/IMG-Blog/vl6.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Thiết kế nội thất biệt thự phong cách Đông Dương</h6>
      <img
        src="../assets/IMG-Blog/vl7.jpg"
        alt="Apartment"
        className="blog-image"
      />{" "}
      */
    </div>
  );
};

export default BlogVilla;
