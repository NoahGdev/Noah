"use client";

import { IconSelector } from "@tabler/icons-react";

export function SeeMoreButton({
  open,
  onToggle,
  controls,
}: {
  open: boolean;
  onToggle: () => void;
  controls: string;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className="squircle -mr-2.5 inline-flex h-7 shrink-0 cursor-pointer select-none items-center gap-1 rounded-lg pl-2.5 pr-1.5 text-[0.8rem] font-medium text-foreground-secondary transition-transform hover:bg-muted hover:text-foreground active:scale-[0.97] aria-expanded:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {open ? "See less" : "See more"}
      <IconSelector size={14} stroke={2} aria-hidden="true" />
    </button>
  );
}
