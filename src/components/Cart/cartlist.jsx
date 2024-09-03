/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
} from "../../features/cart/cartSlice";

function Cartlist({ item }) {
  const dispatch = useDispatch();
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    let itemPrice = item.price * item.quantity;
    setCartPrice(itemPrice);
  }, [item]); // Include item as a dependency

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(item.id));
    console.log(item.id);
    console.log(item);
  };

  const handleDecrementQuantity = () => {
    if (item.quantity > 1) {
      console.log(item.id);
      dispatch(decrementQuantity(item.id));
    }
    console.log(item);
  };

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart(item.id));
    console.log(item);
  };

  return (
    <div className="border-t border-b py-4">
      <div className="flex items-center">
        <div className="w-16">
          <img className="w-full" src={item.image} alt={item.title} />
        </div>
        <div className="flex-1 px-4">
          <div className="overflow-hidden">{item.title}</div>
        </div>
        <div className="px-4 flex items-center">
          <button onClick={handleDecrementQuantity} className="px-2">
            -
          </button>
          <span className="px-2 border">{item.quantity}</span>
          <button onClick={handleIncrementQuantity} className="px-2">
            +
          </button>
        </div>
        <div className="px-4">
          &euro; {cartPrice.toFixed(2)}{" "}
          <span
            className="ml-auto text-xs cursor-pointer"
            onClick={handleRemoveItem}
          >
            &#10005;
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cartlist;
