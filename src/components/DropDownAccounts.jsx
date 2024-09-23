import React, { useState, useRef, useEffect } from "react";

const DropdownComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  // Close the dropdown if a click occurs outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="dropdown-wrapper">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded={dropdownOpen}
        onClick={handleDropdown}
      >
        <img className="w-8 h-8 rounded-full" src="" alt="" />
      </button>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-4 top-14 rounded-lg py-2 bg-slate-700 flex flex-wrap items-center justify-between"
        >
          {/* Your dropdown content goes here */}
          <ul className="flex flex-col gap-2">
            {/* Example dropdown items */}
            <li className="hover:bg-slate-500 px-4 py-2 cursor-pointer">
              Item 1
            </li>
            <li className="hover:bg-slate-500 px-4 py-2 cursor-pointer">
              Item 2
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
