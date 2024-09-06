import React, { useEffect } from "react";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/products/productsSlice";

function App() {
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

  return (
    <div className="w-full min-h-screen bg-gray-400">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
