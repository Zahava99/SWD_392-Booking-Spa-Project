import React, { useState, useEffect } from 'react'
// import Slider from 'react-slick'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import { ProductsCarousel } from '../../shared/ListOfProject'
import axios from 'axios'
import { Link } from "react-router-dom";
export default function CarouselComponent () {
  const [ProductsCarousel, setProductsCarousel] = useState([])
  useEffect(() => {
    axios
      .get(
        'https://65fbbed914650eb2100a827b.mockapi.io/postDetails/PostDetails'
        // 'https://660e28d56ddfa2943b35f322.mockapi.io/api/IDACarowsel/IDACarousel'
        // 'https://65b46f4341db5efd28668857.mockapi.io/api/InteriorDesignArticle/IDACarousel'
      )
      .then(response => {
        setProductsCarousel(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])
  const renderSlides = () => {
    // Duplicate slides if needed to support loop mode
    // const duplicatedSlides = ProductsCarousel.concat(ProductsCarousel)
    return ProductsCarousel.map((productCarouselItem, index) => (
      <SwiperSlide key={index}>
        <div className='card mx-2 CarouselCard'>
          <a href='#' title='buzz hover text' className='homePageBody-link'>
            <Link to={`/ProductDesignDetails/${productCarouselItem.ProuctDetailsID}`}>
            <div className='homePageBody-hover '>
              <div className='HPB object-fit-fill'>
                <img
                  src={productCarouselItem.img}
                  className='card-img homePageBody-hover card-img-slider img-fluid'
                  alt={productCarouselItem.title}
                />
                <div className='HPB-layer'>
                  <h3 className='HPB-text'>{productCarouselItem.title}</h3>
                </div>
              </div>
            </div>
            </Link>
            {/* <div className='homePageBody-hover '>
              <div className='HPB object-fit-fill'>
                <img
                  src={productCarouselItem.img}
                  className='card-img homePageBody-hover card-img-slider img-fluid'
                  alt={productCarouselItem.title}
                />
                <div className='HPB-layer'>
                  <h3 className='HPB-text'>{productCarouselItem.title}</h3>
                </div>
              </div>
            </div> */}
          </a>
        </div>
      </SwiperSlide>
    ))
  }
  return (
    <>
      <Swiper
        className='mySwiper'
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        navigation={true}
        pagination={true}
        // loop={true}
        slidesPerView={3}
      >
       {renderSlides()}
      </Swiper>
    </>
  )
}
// {ProductsCarousel.map(productCarouselItem => (
//   <div className='card mx-2'>
//     <a href='#' title='buzz hover text' className='homePageBody-link'>
//       <div className='homePageBody-hover '>
//         <div className='HPB object-fit-fill'>
//           <img
//             src={productCarouselItem.img}
//             className='card-img homePageBody-hover card-img-slider img-fluid'
//           />
//           <div className='HPB-layer'>
//             <h3 className='HPB-text'>{productCarouselItem.title}</h3>
//           </div>
//         </div>
//       </div>
//     </a>
//   </div>
// ))}
//With SwiperReact
// {
//   ProductsCarousel.map(productCarouselItem => (
//     <SwiperSlide>
//       <div className='card mx-2'>
//         <a href='#' title='buzz hover text' className='homePageBody-link'>
//           <div className='homePageBody-hover '>
//             <div className='HPB object-fit-fill'>
//               <img
//                 src={productCarouselItem.img}
//                 className='card-img homePageBody-hover card-img-slider img-fluid'
//               />
//               <div className='HPB-layer'>
//                 <h3 className='HPB-text'>{productCarouselItem.title}</h3>
//               </div>
//             </div>
//           </div>
//         </a>
//       </div>
//     </SwiperSlide>
//   ))
// }
