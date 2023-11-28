import React from 'react';
import Style from './NotFound.module.css'
import NotFoundSVG from '../../assets/finalProject assets/images/error.svg'

export default function NotFound() {
  return <>
  <div className='pt-5 container d-flex justify-content-center align-items-center'>
    <img src={NotFoundSVG} alt="notfound pic" className='pt-4' />

  </div>
  </>
}
