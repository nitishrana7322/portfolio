"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";

function ProjectCard({ project, index }: { project: any, index: number }) {
  const isImageUrl = project.image?.startsWith("http");
  const directImageUrl = isImageUrl ? getDirectImageUrl(project.image) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl glass overflow-hidden border border-white/10 dark:border-white/5 hover:border-primary-500/30 transition-all duration-300"
    >
      <div className={`h-64 md:h-80 relative flex items-center justify-center overflow-hidden ${!isImageUrl ? `bg-gradient-to-br ${project.image || 'from-primary-500/20 to-blue-500/20'}` : ''}`}>
        {isImageUrl && (
          <img 
            src={directImageUrl} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        
        {!isImageUrl && (
          <motion.div 
            className="w-3/4 h-3/4 rounded-xl bg-background/50 backdrop-blur-sm border border-white/20 shadow-xl overflow-hidden flex flex-col"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="h-8 bg-foreground/5 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-3">
              <div className="h-4 w-1/3 rounded bg-foreground/10"></div>
              <div className="h-2 w-full rounded bg-foreground/5"></div>
              <div className="h-2 w-5/6 rounded bg-foreground/5"></div>
              <div className="h-2 w-4/6 rounded bg-foreground/5"></div>
              <div className="mt-auto h-24 rounded bg-gradient-to-r from-primary-500/20 to-secondary-500/20"></div>
            </div>
          </motion.div>
        )}
        
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
          <a href={project.github} className="p-4 rounded-full bg-foreground/10 hover:bg-primary-500 hover:text-white transition-colors" aria-label="GitHub Repository">
            <Code2 size={24} />
          </a>
          <a href={project.live} className="p-4 rounded-full bg-foreground/10 hover:bg-accent-500 hover:text-white transition-colors" aria-label="Live Demo">
            <ExternalLink size={24} />
          </a>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors">{project.title}</h3>
        <p className="text-foreground/70 mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech: string, i: number) => (
            <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects({ data }: { data: any[] }) {
  const projects = data?.length > 0 ? data : [
    {
      title: "No Projects Yet",
      description: "Projects will show up here once dynamically added.",
      tech: [],
      github: "#",
      live: "#",
      image: "from-primary-500/20 to-blue-500/20"
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-accent-500">
              Featured Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {projects.map((project: any, index: number) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
