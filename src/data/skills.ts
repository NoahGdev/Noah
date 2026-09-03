import {
  IconBrandAws,
  IconBrandCloudflare,
  IconBrandDocker,
  IconBrandFramerMotion,
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconDatabase,
  IconFlame,
  IconLambda,
  IconServerBolt,
  IconBrandPrisma,
  type Icon,
} from "@tabler/icons-react";

export type Skill = { name: string; href: string; icon?: Icon };
export type SkillGroup = { label: string; skills: Skill[] };

export const visibleGroups = 4;

export const skillGroups: SkillGroup[] = [
  {
    label: "Language",
    skills: [
      { name: "TypeScript", href: "https://www.typescriptlang.org/", icon: IconBrandTypescript },
      { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: IconBrandJavascript },
      { name: "Python", href: "https://www.python.org/", icon: IconBrandPython },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", href: "https://react.dev/", icon: IconBrandReact },
      { name: "Next.js", href: "https://nextjs.org/", icon: IconBrandNextjs },
      { name: "Tailwind CSS", href: "https://tailwindcss.com/", icon: IconBrandTailwind },
      { name: "Motion", href: "https://motion.dev/", icon: IconBrandFramerMotion },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", href: "https://nodejs.org/", icon: IconBrandNodejs },
      { name: "PostgreSQL", href: "https://www.postgresql.org/", icon: IconDatabase },
      { name: "Prisma", href: "https://www.prisma.io/", icon: IconBrandPrisma },
      { name: "AWS Lambda", href: "https://aws.amazon.com/lambda/", icon: IconLambda },
      { name: "Express", href: "https://expressjs.com/", icon: IconServerBolt },
      { name: "Hono", href: "https://hono.dev/", icon: IconFlame },
    ],
  },
  {
    label: "Infrastructure",
    skills: [
      { name: "AWS", href: "https://aws.amazon.com/", icon: IconBrandAws },
      { name: "Cloudflare", href: "https://www.cloudflare.com/", icon: IconBrandCloudflare },
      { name: "Docker", href: "https://www.docker.com/", icon: IconBrandDocker },
    ],
  },
];
