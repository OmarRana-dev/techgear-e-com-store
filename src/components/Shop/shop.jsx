import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  searchProduct,
  filterProducts,
  clearFilters,
} from "../../features/products/productsSlice";
import Card from "./card";
import { ProgressBar } from "../";
import appwriteService from "../../appwrite/ConfigService";

function Shop() {
  const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState({});
  const { products, filteredProducts, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <ProgressBar percentage={50} />; // Show loading state
  }

  if (status === "failed") {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <>
      <div className="m-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-center my-10">
          Our Products
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 max-w-5xl">
          {console.log(products)}
          {products.map((product) => (
            <Card
              key={product.$id}
              item={{
                product,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Shop;

// const handleSearch = (e) => {
//   dispatch(searchProduct(e.target.value)); // Dispatch search on user input
// };

// const handleFilter = (category) => {
//   dispatch(filterProducts(category)); // Filter by category
// };

// const resetFilters = () => {
//   dispatch(clearFilters()); // Reset filters to show all products
// };
