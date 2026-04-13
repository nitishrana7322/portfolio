import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import dbConnect from "@/lib/mongodb";
import { Portfolio } from "@/models/Portfolio";

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function Home() {
  await dbConnect();

  const rawData = await Portfolio.findOne().lean();
  let data = rawData;

  // Fallback defaults if no data exists
  if (!data) {
    data = {
      hero: { greeting: "Hi, I'm", name: "Nitish", roles: ["Data Analyst"], description: "Welcome to my portfolio.", profileImage: "", cvLink: "" },
      about: { description: ["I am a Data Analyst."] },
      projects: [],
      experiences: [],
      skills: []
    } as any;
  }

  // Need to parse MongoDB _id objects to string for client components
  // Or just JSON clone it
  const safeData = JSON.parse(JSON.stringify(data));

  return (
    <>
      <AnimatedBackground />
      <div className="relative">
        <Hero data={safeData.hero} />
        <About data={safeData.about} />
        <Projects data={safeData.projects} />
        <Experience data={safeData.experiences} />
        <Skills data={safeData.skills} />
        <Contact />
      </div>

      <footer className="py-8 border-t border-white/10 mt-12 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center text-foreground/60">
          <p>© {new Date().getFullYear()} {safeData.hero?.name || "Nitesh"}. Designed & Built with Next.js, Tailwind CSS & Framer Motion.</p>
        </div>
      </footer>
    </>
  );
}
