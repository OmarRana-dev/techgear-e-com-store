import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./features/authSlice";
import { fetchProducts } from "./features/products/productsSlice";
import { ProgressBar, Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { userData, loading, progress } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkUserSession());
    if (userData) {
      dispatch(fetchProducts());
    }
    // Dispatch session check on app load
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// const dispatch = useDispatch();
// const { products, status, error } = useSelector(
//   (state) => state.products
// );

// useEffect(() => {
//   // Check if products are already loaded before dispatching the fetch action
//   if (products.length === 0) {
//     dispatch(fetchProducts());
//   }
// }, [dispatch, products.length]);

// useEffect(() => {
//   // Check if user is already logged in by calling getCurrentUser
//   authService.getCurrentUser().then((data) => {
//     if (data) {
//       console.log("User logged in:", data);
//       dispatch(login(data)); // If user is logged in, dispatch login action
//     } else {
//       console.log("No session found, please log in.");
//       dispatch(logout()); // If no session, user needs to log in
//     }
//   });
// }, []);

// if (status === "loading") {
//   return (
//     <div className="flex justify-center">
//       <div className="flex  items-center gap-2 m-12">
//         <div
//           className="ml-auto inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
//           role="status"
//         ></div>
//         <strong className="text-2xl">Loading...</strong>
//       </div>
//     </div>
//   );
// }

// if (status === "failed") {
//   return (
//     <div className="flex justify-center">
//       <div className="text-red-500 text-xl">
//         Failed to load products: {error}
//       </div>
//     </div>
//   );
// }

// return (
//   <div className="w-full min-h-screen bg-gray-400">
//     <Header />
//     <main>
//       <Outlet />
//     </main>
//     <Footer />
//   </div>
// );
// }

export default App;
