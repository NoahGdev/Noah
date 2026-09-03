import Image from "next/image";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section aria-label="Hero" className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/noah.jpeg"
            alt="Portrait of Noah Gomes"
            width={96}
            height={96}
            priority
            className="size-12 shrink-0 rounded-full border border-border object-cover"
          />
          <div>
            <h1 className="font-medium">{profile.name}</h1>
            <p className="mt-1 text-muted-foreground">{profile.title}</p>
          </div>
        </div>
        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-px">
            {profile.socials.map(({ label, href, icon: IconComponent }) => (
              <li key={label}>
                <a
                  aria-label={label}
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                  className="squircle inline-flex size-7 cursor-pointer items-center justify-center rounded-full text-foreground transition-transform hover:bg-muted active:scale-[0.97] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <IconComponent size={16} stroke={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-6 space-y-3 text-foreground-secondary">
        <p>
          hey, I&rsquo;m {profile.name.split(" ")[0]}, an engineer based in{" "}
          <span className="text-foreground">{profile.location}</span>. Been coding pre-ai (bruh) for about 6 years now.
          Currently working on a few projects, check them out below!
        </p>
      </div>
    </section>
  );
}
