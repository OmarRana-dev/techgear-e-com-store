import React from "react";

function Header() {
  return (
    <div className="h-12 p-2 w-full bg-green-900 text-white flex items-center gap-x-2">
      <h1 className="text-start text-2xl p-2 font-mono font-bold w-full">
        TECHGEAR
      </h1>

      <div className="w-20 h-full flex items-center justify-center">
        Wishlish
      </div>

      <div className="w-20 h-full flex items-center justify-around">
        Cart: <span>99+</span>
      </div>
    </div>
  );
}

export default Header;
