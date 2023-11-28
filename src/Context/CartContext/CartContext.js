import axios from "axios";

const { createContext, useState } = require("react");

export const CartContext = createContext();
export default function CartContextProvider(props) {
    const HeaderObject = {
        token: localStorage.getItem("UserToken"),
    };
    /////////////////////////////////////CartFunctions////////////////////////////
    const[CardItems,setCardItems]=useState(0)
    /////////////////add product///////
    async function AddToCart(id) {
        return axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart",
            {
                productId: id
            },
            {
                headers: HeaderObject
            }
        ).then((response)=>response).catch((error)=>error)
    }
    /////////////////get usercart//////////////
    async function GetLoggedUserCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:HeaderObject})
        .then((response)=>response)
        .catch((error)=>error)
    }
    ///////////////delete product/////////////////
    async function DeleteSpesificProduct(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:HeaderObject})
        .then((resolved)=>resolved)
        .catch((rejected)=>rejected)
    }
    //////////////////update products quatities////////
    async function UpdateProductsQuantities(ProductId,ProductCount){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
        {count:ProductCount},
        {headers:HeaderObject})
        .then((Resolved)=>Resolved)
        .catch((Rejected)=>Rejected)
    }
    ///////////////////////clear usercart//////////////
    function ClearUserCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:HeaderObject})
    }
    ////////////////////online payment/////
    async function OnlinePayment(CartId,shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000`,
        {shippingAddress},
        {headers:HeaderObject}).then((res)=>res).catch((err)=>err)
    }
    ////////////////Cash Payment//////////////////////
    async function CashPayment(CartId,shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
        {shippingAddress},
        {headers:HeaderObject}).then((res)=>res).catch((err)=>err)
    }



    ////////////////////////////WishList Functions/////////////////////////////////
    async function GetLoggedUserWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:HeaderObject})
        .then((Resolved)=>Resolved)
        .catch((error)=>error)
    }
    async function AddToWishList(id) {
        return axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            {
                productId: id
            },
            {
                headers: HeaderObject
            }
        ).then((response)=>response).catch((error)=>error)
    }
    async function RemoveFromWishList(id) {
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            {
                headers: HeaderObject
            }
        ).then((response)=>response).catch((error)=>error)
    }

    return <CartContext.Provider value={{AddToCart,GetLoggedUserCart,DeleteSpesificProduct,UpdateProductsQuantities,ClearUserCart,
    CardItems,setCardItems ,GetLoggedUserWishList,AddToWishList,RemoveFromWishList,
    OnlinePayment,CashPayment}}>
                {props.children}
            </CartContext.Provider>;
}
