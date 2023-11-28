import React from "react";
import Style from "./BrandProducts.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetSpecificBrandProducts } from "./../../Redux/SpecificBrandSlice";
import { useEffect } from "react";
import { Circles } from "react-loader-spinner";

export default function BrandProducts() {
  const { brandId } = useParams();
  console.log(brandId);
  ///////select slice data/////////
  const { BrandProducts, IsLoading, IsError } = useSelector(
    (state) => state.SpecificBrand
  );
  //////////////dispatch the API function when the page opens//////
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(GetSpecificBrandProducts(`${brandId}`));
  }, []);

  return (
    <>
      <div className="container  py-5">
        {IsLoading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Circles
              height="200"
              width="200"
              color="#0AAD0A"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="py-5">
            <p className="text-center fw-bold">
              A Trial To Get Brands Products But The API Give Me On Product
            </p>
            <div className="card mx-auto" >
              <img src={BrandProducts.image} className="img-fluid" alt={BrandProducts.slug} />
              <div className="card-footer">
                <p className="card-text text-center fw-bolder">
                  {BrandProducts.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
