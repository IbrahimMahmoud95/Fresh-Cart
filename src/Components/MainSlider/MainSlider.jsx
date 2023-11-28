import React from 'react';
import Slider from 'react-slick';
import Slide1 from '../../assets/finalProject assets/images/slider-image-3.jpeg';
import Slide2 from '../../assets/finalProject assets/images/slider-image-2.jpeg';
import Slide3 from '../../assets/finalProject assets/images/slider-image-1.jpeg';
import StaticImg1 from '../../assets/finalProject assets/images/staticslider1.jpg';
import StaticImg2 from '../../assets/finalProject assets/images/staticslider2.jpg';

export default function MainSlider() {
  const settings = {
    dots: true,
    autoplay: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return <>
  <div className='py-3'>
    <div className='row gx-0 pt-1'>
      <div className='col-md-9 '>
        <Slider {...settings}>
          <img src={Slide1} alt="slide-1" height={300} />
          <img src={Slide2} alt="slide-1" height={300}/>
          <img src={Slide3} alt="slide-1" height={300}/>
        </Slider>
      </div>
      <div className='col-md-3'>
        <img src={StaticImg1} alt="" height={150}  width='100%'/>
        <img src={StaticImg2} alt="" height={150}  width='100%'/>
      </div>
    </div>
  </div>
  </>
}
