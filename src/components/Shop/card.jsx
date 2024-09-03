/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../features/wishlist/wishlistSlice";

function Card({ item }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col items-center max-w-sm bg-gray-400  rounded-lg shadow ">
        <div className="w-full">
          <img
            className="rounded-t-lg w-full h-72"
            src={item.image}
            alt=""
          />
        </div>
        <div className="p-1 text-start h-40 flex flex-col justify-between w-full">
          <h5 className=" text-sm  font-semibold tracking-tight text-gray-900">
            {item.title}
          </h5>
          <div className="text-white">
            <p className="text-red-600">
              Price: <span className="text-xl"> ${item.price}</span>
            </p>
            <div className="flex gap-1 mt-2">
              <button
                onClick={() => dispatch(addItemToCart(item))}
                className="w-4/5 bg-green-900 rounded-sm py-2"
              >
                Add to Cart
              </button>
              <button
                onClick={() =>
                  item.wishlist
                    ? dispatch(removeItemFromWishlist(item.id))
                    : dispatch(addItemToWishlist(item))
                }
                className="w-1/5 bg-green-900 rounded-sm"
              >
                {item.wishlist ? (
                  <span>&#10005;</span> // Cross symbol for removing from wishlist
                ) : (
                  <span>&#9829;</span> // Heart symbol for adding to wishlist
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
