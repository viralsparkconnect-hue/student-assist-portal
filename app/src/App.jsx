import { useState, useEffect, useRef } from "react";
import {
  Code2, Cog, Building2, Zap, Cpu, FlaskConical,
  Globe, MessageSquare, Plug, ShoppingCart, Bot, Flame, Ruler, Rocket,
  Landmark, Activity, Droplets, Building, Home, CircuitBoard, RadioTower,
  BatteryCharging, Image, ShieldAlert, Cloud, UserCheck, TestTube, Atom, Beaker,
  FileText, HelpCircle, GraduationCap, Presentation, Target,
  PenLine, Handshake, PackageCheck, CheckCircle2,
  Lock, Clock, ShieldCheck, TrendingUp, MapPin, Linkedin, Wrench, Mic,
} from "lucide-react";
import "./index.css";
import { supabase } from "./lib/supabaseClient";
import Dashboard from "./Dashboard";

const branchIconMap = { cs: Code2, mech: Cog, civil: Building2, elec: Zap, it: Cpu, chem: FlaskConical };

const branches = [
  {
    id: "cs",
    code: "CS·01",
    label: "Computer Science",
    desc: "Web dev, ML/AI, DSA, OS, DBMS, App Development",
    projects: ["Portfolio Website", "Chat Application", "ML Model", "API Builder", "E-Commerce App"],
  },
  {
    id: "mech",
    code: "ME·02",
    label: "Mechanical",
    desc: "CAD designs, Thermodynamics, Fluid Mechanics, Robotics",
    projects: ["Robotic Arm Design", "Heat Exchanger", "Gear Mechanism", "3D CAD Model", "Drone Frame"],
  },
  {
    id: "civil",
    code: "CE·03",
    label: "Civil",
    desc: "Structural design, AutoCAD, Surveying, Construction Tech",
    projects: ["Bridge Design", "Smart City Plan", "Earthquake Analysis", "Water Treatment", "Green Building"],
  },
  {
    id: "elec",
    code: "EE·04",
    label: "Electronics",
    desc: "Circuit Design, Embedded Systems, IoT, VLSI, PCB",
    projects: ["IoT Smart Home", "Arduino Robot", "PCB Design", "Signal Processor", "Power System"],
  },
  {
    id: "it",
    code: "IT·05",
    label: "IT / AI & ML",
    desc: "Deep Learning, NLP, Cloud, Cybersecurity, Data Science",
    projects: ["Chatbot with NLP", "Image Classifier", "Fraud Detector", "Cloud Dashboard", "Face Recognition"],
  },
  {
    id: "chem",
    code: "CH·06",
    label: "Chemical",
    desc: "Process Design, Simulation, Material Science, Environment",
    projects: ["Reactor Design", "Distillation Column", "Wastewater Plant", "Polymer Study", "Catalyst Analysis"],
  },
];

// Maps a project title to a relevant icon by keyword, so project cards get a
// visual anchor beyond a plain number. Falls back to the branch's own icon.
const projectIconMap = {
  website: Globe, portfolio: Globe, chat: MessageSquare, ml: Cpu, model: Cpu,
  api: Plug, "e-commerce": ShoppingCart, ecommerce: ShoppingCart,
  robotic: Bot, robot: Bot, heat: Flame, exchanger: Flame, gear: Cog,
  cad: Ruler, drone: Rocket,
  bridge: Landmark, city: Building2, earthquake: Activity, water: Droplets, building: Building, green: Building,
  iot: Home, "smart home": Home, arduino: CircuitBoard, pcb: CircuitBoard, signal: RadioTower, power: BatteryCharging,
  chatbot: Bot, nlp: Bot, image: Image, classifier: Image, fraud: ShieldAlert,
  cloud: Cloud, face: UserCheck, recognition: UserCheck,
  reactor: FlaskConical, distillation: TestTube, wastewater: Droplets, polymer: Atom, catalyst: Beaker,
};

function projectIcon(name, fallback) {
  const lower = name.toLowerCase();
  const hit = Object.keys(projectIconMap).find((key) => lower.includes(key));
  return hit ? projectIconMap[hit] : fallback;
}

const services = [
  { icon: Rocket, title: "Project ideas", desc: "100+ curated project topics for every branch & semester" },
  { icon: FileText, title: "Full documentation", desc: "IEEE-format reports, abstracts, and project reports" },
  { icon: HelpCircle, title: "Guided help", desc: "Get instant guidance on your project doubts" },
  { icon: GraduationCap, title: "Mini & major projects", desc: "From simple mini projects to full major project builds" },
  { icon: Code2, title: "Code & design", desc: "Working source code, circuit diagrams, and CAD files" },
  { icon: Presentation, title: "PPT & presentation", desc: "Professional presentations with content and design" },
  { icon: Target, title: "Career & placement guidance", desc: "Practical support for resumes, interviews, internships, placements, and your engineering career" },
];

