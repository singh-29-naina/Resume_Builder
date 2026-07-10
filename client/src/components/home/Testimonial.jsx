import React from "react";
import {
  CheckCircle2,
  FileText,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const ResumePreview = () => {
  return (
    <section className="relative overflow-hidden bg-[#071B3B] py-32">

      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-[#4988C4]/20 blur-[150px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#BDE8F5]/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div>

            <span className="px-5 py-2 rounded-full bg-[#4988C4]/10 border border-[#4988C4]/20 text-[#BDE8F5]">
              AI Resume Analysis
            </span>

            <h2 className="mt-8 text-5xl font-bold text-white leading-tight">

              Your Resume,
              <span className="block text-[#4988C4]">
                Optimized for Success
              </span>

            </h2>

            <p className="mt-6 text-slate-300 text-lg leading-8">

              Instantly analyze your resume with AI,
              improve ATS compatibility,
              and receive personalized suggestions
              before applying.

            </p>

            <div className="space-y-6 mt-10">

              {[
                "ATS Compatibility Score",
                "Keyword Suggestions",
                "Grammar Checking",
                "Professional Formatting",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="h-10 w-10 rounded-xl bg-[#4988C4] flex items-center justify-center">

                    <CheckCircle2 className="text-white" size={20} />

                  </div>

                  <span className="text-white text-lg">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Main Resume */}

            <div className="rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,.45)] overflow-hidden">

              {/* Header */}

              <div className="bg-gradient-to-r from-[#0F2854] to-[#4988C4] p-6 flex items-center justify-between">

                <div>

                  <h3 className="text-white font-bold text-xl">
                    Resume.pdf
                  </h3>

                  <p className="text-[#BDE8F5] text-sm">
                    Last Updated Today
                  </p>

                </div>

                <FileText className="text-white" size={34} />

              </div>

              {/* Body */}

              <div className="p-8">

                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 rounded-full bg-slate-200 mb-4 ${
                      i % 3 === 0
                        ? "w-full"
                        : i % 2 === 0
                        ? "w-4/5"
                        : "w-2/3"
                    }`}
                  />
                ))}

              </div>

            </div>

            {/* ATS Score */}

            <div className="absolute -left-10 top-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">

              <TrendingUp className="text-[#BDE8F5]" />

              <p className="text-slate-300 mt-2">

                ATS Score

              </p>

              <h2 className="text-5xl font-bold text-white mt-2">

                96%

              </h2>

            </div>

            {/* AI Suggestions */}

            <div className="absolute -right-10 bottom-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 w-56">

              <Sparkles className="text-[#BDE8F5]" />

              <h3 className="text-white mt-3 font-semibold">

                AI Suggestions

              </h3>

              <p className="text-slate-300 text-sm mt-2">

                Add more action verbs and include
                React.js keywords.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ResumePreview;