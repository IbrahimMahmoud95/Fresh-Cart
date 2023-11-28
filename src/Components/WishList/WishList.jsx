import React, { useContext, useEffect, useState } from "react";
import Style from "./WishList.module.css";
import { CartContext } from "../../Context/CartContext/CartContext";
import { Circles } from "react-loader-spinner";
// import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

export default function WishList() {
  const {
    GetLoggedUserWishList,
    RemoveFromWishList,
    AddToCart,
    GetLoggedUserCart,
    setCardItems,
  } = useContext(CartContext);
  const [isLoading, setisLoading] = useState(false);
  const [WishListData, setWishListData] = useState({});
////////////////////display//////////
  async function DisplayWishlist() {
    setisLoading(true);
    console.log(`component did mount`);
    // const { data } = await GetLoggedUserWishList();
    const res = await GetLoggedUserWishList();
    console.log(res);
    setWishListData(res.data);
    console.log(WishListData);
    setisLoading(false);
  }
////////////////Remove/////////////
async function RemoveItem(id){
  setisLoading(true);
  RemoveFromWishList(id)
  const { data } = await GetLoggedUserWishList();
  console.log(data);
  setWishListData(data);
  DisplayWishlist()
}
///////////////Add To Cart///////////////////
async function SetNumber(){
  const{data}=await GetLoggedUserCart();
  setCardItems(data.numOfCartItems);
}
async function AddItemToCart(id){
  setisLoading(true);
  const{data}=await GetLoggedUserCart();
  setCardItems(data.numOfCartItems);
  AddToCart(id);
  RemoveFromWishList(id);
  const res = await GetLoggedUserWishList();
  setWishListData(res.data);
  DisplayWishlist();
  await SetNumber();
}
///////////////
  useEffect(() => {
    DisplayWishlist();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WishList</title>
      </Helmet>
      <div className="py-5 bg-body-tertiary container ">
      {isLoading ? (
        <div className="p-5 d-flex justify-content-center align-items-center">
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
      ) : (
        <div className="p-4">
          {WishListData?.count===0?
          <div>
            <p className="fw-bolder fs-2 text-center">Your WishList Is Empty</p>
          </div>
          :
          <div >
            <p className=" fw-bolder fs-3">WishList Items:</p>
            {WishListData?.data?.map((Item)=>
            <div key={Item.id} className="row">
              <div className="col-md-2 p-1">
                <img src={Item.imageCover} className="w-100" height={150} alt={Item.title} />
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center">
                <p className="fw-bold fs-5">
                  {Item.title.split(" ",3).join(' ')}
                </p>
                <button className="btn align-self-start" onClick={()=>{RemoveItem(Item.id)}}> 
                <i className="pe-2 fa-solid fa-trash fa-1x text-danger"></i>
                Remove
                </button>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <button className={`btn ${Style.ButtonMain}`} onClick={()=>{AddItemToCart(Item.id)}}   >
                  Add To Cart
                </button>
              </div>
              
            <hr />
            </div>
            )
            }
        </div>
          }
        </div>
      )
      }

      </div>

    </>
  );
}
