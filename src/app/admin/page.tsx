"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/portfolio")
      .then(async (res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const resData = await res.json();
        if (resData.success) {
          if (!resData.data) {
            setData({
              hero: { greeting: "Hi, I'm", name: "Nitesh", roles: ["Full Stack Developer"], description: "", profileImage: "", cvLink: "" },
              about: { description: [] },
              projects: [],
              experiences: [],
              skills: []
            });
            setMessage("No data found. Initializing with defaults...");
          } else {
            setData(resData.data);
          }
        } else {
          setMessage(resData.error || "Failed to load data.");
        }
        setLoading(false);
      })
      .catch(err => {
        setMessage("Error connecting to server.");
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      // Clean up the data before saving (trim strings in arrays)
      const cleanData = {
        ...data,
        hero: {
          ...data.hero,
          roles: (data.hero?.roles || []).map((r: string) => r.trim()).filter(Boolean)
        },
        projects: (data.projects || []).map((p: any) => ({
          ...p,
          tech: (p.tech || []).map((t: string) => t.trim()).filter(Boolean)
        })),
        skills: (data.skills || []).map((s: any) => ({
          ...s,
          skills: (s.skills || []).map((sk: string) => sk.trim()).filter(Boolean)
        }))
      };

      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });
      if (res.ok) {
        setMessage("Saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save.");
      }
    } catch (err) {
      setMessage("Error saving.");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
        <p className="text-foreground/60">Loading dashboard...</p>
      </div>
    </div>
  );

  if (!data && message) return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="glass p-8 rounded-2xl text-center space-y-4 max-w-md">
        <h2 className="text-2xl font-bold text-red-500">Error Loading Data</h2>
        <p className="text-foreground/60">{message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-background/50 glass p-6 rounded-2xl">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
          Admin Dashboard
        </h1>
        <div className="flex gap-4 items-center">
          {message && <span className="text-green-500 text-sm font-medium">{message}</span>}
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium outline-none"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button 
            onClick={handleLogout} 
            className="px-6 py-2 border border-white/10 hover:bg-white/5 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold border-b border-white/10 pb-2">Hero Section</h2>
          <div>
            <label className="block text-sm mb-1">Greeting</label>
            <input 
              value={data.hero?.greeting || ""} 
              onChange={e => setData({...data, hero: {...data.hero, greeting: e.target.value}})}
              className="w-full bg-background border border-white/10 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input 
              value={data.hero?.name || ""} 
              onChange={e => setData({...data, hero: {...data.hero, name: e.target.value}})}
              className="w-full bg-background border border-white/10 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea 
              value={data.hero?.description || ""} 
              onChange={e => setData({...data, hero: {...data.hero, description: e.target.value}})}
              className="w-full bg-background border border-white/10 rounded px-3 py-2 h-24"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Profile Photo URL</label>
            <input 
              value={data.hero?.profileImage || ""} 
              onChange={e => setData({...data, hero: {...data.hero, profileImage: e.target.value}})}
              className="w-full bg-background border border-white/10 rounded px-3 py-2"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">CV Download Link</label>
            <input 
              value={data.hero?.cvLink || ""} 
              onChange={e => setData({...data, hero: {...data.hero, cvLink: e.target.value}})}
              className="w-full bg-background border border-white/10 rounded px-3 py-2"
              placeholder="https://drive.google.com/your-cv-link"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-foreground/60">Roles (Comma separated)</label>
            <input 
              value={(data.hero?.roles || []).join(", ")} 
              onChange={e => setData({...data, hero: {...data.hero, roles: e.target.value.split(",")}})}
              className="w-full bg-background border border-white/10 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold border-b border-white/10 pb-2">About Section</h2>
          <div>
            <label className="block text-sm mb-1 text-foreground/60">Paragraphs (Separate by new lines)</label>
            <textarea 
              value={(data.about?.description || []).join("\n\n")} 
              onChange={e => setData({...data, about: {...data.about, description: e.target.value.split("\n\n")}})}
              className="w-full bg-background border border-white/10 rounded px-3 py-2 h-64"
            />
          </div>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h2 className="text-xl font-bold">Projects</h2>
          <button 
            onClick={() => setData({...data, projects: [...(data.projects || []), {title: "New Project", description: "", tech: [], github: "", live: "", image: ""}]})}
            className="text-primary-500 text-sm hover:underline"
          >
            + Add Project
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data.projects || []).map((project: any, i: number) => (
            <div key={i} className="border border-white/10 p-4 rounded-xl space-y-3 bg-background/30">
              <input 
                value={project.title} 
                onChange={e => {
                  const newProj = [...data.projects];
                  newProj[i].title = e.target.value;
                  setData({...data, projects: newProj});
                }}
                placeholder="Title"
                className="w-full bg-transparent border-b border-white/10 px-2 py-1 outline-none font-bold placeholder:font-normal"
              />
              <textarea 
                value={project.description} 
                onChange={e => {
                  const newProj = [...data.projects];
                  newProj[i].description = e.target.value;
                  setData({...data, projects: newProj});
                }}
                placeholder="Description"
                className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm h-20"
              />
              <input 
                value={(project.tech || []).join(", ")} 
                onChange={e => {
                  const newProj = [...data.projects];
                  newProj[i].tech = e.target.value.split(",");
                  setData({...data, projects: newProj});
                }}
                placeholder="Tech Stack (comma separated)"
                className="w-full bg-transparent text-sm border-b border-white/10 px-2 py-1 outline-none"
              />
              <div className="flex gap-2">
                <input 
                  value={project.github} 
                  onChange={e => {
                    const newProj = [...data.projects];
                    newProj[i].github = e.target.value;
                    setData({...data, projects: newProj});
                  }}
                  placeholder="Github URL"
                  className="w-1/2 bg-transparent text-sm border-b border-white/10 px-2 py-1 outline-none"
                />
                <input 
                  value={project.live} 
                  onChange={e => {
                    const newProj = [...data.projects];
                    newProj[i].live = e.target.value;
                    setData({...data, projects: newProj});
                  }}
                  placeholder="Live URL"
                  className="w-1/2 bg-transparent text-sm border-b border-white/10 px-2 py-1 outline-none"
                />
              </div>
              <input 
                value={project.image} 
                onChange={e => {
                  const newProj = [...data.projects];
                  newProj[i].image = e.target.value;
                  setData({...data, projects: newProj});
                }}
                placeholder="Image Drive URL or Gradient"
                className="w-full bg-transparent text-sm border-b border-white/10 px-2 py-1 outline-none"
              />
              <button 
                onClick={() => {
                  const newProj = data.projects.filter((_: any, idx: number) => idx !== i);
                  setData({...data, projects: newProj});
                }}
                className="text-red-500 text-xs w-full text-left hover:underline pt-2"
              >
                Remove Project
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h2 className="text-xl font-bold">Experiences</h2>
          <button 
            onClick={() => setData({...data, experiences: [...(data.experiences || []), {role: "New Role", company: "", date: "", description: ""}]})}
            className="text-primary-500 text-sm hover:underline"
          >
            + Add Experience
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {(data.experiences || []).map((exp: any, i: number) => (
            <div key={i} className="border border-white/10 p-4 rounded-xl space-y-3 bg-background/30">
              <input value={exp.role} onChange={e => { const newExp = [...data.experiences]; newExp[i].role = e.target.value; setData({...data, experiences: newExp}); }} placeholder="Role" className="w-full bg-transparent border-b border-white/10 px-2 py-1 outline-none font-bold placeholder:font-normal" />
              <input value={exp.company} onChange={e => { const newExp = [...data.experiences]; newExp[i].company = e.target.value; setData({...data, experiences: newExp}); }} placeholder="Company" className="w-full bg-transparent text-sm border-b border-white/10 px-2 py-1 outline-none" />
              <input value={exp.date} onChange={e => { const newExp = [...data.experiences]; newExp[i].date = e.target.value; setData({...data, experiences: newExp}); }} placeholder="Date (e.g. Jan 2023 - Present)" className="w-full bg-transparent text-sm border-b border-white/10 px-2 py-1 outline-none" />
              <textarea value={exp.description} onChange={e => { const newExp = [...data.experiences]; newExp[i].description = e.target.value; setData({...data, experiences: newExp}); }} placeholder="Description" className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm h-20" />
              <button 
                onClick={() => { const newExp = data.experiences.filter((_: any, idx: number) => idx !== i); setData({...data, experiences: newExp}); }}
                className="text-red-500 text-xs hover:underline block pt-2"
              >Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h2 className="text-xl font-bold">Skills Categories</h2>
          <button 
            onClick={() => setData({...data, skills: [...(data.skills || []), {title: "New Category", skills: []}]})}
            className="text-primary-500 text-sm hover:underline"
          >
            + Add Category
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {(data.skills || []).map((skillCat: any, i: number) => (
            <div key={i} className="border border-white/10 p-4 rounded-xl space-y-3 bg-background/30">
              <input value={skillCat.title} onChange={e => { const newSkill = [...data.skills]; newSkill[i].title = e.target.value; setData({...data, skills: newSkill}); }} placeholder="Category Title" className="w-full bg-transparent border-b border-white/10 px-2 py-1 outline-none font-bold" />
              <textarea value={(skillCat.skills || []).join(", ")} onChange={e => { const newSkill = [...data.skills]; newSkill[i].skills = e.target.value.split(","); setData({...data, skills: newSkill}); }} placeholder="Skills (comma separated)" className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm h-20" />
              <button 
                onClick={() => { const newSkill = data.skills.filter((_: any, idx: number) => idx !== i); setData({...data, skills: newSkill}); }}
                className="text-red-500 text-xs hover:underline block pt-2"
              >Remove</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
