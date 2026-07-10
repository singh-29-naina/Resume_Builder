import React from "react";
import {
  UserRound,
  LayoutTemplate,
  Sparkles,
  Download,
} from "lucide-react";

const steps = [
  {
    icon: UserRound,
    title: "Add Your Details",
    desc: "Enter your education, experience, skills and projects.",
  },
  {
    icon: LayoutTemplate,
    title: "Choose Template",
    desc: "Select from professionally designed ATS-friendly templates.",
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    desc: "Our AI improves wording, grammar and formatting instantly.",
  },
  {
    icon: Download,
    title: "Download Resume",
    desc: "Export a professional PDF and start applying immediately.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-gradient-to-b from-[#071B3B] to-[#0F2854] py-28 overflow-hidden">

      {/* Background */}
      <div className="absolute left-0 top-20 w-96 h-96 rounded-full bg-[#4988C4]/20 blur-[150px]" />
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-[#BDE8F5]/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="px-5 py-2 rounded-full bg-[#BDE8F5]/10 border border-[#BDE8F5]/20 text-[#BDE8F5]">
            SIMPLE PROCESS
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Build Your Resume
            <span className="block text-[#4988C4]">
              In Just 4 Steps
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-lg">
            No complicated setup. Create a professional ATS-ready resume in just
            a few minutes.
          </p>

        </div>

        <div className="relative mt-24">

          {/* Connection Line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#4988C4] via-[#BDE8F5] to-[#4988C4]" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Number */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 h-10 w-10 rounded-full bg-[#4988C4] text-white flex items-center justify-center font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className="pt-12 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#4988C4] hover:bg-white/10 transition duration-500 hover:-translate-y-3 h-full">

                    <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0F2854] to-[#4988C4] flex items-center justify-center">

                      <Icon className="text-white" size={30} />

                    </div>

                    <h3 className="mt-8 text-2xl font-semibold text-white text-center">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-slate-300 text-center leading-7">
                      {step.desc}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}