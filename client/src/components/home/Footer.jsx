import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#071B3B] via-[#0F2854] to-[#06142B] text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#4988C4]/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#BDE8F5]/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* Top */}

        <div className="grid lg:grid-cols-4 gap-12">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3">

              <img src="/logo.svg" alt="logo" className="h-11" />

              <h2 className="text-2xl font-bold">
                ResumeAI
              </h2>

            </div>

            <p className="mt-6 text-slate-300 leading-7">

              Build professional ATS-friendly resumes with AI.
              Create, customize and download resumes within minutes.

            </p>

            <div className="flex gap-4 mt-8">

              {[
                Github,
                Linkedin,
                Twitter,
                Mail,
              ].map((Icon, index) => (

                <a
                  key={index}
                  href="/"
                  className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#4988C4] transition"
                >
                  <Icon size={20} />
                </a>

              ))}

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Product
            </h3>

            <div className="space-y-4 text-slate-300">

              <a href="/" className="block hover:text-[#BDE8F5]">
                Home
              </a>

              <a href="/" className="block hover:text-[#BDE8F5]">
                Features
              </a>

              <a href="/" className="block hover:text-[#BDE8F5]">
                Templates
              </a>

              <a href="/" className="block hover:text-[#BDE8F5]">
                Pricing
              </a>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Company
            </h3>

            <div className="space-y-4 text-slate-300">

              <a href="/" className="block hover:text-[#BDE8F5]">
                About
              </a>

              <a href="/" className="block hover:text-[#BDE8F5]">
                Careers
              </a>

              <a href="/" className="block hover:text-[#BDE8F5]">
                Contact
              </a>

              <a href="/" className="block hover:text-[#BDE8F5]">
                Privacy Policy
              </a>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-xl font-semibold">
              Stay Updated
            </h3>

            <p className="mt-4 text-slate-300 leading-7">

              Subscribe to receive resume tips,
              AI updates and new templates.

            </p>

            <div className="mt-8 flex">

              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-xl bg-white/5 border border-white/10 px-4 py-3 outline-none placeholder:text-slate-400"
              />

              <button className="rounded-r-xl bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] px-5 hover:opacity-90 transition">

                <ArrowRight />

              </button>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-12 h-px bg-white/10"></div>

        {/* Bottom */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-slate-400 text-center">

            © 2026 ResumeAI. All rights reserved.

          </p>

          <div className="flex gap-8 text-slate-400">

            <a href="/" className="hover:text-white">
              Terms
            </a>

            <a href="/" className="hover:text-white">
              Privacy
            </a>

            <a href="/" className="hover:text-white">
              Cookies
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;