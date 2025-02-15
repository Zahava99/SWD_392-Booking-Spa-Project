import React, { useState, useEffect } from "react";
import sloganBackgeound from "../../assets/images/CropSlogan BackgroundWithSlogan.jpg";
import CarouselComponent from "./CarouselComponent";
import HomePageBodySecondHalf from "./HomePageBodySecondHalf";
import { Products } from "../../shared/ListOfProduct";
import TEST2 from "./TEST 2";
import TEST from "./TEST";
import axios from "axios";
import { Link } from "react-router-dom";
export default function HomePageBody({ isLoggedIn }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://65fbbed914650eb2100a827b.mockapi.io/postDetails/PostDetails"
      )
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        console.log("products", response.data[2].postId);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const listOfProductFirst = products.filter(
    (productItem) => productItem.postId >= 1 && productItem.postId <= 4
  );
  const listOfProductSecond = products.filter(
    (productItem) => productItem.postId >= 5 && productItem.postId <= 8
  );
  const renderProductsFirst = () => {
    return listOfProductFirst.map((productItem) => (
      <div className="col mt-0" key={productItem.postId}>
        <Link
          to={`ProjectDoneDetails/${productItem.postId}`}
          title="buzz hover text"
          className="homePageBody-link"
        >
          <div className="homePageBody-hover ">
            <div className="HPB">
              <img
                src={productItem.img}
                className="card-img homePageBody-hover card-img-bg homePageBody-link"
                alt={productItem.title}
              />
              <div className="HPB-layer">
                <h3 className="HPB-text">{productItem.title}</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));
  };
  const renderProductsSecond = () => {
    return listOfProductSecond.map((productItem) => (
      <div className="col mt-0" key={productItem.id}>
        <Link
          to={`ProjectDoneDetails/${productItem.postId}`}
          title="buzz hover text"
          className="homePageBody-link"
        >
          <div className="homePageBody-hover ">
            <div className="HPB">
              <img
                src={productItem.img}
                className="card-img homePageBody-hover card-img-bg homePageBody-link"
                alt={productItem.title}
              />
              <div className="HPB-layer">
                <h3 className="HPB-text">{productItem.title}</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));
  };
  return (
    <div className="container-fluid homePagesLogan" id="homePagesLogan">
      <div>
        <div class="card">
          <img src={sloganBackgeound} alt="..." class="card-img img-fluid" />
          <div class="card-img-overlay"></div>
        </div>
      </div>
      <div className="HomepageBody-container">
        <div className="HomepageBody-title"> Dịch vụ Spa </div>
        <div className="container-fluid">
          <div className="row row-cols-4 row-cols-md-4 g-4 my-2">
            {renderProductsFirst()}
          </div>
          <div className="row row-cols-4 row-cols-md-4 g-4 my-2 mt-3">
            {renderProductsSecond()}
          </div>
          {/* <div className="HomepageBody-btn">
            <Link
              to="/Dự án đã thi công"
              className="btn btn-scheme-dark btn-scheme-hover-light"
            >
              Xem Thêm
            </Link>
          </div> */}
        </div>
        <div className="HomepageBody-title HomepageBody-title-background">
          Blog
        </div>
      </div>
      <CarouselComponent />
      <HomePageBodySecondHalf />
    </div>
  );
}
