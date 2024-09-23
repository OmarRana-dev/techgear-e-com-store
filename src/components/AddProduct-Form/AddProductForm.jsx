import React, { useState, useCallback } from "react";
import authService from "../../appwrite/authService";
import appwriteService from "../../appwrite/ConfigService";
import { fetchProducts } from "../../features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "..";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const { userData, stores, activeStore } = useSelector(
    (state) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const AddProduct = useCallback((data) => {
    const doIt = async (data) => {
      setErrorMessage(null);
      try {
        console.log(data);
        // Upload store logo
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;
        const productImage = file ? file.$id : null;

        // Create the store
        const productAdded = await appwriteService.addProduct({
          productName: data.productName,
          price: data.price,
          description: data.description,
          storeId: activeStore.$id,
          ownerId: userData.$id,
          category: data.category,
          quantity: data.quantity,
          productImage,
        });

        if (productAdded) {
          dispatch(fetchProducts()).then(() => {
            navigate(`/store/${activeStore.$id}`);
          });
        }

        // Update user data after promotion
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    doIt(data);
    // [user, navigate, dispatch]
  });

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto my-8 w-full max-w-lg bg-slate-300 rounded-xl p-10 border">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Add Product
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(AddProduct)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Product Name: "
              placeholder="Enter Product Name"
              type="text"
              {...register("productName", {
                required: "Product name is required",
              })}
            />
            {errors.productName && (
              <p className="text-red-500">
                {errors.productName.message}
              </p>
            )}

            <Input
              label="Featured Image: "
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", {
                required: "Store logo image is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}

            <Input
              label="Description: "
              placeholder="Enter Store Description"
              type="text"
              {...register("description", {
                validate: (value) => {
                  const wordCount = value.trim().split(/\s+/).length;
                  return (
                    wordCount <= 200 ||
                    "Description must be under 200 words"
                  );
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500">
                {errors.description.message}
              </p>
            )}

            <Input
              label="Category: "
              placeholder="Enter Product Category"
              type="text"
              {...register("category")}
            />
            {errors.category && (
              <p style={{ color: "red" }}>
                {errors.category.message}
              </p>
            )}

            <Input
              label="Quantity: "
              placeholder="Enter Product Quantity"
              type="number"
              {...register("quantity", {
                required: "Product quantity is required",
              })}
            />
            {errors.quantity && (
              <p style={{ color: "red" }}>
                {errors.quantity.message}
              </p>
            )}

            <Input
              label="Price: "
              placeholder="Enter Product Price"
              type="number"
              {...register("price", {
                required: "Product price is required",
              })}
            />
            {errors.price && (
              <p style={{ color: "red" }}>{errors.price.message}</p>
            )}

            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
