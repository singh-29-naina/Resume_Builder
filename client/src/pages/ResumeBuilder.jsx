import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, Folder, FolderIcon, GraduationCap, Share, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { token } = useSelector((state) => state.auth);;
  const {resumeId} = useParams()
  const [resumeData,setResumeData]=useState({
    _id:'',
    title:'',
    personal_info:{},
    professional_summary:"",
    experience:[],
    education:[],
    project:[],
    skills:[],
    template:"classic",
    accent_color:"#3B82F6",
    public:false,
  })
  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(
        `/api/resumes/get/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeData(data.resume);
      document.title = data.resume.title;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const [activeSectionIndex,setActiveSectionIndex]=useState(0)
  const[removeBackground,setRemoveBackground]=useState(false);

  const sections = [
    {id:"personal",name:"Personal Info",icon:User},
    {id:"summary",name:"Summary",icon:FileText},
    {id:"experience",name:"Experience",icon:Briefcase},
    {id:"education",name:"Education",icon:GraduationCap},
    {id:"projects",name:"Projects",icon:FolderIcon},
    {id:"skills",name:"Skills",icon:Sparkles},
  ]
  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    if (token && resumeId) {
      loadExistingResume();
    }
  }, [token, resumeId]);

  const changeResumeVisibility = async ()=>{
    setResumeData(prev=>({
      ...resumeData, public: !resumeData.public
    }))
  }

  const handleShare = ()=>{
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/'+resumeId;

    if(navigator.share){
      navigator.share({url:resumeUrl, text: "My Resume", })
    }else{
      alert('Share not supported on this browser.')
    }
  }
  const downloadResume = ()=>{
    window.print();
  }
  const saveResume = async () => {
    try {
      await api.put(
        "/api/resumes/update",
        {
          resumeId,
          resumeData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Resume saved successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to save resume"
      );
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0F2854] via-[#4988C4] to-[#9dc7e5'>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-[#4988C4] hover:text-slate-700 transition-all'>
            <ArrowLeftIcon className='size-4'/>Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
          <div className='grid lg:grid-cols-12 gap-8'>

              {/* Left Panel Form*/ }

              <div className='relative lg:col-span-5 rounded-lg overflow-visible'>
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>

                  {/* Progress bar using activeSectionIndex */}

                  <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>
                  <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] border-none transition-all duration-2000' style={{width:`${activeSectionIndex * 100 / (sections.length-1)}%`}}/>

                  {/* Section Navigation */}

                  <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>

                  <div className='flex  items-center gap-2'>
                    <TemplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={async (template) => {
                          setResumeData(prev => ({
                              ...prev,
                              template,
                          }));

                          try {
                              await api.put(
                                  "/api/resumes/update",
                                  {
                                      resumeId,
                                      resumeData: {
                                          template,
                                      },
                                  },
                                  {
                                      headers: {
                                          Authorization: `Bearer ${token}`,
                                      },
                                  }
                              );
                          } catch (error) {
                              toast.error("Couldn't save template");
                          }
                      }}
                  />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev => ({...prev,accent_color:color}))}/>
                  </div>

                  <div className='flex items-center'>
                    {activeSectionIndex !==0 && (
                      <button onClick={()=>setActiveSectionIndex((prevIndex)=>Math.max(prevIndex-1,0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-[#3696ef] hover:bg-gray-50 transition-all' disabled={activeSectionIndex===0}>
                        <ChevronLeft className='size-4'/> Previous
                      </button>
                    )}
                    <button onClick={()=>setActiveSectionIndex((prevIndex)=>Math.min(prevIndex+1,sections.length-1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-[#3696ef] hover:bg-gray-50 transition-all ${activeSectionIndex===sections.length-1 && 'opacity-50'}`}disabled={activeSectionIndex===sections.length-1}>
                        Next <ChevronRight className='size-4'/> 
                      </button>
                    </div>
                  </div>

                  {/* Form Content */}

                    <div className='space-y-6'>
                          {activeSection.id === 'personal' && (
                            <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev=>({...prev,personal_info:data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                          )}
                          {activeSection.id === 'summary' && (
                            <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data)=>setResumeData(prev=>({...prev, professional_summary:data}))} setResumeData={setResumeData}/>
                          )}
                          
                          {activeSection.id === 'experience' && (
                            <ExperienceForm data={resumeData.experience} onChange={(data)=>setResumeData(prev=>({...prev, experience:data}))} setResumeData={setResumeData}/>
                          )}

                          {activeSection.id === 'education' && (
                            <EducationForm data={resumeData.education} onChange={(data)=>setResumeData(prev=>({...prev, education:data}))} setResumeData={setResumeData}/>
                          )}

                          {activeSection.id === 'projects' && (
                            <ProjectForm data={resumeData.project} onChange={(data)=>setResumeData(prev=>({...prev, project:data}))} setResumeData={setResumeData}/>
                          )}

                          {activeSection.id === 'skills' && (
                            <SkillsForm data={resumeData.skills} onChange={(data)=>setResumeData(prev=>({...prev, skills:data}))} setResumeData={setResumeData}/>
                          )}

                    </div>
                    <button onClick={saveResume} className='bg-[#0F2854] text-white hover:bg-[#1C4D8D] transition-all rounded-full px-6 py-2 mt-6 text-sm font-medium'>
                      Save Changes
                    </button>
                </div>
              </div>
              {/* Right Panel - Preview*/ }
              <div className='lg:col-span-7 max-lg:mt-6'>
                    <div className='relative w-full'>
                      {/* ---buttons--- */}

                      <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                          {resumeData.public && (
                            <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-[#BDE8F5] text-[#0F2854] rounded-lg hover:bg-white ring-1 ring-[#4988C4]/40 transition-colors'>
                              <Share2Icon className='size-4'/>Share
                            </button>
                          )}
                          <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-[#1C4D8D]/10 text-[#1C4D8D] ring-1 ring-[#1C4D8D]/30 rounded-lg hover:bg-[#1C4D8D]/20 transition-colors'>
                            {resumeData.public ? <EyeIcon className='size-4'/>: <EyeOffIcon className='size-4'/>}
                            {resumeData.public ? 'public':'private'}
                          </button>
                          <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-[#0F2854] text-white rounded-lg hover:bg-[#1C4D8D] transition-colors'>
                            <DownloadIcon className='size-4'/>Download

                          </button>
                      </div>
                    </div>
                    <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ResumeBuilder