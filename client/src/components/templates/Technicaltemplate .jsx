import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const TechnicalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 text-[13px] p-8">

            {/* Header */}
            <header className="flex justify-between items-end gap-4 pb-4 mb-6 border-b-2 border-gray-900">
                <div>
                    <h1 className="text-[24px] font-bold text-gray-900 leading-tight">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="font-mono text-[12px] mt-1" style={{ color: accentColor }}>
                        {"// "}{data.personal_info?.profession || "Profession"}
                    </p>
                </div>
                <div className="text-right text-[11px] font-mono text-gray-500 space-y-0.5 shrink-0">
                    {data.personal_info?.email && <div>{data.personal_info.email}</div>}
                    {data.personal_info?.phone && <div>{data.personal_info.phone}</div>}
                    {data.personal_info?.location && <div>{data.personal_info.location}</div>}
                    {data.personal_info?.linkedin && <div className="break-all">{data.personal_info.linkedin}</div>}
                    {data.personal_info?.website && <div className="break-all">{data.personal_info.website}</div>}
                </div>
            </header>

            {/* Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <p className="text-gray-700 leading-6 text-[13px]">{data.professional_summary}</p>
                </section>
            )}

            {/* Skills — up top, tech-resume style */}
            {data.skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest mb-2.5 text-gray-900">
                        <span style={{ color: accentColor }}>$</span> skills
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                        {data.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 text-[11px] font-mono rounded"
                                style={{ backgroundColor: "#111827", color: "#fff" }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest mb-3 text-gray-900">
                        <span style={{ color: accentColor }}>$</span> experience
                    </h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="pl-3 border-l-2" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-baseline gap-3">
                                    <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">
                                        {exp.position} <span className="text-gray-400 font-mono text-[12px]">@</span> {exp.company}
                                    </h3>
                                    <span className="text-[11px] font-mono text-gray-500 whitespace-nowrap">
                                        {formatDate(exp.start_date)}—{exp.is_current ? "now" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p className="mt-1.5 text-gray-700 leading-6 whitespace-pre-line text-[12.5px]">
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
                <section className="mb-6">
                    <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest mb-3 text-gray-900">
                        <span style={{ color: accentColor }}>$</span> projects
                    </h2>
                    <div className="space-y-3">
                        {data.project.map((p, index) => (
                            <div key={index} className="pl-3 border-l-2" style={{ borderColor: accentColor }}>
                                <h3 className="text-[13.5px] font-semibold text-gray-900 leading-snug">{p.name}</h3>
                                {p.description && (
                                    <p className="text-gray-700 leading-6 text-[12.5px] mt-1">{p.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section>
                    <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest mb-3 text-gray-900">
                        <span style={{ color: accentColor }}>$</span> education
                    </h2>
                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline gap-3 pl-3 border-l-2" style={{ borderColor: accentColor }}>
                                <div>
                                    <h3 className="font-semibold text-[13px] leading-snug text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-[12.5px] text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-[11px] text-gray-500 font-mono">gpa: {edu.gpa}</p>}
                                </div>
                                <span className="text-[11px] font-mono text-gray-500 whitespace-nowrap">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default TechnicalTemplate;