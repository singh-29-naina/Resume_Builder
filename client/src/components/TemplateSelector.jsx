import { Check, Layout } from 'lucide-react';
import React, { useState } from 'react'

const TemplateSelector = ({selectedTemplate,onChange}) => {
    const[isOpen, setIsOpen] =useState(false);

    const templates = [
        {
            id:"classic",
            name:"Classic",
            preview:"A clean, traditional resume format with clear sections and professional typography"
        },
        {
            id:"modern",
            name:"Modern",
            preview:"Sleek design with strategic use of color and modern font choices"
        },
        {
            id:"minimal-image",
            name:"Minimal Image",
            preview:"Minimal design with a single image and clean typography"
        },
        {
            id:"minimal",
            name:"Minimal",
            preview:"Ultra-clean design that puts your content front and center"
        },
        {
            id: "professional-sidebar",
            name: "Professional Sidebar",
            preview:"A modern two-column resume featuring a professional sidebar for contact details, skills, and education with a clean, ATS-friendly layout."
        },
        {
            id: "timeline",
            name: "Timeline",
            preview: "A career-focused layout with a connected vertical timeline highlighting your experience progression."
        },
        {
            id: "elegant",
            name: "Elegant",
            preview: "A refined serif-based design with a centered header, perfect for executive and academic resumes."
        },
        {
            id: "compact",
            name: "Compact",
            preview: "A dense two-column layout that fits more content on a single page without feeling cluttered."
        },
        {
            id: "bold-header",
            name: "Bold Header",
            preview: "A striking full-width color banner header with pill-style section labels for a confident, creative look."
        },
        {
            id: "technical",
            name: "Technical",
            preview: "A developer-inspired design with monospace accents and code-style section headers, built for tech roles."
        },
    ]
  return (
    <div className='relative'>
        <button onClick={()=>setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Layout size={14}/> <span className='max-sm:hidden'>Template</span>
        </button>
        {isOpen && (
            <div className='flex flex-col gap-1 w-72 max-h-80 overflow-y-auto absolute top-full left-0 p-2 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full'>
                {templates.map((template)=>(
                    <div
                        key={template.id}
                        onClick={()=>{onChange(template.id);setIsOpen(false)}}
                        className={`relative shrink-0 p-2.5 rounded-lg cursor-pointer transition-colors ${selectedTemplate===template.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-sm font-medium text-gray-800'>{template.name}</h4>
                            {selectedTemplate===template.id && (
                                <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center shrink-0'>
                                    <Check className='w-3 h-3 text-white'/>
                                </div>
                            )}
                        </div>
                        <p className='mt-1 text-xs text-gray-500 italic leading-snug'>{template.preview}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default TemplateSelector
