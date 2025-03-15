import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Redux/features/users/authApi";
import { setToken } from "../Redux/features/users/authSlice";

const LogIn = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();
  const router = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
    const isLoggedIn = await login(formData).unwrap();
    if (isLoggedIn.status) {
      router("/");
      dispatch(setToken(isLoggedIn.token));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  //   {
  //     "status": true,
  //     "message": "User Logged In Successfully",
  //     "token": "13|vPOiqwEXiIzvJB73QulWT5j0wBSew6wltqwaqoPv6a869b94",
  //     "user": {
  //         "id": 1,
  //         "name": "Admin",
  //         "phone": "01794541541",
  //         "photo": null,
  //         "email": "admin@gmail.com",
  //         "email_verified_at": null,
  //         "created_at": "2025-01-12T16:42:16.000000Z",
  //         "updated_at": "2025-01-12T16:42:16.000000Z"
  //     },
  //     "role": {
  //         "role_id": "1",
  //         "model_type": "App\\Models\\User",
  //         "model_id": "1"
  //     }
  // }

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-gray-700"
      style={{
        backgroundImage:
          "url('https://raw.githubusercontent.com/CiurescuP/LogIn-Form/main/bg.jpg')",
      }}
    >
      <form
        className="w-[450px] p-5 bg-white/10 backdrop-blur-md rounded-lg border-2 border-white/10 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-2xl font-semibold text-white">
          Login Here
        </h3>

        <label
          htmlFor="username"
          className="block mt-8 text-lg font-bold text-white"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="Email or Phone"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full mt-2 mb-4 p-3 text-sm font-light bg-black/20 border-2 border-gray-500/50 rounded focus:outline-none focus:bg-gray-700 focus:shadow-md focus:shadow-gray-700 placeholder-gray-300"
        />

        <label
          htmlFor="password"
          className="block mt-4 text-lg font-bold text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          className="w-full mt-2 mb-4 p-3 text-sm font-light bg-black/20 border-2 border-gray-500/50 rounded focus:outline-none focus:bg-gray-700 focus:shadow-md focus:shadow-gray-700 placeholder-gray-300"
        />

        <button
          type="submit"
          className="w-full mt-6 mb-4 p-3 bg-black/20 border-2 border-gray-500/50 rounded text-white font-semibold hover:bg-green-600 transition focus:outline-none focus:shadow-md focus:shadow-green-700"
        >
          Log In
        </button>

        <p className="text-center text-lg text-white">
          Don't have an account?
          <span className="block">
            <Link to="/signUp" className="hover:underline">
              Sign Up
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
