import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../app/features/authSlice";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // if you store token separately
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-[#0F2854] via-[#1C4D8D] to-[#4988C4] shadow-xl">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="bg-white/15 p-2 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
            <img
              src="/logo.svg"
              alt="logo"
              className="h-8 w-auto"
            />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-lg tracking-wide">
              Project Dashboard
            </h1>
            <p className="text-[#BDE8F5] text-xs">
              Smart Project Management
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* User */}
          <div className="group hidden sm:flex items-center gap-3 px-4 py-2 rounded-full
          bg-white/10 backdrop-blur-xl border border-white/20
          hover:bg-white/20 hover:border-[#BDE8F5]
          hover:shadow-lg hover:shadow-[#4988C4]/20
          transition-all duration-300 cursor-pointer">

            {/* Avatar */}
            <div className="relative">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#BDE8F5] to-[#4988C4]
              text-[#0F2854] font-bold text-lg flex items-center justify-center
              shadow-md group-hover:scale-110 transition-transform duration-300">

                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* Online Dot */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-[#0F2854]" />
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <p className="text-white font-semibold leading-none">
                {user?.name || "User"}
              </p>

              <p className="text-[#BDE8F5] text-xs mt-1">
                Welcome back 👋
              </p>
            </div>

            {/* Arrow */}
            <svg
              className="w-4 h-4 text-white/70 group-hover:translate-y-[2px] transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Logout */}
          <button
            onClick={logOutUser}
            className="bg-[#BDE8F5] text-[#0F2854] px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Logout
          </button>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;