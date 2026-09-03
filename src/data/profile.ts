import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

export const githubUsername = "NoahGdev";

export const profile = {
  name: "Noah Gomes",
  title: "Full-stack engineer",
  location: "London",
  description:
    "hey I'm Noah, an engineer that likes to build useful tools, websites and apps!",
  socials: [
    { label: "X (Twitter)", href: "https://x.com/NoxhDevs", icon: IconBrandX },
    { label: "GitHub", href: `https://github.com/${githubUsername}`, icon: IconBrandGithub },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/noah-gomes/", icon: IconBrandLinkedin },
    { label: "Email", href: "mailto:contact@inoah.dev", icon: IconMail },
  ],
};
