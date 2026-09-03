import { Hero } from "@/components/hero";
import { Performance } from "@/components/performance";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-page flex-col gap-section px-5 pt-8 sm:px-8 md:pt-14">
      <Hero />
      <Performance />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
}
