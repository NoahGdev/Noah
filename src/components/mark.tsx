import type { Icon } from "@tabler/icons-react";

export type MarkProps = {
  icon?: Icon;
  logo?: string;
  logoStyle?: "fill" | "inset";
  shape?: "circle" | "square";
  size?: "sm" | "md";
};

export function Mark({ icon: IconComponent, logo, logoStyle = "fill", shape = "circle", size = "md" }: MarkProps) {
  const box = size === "sm" ? "size-6" : "size-8";
  const glyph = size === "sm" ? 14 : 18;
  const radius = shape === "square" ? "rounded-[28%]" : "rounded-full";

  if (logo && logoStyle === "fill") {
    return (
      <span aria-hidden="true" className={`block shrink-0 overflow-hidden border border-border bg-accent ${box} ${radius}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" className="size-full object-cover" draggable={false} />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center border-border border text-foreground-secondary ${box} ${radius}`}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" style={{ width: glyph, height: glyph }} className="object-contain" draggable={false} />
      ) : (
        IconComponent && <IconComponent size={glyph} stroke={1.5} />
      )}
    </span>
  );
}
