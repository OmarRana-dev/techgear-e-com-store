import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

function Header() {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <header className="bg-green-900">
      <div className="h-14 p-2 w-full  text-white flex items-center">
        <Link
          to="/"
          className="text-start text-2xl p-2 font-mono font-bold w-full"
        >
          TECHGEAR
        </Link>
        <NavLink
          to="/wishlist"
          className="relative w-10 h-full flex items-center justify-center text-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bookmark-heart"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
            />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
          </svg>
          <span className="bg-gray-500 text-center relative -mt-5 -ml-1 text-xs font-light rounded-2xl w-4 h-4">
            {wishlist.length}
          </span>
        </NavLink>
        <NavLink
          to="/cart"
          className="w-10 h-full flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
          <span className="bg-gray-500 text-center relative -mt-5 -ml-1 text-xs font-light rounded-2xl w-4 h-4">
            {cart.length}
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
