import React from "react";
import Style from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from './../MainSlider/MainSlider';
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
          <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <div className="p-5">
        <MainSlider/>
        <CategorySlider />
        <div className="pb-5">
        <FeaturedProducts />
        </div>
        
      </div>
    </>
  );
}
