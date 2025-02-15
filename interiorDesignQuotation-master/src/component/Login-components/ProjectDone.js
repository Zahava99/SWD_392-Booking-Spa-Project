import React, { useState, useEffect } from 'react'
import sloganBackgeound from '../../assets/images/CropSlogan BackgroundWithSlogan.jpg'
import { Products } from '../../shared/ListOfProduct'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function HomePageBody () {
  const [products, setProducts] = useState([]);

  //https://65fbbed914650eb2100a827b.mockapi.io/postDetails/PostDetails
  //'https://65b46f4341db5efd28668857.mockapi.io/api/InteriorDesignArticle/IDAPost'
  useEffect(() => {
    axios.get('https://65fbbed914650eb2100a827b.mockapi.io/postDetails/PostDetails')
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
        console.log("products", response.data[2].postId);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // const listOfProductFirst = products.filter(
  //   productItem => productItem.postId >= 1 && productItem.postId <= 4
  // )
  // const listOfProductSecond = products.filter(
  //   productItem => productItem.postId >= 5 && productItem.postId <= 8
  // )
  
  const renderProductsFirst = () => {
    return products.map(productItem => (
      console.log("TEST",productItem.postId),
      <div className='col mt-4' key={productItem.postId}>
        {/* <a href='#' title='buzz hover text' className='homePageBody-link'> */}
        <Link to={`/ProjectDoneDetails/${productItem.postId}`} title='buzz hover text' className='homePageBody-link'>
          <div className='homePageBody-hover '>
            <div className='HPB'>
              <img
                src={productItem.img}
                className='card-img homePageBody-hover card-img-bg homePageBody-link'
                alt={productItem.title}
              />
              <div className='HPB-layer'>
                <h3 className='HPB-text'>{productItem.title}</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));
  };
  // const renderProductsSecond = () => {
  //   return products.map(productItem => (
  //     <div className='col mt-0' key={productItem.id}>
  //       <a href='#' title='buzz hover text' className='homePageBody-link'>
  //         <div className='homePageBody-hover '>
  //           <div className='HPB'>
  //             <img
  //               src={productItem.img}
  //               className='card-img homePageBody-hover card-img-bg homePageBody-link'
  //               alt={productItem.title}
  //             />
  //             <div className='HPB-layer'>
  //               <h3 className='HPB-text'>{productItem.title}</h3>
  //             </div>
  //           </div>
  //         </div>
  //       </a>
  //     </div>
  //   ));
  // };

  return (
    <div className='container-fluid homePagesLogan' id='homePagesLogan'>
      <div></div>
      <div className='HomepageBody-container'>
        <div className='HomepageBody-title'>Dự án đã thực hiện</div>
        <div className='container-fluid'>
          <div className='row row-cols-4 row-cols-md-4 g-4 my-2'>
          {renderProductsFirst()}
          </div>
          {/* <div className='row row-cols-4 row-cols-md-4 g-4 my-2 mt-3'>
          {renderProductsSecond()}
          </div> */}

          {/* {isPopupOpen && (
            <div id='popup1' className='overlay w-100 mt-0'>
              <div className='popup'>
                <img src={project.img} alt={project.title} />


                <div>
                <h2>{project.title}</h2>
                <div className='content'>{project.description}</div>
                </div>


                <a className='close' href='#' onClick={handleClosePopup}>
                  &times;
                </a>


              </div>
              
            </div>
          )} */}

          {/* <div className='HomepageBody-btn'>
            <a href='#' className='btn btn-scheme-dark btn-scheme-hover-light'>
              Xem Thêm
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
