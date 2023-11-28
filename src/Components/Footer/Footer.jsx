import React from "react";
import Style from "./Footer.module.css";
import AmazonPay from "../../assets/finalProject assets/images/Amazon_Pay-Logo.wine.png";
import AmericanExpress from "../../assets/finalProject assets/images/AmericanExpress-icon-thumbnail.png";
import MasterCard from "../../assets/finalProject assets/images/mastercard-font-solar-home-text-orange-logo.png";
import PayPal from "../../assets/finalProject assets/images/paypal-logo-11609371786gw3pnuakfe.png";
import AppStore from "../../assets/finalProject assets/images/AppStore.png";
import GooglePlay from "../../assets/finalProject assets/images/google play.png";

export default function Footer() {
  return (
    <>
      <footer className="fixed-bottom bg-body-tertiary">
        <div className="container">
          <div className="d-flex flex-column align-items-start text-center">
            <h6 className="h5 my-0 py-0 fw-normal">Get The FreshCart App</h6>
            <h6 className="h5 py-0 my-1 text-muted ">
              We Will Send You A Link,Open it on Your Phone To Download The App.
            </h6>
          </div>

          <div className="row pb-2">
            <div className="col-lg-7">
              <input
                className={` form-control   ${Style.FormControlCustomize}`}
                type="email"
                name="UserMail"
                placeholder="E-mail.."
              />
            </div>
            <div className="offset-lg-2 col-lg-3 col-sm-12 text-center">
              <button type="submit" className={`btn btn-success px-5 ${Style.main}`}>
                Share App Link
              </button>
            </div>
          </div>
          {/* <hr className='opacity-25' /> */}
          {/* <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <p className='fw-medium'> PaymentPartners</p>
          <img src={AmazonPay} width={80} height={50} alt="AmazonPay pic" />
          <img src={AmericanExpress} width={80} height={30} alt="AmericanExpress pic" />
          <img src={MasterCard} width={80} height={50} alt="MasterCard pic" />
          <img src={PayPal} width={80} height={50} alt="PayPal pic" />
        </div>
        <div className='d-flex align-items-start'>
        <p className='fw-medium'>Get Deliveries with FreshCart</p>
        <img src={AppStore} width={120} height={30} alt="AppStore pic" />
        <img src={GooglePlay} width={160} height={30} alt="PayPal pic" />
        </div>
      </div>
      <hr className='opacity-25' /> */}
        </div>
      </footer>
    </>
  );
}
