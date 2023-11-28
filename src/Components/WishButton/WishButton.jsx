import React, { useContext, useEffect, useState } from "react";
import Style from "./WishButton.module.css";
import { CartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";

export default function WishButton(props) {
  const [BtnState, setBtnState] = useState(false);
  const{GetLoggedUserWishList,AddToWishList,RemoveFromWishList}=useContext(CartContext);
  async function PresistState(){
    const res = await GetLoggedUserWishList();
    // console.log(res.data.data)
    res.data?.data.map(async function(Product){
      if (Product.id===props.Id) {
        setBtnState(true)
      }
    })
  };
  async function AddProductToWishList(ProductId){
    const res = await AddToWishList(ProductId);
    if (res.data?.status === "success") {
      toast.success("Product Successfully added To Your WishList");
    } else {
      toast.error("Product couldnt add");
    }
    // console.log(res)
  };
  async function RemoveProductFromWishList(ProductId){
    const res = await RemoveFromWishList(ProductId);
    if (res.data.status === "success") {
      toast.success("Product Successfully Removed From Your WishList");
    } else {
      toast.error("Product couldnt Remove");
    }
    // console.log(res)
  };
  function HandelClick() {
    if (BtnState === false) {
      setBtnState(true);
      AddProductToWishList(props.Id)
    } else {
      setBtnState(false);
      RemoveProductFromWishList(props.Id)
    }
    // window.alert(props.Id);
  }
  let ToggelClass = BtnState ? `text-danger` : ``;
  useEffect(()=>{PresistState()})
  return (
    <div className="d-flex justify-content-center pb-1 ">
      <div className={`${Style.Pointer}`} onClick={HandelClick}>
      <div className={ToggelClass}><i className={`fa-solid fa-heart fa-2x`}></i></div>
        {/* {BtnState?<i className="fa-solid fa-heart fa-2x text-danger"></i>:<i className="fa-regular fa-heart fa-2x"></i>} */}
      </div>
      {/* {BtnState?(<div className={`fa-solid fa-heart fa-2x text-danger ${Style.Pointer}`} onClick={HandelClick}></div>):(<div className={` fw-bold fa-regular fa-heart fa-2x ${Style.Pointer} `} onClick={HandelClick}></div>) } */}
    </div>
  );
}
