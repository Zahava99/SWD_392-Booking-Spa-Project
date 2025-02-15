import React, { useState, useEffect } from 'react'
import { Products } from '../../shared/ListOfProduct'
import { InteriorDesignApartmentAS } from '../../shared/ListOfProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
export default function InteriorDesignApartment () {
  // const listOfProductFirst = Products.filter(
  //   productItem => productItem.id >= 1 && productItem.id <= 4
  // )
  // const listOfProductSecond = Products.filter(
  //   productItem => productItem.id >= 5 && productItem.id <= 8
  // )
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }
  //https://65dd7671e7edadead7edfc52.mockapi.io/api/InteriorDesignArticle/IDAArticle
  const [article, setArticle] = useState([]);

  useEffect(() => {
    axios.get('https://65dd7671e7edadead7edfc52.mockapi.io/api/InteriorDesignArticle/IDAArticle')
      .then(response => {
        setArticle(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const renderArticle = () => {
    return article.map(articlePost => (
      <div className='articleContent-body-item'>
      <p
        className='articleText'
        id='Mẫu 1 : Minimalist Elegance'
      >
        <strong>
          Mẫu {articlePost.id}:{' '}
          {articlePost.Style}
        </strong>
      </p>
      <img
        src={articlePost.img}
        className='img-fluid object-fit-fill'
      />
      <div className='articleText'>
        <p>
          Chung cư: {articlePost.Apartment}
        </p>
        <p>
          Chủ đầu tư: {articlePost.Investor}
        </p>
        <p>
          Phong cách: {articlePost.Style}{' '}
        </p>
        <p>Giá:{articlePost.Price}</p>
      </div>
    </div>
    ));
  };
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
                          <p>
                            <a
                              href='#Mẫu 1: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 1: Minimalist Elegance
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 2: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 2: Urban Jungle
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 3: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 3: Boho Chic
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 4: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 4: Industrial Loft
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 5: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 5: Scandinavian Simplicity
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 6: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 6: Mid-Century Modern
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 7: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 7: Luxury Glam
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 8: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 8: Coastal Vibes
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 9: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 9: Rustic Modern
                            </a>
                          </p>
                          <p>
                            <a
                              href='#Mẫu 10: Minimalist Elegance'
                              className='text-decoration-none text-black'
                            >
                              Mẫu 10: Art Deco Revival
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {renderArticle()}
                  {/* {InteriorDesignApartmentAS.map(
                    InteriorDesignApartmentASItem => (
                      <div className='articleContent-body-item'>
                        <p
                          className='articleText'
                          id='Mẫu 1 : Minimalist Elegance'
                        >
                          <strong>
                            Mẫu {InteriorDesignApartmentASItem.id}:{' '}
                            {InteriorDesignApartmentASItem.Style}
                          </strong>
                        </p>
                        <img
                          src={InteriorDesignApartmentASItem.img}
                          className='img-fluid object-fit-fill'
                        />
                        <div className='articleText'>
                          <p>
                            Chung cư: {InteriorDesignApartmentASItem.Apartment}
                          </p>
                          <p>
                            Chủ đầu tư: {InteriorDesignApartmentASItem.Investor}
                          </p>
                          <p>
                            Phong cách: {InteriorDesignApartmentASItem.Style}{' '}
                          </p>
                          <p>Giá:{InteriorDesignApartmentASItem.Price}</p>
                        </div>
                      </div>
                    )
                  )} */}
                  {/* <div className='articleContent-body-item'>
                    <p className='articleText' id='Mẫu 1: Minimalist Elegance'>
                      <strong>Mẫu 1: Minimalist Elegance</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                      <p>Chung cư: Metroview Place</p>
                      <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                      <p>Phong cách: Minimalist Elegance </p>
                      <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText'  id='Mẫu 2: Urban Jungle'>
                      <strong>Mẫu 2: Urban Jungle</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Urban Jungle </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText'  id='Mẫu 3: Boho Chic'>
                      <strong>Mẫu 3: Boho Chic</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Boho Chic </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText'  id='Mẫu 4: Industrial Loft'>
                      <strong>Mẫu 4: Industrial Loft</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Industrial Loft </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText'  id='Mẫu 5: Scandinavian Simplicity'>
                      <strong>Mẫu 5: Scandinavian Simplicity</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Scandinavian Simplicity </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText'  id='Mẫu 6: Mid-Century Modern'>
                      <strong>Mẫu 6: Mid-Century Modern</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Mid-Century Modern </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText'  id='Mẫu 7: Luxury Glam'>
                      <strong>Mẫu 7: Luxury Glam</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Luxury Glam </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText'  id='Mẫu 8:Coastal Vibes'>
                      <strong>Mẫu 8: Coastal Vibes</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Coastal Vibes </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText'  id='Mẫu 9: Rustic Modern'>
                      <strong>Mẫu 9: Rustic Modern</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Rustic Modern </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div>
                  <div className='articleContent-body-item'>
                    <p className='articleText' id='Mẫu 10: Art Deco Revival'>
                      <strong>Mẫu 10: Art Deco Revival</strong>
                    </p>
                    <img
                      src='assets\articleIMG\IDA1.jpeg'
                      className='img-fluid object-fit-fill'
                    ></img>
                    <div className='articleText'>
                    <p>Chung cư: Metroview Place</p>
                    <p>Chủ đầu tư: Gorica Giulia Chevalier</p>
                    <p>Phong cách: Art Deco Revival </p>
                    <p>Giá: 100.000.000VND</p>
                    </div>
                  </div> */}
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
