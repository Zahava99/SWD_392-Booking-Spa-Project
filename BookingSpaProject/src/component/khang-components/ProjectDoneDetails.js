import React, { useState, useEffect } from 'react'
import { Products } from '../../shared/ListOfProduct'
import { InteriorDesignApartmentAS } from '../../shared/ListOfProduct'
import { Link,useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
export default function InteriorDesignApartment () {
  const [isExpanded, setIsExpanded] = useState(false)
  const { postId } = useParams()
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
        `https://65fbbed914650eb2100a827b.mockapi.io/postDetails/PostDetails/${postId}`
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
        {article.postDetails &&
          article.postDetails.map((articleItem, index) => (
            <div className='col site-content'>
              <div className='article-header'>
                <h1 className='articleTitle'>{articleItem.title}</h1>
              </div>
              <article className='row articleContent d-flex flex-row'>
                <div className=' article-main-content'>
                  <div className='article-main-left-content'>
                    <div className='articleContent-header-img'>
                      <img
                        src={articleItem.topImg}
                        className='card-img img-fluid'
                      />
                    </div>
                    <div className='articleContent-body'>
                      <div className='articleContent-body-top'>
                        <p className='articleText'>{articleItem.details}</p>
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
                          to="/Bao_Gia_Request_CustomerP"
                          className='btn btn-scheme-dark btn-scheme-hover-light mt-0 sidebar-button mx-2 mb-5'
                        >Đến Báo Giá</Link>
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
