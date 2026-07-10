const ElegantTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 text-[13px] p-10 font-serif">

            {/* Centered Header */}
            <header className="text-center mb-6">
                <h1 className="text-[26px] font-bold tracking-wide text-gray-900">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="uppercase tracking-[0.2em] text-[11px] mt-1.5" style={{ color: accentColor }}>
                    {data.personal_info?.profession || "Profession"}
                </p>

                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3 text-[11.5px] text-gray-600 font-sans">
                    {[
                        data.personal_info?.email,
                        data.personal_info?.phone,
                        data.personal_info?.location,
                        data.personal_info?.linkedin,
                        data.personal_info?.website,
                    ]
                        .filter(Boolean)
                        .map((item, i, arr) => (
                            <span key={i} className="flex items-center">
                                {item}
                                {i < arr.length - 1 && <span className="ml-3 text-gray-300">|</span>}
                            </span>
                        ))}
                </div>
            </header>

            <div className="w-16 h-px mx-auto mb-6" style={{ backgroundColor: accentColor }} />

            {/* Summary */}
            {data.professional_summary && (
                <section className="mb-6 font-sans">
                    <p className="text-gray-700 leading-6 text-[13px] text-center italic">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-center mb-4 text-gray-900">
                        Experience
                    </h2>

                    <div className="space-y-5 font-sans">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline gap-3">
                                    <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">
                                        {exp.position}, <span className="font-normal italic" style={{ color: accentColor }}>{exp.company}</span>
                                    </h3>
                                    <span className="text-[11px] text-gray-500 whitespace-nowrap font-serif">
                                        {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
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
                <section className="mb-6 font-sans">
                    <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-center mb-4 text-gray-900 font-serif">
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

            {/* Education */}
            {data.education?.length > 0 && (
                <section className="mb-6 font-sans">
                    <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-center mb-4 text-gray-900 font-serif">
                        Education
                    </h2>
                    <div className="space-y-3 text-center">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-[13px] text-gray-900">
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                </h3>
                                <p className="text-[12.5px] italic" style={{ color: accentColor }}>{edu.institution}</p>
                                <div className="flex justify-center gap-3 text-[11px] text-gray-500 mt-0.5">
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
                <section className="font-sans">
                    <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-center mb-3 text-gray-900 font-serif">
                        Skills
                    </h2>
                    <p className="text-center text-[12.5px] text-gray-700">
                        {data.skills.join("  •  ")}
                    </p>
                </section>
            )}
        </div>
    );
};

export default ElegantTemplate;