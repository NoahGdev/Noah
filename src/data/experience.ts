import { IconShoe, IconTicket } from "@tabler/icons-react";
import type { MarkProps } from "@/components/mark";

export type ExperienceItem = Pick<MarkProps, "icon" | "logo" | "logoStyle" | "shape"> & {
  company: string;
  role: string;
  period: string;
  location: string;
  href?: string;
  current?: boolean;
  details: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Barberflow",
    href: "https://barberflow.com",
    logo: "/logos/barberflow.png",
    role: "Software engineer & co-founder",
    period: "May 25 - Now",
    location: "Remote",
    current: true,
    details: [
      "Barbershop management and booking software for shops and independent barbers.",
      "Built 90% of the product including 2 mobile apps, a POS system and app, 4 web apps and a central API.",
    ],
  },
  {
    company: "Clippie.ai",
    href: "https://clippie.ai",
    logo: "/logos/clippie.png",
    logoStyle: "inset",
    role: "Software engineer & co-founder",
    period: "Dec 23 - Now",
    location: "Remote",
    current: true,
    details: [
      "Short-form content creation tool that creates videos in viral templates.",
      "Built the product end to end, from the video pipeline to the web app.",
    ],
  },
  {
    company: "American Express",
    href: "https://americanexpress.com",
    logo: "/logos/amex.png",
    shape: "square",
    role: "Software engineer intern",
    period: "Jun 24 - Aug 24",
    location: "Remote",
    details: [
      "Summer software engineering internship on an internal engineering team.",
    ],
  },
  {
    company: "Crayo.ai",
    href: "https://crayo.ai",
    logo: "/logos/crayo.png",
    role: "Software engineer",
    period: "Feb 24 - Jun 24",
    location: "Remote",
    details: [
      "Worked on the video editor and AI generation features for short-form content.",
    ],
  },
  {
    company: "Liquid Tools",
    logo: '/logos/liquid-tools.webp',
    role: "Founder & engineer",
    period: "Feb 22 - Jan 24",
    location: "Remote",
    details: [
      "At 18, built and ran a sneaker botting tool used by about 2 thousand users.",
      "Handled everything from the product and infrastructure to support and sales.",
    ],
  },
  {
    company: "Ambush.io",
    logo: '/logos/ambush.jpeg',
    role: "Software engineer",
    period: "Oct 21 - Oct 22",
    location: "Remote",
    details: [
      "Worked on a raffle bot that automated entries for limited sneaker releases across retailers at mass scale. Used by over 10 thousand users.",
    ],
  },
];
