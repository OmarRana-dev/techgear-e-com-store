import { image1 } from "../../assets/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,  useParams } from "react-router-dom";
import appwriteService from "../../appwrite/ConfigService";
import { setActiveStore } from "../../features/authSlice";
import { Container } from "../index";

function StorePage() {
  const { stores, activeStore } = useSelector((state) => state.auth); // List of stores from Redux
  const [currentStore, setCurrentStore] = useState(null); // Current store details
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(""); // Store logo URL
  const { storeId } = useParams(); // Get storeId from the URL

  useEffect(() => {
    console.log(storeId);
    // Find the store that matches the current storeId
    const matchedStore = stores.find(
      (store) => store.$id === storeId
    );

    // console.log(matchedStore);
    if (matchedStore) {
      setCurrentStore(matchedStore);
      dispatch(setActiveStore(matchedStore));

      // Fetch the store logo image for the current store
      appwriteService
        .getFilePreview(matchedStore.storeLogoImage)
        .then((url) => {
          setImageUrl(url);
          console.log(url);
          console.log(activeStore);
        })
        .catch((error) => {
          console.error("Error fetching store logo:", error);
        });
    }
  }, [storeId, stores]);

  if (!currentStore) {
    return <Container>Loading...</Container>;
  }
  const products = [
    {
      id: 1,
      name: "Smartphone X",
      description:
        "A high-end smartphone with 5G connectivity and OLED display.",
      productCode: "SPX12345",
      category: "Electronics",
      storeID: "Store10",
      price: 999,
      ownerId: "Owner10",
      quantity: 25,
      image: image1,
      warranty: "1 year manufacturer warranty",
      returnPolicy: "30 days return",
      cashOnDelivery: true,
    },
    {
      id: 2,
      name: "Gaming Laptop Pro",
      description:
        "A powerful gaming laptop with NVIDIA graphics and 16GB RAM.",
      productCode: "GLP98765",
      category: "Electronics",
      storeID: "Store10",
      price: 1499,
      ownerId: "Owner10",
      quantity: 10,
      image: image1,
      warranty: "2 years manufacturer warranty",
      returnPolicy: "15 days return",
      cashOnDelivery: true,
    },
    {
      id: 3,
      name: "Wireless Headphones",
      description:
        "Noise-cancelling wireless headphones with Bluetooth 5.0.",
      productCode: "WH1234",
      category: "Accessories",
      storeID: "Store10",
      price: 199,
      ownerId: "Owner10",
      quantity: 50,
      image: image1,
      warranty: "6 months manufacturer warranty",
      returnPolicy: "7 days return",
      cashOnDelivery: false,
    },
    {
      id: 4,
      name: "Smartwatch Pro",
      description:
        "A sleek smartwatch with fitness tracking and heart rate monitoring.",
      productCode: "SW5678",
      category: "Wearables",
      storeID: "Store10",
      price: 299,
      ownerId: "Owner10",
      quantity: 30,
      image: image1,
      warranty: "1 year manufacturer warranty",
      returnPolicy: "14 days return",
      cashOnDelivery: true,
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      description:
        "Portable Bluetooth speaker with rich bass and 12 hours battery life.",
      productCode: "BS12345",
      category: "Audio",
      storeID: "Store10",
      price: 129,
      ownerId: "Owner10",
      quantity: 40,
      image: image1,
      warranty: "1 year manufacturer warranty",
      returnPolicy: "30 days return",
      cashOnDelivery: true,
    },
    {
      id: 6,
      name: "4K LED TV",
      description:
        "Ultra HD 4K LED TV with smart features and HDR support.",
      productCode: "TV9876",
      category: "Home Entertainment",
      storeID: "Store10",
      price: 799,
      ownerId: "Owner10",
      quantity: 15,
      image: image1,
      warranty: "2 years manufacturer warranty",
      returnPolicy: "30 days return",
      cashOnDelivery: false,
    },
    {
      id: 7,
      name: "Electric Kettle",
      description:
        "Fast boiling electric kettle with auto shut-off and 1.5L capacity.",
      productCode: "EK5432",
      category: "Home Appliances",
      storeID: "Store10",
      price: 49,
      ownerId: "Owner10",
      quantity: 60,
      image: image1,
      warranty: "1 year manufacturer warranty",
      returnPolicy: "10 days return",
      cashOnDelivery: true,
    },
    {
      id: 8,
      name: "Mechanical Keyboard",
      description:
        "RGB mechanical keyboard with customizable keys for gaming.",
      productCode: "MK4321",
      category: "Computer Accessories",
      storeID: "Store10",
      price: 89,
      ownerId: "Owner10",
      quantity: 35,
      image: image1,
      warranty: "2 years manufacturer warranty",
      returnPolicy: "15 days return",
      cashOnDelivery: false,
    },
    {
      id: 9,
      name: "Smart Thermostat",
      description: "Energy-saving smart thermostat with app control.",
      productCode: "ST7890",
      category: "Smart Home",
      storeID: "Store10",
      price: 179,
      ownerId: "Owner10",
      quantity: 20,
      image: image1,
      warranty: "3 years manufacturer warranty",
      returnPolicy: "30 days return",
      cashOnDelivery: true,
    },
    {
      id: 10,
      name: "Portable Power Bank",
      description:
        "High-capacity portable power bank with fast charging.",
      productCode: "PB6543",
      category: "Mobile Accessories",
      storeID: "Store10",
      price: 59,
      ownerId: "Owner10",
      quantity: 80,
      image: image1,
      warranty: "6 months manufacturer warranty",
      returnPolicy: "7 days return",
      cashOnDelivery: true,
    },
  ];

  return (
    <Container>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {/* <aside className="w-1/4 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Stores</h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-gray-300">
              Store 1
            </li>
            <li className="cursor-pointer hover:text-gray-300">
              Store 2
            </li>
            <li className="cursor-pointer hover:text-gray-300">
              Store 3
            </li>
          </ul>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 py-6">
          {/* Top Bar with Store Info */}
          <div className="bg-gray-100 rounded-lg shadow-md px-2 py-6">
            <div className="flex items-center flex-wrap gap-4">
              <img
                src={imageUrl}
                alt={currentStore?.storeName}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="">
                <h1 className="text-3xl font-bold">
                  {currentStore?.storeName}
                </h1>
                <p className="text-gray-600">
                  {currentStore?.tagline}
                </p>
                <p>{currentStore?.description}</p>
              </div>
            </div>
          </div>

          {/* Add Products Button */}
          <div className="w-full h-8 flex justify-center items-center">
            <Link to={"/addproduct"} className="">
              Click here to add Product...
            </Link>
          </div>

          {/* Products Section */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 pt-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-400 rounded-lg shadow-md "
              >
                <div className="">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 rounded-t-lg object-cover"
                  />
                </div>
                <div className="p-2">
                  <h2 className="text-base font-bold">
                    {product.name}
                  </h2>
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                  <p className="text-green-600 font-bold mt-2">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Container>
  );
}

export default StorePage;
