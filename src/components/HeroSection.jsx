import React from "react";
import Slider from "react-slick";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
} from "../assets/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Shop from "./Shop/shop";
import { NavLink } from "react-router-dom";

function HeroSection() {
  const images = [image1, image2, image3, image4, image5];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <>
      <div className="relative w-auto h-auto sm:h-96 m-10">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                className="w-full h-auto sm:h-96 object-cover"
                alt={`Slide ${index + 1}`}
                style={{ borderRadius: "0.5rem !important" }}
              />
            </div>
          ))}
        </Slider>
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-center flex-col">
          <h2 className="text-white text-2xl text-center sm:text-3xl p-1 font-bold">
            Welcome to TechGear Store
          </h2>
          <NavLink
            to="/shop"
            className="text-white bg-green-900 px-4 py-2 rounded-lg mt-4"
          >
            Shop Now
          </NavLink>
        </div>
      </div>
      <div className="min-h-screen">
        <Shop />
      </div>
    </>
  );
}

export default HeroSection;
