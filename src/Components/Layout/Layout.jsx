import React, { useContext, useEffect, useState } from "react";
import Style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext";
import { Offline } from "react-detect-offline";
import { CartContext } from "../../Context/CartContext/CartContext";

export default function Layout() {
  const { setUserToken } = useContext(UserContext);
  const { GetLoggedUserCart, setCardItems } =
    useContext(CartContext);
  const [CartData, setCartData] = useState(null);
  async function GetCartDetails() {
    const res = await GetLoggedUserCart();
    if (res.name === "AxiosError") {
      setCartData(null);
      // console.log(CartData);
      // console.log("error");
      setCardItems(0);
    } else {
      setCartData(res.data);
      // console.log("no error");
      setCardItems(res.data.numOfCartItems);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("UserToken") !== null) {
      setUserToken(localStorage.getItem("UserToken"));
    } else {
      setUserToken(null);
    }
    GetCartDetails();

  }, []);
  return (
    <>
      <Navbar />
      <div className={`${Style.PaddingBottom} ${Style.Background}`}>
        <Outlet></Outlet>
      </div>
      <Footer />
      <Offline>
        <div
          className={`${Style.OfflineMode} d-flex justify-content-center align-items-baseline flex-row p-3  rounded-2`}
        >
          <p className=" mb-0 pb-0">You Are Offline RightNow</p>
          <i className="fa fa-wifi ms-2 align-self-center"></i>
        </div>
      </Offline>
    </>
  );
}
