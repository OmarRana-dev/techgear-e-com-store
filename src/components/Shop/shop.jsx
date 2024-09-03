import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import Card from "./card";

function Shop() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // Check if products are already loaded before dispatching the fetch action
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (status === "loading") {
    return (
      <div className="flex justify-center">
        <div className="flex  items-center gap-2 m-12">
          <div
            className="ml-auto inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <strong className="text-2xl">Loading...</strong>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center">
        <div className="text-red-500 text-xl">
          Failed to load products: {error}
        </div>
      </div>
    );
  }

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
