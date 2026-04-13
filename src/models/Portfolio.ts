import mongoose from 'mongoose';

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string; // URL
}

export interface IExperience {
  _id?: string;
  role: string;
  company: string;
  date: string;
  description: string;
}

export interface ISkillCategory {
  _id?: string;
  title: string;
  skills: string[];
}

export interface IPortfolio {
  hero: {
    greeting: string;
    name: string;
    roles: string[];
    description: string;
    profileImage: string;
    cvLink: string;
  };
  about: {
    description: string[];
  };
  projects: IProject[];
  experiences: IExperience[];
  skills: ISkillCategory[];
}

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: [String],
  github: String,
  live: String,
  image: String,
});

const ExperienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  date: String,
  description: String,
});

const SkillCategorySchema = new mongoose.Schema({
  title: String,
  skills: [String],
});

const PortfolioSchema = new mongoose.Schema({
  hero: {
    greeting: { type: String, default: "Hi, I'm" },
    name: { type: String, default: "Nitish" },
    roles: [{ type: String }],
    description: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    cvLink: { type: String, default: "" },
  },
  about: {
    description: [{ type: String }],
  },
  projects: [ProjectSchema],
  experiences: [ExperienceSchema],
  skills: [SkillCategorySchema],
}, { timestamps: true });

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
