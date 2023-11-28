import Style from "./FeaturedProducts.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";
import WishButton from "../WishButton/WishButton";
import '../WishButton/WishButton.module.css'

export default function FeaturedProducts() {
  const { AddToCart, setCardItems, } = useContext(CartContext);
  async function AddProductToCart(id) {
    const res = await AddToCart(id);
    setCardItems(res.data.numOfCartItems);
    if (res.data.status === "success") {
      toast.success("Product Successfully added To Your Cart");
    } else {
      toast.error("Product couldnt add");
    }
    console.log(res);
  }
  // function HandelClick(){
  //   window.alert("Hello")
  // }
  function GetProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("FeaturedProducts", GetProducts);
  // console.log(data?.data.data);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center p-5">
          <ThreeCircles
            height="100"
            width="100"
            color="#0AAD0A"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      ) : (
        <div className="container mb-5 pb-5">
          <div className="row gy-4">
            {data?.data.data.map((Product) => (
              <div
                key={Product.id}
                className={`col-lg-3 col-md-6 col-sm-12 position-relative rounded-1 ${Style.ProductContainer}`}
              >
                <Link
                  className="text-decoration-none"
                  to={`/productdetails/${Product.id}`}
                >
                  <div className={`card ${Style.CardBorder} `}>
                    <img
                      src={Product.imageCover}
                      className="card-img-top"
                      alt="product pic"
                      height={250}
                    />
                    <div className="card-body p-0 m-0">
                      <p className={`${Style.Main}  m-0`}>
                        {Product.category.name}
                      </p>
                      <p className="card-text p-0 m-0 ">
                        {Product.title.split(" ", 2).join(" ")}
                      </p>
                    </div>
                    <div className="card-footer pt-2 pb-0 px-0 bg-transparent border border-0 d-flex justify-content-between">
                      <p>{`${Product.price} LE`}</p>
                      <p className="text-muted fw-medium opacity-75">
                        <i className={`fa fa-star ${Style.Warrning}`}></i>
                        {Product.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>

                <WishButton Id={Product.id}/>

                <div className="d-flex justify-content-center pb-1">
                  <button
                    onClick={() => AddProductToCart(Product.id)}
                    className={`btn btn bg-success text-center border border-0  w-100  ${Style.ButtonMain}`}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

