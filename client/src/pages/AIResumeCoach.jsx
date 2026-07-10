import React, { useState } from "react";
import { UploadCloud, Briefcase, Sparkles, CheckCircle2, XCircle, TrendingUp, TrendingDown, Lightbulb,ArrowLeftIcon } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const AIResumeCoach = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeResume = async () => {
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter the Job Description.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jd", jobDescription);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  const scoreCards = result
    ? [
        { label: "Overall", value: result.overall_score },
        { label: "Keyword", value: result.keyword_score },
        { label: "ATS", value: result.ats_score },
        { label: "Experience", value: result.experience_score },
      ]
    : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        .font-serif { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="font-sans min-h-screen bg-[#0B1E3D]">
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <Link to={'/app'} className='inline-flex gap-2 items-center text-[#4988C4] hover:text-slate-700 transition-all'>
              <ArrowLeftIcon className='size-4'/>Back to Dashboard
          </Link>
        </div>
        {/* Header band */}
        <div className="bg-gradient-to-r from-[#0F2854] via-[#1C4D8D] to-[#4988C4] px-6 py-14">
          <div className="max-w-6xl mx-auto">
            <span className="font-mono text-xs tracking-widest uppercase text-[#0F2854] bg-[#BDE8F5] rounded-full px-4 py-1.5 inline-block">
              AI Resume Coach
            </span>

            <h1 className="font-serif text-3xl md:text-4xl font-medium text-white mt-4">
              See your resume the way an ATS does
            </h1>

            <p className="text-blue-100 mt-2 max-w-xl">
              Upload your resume and paste the job description below to get a full match analysis.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-8 pb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <div className="bg-[#132D57] rounded-2xl border border-white/10 p-6 shadow-xl">
              <h2 className="font-serif text-lg font-medium text-white flex items-center gap-2">
                <UploadCloud size={20} className="text-[#BDE8F5]" />
                Upload resume
              </h2>

              <label
                htmlFor="resume"
                className="mt-6 border-2 border-dashed border-white/20 rounded-xl h-56 flex flex-col items-center justify-center cursor-pointer hover:border-[#4988C4] hover:bg-white/5 transition"
              >
                {resume ? (
                  <div className="text-center px-4">
                    <CheckCircle2 className="mx-auto text-[#4ADE80]" size={40} />
                    <p className="mt-3 font-medium text-white break-all">
                      {resume.name}
                    </p>
                    <p className="text-xs text-blue-200 mt-1">Click to replace</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="text-[#4988C4]" size={40} />
                    <p className="mt-3 text-sm text-blue-100">
                      Click to upload PDF resume
                    </p>
                  </>
                )}
              </label>

              <input
                id="resume"
                hidden
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>

            {/* Job Description */}
            <div className="bg-[#132D57] rounded-2xl border border-white/10 p-6 shadow-xl">
              <h2 className="font-serif text-lg font-medium text-white flex items-center gap-2">
                <Briefcase size={20} className="text-[#BDE8F5]" />
                Job description
              </h2>

              <textarea
                rows={9}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="mt-6 w-full bg-[#0F2854] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:ring-2 focus:ring-[#4988C4] focus:border-transparent resize-none placeholder:text-blue-200/50"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={analyzeResume}
              disabled={loading}
              className="flex items-center gap-2 bg-[#BDE8F5] hover:bg-white text-[#0F2854] px-8 py-3.5 rounded-full font-semibold transition disabled:opacity-60 shadow-lg"
            >
              <Sparkles size={18} />
              {loading ? "Analyzing..." : "Analyze resume"}
            </button>
          </div>

          {/* RESULT */}
          {result && (
            <div className="mt-14 bg-[#132D57] rounded-2xl border border-white/10 p-8 shadow-xl">
              <h2 className="font-serif text-2xl font-medium text-white mb-8">
                Analysis result
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {scoreCards.map((card) => (
                  <div key={card.label} className="bg-[#0F2854] border border-white/10 rounded-xl p-5 text-center">
                    <p className="font-mono text-xs uppercase tracking-wide text-blue-200">
                      {card.label}
                    </p>
                    <p className="font-serif text-3xl font-medium text-[#BDE8F5] mt-1">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div>
                  <h3 className="font-medium text-[#4ADE80] mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Matched skills
                  </h3>
                  <ul className="space-y-2">
                    {result.matched_skills.map((skill, index) => (
                      <li key={index} className="text-sm text-white bg-[#4ADE80]/10 border border-[#4ADE80]/25 rounded-lg px-3 py-2">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-[#F87171] mb-3 flex items-center gap-2">
                    <XCircle size={18} />
                    Missing skills
                  </h3>
                  <ul className="space-y-2">
                    {result.missing_skills.map((skill, index) => (
                      <li key={index} className="text-sm text-white bg-[#F87171]/10 border border-[#F87171]/25 rounded-lg px-3 py-2">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-medium text-[#BDE8F5] mb-3 flex items-center gap-2">
                    <TrendingUp size={18} />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {result.strengths.map((item, index) => (
                      <li key={index} className="text-sm text-blue-100 pl-4 border-l-2 border-[#4988C4]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-[#BDE8F5] mb-3 flex items-center gap-2">
                    <TrendingDown size={18} />
                    Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {result.weaknesses.map((item, index) => (
                      <li key={index} className="text-sm text-blue-100 pl-4 border-l-2 border-[#4988C4]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-[#BDE8F5] mb-3 flex items-center gap-2">
                  <Lightbulb size={18} />
                  Suggestions
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.map((item, index) => (
                    <li key={index} className="text-sm text-white bg-[#0F2854] border border-white/10 rounded-lg px-4 py-2.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIResumeCoach;