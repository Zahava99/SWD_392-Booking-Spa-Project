import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Blog() {
  const [ProductsBlog, setProductsBlog] = useState([]);
  useEffect(() => {
    axios
      .get("https://65d69792f6967ba8e3be425b.mockapi.io/api/confusion/blog")
      .then((response) => {
        setProductsBlog(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const renderSlides = () => {
    return ProductsBlog.map((post, index) => (
      <div className="col mt-3" key={post.id}>
        <Link to={post.link} className="homePageBody-link">
          <div className="homePageBody-hover ">
            <div className="HPB">
              <img
                src={post.image}
                alt={post.title}
                className="card-img homePageBody-hover card-img-bg homePageBody-link"
              />
              <div className="HPB-layer">
                <h3 className="HPB-text">{post.title}</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));
  };
  return (
    <div className="HomepageBody-container mb-5">
      <div className="dropdown-divider border-black mb-5"></div>
      <div className="HomepageBody-title">Blog</div>
      <div className="container-fluid">
        <div className="row row-cols-3 row-cols-md-3 g-4 my-2">
          {renderSlides()}
        </div>
      </div>
    </div>
  );
}

// const Blog = () => {
//   const blogPosts = [
//     {
//       id: 1,
//       title: "Blog Chung Cư",
//       image: `${process.env.PUBLIC_URL}/assets/images/ChungCu.jpg`,
//       link: "/Blog Chung Cư",
//     },
//     {
//       id: 2,
//       title: "Blog Văn Phòng",
//       image: `${process.env.PUBLIC_URL}/assets/images/BietThu.jpg`,
//       link: "/Blog Văn Phòng",
//     },
//     {
//       id: 3,
//       title: "Blog Biệt Thự",
//       image: `${process.env.PUBLIC_URL}/assets/images/Van-Phong.jpg`,
//       link: "/Blog Biệt Thự",
//     },
//     {
//       id: 4,
//       title: "Blog Khách Sạn",
//       image: `${process.env.PUBLIC_URL}/assets/images/Hotel.jpg`,
//       link: "/Blog Khách Sạn",
//     },
//     {
//       id: 5,
//       title: "Blog Nhà Phố",
//       image: `${process.env.PUBLIC_URL}/assets/images/Nha-pho.jpg`,
//       link: "/Blog Nhà Phố",
//     },
//     {
//       id: 6,
//       title: "Staff",
//       image: `${process.env.PUBLIC_URL}/assets/images/Nha-pho.jpg`,
//       link: "/staff",
//     },
//   ];
//   //https://65d69792f6967ba8e3be425b.mockapi.io/api/confusion/blog
//   return (
//     <div className="HomepageBody-container mb-5">
//       <div className="dropdown-divider border-black mb-5"></div>
//       <div className="HomepageBody-title">Blog</div>
//       <div className="container-fluid">
//         <div className="row row-cols-3 row-cols-md-3 g-4 my-2">
//           {blogPosts.map((post) => (
//             <div className="col mt-3" key={post.id}>
//               <Link to={post.link} className="homePageBody-link">
//                 <div className="homePageBody-hover ">
//                   <div className="HPB">
//                     <img
//                       src={post.image}
//                       alt={post.title}
//                       className="card-img homePageBody-hover card-img-bg homePageBody-link"
//                     />
//                     <div className="HPB-layer">
//                       <h3 className="HPB-text">{post.title}</h3>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;
