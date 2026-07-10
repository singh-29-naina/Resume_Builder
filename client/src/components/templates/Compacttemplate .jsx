import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CompactTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 text-[12.5px] p-7">

            {/* Header */}
            <header className="flex justify-between items-start gap-4 pb-3 mb-4 border-b" style={{ borderColor: accentColor }}>
                <div>
                    <h1 className="text-[22px] font-bold text-gray-900 leading-tight">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-[12px] font-medium mt-0.5" style={{ color: accentColor }}>
                        {data.personal_info?.profession || "Profession"}
                    </p>
                </div>

                <div className="text-right text-[11px] text-gray-600 space-y-0.5 shrink-0">
                    {data.personal_info?.email && (
                        <div className="flex items-center justify-end gap-1.5"><span>{data.personal_info.email}</span><Mail size={11} /></div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center justify-end gap-1.5"><span>{data.personal_info.phone}</span><Phone size={11} /></div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center justify-end gap-1.5"><span>{data.personal_info.location}</span><MapPin size={11} /></div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center justify-end gap-1.5"><span className="break-all">{data.personal_info.linkedin}</span><Linkedin size={11} /></div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center justify-end gap-1.5"><span className="break-all">{data.personal_info.website}</span><Globe size={11} /></div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {data.professional_summary && (
                <section className="mb-4">
                    <p className="text-gray-700 leading-[1.45] text-[12.5px]">{data.professional_summary}</p>
                </section>
            )}

            <div className="grid grid-cols-3 gap-6">

                {/* Main column */}
                <div className="col-span-2 space-y-4">

                    {/* Experience */}
                    {data.experience?.length > 0 && (
                        <section>
                            <h2 className="text-[10.5px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-gray-200" style={{ color: accentColor }}>
                                Experience
                            </h2>
                            <div className="space-y-3">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline gap-2">
                                            <h3 className="text-[13px] font-semibold text-gray-900 leading-snug">{exp.position} · {exp.company}</h3>
                                            <span className="text-[10.5px] text-gray-500 whitespace-nowrap">
                                                {formatDate(exp.start_date)}–{exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p className="mt-1 text-gray-700 leading-[1.45] whitespace-pre-line text-[12px]">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project?.length > 0 && (
                        <section>
                            <h2 className="text-[10.5px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-gray-200" style={{ color: accentColor }}>
                                Projects
                            </h2>
                            <div className="space-y-2.5">
                                {data.project.map((p, index) => (
                                    <div key={index}>
                                        <h3 className="text-[12.5px] font-semibold text-gray-900 leading-snug">{p.name}</h3>
                                        {p.description && (
                                            <p className="text-gray-700 leading-[1.45] text-[12px] mt-0.5">{p.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Side column */}
                <div className="col-span-1 space-y-4">

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-[10.5px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-gray-200" style={{ color: accentColor }}>
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-1">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-0.5 text-[10.5px] rounded"
                                        style={{ backgroundColor: accentColor + "15", color: accentColor }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-[10.5px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-gray-200" style={{ color: accentColor }}>
                                Education
                            </h2>
                            <div className="space-y-2.5">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold text-[12px] leading-snug text-gray-900">
                                            {edu.degree}
                                        </h3>
                                        {edu.field && <p className="text-[11.5px] text-gray-600">{edu.field}</p>}
                                        <p className="text-[11.5px] text-gray-600">{edu.institution}</p>
                                        <p className="text-[10.5px] text-gray-500 mt-0.5">
                                            {formatDate(edu.graduation_date)}
                                            {edu.gpa && ` · GPA: ${edu.gpa}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompactTemplate;