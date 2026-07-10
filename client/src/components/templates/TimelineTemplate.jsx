import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const TimelineTemplate = ({ data, accentColor }) => {
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
            <header className="mb-7 pb-5 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-2xl font-bold text-gray-900">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-[12.5px] font-medium mt-0.5" style={{ color: accentColor }}>
                    {data.personal_info?.profession || "Profession"}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11.5px] text-gray-600">
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
            </header>

            {/* Summary */}
            {data.professional_summary && (
                <section className="mb-7">
                    <p className="text-gray-700 leading-6 text-[13px]">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience Timeline */}
            {data.experience?.length > 0 && (
                <section className="mb-7">
                    <h2 className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="relative pl-6">
                        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-gray-200" />

                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative">
                                    <div
                                        className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full border-2 border-white"
                                        style={{ backgroundColor: accentColor }}
                                    />
                                    <div className="flex justify-between items-baseline gap-3">
                                        <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">{exp.position}</h3>
                                        <span className="text-[11px] text-gray-500 whitespace-nowrap">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-[12.5px] font-medium" style={{ color: accentColor }}>{exp.company}</p>
                                    {exp.description && (
                                        <p className="mt-1.5 text-gray-700 leading-6 whitespace-pre-line text-[12.5px]">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project?.length > 0 && (
                <section className="mb-7">
                    <h2 className="text-[11px] font-bold uppercase tracking-widest mb-3.5" style={{ color: accentColor }}>
                        Projects
                    </h2>
                    <div className="space-y-3">
                        {data.project.map((p, index) => (
                            <div key={index}>
                                <h3 className="text-[13.5px] font-semibold text-gray-900 leading-snug">{p.name}</h3>
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
                        <h2 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                            Education
                        </h2>
                        <div className="space-y-3">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-[13px] leading-snug text-gray-900">
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
                        <h2 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2.5 py-1 text-[11px] rounded-full border"
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
    );
};

export default TimelineTemplate;