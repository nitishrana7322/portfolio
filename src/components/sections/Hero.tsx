"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { getDirectImageUrl } from "@/lib/utils";

// Roles will be dynamically populated from props

export function Hero({ data }: { data: any }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = data?.roles?.length ? data.roles : ["Data Analyst"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          {data?.profileImage && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <img
                    src={getDirectImageUrl(data.profileImage)}
                    alt={data.name || "Profile"}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-500 text-sm font-medium tracking-wide backdrop-blur-sm"
          >
            Available for new opportunities
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            {data?.greeting || "Hi, I'm"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">{data?.name || "Nitish"}</span>
          </h1>

          <div className="min-h-[70px] md:h-[80px] mb-8 md:mb-12 flex justify-center items-center overflow-hidden">
            <motion.h2
              key={roleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="text-2xl md:text-4xl text-foreground/80 font-medium px-4"
            >
              Building digital experiences as a{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-accent-500">
                {roles[roleIndex]}
              </span>
            </motion.h2>
          </div>

          <p className="text-base md:text-xl text-foreground/60 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            {data?.description || "Skilled in data analytics, using Python and visualization tools to extract insights and support data-driven decision making"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 md:mt-0">
            <a href="#projects" className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-primary-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-primary-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
            </a>

            <a
              href={getDirectImageUrl(data?.cvLink) || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-foreground bg-transparent border border-foreground/20 rounded-full transition-all duration-300 hover:bg-foreground/5 hover:border-foreground/30"
            >
              <span className="flex items-center gap-2">
                Download CV
                <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary-500 to-transparent" />
      </motion.div>
    </section>
  );
}
