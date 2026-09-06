/* ─── Dashboard: shares design tokens from index.css (:root vars) ─── */

.dash-loading-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ink);
  color: var(--muted);
  font-family: var(--font-body);
}

/* ─── Login ─── */
.dash-login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ink);
  font-family: var(--font-body);
  padding: 1.5rem;
}

.dash-login-card {
  width: 100%;
  max-width: 380px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 2.2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
}

.dash-login-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.2rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.dash-badge {
  background: var(--accent);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: var(--radius);
  letter-spacing: 1px;
  font-family: var(--font-mono);
}

.dash-login-card h1 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.4rem;
}

.dash-login-sub {
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.dash-login-card form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.dash-login-card input {
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.85rem 1rem;
  color: var(--text);
  font-family: inherit;
  font-size: 0.9rem;
}

.dash-login-card input:focus {
  outline: none;
  border-color: var(--accent);
}

.dash-login-card button {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.9rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 0.4rem;
  transition: opacity 0.2s, transform 0.2s;
}

.dash-login-card button:hover { transform: translateY(-2px); }
.dash-login-card button:disabled { opacity: 0.6; cursor: default; transform: none; }

.dash-error {
  color: #ff6b6b;
  font-size: 0.8rem;
  background: rgba(255,45,85,0.1);
  border: 1px solid rgba(255,45,85,0.3);
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
}

.dash-back-link {
  display: block;
  text-align: center;
  color: var(--muted);
  font-size: 0.8rem;
  margin-top: 1.4rem;
  text-decoration: none;
}
.dash-back-link:hover { color: var(--accent); }

/* ─── Shell ─── */
.dash {
  min-height: 100vh;
  background: var(--ink);
  font-family: var(--font-body);
  color: var(--text);
}

.dash-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 5%;
  background: rgba(4,8,18,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--line);
}

.dash-header-left { display: flex; align-items: center; gap: 0.6rem; }
.dash-logo { font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; color: #fff; }

.dash-header-right { display: flex; align-items: center; gap: 0.8rem; }
.dash-user { color: var(--muted); font-size: 0.82rem; }

.dash-btn-ghost,
.dash-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.dash-btn-ghost {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--text);
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.2s, color 0.2s;
}
.dash-btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

.dash-btn-primary {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.dash-btn-primary:hover { transform: translateY(-1px); }

.dash-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 5% 4rem;
}

/* ─── Stat cards ─── */
.dash-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.8rem;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 1.3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 2px solid var(--accent);
}

.stat-card-icon {
  color: var(--accent);
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  background: var(--surface-2);
  border-radius: var(--radius);
  flex-shrink: 0;
}

.stat-card-value { font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #fff; }
.stat-card-label { color: var(--muted); font-size: 0.78rem; margin-top: 0.15rem; }

/* ─── Panels ─── */
.dash-panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.dash-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.dash-panel-header h2 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: #fff;
}

.dash-toolbar { display: flex; gap: 0.6rem; flex-wrap: wrap; }

.dash-search, .dash-toolbar select {
  background: var(--surface-2);
  border: 1px solid var(--line);
  color: var(--text);
  border-radius: 8px;
  padding: 0.55rem 0.8rem;
  font-size: 0.82rem;
  font-family: inherit;
}
.dash-search { min-width: 200px; }

/* ─── Branch bars ─── */
.branch-bars { display: flex; flex-direction: column; gap: 0.8rem; }
.branch-bar-row { display: grid; grid-template-columns: 180px 1fr 34px; align-items: center; gap: 0.8rem; }
.branch-bar-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--muted); }
.branch-bar-track { height: 6px; background: var(--surface-2); overflow: hidden; }
.branch-bar-fill { height: 100%; background: var(--accent); transition: width 0.4s ease; }
.branch-bar-count { text-align: right; font-size: 0.82rem; color: var(--text); font-weight: 600; }

/* ─── Table ─── */
.dash-table-wrap { overflow-x: auto; }
.dash-table { width: 100%; border-collapse: collapse; font-size: 0.83rem; }
.dash-table th {
  text-align: left;
  color: var(--muted);
  font-weight: 600;
  padding: 0.7rem 0.6rem;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}
.dash-table td {
  padding: 0.8rem 0.6rem;
  border-bottom: 1px solid var(--line);
  vertical-align: top;
}
.dash-table tr:hover td { background: rgba(255,255,255,0.02); }

.dash-cell-name { color: #fff; font-weight: 600; }
.dash-cell-email { color: var(--muted); font-size: 0.76rem; }
.dash-cell-message { max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dash-time { color: var(--muted); font-size: 0.72rem; display: block; }

.dash-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--accent);
  color: var(--text);
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius);
  font-size: 0.74rem;
  white-space: nowrap;
}

.dash-status {
  background: var(--surface-2);
  border: 1px solid var(--line);
  color: var(--text);
  border-radius: 6px;
  padding: 0.35rem 0.5rem;
  font-size: 0.76rem;
  font-family: inherit;
}
.dash-status-new { border-color: #ff2d55; color: #ff8ba0; }
.dash-status-contacted { border-color: #ffbe3d; color: #ffd680; }
.dash-status-closed { border-color: #4cd964; color: #92e6a7; }

.dash-btn-icon {
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0.3rem;
  border-radius: 6px;
}
.dash-btn-icon:hover { color: #ff6b6b; background: rgba(255,45,85,0.1); }

.dash-empty {
  text-align: center;
  color: var(--muted);
  padding: 2.5rem 1rem;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .dash-header { flex-wrap: wrap; gap: 0.6rem; }
  .dash-user { display: none; }
  .branch-bar-row { grid-template-columns: 110px 1fr 28px; }
  .branch-bar-label { font-size: 0.72rem; }
}
