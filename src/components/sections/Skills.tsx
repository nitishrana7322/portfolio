"use client";

import { motion } from "framer-motion";
import { Server, Monitor, Hammer } from "lucide-react";

export function Skills({ data }: { data: any[] }) {
  const categories = data?.length > 0 ? data : [
    {
      title: "Category",
      skills: ["Skill 1", "Skill 2"]
    }
  ];

  // Helper function to pick icon based on index
  const getIcon = (idx: number) => {
    switch(idx % 3) {
      case 0: return <Monitor className="mb-4 text-primary-500" size={32} />;
      case 1: return <Server className="mb-4 text-secondary-500" size={32} />;
      default: return <Hammer className="mb-4 text-accent-500" size={32} />;
    }
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-md-left md:flex md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">
                Technical Mastery
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto md:mx-0" />
          </div>
          <p className="hidden md:block text-foreground/60 max-w-sm text-right">
            A comprehensive overview of my technical skills and toolset. Continually learning and adapting to new technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass p-8 rounded-2xl border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                {getIcon(idx)}
              </div>
              
              <div className="relative z-10">
                {getIcon(idx)}
                <h3 className="text-2xl font-bold mb-6 text-foreground">{category.title}</h3>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill: string, sIdx: number) => (
                    <motion.div
                      key={sIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.1 + sIdx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-lg bg-background/50 border border-foreground/10 text-sm font-medium text-foreground/80 hover:text-primary-500 hover:border-primary-500/30 transition-colors"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
