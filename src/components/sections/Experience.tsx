"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export function Experience({ data }: { data: any[] }) {
  const experiences = data?.length > 0 ? data : [
    {
      _id: 1,
      role: "Sample Role",
      company: "Company Name",
      date: "2023 - Present",
      description: "No experiences added yet.",
    }
  ];

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              Work Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
        </motion.div>

        <div className="relative border-l-2 border-primary-500/20 ml-3 md:ml-6">
          {experiences.map((exp: any, index: number) => (
            <motion.div
              key={exp._id || index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-12 relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute w-8 h-8 rounded-full bg-primary-500 border-4 border-background flex items-center justify-center -left-[17px] top-0 shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                <Briefcase size={12} className="text-white" />
              </div>
              
              <div className="glass p-6 md:p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300 border border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-sm text-primary-500 font-medium px-3 py-1 rounded-full bg-primary-500/10 w-fit">
                    <Calendar size={14} />
                    <span>{exp.date}</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-medium text-secondary-500 mb-4">{exp.company}</h4>
                <p className="text-foreground/70 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
