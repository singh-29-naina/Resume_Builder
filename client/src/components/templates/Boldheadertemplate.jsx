import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const BoldHeaderTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 text-[13px]">

            {/* Bold Banner Header */}
            <header className="px-8 py-8 text-white relative overflow-hidden" style={{ backgroundColor: accentColor }}>
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-white/10" />

                <div className="relative">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-[13px] font-medium mt-1 text-white/85 uppercase tracking-widest">
                        {data.personal_info?.profession || "Profession"}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-[11.5px] text-white/90">
                        {data.personal_info?.email && (
                            <span className="flex items-center gap-1.5"><Mail size={12} />{data.personal_info.email}</span>
                        )}
                        {data.personal_info?.phone && (
                            <span className="flex items-center gap-1.5"><Phone size={12} />{data.personal_info.phone}</span>
                        )}
                        {data.personal_info?.location && (
                            <span className="flex items-center gap-1.5"><MapPin size={12} />{data.personal_info.location}</span>
                        )}
                        {data.personal_info?.linkedin && (
                            <span className="flex items-center gap-1.5 break-all"><Linkedin size={12} />{data.personal_info.linkedin}</span>
                        )}
                        {data.personal_info?.website && (
                            <span className="flex items-center gap-1.5 break-all"><Globe size={12} />{data.personal_info.website}</span>
                        )}
                    </div>
                </div>
            </header>

            <div className="p-7">

                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-6">
                        <p className="text-gray-700 leading-6 text-[13px] border-l-4 pl-4" style={{ borderColor: accentColor }}>
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section className="mb-6">
                        <h2 className="inline-block text-[12px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded text-white" style={{ backgroundColor: accentColor }}>
                            Experience
                        </h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline gap-3">
                                        <h3 className="text-[14.5px] font-bold text-gray-900 leading-snug">{exp.position}</h3>
                                        <span className="text-[11px] text-white px-2 py-0.5 rounded whitespace-nowrap" style={{ backgroundColor: accentColor }}>
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-[12.5px] font-semibold text-gray-600">{exp.company}</p>
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
                        <h2 className="inline-block text-[12px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded text-white" style={{ backgroundColor: accentColor }}>
                            Projects
                        </h2>
                        <div className="space-y-3">
                            {data.project.map((p, index) => (
                                <div key={index}>
                                    <h3 className="text-[13.5px] font-bold text-gray-900 leading-snug">{p.name}</h3>
                                    {p.description && (
                                        <p className="text-gray-700 leading-6 text-[12.5px] mt-1">{p.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="inline-block text-[12px] font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded text-white" style={{ backgroundColor: accentColor }}>
                                Education
                            </h2>
                            <div className="space-y-3">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-[13px] leading-snug text-gray-900">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-[12.5px] text-gray-600">{edu.institution}</p>
                                        <div className="flex justify-between text-[11px] text-gray-500 mt-0.5">
                                            <span>{formatDate(edu.graduation_date)}</span>
                                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="inline-block text-[12px] font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded text-white" style={{ backgroundColor: accentColor }}>
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2.5 py-1 text-[11.5px] font-medium rounded border-2"
                                        style={{ borderColor: accentColor, color: accentColor }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoldHeaderTemplate;