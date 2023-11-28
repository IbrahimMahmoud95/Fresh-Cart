import React, { useContext } from 'react';
import Style from './ProductDetails.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {
  const {AddToCart}=useContext(CartContext)
  const{setCardItems}=useContext(CartContext)
  async function AddProductToCart(id){
    const res = await AddToCart(id)
    if(res.data.status==="success"){
      toast.success('Product Successfully added')
      setCardItems(res.data.numOfCartItems)
    }
    else{
      toast.error('Product couldnt add')
    }
    console.log(res);
  }
  const {id}=useParams();
  // console.log(id);
  function GetProduct(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  const {data}=useQuery(`GetProductDetails`,()=>GetProduct(id));
  // console.log(data?.data.data);
  function SampleNextArrow(props) {
    // console.log(props)
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}`}
        style={{ ...style, display: "block",background:"black" ,right:"10px"}}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",background:"black", left:"10px" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    fade:true,
    autoplay:true,
    pauseOnFocus:true,
    arrows:true,
    centerMode:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  
  
  return <>
  <div className={`container py-5 ${Style.body}`}>
    <div className="row">
      <div className='col-md-4 col-sm-12  p-2 '>
      <Slider {...settings}>
        {data?.data.data.images.map((Img,Index)=><img src={Img} alt={data?.data.data.title} key={Index} className='w-100' height={250} />)}
    </Slider>
      </div>
      <div className='col-md-8 col-sm-12 d-flex flex-column justify-content-center'>
        <h2 className='h5'>{data?.data.data.title}</h2>
        <p className='h6 text-muted py-4'>{data?.data.data.description}</p>
        <p className='fw-bold'>{data?.data.data.category.name}</p>
        <div className='d-flex justify-content-between'>
          <p>{data?.data.data.price} LE</p>
          <span> 
            <i className={`fa fa-star ${Style.Warrning}`}></i>
            {data?.data.data.ratingsAverage}
          </span>
        </div>
        <button onClick={()=>AddProductToCart(id)} className={`btn btn-success ${Style.Main}  `}>Add To Cart</button>

      </div>
      </div> 

  </div>
  </>
}
