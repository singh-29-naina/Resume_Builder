import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


// import { login } from "../../app/features/authSlice";



const AnnouncementBar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }
  const handleSignup = () => {
    navigate("/signup");
  }
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0F2854] via-[#1C4D8D] to-[#4988C4]">

      {/* Background Glow */}
      <div className="absolute -top-16 -left-20 w-70 border-blue-950 h-52 bg-[#BDE8F5]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">

        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">

          <Sparkles size={16} className="text-[#BDE8F5]" />

          <span className="text-white text-sm font-semibold tracking-wide">
            AI Powered
          </span>

        </div>

        {/* Text */}
        <p className="text-[#EAF8FF] text-sm md:text-base font-medium">

          Build an ATS-Friendly Resume in{" "}
          <span className="font-bold text-white">
            under 30 seconds
          </span>{" "}
          using AI.

        </p>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="
            flex items-center gap-2
            bg-white
            text-[#0F2854]
            font-semibold
            px-5
            py-2
            rounded-full
            shadow-lg
            hover:scale-105
            hover:bg-[#BDE8F5]
            transition-all
            duration-300
          "
        >
          Login
          <ArrowRight size={16} />
        </button>
        <button
          onClick={handleSignup}
          className="
            flex items-center gap-2
            bg-white
            text-[#0F2854]
            font-semibold
            px-5
            py-2
            rounded-full
            shadow-lg
            hover:scale-105
            hover:bg-[#BDE8F5]
            transition-all
            duration-300
          "
        >
          Signup
          <ArrowRight size={16} />
        </button>

      </div>
    </div>
  );
};

export default AnnouncementBar;