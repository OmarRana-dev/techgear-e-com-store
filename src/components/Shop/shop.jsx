import React from "react";
import { useSelector } from "react-redux";
import Card from "./card";

function Shop() {
  const { products } = useSelector((state) => state.products);

  // Render the list of products
  return (
    <>
      <div className="m-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-center my-10">
          Our Products
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 max-w-5xl">
          {products.map((product) => (
            <Card key={product.id} item={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Shop;
