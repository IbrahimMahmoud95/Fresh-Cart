import React, { useContext, useEffect, useState } from "react";
import Style from "./Navbar.module.css";
import Logo from "../../assets/finalProject assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext";
import { CartContext } from "../../Context/CartContext/CartContext";

export default function Navbar() {
  const { UserToken, setUserToken } = useContext(UserContext);
  const { CardItems, GetLoggedUserCart, setCardItems } =
    useContext(CartContext);
  const [CartData, setCartData] = useState(null);

  const Navigate = useNavigate();
  function LogOut() {
    localStorage.removeItem("UserToken");
    setUserToken(null);
    Navigate("/signin");
  }
  /////////
  async function c() {
    const res = await GetLoggedUserCart();
    // console.log(res)
    if (res.name === "AxiosError") {
      setCartData(null);
      // console.log(CartData);
      // console.log("error");
      setCardItems(0);
    } else {
      setCartData(res?.data);
      // console.log("no error");
      setCardItems(res?.data?.numOfCartItems);
    }
  }
  useEffect(() => {
    c();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary ">
      <div className="container">
        <NavLink className="navbar-brand">
          <img src={Logo} alt="logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className=" mx-auto navbar-nav">
            {UserToken !== null ? (
              <>
                <NavLink className="nav-link " to="">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="cart">
                  Cart
                </NavLink>
                <NavLink className="nav-link" to="wishlist">
                  WishList
                </NavLink>
                <NavLink className="nav-link" to="brands">
                  Brands
                </NavLink>

                <div className="d-flex justify-content-between align-items-center">
                  <NavLink
                    className={`text-muted position-relative ${Style.CartLogo}`}
                    to="cart"
                  >
                    <i className="fa-solid fa-cart-shopping fa-2x me-3"></i>
                    <span
                      className={`position-absolute top-0 start-50 translate-middle badge rounded-1 px-2 ${Style.Main}`}
                    >
                      {CardItems}
                    </span>
                  </NavLink>
                  <span
                    onClick={() => LogOut()}
                    className={`nav-link ps-5 ${Style.Pointer}`}
                  >
                    Logout
                  </span>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-between">
                <div>
                  <NavLink className="nav-link " to="signup">
                    Signup
                  </NavLink>
                </div>
                <div>
                  <NavLink className="nav-link" to="signin">
                    Signin
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
