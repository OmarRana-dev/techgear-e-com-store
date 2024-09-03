import React from "react";
import { useSelector } from "react-redux";
import Cartlist from "./cartlist";
import { NavLink } from "react-router-dom";

function Cart() {
  const { cart } = useSelector((state) => state.cart);

  const shippingFee = 5.0;
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const finalPrice = totalPrice + shippingFee;

  return (
    <div className="bg-gray-300 min-h-screen flex items-center font-sans font-bold">
      <div className="w-full max-w-4xl mx-auto p-5 my-5 shadow-lg rounded-xl bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Cart Section */}
          <div className="flex-1 bg-white p-8 rounded-tl-xl rounded-bl-xl md:rounded-bl-none md:rounded-tl-xl">
            <div className="mb-10">
              <div className="flex justify-between">
                <h4 className="text-xl font-bold">Shopping Cart</h4>
                <div className="text-right text-gray-500">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </div>
              </div>
            </div>

            {/* Cart Items */}
            {cart.map((item) => (
              <Cartlist key={item.id} item={item} />
            ))}

            {/* Back to Shop */}
            <NavLink to="/shop" className="mt-20 flex items-center">
              <a href="#" className="text-gray-500 mr-2">
                &larr;
              </a>
              <span className="text-gray-500">Back to shop</span>
            </NavLink>
          </div>

          {/* Summary Section */}
          <div className="bg-gray-300 p-8 rounded-tr-xl rounded-br-xl md:rounded-br-xl md:rounded-tr-none">
            <div className="text-xl font-bold mb-4">Summary</div>
            <hr className="my-4" />
            <div className="flex justify-between mb-4">
              <div>ITEMS {cart.length}</div>
              <div>&euro; {totalPrice.toFixed(2)}</div>
            </div>
            <form className="mt-4">
              <p className="mb-2">SHIPPING</p>
              <select className="w-full p-2 mb-4 border bg-gray-100 outline-none">
                <option className="text-gray-500">
                  Standard Delivery - &euro;{shippingFee.toFixed(2)}
                </option>
              </select>
              <p className="mb-2">GIVE CODE</p>
              <input
                id="code"
                placeholder="Enter your code"
                className="w-full p-2 border bg-gray-100 outline-none"
              />
            </form>
            <div className="flex justify-between border-t border-gray-300 py-4">
              <div>TOTAL PRICE</div>
              <div>&euro; {finalPrice.toFixed(2)}</div>
            </div>
            <button className="w-full bg-black text-white py-2 mt-4 hover:bg-gray-800 transition-colors">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
