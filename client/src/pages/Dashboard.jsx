
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { FilePenIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, BotIcon, FileText, Clock } from 'lucide-react'
// import React, { useState, useEffect } from 'react'
// import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import api from "../configs/api";


const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const colors = ["#4988C4", "#BDE8F5", "#1C4D8D", "#6BA3D6", "#8FC4E8"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    console.log("getAllResumes controller called")
      try {
          const { data } = await api.get(
              "/api/resumes/all",
              {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
              }
          );
          
          setAllResumes(data.resumes);

      } catch (error) {
          toast.error(error?.response?.data?.message || error.message);
      }
  };

   const createResume = async (event) => {
      event.preventDefault();

      try {
        const { data } = await api.post(
          "/api/resumes/create",
          { title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllResumes([...allResumes, data.resume]);
        setTitle("");
        setShowCreateResume(false);

        // Go to template selection page
        navigate(`/app/choose-template/${data.resume._id}`);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
  };

  const uploadResume = async (e) => {
    
    e.preventDefault();

    if (!resume) {
      return toast.error("Please select a resume");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("resume", resume);
      console.log("Redux token:", token);
      console.log("LocalStorage token:", localStorage.getItem("token"));
      const { data } = await api.post(
        "/api/ai/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Resume uploaded successfully");

      setShowUploadResume(false);
      await loadAllResumes();
      navigate(`/app/builder/${data.resumeId}`);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.put(
        "/api/resumes/update",
        {
          resumeId: editResumeId,
          resumeData: { title },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`  ,
          },
        }
      );

      setAllResumes((prev) =>
        prev.map((resume) =>
          resume._id === editResumeId
            ? { ...resume, title }
            : resume
        )
      );

      setEditResumeId("");
      setTitle("");

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this resume?"
  );

  if (!confirmDelete) return;

  try {
    const { data } = await api.delete(
      `/api/resumes/delete/${resumeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllResumes((prev) =>
      prev.filter((resume) => resume._id !== resumeId)
    );

    toast.success(data.message);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }


  
};
  useEffect(() => {
    if (token) {
      loadAllResumes();
    }
  }, [token]);
  const mostRecentUpdate = allResumes.length
    ? new Date(Math.max(...allResumes.map(r => new Date(r.updatedAt)))).toLocaleDateString()
    : '—'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        .font-serif { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="font-sans min-h-screen bg-[#0B1E3D]">
        {/* Header band */}
        <div className="bg-gradient-to-r from-[#0F2854] via-[#1C4D8D] to-[#4988C4] px-6 py-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-[#0F2854] bg-[#BDE8F5] rounded-full px-4 py-1.5 inline-block">
                Dashboard
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-white mt-4">
                Welcome back
              </h1>
              <p className="text-blue-100 mt-1">Manage your resumes and keep them tailored for every application.</p>
            </div>

            {/* Stats strip */}
            <div className="flex gap-4">
              <div className="bg-white/10 border border-white/15 rounded-xl px-5 py-3 text-center min-w-[110px]">
                <p className="font-serif text-2xl font-medium text-white">{allResumes.length}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-blue-200 mt-0.5">Resumes</p>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-xl px-5 py-3 text-center min-w-[110px]">
                <p className="font-serif text-2xl font-medium text-white">{mostRecentUpdate}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-blue-200 mt-0.5">Last updated</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-8 pb-20">
          {/* Action cards */}
          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => setShowCreateResume(true)}
              className="w-full sm:w-52 h-60 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#132D57] border border-white/10 group hover:border-[#4988C4] hover:shadow-xl hover:shadow-black/30 transition-all duration-300 cursor-pointer"
            >
              <PlusIcon className="size-14 p-3 rounded-full bg-gradient-to-br from-[#4988C4] to-[#1C4D8D] text-white transition-transform group-hover:scale-110" />
              <p className="text-base font-medium text-white group-hover:text-[#BDE8F5] transition-colors">
                Create resume
              </p>
              <p className="text-xs text-blue-200/70 px-4 text-center">Start from a blank, guided template</p>
            </button>

            <button
              onClick={() => setShowUploadResume(true)}
              className="w-full sm:w-52 h-60 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#132D57] border border-white/10 group hover:border-[#4988C4] hover:shadow-xl hover:shadow-black/30 transition-all duration-300 cursor-pointer"
            >
              <UploadCloudIcon className="size-14 p-3 rounded-full bg-gradient-to-br from-[#4988C4] to-[#1C4D8D] text-white transition-transform group-hover:scale-110" />
              <p className="text-base font-medium text-white group-hover:text-[#BDE8F5] transition-colors">
                Upload existing
              </p>
              <p className="text-xs text-blue-200/70 px-4 text-center">Import a PDF and let AI fill it in</p>
            </button>

            <button
              onClick={() => navigate("/app/ai-resume-coach")}
              className="w-full sm:w-52 h-60 flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-[#1C4D8D] to-[#0F2854] border border-[#4988C4]/40 group hover:shadow-xl hover:shadow-black/30 transition-all duration-300 cursor-pointer"
            >
              <BotIcon className="size-14 p-3 rounded-full bg-[#BDE8F5] text-[#0F2854] transition-transform group-hover:scale-110" />
              <p className="text-base font-medium text-[#BDE8F5]">
                AI resume coach
              </p>
              <p className="text-xs text-blue-100/80 px-4 text-center">Score your resume against a job posting</p>
            </button>
          </div>

          <div className="flex items-center gap-3 my-10">
            <p className="font-mono text-xs uppercase tracking-widest text-blue-200 whitespace-nowrap">
              Your resumes
            </p>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Resume grid or empty state */}
          {allResumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-[#132D57] border border-white/10 rounded-2xl">
              <FileText className="text-[#4988C4]" size={40} />
              <p className="font-serif text-lg text-white mt-4">No resumes yet</p>
              <p className="text-sm text-blue-200/70 mt-1 max-w-xs">
                Create a new resume or upload an existing one to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-5">
              {allResumes.map((resume, index) => {
                const baseColor = colors[index % colors.length]
                return (
                  <button
                    key={index}
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className="relative w-full sm:w-52 h-60 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#132D57] group hover:border-[#4988C4] hover:shadow-xl hover:shadow-black/30 transition-all duration-300 cursor-pointer"
                  >
                    <FilePenIcon className="size-9 transition-transform group-hover:scale-110" style={{ color: baseColor }} />
                    <p className="text-base font-medium px-3 text-center text-white">
                      {resume.title}
                    </p>
                    <p className="absolute bottom-3 flex items-center gap-1 font-mono text-[10px] text-blue-200/60">
                      <Clock size={11} />
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                    <div onClick={(e) => e.stopPropagation()} className="absolute top-2 right-2 flex items-center gap-x-2 gap-y-1">
                      <TrashIcon
                        onClick={() => deleteResume(resume._id)}
                        className="size-8 p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-blue-100 transition-colors"
                      />
                      <PencilIcon
                        onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                        className="size-8 p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-blue-100 transition-colors"
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Create Resume Modal */}
          {showCreateResume && (
            <form
              onSubmit={createResume}
              onClick={() => setShowCreateResume(false)}
              className="fixed inset-0 bg-[#0B1E3D]/80 backdrop-blur z-10 flex items-center justify-center px-4"
            >
              <div onClick={(e) => e.stopPropagation()} className="relative bg-[#132D57] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-7">
                <h2 className="font-serif text-xl font-medium text-white mb-5">Create a resume</h2>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Enter resume title"
                  className="w-full px-4 py-2.5 mb-4 bg-[#0F2854] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#4988C4] focus:border-transparent placeholder:text-blue-200/40"
                  required
                />
                <button className="w-full py-2.5 bg-[#BDE8F5] text-[#0F2854] rounded-full font-semibold hover:bg-white transition-colors">
                  Create resume
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-blue-200/60 hover:text-white cursor-pointer transition-colors"
                  onClick={() => { setShowCreateResume(false); setTitle('') }}
                />
              </div>
            </form>
          )}

          {/* Upload Resume Modal */}
          {showUploadResume && (
            <div
              className="fixed inset-0 bg-[#0B1E3D]/80 backdrop-blur z-50 flex items-center justify-center px-4"
              onClick={() => {
                setShowUploadResume(false);
                setTitle("");
                setResume(null);
              }}
            >
              <form
                onSubmit={uploadResume}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#132D57] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-7"
              >
                <h2 className="font-serif text-xl font-medium text-white mb-5">
                  Upload Resume
                </h2>

                <input
                  type="text"
                  placeholder="Enter resume title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 mb-4 bg-[#0F2854] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#4988C4] placeholder:text-blue-200/40"
                  required
                />

                <div>
                  <label
                    htmlFor="resume-input"
                    className="block text-sm text-blue-100 font-medium"
                  >
                    Select Resume

                    <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-xl p-4 py-10 my-4 text-blue-200/60 hover:border-[#4988C4] hover:text-[#BDE8F5] hover:bg-white/5 cursor-pointer transition-all">
                      {resume ? (
                        <>
                          <UploadCloud className="size-10 text-[#BDE8F5]" />
                          <p className="text-[#BDE8F5] font-medium">
                            {resume.name}
                          </p>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="size-12 stroke-1" />
                          <p className="text-sm">
                            Click here to upload PDF
                          </p>
                        </>
                      )}
                    </div>
                  </label>

                  <input
                    id="resume-input"
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-[#BDE8F5] text-[#0F2854] rounded-full font-semibold hover:bg-white transition-all"
                >
                  Upload Resume
                </button>

                <XIcon
                  className="absolute top-4 right-4 text-blue-200/60 hover:text-white cursor-pointer transition-colors"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle("");
                    setResume(null);
                  }}
                />
              </form>
            </div>
          )}

          {/* Edit Title Modal */}
          {editResumeId && (
            <form
              onSubmit={editTitle}
              onClick={() => setEditResumeId('')}
              className="fixed inset-0 bg-[#0B1E3D]/80 backdrop-blur z-10 flex items-center justify-center px-4"
            >
              <div onClick={(e) => e.stopPropagation()} className="relative bg-[#132D57] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-7">
                <h2 className="font-serif text-xl font-medium text-white mb-5">Edit resume title</h2>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Enter resume title"
                  className="w-full px-4 py-2.5 mb-4 bg-[#0F2854] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#4988C4] focus:border-transparent placeholder:text-blue-200/40"
                  required
                />
                <button className="w-full py-2.5 bg-[#BDE8F5] text-[#0F2854] rounded-full font-semibold hover:bg-white transition-colors">
                  Update
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-blue-200/60 hover:text-white cursor-pointer transition-colors"
                  onClick={() => { setEditResumeId(''); setTitle('') }}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard