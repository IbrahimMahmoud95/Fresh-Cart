import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext/CartContext";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    GetLoggedUserCart,
    DeleteSpesificProduct,
    UpdateProductsQuantities,
    ClearUserCart,
    setCardItems,
  } = useContext(CartContext);
  const [IsLoading, setIsLoading] = useState(false);
  const [CartData, setCartData] = useState(null);
  const Navigate = useNavigate();
  async function DisplayCart() {
    setIsLoading(true);
    const res = await GetLoggedUserCart();
    console.log(res);
    if (res.name === "AxiosError") {
      setCartData(null);
      console.log(CartData);
      console.log("error");
      setCardItems(0);
      setIsLoading(false);
    } else {
      setCartData(res?.data);
      console.log("no error");
      setCardItems(res?.data?.numOfCartItems);
      setIsLoading(false);
    }
  }
  async function RemoveProduct(id) {
    setIsLoading(true);
    const { data } = await DeleteSpesificProduct(id);
    setCartData(data);
    setCardItems(data.numOfCartItems);
    setIsLoading(false);
  }
  async function UpdateQuntities(Id, Count) {
    setIsLoading(true);
    const { data } = await UpdateProductsQuantities(Id, Count);
    if (Count >= 1) {
      setCartData(data);
    } else {
      await RemoveProduct(Id);
    }
    setIsLoading(false);
  }
  async function RemoveAll() {
    setIsLoading(true);
    await ClearUserCart();
    DisplayCart();
    Navigate("/");
    setIsLoading(false);
  }
  useEffect(() => {
    DisplayCart();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <div className="bg-body-tertiary container mx-auto  py-5">
        {IsLoading === false ? (
          <div>
            {CartData === null || CartData.numOfCartItems === 0 ? (
              <div>
                <p className="h3 text-center fw-bolder pt-5">
                  Your Cart Is Empty
                </p>
              </div>
            ) : (
              <div>
                <div className="pt-3">
                  <h6 className="h2 fw-light">Shopping Cart :</h6>
                  <div className="d-flex justify-content-between align-items-center ">
                    <p
                      className={`${Style.Main} h6 pb-2`}
                    >{`Total Cart Price : ${CartData.data.totalCartPrice} LE`}</p>
                    <p className={`${Style.Main} fw-bolder`}>
                      Number Of Cart Items : {CartData.numOfCartItems}
                    </p>
                  </div>
                </div>
                {CartData.data?.products.map((Product) => (
                  
                    <div
                      className="py-1 border-bottom row"
                      key={Product.product.id}
                    >
                      <div className="col-sm-2">
                        <img
                          src={Product.product.imageCover}
                          alt={Product.product.title}
                          className="w-100 "
                          height={200}
                        />
                      </div>
                      <div className="col-sm-10 d-flex justify-content-between align-items-center">
                        <div>
                          <p>
                            {Product.product.title
                              .split(" ", 3)
                              .slice(0, 3)
                              .join(" ")}
                          </p>
                          <p className={`${Style.Main}`}>
                            Price : {Product.price}
                          </p>
                          <button
                            onClick={() => RemoveProduct(Product.product.id)}
                            className="btn"
                          >
                            {" "}
                            <i
                              className={`fas fa-trash-can text-danger p-0 me-1`}
                            ></i>{" "}
                            Remove
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() =>
                              UpdateQuntities(
                                Product.product.id,
                                Product.count - 1
                              )
                            }
                            className={`btn ${Style.MainBorder}`}
                          >
                            -
                          </button>
                          <span className="mx-2">{Product.count}</span>
                          <button
                            onClick={() =>
                              UpdateQuntities(
                                Product.product.id,
                                Product.count + 1
                              )
                            }
                            className={`btn ${Style.MainBorder}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  
                ))}
              </div>
            )}
            <div className="d-flex justify-content-center">
              {" "}
              <button
                onClick={() => RemoveAll()}
                className={` btn btn-danger mt-2`}
              >
                Clear Cart
              </button>
            </div>
            <div className="d-flex justify-content-around pt-3">
            <Link to={`/OnlineCheckout/${CartData?.data._id}`} className={`btn ${Style.MainBackground} text-white`}>Online Payment</Link>
            <Link to={`/CashCheckout/${CartData?.data._id}`} className={`btn ${Style.MainBackground} text-white`}>Cash Payment</Link>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center p-5">
            <Circles
              height="200"
              width="200"
              color="#0aad0a"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}{" "}
      </div>
    </>
  );
}


