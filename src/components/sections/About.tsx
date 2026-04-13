"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Database } from "lucide-react";

export function About({ data }: { data: any }) {
  const cards = [
    {
      icon: <BarChart3 className="text-primary-500" size={32} />,
      title: "Data Visualization",
      description: "Transforming complex datasets into intuitive, interactive dashboards and visual stories using tools like Power BI, Tableau, and D3.js."
    },
    {
      icon: <TrendingUp className="text-secondary-500" size={32} />,
      title: "Statistical Modeling",
      description: "Applying advanced statistical techniques and machine learning models to identify patterns and predict future trends."
    },
    {
      icon: <Database className="text-accent-500" size={32} />,
      title: "Data Engineering & ETL",
      description: "Designing and implementing robust data pipelines for efficient data extraction, transformation, and storage."
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-8" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              {data?.description && data.description.length > 0 ? (
                data.description.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))
              ) : (
                <p>Hello! I'm Nitish, a passionate Data Analyst.</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-80 rounded-2xl glass p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.4)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-28 h-28 rounded-full bg-background flex items-center justify-center">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">N.</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors group"
            >
              <div className="mb-6 p-4 rounded-xl bg-background/50 inline-block group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-foreground/70">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