const howItWorksSteps = [
  {
    num: "01",
    icon: PenLine,
    title: "Tell us your project",
    desc: "Pick your branch, semester, and describe what you need — mini project, major project, or just guidance.",
  },
  {
    num: "02",
    icon: Handshake,
    title: "Get matched instantly",
    desc: "We connect you with the right expert for your exact branch and topic — no generic templates.",
  },
  {
    num: "03",
    icon: PackageCheck,
    title: "Receive everything you need",
    desc: "Working code, CAD/circuit files, IEEE-format documentation, and a polished PPT — all in one package.",
  },
  {
    num: "04",
    icon: CheckCircle2,
    title: "Submit with confidence",
    desc: "Understand every part of your project so you can explain it in viva and score full marks.",
  },
];

const faqs = [
  {
    q: "Will I actually understand my own project?",
    a: "Yes — every project comes with a plain-language walkthrough so you can explain it confidently in your viva, not just submit it.",
  },
  {
    q: "Is the work original and plagiarism-free?",
    a: "100%. Every project is built specifically for you, not copy-pasted from old submissions.",
  },
  {
    q: "How fast can I get help?",
    a: "Most requests get a response within 24–48 hours, depending on project complexity and deadline.",
  },
  {
    q: "Do you help with mini projects and major final-year projects?",
    a: "Both — from a 2-week mini project to a full major/final-year project with complete documentation.",
  },
  {
    q: "What if my branch isn't fully listed?",
    a: "Reach out anyway — the 6 branches cover most requests, but we regularly help with related and interdisciplinary topics too.",
  },
];

const fixItems = [
  "Code Errors",
  "Missing Modules",
  "Database Problems",
  "Documentation",
  "UI Improvements",
  "Testing",
  "PPT",
  "Viva Preparation",
];

