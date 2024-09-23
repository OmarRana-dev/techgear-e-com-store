import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  NavLink,
  Link,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { Logo, Container } from "../index";
import appwriteService from "../../appwrite/ConfigService";

function Header() {
  const [imageUrls, setImageUrls] = useState({});
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const stores = useSelector((state) => state.auth.stores);

  const location = useLocation();
  const isStorePage = location.pathname.includes("/store");

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [currentStore, setCurrentStore] = useState(null); // Current store details
  const [failedStores, setFailedStores] = useState(null);
  const { storeId } = useParams(); // Get storeId from the URL

  useEffect(() => {
    if (storeId) {
      // Find the store that matches the current storeId
      const matchedStore = stores.find(
        (store) => store.$id === storeId
      );

      const filteredStores = stores.filter(
        (store) => store.$id !== storeId
      );
      setFailedStores(filteredStores);
      setCurrentStore(matchedStore);
    }

    const fetchStoreImages = async () => {
      if (isStorePage) {
        try {
          const urls = {};
          for (const store of stores) {
            const imageUrl = await appwriteService.getFilePreview(
              store.storeLogoImage
            );
            urls[store.$id] = imageUrl;
            console.log(imageUrl);
          }
          setImageUrls(urls);
        } catch (error) {
          console.error("Error fetching store images:", error);
        }
      }
    };

    fetchStoreImages();
  }, [storeId, stores]);

  const navItems = [
    { name: "Login", slug: "/login", active: !authStatus },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };
  return (
    <>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <div className="flex">
            <div className="mr-4 my-auto">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>
            {isStorePage && (
              <div className="flex gap-1 ml-auto">
                {/* Dropdown Menu */}
                <div
                  className={`absolute right-4 top-14 rounded-lg py-2 bg-slate-700 flex flex-wrap items-center justify-between mx-auto 
            transition-all duration-300 ease-in-out transform ${
              dropdownOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
                >
                  <div>
                    <ul className="flex flex-col items-center">
                      {failedStores?.map((store) => (
                        <li
                          key={store?.$id}
                          className="hover:bg-slate-500 px-4 py-2 w-full cursor-pointer"
                        >
                          <Link
                            to={`/store/${store?.$id}`}
                            className="flex gap-2"
                          >
                            <img
                              className="w-6 h-6 rounded-full object-cover"
                              src={imageUrls[store?.$id]}
                              alt={store?.storeName}
                            />
                            <p>{store?.storeName}</p>
                          </Link>
                        </li>
                      ))}
                      <div className="h-px bg-slate-500 w-11/12 my-2"></div>
                      <div className="px-4 py-2 w-full cursor-pointer">
                        <Link
                          to={"/registerStore"}
                          className="flex gap-2"
                        >
                          <div className="w-6 h-6 bg-gray-400 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 640"
                              xmlSpace="preserve"
                            >
                              <g>
                                <g>
                                  <path d="M261.9,247L261.9,247l0.2,0C262,247,261.9,247,261.9,247z" />
                                  <path d="M266.6,247h3.7c-0.7,0-1.3-0.1-2-0.1C267.7,246.9,267.2,247,266.6,247z" />
                                  <path d="M272.8,247h-2.6c0.4,0,0.8,0,1.2,0C272,247,272.4,247,272.8,247C272.9,247,272.8,247,272.8,247z" />
                                  <path d="M256,43C138.6,43,43,138.6,43,256c0,117.4,95.6,213,213,213s213-95.6,213-213C469,138.6,373.4,43,256,43z     M273.1,247.1c-0.6,0-1.1,0-1.6,0c-24.8,0.5-51.1,12.9-72.3,34.2C177.4,303,165,329.9,165,355.3V366h-21v-10.7    c0-30.9,14.6-63.2,40.3-88.9c14.1-14.1,30.1-24.9,46.9-31.7c-10.6-9.3-17.3-22.9-17.3-38c0-27.8,22.6-50.4,50.4-50.4    c27.8,0,50.4,22.6,50.4,50.4c0,26.3-20.2,47.9-45.8,50.2c1.6,0.1,3,0.1,3.9,0.2L273.1,247.1c-0.1-0.1-0.2-0.1-0.2-0.1    C273.7,247,273.9,247.1,273.1,247.1z M338,299v43h-21v-43l-40.3,0l-0.1-21.2l40.4,0V236h21v41.8l40.4,0l0.1,21.2L338,299z" />
                                </g>
                              </g>
                            </svg>
                          </div>
                          <p>Add Store</p>
                        </Link>
                      </div>
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded={dropdownOpen}
                  onClick={handleDropdown}
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={imageUrls[currentStore?.$id] || ""}
                    alt={currentStore?.storeName}
                  />
                </button>
              </div>
            )}
            {!isStorePage && (
              <ul className="flex gap-1 ml-auto">
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
                  <span className=" bg-opacity-100 text-center relative -mt-5 -ml-1 text-xs font-light rounded-2xl w-4 h-4">
                    {wishlist.length}
                  </span>
                </NavLink>
                <NavLink
                  to="/cart"
                  className="relative w-10 h-full flex items-center text-white justify-center cursor-pointer"
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
                  <span className="bg-transparent text-center relative -mt-5 -ml-1 text-xs font-light rounded-2xl w-4 h-4">
                    {cart.length}
                  </span>
                </NavLink>
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        </Container>
      </header>
    </>
  );
}

export default Header;
