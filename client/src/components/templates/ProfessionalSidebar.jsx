import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
} from "lucide-react";

const SidebarTemplate = ({ data, accentColor }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-[1123px] flex text-gray-800 text-[13px]">

      {/* LEFT SIDEBAR */}

      <div
        className="w-[32%] text-white p-6"
        style={{ backgroundColor: accentColor }}
      >
        <div className="text-center">

          {data.personal_info?.image && (
            <img
              src={data.personal_info.image}
              alt=""
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white"
            />
          )}

          <h1 className="text-xl font-bold mt-4 leading-tight">
            {data.personal_info?.full_name || "Your Name"}
          </h1>

          <p className="opacity-90 mt-1 text-[13px]">
            {data.personal_info?.headline || "Software Engineer"}
          </p>

        </div>

        {/* Contact */}

        <div className="mt-8">

          <h2 className="text-xs font-semibold tracking-wider border-b border-white/40 pb-1.5">
            CONTACT
          </h2>

          <div className="space-y-2.5 mt-3 text-xs">

            {data.personal_info?.email && (
              <div className="flex gap-2 items-start">
                <Mail size={13} className="mt-0.5 shrink-0" />
                <span className="break-all leading-snug">{data.personal_info.email}</span>
              </div>
            )}

            {data.personal_info?.phone && (
              <div className="flex gap-2 items-start">
                <Phone size={13} className="mt-0.5 shrink-0" />
                <span className="leading-snug">{data.personal_info.phone}</span>
              </div>
            )}

            {data.personal_info?.location && (
              <div className="flex gap-2 items-start">
                <MapPin size={13} className="mt-0.5 shrink-0" />
                <span className="leading-snug">{data.personal_info.location}</span>
              </div>
            )}

            {data.personal_info?.linkedin && (
              <div className="flex gap-2 items-start">
                <Linkedin size={13} className="mt-0.5 shrink-0" />
                <span className="break-all leading-snug">
                  {data.personal_info.linkedin}
                </span>
              </div>
            )}

            {data.personal_info?.website && (
              <div className="flex gap-2 items-start">
                <Globe size={13} className="mt-0.5 shrink-0" />
                <span className="break-all leading-snug">
                  {data.personal_info.website}
                </span>
              </div>
            )}

          </div>

        </div>

        {/* Skills */}

        {data.skills?.length > 0 && (
          <div className="mt-8">

            <h2 className="text-xs font-semibold tracking-wider border-b border-white/40 pb-1.5">
              SKILLS
            </h2>

            <div className="mt-3 flex flex-wrap gap-1.5">

              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-full bg-white/20 text-[11px]"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>
        )}

      </div>

      {/* RIGHT CONTENT */}

      <div className="w-[68%] p-7">

        {/* Summary */}

        {data.professional_summary && (
          <section className="mb-6">

            <h2
              className="text-sm font-bold uppercase tracking-wide border-b-2 pb-1.5"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Profile
            </h2>

            <p className="mt-3 text-gray-700 leading-6 text-[13px]">
              {data.professional_summary}
            </p>

          </section>
        )}

        {/* Experience */}

        {data.experience?.length > 0 && (
          <section className="mb-6">

            <h2
              className="text-sm font-bold uppercase tracking-wide border-b-2 pb-1.5"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Experience
            </h2>

            <div className="mt-4 space-y-5">

              {data.experience.map((exp, index) => (

                <div key={index}>

                  <div className="flex justify-between items-start gap-3">

                    <div>

                      <h3 className="font-bold text-[14px] leading-snug">
                        {exp.position}
                      </h3>

                      <p className="font-medium text-gray-600 text-[13px]">
                        {exp.company}
                      </p>

                    </div>

                    <div className="text-[11px] text-gray-500 whitespace-nowrap mt-0.5">

                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current
                        ? "Present"
                        : formatDate(exp.end_date)}

                    </div>

                  </div>

                  <p className="mt-2 whitespace-pre-line text-gray-700 leading-6 text-[13px]">
                    {exp.description}
                  </p>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* Projects */}

        {data.project?.length > 0 && (
          <section className="mb-6">

            <h2
              className="text-sm font-bold uppercase tracking-wide border-b-2 pb-1.5"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Projects
            </h2>

            <div className="mt-4 space-y-4">

              {data.project.map((project, index) => (

                <div key={index}>

                  <h3 className="font-semibold text-[14px] leading-snug">
                    {project.name}
                  </h3>

                  <p className="text-gray-700 mt-1.5 leading-6 text-[13px]">
                    {project.description}
                  </p>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* Education */}

        {data.education?.length > 0 && (
          <section>

            <h2
              className="text-sm font-bold uppercase tracking-wide border-b-2 pb-1.5"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Education
            </h2>

            <div className="mt-4 space-y-4">

              {data.education.map((edu, index) => (

                <div
                  key={index}
                  className="flex justify-between items-start gap-3"
                >

                  <div>

                    <h3 className="font-semibold text-[13.5px] leading-snug">
                      {edu.degree}
                    </h3>

                    <p className="text-[13px]">{edu.institution}</p>

                    {edu.gpa && (
                      <p className="text-gray-600 text-[12px]">
                        GPA : {edu.gpa}
                      </p>
                    )}

                  </div>

                  <div className="text-[11px] text-gray-500 whitespace-nowrap mt-0.5">
                    {formatDate(edu.graduation_date)}
                  </div>

                </div>

              ))}

            </div>

          </section>
        )}

      </div>

    </div>
  );
};

export default SidebarTemplate;
