import React, { useState, useEffect } from 'react'
import { Products } from '../../shared/ListOfProduct'
import { InteriorDesignApartmentAS } from '../../shared/ListOfProduct'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
export default function InteriorDesignApartment () {

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }
  const scrollToId = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  //https://65dd7671e7edadead7edfc52.mockapi.io/api/InteriorDesignArticle/IDAArticle
  const [article, setArticle] = useState([])

  useEffect(() => {
    axios
      .get(
        'https://65dd7671e7edadead7edfc52.mockapi.io/api/InteriorDesignArticle/IDAArticle'
      )
      .then(response => {
        setArticle(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])
  const renderArticle = () => {
    return article.map(articlePost => (
      <div className='articleContent-body-item'>
        <p className='articleText' id={articlePost.id}>
          <strong>
            Mẫu {articlePost.id}: {articlePost.Style}
          </strong>
        </p>
        <img src={articlePost.img} className='img-fluid object-fit-fill' />
        <div className='articleText'>
          <p>Chung cư: {articlePost.Apartment}</p>
          <p>Chủ đầu tư: {articlePost.Investor}</p>
          <p>Phong cách: {articlePost.Style} </p>
          <p>Giá:{articlePost.Price}</p>
        </div>
      </div>
    ))
  }
  function renderArticleNav ()  {
    return (
      <div
        className={`articleContent-nav card ${
          isExpanded ? 'card-width-expanded' : 'card-width'
        }`}
      >
        <div className='card-body'>
          <div className='d-flex justify-content-between'>
            <p className='card-text mb-0'>Xem nhanh</p>
            <button
              className='btn btn-primary'
              type='button'
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faList} />
            </button>
          </div>
          <div className={`collapse ${isExpanded ? 'show' : ''}`}>
            <div className='card card-body border-0'>
              {article.map(articlePost => (
                <p key={articlePost.id}>
                  <button
                    className='renderArticleNavButton'
                    onClick={() => scrollToId(articlePost.id)}
                  >
                    Mẫu {articlePost.id}: {articlePost.Style}
                  </button>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
)
  }
  return (
    <div className='container' id='homePagesLogan'>
      <div className='dropdown-divider border-black mb-5'></div>
      <div className='row'>
        <div className='article-header'>
          10 mẫu thiết kế nội thất chung cư đẹp, hiện đại nhất 2023
        </div>
        <div className='col site-content'>
          <article className='row row-cols-2 articleContent d-flex flex-row'>
            <div className='col-sm-8 article-main-content'>
              <div className='article-main-left-content'>
                <div className='articleContent-header-img'>
                  <img
                    src='assets\images\Slogan Background Medium.jpg'
                    class='card-img img-fluid'
                  />
                </div>
                <div className='articleContent-body'>
                  <p className='articleText'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Nisi vitae suscipit tellus mauris a. Lectus urna
                    duis convallis convallis tellus id. Interdum velit laoreet
                    id donec
                  </p>
                  {renderArticleNav()}
                  {renderArticle()}
                  <div className='d-flex justify-content-center'>
                  <div className='HomepageBody-btn'>
                    <Link
                      to='/'
                      className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button'
                    >
                      Trang chủ
                    </Link>
                  </div>
                  <div className='HomepageBody-btn'>
                    <a
                      href='#'
                      className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button mx-2'
                    >
                     <FontAwesomeIcon icon={faArrowUp} />
                    </a>
                  </div>  
                  </div>          
                </div>
              </div>
            </div>
            <div className='col-sm-4 article-main-right-content'>
              <div className='side-bar sticky-top'>
                <div className='side-bar-list'>
                  <h2 className='articleSideBarText'> Dự án hoàn thiện</h2>
                  <div className='side-bar-list-item'>
                    <div className='side-bar-list-item-post'>
                      <a href='#' className='side-bar-list-item-post-link'>
                        <div className='side-bar-list-item-post-img'>
                          <img
                            src='assets\images\MK1.jpg'
                            className='img-fluid rounded-3'
                          />
                        </div>
                        <div className='side-bar-list-item-post-title'>
                          <h3 className='side-bar-list-item-post-title'>
                            VINHOMES Q9 – SANTORINI – 213TR
                          </h3>
                        </div>
                      </a>
                      <a href='#' className='side-bar-list-item-post-link'>
                        <div className='side-bar-list-item-post-img'>
                          <img
                            src='assets\images\MK1.jpg'
                            className='img-fluid rounded-3'
                          />
                        </div>
                        <div className='side-bar-list-item-post-title'>
                          <h3 className='side-bar-list-item-post-title'>
                            VINHOMES Q9 – SANTORINI – 213TR
                          </h3>
                        </div>
                      </a>
                    </div>
                    <div className='side-bar-list-item-post'></div>
                  </div>
                  <div className='HomepageBody-btn'>
                    <a
                      href='#'
                      className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button'
                    >
                      Xem Thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

