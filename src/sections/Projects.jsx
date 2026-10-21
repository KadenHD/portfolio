import { useI18n } from "@/i18n/useI18n";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import circuit from "../../assets/plates/ontbo-assembly-refined.png";
function ProjectLinks({ project, source }) {
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
            {label}
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
  const featured = projects.find((project) => project.id === "ontbo");
  return (
    <section
      id="projects"
      className="projects page-width"
      aria-label={t.projects.label}
    >
      <article className="featured-project" aria-labelledby="ontbo-title">
        <div className="featured-copy">
          <h2 id="ontbo-title">
            {t.projects.titleStart}
            <span className="accent">{t.projects.titleAccent}</span>
            {t.projects.titleEnd}
            <span className="accent">.</span>
          </h2>
          <p>{t.projects.intro}</p>
          <p className="contribution">
            <strong>{t.projects.contribution}</strong>{" "}
            {t.projects.contributionCopy}
          </p>
          <ul className="project-tags" aria-label={t.common.technologies}>
            {featured.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <ProjectLinks project={featured} source="ONTBO" />
          <details className="project-details">
            <summary>
              {t.common.more} <ArrowRight size={16} aria-hidden="true" />
            </summary>
            <p>{featured.description}</p>
          </details>
        </div>
        <figure className="circuit-figure">
          <div className="circuit-labels" aria-hidden="true">
            {t.projects.circuitLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <img
            src={circuit}
            width="1536"
            height="1024"
            alt={t.projects.circuitAlt}
            decoding="async"
          />
          <figcaption>{t.projects.circuitCredit}</figcaption>
        </figure>
      </article>
      <div className="section-heading projects-heading">
        <h2>
          {t.projects.title}
          <br />
          {t.projects.subtitle}
          <span className="accent">.</span>
        </h2>
        <p>{t.projects.copy}</p>
      </div>
      <div className="other-projects">
        {summaries.map((summary, index) => {
          const project = projects.find((item) => item.id === summary.id);
          return (
            <article
              className="project-row"
              key={summary.name}
              aria-labelledby={`project-${index}`}
            >
              <div className="project-image">
                <img
                  src={project.image}
                  width="800"
                  height="450"
                  alt={`${t.projects.preview} ${summary.name}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-body">
                <h3 id={`project-${index}`}>{summary.name}</h3>
                <p className="project-purpose">{summary.purpose}</p>
                <p>{summary.contribution}</p>
                <ul className="project-tags" aria-label={t.common.technologies}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <ProjectLinks project={project} source={summary.name} />
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
