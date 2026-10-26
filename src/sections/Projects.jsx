import { useI18n } from "@/i18n/useI18n";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import circuit from "../../assets/plates/ontbo-assembly-refined.png";
function ProjectLinks({ project, source, labels }) {
  const { t } = useI18n();
  const links = Object.entries(t.projects.links);
  return (
    <div className="project-links">
      {links
        .filter(([key]) => project[key])
        .map(([key, label]) => (
          <a
            href={project[key]}
            key={key}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels?.[key] ?? label}
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">
              {" "}
              - {source}, {t.common.newTab}
            </span>
          </a>
        ))}
    </div>
  );
}
export function Projects() {
  const { t } = useI18n();
  const { projects } = t.data;
  const summaries = t.projects.summaries;
  return (
    <section
      id="projects"
      className="projects page-width"
      aria-labelledby="projects-title"
    >
      <div className="section-heading projects-heading">
        <h2 id="projects-title">
          {t.projects.title}
          <br />
          {t.projects.subtitle}
          <span className="accent">.</span>
        </h2>
        <p>{t.projects.copy}</p>
      </div>
      <div className="project-list">
        {summaries.map((summary, index) => {
          const project = projects.find((item) => item.id === summary.id);
          return (
            <article
              className="project-row"
              key={summary.id}
              aria-labelledby={`project-${index}`}
            >
              <figure className="project-visual">
                <div
                  className={`project-image${summary.id === "ontbo" ? " project-image-concept" : ""}`}
                >
                  <img
                    src={summary.id === "ontbo" ? circuit : project.image}
                    width={summary.id === "ontbo" ? 1536 : 800}
                    height={summary.id === "ontbo" ? 1024 : 450}
                    alt={
                      summary.id === "ontbo"
                        ? t.projects.circuitAlt
                        : `${t.projects.preview} ${summary.name}`
                    }
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {summary.id === "ontbo" && (
                  <figcaption>{t.projects.circuitCredit}</figcaption>
                )}
              </figure>
              <div className="project-body">
                <h3 id={`project-${index}`}>{summary.name}</h3>
                <p className="project-purpose">{summary.purpose}</p>
                <p className="contribution">
                  <strong>{t.projects.contribution}</strong>{" "}
                  {summary.contribution}
                </p>
                <ul className="project-tags" aria-label={t.common.technologies}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <ProjectLinks
                  project={project}
                  source={summary.name}
                  labels={summary.linkLabels}
                />
                <details className="project-details">
                  <summary>
                    {t.common.more} <ArrowRight size={16} aria-hidden="true" />
                  </summary>
                  <p>{project.description}</p>
                </details>
              </div>
            </article>
          );
        })}
      </div>
      <a
        className="text-link github-link"
        href="https://github.com/KadenHD"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.projects.github} <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
