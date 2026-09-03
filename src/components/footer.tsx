import { profile } from "@/data/profile";

const email = profile.socials.find((s) => s.href.startsWith("mailto:"))?.href ?? "";
const emailLabel = email.replace("mailto:", "");

export function Footer() {
  return (
    <footer className="mt-auto pt-16 pb-8">
      <div aria-hidden="true" className="h-px w-10 bg-border" />
      <div className="mt-6 flex items-end justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[15px] font-medium tracking-tight">{profile.name.split(" ")[0]}</p>
          {email && (
            <a
              href={email}
              className="mt-1 block w-fit text-[13px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {emailLabel}
            </a>
          )}
        </div>
        <p className="shrink-0 text-[13px] text-muted-foreground">{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
