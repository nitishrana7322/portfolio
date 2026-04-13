import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import { Portfolio } from '@/models/Portfolio';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection failed during setup:', dbError);
      throw dbError;
    }
    
    // Check if admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json({ error: 'Admin already initialized' }, { status: 400 });
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    
    await Admin.create({
      email,
      password: hashedPassword
    });

    // Create default portfolio data
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      await Portfolio.create({
        hero: {
          greeting: "Hi, I'm",
          name: "Nitesh",
          roles: ["Full Stack Developer", "UI/UX Enthusiast"],
          description: "I craft responsive, scalable, and visually stunning web applications with modern technologies.",
          profileImage: "",
          cvLink: ""
        },
        about: {
          description: [
            "Hello! I'm Nitesh, a passionate Full Stack Developer focused on creating exceptional digital experiences.",
            "I specialize in JavaScript/TypeScript ecosystems, particularly React, Next.js, and Node.js."
          ]
        },
        projects: [
          {
            title: "Modern SaaS Dashboard",
            description: "A comprehensive analytics dashboard for SaaS businesses.",
            tech: ["Next.js", "Tailwind CSS"],
            github: "#",
            live: "#",
            image: "from-primary-500/20 to-blue-500/20"
          }
        ],
        experiences: [
          {
            role: "Senior Developer",
            company: "Tech Innovators",
            date: "Jan 2023 - Present",
            description: "Leading frontend development."
          }
        ],
        skills: [
          {
            title: "Frontend",
            skills: ["React", "Next.js", "TypeScript"]
          }
        ]
      });
    }

    return NextResponse.json({ success: true, message: 'Setup complete' });
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
