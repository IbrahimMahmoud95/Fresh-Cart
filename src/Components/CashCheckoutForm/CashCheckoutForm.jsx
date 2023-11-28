import React, { useContext, useEffect, useState } from 'react';
import Style from './CashCheckoutForm.module.css'
import * as yup from "yup"
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function CashCheckoutForm() {

  ////////////////Ideal Object For IntialValues' shape Required By Back-End///////
  const IdealObject={
    details:"",
    phone:"",
    city:""
  }
  /////////////////Regex and validations for user input fields/////////////
  const MobileRegex=/^(002||\+2)(01)[0-9]{9}$/
  const ValidationShape =yup.object({
    details:yup.string().min(3,'Min Letters or Digits For Name Is 3').required('Details Is Required'),
    phone:yup.string().matches(MobileRegex,'Only Egyptian MobilePhone Number Is Accepted').required('Mobile Number Is Required'),
    city:yup.string().min(3,'Min Letter For Egyptian City Is 3 ').required('City Is Required')
  })
  ////////////////payment function imported from context//////
  const{CashPayment,setCardItems,GetLoggedUserCart}=useContext(CartContext);


  const {cartId}=useParams();
  const Navigate=useNavigate();
  const[Total,setTotal]=useState(0)
    ///////////////Check if Cart Exist//////////
  async function CartExist(){
    if (cartId==='undefined') {
      setTotal(0)
    }
    else{
      const res =await GetLoggedUserCart();
      console.log(res)
      setTotal(res.data.data.totalCartPrice)
    }
  }
  //////////////////////////////////Submit Function///////
  async function Order (val){
    // const resp =await GetLoggedUserCart();
    if (cartId==='undefined'){ Navigate('/')   } 
    else{
      const res=await CashPayment(cartId,val);
      // console.log(resp);
      // setTotal(resp.data.data.totalCartPrice)
      console.log(res);
      if (res.data.status==='success') {
        toast.success('Order Done')
        setCardItems(0);
      }
      else{
        toast.error('Faild to Make Order')
      }
      Navigate('/')
    }

  }
  let formik=useFormik({
    initialValues:IdealObject,
    validationSchema:ValidationShape,
    onSubmit:Order
  })
  useEffect(()=>{CartExist()}
  )
  return <>
  <div className='container mt-5 py-5'>
    <form onSubmit={formik.handleSubmit}>
      <div className='py-3'>
      <label htmlFor="details">Details</label>
      <input type="text" id='details' name='details' 
      value={formik.values.details}
      className='form-control'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      {formik.errors.details&&formik.touched.details?<div className='text-danger'>{formik.errors.details}</div>:''}
      </div>
      <div className='py-3'>
      <label htmlFor="phone">phone</label>
      <input type="text" id='phone' name='phone' 
      value={formik.values.phone}
      className='form-control'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      {formik.errors.phone&&formik.touched.phone?<div className='text-danger'>{formik.errors.phone}</div>:''}
      </div>
      <div className='py-3'>
      <label htmlFor="city">city</label>
      <input type="text" id='city' name='city' 
      value={formik.values.city}
      className='form-control'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      {formik.errors.city&&formik.touched.city?<div className='text-danger'>{formik.errors.city}</div>:''}
      </div>
      <div className='text-danger text-center'>
        <p className='p-0 m-0'>Your Toatal Order Price Is: {Total} L.E</p>
        <p className='p-0 m-0'>Our Shipping Partner Will Call You Within 3:7 days</p>
      </div>
      <div className='text-center'>
      <button className='px-3 btn btn-danger' type='submit'>Order</button>
      </div>
    </form>
  </div>
  </>
}
