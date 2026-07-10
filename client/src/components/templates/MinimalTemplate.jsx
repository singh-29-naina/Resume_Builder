const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light text-[13px]">
            {/* Header */}
            <header className="mb-7">
                <h1 className="text-2xl font-thin mb-2 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-7">
                    <p className="text-gray-700 leading-6 text-[13px]">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-7">
                    <h2 className="text-[11px] uppercase tracking-widest mb-3.5 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline gap-3 mb-0.5">
                                    <h3 className="text-[14px] font-medium leading-snug">{exp.position}</h3>
                                    <span className="text-[11px] text-gray-500 whitespace-nowrap">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-1.5 text-[12.5px]">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-6 whitespace-pre-line text-[12.5px]">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-7">
                    <h2 className="text-[11px] uppercase tracking-widest mb-3.5 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-1 justify-between items-baseline">
                                <h3 className="text-[14px] font-medium leading-snug">{proj.name}</h3>
                                <p className="text-gray-600 text-[12.5px] leading-6">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-7">
                    <h2 className="text-[11px] uppercase tracking-widest mb-3.5 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline gap-3">
                                <div>
                                    <h3 className="font-medium text-[13px] leading-snug">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600 text-[12.5px]">{edu.institution}</p>
                                    {edu.gpa && <p className="text-[11.5px] text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-[11px] text-gray-500 whitespace-nowrap">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-[11px] uppercase tracking-widest mb-3.5 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-gray-700 text-[12.5px] leading-6">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;
