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
          name: "Nitish",
          roles: ["Data Analyst", "Business Intelligence Expert"],
          description: "I transform raw data into actionable insights through advanced statistical analysis and visualization.",
          profileImage: "",
          cvLink: ""
        },
        about: {
          description: [
            "Hello! I'm Nitish, a passionate Data Analyst focused on turning complex data into clear, actionable insights.",
            "I specialize in Python, SQL, and various visualization tools like Power BI and Tableau."
          ]
        },
        projects: [
          {
            title: "Customer Segmentation Analysis",
            description: "An in-depth analysis of customer behavior to optimize marketing strategies.",
            tech: ["Python", "K-Means Clustering", "Pandas"],
            github: "#",
            live: "#",
            image: "from-primary-500/20 to-blue-500/20"
          }
        ],
        experiences: [
          {
            role: "Senior Data Analyst",
            company: "Tech Innovators",
            date: "Jan 2023 - Present",
            description: "Leading data-driven decision making."
          }
        ],
        skills: [
          {
            title: "Data Analysis",
            skills: ["Python (Pandas, Numpy)", "SQL", "Statistical Modeling"]
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
