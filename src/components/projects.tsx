import { IconStar } from "@tabler/icons-react";
import { projects } from "@/data/projects";
import { Mark } from "./mark";

export function Projects() {
  return (
    <section aria-labelledby="projects-heading" className="flex flex-col gap-5">
      <h2 id="projects-heading">Projects</h2>
      <ul className="space-y-5.5">
        {projects.map((project) => (
          <li key={project.name}>
            <a
              href={project.href}
              rel="noreferrer"
              target="_blank"
              className="row-hover grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2.5 gap-y-2 min-[360px]:grid-cols-[auto_minmax(0,1fr)_auto] focus-visible:outline-none"
            >
              <Mark icon={project.icon} logo={project.logo} logoStyle={project.logoStyle} shape={project.shape} />
              <div className="min-w-0">
                <h3 className="text-sm">{project.name}</h3>
                <p className="text-[13px] text-foreground-secondary">{project.description}</p>
              </div>
              {project.stars !== undefined ? (
                <span
                  aria-label={`${project.stars} GitHub stars`}
                  className="col-start-2 flex items-center gap-1 whitespace-nowrap text-[13px] text-muted-foreground min-[360px]:col-start-3"
                >
                  <IconStar size={12} stroke={2} aria-hidden="true" />
                  {project.stars.toLocaleString()}
                </span>
              ) : project.note ? (
                <span className="col-start-2 whitespace-nowrap text-[13px] text-muted-foreground min-[360px]:col-start-3">
                  {project.note}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
