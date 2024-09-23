import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { HeroSection, StorePage } from "./components";
import {
  Shop,
  Cart,
  Wishlist,
  Login,
  Signup,
  SignUpAsSeller,
  AddProductForm,
} from "./pages";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HeroSection />} />,
      <Route path="/login" element={<Login />} />,
      <Route path="/signup" element={<Signup />} />,
      <Route path="/shop" element={<Shop />} />,
      <Route path="/cart" element={<Cart />} />,
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/registerStore" element={<SignUpAsSeller />} />
      <Route path="/store/:storeId" element={<StorePage />} />
      <Route path="/addproduct" element={<AddProductForm />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
