"use client";

import { useId, useState } from "react";
import { IconSelector } from "@tabler/icons-react";
import { experience, type ExperienceItem } from "@/data/experience";
import { Mark } from "./mark";
import { SeeMoreButton } from "./see-more-button";

function CompanyName({ item, className }: { item: ExperienceItem; className: string }) {
  if (!item.href) return <span className={className}>{item.company}</span>;
  return (
    <a href={item.href} rel="noreferrer" target="_blank" className={`${className} hover:underline underline-offset-3`}>
      {item.company}
    </a>
  );
}

function Row({ item, open, onToggle }: { item: ExperienceItem; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className="row-hover min-w-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${open ? "Collapse" : "Expand"} details for ${item.company}`}
        onClick={onToggle}
        className="squircle absolute -inset-x-3 -inset-y-2 z-10 cursor-pointer appearance-none rounded-xl border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-stretch gap-x-2.5 gap-y-2">
        <span className="block w-fit shrink-0 self-center">
          <Mark icon={item.icon} logo={item.logo} logoStyle={item.logoStyle} shape={item.shape} />
        </span>
        <div className="col-start-2 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="min-w-0 shrink-0">
            <CompanyName item={item} className="relative z-20 block w-fit text-sm text-foreground" />
            <span className="block text-[13px] text-foreground-secondary">{item.role}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[13px] text-muted-foreground">
            <span>{item.period} · {item.location}</span>
            <IconSelector size={14} stroke={2} className="-mr-1 shrink-0" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5">
        <span aria-hidden="true" className="w-8" />
        <div id={id} aria-hidden={!open} className="collapse-grid" data-open={open}>
          <div>
            <ul className="space-y-1 pt-2">
              {item.details.map((line) => (
                <li
                  key={line}
                  className="relative pl-3.5 text-[13px] leading-5 text-foreground-tertiary before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-foreground-tertiary/60"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Experience() {
  const [openRows, setOpenRows] = useState<Set<string>>(() => new Set());
  const allOpen = openRows.size === experience.length;

  const toggleRow = (company: string) =>
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(company)) next.delete(company);
      else next.add(company);
      return next;
    });

  const toggleAll = () =>
    setOpenRows(allOpen ? new Set() : new Set(experience.map((item) => item.company)));

  return (
    <section aria-labelledby="experience-heading" className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 id="experience-heading">Experience</h2>
        <SeeMoreButton open={allOpen} onToggle={toggleAll} controls="experience-content" />
      </div>
      <div id="experience-content" className="-mx-4 px-4">
        <ol className="space-y-5.5">
          {experience.map((item) => (
            <Row
              key={item.company}
              item={item}
              open={openRows.has(item.company)}
              onToggle={() => toggleRow(item.company)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
