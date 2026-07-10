import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  FileText,
  BadgeCheck,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#071B3B] via-[#0F2854] to-[#1C4D8D]">

      {/* Background Blur */}
      <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[#4988C4]/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#BDE8F5]/10 blur-[140px]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2">

              <Sparkles size={18} className="text-[#BDE8F5]" />

              <span className="text-[#BDE8F5] text-sm font-semibold">
                AI Resume Builder
              </span>

            </div>

            <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-white">

              Build a Resume

              <span className="block bg-gradient-to-r from-[#BDE8F5] via-white to-[#4988C4] bg-clip-text text-transparent">

                Recruiters Notice

              </span>

            </h1>

            <p className="mt-8 text-lg text-slate-300 leading-8 max-w-xl">

              Create ATS-friendly resumes in minutes using AI.
              Choose beautiful templates, optimize your resume score,
              and download instantly.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <button className="group bg-gradient-to-r from-[#4988C4] to-[#1C4D8D] px-8 py-4 rounded-xl font-semibold text-white shadow-2xl hover:scale-105 transition">

                <span className="flex items-center gap-2">

                  Get Started

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />

                </span>

              </button>

              <button className="border border-white/20 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#0F2854] transition">

                View Templates

              </button>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-12">

              {[
                "ATS Friendly",
                "AI Suggestions",
                "PDF Export",
                "20+ Templates",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3 text-white"
                >

                  <CheckCircle
                    size={18}
                    className="text-[#BDE8F5]"
                  />

                  {item}

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">

            {/* Resume */}

            <div className="w-[380px] rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.4)] overflow-hidden">

              <div className="bg-gradient-to-r from-[#0F2854] to-[#4988C4] h-24 flex items-center px-6">

                <div className="h-14 w-14 rounded-full bg-white"></div>

                <div className="ml-4">

                  <h3 className="text-white font-bold">
                    John Doe
                  </h3>

                  <p className="text-[#BDE8F5] text-sm">
                    Software Engineer
                  </p>

                </div>

              </div>

              <div className="p-6 space-y-4">

                <div className="h-3 rounded-full bg-slate-200"></div>

                <div className="h-3 w-4/5 rounded-full bg-slate-200"></div>

                <div className="h-3 rounded-full bg-slate-200"></div>

                <div className="h-3 w-2/3 rounded-full bg-slate-200"></div>

                <div className="h-3 rounded-full bg-slate-200"></div>

                <div className="h-3 w-5/6 rounded-full bg-slate-200"></div>

                <div className="mt-8 grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-[#EEF8FF] p-4">

                    <FileText className="text-[#1C4D8D]" />

                    <p className="text-sm mt-2 text-gray-500">
                      Resume Score
                    </p>

                    <h3 className="text-2xl font-bold text-[#0F2854]">
                      96%
                    </h3>

                  </div>

                  <div className="rounded-xl bg-[#EEF8FF] p-4">

                    <BadgeCheck className="text-[#1C4D8D]" />

                    <p className="text-sm mt-2 text-gray-500">
                      ATS Passed
                    </p>

                    <h3 className="text-2xl font-bold text-[#0F2854]">
                      Yes
                    </h3>

                  </div>

                </div>

              </div>

            </div>

            {/* Floating Card */}

            <div className="absolute -left-8 top-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4">

              <h4 className="text-[#BDE8F5] text-sm">
                Resume Created
              </h4>

              <p className="text-3xl font-bold text-white">
                50K+
              </p>

            </div>

            {/* Floating Card */}

            <div className="absolute -right-10 bottom-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-5">

              <h4 className="text-[#BDE8F5] text-sm">
                Success Rate
              </h4>

              <p className="text-3xl font-bold text-white">
                98%
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Stats */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">

          {[
            ["18K+", "Users"],
            ["50K+", "Resumes"],
            ["98%", "ATS Pass"],
            ["20+", "Templates"],
          ].map(([number, text]) => (

            <div
              key={text}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:bg-white/10 transition"
            >

              <h2 className="text-4xl font-bold text-white">
                {number}
              </h2>

              <p className="text-[#BDE8F5] mt-2">
                {text}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Hero;