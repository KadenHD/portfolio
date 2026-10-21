import { useI18n } from "@/i18n/useI18n";
import { ArrowUpRight, Download } from "lucide-react";
function emphasizeSkills(description, keySkillsPattern) {
  return description
    .trim()
    .split(keySkillsPattern)
    .map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
    );
}

export function Experience() {
  const { t } = useI18n();
  const ordered = [...t.data.experiences].sort((a, b) =>
    b.started.localeCompare(a.started),
  );
  const keySkillsPattern = new RegExp(
    `(${[...t.experience.emphasis]
      .sort((a, b) => b.length - a.length)
      .map((skill) => skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "gi",
  );
  return (
    <section
      id="experience"
      className="experience-section page-width"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="experience-title">
            {t.experience.title}
            <br />
            {t.experience.subtitle}
            <span className="accent">.</span>
          </h2>
          <p>{t.experience.copy}</p>
        </div>
        <a
          className="text-link"
          href={t.experience.cvHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.experience.cv} <Download size={18} aria-hidden="true" />
        </a>
      </div>
      <ol className="experience-list">
        {ordered.map((exp) => (
          <li
            key={exp.company}
            className="experience-entry"
            id={`experience-${exp.id}`}
            data-experience-id={exp.id}
          >
            <div className="experience-date">
              {exp.period}
              {exp.current && (
                <span className="current-label">{t.experience.current}</span>
              )}
            </div>
            <div className="experience-body">
              <h3>{exp.company.split(" - ")[0]}</h3>
              <p className="experience-role">{exp.role}</p>
              <ul className="experience-description">
                {exp.description.map((line) => (
                  <li key={line}>{emphasizeSkills(line, keySkillsPattern)}</li>
                ))}
              </ul>
              {exp.technologies?.length > 0 && (
                <ul className="skill-badges" aria-label={t.experience.skills}>
                  {exp.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              )}
              {exp.links && (
                <div className="experience-links">
                  {exp.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label.split("/")[0]}
                      <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only">, {t.common.newTab}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="education">
        <strong>{t.experience.education}</strong>
        <p>{t.experience.educationCopy}</p>
      </div>
    </section>
  );
}
