import React from "react";
import "./Blog.css";

const BlogHotel = ({ post }) => {
  return (
    <div className="col mt-3 blog-post">
      {/* <a href={post.link} title='buzz hover text' className='homePageBody-link' onClick={() => handleBlogClick(post.link)}> */}
      <a href="#" title="buzz hover text" className="homePageBody-link">
        <div className="homePageBody-hover ">
          <div className="HPB">
            <img
              src="../assets/IMG-Blog/hotel.jpg"
              alt="Hotel"
              className="card-img homePageBody-hover card-img-bg homePageBody-link"
            />
            <div className="HPB-layer">
              <h3 className="HPB-text">BlogHotel</h3>
            </div>
          </div>
        </div>
      </a>
      <h4>
        Báo giá thiết kế nội thất Khách Sạn trọn gói, chủ nhà cần phải biết
      </h4>
      <img
        src="../assets/IMG-Blog/ks1.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h5>Khu vực sảnh khách sạn ấn tượng bởi sự sáng tạo trong đường nét</h5>
      <img
        src="../assets/IMG-Blog/ks2.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>
        Phong cách thiết kế nội thất khách sạn hiện đại được ứng dụng rộng rãi
        hiện nay
      </h6>
      <img
        src="../assets/IMG-Blog/ks3.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Nhận báo giá Nội thất phòng ngủ khách sạn phong cách cổ điển</h6>
      <img
        src="../assets/IMG-Blog/ks4.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>
        Không gian phòng khách sạn mang vẻ đẹp cổ điển - vương giả và quý tộc
      </h6>
      <img
        src="../assets/IMG-Blog/ks5.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>
        Thiết kế nội thất khách sạn tân cổ điển thanh lịch cùng tone màu trung
        tính
      </h6>
      <img
        src="../assets/IMG-Blog/ks6.jpg"
        alt="Apartment"
        className="blog-image"
      />
      <h6>Không gian phòng ngủ tinh tế nhưng không quá cầu kỳ, rườm rà</h6>
      <img
        src="../assets/IMG-Blog/ks7.jpg"
        alt="Apartment"
        className="blog-image"
      />{" "}
      */
    </div>
  );
};

export default BlogHotel;
