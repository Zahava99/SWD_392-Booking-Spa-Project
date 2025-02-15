import React, { useState, useEffect } from 'react'
import { Products } from '../../shared/ListOfProduct'
import { InteriorDesignApartmentAS } from '../../shared/ListOfProduct'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay,Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
export default function ProductDesignDetails () {
  const [isExpanded, setIsExpanded] = useState(false)
  const { ProuctDetailsID } = useParams()
  // const handleClick = () => {
  //   setIsExpanded(!isExpanded)
  // }
  // const scrollToId = id => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
  //https://65dd7671e7edadead7edfc52.mockapi.io/api/InteriorDesignArticle/IDAArticle
  const [article, setArticle] = useState([])

  useEffect(() => {
    axios
      .get(
        // `https://65fbbed914650eb2100a827b.mockapi.io/postDetails/PostDetails/${ProuctDetailsID}`
        `https://660e28d56ddfa2943b35f322.mockapi.io/api/IDACarowsel/IDACarousel/${ProuctDetailsID}`
      )
      .then(response => {
        setArticle(response.data)
        console.log('RESPONSE', response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])
  return (
    <div className='container' id='homePagesLogan'>
      {/* <div className='dropdown-divider border-black mb-5'></div> */}
      <div className='row'>
        {/* <div className='article-header'>
          <h1 className='articleTitle'>{article.title}</h1>
        </div> */}
        {article.ProductDetails &&
          article.ProductDetails.map((articleItem, index) => (
            <div className='col site-content'>
              <div className='article-header'>
                <h1 className='articleTitle'>{articleItem.title}</h1>
              </div>
              <article className='row articleContent d-flex flex-row'>
                <div className=' article-main-content'>
                  <div className='article-main-left-content'>
                    <div className='articleContent-header-imgDetails justify-content-center'>
                      {articleItem.ProductDetailsImage && (
                        <Swiper 
                          modules={[Autoplay,Navigation, Pagination]}
                          spaceBetween={5}
                          slidesPerView={2}
                          // navigation
                          pagination={{ clickable: true }}
                          loop={true}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          // centeredSlides={true}
                          className='img-margin'
                        >
                          {Object.values(articleItem.ProductDetailsImage).map(
                            (ProductDetailsImage, index) => (
                              <SwiperSlide key={index}>
                                <img src={ProductDetailsImage}/>
                              </SwiperSlide>
                            )
                          )}
                        </Swiper>
                      )}
                    </div>

                    <div className='articleContent-body'>
                      <div className='articleContent-body-top'>
                      <p>
                          <strong>Giới thiệu:</strong>
                        </p>
                        <h2 className="Text-Description">{articleItem.description}</h2>
                        <h2 className="Text-Description my-3">
                          <strong>Giá khởi điểm: </strong>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(articleItem.StartingPrice)}
                        </h2>
                        <h2 className="Text-Description my-3"><strong>Loại công trình:</strong> {articleItem.BuildingType}</h2>
                        <p className=" my-0">
                          <strong>Chi tiết:</strong>
                        </p>
                        <ul className='articleDetailsList'>
                          {articleItem.details &&
                            Object.values(articleItem.details).map(
                              (detail, index) => (
                                <li key={index}>
                                  <strong>{detail.SupaDetailsText}</strong>:{' '}
                                  <h2 className="Text-Description">{detail.SupaDetailsData}</h2>
                                </li>
                              )
                            )}
                        </ul>
                      </div>
                      {/* <div className='articleContent-middle-img text-center'>
                        <img
                          src={articleItem.middleImg}
                          className='card-img img-fluid'
                        />
                        <p>Hình ảnh 1</p>
                      </div> */}
                      {/* <div className='articleContent-body-middle&bottom'>
                        <p className='articleText'>{articleItem.middleDetails}</p>
                        <img src={articleItem.otherImg} className='card-img img-fluid'/>
                        <p className='articleText'>{articleItem.middle2ndDetails}</p>
                        <p className='articleText'>{articleItem.endDetails}</p>
                      </div> */}
                    </div>
                    <div className='d-flex justify-content-center'>
                      <div className='HomepageBody-btn'>
                        <Link
                          to='/Bao_Gia_Request_CustomerP'
                          className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button mx-2 mb-5'
                        >
                          Đến Báo Giá
                        </Link>
                      </div>
                      <div className='HomepageBody-btn'>
                        <a
                          href='#'
                          className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button mx-2 mb-5'
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
      </div>
    </div>
  )
}
