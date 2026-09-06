import { useState, useEffect, useMemo } from "react";
import {
  Code2, Cog, Building2, Zap, Cpu, FlaskConical,
  Inbox, Sparkle, CalendarDays, LineChart, RotateCcw, Download, Trash2,
} from "lucide-react";
import "./dashboard.css";
import { supabase } from "./lib/supabaseClient";

const projectStatusMeta = {
  idea: "Only Idea",
  started: "Started",
  partial: "Partially Completed",
  almost: "Almost Completed",
};

const branchMeta = {
  cs: { label: "Computer Science", icon: Code2 },
  mech: { label: "Mechanical", icon: Cog },
  civil: { label: "Civil", icon: Building2 },
  elec: { label: "Electronics", icon: Zap },
  it: { label: "IT / AI & ML", icon: Cpu },
  chem: { label: "Chemical", icon: FlaskConical },
};

function LoginScreen({ onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message || "Login failed. Check your email/password.");
      return;
    }
    onLoggedIn(data.session);
  };

  return (
    <div className="dash-login-wrap">
      <div className="dash-login-card">
        <div className="dash-login-logo">
          EngiAssist <span className="dash-badge">ADMIN</span>
        </div>
        <h1>Dashboard Login</h1>
        <p className="dash-login-sub">Sign in with the admin account you created in Supabase → Authentication.</p>
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="dash-error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <a href="/" className="dash-back-link">Back to site</a>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon"><Icon size={18} strokeWidth={1.8} /></div>
      <div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
      </div>
    </div>
  );
}

function DashboardApp({ session, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setLeads(data || []);
  };

  useEffect(() => {
    fetchLeads();
    // Live updates: new leads appear instantly without refresh
    const channel = supabase
      .channel("leads-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => fetchLeads())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const updateStatus = async (id, status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  };

  const deleteLead = async (id) => {
    if (!confirm("Delete this lead? This can't be undone.")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await supabase.from("leads").delete().eq("id", id);
  };

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (branchFilter !== "all" && l.branch !== branchFilter) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!l.name?.toLowerCase().includes(q) && !l.email?.toLowerCase().includes(q) && !l.phone?.toLowerCase().includes(q) && !l.project?.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [leads, branchFilter, statusFilter, search]);

  const stats = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const today = leads.filter((l) => new Date(l.created_at) >= startOfToday).length;
    const week = leads.filter((l) => new Date(l.created_at) >= startOfWeek).length;
    const newCount = leads.filter((l) => l.status === "new").length;

    const byBranch = {};
    leads.forEach((l) => {
      byBranch[l.branch] = (byBranch[l.branch] || 0) + 1;
    });

    return { total: leads.length, today, week, newCount, byBranch };
  }, [leads]);

  const exportCSV = () => {
    const headers = ["Lead ID", "Name", "Phone", "Email", "Branch", "Semester", "Project", "Current Status", "Deadline", "Message", "Status", "Submitted At"];
    const rows = filtered.map((l) => [
      l.lead_code, l.name, l.phone, l.email, branchMeta[l.branch]?.label || l.branch, l.semester, l.project,
      projectStatusMeta[l.project_status] || l.project_status, l.deadline, l.message, l.status,
      new Date(l.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `engiassist-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const maxBranchCount = Math.max(1, ...Object.values(stats.byBranch));

  return (
    <div className="dash">
      <header className="dash-header">
        <div className="dash-header-left">
          <span className="dash-logo">EngiAssist</span>
          <span className="dash-badge">ADMIN</span>
        </div>
        <div className="dash-header-right">
          <span className="dash-user">{session?.user?.email}</span>
          <button className="dash-btn-ghost" onClick={fetchLeads}><RotateCcw size={14} strokeWidth={1.8} /> Refresh</button>
          <button className="dash-btn-ghost" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-stats-grid">
          <StatCard label="Total Leads" value={stats.total} icon={Inbox} />
          <StatCard label="New (Unhandled)" value={stats.newCount} icon={Sparkle} />
          <StatCard label="Today" value={stats.today} icon={CalendarDays} />
          <StatCard label="Last 7 Days" value={stats.week} icon={LineChart} />
        </div>

        <div className="dash-panel">
          <div className="dash-panel-header">
            <h2>Leads by Branch</h2>
          </div>
          <div className="branch-bars">
            {Object.keys(branchMeta).map((id) => {
              const count = stats.byBranch[id] || 0;
              const Icon = branchMeta[id].icon;
              return (
                <div className="branch-bar-row" key={id}>
                  <span className="branch-bar-label"><Icon size={14} strokeWidth={1.8} /> {branchMeta[id].label}</span>
                  <div className="branch-bar-track">
                    <div
                      className="branch-bar-fill"
                      style={{ width: `${(count / maxBranchCount) * 100}%` }}
                    ></div>
                  </div>
                  <span className="branch-bar-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dash-panel">
          <div className="dash-panel-header">
            <h2>All Leads</h2>
            <div className="dash-toolbar">
              <input
                className="dash-search"
                placeholder="Search name, email, project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
                <option value="all">All Branches</option>
                {Object.entries(branchMeta).map(([id, b]) => (
                  <option key={id} value={id}>{b.label}</option>
                ))}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              <button className="dash-btn-primary" onClick={exportCSV}><Download size={14} strokeWidth={1.8} /> Export CSV</button>
            </div>
          </div>

          {error && <p className="dash-error">Couldn't load leads: {error}</p>}
          {loading ? (
            <div className="dash-empty">Loading leads…</div>
          ) : filtered.length === 0 ? (
            <div className="dash-empty">No leads match these filters yet.</div>
          ) : (
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Lead ID</th>
                    <th>Student</th>
                    <th>Branch</th>
                    <th>Semester</th>
                    <th>Project</th>
                    <th>Current Status</th>
                    <th>Deadline</th>
                    <th>Message</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id}>
                      <td>{l.lead_code || "—"}</td>
                      <td>
                        <div className="dash-cell-name">{l.name}</div>
                        <div className="dash-cell-email">{l.email}</div>
                        <div className="dash-cell-email">{l.phone || "—"}</div>
                      </td>
                      <td>
                        <span className="dash-chip">
                          {branchMeta[l.branch]?.icon &&
                            (() => { const Icon = branchMeta[l.branch].icon; return <Icon size={13} strokeWidth={1.8} />; })()}
                          {branchMeta[l.branch]?.label || l.branch}
                        </span>
                      </td>
                      <td>{l.semester || "—"}</td>
                      <td>{l.project || "—"}</td>
                      <td>{projectStatusMeta[l.project_status] || "—"}</td>
                      <td>{l.deadline || "—"}</td>
                      <td className="dash-cell-message" title={l.message}>{l.message || "—"}</td>
                      <td>{new Date(l.created_at).toLocaleDateString()} <span className="dash-time">{new Date(l.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></td>
                      <td>
                        <select
                          className={`dash-status dash-status-${l.status}`}
                          value={l.status}
                          onChange={(e) => updateStatus(l.id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td>
                        <button className="dash-btn-icon" title="Delete lead" onClick={() => deleteLead(l.id)}>
                          <Trash2 size={15} strokeWidth={1.8} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  const [session, setSession] = useState(undefined); // undefined = checking, null = logged out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="dash-loading-screen">Loading dashboard…</div>;
  }

  if (!session) {
    return <LoginScreen onLoggedIn={setSession} />;
  }

  return <DashboardApp session={session} onLogout={() => supabase.auth.signOut()} />;
}
