import React from 'react'
import MordernTemplate from "./templates/ModernTemplate"
import ClassicTemplate from "./templates/ClassicTemplate"
import MinimalTemplate from "./templates/MinimalTemplate"
import MinimalImageTemplate from "./templates/MinimalImageTemplate"
import TechnicalTemplate from './templates/Technicaltemplate '
import SidebarTemplate from './templates/ProfessionalSidebar'
import ElegantTemplate from './templates/ElegentTemplate'
import CompactTemplate from './templates/Compacttemplate '
import TimelineTemplate from './templates/TimelineTemplate'
import BoldHeaderTemplate from './templates/Boldheadertemplate'




const ResumePreview = ({data,template,accentColor,classes = ""}) => {
    const renderTemplate = ()=>{
        switch(template){
            case "modern":
                return <MordernTemplate data={data} accentColor={accentColor}/>;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor}/>;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>;
            case "professional-sidebar":
                return <SidebarTemplate data={data} accentColor={accentColor}/>;
            case "timeline":
                return <TimelineTemplate data={data} accentColor={accentColor}/>;
            case "elegant":
                return <ElegantTemplate data={data} accentColor={accentColor}/>;
            case "compact":
                return <CompactTemplate data={data} accentColor={accentColor}/>;
            case "bold-header":
                return <BoldHeaderTemplate data={data} accentColor={accentColor}/>;
            case "technical":
                return <TechnicalTemplate data={data} accentColor={accentColor}/>;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>;
        }
    }
  return (
    <div className='w-full bg-gray-100'>
        <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none"+ classes}>
            {renderTemplate()}
        </div>

        <style >
            {`
                @page{
                   size:letter;
                   margin:0;
                }
                @media print{
                    html,body{
                      width:8.5in;
                      height:11in;
                      overflow:hidden;
                    }
                    body * {
                      visibility:hidden;
                    }
                    #resume-preview, #resume-preview * {
                        visibility:visible;
                    }
                    #resume-preview{
                        position:absolute;
                        left:0;
                        top:0;
                        width:100%;
                        height-auto;
                        margin:0;
                        padding:0;
                        box-shadow:none !important;
                        border:none !important;
                    }
                }
            
            `}
        </style>
    </div>
  )
}

export default ResumePreview