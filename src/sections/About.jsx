import {
  ChartNoAxesColumnIncreasing,
  UsersRound,
  Settings2,
} from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

export function About() {
  const { t } = useI18n();
  return (
    <section
      id="about"
      className="interventions page-width"
      aria-label={t.about.label}
    >
      <article className="intervention">
        <UsersRound aria-hidden="true" size={28} />
        <div>
          <h2>{t.about.team}</h2>
          <p className="service-purpose">{t.about.teamPurpose}</p>
          <p>{t.about.teamCopy}</p>
        </div>
      </article>
      <article className="intervention">
        <Settings2 aria-hidden="true" size={28} />
        <div>
          <h2>{t.about.project}</h2>
          <p className="service-purpose">{t.about.projectPurpose}</p>
          <p>{t.about.projectCopy}</p>
        </div>
      </article>
      <div className="recent-career">
        <ChartNoAxesColumnIncreasing aria-hidden="true" size={26} />
        <div>
          <h2>{t.about.career}</h2>
          <ol>
            {t.about.recent.map((item) => (
              <li
                key={item.name}
                className={item.current ? "is-current" : undefined}
              >
                <time>{item.date}</time>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.detail}</small>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
