import type { MarkProps } from "@/components/mark";

export type Project = Pick<MarkProps, "icon" | "logo" | "logoStyle" | "shape"> & {
  name: string;
  description: string;
  href: string;
  stars?: number;
  note?: string;
};

export const projects: Project[] = [
  {
    name: "dashboardcn",
    description: "Dashboard and analytics components for shadcn/ui",
    href: "https://dashboardcn.com",
    logo: "/logos/dashboardcn.png",
  },
];