const testimonials = [
  {
    quote: "I finally understood my own major project well enough to ace the viva. The documentation was IEEE-perfect too.",
    name: "Aditi R.",
    branch: "Computer Science, Final Year",
  },
  {
    quote: "My CAD design for the robotic arm project was done professionally, and they explained every part of it to me.",
    name: "Rohan K.",
    branch: "Mechanical Engineering",
  },
  {
    quote: "Fast turnaround, clean code, and a presentation that actually looked premium in front of my panel.",
    name: "Sneha P.",
    branch: "IT / AI & ML",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHead({ kicker, title, sub, meta }) {
  return (
    <Reveal className="section-head">
      <div className="section-head-text">
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {meta && <span className="section-index">{meta}</span>}
    </Reveal>
  );
}

function TrustStrip() {
  const items = [
    { icon: Lock, text: "100% original work" },
    { icon: Clock, text: "24–48 hr turnaround" },
    { icon: GraduationCap, text: "Expert engineers" },
    { icon: ShieldCheck, text: "Verified & secure" },
  ];
  return (
    <div className="trust-strip">
      {items.map((t) => (
        <div key={t.text} className="trust-item">
          <t.icon size={16} strokeWidth={1.8} />
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "Branches", "Services", "About", "Projects", "Contact"];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="/" className="nav-logo">
        <span className="logo-mark">EA</span>
        <span className="logo-text">EngiAssist</span>
      </a>
      <ul className={`nav-links ${mobileOpen ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l}>
            <a
              href={l === "About" ? "/about" : l === "Home" ? "/" : `/#${l.toLowerCase()}`}
              className={active === l ? "active" : ""}
              onClick={() => { setActive(l); setMobileOpen(false); }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        <button
          className="btn-nav-cta"
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else window.location.href = "/#contact";
          }}
        >
          Get help now
        </button>
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const phrases = ["Computer Science Projects", "Mechanical Design Help", "Civil Engineering Docs", "Electronics & IoT Ideas", "AI/ML Project Guidance"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 40 : 65);
    };
    const t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, []);

  const panelRows = [
    { code: "CS·01", icon: Code2, label: "CS project help" },
    { code: "ME·02", icon: Cog, label: "Mechanical CAD design" },
    { code: "IT·05", icon: Cpu, label: "AI/ML model builds" },
    { code: "CE·03", icon: Building2, label: "Civil project reports" },
  ];

  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <span className="kicker hero-badge">Engineering project support</span>
        <h1 className="hero-title">
          Your ultimate guide for<br />
          <span className="typed-line">
            <span className="typed-text">{typed}</span>
            <span className="cursor">|</span>
          </span>
        </h1>
        <p className="hero-sub">
          Explore project ideas, get guidance, and find useful resources for your
          engineering journey.
        </p>
        <div className="hero-btns">
          <button
            className="btn-primary"
            onClick={() => document.getElementById("branches").scrollIntoView({ behavior: "smooth" })}
          >
            Explore your branch
          </button>
          <button
            className="btn-secondary"
            onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
          >
            View projects
          </button>
        </div>
        <TrustStrip />
      </div>
      <div className="hero-visual">
        <div className="spec-panel">
          <div className="spec-panel-head">
            <span>Project catalog</span>
            <span>6 branches</span>
          </div>
          <ul className="spec-list">
            {panelRows.map((r) => (
              <li key={r.code} className="spec-row">
                <span className="spec-row-code">{r.code}</span>
                <span className="spec-row-icon"><r.icon size={15} strokeWidth={1.8} /></span>
                <span className="spec-row-label">{r.label}</span>
              </li>
            ))}
          </ul>
          <div className="spec-panel-foot">
            Most requests get a response within <strong>24–48 hours</strong>.
          </div>
        </div>
      </div>
    </section>
  );
}

function Branches() {
  const [active, setActive] = useState(null);

  return (
    <section className="branches-section" id="branches">
      <SectionHead
        kicker="All branches"
        title="Choose your engineering branch"
        sub="Specialized project guidance for every discipline"
        meta="6 branches"
      />
      <div className="branches-grid">
        {branches.map((b) => {
          const Icon = branchIconMap[b.id];
          return (
            <div
              key={b.id}
              className={`branch-card ${active === b.id ? "active" : ""}`}
              onClick={() => setActive(active === b.id ? null : b.id)}
            >
              <div className="branch-card-top">
                <div className="branch-icon"><Icon size={20} strokeWidth={1.8} /></div>
                <span className="branch-code">{b.code}</span>
              </div>
              <h3>{b.label}</h3>
              <p>{b.desc}</p>
              {active === b.id && (
                <div className="branch-projects">
                  <p className="proj-title">Popular projects</p>
                  <ul>
                    {b.projects.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <button
                    className="branch-cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Get help with {b.label} projects
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section" id="services">
      <SectionHead
        kicker="What we offer"
        title="Everything you need to excel"
        sub="Complete engineering project support from idea to submission"
        meta="7 services"
      />
      <div className="services-list">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 40} className="service-row">
            <span className="service-row-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="service-row-icon"><s.icon size={18} strokeWidth={1.8} /></span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works">
      <SectionHead
        kicker="Simple process"
        title="How EngiAssist works"
        sub="From idea to submission in 4 clear steps"
      />
      <div className="how-grid">
        {howItWorksSteps.map((s, i) => (
          <Reveal key={s.num} delay={i * 70} className="how-card-wrap">
            <div className="how-card">
              <span className="how-num">{s.num}</span>
              <div className="how-icon"><s.icon size={17} strokeWidth={1.8} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FixMyProject() {
  return (
    <section className="fix-section" id="fix-my-project">
      <SectionHead
        kicker="Already in progress?"
        title="Your project doesn't have to start from zero"
        sub="Already have a project? We can help you fix, finish, or explain it."
      />
      <Reveal className="fix-wrapper" delay={80}>
        <div className="fix-chips">
          {fixItems.map((f) => (
            <span key={f} className="fix-chip">{f}</span>
          ))}
        </div>
        <button
          className="btn-primary"
          onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
        >
          Get help with my existing project
        </button>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials-section">
      <SectionHead
        kicker="Student voices"
        title="What students say"
        sub="Real feedback from students who got their projects done right"
      />
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 80} className="testimonial-card">
            <p className="testimonial-text">{t.quote}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.name.charAt(0)}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-branch">{t.branch}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section" id="faq">
      <SectionHead
        kicker="Got questions?"
        title="Frequently asked questions"
        sub="Everything students usually ask before getting started"
      />
      <div className="faq-list">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 40} className="faq-item-wrap">
            <div className={`faq-item ${open === i ? "faq-open" : ""}`}>
              <button className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-toggle">{open === i ? "−" : "+"}</span>
              </button>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="about-section" id="about">
      <SectionHead kicker="Who we are" title="Meet the founder" sub="Built by an engineer, for engineers" />

      <div className="about-wrapper">
        <div className="founder-card">
          <div className="founder-avatar">
            <span>PP</span>
          </div>
          <h3 className="founder-name">Pratik Patil</h3>
          <p className="founder-role">CEO &amp; Founder, EngiAssist</p>

          <div className="founder-badges">
            <span className="founder-badge"><Cog size={15} strokeWidth={1.8} /> Mechanical Engineer</span>
            <span className="founder-badge"><TrendingUp size={15} strokeWidth={1.8} /> Marketing Manager, Solar industry</span>
            <span className="founder-badge"><MapPin size={15} strokeWidth={1.8} /> Jalgaon, Maharashtra</span>
          </div>

          <a
            href="https://www.linkedin.com/in/pratik-patil-7347512b2/"
            target="_blank"
            rel="noopener noreferrer"
            className="founder-linkedin"
          >
            <Linkedin size={16} strokeWidth={1.8} /> Connect on LinkedIn
          </a>

          <p className="founder-bio">
            Pratik founded EngiAssist to give engineering students across every
            branch the same project guidance and support he wished he'd had —
            combining hands-on mechanical engineering expertise with real-world
            marketing and leadership experience in the solar industry. Based in
            Jalgaon, Maharashtra, he's built EngiAssist into a trusted resource
            for thousands of students working on mini and major projects.
          </p>
        </div>

        <div className="about-highlights">
          <div className="about-highlight-card">
            <h4>Engineer-led</h4>
            <p>Every project reviewed with real engineering rigor, not just templates.</p>
          </div>
          <div className="about-highlight-card">
            <h4>Marketing-backed</h4>
            <p>Presentation and communication polish from real industry marketing experience.</p>
          </div>
          <div className="about-highlight-card">
            <h4>Proudly local</h4>
            <p>Based in Jalgaon, Maharashtra — supporting students across India.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const [active, setActive] = useState("About");
  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <section className="about-hero">
        <div className="hero-bg"></div>
        <Reveal className="about-hero-content">
          <span className="kicker">The story behind EngiAssist</span>
          <h1 className="about-hero-title">About EngiAssist</h1>
          <p className="hero-sub">
            Built by an engineer who understands exactly what students need —
            not just a finished project, but real understanding.
          </p>
        </Reveal>
      </section>
      <AboutUs />
      <Testimonials />
      <Footer />
    </div>
  );
}

function Projects() {
  const [selectedBranch, setSelectedBranch] = useState("cs");
  const current = branches.find((b) => b.id === selectedBranch);
  const CurrentIcon = branchIconMap[current.id];

  return (
    <section className="projects-section" id="projects">
      <SectionHead
        kicker="Project ideas"
        title="Explore project topics"
        sub="Handpicked project ideas for each engineering branch"
      />
      <div className="proj-tabs">
        {branches.map((b) => {
          const Icon = branchIconMap[b.id];
          return (
            <button
              key={b.id}
              className={`proj-tab ${selectedBranch === b.id ? "active" : ""}`}
              onClick={() => setSelectedBranch(b.id)}
            >
              <Icon size={15} strokeWidth={1.8} /> {b.label}
            </button>
          );
        })}
      </div>
      <div className="proj-cards">
        {current.projects.map((p, i) => {
          const Icon = projectIcon(p, CurrentIcon);
          return (
            <div key={p} className="proj-card">
              <div className="proj-card-top">
                <div className="proj-icon-badge"><Icon size={17} strokeWidth={1.8} /></div>
                <div className="proj-number">{String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="proj-name">{p}</div>
              <div className="proj-branch">{current.label}</div>
              <button
                className="proj-btn"
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              >
                Request this project
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const projectStatusOptions = [
  { value: "idea", label: "Only Idea" },
  { value: "started", label: "Started" },
  { value: "partial", label: "Partially Completed" },
  { value: "almost", label: "Almost Completed" },
];

function makeLeadCode() {
  // Short human-readable reference the student can quote over WhatsApp —
  // not a database key, just something friendlier than a UUID.
  const n = Date.now().toString().slice(-6);
  return `EA-${n}`;
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "cs",
    semester: "",
    project: "",
    projectStatus: "",
    deadline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leadCode, setLeadCode] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const branchName =
      branches.find((b) => b.id === form.branch)?.label || form.branch;
    const statusLabel =
      projectStatusOptions.find((s) => s.value === form.projectStatus)?.label || "Not specified";

    const code = makeLeadCode();

    // Save the lead so it shows up in /dashboard — if this fails (e.g. offline),
    // we still let the student reach us on WhatsApp below.
    try {
      const { error: insertError } = await supabase.from("leads").insert([
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          branch: form.branch,
          semester: form.semester,
          project: form.project,
          project_status: form.projectStatus || null,
          deadline: form.deadline || null,
          message: form.message,
          lead_code: code,
        },
      ]);
      if (insertError) console.error("Lead save failed:", insertError.message);
    } catch (err) {
      console.error("Lead save failed:", err);
    }

    const message = `Hello EngiAssist!

New Project Help Request (Ref: ${code})

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Branch: ${branchName}
Semester: ${form.semester || "Not specified"}
Project: ${form.project || "Not specified"}
Current Status: ${statusLabel}
Deadline: ${form.deadline || "Not specified"}

Message:
${form.message || "No message provided"}

Please contact me regarding my project.`;

    const whatsappUrl =
      `https://wa.me/919021698707?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setSubmitting(false);
    setLeadCode(code);
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <SectionHead kicker="Get started" title="Request project help" sub="Tell us your branch and project needs — we'll guide you step by step" />
      <div className="contact-wrapper">
        <div className="contact-info">
          <h3>Why choose EngiAssist?</h3>
          <ul>
            <li><CheckCircle2 size={16} strokeWidth={1.8} /> Expert guidance for all 6 engineering branches</li>
            <li><CheckCircle2 size={16} strokeWidth={1.8} /> Complete project from scratch or partial help</li>
            <li><CheckCircle2 size={16} strokeWidth={1.8} /> IEEE-format documentation & reports</li>
            <li><CheckCircle2 size={16} strokeWidth={1.8} /> Working source code & design files</li>
            <li><CheckCircle2 size={16} strokeWidth={1.8} /> Presentation & PPT preparation</li>
            <li><CheckCircle2 size={16} strokeWidth={1.8} /> Fast turnaround — results in 24–48 hours</li>
          </ul>
          <div className="contact-badges">
            <span>Top rated</span>
            <span>Fast delivery</span>
            <span>100% original</span>
          </div>
        </div>

        {!submitted ? (
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <input name="name" placeholder="Your Full Name *" value={form.name} onChange={handle} required />
              <input name="phone" type="tel" placeholder="Phone / WhatsApp Number *" value={form.phone} onChange={handle} required />
            </div>
            <div className="form-row">
              <input name="email" type="email" placeholder="Email Address *" value={form.email} onChange={handle} required />
              <select name="branch" value={form.branch} onChange={handle}>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <select name="semester" value={form.semester} onChange={handle}>
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                ))}
              </select>
              <input name="project" placeholder="Project Name / Topic (if you have one)" value={form.project} onChange={handle} />
            </div>
            <div className="form-row">
              <select name="projectStatus" value={form.projectStatus} onChange={handle}>
                <option value="">Current Status</option>
                {projectStatusOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <input name="deadline" type="date" placeholder="Deadline" value={form.deadline} onChange={handle} />
            </div>
            <textarea name="message" placeholder="Describe what help you need (specific requirements, existing issues, etc.)" rows={4} value={form.message} onChange={handle}></textarea>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit request"}
            </button>
          </form>
        ) : (
          <div className="success-box">
            <CheckCircle2 size={38} strokeWidth={1.5} className="success-icon" />
            <h3>Requirement received</h3>
            <p className="success-lead-code">Reference ID: <strong>{leadCode}</strong></p>
            <p>Our team will review your requirement and reach out on WhatsApp. Quote the reference above if you follow up with us.</p>
            <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit another request</button>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <a href="/" className="footer-brand">
              <span className="logo-mark">EA</span>
              <span>EngiAssist</span>
            </a>
            <p>Empowering every engineering student to build, learn, and succeed.</p>
          </div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/#branches">Branches</a>
            <a href="/#services">Services</a>
            <a href="/about">About</a>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
        <div className="footer-seo-links">
          <div className="footer-seo-col">
            <p className="footer-seo-title">By branch</p>
            {Object.entries(branchSeoContent).map(([id, c]) => (
              <a key={id} href={c.path}>{branches.find((b) => b.id === id)?.label} Projects</a>
            ))}
          </div>
          <div className="footer-seo-col">
            <p className="footer-seo-title">By service</p>
            <a href="/final-year-project-help">Final Year Project Help</a>
            {Object.entries(serviceSeoPages).map(([slug, c]) => (
              <a key={slug} href={c.path}>{c.heading}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 EngiAssist. Built for engineering students in India.</p>
          <a className="footer-admin-link" href="/dashboard">Admin login</a>
        </div>
      </div>
    </footer>
  );
}

function useSeoMeta({ title, description, path }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    const url = `https://www.engiassist.in${path}`;
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, path]);
}

function SeoCta({ heading = "Ready to get started?" }) {
  const openWhatsApp = () => {
    const message = "Hello EngiAssist! I need help with my engineering project.";
    window.open(`https://wa.me/919021698707?text=${encodeURIComponent(message)}`, "_blank");
  };
  return (
    <section className="seo-cta">
      <Reveal className="seo-cta-inner">
        <h2>{heading}</h2>
        <div className="hero-btns">
          <button className="btn-primary" onClick={openWhatsApp}>Chat on WhatsApp</button>
          <a className="btn-secondary" href="/#contact">Request this service</a>
        </div>
      </Reveal>
    </section>
  );
}

// Branch-specific SEO landing page — reuses real branch/project data so each
// page has genuinely distinct content instead of a templated re-skin.
const branchSeoContent = {
  cs: {
    path: "/cse-project-help",
    title: "CSE Project Help — Web, DSA, DBMS & OS Projects | EngiAssist",
    metaDescription: "Get expert help with Computer Science engineering projects — web development, DSA, OS, DBMS and app development. Working code, documentation and viva support.",
    intro: "Computer Science projects are judged on more than working code — evaluators expect you to explain your architecture, your database design and your algorithmic choices. We help CSE and B.Tech students plan, build and document projects across web development, DSA-heavy systems, database-driven apps and operating-systems coursework, so you walk into your review able to answer anything asked.",
  },
  it: {
    path: "/ai-ml-project-help",
    title: "AI/ML & IT Project Help — Deep Learning, NLP, Cloud | EngiAssist",
    metaDescription: "Project assistance for AI, Machine Learning, NLP, Cloud and Cybersecurity coursework. Real datasets, working models and documentation explained clearly.",
    intro: "AI/ML and IT projects live or die on whether you can explain your model, your dataset choices and your evaluation metrics — not just whether the notebook runs. We help IT and AI/ML students build classifiers, NLP pipelines, cloud-deployed dashboards and cybersecurity projects with real datasets, and walk through the reasoning behind every design decision so it's genuinely yours to defend.",
  },
  mech: {
    path: "/mechanical-project-help",
    title: "Mechanical Engineering Project Help — CAD, Robotics & Design | EngiAssist",
    metaDescription: "Mechanical engineering project support — CAD design, thermodynamics, fluid mechanics and robotics projects with working models and full documentation.",
    intro: "Mechanical projects usually combine a CAD model, hand calculations and a physical or simulated justification for your design choices. We help mechanical engineering students with CAD design work, thermodynamics and fluid-mechanics analysis, and robotics builds — plus the documentation that ties the calculations to the final design so your panel sees a coherent project, not disconnected parts.",
  },
  civil: {
    path: "/civil-project-help",
    title: "Civil Engineering Project Help — Structural Design & AutoCAD | EngiAssist",
    metaDescription: "Civil engineering project assistance — structural design, AutoCAD drawings, surveying and construction technology projects with complete reports.",
    intro: "Civil engineering projects are usually assessed on whether your structural design holds up to scrutiny and whether your drawings and calculations are consistent with each other. We help civil engineering students with structural design, AutoCAD drafting, surveying work and construction-technology projects, along with the technical report that explains your design logic clearly.",
  },
  elec: {
    path: "/electronics-project-help",
    title: "ECE Project Help — Embedded Systems, IoT & PCB Design | EngiAssist",
    metaDescription: "Electronics and communication engineering project help — circuit design, embedded systems, IoT builds, VLSI and PCB design with working hardware.",
    intro: "ECE projects need a working circuit or embedded build, not just a schematic on paper. We help electronics and communication engineering students with circuit design, embedded systems, IoT projects, VLSI work and PCB design — and make sure you understand every component choice well enough to explain it during your viva, not just plug it in.",
  },
  chem: {
    path: "/chemical-project-help",
    title: "Chemical Engineering Project Help — Process Design & Simulation | EngiAssist",
    metaDescription: "Chemical engineering project support — process design, simulation, material science and environmental engineering projects with full documentation.",
    intro: "Chemical engineering projects usually hinge on process design logic and simulation results holding together end to end. We help chemical engineering students with process design, simulation work, material-science studies and environmental-engineering projects, along with documentation that connects your assumptions to your results clearly.",
  },
};

function BranchSeoPage({ branchId }) {
  const [active, setActive] = useState("Branches");
  const branch = branches.find((b) => b.id === branchId);
  const Icon = branchIconMap[branchId];
  const content = branchSeoContent[branchId];
  useSeoMeta({ title: content.title, description: content.metaDescription, path: content.path });

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <section className="about-hero">
        <div className="hero-bg"></div>
        <Reveal className="about-hero-content">
          <div className="seo-icon-badge"><Icon size={24} strokeWidth={1.8} /></div>
          <span className="kicker">{branch.label}</span>
          <h1 className="about-hero-title">{branch.label} Project Assistance</h1>
          <p className="hero-sub">{branch.desc}</p>
        </Reveal>
      </section>
      <section className="seo-body">
        <Reveal className="seo-body-inner">
          <p>{content.intro}</p>
        </Reveal>
      </section>
      <section className="projects-section" id="projects">
        <SectionHead kicker="Popular topics" title={`${branch.label} project ideas`} sub="A starting point — we also build custom topics around your requirement" />
        <div className="proj-cards">
          {branch.projects.map((p, i) => {
            const PIcon = projectIcon(p, Icon);
            return (
              <div key={p} className="proj-card">
                <div className="proj-card-top">
                  <div className="proj-icon-badge"><PIcon size={17} strokeWidth={1.8} /></div>
                  <div className="proj-number">{String(i + 1).padStart(2, "0")}</div>
                </div>
                <div className="proj-name">{p}</div>
                <div className="proj-branch">{branch.label}</div>
                <a className="proj-btn" href="/#contact">Request this project</a>
              </div>
            );
          })}
        </div>
      </section>
      <HowItWorks />
      <FixMyProject />
      <FAQ />
      <SeoCta heading={`Need help with your ${branch.label} project?`} />
      <Footer />
    </div>
  );
}

// Service-specific SEO landing pages.
const serviceSeoPages = {
  "project-debugging": {
    path: "/project-debugging",
    icon: Wrench,
    title: "Project Debugging Help for Engineering Students | EngiAssist",
    metaDescription: "Stuck with a broken engineering project? Get help fixing code errors, missing modules and database issues — for any branch, at any stage of completion.",
    heading: "Project Debugging & Error Fixing",
    intro: "Most engineering students don't need a project built from zero — they need help finishing one that's already 50–80% done. We review existing code, identify what's actually broken (a bug, a missing module, a database misconfiguration, or a UI issue), and fix it while explaining what went wrong, so the next issue doesn't stump you again.",
    items: fixItems,
  },
  "project-documentation-help": {
    path: "/project-documentation-help",
    icon: FileText,
    title: "Project Documentation & Report Writing Help | EngiAssist",
    metaDescription: "IEEE-format project reports, synopsis, SRS documents and technical diagrams for engineering final year and mini projects.",
    heading: "Project Documentation & Reports",
    intro: "A working project without proper documentation loses marks it shouldn't. We help engineering students put together IEEE-format project reports, synopsis documents, SRS write-ups and technical diagrams that actually match what you built — not generic templates padded with filler.",
    items: ["Project Report", "Synopsis", "SRS Document", "Technical Diagrams", "Abstract Writing", "Reference Formatting"],
  },
  "viva-preparation": {
    path: "/viva-preparation",
    icon: Mic,
    title: "Viva Preparation for Engineering Projects | EngiAssist",
    metaDescription: "Understand your engineering project well enough to defend it confidently in your viva — plain-language walkthroughs for every branch.",
    heading: "Viva & Project Explanation",
    intro: "The most common reason students lose marks isn't a weak project — it's not being able to explain it under questioning. We walk you through your own project in plain language: why you made each design choice, how each module works, and what to say when a panel member asks 'why not do it this way instead?'",
    items: ["Concept Walkthrough", "Likely Questions", "Design Justification", "Code Explanation", "Mock Viva Practice", "Confidence Building"],
  },
  "ppt-presentation-help": {
    path: "/ppt-presentation-help",
    icon: Presentation,
    title: "Project PPT & Presentation Design Help | EngiAssist",
    metaDescription: "Professional PPT design and presentation preparation for engineering project submissions and final year project defense.",
    heading: "PPT & Presentation Design",
    intro: "A cluttered, generic-template slide deck undersells a good project. We help design clean, professional presentations that highlight your actual work — problem statement, methodology, results — and prepare you to present it clearly within the time you're given.",
    items: ["Slide Design", "Content Structuring", "Speaker Notes", "Presentation Practice", "Timing Guidance", "Visual Diagrams"],
  },
  "career-placement-guidance": {
    path: "/career-placement-guidance",
    icon: Target,
    title: "Career & Placement Guidance for Engineering Students | EngiAssist",
    metaDescription: "Resume building, mock interviews, internship guidance and placement prep for engineering students — practical support, no false promises.",
    heading: "Career & Placement Guidance",
    intro: "A strong project counts for little if it isn't backed by a resume and interview performance that reflect it. We help engineering students turn their coursework and projects into a placement-ready profile — practical, one-on-one support, not a guaranteed-job pitch.",
    items: ["Resume Building", "Mock Interviews", "Internship Guidance", "LinkedIn Profile Review", "Aptitude Prep", "Career Roadmap"],
  },
};

function ServiceSeoPage({ slug }) {
  const [active, setActive] = useState("Services");
  const content = serviceSeoPages[slug];
  useSeoMeta({ title: content.title, description: content.metaDescription, path: content.path });

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <section className="about-hero">
        <div className="hero-bg"></div>
        <Reveal className="about-hero-content">
          <div className="seo-icon-badge"><content.icon size={24} strokeWidth={1.8} /></div>
          <span className="kicker">Engineering project support</span>
          <h1 className="about-hero-title">{content.heading}</h1>
          <p className="hero-sub">{content.intro}</p>
        </Reveal>
      </section>
      <section className="fix-section">
        <Reveal className="fix-wrapper" delay={100}>
          <div className="fix-chips">
            {content.items.map((f) => (
              <span key={f} className="fix-chip">{f}</span>
            ))}
          </div>
        </Reveal>
      </section>
      <Branches />
      <HowItWorks />
      <FAQ />
      <SeoCta heading={`Need help with ${content.heading.toLowerCase()}?`} />
      <Footer />
    </div>
  );
}

function FinalYearProjectPage() {
  const [active, setActive] = useState("Home");
  useSeoMeta({
    title: "Final Year Project Help for Engineering Students | EngiAssist",
    description: "Complete final year project assistance for B.Tech, BE and Diploma students — development, debugging, documentation, PPT and viva preparation, across all branches.",
    path: "/final-year-project-help",
  });

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <section className="about-hero">
        <div className="hero-bg"></div>
        <Reveal className="about-hero-content">
          <span className="kicker">Final year project assistance</span>
          <h1 className="about-hero-title">Final Year Project Help, Start to Submission</h1>
          <p className="hero-sub">
            From choosing a topic to building it, documenting it and defending it in your viva —
            support for B.Tech, BE and Diploma students across every engineering branch.
          </p>
        </Reveal>
      </section>
      <Branches />
      <HowItWorks />
      <Services />
      <FixMyProject />
      <FAQ />
      <SeoCta heading="Ready to start your final year project?" />
      <Footer />
    </div>
  );
}

function FloatingWhatsApp() {
  const openWhatsApp = () => {
    const message = "Hello EngiAssist! I need help with my engineering project.";
    window.open(`https://wa.me/919021698707?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button
      onClick={openWhatsApp}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        width: "54px",
        height: "54px",
        borderRadius: "4px",
        border: "none",
        background: "#25D366",
        color: "white",
        cursor: "pointer",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="white"
        aria-hidden="true"
      >
        <path d="M20.52 3.449A11.86 11.86 0 0 0 12.05 0C5.495 0 .163 5.332.163 11.89c0 2.096.548 4.142 1.588 5.946L0 24l6.335-1.655a11.88 11.88 0 0 0 5.709 1.447h.005c6.554 0 11.887-5.332 11.887-11.89a11.85 11.85 0 0 0-3.416-8.453zM12.05 21.79h-.004a9.87 9.87 0 0 1-5.032-1.378l-.361-.214-3.76.982 1.004-3.67-.235-.375a9.87 9.87 0 0 1-1.51-5.245c0-5.442 4.43-9.872 9.877-9.872a9.83 9.83 0 0 1 6.994 2.9 9.83 9.83 0 0 1 2.894 6.994c-.003 5.445-4.433 9.878-9.867 9.878zm5.413-7.397c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.149-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.256-.463-2.39-1.475-.883-.788-1.48-1.762-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    </button>
  );
}

function Landing() {
  const [active, setActive] = useState("Home");

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Branches />
      <HowItWorks />
      <Services />
      <FixMyProject />
      <Testimonials />
      <Projects />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  // Lightweight path-based routing — no router library needed for a few pages.
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "") || "/"
      : "/";

  if (path === "/dashboard") return <Dashboard />;

  let page;
  if (path === "/about") page = <AboutPage />;
  else if (path === "/final-year-project-help") page = <FinalYearProjectPage />;
  else {
    const branchMatch = Object.entries(branchSeoContent).find(([, c]) => c.path === path);
    const serviceMatch = Object.entries(serviceSeoPages).find(([, c]) => c.path === path);
    if (branchMatch) page = <BranchSeoPage branchId={branchMatch[0]} />;
    else if (serviceMatch) page = <ServiceSeoPage slug={serviceMatch[0]} />;
    else page = <Landing />;
  }

  return (
    <>
      {page}
      {path !== "/" && <FloatingWhatsApp />}
    </>
  );
}
