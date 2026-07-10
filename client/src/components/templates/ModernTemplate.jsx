import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800 text-[13px]">
			{/* Header */}
			<header className="p-7 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-2xl font-light mb-2.5">
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[12px]">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2">
							<Mail className="size-3.5" />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<Phone className="size-3.5" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<MapPin className="size-3.5" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-2">
							<Linkedin className="size-3.5" />
							<span className="break-all text-[11px]">{data.personal_info.linkedin.split("https://www.")[1] ? data.personal_info.linkedin.split("https://www.")[1] : data.personal_info.linkedin}</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a target="_blank" href={data.personal_info?.website} className="flex items-center gap-2">
							<Globe className="size-3.5" />
							<span className="break-all text-[11px]">{data.personal_info.website.split("https://")[1] ? data.personal_info.website.split("https://")[1] : data.personal_info.website}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-7">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-6">
						<h2 className="text-base font-light mb-3 pb-1.5 border-b border-gray-200">
							Professional Summary
						</h2>
						<p className="text-gray-700 leading-6 text-[13px]">{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-6">
						<h2 className="text-base font-light mb-4 pb-1.5 border-b border-gray-200">
							Experience
						</h2>

						<div className="space-y-4">
							{data.experience.map((exp, index) => (
								<div key={index} className="relative pl-5 border-l border-gray-200">

									<div className="flex justify-between items-start gap-3 mb-1.5">
										<div>
											<h3 className="text-[14.5px] font-medium text-gray-900 leading-snug">{exp.position}</h3>
											<p className="font-medium text-[12.5px]" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded whitespace-nowrap">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className="text-gray-700 leading-6 mt-2 whitespace-pre-line text-[12.5px]">
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
					<section className="mb-6">
						<h2 className="text-base font-light mb-3 pb-1.5 border-b border-gray-200">
							Projects
						</h2>

						<div className="space-y-4">
							{data.project.map((p, index) => (
								<div key={index} className="relative pl-5 border-l border-gray-200" style={{ borderLeftColor: accentColor }}>

									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-[13.5px] font-medium text-gray-900 leading-snug">{p.name}</h3>
										</div>
									</div>
									{p.description && (
										<div className="text-gray-700 leading-6 text-[12px] mt-2">
											{p.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-6">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h2 className="text-base font-light mb-3 pb-1.5 border-b border-gray-200">
								Education
							</h2>

							<div className="space-y-3">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className="font-semibold text-gray-900 text-[13px] leading-snug">
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p className="text-[12.5px]" style={{ color: accentColor }}>{edu.institution}</p>
										<div className="flex justify-between items-center text-[11px] text-gray-600 mt-0.5">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<h2 className="text-base font-light mb-3 pb-1.5 border-b border-gray-200">
								Skills
							</h2>

							<div className="flex flex-wrap gap-1.5">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-2.5 py-1 text-[11.5px] text-white rounded-full"
										style={{ backgroundColor: accentColor }}
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
}

export default ModernTemplate;
