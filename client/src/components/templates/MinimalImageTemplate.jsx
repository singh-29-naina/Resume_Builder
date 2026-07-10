import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 text-[13px]">

            {/* Header: image + name/profession side by side, vertically aligned */}
            <div className="flex items-center gap-6 px-8 py-8">

                {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                    <img
                        src={data.personal_info.image}
                        alt="Profile"
                        className="w-20 h-20 object-cover rounded-full shrink-0"
                        style={{ background: accentColor + '70' }}
                    />
                ) : data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                    <img
                        src={URL.createObjectURL(data.personal_info.image)}
                        alt="Profile"
                        className="w-20 h-20 object-cover rounded-full shrink-0"
                    />
                ) : null}

                <div>
                    <h1 className="text-2xl font-bold text-zinc-700 tracking-wide leading-tight">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-500 font-medium text-[11px] tracking-widest mt-1">
                        {data?.personal_info?.profession || "Profession"}
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-3 border-t border-zinc-200">

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-200 p-6">

                    {/* Contact */}
                    <section className="mb-7">
                        <h2 className="text-[11px] font-semibold tracking-widest text-zinc-500 mb-2.5">
                            CONTACT
                        </h2>
                        <div className="space-y-1.5 text-[12px]">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={12} style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={12} style={{ color: accentColor }} />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={12} style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-7">
                            <h2 className="text-[11px] font-semibold tracking-widest text-zinc-500 mb-2.5">
                                EDUCATION
                            </h2>
                            <div className="space-y-3 text-[12px]">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold uppercase text-[11.5px] leading-snug">{edu.degree}</p>
                                        <p className="text-zinc-600">{edu.institution}</p>
                                        <p className="text-[10.5px] text-zinc-500 mt-0.5">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-[11px] font-semibold tracking-widest text-zinc-500 mb-2.5">
                                SKILLS
                            </h2>
                            <ul className="space-y-1 text-[12px]">
                                {data.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 p-7">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-6">
                            <h2 className="text-[11px] font-semibold tracking-widest mb-2.5" style={{ color: accentColor }}>
                                SUMMARY
                            </h2>
                            <p className="text-zinc-700 leading-6 text-[13px]">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-[11px] font-semibold tracking-widest mb-3" style={{ color: accentColor }}>
                                EXPERIENCE
                            </h2>
                            <div className="space-y-4">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start gap-3">
                                            <h3 className="font-semibold text-zinc-900 text-[13.5px] leading-snug">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[10.5px] text-zinc-500 whitespace-nowrap mt-0.5">
                                                {formatDate(exp.start_date)} -{" "}
                                                {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-[12px] mb-1.5" style={{ color: accentColor }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul className="list-disc list-inside text-[12.5px] text-zinc-700 leading-6 space-y-0.5">
                                                {exp.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-[11px] uppercase tracking-widest font-semibold mb-3" style={{ color: accentColor }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-3.5">
                                {data.project.map((project, index) => (
                                    <div key={index}>
                                        <h3 className="text-[13.5px] font-medium text-zinc-800 leading-snug">{project.name}</h3>
                                        <p className="text-[12px] mb-1" style={{ color: accentColor }}>
                                            {project.type}
                                        </p>
                                        {project.description && (
                                            <ul className="list-disc list-inside text-[12.5px] text-zinc-700 leading-6 space-y-0.5">
                                                {project.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}


export default MinimalImageTemplate;
