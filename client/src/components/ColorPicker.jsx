import { Check, Palette } from 'lucide-react';
import React from 'react'
import {useState} from 'react'

const ColorPicker = ({selectedColor, onChange}) => {
    const colors =[
        {name:"Blue", value:"#3B82F6"},
        {name:"Indigo", value:"#6366F1"},
        {name:"Purple", value:"#8B5CF6"},
        {name:"Green", value:"#10B981"},
        {name:"Red", value:"#EF4444"},
        {name:"Orange", value:"#F97316"},
        {name:"Teal", value:"#14B8A6"},
        {name:"Pink", value:"#EC4899"},
        {name:"Gray", value:"#6B7280"},
        {name:"Black", value:"#1F2937"},
        { name: "Royal Blue", value: "#2563EB" },
        { name: "Sky Blue", value: "#3B82F6" },
        { name: "Navy", value: "#1E3A8A" },
        { name: "Indigo", value: "#4F46E5" },
        { name: "Purple", value: "#7C3AED" },
        { name: "Violet", value: "#8B5CF6" },

        { name: "Emerald", value: "#10B981" },
        { name: "Forest Green", value: "#15803D" },
        { name: "Teal", value: "#0F766E" },
        { name: "Cyan", value: "#0891B2" },

        { name: "Crimson", value: "#DC2626" },
        { name: "Ruby", value: "#B91C1C" },
        { name: "Rose", value: "#E11D48" },
        { name: "Pink", value: "#DB2777" },

        { name: "Orange", value: "#EA580C" },
        { name: "Amber", value: "#D97706" },
        { name: "Gold", value: "#CA8A04" },

        { name: "Slate", value: "#475569" },
        { name: "Gray", value: "#6B7280" },
        { name: "Charcoal", value: "#374151" },
        { name: "Black", value: "#111827" },

        { name: "Brown", value: "#7C4A03" },
        { name: "Coffee", value: "#6F4E37" },
        { name: "Olive", value: "#556B2F" },
        { name: "Wine", value: "#7F1D1D" },
        { name: "Royal Blue", value: "#2563EB" },
    { name: "Sky Blue", value: "#3B82F6" },
    { name: "Light Blue", value: "#60A5FA" },
    { name: "Powder Blue", value: "#93C5FD" },
    { name: "Baby Blue", value: "#BFDBFE" },
    { name: "Ice Blue", value: "#DBEAFE" },

    // Indigo & Purple
    { name: "Indigo", value: "#6366F1" },
    { name: "Lavender", value: "#A78BFA" },
    { name: "Soft Purple", value: "#C4B5FD" },
    { name: "Lilac", value: "#DDD6FE" },

    // Green
    { name: "Emerald", value: "#10B981" },
    { name: "Mint", value: "#6EE7B7" },
    { name: "Soft Green", value: "#A7F3D0" },
    { name: "Sage", value: "#D1FAE5" },

    // Teal
    { name: "Teal", value: "#14B8A6" },
    { name: "Aqua", value: "#5EEAD4" },
    { name: "Seafoam", value: "#99F6E4" },

    // Orange & Yellow
    { name: "Orange", value: "#F97316" },
    { name: "Peach", value: "#FDBA74" },
    { name: "Cream", value: "#FDE68A" },
    { name: "Champagne", value: "#FEF3C7" },

    // Pink
    { name: "Pink", value: "#EC4899" },
    { name: "Blush", value: "#F9A8D4" },
    { name: "Rose", value: "#FDA4AF" },
    { name: "Light Pink", value: "#FBCFE8" },

    // Red
    { name: "Coral", value: "#FB7185" },
    { name: "Soft Red", value: "#FCA5A5" },

    // Neutral
    { name: "Slate", value: "#64748B" },
    { name: "Gray", value: "#9CA3AF" },
    { name: "Silver", value: "#D1D5DB" },
    { name: "Charcoal", value: "#374151" },
    { name: "Black", value: "#111827" },

    // Elegant Extras
    { name: "Turquoise", value: "#67E8F9" },
    { name: "Sky Mint", value: "#CCFBF1" },
    { name: "Periwinkle", value: "#C7D2FE" },
    { name: "Soft Cyan", value: "#BAE6FD" },
    { name: "Light Lavender", value: "#E9D5FF" },
    ]
    const [isOpen, setIsOpen]=useState(false);
  return (
    <div className='relative'>
        <button onClick={()=>setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette size={16}/><span className='max-sm-hidden'>Accent</span>
        </button>
        {isOpen && (
            <div className='flex flex-col gap-1 w-48 max-h-80 overflow-y-auto absolute top-full left-0 p-2 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                {colors.map((color, index)=>(
                    <div key={`${color.value}-${index}`} className='relative cursor-pointer group flex items-center gap-3 shrink-0 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors' onClick={()=>{onChange(color.value);setIsOpen(false)}}>
                        <div className="relative w-8 h-8 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors shrink-0" style={{backgroundColor:color.value}}>
                            {selectedColor===color.value && (
                                <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                                    <Check className='size-4 text-white'/>
                                </div>
                            )}
                        </div>
                        <p className='text-xs text-gray-600 truncate'>{color.name}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ColorPicker