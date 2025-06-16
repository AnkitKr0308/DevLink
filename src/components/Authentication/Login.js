import React, { useState } from "react";
import authservice from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const loginuser = async (e) => {
    e.preventDefault();
    const userData = await authservice.login(email, password);
    if (userData) {
      const user = await authservice.getCurrentUser();
      if (user) {
        dispatch(login(user));
        navigate("/");
      } else {
        navigate("/signup");
      }
    }
  };

  return (
    <div>
      <form
        className="max-w-sm mx-auto my-40 border-blue-600"
        onSubmit={loginuser}
      >
        <div className="mt-2 mb-8">
          <label className="text-pretty font-bold text-blue-900 text-3xl">
            Login
          </label>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="flex mb-2 text-base font-medium text-gray-900 dark:text-black justify-left ml-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter email address here"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="flex mb-2 text-base font-medium text-gray-900 dark:text-black ml-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password here"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
