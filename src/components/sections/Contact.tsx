"use client";

import { motion } from "framer-motion";
import { Mail, Globe, MessageCircle, Send } from "lucide-react";
import { useState, useRef, FormEvent } from "react";
import emailjs from '@emailjs/browser';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Replace these keys with actual EmailJS keys from user
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
        console.log(result.text);
        setSubmitStatus("success");
        if (formRef.current) formRef.current.reset();
      }, (error) => {
        console.log(error.text);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus("idle"), 5000);
      });
  };

  return (
    <section id="contact" className="py-24 relative z-10 w-full">
      <div className="container mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Get In Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-6" />
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-foreground/50">Email</p>
                  <a href="mailto:hello@example.com" className="font-medium hover:text-primary-500 transition-colors">nitishkupandit1122@gmail.com</a>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-foreground/50 mb-4">Follow Me</p>
                <div className="flex gap-4">
                  {[
                    { icon: <MessageCircle size={20} />, href: "https://wa.me/7322833259" },
                    { icon: <Globe size={20} />, href: "https://github.com/nitishrana7322" },
                    { icon: <Mail size={20} />, href: "https://github.com/nitishrana7322" }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 border border-white/5"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-3 glass p-8 md:p-10 rounded-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-foreground resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send size={18} />
                  </span>
                )}
              </button>

              {submitStatus === "success" && (
                <p className="text-green-500 text-sm mt-4 text-center">Message sent successfully!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 text-sm mt-4 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
