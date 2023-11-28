import React, { useEffect } from "react";
import Style from "./Brands.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBrands } from "../../Redux/AllBrandsSlice";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";
export default function Brands() {
  const { Brands, IsLoading, IsError } = useSelector(
    (state) => state.AllBrands
  );
  console.log(IsError);
  console.log(Brands);
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(GetAllBrands());
  }, []);
  return (
    <>
      <div className="container py-5">
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
          <div className="row g-2 py-4">
            {Brands.map((Brand) => (
              <div className={`col-lg-2 col-md-4 ${Style.CardContainer}`} key={Brand._id}>
                <Link to={`/brandProducts/${Brand._id}`} className="text-center text-decoration-none" >
                  <div className={`${Style.Card}`}>
                  <img src={Brand.image} className="img-fluid rounded-1" alt={Brand.slug} />
                  <div className="card-body">
                    <p className="card-text text-center fw-bolder text-dark">
                      {Brand.name}
                    </p>
                  </div>
                  </div>

                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
