import { Lock, Mail, User2Icon } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../configs/api";
import { login } from "../app/features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

const state =location.pathname === "/signup"? "register": "login";

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(
        `/api/users/${state}`,
        formData
      );

      // Save token
      localStorage.setItem("token", data.token);

      // Save user in Redux
      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );

      toast.success(data.message);

      navigate("/app");

    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    }
  };

  return (
  <div className="min-h-screen bg-[#F4F8FC] flex items-center justify-center px-5 py-8">

    <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

      {/* LEFT SECTION */}

      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-[#0F2854] via-[#1C4D8D] to-[#4988C4] text-white p-12">

        <h1 className="text-5xl font-bold leading-tight">
          AI Resume
          <br />
          Builder
        </h1>

        <p className="mt-6 text-blue-100 leading-8">
          Create ATS-friendly resumes, analyze them with AI,
          compare against Job Descriptions and receive
          professional improvement suggestions instantly.
        </p>

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000"
          alt="AI Resume"
          className="rounded-2xl mt-10 shadow-xl h-72 object-cover"
        />

        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur">
            <h2 className="text-3xl font-bold">AI</h2>
            <p className="text-sm mt-2">Resume Coach</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur">
            <h2 className="text-3xl font-bold">ATS</h2>
            <p className="text-sm mt-2">Score</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur">
            <h2 className="text-3xl font-bold">PDF</h2>
            <p className="text-sm mt-2">Builder</p>
          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex items-center justify-center p-10">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md"
        >

          <h1 className="text-4xl font-bold text-[#0F2854]">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-500 mt-3">
            {state === "login"
              ? "Login to continue"
              : "Create an account to continue"}
          </p>

          {state !== "login" && (
            <div className="flex items-center mt-8 border-2 border-[#BDE8F5] rounded-xl h-14 px-4">

              <User2Icon
                size={20}
                className="text-[#1C4D8D]"
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="ml-3 w-full outline-none bg-transparent"
                required
              />

            </div>
          )}

          <div className="flex items-center mt-5 border-2 border-[#BDE8F5] rounded-xl h-14 px-4">

            <Mail
              size={20}
              className="text-[#1C4D8D]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="ml-3 w-full outline-none bg-transparent"
              required
            />

          </div>

          <div className="flex items-center mt-5 border-2 border-[#BDE8F5] rounded-xl h-14 px-4">

            <Lock
              size={20}
              className="text-[#1C4D8D]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="ml-3 w-full outline-none bg-transparent"
              required
            />

          </div>

          <div className="mt-4 flex justify-end">

            <button
              type="button"
              className="text-[#4988C4] hover:text-[#0F2854] text-sm"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="mt-7 w-full h-14 rounded-xl bg-[#0F2854] hover:bg-[#1C4D8D] text-white font-semibold transition duration-300"
          >
            {state === "login"
              ? "Login"
              : "Create Account"}
          </button>

          <div className="mt-8 text-center text-gray-500">

            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <span onClick={() => navigate(state === "login" ? "/signup" : "/login")}className="ml-2 text-[#1C4D8D] font-semibold cursor-pointer hover:text-[#4988C4] transition-colors">
              {state === "login" ? "Sign Up" : "Login"}
            </span>

          </div>

        </form>

      </div>

    </div>

  </div>
);
};

export default Login;