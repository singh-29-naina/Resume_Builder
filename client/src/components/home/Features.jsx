import React from "react";
import {
  Sparkles,
  ShieldCheck,
  FileCheck,
  Palette,
  Download,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Resume Builder",
    desc: "Generate professional resumes with AI in seconds.",
  },
  {
    icon: FileCheck,
    title: "ATS Optimization",
    desc: "Increase your ATS score before applying.",
  },
  {
    icon: Palette,
    title: "Premium Templates",
    desc: "Beautiful templates designed for recruiters.",
  },
  {
    icon: BarChart3,
    title: "Resume Analytics",
    desc: "See your strengths and improvement areas.",
  },
  {
    icon: Download,
    title: "Export PDF",
    desc: "Download high-quality PDF resumes instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Cloud",
    desc: "Access your resumes from anywhere safely.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F2854] via-[#16396E] to-[#1C4D8D] py-28">

      {/* Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#4988C4]/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#BDE8F5]/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="px-5 py-2 rounded-full bg-[#BDE8F5]/10 border border-[#BDE8F5]/20 text-[#BDE8F5] font-medium">
            WHY CHOOSE US
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">
            Everything You Need
          </h2>

          <p className="mt-5 text-slate-300 max-w-2xl mx-auto text-lg">
            Build an ATS-friendly resume using AI, professional templates,
            and real-time resume analysis.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-8
                transition
                duration-500
                hover:-translate-y-3
                hover:border-[#4988C4]
                hover:bg-white/10
                hover:shadow-[0_20px_60px_rgba(73,136,196,.25)]
                "
              >

                {/* Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#4988C4]/10 to-transparent"></div>

                <div className="relative">

                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#4988C4] to-[#0F2854] flex items-center justify-center shadow-lg">

                    <Icon className="text-white" size={30} />

                  </div>

                  <h3 className="mt-8 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-slate-300 leading-7">
                    {item.desc}
                  </p>

                  <button className="mt-8 text-[#BDE8F5] font-semibold group-hover:translate-x-2 transition">
                    Learn More →
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}