import React from "react";
import { useSelector } from "react-redux";
import Card from "../Shop/card";

function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <>
      <div className="m-6 flex min-h-screen flex-col items-center">
        <h2 className="text-2xl font-bold text-center my-10">
          Your WishList
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 max-w-5xl">
          {wishlist.map((product) => (
            <Card key={product.id} item={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
