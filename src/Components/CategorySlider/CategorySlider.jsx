import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  const settings = {
    // dots: true,
    autoplay: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function GetAllCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data } = useQuery("CategoryRequest", GetAllCategory);
  // console.log(data);
  return (
    <div className="mb-5 py-3">
      <p className="h5 fw-normal">Shop Popular Categories</p>
      <Slider {...settings}>
        {data?.data.data.map((Catregory) => ( <div key={Catregory._id}>
          <img
            src={Catregory.image}
            alt={Catregory.name}
            height={200}
            width='100%'
          />
          <p className="text-center pt-1">{Catregory.name}</p>
        </div>
          
        ))}
      </Slider>
      
    </div>
  );
}
