import React, { useState, useCallback } from "react";
import authService from "../../appwrite/authService";
import appwriteService from "../../appwrite/ConfigService";
import { useNavigate } from "react-router-dom";
import {
  login as authLogin,
  setStore,
} from "../../features/authSlice";
import { Button, Input, Logo } from "..";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function SignUpAsSeller() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useSelector((state) => state.auth.userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerStore = useCallback(
    async (data) => {
      setErrorMessage(null);
      try {
        console.log(data);
        // Check if the user is trying to promote themselves
        if (data.email === user.email) {
          console.log(data);
          const response = await authService.promoteToSeller();
          if (response && response !== "alreadySeller") {
            const userData = await authService.getCurrentUser();
            dispatch(authLogin(userData));
          }
          // Upload store logo
          const file = data.image[0]
            ? await appwriteService.uploadFile(data.image[0])
            : null;
          const storeLogoImage = file ? file.$id : null;
          console.log(file);

          // Create the store
          const dbPost = await appwriteService.createStore({
            storeName: data.storeName,
            tagline: data.tagline,
            description: data.description,
            ownerId: user.$id,
            storeLogoImage,
          });

          console.log(dbPost);
          if (dbPost) {
            const stores = await appwriteService
              .getStores(user.$id)
              .then((data) => {
                console.log(data.documents);
                dispatch(setStore(data.documents)); // Dispatch setStore to update the state
                return data.documents;
              })
              .then((stores) => {
                stores.length >= 1
                  ? navigate(`/store/${dbPost.$id}`)
                  : navigate("/");
              })
              .catch((error) => {
                console.error("Error fetching stores:", error);
              });
          }

          // Update user data after promotion
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
    [user, navigate, dispatch]
  );

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto my-8 w-full max-w-lg bg-slate-300 rounded-xl p-10 border">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to become a Seller
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(registerStore)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Store Name: "
              placeholder="Enter Store Name"
              type="text"
              {...register("storeName", {
                required: "Store name is required",
              })}
            />
            {errors.storeName && (
              <p className="text-red-500">
                {errors.storeName.message}
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
                    wordCount <= 255 ||
                    "Tagline must be under 255 words"
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
              label="Tagline: "
              placeholder="Enter Store Tagline"
              type="text"
              {...register("tagline", {
                validate: (value) => {
                  const wordCount = value.trim().split(/\s+/).length;
                  return (
                    wordCount <= 50 ||
                    "Tagline must be under 50 words"
                  );
                },
              })}
            />
            {errors.tagline && (
              <p style={{ color: "red" }}>{errors.tagline.message}</p>
            )}

            <Input
              label="Your Email: "
              placeholder="Enter your user email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpAsSeller;
