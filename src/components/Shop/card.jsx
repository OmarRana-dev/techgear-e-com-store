import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../features/wishlist/wishlistSlice";

function Card({ item }) {
  const dispatch = useDispatch();

  return (
    <li className="flex flex-col items-center max-w-sm bg-gray-400  rounded-lg shadow ">
      <div className="w-full">
        <img
          className="rounded-t-lg w-full h-72 aspect-auto object-contain"
          src={item.product.productImage}
          alt=""
        />
      </div>
      <div className="p-1 text-start h-40 flex flex-col justify-between w-full">
        <h5 className=" text-sm  font-semibold tracking-tight text-gray-900">
          {item.product.productName}
        </h5>
        <div className="text-white">
          <p className="text-red-600">
            Price:{" "}
            <span className="text-xl"> ${item.product.price}</span>
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
                item.product.wishlist
                  ? dispatch(removeItemFromWishlist(item.product.$id))
                  : dispatch(addItemToWishlist(item))
              }
              className="w-1/5 bg-green-900 rounded-sm"
            >
              {item.product.wishlist ? (
                <span>&#10005;</span>
              ) : (
                <span>&#9829;</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
