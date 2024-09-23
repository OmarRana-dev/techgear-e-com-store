import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import appwriteService from "../appwrite/ConfigService";
import { login as authLogin, setStore } from "../features/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { checkUserSession } from "../features/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const login = useCallback((data) => {
    const doIt = async (data) => {
      setErrorMessage("");
      try {
        await authService
          .login(data)
          .then(() => {
            dispatch(checkUserSession());
          })
          .then(() => {
            navigate("/");
          });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    doIt(data);
  });

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="mx-auto w-full max-w-lg bg-green-100 rounded-xl p-10 border border-black/10">
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 text-blue-500 hover:text-blue-400 underline"
            >
              Sign Up
            </Link>
          </p>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                        value
                      ) || "Email address mush be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                  validate: {
                    matchPatern: (value) => {
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                        value
                      ) ||
                        `
                        Password must be at least 8 characters long.
                        Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.
                        Can contain special characters.
                        `;
                    },
                  },
                })}
              />
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
