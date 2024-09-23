import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";
import { useSelector, useDispatch } from "react-redux";
import authService from "../../appwrite/authService";
import { logout as authLogout } from "../../features/authSlice";
import { store } from "../../store/store";

function Footer() {
  const isLogin = useSelector((state) => state.auth.status);
  const { userData } = useSelector((state) => state.auth);
  const stores = useSelector((state) => state.auth.stores);
  const dispatch = useDispatch();

  // console.log(userData);
  // console.log(stores);
  // Logout handler
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(authLogout());
      console.log("User logged out");
    });
  };

  // console.log(stores[0]?.$id);

  // Determine user's role-based options for footer
  const companyItems = [
    { name: "Features", slug: "/" },
    userData?.prefs.role === "buyer" && {
      name: "Sell on TechGear",
      slug: "/registerStore",
    }, // Only for buyers
    userData?.prefs.role === "seller" && {
      name: "Sales Dashboard",
      slug: `/store/${stores[0]?.$id}`,
    }, // Only for sellers
    { name: "Pricing", slug: "/" },
    { name: "Affiliate Program", slug: "/" },
  ].filter(Boolean); // Remove null items from the array

  const supportItems = [
    { name: "Help Center", slug: "/" },
    { name: "Contact Us", slug: "/" },
    { name: "Press Inquiries", slug: "/" },
    { name: "Terms of Service", slug: "/" },
    { name: "Return Policy", slug: "/" },
    { name: "Refund Policy", slug: "/" },
  ];

  const legalsItems = [
    { name: "Privacy Policy", slug: "/" },
    { name: "Cookie Policy", slug: "/" },
    { name: "Terms of Service", slug: "/" },
    { name: "Return Policy", slug: "/" },
    { name: "Refund Policy", slug: "/" },
    { name: "Investor Relations", slug: "/" },
    { name: "Security", slug: "/" },
  ];

  return (
    <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved by
                  TECHGEAR.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                {companyItems.map((item) => (
                  <li key={item.name} className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-700"
                      to={isLogin ? item.slug : "/login"}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {/* Conditionally show Logout if user is logged in */}
                {isLogin && (
                  <li className="mb-4">
                    <Link
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                      onClick={logoutHandler}
                      to={""}
                    >
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                {supportItems.map((item) => (
                  <li key={item.name} className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-700"
                      to={isLogin ? item.slug : "/login"}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                {legalsItems.map((item) => (
                  <li key={item.name} className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-700"
                      to={isLogin ? item.slug : "/login"}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
