import React, { useState } from "react";
import { Check, ArrowRight,ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";
import { Link } from "react-router-dom";

const templates = [
  {
    id: "classic",
    name: "Classic",
    image: "/public/templates/classic.png",
    preview:
      "A clean, traditional resume format with clear sections and professional typography",
  },
  {
    id: "modern",
    name: "Modern",
    image: "/public/templates/modern.png",
    preview:
      "Sleek design with strategic use of color and modern font choices",
  },
  {
    id: "minimal",
    name: "Minimal",
    image: "/public/templates/minimal.png",
    preview:
      "Minimal design with a single image and clean typography",
  },
  {
    id: "minimal-image",
    name: "Minimal Image",
    image: "/public/templates/minimalimage.png",
    preview:
      "Ultra-clean design that puts your content front and center",
  },
  {
    id: "professional-sidebar",
    name: "Professional Sidebar",
    image: "/public/templates/professionalsidebar.png",
    // image: "../templates/template-preview.png",
    preview:
      "A modern two-column resume featuring a professional sidebar for contact details, skills, and education with a clean, ATS-friendly layout.",
  },
  {
    id: "timeline",
    name: "Timeline",
    image: "/public/templates/timeline.png",
    preview:
      "A career-focused layout with a connected vertical timeline highlighting your experience progression.",
  },
  {
    id: "elegant",
    name: "Elegant",
    image: "/public/templates/elegent.png",
    preview:
      "A refined serif-based design with a centered header, perfect for executive and academic resumes.",
  },
  {
    id: "compact",
    name: "Compact",
    image: "/public/templates/compact.png",
    preview:
      "A dense two-column layout that fits more content on a single page without feeling cluttered.",
  },
  {
    id: "bold-header",
    name: "Bold Header",
    image: "/public/templates/boldheader.png",
    preview:
      "A striking full-width color banner header with pill-style section labels for a confident, creative look.",
  },
  {
    id: "technical",
    name: "Technical",
    image: "/public/templates/technical.png",
    preview:
      "A developer-inspired design with monospace accents and code-style section headers, built for tech roles.",
  },
];

const ChooseTemplate = () => {
  const navigate = useNavigate();
  const { resumeId } = useParams();

  const { token } = useSelector((state) => state.auth);

  const [selecting, setSelecting] = useState(""); // id of template currently being saved

  const handleSelectTemplate = async (templateId) => {
    if (selecting) return; // prevent double clicks while saving

    try {
      setSelecting(templateId);

      const { data } = await api.put(
        "/api/resumes/update",
        {
          resumeId,
          resumeData: {
            template: templateId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message || "Template selected successfully!");

      navigate(`/app/builder/${resumeId}`);
    } catch (error) {
      console.log(error.response);

      toast.error(error?.response?.data?.message || "Something went wrong");
      setSelecting("");
    }
  };

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
        <div className="bg-gradient-to-r from-[#0F2854] via-[#1C4D8D] to-[#4988C4] px-6 py-12">
          <div className="max-w-7xl mx-auto text-center">
            <span className="font-mono text-xs tracking-widest uppercase text-[#0F2854] bg-[#BDE8F5] rounded-full px-4 py-1.5 inline-block">
              Step 2 of 3
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-white mt-4">
              Choose your resume template
            </h1>
            <p className="text-blue-100 mt-2">
              Tap a template to select it and jump straight into the builder.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => {
              const isSelecting = selecting === template.id;
              const isDisabled = selecting !== "" && !isSelecting;

              return (
                <div
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.id)}
                  className={`group relative rounded-2xl overflow-hidden bg-[#132D57] border transition-all duration-300 ${
                    isDisabled
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40"
                  } ${
                    isSelecting
                      ? "border-[#4988C4] shadow-xl shadow-black/40"
                      : "border-white/10 hover:border-[#4988C4]"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-72 object-cover"
                    />

                    {/* Overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/90 via-[#0B1E3D]/10 to-transparent transition-opacity duration-300 ${
                        isSelecting ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    {/* Select indicator */}
                    <div
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isSelecting
                          ? "bg-[#BDE8F5] scale-100"
                          : "bg-white/10 border border-white/20 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                    >
                      {isSelecting ? (
                        <Check className="text-[#0F2854]" size={18} />
                      ) : (
                        <ArrowRight className="text-white" size={16} />
                      )}
                    </div>

                    {/* Bottom label that appears on hover, sits above overlay */}
                    <div
                      className={`absolute bottom-3 left-3 right-3 flex items-center justify-between transition-opacity duration-300 ${
                        isSelecting ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#BDE8F5]">
                        {isSelecting ? "Opening…" : "Use this template"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="font-serif text-lg font-medium text-white">
                      {template.name}
                    </h2>

                    <p className="mt-1.5 text-xs text-blue-200/70 leading-5">
                      {template.preview}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseTemplate;
