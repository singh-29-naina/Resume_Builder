import React from "react";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Adobe",
  "Netflix",
  "Spotify",
];

const TrustedBy = () => {
  return (
    <section className="relative bg-white py-20 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#BDE8F5]/40 blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">

          <span className="text-[#4988C4] uppercase tracking-[4px] font-semibold text-sm">
            Trusted Worldwide
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F2854]">
            Helping professionals land their dream jobs
          </h2>

          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Thousands of students and professionals build ATS-friendly resumes
            using our platform.
          </p>

        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {companies.map((company) => (
            <div
              key={company}
              className="
                bg-white
                border
                border-[#E5EEF8]
                rounded-2xl
                h-24
                flex
                items-center
                justify-center
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                hover:border-[#4988C4]
                transition-all
                duration-300
              "
            >
              <h3 className="text-lg font-bold text-[#0F2854] tracking-wide">
                {company}
              </h3>
            </div>
          ))}

        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            ["50K+", "Resumes Created"],
            ["18K+", "Happy Users"],
            ["98%", "ATS Success"],
            ["24/7", "Support"],
          ].map(([value, label]) => (

            <div
              key={label}
              className="rounded-3xl bg-gradient-to-br from-[#F8FCFF] to-[#EEF8FF] p-8 text-center border border-[#E5EEF8]"
            >
              <h2 className="text-4xl font-bold text-[#1C4D8D]">
                {value}
              </h2>

              <p className="mt-2 text-gray-600">
                {label}
              </p>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default TrustedBy;