import React from 'react'
// import sloganBackgeound from '../../assets/images/CropSlogan BackgroundWithSlogan.jpg'
// import imgCardBackground1 from '../../assets/images/DDT1.jpg'
// import imgCardBackground2 from '../../assets/images/DDT2.jpg'
// import imgCardBackground3 from '../../assets/images/DDT3.jpg'
// import imgCardBackground4 from '../../assets/images/DDT4.jpg'
// import imgCardBackground5 from '../../assets/images/DDT5.jpg'
// import imgCardBackground6 from '../../assets/images/DDT6.jpg'
import imgHPBSHF from '../../assets/images/MK4.jpg'
import imgHPBSHSe from '../../assets/images/HPBSESE.jpeg'
export default function HomePageBodySecondHalf () {
  
  return (
    <div className='container-fluid homePagesLogan' id='homePagesLogan'>
      <div className='HomePageBodySecondHalfFirstEL'>
        {/* <div class='card text'>
          <h1>Your Space, Your Signature Style!</h1>
          <img src={sloganBackgeound} className='img-fluid card-img' />
        </div> */}
        <div class='card'>
          <img src={imgHPBSHF} alt='...' class='card-img img-fluid h-50' />
          <div class='card-img-overlay'>
            {/* <h4 class='card-title'>Your Space, Your<br/> Signature Style!</h4> */}
          </div>
        </div>
      </div>
      <div className='HomePageBodySecondHalfSecondEL'>
        {/* <div class='card text'>
          <h1>Your Space, Your Signature Style!</h1>
          <img src={sloganBackgeound} className='img-fluid card-img' />
        </div> */}
        <div class='card px-5 pb-4 border-0'>
          <img src={imgHPBSHSe} alt='...' class='card-img img-fluid HPBSHSe' />
          <div class='card-img-overlay'>
            {/* <h4 class='card-title'>Your Space, Your<br/> Signature Style!</h4> */}
          </div>
        </div>
      </div>
    </div>
  )
}