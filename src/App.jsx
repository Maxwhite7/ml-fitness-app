import { useState, useEffect, useRef } from "react";

// ─── Embedded Google Font via @import in style ───────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black: #0a0a0a;
      --charcoal: #141414;
      --panel: #1c1c1c;
      --border: #2a2a2a;
      --accent: #3ec9c9;
      --accent2: #2aa8a8;
      --text: #f0f0f0;
      --muted: #666;
      --green: #4cff91;
      --red: #ff4c6b;
    }

    body {
      background: var(--black);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
    }

    .bebas { font-family: 'Bebas Neue', sans-serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--charcoal); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .fade-up { animation: fadeUp 0.4s ease forwards; }

    /* Login */
    .login-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(ellipse at 20% 50%, #001a1a 0%, var(--black) 60%);
    }
    .login-box {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 48px 40px;
      width: 380px;
      animation: fadeUp 0.5s ease;
    }
    .login-logo {
      font-size: 52px;
      color: var(--accent);
      letter-spacing: 2px;
      line-height: 1;
      margin-bottom: 4px;
    }
    .login-sub {
      color: var(--muted);
      font-size: 13px;
      margin-bottom: 36px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .field-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--muted);
      margin-bottom: 6px;
    }
    .field-input {
      width: 100%;
      background: var(--charcoal);
      border: 1px solid var(--border);
      border-radius: 2px;
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      padding: 11px 14px;
      margin-bottom: 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    .field-input:focus { border-color: var(--accent); }
    .btn-primary {
      width: 100%;
      background: var(--accent);
      color: #ffffff;
      border: none;
      border-radius: 2px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 18px;
      letter-spacing: 2px;
      padding: 13px;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
    }
    .btn-primary:hover { opacity: 0.88; }
    .btn-primary:active { transform: scale(0.98); }
    .btn-secondary {
      background: transparent;
      color: var(--muted);
      border: 1px solid var(--border);
      border-radius: 2px;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      padding: 8px 16px;
      cursor: pointer;
      transition: color 0.2s, border-color 0.2s;
    }
    .btn-secondary:hover { color: var(--text); border-color: var(--text); }
    .error-msg {
      background: #ff4c6b22;
      border: 1px solid var(--red);
      border-radius: 2px;
      color: var(--red);
      font-size: 12px;
      padding: 10px 14px;
      margin-bottom: 16px;
    }
    .switch-link {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: var(--muted);
    }
    .switch-link span {
      color: var(--accent);
      cursor: pointer;
      text-decoration: underline;
    }

    /* Layout */
    .app-shell {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    .topbar {
      background: var(--charcoal);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      padding: 0 24px;
      height: 56px;
      flex-shrink: 0;
      gap: 0;
    }
    .topbar-logo {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin-right: 32px;
    }
    .topbar-logo-text {
      font-size: 22px;
      color: var(--accent);
      letter-spacing: 1px;
    }
    .topbar-role {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--muted);
    }
    .topbar-nav {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 2px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 16px;
      height: 56px;
      font-size: 13px;
      color: var(--muted);
      cursor: pointer;
      transition: all 0.15s;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
    }
    .nav-item:hover { color: var(--text); background: #ffffff05; }
    .nav-item.active { color: var(--accent); border-bottom-color: var(--accent); background: #3ec9c908; }
    .nav-icon { font-size: 15px; }
    .user-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-left: auto;
    }
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent);
      color: var(--black);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      flex-shrink: 0;
    }
    .user-name { font-size: 12px; font-weight: 500; color: var(--text); }
    .logout-btn {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      font-size: 14px;
      padding: 4px;
      transition: color 0.2s;
    }
    .logout-btn:hover { color: var(--red); }

    /* Main content */
    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 32px 36px;
    }
    .page-header {
      margin-bottom: 28px;
    }
    .page-title {
      font-size: 42px;
      color: var(--text);
      line-height: 1;
    }
    .page-subtitle {
      color: var(--muted);
      font-size: 13px;
      margin-top: 6px;
    }

    /* Stat cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin-bottom: 28px;
    }
    .stat-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 20px;
      animation: fadeUp 0.4s ease;
    }
    .stat-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--muted);
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 36px;
      color: var(--accent);
      line-height: 1;
    }
    .stat-sub { font-size: 11px; color: var(--muted); margin-top: 4px; }

    /* Section */
    .section {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 2px;
      margin-bottom: 20px;
      animation: fadeUp 0.45s ease;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--muted);
    }
    .section-body { padding: 20px; }

    /* Table */
    .table { width: 100%; border-collapse: collapse; }
    .table th {
      text-align: left;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--muted);
      padding: 8px 12px;
      border-bottom: 1px solid var(--border);
    }
    .table td {
      padding: 12px 12px;
      font-size: 13px;
      border-bottom: 1px solid #1f1f1f;
      vertical-align: middle;
    }
    .table tr:last-child td { border-bottom: none; }
    .table tr:hover td { background: #ffffff04; }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 500;
    }
    .badge-green { background: #4cff9120; color: var(--green); }
    .badge-red { background: #ff4c6b20; color: var(--red); }
    .badge-accent { background: #e8ff4720; color: var(--accent); }
    .badge-muted { background: #ffffff10; color: var(--muted); }

    /* Week grid */
    .week-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
    }
    .day-col {
      background: var(--charcoal);
      border: 1px solid var(--border);
      border-radius: 2px;
      min-height: 160px;
      padding: 10px;
    }
    .day-col.today { border-color: var(--accent); }
    .day-header {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--muted);
      margin-bottom: 8px;
      text-align: center;
    }
    .day-date {
      text-align: center;
      font-size: 20px;
      color: var(--text);
      margin-bottom: 8px;
    }
    .session-block {
      background: var(--accent);
      color: var(--black);
      border-radius: 2px;
      padding: 6px 8px;
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 4px;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .session-block:hover { opacity: 0.8; }
    .session-block.secondary {
      background: #3ec9c930;
      color: var(--accent);
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: #00000099;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      backdrop-filter: blur(4px);
    }
    .modal {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 2px;
      width: 520px;
      max-height: 85vh;
      overflow-y: auto;
      animation: fadeUp 0.3s ease;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
    }
    .modal-title { font-size: 28px; }
    .modal-close {
      background: none;
      border: none;
      color: var(--muted);
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
    }
    .modal-close:hover { color: var(--text); }
    .modal-body { padding: 24px; }
    .form-row { margin-bottom: 16px; }
    .form-row label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--muted);
      margin-bottom: 6px;
    }
    .form-row input, .form-row select, .form-row textarea {
      width: 100%;
      background: var(--charcoal);
      border: 1px solid var(--border);
      border-radius: 2px;
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      padding: 10px 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-row input:focus, .form-row select:focus, .form-row textarea:focus { border-color: var(--accent); }
    .form-row textarea { resize: vertical; min-height: 80px; }
    .form-row select option { background: var(--charcoal); }
    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    /* Availability chips */
    .avail-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }
    .avail-chip {
      padding: 8px;
      border: 1px solid var(--border);
      border-radius: 2px;
      text-align: center;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.15s;
      color: var(--muted);
    }
    .avail-chip.selected {
      border-color: var(--accent);
      background: #3ec9c918;
      color: var(--accent);
    }

    /* Client schedule view */
    .session-card {
      background: var(--charcoal);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 16px 20px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: border-color 0.2s;
      animation: fadeUp 0.35s ease;
    }
    .session-card:hover { border-color: var(--accent); }
    .session-time {
      font-size: 28px;
      color: var(--accent);
      min-width: 80px;
    }
    .session-info { flex: 1; }
    .session-day { font-size: 13px; color: var(--muted); }
    .session-note { font-size: 12px; color: var(--muted); margin-top: 4px; }

    /* Progress bar */
    .progress-wrap { background: var(--border); border-radius: 2px; height: 6px; }
    .progress-fill {
      height: 6px;
      border-radius: 2px;
      background: var(--accent);
      transition: width 0.5s ease;
    }

    /* Availability form grid */
    .day-avail-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
    }
    .day-avail-row:last-child { border-bottom: none; }
    .day-avail-label { min-width: 80px; font-size: 13px; color: var(--text); }
    .time-chips { display: flex; gap: 6px; flex-wrap: wrap; }
    .time-chip {
      padding: 4px 12px;
      border: 1px solid var(--border);
      border-radius: 20px;
      font-size: 11px;
      cursor: pointer;
      color: var(--muted);
      transition: all 0.15s;
    }
    .time-chip.selected { border-color: var(--accent); color: var(--accent); background: #3ec9c915; }

    /* Notification dot */
    .notif-dot {
      width: 7px; height: 7px;
      background: var(--accent);
      border-radius: 50%;
      display: inline-block;
      animation: pulse 2s infinite;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--muted);
    }
    .empty-icon { font-size: 48px; margin-bottom: 12px; }
    .empty-text { font-size: 14px; }

    /* Search input */
    .search-input {
      background: var(--charcoal);
      border: 1px solid var(--border);
      border-radius: 2px;
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      padding: 8px 14px;
      outline: none;
      width: 220px;
      transition: border-color 0.2s;
    }
    .search-input:focus { border-color: var(--accent); }

    /* Two-col grid */
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

    @media (max-width: 900px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .week-grid { grid-template-columns: repeat(3, 1fr); }
      .two-col { grid-template-columns: 1fr; }
    }
  `}</style>
);

// ─── Supabase ─────────────────────────────────────────────────────────────────
// Hash password using SHA-256 (one-way, irreversible)
const hashPassword = async (password) => {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

const SUPABASE_URL = "https://rdklpaqlkbpmmxvmzppj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJka2xwYXFsa2JwbW14dm16cHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjM2MDUsImV4cCI6MjA4NzA5OTYwNX0.6Hwgvz4CHANbYXciRp_T7aQwXhOIB2KAVwjsdxUn_d0";
const TABLE_MAP = { gym_clients:"clients", gym_sessions:"sessions", gym_availability:"availability" };

const sbFetch = async (path, method="GET", body=null, extraHeaders={}) => {
  try {
    const opts = {
      method,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        ...extraHeaders
      }
    };
    if (body !== null) opts.body = JSON.stringify(body);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, opts);
    const text = await res.text();
    if (!text) return [];
    const data = JSON.parse(text);
    if (data && data.code) { console.error("Supabase error:", data.message); return null; }
    return data;
  } catch(e) {
    console.error("sbFetch error:", e);
    return null;
  }
};

// ─── Storage helpers ──────────────────────────────────────────────────────────
const store = {
  async get(key) {
    try {
      const table = TABLE_MAP[key];
      if (!table) return null;
      const rows = await sbFetch(`${table}?select=*&order=id`);
      console.log(`Supabase ${table}: got ${rows ? rows.length : 0} rows`);
      if (!rows || rows.length === 0) return null;
      if (key === "gym_sessions") {
        return rows.map(r => ({
          ...r,
          clientIds: Array.isArray(r.clientIds) ? r.clientIds : 
            (typeof r.clientIds === "string" ? JSON.parse(r.clientIds) : [])
        }));
      }
      return rows;
    } catch(e) { console.error("store.get error:", e); return null; }
  },
  async set(key, val) {
    try {
      const table = TABLE_MAP[key];
      if (!table || !val || val.length === 0) return;
      // Upsert all rows — inserts new, updates existing
      await sbFetch(table, "POST", val, { 
        Prefer: "resolution=merge-duplicates,return=minimal" 
      });
    } catch(e) { console.error("store.set error:", e); }
  },
  async upsertOne(key, row) {
    try {
      const table = TABLE_MAP[key];
      if (!table) return;
      await sbFetch(table, "POST", [row], { 
        Prefer: "resolution=merge-duplicates,return=minimal" 
      });
    } catch(e) { console.error("store.upsertOne error:", e); }
  },
  async remove(key, id) {
    try {
      const table = TABLE_MAP[key];
      if (!table) return;
      await sbFetch(`${table}?id=eq.${encodeURIComponent(id)}`, "DELETE");
    } catch(e) { console.error("store.remove error:", e); }
  }
};

// ─── Seed data ────────────────────────────────────────────────────────────────
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const TIMES = ["7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","5:00 PM","6:00 PM","7:00 PM"];

const seedClients = () => [
  { id:"c1",   name:"Abdel",            email:"abdel@gym.com",            password:"abdel123", sessionsTotal:28, sessionsUsed:8, active:true },
  { id:"c2",   name:"Adil",             email:"", password:"", sessionsTotal:30, sessionsUsed:30, active:true },
  { id:"c3",   name:"Amelie",           email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c4",   name:"Anna",             email:"", password:"", sessionsTotal:28, sessionsUsed:11, active:true },
  { id:"c5",   name:"Anika",            email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c6",   name:"Anthony",          email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
  { id:"c7",   name:"Ashley",           email:"", password:"", sessionsTotal:28, sessionsUsed:6, active:true },
  { id:"c8",   name:"Asma",             email:"", password:"", sessionsTotal:30, sessionsUsed:29, active:true },
  { id:"c9",   name:"Aurelien",         email:"", password:"", sessionsTotal:48, sessionsUsed:40, active:true },
  { id:"c10",  name:"Melissa",          email:"", password:"", sessionsTotal:48, sessionsUsed:41, active:true },
  { id:"c11",  name:"Beer",             email:"", password:"", sessionsTotal:28, sessionsUsed:25, active:true },
  { id:"c12",  name:"Caitlin",          email:"", password:"", sessionsTotal:28, sessionsUsed:22, active:true },
  { id:"c13",  name:"Carla",            email:"", password:"", sessionsTotal:28, sessionsUsed:9, active:true },
  { id:"c14",  name:"Carole M",         email:"", password:"", sessionsTotal:28, sessionsUsed:24, active:true },
  { id:"c15",  name:"Celine",           email:"", password:"", sessionsTotal:28, sessionsUsed:17, active:true },
  { id:"c16",  name:"Clara",            email:"", password:"", sessionsTotal:30, sessionsUsed:8, active:true },
  { id:"c17",  name:"Claudio",          email:"", password:"", sessionsTotal:28, sessionsUsed:11, active:true },
  { id:"c18",  name:"Chantal",          email:"", password:"", sessionsTotal:24, sessionsUsed:10, active:true },
  { id:"c19",  name:"Cheryl",           email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c20",  name:"Chris",            email:"", password:"", sessionsTotal:24, sessionsUsed:24, active:true },
  { id:"c21",  name:"Daniel",           email:"", password:"", sessionsTotal:28, sessionsUsed:27, active:true },
  { id:"c22",  name:"Genevieve",        email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
  { id:"c23",  name:"Dave",             email:"", password:"", sessionsTotal:28, sessionsUsed:5, active:true },
  { id:"c24",  name:"Dmytro",           email:"", password:"", sessionsTotal:24, sessionsUsed:10, active:true },
  { id:"c25",  name:"Elaine",           email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c26",  name:"Elise",            email:"", password:"", sessionsTotal:24, sessionsUsed:18, active:true },
  { id:"c27",  name:"Elyse CH",         email:"", password:"", sessionsTotal:10, sessionsUsed:6, active:true },
  { id:"c28",  name:"Elyse CO",         email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c29",  name:"Erin",             email:"", password:"", sessionsTotal:24, sessionsUsed:18, active:true },
  { id:"c30",  name:"Fabio",            email:"", password:"", sessionsTotal:24, sessionsUsed:24, active:true },
  { id:"c31",  name:"Farah",            email:"", password:"", sessionsTotal:45, sessionsUsed:45, active:true },
  { id:"c32",  name:"Foujane",          email:"", password:"", sessionsTotal:28, sessionsUsed:19, active:true },
  { id:"c33",  name:"Gabby",            email:"", password:"", sessionsTotal:30, sessionsUsed:11, active:true },
  { id:"c34",  name:"Gen",              email:"", password:"", sessionsTotal:28, sessionsUsed:5, active:true },
  { id:"c35",  name:"Georges",          email:"", password:"", sessionsTotal:56, sessionsUsed:24, active:true },
  { id:"c36",  name:"Hughes",           email:"", password:"", sessionsTotal:8, sessionsUsed:1, active:true },
  { id:"c37",  name:"Isabelle",         email:"", password:"", sessionsTotal:28, sessionsUsed:16, active:true },
  { id:"c38",  name:"Luc",              email:"", password:"", sessionsTotal:28, sessionsUsed:16, active:true },
  { id:"c39",  name:"Isabelle2",        email:"", password:"", sessionsTotal:10, sessionsUsed:10, active:true },
  { id:"c40",  name:"Lea",              email:"", password:"", sessionsTotal:10, sessionsUsed:7, active:true },
  { id:"c41",  name:"Janine",           email:"", password:"", sessionsTotal:24, sessionsUsed:13, active:true },
  { id:"c42",  name:"Pierre",           email:"", password:"", sessionsTotal:24, sessionsUsed:12, active:true },
  { id:"c43",  name:"Jean",             email:"", password:"", sessionsTotal:60, sessionsUsed:59, active:true },
  { id:"c44",  name:"Jose",             email:"", password:"", sessionsTotal:60, sessionsUsed:60, active:true },
  { id:"c45",  name:"Jeremie",          email:"", password:"", sessionsTotal:24, sessionsUsed:11, active:true },
  { id:"c46",  name:"Jess",             email:"", password:"", sessionsTotal:30, sessionsUsed:30, active:true },
  { id:"c47",  name:"Joe",              email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c48",  name:"Filo",             email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c49",  name:"JohanneM",         email:"", password:"", sessionsTotal:10, sessionsUsed:10, active:true },
  { id:"c50",  name:"John V",           email:"", password:"", sessionsTotal:28, sessionsUsed:22, active:true },
  { id:"c51",  name:"John Scott",       email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
  { id:"c52",  name:"Julie B",          email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c53",  name:"Julien",           email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
  { id:"c54",  name:"JP Grilli",        email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c55",  name:"Karine",           email:"", password:"", sessionsTotal:30, sessionsUsed:10, active:true },
  { id:"c56",  name:"Keiths",           email:"", password:"", sessionsTotal:24, sessionsUsed:24, active:true },
  { id:"c57",  name:"Kevin",            email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
  { id:"c58",  name:"Kim",              email:"", password:"", sessionsTotal:28, sessionsUsed:11, active:true },
  { id:"c59",  name:"Louise",           email:"", password:"", sessionsTotal:24, sessionsUsed:17, active:true },
  { id:"c60",  name:"Lizon",            email:"", password:"", sessionsTotal:24, sessionsUsed:23, active:true },
  { id:"c61",  name:"Lynn",             email:"", password:"", sessionsTotal:28, sessionsUsed:21, active:true },
  { id:"c62",  name:"Malina",           email:"", password:"", sessionsTotal:24, sessionsUsed:21, active:true },
  { id:"c63",  name:"Malika",           email:"", password:"", sessionsTotal:6, sessionsUsed:6, active:true },
  { id:"c64",  name:"Marc P",           email:"", password:"", sessionsTotal:28, sessionsUsed:10, active:true },
  { id:"c65",  name:"Marco",            email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c66",  name:"Marie",            email:"", password:"", sessionsTotal:24, sessionsUsed:17, active:true },
  { id:"c67",  name:"Marianne",         email:"", password:"", sessionsTotal:24, sessionsUsed:20, active:true },
  { id:"c68",  name:"Mateo",            email:"", password:"", sessionsTotal:30, sessionsUsed:30, active:true },
  { id:"c69",  name:"Matthew",          email:"", password:"", sessionsTotal:24, sessionsUsed:9, active:true },
  { id:"c70",  name:"Matthew2",         email:"", password:"", sessionsTotal:24, sessionsUsed:18, active:true },
  { id:"c71",  name:"Mathis",           email:"", password:"", sessionsTotal:6, sessionsUsed:6, active:true },
  { id:"c72",  name:"Matt G",           email:"", password:"", sessionsTotal:32, sessionsUsed:22, active:true },
  { id:"c73",  name:"Maude",            email:"", password:"", sessionsTotal:24, sessionsUsed:2, active:true },
  { id:"c74",  name:"Marie-Claude",     email:"", password:"", sessionsTotal:24, sessionsUsed:14, active:true },
  { id:"c75",  name:"Mark",             email:"", password:"", sessionsTotal:30, sessionsUsed:12, active:true },
  { id:"c76",  name:"Sienna",           email:"", password:"", sessionsTotal:30, sessionsUsed:9, active:true },
  { id:"c77",  name:"Mary",             email:"", password:"", sessionsTotal:24, sessionsUsed:4, active:true },
  { id:"c78",  name:"Maurizio",         email:"", password:"", sessionsTotal:24, sessionsUsed:16, active:true },
  { id:"c79",  name:"Max B",            email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c80",  name:"Max L",            email:"", password:"", sessionsTotal:30, sessionsUsed:11, active:true },
  { id:"c81",  name:"Maxime",           email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c82",  name:"Mehdi",            email:"", password:"", sessionsTotal:30, sessionsUsed:22, active:true },
  { id:"c83",  name:"Meryen",           email:"", password:"", sessionsTotal:28, sessionsUsed:23, active:true },
  { id:"c84",  name:"MichelleB",        email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c85",  name:"MichelleS",        email:"", password:"", sessionsTotal:24, sessionsUsed:1, active:true },
  { id:"c86",  name:"MichelleT",        email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c87",  name:"Mike",             email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
  { id:"c88",  name:"Mila",             email:"", password:"", sessionsTotal:24, sessionsUsed:20, active:true },
  { id:"c89",  name:"Mireille",         email:"", password:"", sessionsTotal:28, sessionsUsed:12, active:true },
  { id:"c90",  name:"Nada",             email:"", password:"", sessionsTotal:10, sessionsUsed:10, active:true },
  { id:"c91",  name:"Nadine B",         email:"", password:"", sessionsTotal:24, sessionsUsed:3, active:true },
  { id:"c92",  name:"Nafiseh",          email:"", password:"", sessionsTotal:24, sessionsUsed:17, active:true },
  { id:"c93",  name:"Nancy D",          email:"", password:"", sessionsTotal:24, sessionsUsed:14, active:true },
  { id:"c94",  name:"Nancy Y",          email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c95",  name:"Nardine",          email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c96",  name:"Natasha",          email:"", password:"", sessionsTotal:28, sessionsUsed:13, active:true },
  { id:"c97",  name:"Nathalie P",       email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
  { id:"c98",  name:"Nick",             email:"", password:"", sessionsTotal:28, sessionsUsed:19, active:true },
  { id:"c99",  name:"Lucas",            email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c100", name:"Nishi",            email:"", password:"", sessionsTotal:24, sessionsUsed:8, active:true },
  { id:"c101", name:"Phil",             email:"", password:"", sessionsTotal:28, sessionsUsed:22, active:true },
  { id:"c102", name:"Matt",             email:"", password:"", sessionsTotal:28, sessionsUsed:22, active:true },
  { id:"c103", name:"Rachel",           email:"", password:"", sessionsTotal:30, sessionsUsed:30, active:true },
  { id:"c104", name:"Rachel2",          email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c105", name:"Rami",             email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c106", name:"Renelle",          email:"", password:"", sessionsTotal:28, sessionsUsed:25, active:true },
  { id:"c107", name:"ReneeM",           email:"", password:"", sessionsTotal:28, sessionsUsed:27, active:true },
  { id:"c108", name:"ReneeP",           email:"", password:"", sessionsTotal:28, sessionsUsed:19, active:true },
  { id:"c109", name:"Reuven",           email:"", password:"", sessionsTotal:28, sessionsUsed:21, active:true },
  { id:"c110", name:"Rodica",           email:"", password:"", sessionsTotal:24, sessionsUsed:7, active:true },
  { id:"c111", name:"Romy",             email:"", password:"", sessionsTotal:28, sessionsUsed:6, active:true },
  { id:"c112", name:"Rozita",           email:"", password:"", sessionsTotal:28, sessionsUsed:7, active:true },
  { id:"c113", name:"Sabrina",          email:"", password:"", sessionsTotal:24, sessionsUsed:7, active:true },
  { id:"c114", name:"Sandy",            email:"", password:"", sessionsTotal:10, sessionsUsed:7, active:true },
  { id:"c115", name:"Sarah",            email:"", password:"", sessionsTotal:30, sessionsUsed:4, active:true },
  { id:"c116", name:"Sam",              email:"", password:"", sessionsTotal:24, sessionsUsed:4, active:true },
  { id:"c117", name:"Mira",             email:"", password:"", sessionsTotal:24, sessionsUsed:5, active:true },
  { id:"c118", name:"Sean",             email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
  { id:"c119", name:"Simon",            email:"", password:"", sessionsTotal:28, sessionsUsed:15, active:true },
  { id:"c120", name:"Sita",             email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c121", name:"Sherriff",         email:"", password:"", sessionsTotal:28, sessionsUsed:11, active:true },
  { id:"c122", name:"Sonia",            email:"", password:"", sessionsTotal:24, sessionsUsed:23, active:true },
  { id:"c123", name:"Sophie",           email:"", password:"", sessionsTotal:28, sessionsUsed:27, active:true },
  { id:"c124", name:"Staci",            email:"", password:"", sessionsTotal:24, sessionsUsed:21, active:true },
  { id:"c125", name:"StephV",           email:"", password:"", sessionsTotal:28, sessionsUsed:25, active:true },
  { id:"c126", name:"Susan",            email:"", password:"", sessionsTotal:28, sessionsUsed:18, active:true },
  { id:"c127", name:"Susan/Klaus",      email:"", password:"", sessionsTotal:20, sessionsUsed:0, active:true },
  { id:"c128", name:"Klaus",            email:"", password:"", sessionsTotal:28, sessionsUsed:18, active:true },
  { id:"c129", name:"Sylvie",           email:"", password:"", sessionsTotal:28, sessionsUsed:23, active:true },
  { id:"c130", name:"Tanya",            email:"", password:"", sessionsTotal:28, sessionsUsed:27, active:true },
  { id:"c131", name:"Thierry",          email:"", password:"", sessionsTotal:24, sessionsUsed:16, active:true },
  { id:"c132", name:"Ujjaval",          email:"", password:"", sessionsTotal:28, sessionsUsed:17, active:true },
  { id:"c133", name:"Tyler",            email:"", password:"", sessionsTotal:28, sessionsUsed:27, active:true },
  { id:"c134", name:"Val Maheux",       email:"", password:"", sessionsTotal:11, sessionsUsed:11, active:true },
  { id:"c135", name:"Yannie",           email:"", password:"", sessionsTotal:28, sessionsUsed:28, active:true },
];

const seedSessions = () => [
  { id:"s_2026-02-02_7", date:"2026-02-02", time:"7:00 AM", clientIds:["c9", "c49", "c72", "c97", "c10", "c109"], notes:"" },
  { id:"s_2026-02-02_8", date:"2026-02-02", time:"8:00 AM", clientIds:["c18", "c133", "c106", "c58", "c134", "c96"], notes:"" },
  { id:"s_2026-02-02_9", date:"2026-02-02", time:"9:00 AM", clientIds:["c56", "c129", "c59", "c118", "c67"], notes:"" },
  { id:"s_2026-02-02_10", date:"2026-02-02", time:"10:00 AM", clientIds:["c71"], notes:"" },
  { id:"s_2026-02-02_17", date:"2026-02-02", time:"5:00 PM", clientIds:["c6", "c47", "c48", "c64", "c119", "c16"], notes:"" },
  { id:"s_2026-02-02_18", date:"2026-02-02", time:"6:00 PM", clientIds:["c2", "c63", "c14", "c69", "c82"], notes:"" },
  { id:"s_2026-02-02_19", date:"2026-02-02", time:"7:00 PM", clientIds:["c1", "c70", "c31", "c35", "c75", "c76"], notes:"" },
  { id:"s_2026-02-03_8", date:"2026-02-03", time:"8:00 AM", clientIds:["c8", "c24", "c125", "c135", "c58", "c89"], notes:"" },
  { id:"s_2026-02-03_9", date:"2026-02-03", time:"9:00 AM", clientIds:["c83", "c15", "c61", "c68", "c118", "c122"], notes:"" },
  { id:"s_2026-02-03_10", date:"2026-02-03", time:"10:00 AM", clientIds:["c126", "c41", "c42", "c43", "c44", "c98"], notes:"" },
  { id:"s_2026-02-03_17", date:"2026-02-03", time:"5:00 PM", clientIds:["c113", "c49", "c51", "c108", "c26", "c91"], notes:"" },
  { id:"s_2026-02-03_18", date:"2026-02-03", time:"6:00 PM", clientIds:["c29", "c39", "c88", "c82", "c17", "c50"], notes:"" },
  { id:"s_2026-02-03_19", date:"2026-02-03", time:"7:00 PM", clientIds:["c13", "c30", "c4", "c53", "c57", "c124"], notes:"" },
  { id:"s_2026-02-04_8", date:"2026-02-04", time:"8:00 AM", clientIds:["c62", "c122", "c83", "c87", "c11", "c109"], notes:"" },
  { id:"s_2026-02-04_9", date:"2026-02-04", time:"9:00 AM", clientIds:["c75", "c90", "c67", "c100", "c20", "c56"], notes:"" },
  { id:"s_2026-02-04_10", date:"2026-02-04", time:"10:00 AM", clientIds:["c35", "c113", "c119", "c110"], notes:"" },
  { id:"s_2026-02-04_17", date:"2026-02-04", time:"5:00 PM", clientIds:["c47", "c48", "c55", "c64", "c37", "c38"], notes:"" },
  { id:"s_2026-02-04_18", date:"2026-02-04", time:"6:00 PM", clientIds:["c2", "c27", "c69", "c92", "c96", "c103"], notes:"" },
  { id:"s_2026-02-04_19", date:"2026-02-04", time:"7:00 PM", clientIds:["c14", "c21", "c22", "c114", "c70"], notes:"" },
  { id:"s_2026-02-05_8", date:"2026-02-05", time:"8:00 AM", clientIds:["c9", "c8", "c24", "c125", "c109", "c89"], notes:"" },
  { id:"s_2026-02-05_9", date:"2026-02-05", time:"9:00 AM", clientIds:["c126", "c20", "c26", "c107", "c68", "c106"], notes:"" },
  { id:"s_2026-02-05_10", date:"2026-02-05", time:"10:00 AM", clientIds:["c63", "c41", "c42", "c129", "c60"], notes:"" },
  { id:"s_2026-02-05_17", date:"2026-02-05", time:"5:00 PM", clientIds:["c50", "c51", "c108", "c134", "c88", "c93"], notes:"" },
  { id:"s_2026-02-05_18", date:"2026-02-05", time:"6:00 PM", clientIds:["c29", "c39", "c33", "c124", "c34", "c49"], notes:"" },
  { id:"s_2026-02-05_19", date:"2026-02-05", time:"7:00 PM", clientIds:["c13", "c45", "c53", "c115", "c71", "c4"], notes:"" },
  { id:"s_2026-02-06_7", date:"2026-02-06", time:"7:00 AM", clientIds:["c11", "c10", "c72", "c97", "c57", "c109"], notes:"" },
  { id:"s_2026-02-06_8", date:"2026-02-06", time:"8:00 AM", clientIds:["c61", "c119", "c132", "c135", "c66"], notes:"" },
  { id:"s_2026-02-06_9", date:"2026-02-06", time:"9:00 AM", clientIds:["c43", "c44", "c56", "c126", "c130", "c77"], notes:"" },
  { id:"s_2026-02-06_10", date:"2026-02-06", time:"10:00 AM", clientIds:["c113", "c100"], notes:"" },
  { id:"s_2026-02-07_8", date:"2026-02-07", time:"8:00 AM", clientIds:["c6", "c30", "c97", "c121", "c78", "c87"], notes:"" },
  { id:"s_2026-02-07_9", date:"2026-02-07", time:"9:00 AM", clientIds:["c17", "c37", "c38", "c134", "c92", "c90"], notes:"" },
  { id:"s_2026-02-07_10", date:"2026-02-07", time:"10:00 AM", clientIds:["c21", "c22", "c75", "c76", "c14", "c114"], notes:"" },
  { id:"s_2026-02-07_11", date:"2026-02-07", time:"11:00 AM", clientIds:["c89", "c70", "c53"], notes:"" },
  { id:"s_2026-02-09_7", date:"2026-02-09", time:"7:00 AM", clientIds:["c9", "c49", "c72", "c109", "c10", "c96"], notes:"" },
  { id:"s_2026-02-09_8", date:"2026-02-09", time:"8:00 AM", clientIds:["c8", "c135", "c133", "c122", "c60"], notes:"" },
  { id:"s_2026-02-09_9", date:"2026-02-09", time:"9:00 AM", clientIds:["c32", "c56", "c100", "c107"], notes:"" },
  { id:"s_2026-02-09_10", date:"2026-02-09", time:"10:00 AM", clientIds:["c119", "c124", "c1"], notes:"" },
  { id:"s_2026-02-09_17", date:"2026-02-09", time:"5:00 PM", clientIds:["c47", "c48", "c64", "c93", "c16"], notes:"" },
  { id:"s_2026-02-09_18", date:"2026-02-09", time:"6:00 PM", clientIds:["c2", "c14", "c63", "c101", "c102", "c82"], notes:"" },
  { id:"s_2026-02-09_19", date:"2026-02-09", time:"7:00 PM", clientIds:["c35", "c45", "c75", "c76", "c21", "c22"], notes:"" },
  { id:"s_2026-02-10_8", date:"2026-02-10", time:"8:00 AM", clientIds:["c24", "c18", "c119", "c58", "c125", "c133"], notes:"" },
  { id:"s_2026-02-10_9", date:"2026-02-10", time:"9:00 AM", clientIds:["c15", "c68", "c61", "c118", "c20", "c110"], notes:"" },
  { id:"s_2026-02-10_10", date:"2026-02-10", time:"10:00 AM", clientIds:["c41", "c42", "c60", "c27", "c126", "c129"], notes:"" },
  { id:"s_2026-02-10_16", date:"2026-02-10", time:"4:00 PM", clientIds:["c43", "c44", "c45", "c50", "c12", "c134"], notes:"" },
  { id:"s_2026-02-10_17", date:"2026-02-10", time:"5:00 PM", clientIds:["c51", "c37", "c38", "c91", "c113", "c108"], notes:"" },
  { id:"s_2026-02-10_18", date:"2026-02-10", time:"6:00 PM", clientIds:["c82", "c29", "c39", "c40", "c53", "c17"], notes:"" },
  { id:"s_2026-02-10_19", date:"2026-02-10", time:"7:00 PM", clientIds:["c4", "c30", "c7", "c31", "c70", "c13"], notes:"" },
  { id:"s_2026-02-11_8", date:"2026-02-11", time:"8:00 AM", clientIds:["c11", "c89", "c72", "c135", "c109", "c106"], notes:"" },
  { id:"s_2026-02-11_9", date:"2026-02-11", time:"9:00 AM", clientIds:["c122", "c56", "c67", "c75", "c90"], notes:"" },
  { id:"s_2026-02-11_10", date:"2026-02-11", time:"10:00 AM", clientIds:["c83"], notes:"" },
  { id:"s_2026-02-11_17", date:"2026-02-11", time:"5:00 PM", clientIds:["c47", "c57", "c55", "c64", "c93", "c44"], notes:"" },
  { id:"s_2026-02-11_18", date:"2026-02-11", time:"6:00 PM", clientIds:["c2", "c34", "c69", "c116", "c117", "c92"], notes:"" },
  { id:"s_2026-02-11_19", date:"2026-02-11", time:"7:00 PM", clientIds:["c14", "c49", "c114", "c21", "c22", "c118"], notes:"" },
  { id:"s_2026-02-12_8", date:"2026-02-12", time:"8:00 AM", clientIds:["c8", "c9", "c24", "c125", "c133", "c96"], notes:"" },
  { id:"s_2026-02-12_9", date:"2026-02-12", time:"9:00 AM", clientIds:["c59", "c68", "c126", "c128", "c20", "c71"], notes:"" },
  { id:"s_2026-02-12_10", date:"2026-02-12", time:"10:00 AM", clientIds:["c41", "c42", "c60", "c130", "c63", "c129"], notes:"" },
  { id:"s_2026-02-12_17", date:"2026-02-12", time:"5:00 PM", clientIds:["c23", "c50", "c134", "c51", "c108", "c119"], notes:"" },
  { id:"s_2026-02-12_18", date:"2026-02-12", time:"6:00 PM", clientIds:["c124", "c29", "c39", "c40", "c101", "c102"], notes:"" },
  { id:"s_2026-02-12_19", date:"2026-02-12", time:"7:00 PM", clientIds:["c7", "c45", "c70", "c13", "c115", "c1"], notes:"" },
  { id:"s_2026-02-13_7", date:"2026-02-13", time:"7:00 AM", clientIds:["c11", "c49", "c57", "c72", "c109", "c97"], notes:"" },
  { id:"s_2026-02-13_8", date:"2026-02-13", time:"8:00 AM", clientIds:["c66", "c132", "c135", "c133", "c89", "c26"], notes:"" },
  { id:"s_2026-02-13_9", date:"2026-02-13", time:"9:00 AM", clientIds:["c32", "c83", "c67", "c61", "c126", "c100"], notes:"" },
  { id:"s_2026-02-13_10", date:"2026-02-13", time:"10:00 AM", clientIds:["c20", "c131", "c12", "c113", "c106", "c10"], notes:"" },
  { id:"s_2026-02-14_8", date:"2026-02-14", time:"8:00 AM", clientIds:["c23", "c30", "c35", "c97", "c87", "c121"], notes:"" },
  { id:"s_2026-02-14_9", date:"2026-02-14", time:"9:00 AM", clientIds:["c70", "c37", "c38", "c75", "c76", "c92"], notes:"" },
  { id:"s_2026-02-14_10", date:"2026-02-14", time:"10:00 AM", clientIds:["c14", "c6", "c17", "c134", "c114", "c90"], notes:"" },
  { id:"s_2026-02-14_11", date:"2026-02-14", time:"11:00 AM", clientIds:["c78", "c80", "c31"], notes:"" },
  { id:"s_2026-02-16_7", date:"2026-02-16", time:"7:00 AM", clientIds:["c9", "c10", "c72", "c49", "c97", "c109"], notes:"" },
  { id:"s_2026-02-16_8", date:"2026-02-16", time:"8:00 AM", clientIds:["c66", "c133", "c134", "c135", "c122", "c8"], notes:"" },
  { id:"s_2026-02-16_9", date:"2026-02-16", time:"9:00 AM", clientIds:["c56", "c57", "c118", "c32", "c112", "c111"], notes:"" },
  { id:"s_2026-02-16_10", date:"2026-02-16", time:"10:00 AM", clientIds:["c41", "c60", "c130", "c129", "c85", "c36"], notes:"" },
  { id:"s_2026-02-16_17", date:"2026-02-16", time:"5:00 PM", clientIds:["c47", "c48", "c119", "c51", "c108", "c64"], notes:"" },
  { id:"s_2026-02-16_18", date:"2026-02-16", time:"6:00 PM", clientIds:["c2", "c63", "c101", "c102", "c21", "c14"], notes:"" },
  { id:"s_2026-02-16_19", date:"2026-02-16", time:"7:00 PM", clientIds:["c35", "c70", "c45", "c6", "c75", "c76"], notes:"" },
  { id:"s_2026-02-17_8", date:"2026-02-17", time:"8:00 AM", clientIds:["c109", "c24", "c46", "c26", "c73", "c123"], notes:"" },
  { id:"s_2026-02-17_9", date:"2026-02-17", time:"9:00 AM", clientIds:["c15", "c110", "c131", "c118", "c106", "c67"], notes:"" },
  { id:"s_2026-02-17_10", date:"2026-02-17", time:"10:00 AM", clientIds:["c27", "c41", "c60", "c59", "c90", "c71"], notes:"" },
  { id:"s_2026-02-17_17", date:"2026-02-17", time:"5:00 PM", clientIds:["c43", "c44", "c103", "c74", "c113", "c93"], notes:"" },
  { id:"s_2026-02-17_18", date:"2026-02-17", time:"6:00 PM", clientIds:["c29", "c50", "c57", "c53", "c39", "c40"], notes:"" },
  { id:"s_2026-02-17_19", date:"2026-02-17", time:"7:00 PM", clientIds:["c4", "c30", "c17", "c13", "c78", "c31"], notes:"" },
  { id:"s_2026-02-18_8", date:"2026-02-18", time:"8:00 AM", clientIds:["c125", "c72", "c18", "c62", "c135", "c89"], notes:"" },
  { id:"s_2026-02-18_9", date:"2026-02-18", time:"9:00 AM", clientIds:["c56", "c61", "c90", "c113", "c105", "c75"], notes:"" },
  { id:"s_2026-02-18_10", date:"2026-02-18", time:"10:00 AM", clientIds:["c83", "c85", "c119", "c17"], notes:"" },
  { id:"s_2026-02-18_17", date:"2026-02-18", time:"5:00 PM", clientIds:["c47", "c48", "c55", "c64", "c37", "c38"], notes:"" },
  { id:"s_2026-02-18_18", date:"2026-02-18", time:"6:00 PM", clientIds:["c2", "c33", "c34", "c27", "c92", "c49"], notes:"" },
  { id:"s_2026-02-18_19", date:"2026-02-18", time:"7:00 PM", clientIds:["c14", "c45", "c39", "c40", "c114", "c69"], notes:"" },
  { id:"s_2026-02-19_8", date:"2026-02-19", time:"8:00 AM", clientIds:["c24", "c133", "c58", "c89", "c11", "c109", "c105"], notes:"" },
  { id:"s_2026-02-19_9", date:"2026-02-19", time:"9:00 AM", clientIds:["c68", "c126", "c128", "c106", "c67", "c130", "c110"], notes:"" },
  { id:"s_2026-02-19_17", date:"2026-02-19", time:"5:00 PM", clientIds:["c43", "c44", "c51", "c134", "c88", "c103"], notes:"" },
  { id:"s_2026-02-19_18", date:"2026-02-19", time:"6:00 PM", clientIds:["c29", "c50", "c98", "c23", "c101", "c102", "c71"], notes:"" },
  { id:"s_2026-02-19_19", date:"2026-02-19", time:"7:00 PM", clientIds:["c4", "c124", "c13", "c70", "c115", "c111", "c63"], notes:"" },

  { id:"s_2026-02-20_7", date:"2026-02-20", time:"7:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-20_8", date:"2026-02-20", time:"8:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-20_9", date:"2026-02-20", time:"9:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-20_10", date:"2026-02-20", time:"10:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-21_8", date:"2026-02-21", time:"8:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-21_9", date:"2026-02-21", time:"9:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-21_10", date:"2026-02-21", time:"10:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-21_11", date:"2026-02-21", time:"11:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-23_7", date:"2026-02-23", time:"7:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-23_8", date:"2026-02-23", time:"8:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-23_9", date:"2026-02-23", time:"9:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-23_10", date:"2026-02-23", time:"10:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-23_17", date:"2026-02-23", time:"5:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-23_18", date:"2026-02-23", time:"6:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-23_19", date:"2026-02-23", time:"7:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-24_7", date:"2026-02-24", time:"7:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-24_8", date:"2026-02-24", time:"8:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-24_9", date:"2026-02-24", time:"9:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-24_10", date:"2026-02-24", time:"10:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-24_17", date:"2026-02-24", time:"5:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-24_18", date:"2026-02-24", time:"6:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-24_19", date:"2026-02-24", time:"7:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-25_7", date:"2026-02-25", time:"7:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-25_8", date:"2026-02-25", time:"8:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-25_9", date:"2026-02-25", time:"9:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-25_10", date:"2026-02-25", time:"10:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-25_17", date:"2026-02-25", time:"5:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-25_18", date:"2026-02-25", time:"6:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-25_19", date:"2026-02-25", time:"7:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-26_7", date:"2026-02-26", time:"7:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-26_8", date:"2026-02-26", time:"8:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-26_9", date:"2026-02-26", time:"9:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-26_10", date:"2026-02-26", time:"10:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-26_17", date:"2026-02-26", time:"5:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-26_18", date:"2026-02-26", time:"6:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-26_19", date:"2026-02-26", time:"7:00 PM", clientIds:[], notes:"" },
  { id:"s_2026-02-27_7", date:"2026-02-27", time:"7:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-27_8", date:"2026-02-27", time:"8:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-27_9", date:"2026-02-27", time:"9:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-27_10", date:"2026-02-27", time:"10:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-28_8", date:"2026-02-28", time:"8:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-28_9", date:"2026-02-28", time:"9:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-28_10", date:"2026-02-28", time:"10:00 AM", clientIds:[], notes:"" },
  { id:"s_2026-02-28_11", date:"2026-02-28", time:"11:00 AM", clientIds:[], notes:"" },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null); // { role:'trainer'|'client', ...data }
  const [clients, setClients] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [previewClient, setPreviewClient] = useState(null);

  // Load from Supabase, seed only if empty
  useEffect(() => {
    (async () => {
      let c = await store.get("gym_clients");
      let s = await store.get("gym_sessions");
      if (!c) { c = []; }
      if (!s) { s = []; }
      setClients(c);
      setSessions(s);
      setLoaded(true);
    })();
  }, []);

  const saveClients = async (updated, changedRow=null) => {
    setClients(updated);
    if (changedRow) {
      await store.upsertOne("gym_clients", changedRow);
    } else {
      await store.set("gym_clients", updated);
    }
  };
  const saveSessions = async (updated, changedRow=null) => {
    setSessions(updated);
    if (changedRow) {
      await store.upsertOne("gym_sessions", changedRow);
    } else {
      await store.set("gym_sessions", updated);
    }
  };

  if (!loaded) return (
    <>
      <GlobalStyle />
      <div className="login-wrap"><div style={{color:"var(--muted)",fontSize:14}}>Loading...</div></div>
    </>
  );

  if (!user) return (
    <>
      <GlobalStyle />
      <LoginScreen clients={clients} onLogin={setUser} saveClients={saveClients} />
    </>
  );

  return (
    <>
      <GlobalStyle />
      {user.role === "trainer" && !previewClient
        ? <TrainerApp user={user} clients={clients} sessions={sessions} setSessions={setSessions} saveClients={saveClients} saveSessions={saveSessions} onLogout={() => setUser(null)} onPreviewClient={setPreviewClient} />
        : user.role === "trainer" && previewClient
        ? (
          <>
            <div style={{
              position:"fixed",top:0,left:0,right:0,zIndex:9999,
              background:"var(--accent)",color:"var(--black)",
              padding:"8px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",
              fontSize:13,fontWeight:600
            }}>
              <span>👁 Viewing as {previewClient.name} — this is what they see</span>
              <button onClick={()=>setPreviewClient(null)} style={{
                background:"var(--black)",color:"var(--accent)",border:"none",
                padding:"4px 14px",borderRadius:2,cursor:"pointer",fontWeight:700,fontSize:12
              }}>← Back to Trainer View</button>
            </div>
            <div style={{marginTop:40}}>
              <ClientApp user={{role:"client",...previewClient}} clients={clients} sessions={sessions} saveClients={saveClients} onLogout={()=>setPreviewClient(null)} />
            </div>
          </>
          )
        : <ClientApp user={user} clients={clients} sessions={sessions} saveClients={saveClients} onLogout={() => setUser(null)} />
      }
    </>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ clients, onLogin, saveClients }) {
  // Check for ?signup=cXXX in URL
  const urlParams = new URLSearchParams(window.location.search);
  const signupId = urlParams.get("signup");

  const [mode, setMode] = useState(signupId ? "setup" : "login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  // Setup state
  const [selectedId, setSelectedId] = useState(signupId || "");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [setupErr, setSetupErr] = useState("");

  const [freshClients, setFreshClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  useEffect(() => {
    store.get("gym_clients").then(c => {
      setFreshClients(c || clients);
      setLoadingClients(false);
    });
  }, []);

  const signupClient = freshClients.find(c => c.id === signupId);
  const unclaimedClients = freshClients.filter(c => !c.email).sort((a,b) => a.name.localeCompare(b.name));

  const submit = async () => {
    setErr("");
    if (email === "trainer@gym.com" && pass === import.meta.env.VITE_TRAINER_PASSWORD) {
      onLogin({ role:"trainer", name:"Coach", email });
      return;
    }
    if (!email || !pass) { setErr("Please enter your email and password."); return; }
    const hashed = await hashPassword(pass);
    const c = freshClients.find(x => x.email && x.email === email && x.password && x.password === hashed);
    if (c) { onLogin({ role:"client", ...c }); return; }
    setErr("Invalid email or password.");
  };

  const submitSetup = async () => {
    setSetupErr("");
    if (!selectedId) return setSetupErr("Please select your name.");
    if (!newEmail.includes("@")) return setSetupErr("Enter a valid email address.");
    if (newPass.length < 6) return setSetupErr("Password must be at least 6 characters.");
    if (newPass !== newPass2) return setSetupErr("Passwords don't match.");
    if (freshClients.find(x => x.email === newEmail && x.id !== selectedId)) return setSetupErr("That email is already taken.");
    const client = freshClients.find(c => c.id === selectedId);
    const hashed = await hashPassword(newPass);
    const updatedClient = {...client, email: newEmail, password: hashed};
    const updated = freshClients.map(c => c.id === selectedId ? updatedClient : c);
    await saveClients(updated, updatedClient);
    onLogin({ role:"client", ...updatedClient });
  };

  if (mode === "setup") return (
    <div className="login-wrap">
      <div className="login-box" style={{width:420}}>
        <div className="bebas login-logo">ML FITNESS</div>
        <div className="login-sub">Create Your Account</div>
        {setupErr && <div className="error-msg">{setupErr}</div>}
        {loadingClients ? (
          <div style={{textAlign:"center",color:"var(--muted)",padding:"20px 0"}}>Loading...</div>
        ) : !signupId ? (
          // No personal link — block signup
          <div style={{
            background:"var(--charcoal)",border:"1px solid var(--border)",
            borderRadius:4,padding:"20px",marginBottom:16,textAlign:"center"
          }}>
            <div style={{fontSize:28,marginBottom:8}}>🔒</div>
            <div style={{fontWeight:600,color:"var(--text)",marginBottom:6}}>Personal Link Required</div>
            <div style={{fontSize:12,color:"var(--muted)"}}>Please use the personal signup link your trainer sent you.</div>
          </div>
        ) : !signupClient ? (
          <div style={{color:"var(--red)",marginBottom:16,textAlign:"center"}}>Invalid or expired signup link.</div>
        ) : signupClient.email ? (
          <div style={{
            background:"var(--charcoal)",border:"1px solid var(--border)",
            borderRadius:4,padding:"20px",marginBottom:16,textAlign:"center"
          }}>
            <div style={{fontSize:28,marginBottom:8}}>✅</div>
            <div style={{fontWeight:600,color:"var(--text)",marginBottom:6}}>Account already created</div>
            <div style={{fontSize:12,color:"var(--muted)"}}>Please sign in instead.</div>
          </div>
        ) : (
          <div style={{
            background:"var(--charcoal)",border:"1px solid var(--accent)",
            borderRadius:4,padding:"14px 18px",marginBottom:16,
            display:"flex",alignItems:"center",gap:12
          }}>
            <div className="user-avatar" style={{background:"var(--accent)",color:"var(--black)",fontSize:13,flexShrink:0}}>
              {signupClient.name.split(" ").map(x=>x[0]).join("")}
            </div>
            <div>
              <div style={{fontWeight:600,color:"var(--text)"}}>{signupClient.name}</div>
              <div style={{fontSize:11,color:"var(--muted)"}}>Your personal signup link ✓</div>
            </div>
          </div>
        )}
        {signupId && signupClient && !signupClient.email && !loadingClients && (<>
        <div className="field-label">Your Email</div>
        <input className="field-input" type="email" placeholder="you@email.com" value={newEmail} onChange={e=>setNewEmail(e.target.value)} />
        <div className="field-label">Choose a Password</div>
        <input className="field-input" type="password" placeholder="Min. 6 characters" value={newPass} onChange={e=>setNewPass(e.target.value)} />
        <div className="field-label">Confirm Password</div>
        <input className="field-input" type="password" placeholder="Repeat password" value={newPass2} onChange={e=>setNewPass2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitSetup()} />
        <button className="btn-primary" onClick={submitSetup}>CREATE ACCOUNT</button>
        </>)}
        <div className="switch-link"><span onClick={()=>{ setMode("login"); window.history.replaceState({},"",window.location.pathname); }}>← Back to sign in</span></div>
      </div>
    </div>
  );

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="bebas login-logo">ML FITNESS</div>
        <div className="login-sub">Scheduling Portal</div>
        {err && <div className="error-msg">{err}</div>}
        <div className="field-label">Email</div>
        <input className="field-input" type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
        <div className="field-label">Password</div>
        <input className="field-input" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
        <button className="btn-primary" onClick={submit}>SIGN IN</button>
        <div className="switch-link" style={{marginTop:16,color:"var(--muted)",fontSize:12}}>
          New? Use the personal link your trainer sent you.
        </div>
      </div>
    </div>
  );
}

// ─── Trainer App ──────────────────────────────────────────────────────────────
function TrainerApp({ user, clients, sessions, setSessions, saveClients, saveSessions, onLogout, onPreviewClient }) {
  const [tab, setTab] = useState("schedule");
  const nav = [
    { id:"schedule", icon:"📅", label:"Schedule" },
    { id:"clients", icon:"👥", label:"Clients" },
    { id:"availability", icon:"📋", label:"Availability" },
    { id:"progress", icon:"💪", label:"Progress" },
    { id:"agent", icon:"🤖", label:"AI Agent" },
  ];

  return (
    <div className="app-shell">
      <Sidebar user={user} nav={nav} tab={tab} setTab={setTab} onLogout={onLogout} role="TRAINER" />
      <div className="main-content" style={{overflowY:"auto"}}>
        {tab === "schedule" && <TrainerSchedule clients={clients} sessions={sessions} saveSessions={saveSessions} />}
        {tab === "clients" && <TrainerClients clients={clients} sessions={sessions} saveClients={saveClients} deleteClient={(id)=>setClients(prev=>prev.filter(c=>c.id!==id))} onPreviewClient={onPreviewClient} />}
        {tab === "availability" && <TrainerAvailability clients={clients} sessions={sessions} saveSessions={saveSessions} />}
        {tab === "progress" && <TrainerProgress clients={clients} />}
        {tab === "agent" && <AIAgent clients={clients} sessions={sessions} setSessions={setSessions} />}
      </div>
    </div>
  );
}

function TrainerSchedule({ clients, sessions, saveSessions }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ date:"", time:"7:00 AM", clientIds:[], notes:"" });
  const [availabilities, setAvailabilities] = useState([]);
  const [showAvailOnly, setShowAvailOnly] = useState(false);

  useEffect(() => {
    store.get("gym_availability").then(a => setAvailabilities(a||[]));
  }, []);

  const DAY_ABBREVS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const isAvailable = (clientId, date, time) => {
    const avail = availabilities.find(a => a.clientId === clientId);
    if (!avail) return false;
    const d = new Date(date + "T12:00:00");
    const dayName = DAY_ABBREVS[d.getDay()];
    return avail.slots.some(slot => slot === dayName + " " + time);
  };

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  // Sessions are stored with a `date` string "YYYY-MM-DD" for monthly view
  // Fall back to old `day` (0-6 weekday) for legacy seed sessions
  const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

  const sessionsForDate = (d) => {
    const key = dateKey(d);
    // match by date string OR by weekday (legacy)
    return sessions.filter(s => {
      if (s.date) return s.date === key;
      // legacy: match weekday — js getDay() 0=Sun, our DAYS 0=Mon
      const jsDay = d.getDay();
      const ourDay = jsDay === 0 ? 6 : jsDay - 1;
      return s.day === ourDay;
    }).sort((a,b) => TIMES.indexOf(a.time) - TIMES.indexOf(b.time));
  };

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth+1, 0);
  const startPad = firstDay.getDay(); // 0=Sun
  const totalCells = Math.ceil((startPad + lastDay.getDate()) / 7) * 7;
  const cells = Array.from({length: totalCells}, (_,i) => {
    const d = new Date(viewYear, viewMonth, i - startPad + 1);
    return d.getMonth() === viewMonth ? d : null;
  });

  const prevMonth = () => { if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else{setViewMonth(m=>m-1);} setSelectedDate(null); };
  const nextMonth = () => { if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else{setViewMonth(m=>m+1);} setSelectedDate(null); };

  const openAdd = (d) => {
    setForm({ date: dateKey(d), time:"7:00 AM", clientIds:[], notes:"" });
    setModal("add");
  };
  const openEdit = (s) => { setForm({...s}); setModal(s); };

  const save = async () => {
    if (modal === "add") {
      const newSession = { ...form, id:"s"+Date.now() };
      await saveSessions([...sessions, newSession], newSession);
    } else {
      const updatedSession = {...modal,...form};
      await saveSessions(sessions.map(s=>s.id===modal.id?updatedSession:s), updatedSession);
    }
    setModal(null);
  };

  const del = async () => {
    await saveSessions(sessions.filter(s=>s.id!==modal.id));
    setModal(null);
  };

  const toggleClient = (id) => {
    setForm(f => ({
      ...f,
      clientIds: f.clientIds.includes(id) ? f.clientIds.filter(x=>x!==id) : f.clientIds.length < 7 ? [...f.clientIds, id] : f.clientIds
    }));
  };

  const isToday = (d) => d && dateKey(d) === dateKey(today);
  const isSelected = (d) => d && selectedDate && dateKey(d) === dateKey(selectedDate);

  const [generating, setGenerating] = useState(false);
  const [genFeedback, setGenFeedback] = useState("");
  const [calView, setCalView] = useState("month"); // "day" | "week" | "month" | "year"
  const [viewDate, setViewDate] = useState(today); // anchor date for day/week views

  const generateNextWeek = async () => {
    setGenerating(true);
    // Find next Monday from today
    const d = new Date(today);
    const day = d.getDay(); // 0=Sun
    const daysUntilMon = day === 0 ? 1 : 8 - day;
    d.setDate(d.getDate() + daysUntilMon);

    const newSessions = [];
    for (let i = 0; i < 7; i++) {
      const cur = new Date(d);
      cur.setDate(d.getDate() + i);
      const weekday = cur.getDay(); // 0=Sun,1=Mon...6=Sat
      const dateStr = dateKey(cur);

      // Mon-Fri morning: 7,8,9,10 AM
      if (weekday >= 1 && weekday <= 5) {
        ["7:00 AM","8:00 AM","9:00 AM","10:00 AM"].forEach(time => {
          const id = `s_${dateStr}_${time.replace(":00","").replace(" ","_")}`;
          if (!sessions.find(s=>s.id===id)) newSessions.push({id, date:dateStr, time, clientIds:[], notes:""});
        });
      }
      // Mon-Thu evening: 5,6,7 PM
      if (weekday >= 1 && weekday <= 4) {
        ["5:00 PM","6:00 PM","7:00 PM"].forEach(time => {
          const id = `s_${dateStr}_${time.replace(":00","").replace(" ","_")}`;
          if (!sessions.find(s=>s.id===id)) newSessions.push({id, date:dateStr, time, clientIds:[], notes:""});
        });
      }
      // Saturday: 8,9,10 AM, 12 PM
      if (weekday === 6) {
        ["8:00 AM","9:00 AM","10:00 AM","11:00 AM"].forEach(time => {
          const id = `s_${dateStr}_${time.replace(":00","").replace(" ","_")}`;
          if (!sessions.find(s=>s.id===id)) newSessions.push({id, date:dateStr, time, clientIds:[], notes:""});
        });
      }
    }

    if (newSessions.length === 0) {
      setGenFeedback("Next week already has sessions!");
    } else {
      const allSessions = [...sessions, ...newSessions];
      await saveSessions(allSessions);
      // Navigate to next week's month
      setViewMonth(d.getMonth());
      setViewYear(d.getFullYear());
      setGenFeedback(`✓ Added ${newSessions.length} sessions for next week`);
    }
    setGenerating(false);
    setTimeout(() => setGenFeedback(""), 3000);
  };

  const generateFullYear = async () => {
    setGenerating(true);
    setGenFeedback("Generating full year...");
    const today = new Date(); today.setHours(0,0,0,0);
    const yearEnd = new Date(today.getFullYear(), 11, 31);
    const newSessions = [];
    const cur = new Date(today);
    // Start from next Monday
    const dow = cur.getDay();
    const daysUntilMon = dow === 0 ? 1 : (dow === 1 ? 0 : 8 - dow);
    cur.setDate(cur.getDate() + daysUntilMon);

    while (cur <= yearEnd) {
      const weekday = cur.getDay();
      const dateStr = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,"0")}-${String(cur.getDate()).padStart(2,"0")}`;
      const times = [];
      if (weekday >= 1 && weekday <= 5) times.push(...["7:00 AM","8:00 AM","9:00 AM","10:00 AM"]);
      if (weekday >= 1 && weekday <= 4) times.push(...["5:00 PM","6:00 PM","7:00 PM"]);
      if (weekday === 6) times.push(...["8:00 AM","9:00 AM","10:00 AM","11:00 AM"]);
      times.forEach(time => {
        const id = `s_${dateStr}_${time.replace(":00","").replace(" ","_")}`;
        if (!sessions.find(s=>s.id===id)) newSessions.push({id, date:dateStr, time, clientIds:[], notes:""});
      });
      cur.setDate(cur.getDate() + 1);
    }

    if (newSessions.length === 0) {
      setGenFeedback("Year already fully scheduled!");
    } else {
      // Save in batches to avoid timeout
      const batchSize = 50;
      for (let i = 0; i < newSessions.length; i += batchSize) {
        const batch = newSessions.slice(i, i + batchSize);
        await sbFetch("sessions", "POST", batch, { Prefer: "resolution=merge-duplicates,return=minimal" });
      }
      const allSessions = [...sessions, ...newSessions];
      await saveSessions(allSessions);
      setGenFeedback(`✓ Added ${newSessions.length} sessions through Dec 31`);
    }
    setGenerating(false);
    setTimeout(() => setGenFeedback(""), 5000);
  };

  const totalSessions = sessions.length;
  const totalClients = sessions.reduce((a,s)=>a+s.clientIds.length,0);

  // ── View helpers ──
  const getWeekStart = (d) => {
    const s = new Date(d);
    const day = s.getDay();
    s.setDate(s.getDate() - (day === 0 ? 6 : day - 1)); // Monday
    s.setHours(0,0,0,0);
    return s;
  };

  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate()+n); return r; };

  const navigateCal = (dir) => {
    if (calView === "day") setViewDate(d => addDays(d, dir));
    else if (calView === "week") setViewDate(d => addDays(d, dir*7));
    else if (calView === "month") {
      setViewDate(d => { const n = new Date(d); n.setMonth(n.getMonth()+dir); return n; });
      if (dir === 1) nextMonth(); else prevMonth();
    }
    else if (calView === "year") {
      setViewDate(d => { const n = new Date(d); n.setFullYear(n.getFullYear()+dir); return n; });
      setViewYear(y => y + dir);
    }
    setSelectedDate(null);
  };

  const calLabel = () => {
    if (calView === "day") return `${DAY_NAMES[viewDate.getDay()]} ${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getDate()}, ${viewDate.getFullYear()}`;
    if (calView === "week") {
      const ws = getWeekStart(viewDate);
      const we = addDays(ws, 6);
      return `${MONTH_NAMES[ws.getMonth()]} ${ws.getDate()} – ${we.getDate()}, ${ws.getFullYear()}`;
    }
    if (calView === "month") return `${MONTH_NAMES[viewMonth]} ${viewYear}`;
    return String(viewDate.getFullYear());
  };

  const SessionCard = ({s, onClick}) => {
    const names = s.clientIds.map(id => { const c = clients.find(x=>x.id===id); return c ? c.name.split(" ")[0] : id; });
    return (
      <div className="session-card" style={{cursor:"pointer"}} onClick={onClick}>
        <div className="session-time bebas">{s.time}</div>
        <div className="session-info">
          <div style={{fontWeight:500,marginBottom:4}}>{s.clientIds.length} client{s.clientIds.length!==1?"s":""}</div>
          <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>{names.join(" · ") || "No clients assigned"}</div>
          {s.notes && <div className="session-note">📝 {s.notes}</div>}
        </div>
        <span className={`badge ${s.clientIds.length>0?"badge-accent":"badge-muted"}`}>{s.clientIds.length}/7</span>
      </div>
    );
  };

  // Day view
  const DayView = () => {
    const daySessions = sessionsForDate(viewDate);
    return (
      <div className="section">
        <div className="section-header">
          <span className="bebas" style={{fontSize:18,color:"var(--text)"}}>{DAY_NAMES[viewDate.getDay()]} {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getDate()}</span>
          <button className="btn-primary" style={{width:"auto",padding:"8px 18px",fontSize:13}} onClick={()=>openAdd(viewDate)}>+ Add Session</button>
        </div>
        <div className="section-body">
          {daySessions.length === 0
            ? <div className="empty-state" style={{padding:"30px 20px"}}><div className="empty-icon">🗓</div><div className="empty-text">No sessions today.</div></div>
            : daySessions.map(s => <SessionCard key={s.id} s={s} onClick={()=>openEdit(s)} />)
          }
        </div>
      </div>
    );
  };

  // Week view
  const WeekView = () => {
    const ws = getWeekStart(viewDate);
    const weekDays = Array.from({length:7}, (_,i) => addDays(ws, i));
    return (
      <div className="section">
        <div className="section-body" style={{padding:0}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
            {weekDays.map((d,i) => {
              const daySessions = sessionsForDate(d);
              const tod = isToday(d);
              const sel = isSelected(d);
              return (
                <div key={i} style={{borderRight:"1px solid var(--border)",minHeight:400}}>
                  <div style={{
                    padding:"10px 8px",borderBottom:"1px solid var(--border)",
                    background: tod ? "#3ec9c915" : "transparent",
                    textAlign:"center"
                  }}>
                    <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)"}}>{DAY_NAMES[d.getDay()]}</div>
                    <div style={{
                      width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                      margin:"4px auto 0",fontSize:14,fontWeight:600,
                      background: tod ? "var(--accent)" : "transparent",
                      color: tod ? "var(--black)" : "var(--text)"
                    }}>{d.getDate()}</div>
                  </div>
                  <div style={{padding:"6px 4px",display:"flex",flexDirection:"column",gap:4}}>
                    {daySessions.map(s => {
                      const names = s.clientIds.map(id => { const c = clients.find(x=>x.id===id); return c ? c.name.split(" ")[0] : ""; }).filter(Boolean);
                      return (
                        <div key={s.id} onClick={()=>openEdit(s)} style={{
                          padding:"6px 8px",borderRadius:2,cursor:"pointer",
                          background: s.clientIds.length>0 ? "#3ec9c920" : "#ffffff08",
                          borderLeft: `2px solid ${s.clientIds.length>0?"var(--accent)":"var(--border)"}`,
                          fontSize:11
                        }}>
                          <div style={{fontWeight:600,color:"var(--text)"}}>{s.time}</div>
                          <div style={{color:"var(--muted)",fontSize:10,marginTop:2}}>{s.clientIds.length>0?names.slice(0,2).join(", ")+(s.clientIds.length>2?` +${s.clientIds.length-2}`:""):"Empty"}</div>
                        </div>
                      );
                    })}
                    <div onClick={()=>openAdd(d)} style={{
                      padding:"4px 8px",borderRadius:2,cursor:"pointer",
                      border:"1px dashed var(--border)",fontSize:10,color:"var(--muted)",
                      textAlign:"center",marginTop:2
                    }}>+ Add</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Year view
  const YearView = () => {
    const year = viewDate.getFullYear();
    return (
      <div className="section">
        <div className="section-body">
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {MONTH_NAMES.map((mn,mi) => {
              const monthSessions = sessions.filter(s => {
                if (!s.date) return false;
                const d = new Date(s.date+"T12:00:00");
                return d.getFullYear()===year && d.getMonth()===mi;
              });
              const filled = monthSessions.filter(s=>s.clientIds.length>0).length;
              return (
                <div key={mi}
                  onClick={()=>{ setCalView("month"); setViewMonth(mi); setViewYear(year); setViewDate(new Date(year,mi,1)); }}
                  style={{
                    padding:"16px",borderRadius:4,cursor:"pointer",
                    border:"1px solid var(--border)",
                    background: viewMonth===mi && year===viewYear ? "#3ec9c915" : "var(--panel)",
                    transition:"all 0.15s"
                  }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="var(--accent)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}
                >
                  <div className="bebas" style={{fontSize:18,color:"var(--text)",marginBottom:8}}>{mn}</div>
                  <div style={{fontSize:12,color:"var(--muted)"}}>{monthSessions.length} sessions</div>
                  <div style={{fontSize:12,color:"var(--accent)"}}>{filled} with clients</div>
                  {monthSessions.length > 0 && (
                    <div style={{marginTop:8,height:4,background:"var(--border)",borderRadius:2}}>
                      <div style={{height:4,borderRadius:2,background:"var(--accent)",width:`${Math.min(100,(filled/monthSessions.length)*100)}%`}} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">SCHEDULE</div>
        <div className="page-subtitle">Manage your training sessions</div>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Sessions" value={totalSessions} sub="this schedule" />
        <StatCard label="Client Slots" value={totalClients} sub="filled across sessions" />
        <StatCard label="Active Clients" value={clients.filter(c=>c.active).length} sub="in roster" />
        <StatCard label="Month" value={MONTH_NAMES[viewMonth].slice(0,3).toUpperCase()} sub={String(viewYear)} />
      </div>

      {/* View switcher + nav */}
      <div className="section">
        <div className="section-header">
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={()=>navigateCal(-1)}>‹</button>
            <span className="bebas" style={{fontSize:20,color:"var(--text)",letterSpacing:1,minWidth:200,textAlign:"center"}}>{calLabel()}</span>
            <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={()=>navigateCal(1)}>›</button>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {["day","week","month","year"].map(v=>(
              <button key={v} onClick={()=>setCalView(v)} style={{
                padding:"6px 14px",fontSize:12,borderRadius:2,cursor:"pointer",
                border:`1px solid ${calView===v?"var(--accent)":"var(--border)"}`,
                background:calView===v?"var(--accent)":"transparent",
                color:calView===v?"var(--black)":"var(--muted)",
                textTransform:"capitalize",transition:"all 0.15s"
              }}>{v}</button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {genFeedback && <span style={{fontSize:12,color:"var(--accent)"}}>{genFeedback}</span>}
            <button className="btn-primary" style={{width:"auto",padding:"8px 18px",fontSize:13}} onClick={generateNextWeek} disabled={generating}>
              {generating ? "Generating..." : "＋ Next Week"}
            </button>
            <button className="btn-secondary" style={{width:"auto",padding:"8px 18px",fontSize:13}} onClick={generateFullYear} disabled={generating}>
              📅 Full Year
            </button>
          </div>
        </div>

        {calView === "day" && <DayView />}
        {calView === "week" && <WeekView />}
        {calView === "year" && <YearView />}

        {calView === "month" && (
          <>
            <div className="section-body" style={{padding:0}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:"1px solid var(--border)"}}>
                {DAY_NAMES.map(d=>(
                  <div key={d} style={{padding:"10px 0",textAlign:"center",fontSize:10,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)"}}>{d}</div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
                {cells.map((d,i) => {
                  if (!d) return <div key={i} style={{minHeight:90,borderRight:"1px solid var(--border)",borderBottom:"1px solid var(--border)",background:"var(--black)"}} />;
                  const daySessions = sessionsForDate(d);
                  const sel = isSelected(d);
                  const tod = isToday(d);
                  return (
                    <div key={i} onClick={()=>{ setSelectedDate(d); setViewDate(d); }}
                      style={{
                        minHeight:90, padding:"8px 6px", cursor:"pointer",
                        borderRight:"1px solid var(--border)", borderBottom:"1px solid var(--border)",
                        background: sel ? "#3ec9c915" : "transparent",
                        transition:"background 0.15s",
                      }}
                      onMouseEnter={e=>{ if(!sel) e.currentTarget.style.background="#ffffff05"; }}
                      onMouseLeave={e=>{ if(!sel) e.currentTarget.style.background="transparent"; }}
                    >
                      <div style={{
                        width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:13,fontWeight:500,marginBottom:4,
                        background: tod ? "var(--accent)" : "transparent",
                        color: tod ? "var(--black)" : sel ? "var(--accent)" : "var(--text)",
                        border: sel && !tod ? "1px solid var(--accent)" : "none",
                      }}>{d.getDate()}</div>
                      {daySessions.length > 0 && (
                        <div style={{display:"flex",flexDirection:"column",gap:2}}>
                          {daySessions.slice(0,3).map(s=>(
                            <div key={s.id} style={{
                              fontSize:9,padding:"2px 5px",borderRadius:2,
                              background: s.clientIds.length>0 ? "#3ec9c925" : "#ffffff08",
                              color: s.clientIds.length>0 ? "var(--accent)" : "var(--muted)",
                              whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"
                            }}>{s.time}</div>
                          ))}
                          {daySessions.length > 3 && <div style={{fontSize:9,color:"var(--muted)",paddingLeft:4}}>+{daySessions.length-3} more</div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {selectedDate && (
              <div style={{borderTop:"1px solid var(--border)",padding:"16px 20px",animation:"fadeUp 0.3s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <span className="bebas" style={{fontSize:18,color:"var(--text)"}}>
                    {DAY_NAMES[selectedDate.getDay()]} {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()}
                  </span>
                  <button className="btn-primary" style={{width:"auto",padding:"8px 18px",fontSize:13}} onClick={()=>openAdd(selectedDate)}>+ Add Session</button>
                </div>
                {sessionsForDate(selectedDate).length === 0
                  ? <div className="empty-state" style={{padding:"20px"}}><div className="empty-icon">🗓</div><div className="empty-text">No sessions. Click + Add Session.</div></div>
                  : sessionsForDate(selectedDate).map(s => <SessionCard key={s.id} s={s} onClick={()=>openEdit(s)} />)
                }
              </div>
            )}
          </>
        )}
      </div>

      {/* Session modal */}
      {modal && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
          <div className="modal">
            <div className="modal-header">
              <div className="bebas modal-title">{modal==="add"?"NEW SESSION":"EDIT SESSION"}</div>
              <button className="modal-close" onClick={()=>setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label>Time</label>
                <select value={form.time} onChange={e=>setForm({...form,time:e.target.value})}>
                  {TIMES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                  <label style={{margin:0}}>Clients ({form.clientIds.length}/7)</label>
                  <div style={{display:"flex",alignItems:"center",gap:8,fontSize:11}}>
                    <span style={{color:"var(--muted)"}}>Show available only</span>
                    <div
                      onClick={()=>setShowAvailOnly(v=>!v)}
                      style={{
                        width:36,height:20,borderRadius:10,cursor:"pointer",
                        background:showAvailOnly?"var(--accent)":"var(--border)",
                        position:"relative",transition:"background 0.2s"
                      }}
                    >
                      <div style={{
                        position:"absolute",top:3,left:showAvailOnly?18:3,
                        width:14,height:14,borderRadius:"50%",
                        background:showAvailOnly?"var(--black)":"var(--muted)",
                        transition:"left 0.2s"
                      }}/>
                    </div>
                  </div>
                </div>
                <div className="avail-grid" style={{marginTop:6}}>
                  {[...clients].sort((a,b)=>a.name.localeCompare(b.name)).filter(c => {
                    if (!c.active) return false;
                    if (showAvailOnly) return isAvailable(c.id, form.date, form.time) || form.clientIds.includes(c.id);
                    return true;
                  }).map(c => {
                    const avail = isAvailable(c.id, form.date, form.time);
                    const selected = form.clientIds.includes(c.id);
                    return (
                      <div key={c.id}
                        className={`avail-chip${selected?" selected":""}`}
                        style={{position:"relative", borderColor: avail && !selected ? "var(--green)" : undefined, color: avail && !selected ? "var(--green)" : undefined}}
                        onClick={()=>toggleClient(c.id)}
                        title={avail ? "Available" : "No availability submitted"}
                      >
                        {c.name.split(" ")[0]}
                        {avail && !selected && <span style={{position:"absolute",top:3,right:3,width:5,height:5,borderRadius:"50%",background:"var(--green)"}}/>}
                      </div>
                    );
                  })}
                </div>
                {availabilities.length === 0 && (
                  <div style={{fontSize:11,color:"var(--muted)",marginTop:8}}>No availability submissions yet.</div>
                )}
              </div>
              <div className="form-row">
                <label>Notes</label>
                <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="e.g. Upper body focus" />
              </div>
            </div>
            <div className="modal-footer">
              {modal !== "add" && <button className="btn-secondary" style={{color:"var(--red)",borderColor:"var(--red)"}} onClick={del}>Delete</button>}
              <button className="btn-secondary" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn-primary" style={{width:"auto",padding:"10px 24px",fontSize:15}} onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TrainerClients({ clients, sessions, saveClients, deleteClient, onPreviewClient }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", password:"client123", sessionsTotal:20, sessionsUsed:0, active:true });

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ name:"", email:"", password:"client123", sessionsTotal:20, sessionsUsed:0, active:true }); setModal("add"); };
  const openEdit = (c) => { setForm({...c}); setModal(c); };

  const save = async () => {
    if (modal === "add") {
      const maxId = clients.reduce((max, c) => {
        const num = parseInt(c.id.replace("c",""));
        return !isNaN(num) && num > max ? num : max;
      }, 0);
      const newClient = { ...form, id:"c"+(maxId+1) };
      await saveClients([...clients, newClient], newClient);
    } else {
      const updatedClient = {...modal,...form};
      await saveClients(clients.map(c=>c.id===modal.id?updatedClient:c), updatedClient);
    }
    setModal(null);
  };

  const del = async () => {
    if (!window.confirm(`Remove ${modal.name}? This cannot be undone.`)) return;
    const clientId = modal.id;
    setModal(null);
    deleteClient(clientId);
    // Delete from Supabase using the id field
    const result = await sbFetch(`clients?id=eq.${clientId}`, "DELETE");
    console.log("Delete result:", result, "for id:", clientId);
  };

  const clientSessions = (id) => sessions.filter(s=>s.clientIds.includes(id)).length;

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">CLIENTS</div>
        <div className="page-subtitle">{clients.filter(c=>c.active).length} active · {clients.filter(c=>!c.active).length} inactive</div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">All Clients ({clients.length})</span>
          <div style={{display:"flex",gap:10}}>
            <input className="search-input" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
            <button className="btn-primary" style={{width:"auto",padding:"8px 20px",fontSize:14}} onClick={openAdd}>+ Add Client</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Sessions Left</th>
              <th>This Week</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[...filtered].sort((a,b)=>a.name.localeCompare(b.name)).map(c => {
              const left = c.sessionsTotal - c.sessionsUsed;
              const pct = (c.sessionsUsed/c.sessionsTotal)*100;
              return (
                <tr key={c.id} style={{cursor:"pointer"}} onClick={()=>openEdit(c)}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div className="user-avatar" style={{background: left===0?"var(--red)":"var(--accent)",fontSize:11}}>
                        {c.name.split(" ").map(x=>x[0]).join("")}
                      </div>
                      <span style={{fontWeight:500,color:"var(--accent)",textDecoration:"underline",textDecorationColor:"transparent",transition:"text-decoration-color 0.15s"}}
                        onMouseEnter={e=>e.currentTarget.style.textDecorationColor="var(--accent)"}
                        onMouseLeave={e=>e.currentTarget.style.textDecorationColor="transparent"}
                      >{c.name}</span>
                    </div>
                  </td>
                  <td style={{color:"var(--muted)"}}>{c.email||"—"}</td>
                  <td></td>
                  <td></td>
                  <td onClick={e=>e.stopPropagation()} style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span
                      className={`badge ${c.active?"badge-green":"badge-muted"}`}
                      style={{cursor:"pointer",userSelect:"none"}}
                      title="Click to toggle"
                      onClick={async()=>{ await saveClients(clients.map(x=>x.id===c.id?{...x,active:!x.active}:x)); }}
                    >
                      {c.active?"Active":"Inactive"}
                    </span>
                    {!c.email && (
                      <span
                        className="badge badge-muted"
                        style={{cursor:"pointer",userSelect:"none",fontSize:11}}
                        title="Copy signup link"
                        onClick={()=>{
                          const link = `${window.location.origin}?signup=${c.id}`;
                          navigator.clipboard.writeText(link);
                          alert(`Signup link copied!\n\n${link}`);
                        }}
                      >🔗 Copy Link</span>
                    )}
                    {c.email && (
                      <span
                        className="badge"
                        style={{cursor:"pointer",userSelect:"none",fontSize:11,background:"#3ec9c915",color:"var(--accent)",border:"1px solid var(--accent)"}}
                        onClick={e=>{e.stopPropagation(); onPreviewClient(c);}}
                      >👁 View</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
          <div className="modal">
            <div className="modal-header">
              <div className="bebas modal-title">{modal==="add"?"NEW CLIENT":"EDIT CLIENT"}</div>
              <button className="modal-close" onClick={()=>setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="two-col">
                <div className="form-row">
                  <label>Name</label>
                  <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" />
                </div>
                <div className="form-row">
                  <label>Email</label>
                  <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="email@example.com" />
                </div>
              </div>
              <div className="two-col">
                <div className="form-row">
                  <label>Password</label>
                  <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
                </div>
                <div className="form-row">
                  <label>Status</label>
                  <select value={form.active?"active":"inactive"} onChange={e=>setForm({...form,active:e.target.value==="active"})}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="two-col">
                <div className="form-row">
                  <label>Total Sessions Purchased</label>
                  <input type="number" value={form.sessionsTotal} onChange={e=>setForm({...form,sessionsTotal:+e.target.value})} />
                </div>
                <div className="form-row">
                  <label>Sessions Used</label>
                  <input type="number" value={form.sessionsUsed} onChange={e=>setForm({...form,sessionsUsed:+e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {modal !== "add" && <button className="btn-secondary" style={{color:"var(--red)",borderColor:"var(--red)"}} onClick={del}>Remove</button>}
              <button className="btn-secondary" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn-primary" style={{width:"auto",padding:"10px 24px",fontSize:15}} onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TrainerAvailability({ clients, sessions, saveSessions }) {
  const [avails, setAvails] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [assignFeedback, setAssignFeedback] = useState("");
  const [expandedSession, setExpandedSession] = useState(null);
  const [trainerWeekOffset, setTrainerWeekOffset] = useState(0); // 0=current week, 1=next, etc.

  const MONTH_ABBREVS_T = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const getWeekMonday = (offset) => {
    const today = new Date(); today.setHours(0,0,0,0);
    const dow = today.getDay();
    const daysToMon = dow === 0 ? -6 : 1 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + daysToMon + offset * 7);
    return monday;
  };

  const weekDateKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

  const weekLabel = (monday) => {
    return `Week of ${MONTH_ABBREVS_T[monday.getMonth()]} ${monday.getDate()}`;
  };

  const currentMonday = getWeekMonday(trainerWeekOffset);
  const currentWeekKey = weekDateKey(currentMonday);

  useEffect(() => {
    // Fetch directly from Supabase availability table
    sbFetch("availability?select=*").then(a => {
      if (a && Array.isArray(a)) {
        setAvails(a.map(r => ({
          ...r,
          slots: Array.isArray(r.slots) ? r.slots : (typeof r.slots === "string" ? JSON.parse(r.slots) : [])
        })));
      }
    });
  }, []);

  const refresh = () => {
    sbFetch("availability?select=*").then(a => {
      if (a && Array.isArray(a)) {
        setAvails(a.map(r => ({
          ...r,
          slots: Array.isArray(r.slots) ? r.slots : (typeof r.slots === "string" ? JSON.parse(r.slots) : [])
        })));
      }
    });
  };

  const clientAvail = (clientId) => {
    // Find availability for the selected week (by weekKey), fallback to any
    const weekMatch = avails.find(a => a.clientId===clientId && a.weekKey===currentWeekKey);
    if (weekMatch) return weekMatch;
    return null;
  };

  // Parse "YYYY-MM-DD HH:MM AM/PM" slot -> find matching session
  const sessionsForSlot = (slotStr) => {
    const parts = slotStr.split(" ");
    const dateStr = parts[0];
    const time = parts.slice(1).join(" ");
    // New format: date-based
    if (dateStr.includes("-")) {
      return sessions.filter(s => s.date === dateStr && s.time === time);
    }
    // Legacy format: day-based fallback
    const DAY_ABBREVS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const now = new Date(); now.setHours(0,0,0,0);
    const weekEnd = new Date(now); weekEnd.setDate(now.getDate() + 14);
    return sessions.filter(s => {
      if (!s.date) return false;
      const d = new Date(s.date + "T12:00:00");
      return DAY_ABBREVS[d.getDay()] === dateStr && s.time === time && d >= now && d <= weekEnd;
    }).sort((a,b) => a.date < b.date ? -1 : 1);
  };

  const isAssigned = (sessionId) => {
    if (!selectedClient) return false;
    const s = sessions.find(x=>x.id===sessionId);
    return s && s.clientIds.includes(selectedClient.id);
  };

  const toggleAssign = async (session) => {
    if (!selectedClient) return;
    const alreadyIn = session.clientIds.includes(selectedClient.id);
    let updated;
    if (alreadyIn) {
      updated = sessions.map(s => s.id===session.id
        ? {...s, clientIds: s.clientIds.filter(id=>id!==selectedClient.id)}
        : s);
    } else {
      if (session.clientIds.length >= 7) return;
      updated = sessions.map(s => s.id===session.id
        ? {...s, clientIds: [...s.clientIds, selectedClient.id]}
        : s);
    }
    const changedSession = updated.find(s=>s.id===session.id);
    await saveSessions(updated, changedSession);
    setAssignFeedback(alreadyIn ? "" : session.date + " " + session.time);
    setTimeout(() => setAssignFeedback(""), 2000);
  };

  const avail = selectedClient ? clientAvail(selectedClient.id) : null;
  const slots = avail ? avail.slots : [];

  // Group slots by day
  const slotsByDay = {};
  slots.forEach(slot => {
    const day = slot.split(" ")[0];
    if (!slotsByDay[day]) slotsByDay[day] = [];
    slotsByDay[day].push(slot);
  });
  const dayOrder = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const sortedDays = Object.keys(slotsByDay).sort((a,b) => dayOrder.indexOf(a)-dayOrder.indexOf(b));

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">AVAILABILITY</div>
        <div className="page-subtitle">Click a client to assign them to sessions</div>
      </div>

      {/* Week selector */}
      <div className="section">
        <div className="section-header"><span className="section-title">Select Week</span></div>
        <div className="section-body" style={{paddingTop:0,paddingBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={()=>setTrainerWeekOffset(o=>o-1)}>‹</button>
            <span className="bebas" style={{fontSize:18,color:"var(--text)",minWidth:200,textAlign:"center"}}>{weekLabel(currentMonday)}</span>
            <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={()=>setTrainerWeekOffset(o=>o+1)}>›</button>
            {trainerWeekOffset !== 0 && <button className="btn-secondary" style={{padding:"6px 12px",fontSize:11}} onClick={()=>setTrainerWeekOffset(0)}>Today</button>}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">Client Availability</span>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:12,color:"var(--muted)"}}>{avails.filter(a=>a.weekKey===currentWeekKey).length} submitted for this week</span>
            <button className="btn-secondary" style={{padding:"4px 12px",fontSize:12}} onClick={refresh}>↻ Refresh</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Available Times</th>
              <th>Sessions Wanted</th>
              <th>Availability</th>
              <th>Next Week</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {[...clients].sort((a,b)=>a.name.localeCompare(b.name)).map(c => {
              const a = clientAvail(c.id);
              return (
                <tr key={c.id} style={{cursor:"pointer"}} onClick={()=>setSelectedClient(c)}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div className="user-avatar" style={{fontSize:11,background:selectedClient?.id===c.id?"var(--accent)":"var(--panel)",border:"1px solid var(--accent)",color:selectedClient?.id===c.id?"var(--black)":"var(--accent)"}}>
                        {c.name.split(" ").map(x=>x[0]).join("")}
                      </div>
                      <span style={{fontWeight:500,color:selectedClient?.id===c.id?"var(--accent)":"var(--text)"}}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{color:"var(--muted)",fontSize:12}}>
                    {a ? (() => {
                      const formatted = a.slots.slice(0,3).map(s => {
                        const parts = s.split(" ");
                        if (parts[0].includes("-")) {
                          const d = new Date(parts[0]+"T12:00:00");
                          const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                          return `${days[d.getDay()]} ${d.getDate()} ${parts.slice(1).join(" ")}`;
                        }
                        return s;
                      });
                      return formatted.join(", ") + (a.slots.length>3?` +${a.slots.length-3} more`:"");
                    })() : <span style={{color:"var(--border)"}}>—</span>}
                  </td>
                  <td>
                    {a?.trainingsWanted > 0 ? (
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{
                          width:32,height:32,borderRadius:"50%",
                          background:"var(--accent)",color:"var(--black)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:16,fontWeight:700
                        }}>{a.trainingsWanted}</div>
                        <span style={{fontSize:12,color:"var(--muted)"}}>session{a.trainingsWanted>1?"s":""}</span>
                      </div>
                    ) : <span style={{color:"var(--border)"}}>—</span>}
                  </td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      {a ? <span className="badge badge-green">Submitted</span> : <span className="badge badge-muted">Pending</span>}
                      {a && (
                        <span
                          className="badge"
                          style={{cursor:"pointer",fontSize:10,background:"#ef444420",color:"var(--red)",border:"1px solid var(--red)"}}
                          title="Clear availability"
                          onClick={async(e)=>{
                            e.stopPropagation();
                            await sbFetch(`availability?clientId=eq.${c.id}&weekKey=eq.${currentWeekKey}`, "DELETE");
                            setAvails(prev => prev.filter(x => !(x.clientId === c.id && x.weekKey === currentWeekKey)));
                          }}
                        >✕ Clear</span>
                      )}
                    </div>
                  </td>
                  <td>
                    {(() => {
                      if (!a) return <span className="badge badge-muted">—</span>;
                      // Check if client is in any session next week
                      const monday = currentMonday;
                      const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
                      const dk = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
                      const isNextWeek = s => {
                        if (!s.date) return false;
                        const sd = new Date(s.date+"T12:00:00");
                        return sd >= monday && sd <= sunday;
                      };
                      const booked = sessions.some(s => isNextWeek(s) && s.clientIds.includes(c.id));
                      return booked
                        ? <span className="badge badge-green">✓ Booked</span>
                        : <span className="badge" style={{background:"#ef444420",color:"var(--red)",border:"1px solid var(--red)"}}>✗ Not Booked</span>;
                    })()}
                  </td>
                  <td style={{color:"var(--muted)",fontSize:12}}>{a?.date||"—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Split screen panel when client selected */}
      {selectedClient && (() => {
        // Build next week dates Mon-Sat
        const today2 = new Date(); today2.setHours(0,0,0,0);
        const dow = today2.getDay();
        const daysUntilMon = dow === 0 ? 1 : 8 - dow;
        const monday = new Date(today2); monday.setDate(today2.getDate() + daysUntilMon);
        const weekDates = Array.from({length:6}, (_,i) => { const d = new Date(monday); d.setDate(monday.getDate()+i); return d; });
        const dk2 = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
        const DAY_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const MON_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const isClientAvail = (date, time) => {
          const dk = dk2(date);
          return slots.some(s => {
            const parts = s.split(" ");
            return parts[0] === dk && parts.slice(1).join(" ") === time;
          });
        };
        return (
          <div style={{
            position:"fixed",top:56,left:0,right:0,bottom:0,
            background:"var(--black)",zIndex:200,
            display:"flex",flexDirection:"column"
          }}>
            {/* Header */}
            <div style={{
              display:"flex",alignItems:"center",justifyContent:"space-between",
              padding:"14px 24px",background:"var(--charcoal)",borderBottom:"1px solid var(--border)",
              flexShrink:0
            }}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div className="user-avatar" style={{background:"var(--accent)",color:"var(--black)",fontSize:13}}>
                  {selectedClient.name.split(" ").map(x=>x[0]).join("")}
                </div>
                <div>
                  <div className="bebas" style={{fontSize:20,color:"var(--text)"}}>{selectedClient.name}</div>
                  <div style={{fontSize:11,color:"var(--muted)"}}>
                    {avail ? `${slots.length} available slot${slots.length!==1?"s":""}` : "No availability submitted"} · Next week schedule
                  </div>
                </div>
              </div>
              {assignFeedback && (
                <div style={{background:"#3ec9c920",border:"1px solid var(--accent)",borderRadius:2,padding:"6px 14px",fontSize:12,color:"var(--accent)"}}>
                  ✓ Assigned to {assignFeedback}
                </div>
              )}
              <button className="modal-close" style={{fontSize:20}} onClick={()=>setSelectedClient(null)}>✕</button>
            </div>

            {/* Split body */}
            <div style={{display:"flex",flex:1,overflow:"hidden"}}>

              {/* LEFT — client availability + history */}
              <div style={{width:320,borderRight:"1px solid var(--border)",overflowY:"auto",padding:"20px 20px",flexShrink:0}}>
                <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:16}}>Submitted Availability</div>
                {!avail ? (
                  <div className="empty-state"><div className="empty-icon">📋</div><div className="empty-text">No availability submitted yet.</div></div>
                ) : sortedDays.length === 0 ? (
                  <div style={{color:"var(--muted)",fontSize:13}}>No slots selected.</div>
                ) : sortedDays.map(day => (
                  <div key={day} style={{marginBottom:16}}>
                    <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:8}}>
                      {day.includes("-") ? (() => { const d2 = new Date(day+"T12:00:00"); return `${DAY_SHORT[d2.getDay()]} ${MON_SHORT[d2.getMonth()]} ${d2.getDate()}`; })() : day}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      {slotsByDay[day].map(slot => {
                        const time = slot.split(" ").slice(1).join(" ");
                        const matchingSessions = sessionsForSlot(slot);
                        const anyAssigned = matchingSessions.some(s => s.clientIds.includes(selectedClient.id));
                        return (
                          <div key={slot} style={{
                            padding:"8px 12px",borderRadius:2,fontSize:12,
                            background: anyAssigned ? "#3ec9c920" : "var(--charcoal)",
                            border:`1px solid ${anyAssigned?"var(--accent)":"var(--border)"}`,
                            color: anyAssigned ? "var(--accent)" : "var(--text)"
                          }}>
                            {time} {anyAssigned && "✓"}
                            {matchingSessions.length === 0 && <span style={{fontSize:10,color:"var(--muted)",marginLeft:8}}>no session</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}


              </div>

              {/* RIGHT — next week schedule */}
              <div style={{flex:1,overflowY:"auto",padding:"20px 20px"}}>
                <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:16}}>Next Week — Click to Assign</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
                  {weekDates.map(d => {
                    const dk = dk2(d);
                    const daySessions = sessions.filter(s=>s.date===dk).sort((a,b)=>TIMES.indexOf(a.time)-TIMES.indexOf(b.time));
                    const tod = dk === dk2(today2);
                    return (
                      <div key={dk}>
                        <div style={{
                          textAlign:"center",padding:"8px 4px",marginBottom:6,
                          borderBottom:"2px solid",
                          borderColor: tod ? "var(--accent)" : "var(--border)"
                        }}>
                          <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)"}}>{DAY_SHORT[d.getDay()]}</div>
                          <div style={{fontSize:18,fontWeight:600,color: tod?"var(--accent)":"var(--text)"}}>{d.getDate()}</div>
                          <div style={{fontSize:10,color:"var(--muted)"}}>{MON_SHORT[d.getMonth()]}</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:4}}>
                          {daySessions.length === 0 ? (
                            <div style={{fontSize:10,color:"var(--border)",textAlign:"center",padding:"10px 0"}}>No sessions</div>
                          ) : (() => {
                            const morning = daySessions.filter(s => s.time.includes("AM"));
                            const evening = daySessions.filter(s => s.time.includes("PM"));
                            const renderSession = (s) => {
                              const assigned = s.clientIds.includes(selectedClient.id);
                              const full = s.clientIds.length >= 7 && !assigned;
                              const clientAvailable = isClientAvail(d, s.time);
                              const expanded = expandedSession === s.id;
                              const assignedNames = s.clientIds.map(id => { const c = clients.find(x=>x.id===id); return c ? c.name.split(" ")[0] : "?"; });
                              return (
                                <div key={s.id} style={{borderRadius:2,overflow:"hidden",border:`1px solid ${assigned?"var(--accent)":clientAvailable?"var(--green)":full?"var(--border)":"var(--border)"}`,background:assigned?"var(--accent)":clientAvailable?"#22c55e15":"var(--charcoal)"}}>
                                  {/* Header row */}
                                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 8px",cursor:"pointer",userSelect:"none"}}
                                    onClick={()=>setExpandedSession(expanded ? null : s.id)}
                                  >
                                    <div>
                                      <div style={{fontWeight:600,fontSize:11,color:assigned?"var(--black)":full?"var(--border)":"var(--text)"}}>{s.time}</div>
                                      <div style={{fontSize:10,color:assigned?"var(--black)":full?"var(--border)":"var(--muted)"}}>{s.clientIds.length}/7{assigned?" ✓":full?" 🔒":clientAvailable?" ●":""}</div>
                                    </div>
                                    <div style={{fontSize:10,color:assigned?"var(--black)":"var(--muted)"}}>{expanded?"▲":"▼"}</div>
                                  </div>
                                  {/* Expanded names */}
                                  {expanded && (
                                    <div style={{borderTop:`1px solid ${assigned?"rgba(0,0,0,0.15)":"var(--border)"}`,padding:"6px 8px",background:"rgba(0,0,0,0.15)"}}>
                                      {assignedNames.length === 0 ? (
                                        <div style={{fontSize:10,color:"var(--muted)",fontStyle:"italic"}}>No clients yet</div>
                                      ) : assignedNames.map((name,i) => (
                                        <div key={i} style={{fontSize:10,color:assigned?"var(--black)":"var(--text)",padding:"2px 0"}}>{name}</div>
                                      ))}
                                      {!full && (
                                        <div
                                          onClick={e=>{e.stopPropagation();toggleAssign(s);}}
                                          style={{
                                            marginTop:6,padding:"4px 0",textAlign:"center",borderRadius:2,fontSize:10,cursor:"pointer",
                                            background:assigned?"rgba(0,0,0,0.2)":"var(--accent)",
                                            color:assigned?"var(--black)":"var(--black)",fontWeight:600
                                          }}
                                        >
                                          {assigned ? "Remove" : "+ Assign"}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            };
                            return (
                              <>
                                {morning.map(renderSession)}
                                {morning.length > 0 && evening.length > 0 && (
                                  <div style={{height:1,background:"var(--border)",margin:"4px 0"}} />
                                )}
                                {evening.map(renderSession)}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}

// ─── Trainer Progress ─────────────────────────────────────────────────────────
const MUSCLE_GROUPS = {
  "Chest": ["Bench Press","Incline Bench Press","Decline Bench Press","Push-Ups","Cable Fly","Dumbbell Fly","Chest Dip"],
  "Back": ["Pull-Ups","Lat Pulldown","Barbell Row","Dumbbell Row","Seated Cable Row","Deadlift","Back Extension","Face Pull"],
  "Shoulders": ["Overhead Press","Dumbbell Lateral Raise","Front Raise","Rear Delt Fly","Arnold Press","Upright Row","Shrugs"],
  "Biceps": ["Barbell Curl","Dumbbell Curl","Hammer Curl","Incline Curl","Concentration Curl","Cable Curl","Preacher Curl"],
  "Triceps": ["Tricep Pushdown","Skull Crusher","Overhead Tricep Extension","Close-Grip Bench","Dips","Kickbacks"],
  "Legs": ["Squat","Leg Press","Romanian Deadlift","Leg Curl","Leg Extension","Calf Raise","Lunges","Hip Thrust","Bulgarian Split Squat"],
  "Core": ["Plank","Crunches","Russian Twist","Leg Raise","Cable Crunch","Ab Wheel","Dead Bug","Pallof Press"],
  "Cardio": ["Treadmill","Bike","Rowing Machine","Jump Rope","Stair Climber","Battle Ropes"],
};

function TrainerProgress({ clients }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [progressData, setProgressData] = useState({});
  const [activeGroup, setActiveGroup] = useState("Chest");
  const [editCell, setEditCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [addExercise, setAddExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseGroup, setNewExerciseGroup] = useState("Chest");
  const [customExercises, setCustomExercises] = useState({});
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const clientKey = selectedClient ? selectedClient.id : null;

  useEffect(() => {
    if (!clientKey) return;
    sbFetch(`progress?select=*&clientId=eq.${clientKey}`).then(rows => {
      if (!rows || !Array.isArray(rows)) return;
      const built = {};
      rows.forEach(row => { built[row.exercise] = { sets: row.sets||"", reps: row.reps||"", weight: row.weight||"", notes: row.notes||"", updatedAt: row.updatedAt||"" }; });
      setProgressData(built);
    });
    // Load custom exercises for this client
    sbFetch(`progress_exercises?select=*&clientId=eq.${clientKey}`).then(rows => {
      if (!rows || !Array.isArray(rows)) return;
      const built = {};
      rows.forEach(row => {
        if (!built[row.muscleGroup]) built[row.muscleGroup] = [];
        built[row.muscleGroup].push(row.exercise);
      });
      setCustomExercises(built);
    });
  }, [clientKey]);

  const allExercisesForGroup = (group) => {
    const base = MUSCLE_GROUPS[group] || [];
    const custom = customExercises[group] || [];
    return [...base, ...custom];
  };

  const saveExercise = async (exercise, field, value) => {
    setSaving(true);
    const existing = progressData[exercise] || { sets:"", reps:"", weight:"", notes:"" };
    const updated = { ...existing, [field]: value, updatedAt: new Date().toLocaleDateString() };
    setProgressData(prev => ({ ...prev, [exercise]: updated }));
    await sbFetch(`progress?on_conflict=clientId,exercise`, "POST", [{
      clientId: clientKey, exercise, ...updated
    }], { Prefer: "resolution=merge-duplicates,return=minimal" });
    setSaving(false);
  };

  const handleCellClick = (exercise, field, currentVal) => {
    setEditCell({ exercise, field });
    setEditValue(currentVal || "");
  };

  const handleCellSave = async () => {
    if (!editCell) return;
    await saveExercise(editCell.exercise, editCell.field, editValue);
    setEditCell(null);
  };

  const addCustomExercise = async () => {
    if (!newExerciseName.trim()) return;
    const name = newExerciseName.trim();
    setCustomExercises(prev => ({
      ...prev,
      [newExerciseGroup]: [...(prev[newExerciseGroup]||[]), name]
    }));
    await sbFetch(`progress_exercises`, "POST", [{
      clientId: clientKey, exercise: name, muscleGroup: newExerciseGroup
    }], { Prefer: "resolution=merge-duplicates,return=minimal" });
    setNewExerciseName("");
    setAddExercise(false);
    setActiveGroup(newExerciseGroup);
  };

  const hasData = (exercise) => {
    const d = progressData[exercise];
    return d && (d.sets || d.reps || d.weight);
  };

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">PROGRESS</div>
        <div className="page-subtitle">Track sets, reps and weight per client</div>
      </div>

      {/* Client search bar */}
      <div className="section">
        <div className="section-header"><span className="section-title">Search Client</span></div>
        <div className="section-body">
          <div style={{position:"relative",maxWidth:360}}>
            <input
              value={search}
              onChange={e=>{ setSearch(e.target.value); setShowDropdown(true); }}
              onFocus={()=>setShowDropdown(true)}
              onBlur={()=>setTimeout(()=>setShowDropdown(false),150)}
              placeholder="Type a name..."
              style={{
                width:"100%",padding:"12px 16px",fontSize:15,
                background:"var(--charcoal)",border:"2px solid var(--accent)",
                borderRadius:4,color:"var(--text)",outline:"none",boxSizing:"border-box"
              }}
            />
            {search && (
              <div
                onClick={()=>{ setSearch(""); setSelectedClient(null); }}
                style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",cursor:"pointer",color:"var(--muted)",fontSize:18,lineHeight:1}}
              >✕</div>
            )}
            {showDropdown && search.length > 0 && (() => {
              const filtered = [...clients]
                .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                .sort((a,b) => a.name.localeCompare(b.name));
              if (filtered.length === 0) return (
                <div style={{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,padding:"12px 16px",fontSize:13,color:"var(--muted)",zIndex:100}}>
                  No clients found
                </div>
              );
              return (
                <div style={{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:"var(--charcoal)",border:"1px solid var(--accent)",borderRadius:4,overflow:"hidden",zIndex:100,boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>
                  {filtered.map(c => (
                    <div key={c.id} onMouseDown={()=>{ setSelectedClient(c); setSearch(c.name); setShowDropdown(false); setProgressData({}); setCustomExercises({}); }} style={{
                      padding:"12px 16px",cursor:"pointer",fontSize:14,
                      borderBottom:"1px solid var(--border)",
                      background:selectedClient?.id===c.id?"var(--accent)":"transparent",
                      color:selectedClient?.id===c.id?"var(--black)":"var(--text)",
                      display:"flex",alignItems:"center",gap:10,transition:"background 0.1s"
                    }}
                    onMouseEnter={e=>{ if(selectedClient?.id!==c.id) e.currentTarget.style.background="var(--panel)"; }}
                    onMouseLeave={e=>{ if(selectedClient?.id!==c.id) e.currentTarget.style.background="transparent"; }}
                    >
                      <div style={{
                        width:30,height:30,borderRadius:"50%",flexShrink:0,
                        background:selectedClient?.id===c.id?"rgba(0,0,0,0.2)":"var(--accent)",
                        color:selectedClient?.id===c.id?"var(--black)":"var(--black)",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:11,fontWeight:700
                      }}>{c.name.split(" ").map(x=>x[0]).join("")}</div>
                      <div>
                        <div style={{fontWeight:600}}>{c.name}</div>
                        {c.email && <div style={{fontSize:11,color:selectedClient?.id===c.id?"rgba(0,0,0,0.6)":"var(--muted)"}}>{c.email}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
          {selectedClient && (
            <div style={{marginTop:12,fontSize:13,color:"var(--muted)"}}>
              Viewing: <span style={{color:"var(--accent)",fontWeight:600}}>{selectedClient.name}</span>
            </div>
          )}
        </div>
      </div>

      {selectedClient && (
        <div className="section">
          <div className="section-header">
            <span className="section-title">💪 {selectedClient.name}</span>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {saving && <span style={{fontSize:11,color:"var(--muted)"}}>Saving...</span>}
              <button className="btn-secondary" style={{padding:"4px 12px",fontSize:12}} onClick={()=>setAddExercise(true)}>+ Add Exercise</button>
            </div>
          </div>
          <div className="section-body" style={{padding:0}}>

            {/* Muscle group tabs */}
            <div style={{display:"flex",flexWrap:"wrap",gap:0,borderBottom:"1px solid var(--border)"}}>
              {Object.keys(MUSCLE_GROUPS).map(group => {
                const exercises = allExercisesForGroup(group);
                const filled = exercises.filter(e => hasData(e)).length;
                return (
                  <div key={group} onClick={()=>setActiveGroup(group)} style={{
                    padding:"10px 16px",cursor:"pointer",fontSize:13,fontWeight:500,
                    borderBottom:`2px solid ${activeGroup===group?"var(--accent)":"transparent"}`,
                    color:activeGroup===group?"var(--accent)":"var(--muted)",
                    transition:"all 0.15s",userSelect:"none",position:"relative"
                  }}>
                    {group}
                    {filled > 0 && <span style={{marginLeft:5,background:"var(--accent)",color:"var(--black)",borderRadius:10,padding:"1px 5px",fontSize:9,fontWeight:700}}>{filled}</span>}
                  </div>
                );
              })}
            </div>

            {/* Exercise table */}
            <div style={{padding:"16px 20px"}}>
              <table className="table" style={{marginBottom:0}}>
                <thead>
                  <tr>
                    <th style={{width:"40%"}}>Exercise</th>
                    <th style={{textAlign:"center"}}>Sets</th>
                    <th style={{textAlign:"center"}}>Reps</th>
                    <th style={{textAlign:"center"}}>Weight (lbs)</th>
                    <th style={{textAlign:"center"}}>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {allExercisesForGroup(activeGroup).map(exercise => {
                    const d = progressData[exercise] || {};
                    return (
                      <tr key={exercise} style={{background:hasData(exercise)?"#3ec9c908":"transparent"}}>
                        <td style={{fontWeight:hasData(exercise)?600:400,color:hasData(exercise)?"var(--text)":"var(--muted)"}}>
                          {exercise}
                        </td>
                        {["sets","reps","weight"].map(field => (
                          <td key={field} style={{textAlign:"center"}}>
                            {editCell?.exercise===exercise && editCell?.field===field ? (
                              <input
                                type="number"
                                value={editValue}
                                autoFocus
                                onChange={e=>setEditValue(e.target.value)}
                                onBlur={handleCellSave}
                                onKeyDown={e=>{ if(e.key==="Enter") handleCellSave(); if(e.key==="Escape") setEditCell(null); }}
                                style={{
                                  width:70,textAlign:"center",background:"var(--charcoal)",
                                  border:"1px solid var(--accent)",borderRadius:2,
                                  color:"var(--text)",padding:"4px",fontSize:13
                                }}
                              />
                            ) : (
                              <div
                                onClick={()=>handleCellClick(exercise, field, d[field])}
                                style={{
                                  cursor:"pointer",padding:"6px 8px",borderRadius:2,
                                  minWidth:50,display:"inline-block",
                                  background:d[field]?"var(--charcoal)":"transparent",
                                  border:`1px solid ${d[field]?"var(--border)":"transparent"}`,
                                  color:d[field]?"var(--text)":"var(--border)",
                                  fontSize:13,transition:"all 0.1s"
                                }}
                                title="Click to edit"
                              >
                                {d[field] || "—"}
                              </div>
                            )}
                          </td>
                        ))}
                        <td style={{textAlign:"center",fontSize:11,color:"var(--muted)"}}>
                          {d.updatedAt || "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Exercise Modal */}
      {addExercise && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setAddExercise(false)}>
          <div className="modal" style={{maxWidth:380}}>
            <div className="modal-header">
              <div className="bebas modal-title">ADD EXERCISE</div>
              <button className="modal-close" onClick={()=>setAddExercise(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label>Exercise Name</label>
                <input value={newExerciseName} onChange={e=>setNewExerciseName(e.target.value)} placeholder="e.g. Cable Lateral Raise" autoFocus onKeyDown={e=>e.key==="Enter"&&addCustomExercise()} />
              </div>
              <div className="form-row">
                <label>Muscle Group</label>
                <select value={newExerciseGroup} onChange={e=>setNewExerciseGroup(e.target.value)}>
                  {Object.keys(MUSCLE_GROUPS).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={()=>setAddExercise(false)}>Cancel</button>
              <button className="btn-primary" style={{width:"auto",padding:"10px 24px"}} onClick={addCustomExercise}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── AI Agent ─────────────────────────────────────────────────────────────────
function AIAgent({ clients, sessions, setSessions }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your gym assistant. I can help you manage your schedule and clients. Try asking me to clear past sessions, show stats, or anything else about your gym data." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const today = new Date(); today.setHours(0,0,0,0);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  const executeAction = async (action, params) => {
    switch(action) {
      case "clear_past_sessions": {
        // Keep sessions but remove all clientIds from past sessions
        const updated = sessions.map(s => {
          if (s.date && s.date < todayStr) return { ...s, clientIds: [] };
          return s;
        });
        const pastSessions = updated.filter(s => s.date && s.date < todayStr);
        // Batch update in Supabase
        for (let i = 0; i < pastSessions.length; i += 50) {
          const batch = pastSessions.slice(i, i+50);
          for (const s of batch) {
            await sbFetch(`sessions?id=eq.${s.id}`, "PATCH", { clientIds: [] });
          }
        }
        setSessions(updated);
        const count = pastSessions.length;
        return `✓ Cleared client names from ${count} past session${count!==1?"s":""}. Time slots kept.`;
      }
      case "clear_week_sessions": {
        const weekStr = params?.week || "";
        const updated = sessions.map(s => {
          if (s.date && s.date >= weekStr && s.date < params?.weekEnd) return { ...s, clientIds: [] };
          return s;
        });
        const cleared = updated.filter(s => s.date && s.date >= weekStr && s.date < params?.weekEnd);
        for (const s of cleared) {
          await sbFetch(`sessions?id=eq.${s.id}`, "PATCH", { clientIds: [] });
        }
        setSessions(updated);
        return `✓ Cleared ${cleared.length} sessions for the selected week.`;
      }
      case "show_stats": {
        const totalClients = clients.length;
        const activeClients = clients.filter(c=>c.active).length;
        const upcomingSessions = sessions.filter(s=>s.date>=todayStr && s.clientIds.length>0).length;
        const pastSessions = sessions.filter(s=>s.date<todayStr && s.clientIds.length>0).length;
        return `📊 Stats:
• ${totalClients} total clients (${activeClients} active)
• ${upcomingSessions} upcoming booked sessions
• ${pastSessions} past sessions with bookings`;
      }
      case "list_clients": {
        const sorted = [...clients].sort((a,b)=>a.name.localeCompare(b.name));
        return `👥 ${sorted.length} clients:
${sorted.map(c=>`• ${c.name}${c.active?"":" (inactive)"}`).join("
")}`;
      }
      default:
        return null;
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      // Build context about the gym data
      const upcomingSessions = sessions.filter(s=>s.date>=todayStr).length;
      const pastSessions = sessions.filter(s=>s.date<todayStr).length;
      const bookedPast = sessions.filter(s=>s.date<todayStr && s.clientIds.length>0).length;

      const systemPrompt = `You are an AI assistant for a gym scheduling app. You help the trainer manage their gym.

Current gym data:
- ${clients.length} clients (${clients.filter(c=>c.active).length} active)
- ${sessions.length} total sessions
- ${upcomingSessions} upcoming sessions
- ${pastSessions} past sessions (${bookedPast} had bookings)
- Today: ${todayStr}

You can execute the following actions by responding with a JSON block like this:
<action>{"type":"action_name","params":{}}</action>

Available actions:
- clear_past_sessions — removes all client names from past sessions (keeps time slots)
- show_stats — shows gym statistics
- list_clients — lists all clients

For anything else, just respond conversationally and helpfully.
Always explain what you are doing before executing an action.
Keep responses concise.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...messages.filter(m=>m.role!=="system").map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
            { role: "user", content: userMsg }
          ]
        })
      });

      const data = await response.json();
      const rawText = data.content?.[0]?.text || "Sorry, I couldn't process that.";

      // Check for action tags
      const actionMatch = rawText.match(/<action>(.*?)<\/action>/s);
      let displayText = rawText.replace(/<action>.*?<\/action>/s, "").trim();
      let actionResult = null;

      if (actionMatch) {
        try {
          const actionData = JSON.parse(actionMatch[1]);
          actionResult = await executeAction(actionData.type, actionData.params);
        } catch(e) {
          actionResult = "⚠️ Action failed: " + e.message;
        }
      }

      const finalText = actionResult ? `${displayText}

${actionResult}` : displayText;
      setMessages(prev => [...prev, { role: "assistant", text: finalText }]);
    } catch(e) {
      setMessages(prev => [...prev, { role: "assistant", text: "⚠️ Error connecting to AI. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">AI AGENT</div>
        <div className="page-subtitle">Ask me to manage your schedule, clients and data</div>
      </div>

      <div className="section" style={{display:"flex",flexDirection:"column",height:"calc(100vh - 160px)"}}>
        {/* Suggestion chips */}
        <div style={{padding:"12px 20px",borderBottom:"1px solid var(--border)",display:"flex",gap:8,flexWrap:"wrap"}}>
          {[
            "Clear all past session bookings",
            "Show me gym stats",
            "List all clients",
          ].map(s => (
            <div key={s} onClick={()=>{ setInput(s); }} style={{
              padding:"6px 14px",borderRadius:20,fontSize:12,cursor:"pointer",
              border:"1px solid var(--accent)",color:"var(--accent)",
              background:"transparent",userSelect:"none",transition:"all 0.15s"
            }}>{s}</div>
          ))}
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:"20px"}}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",
              marginBottom:16
            }}>
              {m.role==="assistant" && (
                <div style={{width:32,height:32,borderRadius:"50%",background:"var(--accent)",color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,marginRight:10,marginTop:2}}>🤖</div>
              )}
              <div style={{
                maxWidth:"75%",padding:"12px 16px",borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",
                background:m.role==="user"?"var(--accent)":"var(--charcoal)",
                color:m.role==="user"?"var(--black)":"var(--text)",
                fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap",
                border:m.role==="assistant"?"1px solid var(--border)":"none"
              }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"var(--accent)",color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🤖</div>
              <div style={{padding:"12px 16px",borderRadius:"12px 12px 12px 2px",background:"var(--charcoal)",border:"1px solid var(--border)",fontSize:13,color:"var(--muted)"}}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{padding:"16px 20px",borderTop:"1px solid var(--border)",display:"flex",gap:10}}>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
            placeholder="Ask me anything about your gym..."
            disabled={loading}
            style={{
              flex:1,padding:"12px 16px",fontSize:14,
              background:"var(--charcoal)",border:"1px solid var(--border)",
              borderRadius:4,color:"var(--text)",outline:"none"
            }}
          />
          <button
            className="btn-primary"
            style={{width:"auto",padding:"12px 20px",fontSize:14,opacity:loading?0.5:1}}
            onClick={sendMessage}
            disabled={loading}
          >Send</button>
        </div>
      </div>
    </>
  );
}

// ─── Client App ───────────────────────────────────────────────────────────────
function ClientApp({ user, clients, sessions, saveClients, onLogout }) {
  const [tab, setTab] = useState("schedule");
  const nav = [
    { id:"schedule", icon:"📅", label:"My Schedule" },
    { id:"availability", icon:"✅", label:"My Availability" },
    { id:"account", icon:"👤", label:"Account" },
  ];

  const client = clients.find(c=>c.id===user.id);
  const mySessions = sessions.filter(s=>s.clientIds.includes(user.id)).sort((a,b)=>{
    const da = a.date||"", db = b.date||"";
    return da < db ? -1 : da > db ? 1 : TIMES.indexOf(a.time)-TIMES.indexOf(b.time);
  });
  const sessionsLeft = client ? client.sessionsTotal - client.sessionsUsed : 0;

  return (
    <div className="app-shell">
      <Sidebar user={user} nav={nav} tab={tab} setTab={setTab} onLogout={onLogout} role="CLIENT" />
      <div className="main-content" style={{overflowY:"auto"}}>
        {tab === "schedule" && <ClientSchedule client={client} mySessions={mySessions} sessionsLeft={sessionsLeft} />}
        {tab === "availability" && <ClientAvailability client={client} />}
        {tab === "account" && <ClientAccount client={client} sessionsLeft={sessionsLeft} />}
      </div>
    </div>
  );
}

function ClientSchedule({ client, mySessions, sessionsLeft }) {
  if (!client) return null;
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

  const sessionsForDate = (d) => {
    const key = dateKey(d);
    return mySessions.filter(s => s.date === key).sort((a,b)=>TIMES.indexOf(a.time)-TIMES.indexOf(b.time));
  };

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth+1, 0);
  const startPad = firstDay.getDay();
  const totalCells = Math.ceil((startPad + lastDay.getDate()) / 7) * 7;
  const cells = Array.from({length: totalCells}, (_,i) => {
    const d = new Date(viewYear, viewMonth, i - startPad + 1);
    return d.getMonth() === viewMonth ? d : null;
  });

  const prevMonth = () => { if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else{setViewMonth(m=>m-1);} setSelectedDate(null); };
  const nextMonth = () => { if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else{setViewMonth(m=>m+1);} setSelectedDate(null); };

  const pct = Math.round((client.sessionsUsed/client.sessionsTotal)*100);
  const left = client.sessionsTotal - client.sessionsUsed;

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">MY SCHEDULE</div>
        <div className="page-subtitle">Your sessions, {client.name.split(" ")[0]}</div>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Sessions" value={mySessions.length} sub="scheduled" />
        <StatCard label="Sessions Left" value={left} sub={`of ${client.sessionsTotal} purchased`} accent={left<5?"red":undefined} />
        <StatCard label="Sessions Used" value={client.sessionsUsed} sub="completed" />
        <StatCard label="Completion" value={`${pct}%`} sub="of package used" />
      </div>

      <div className="section" style={{marginBottom:16}}>
        <div className="section-header"><span className="section-title">Session Package</span></div>
        <div className="section-body">
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:13}}>
            <span style={{color:"var(--muted)"}}>Progress</span>
            <span>{client.sessionsUsed} / {client.sessionsTotal} sessions</span>
          </div>
          <div className="progress-wrap">
            <div className="progress-fill" style={{width:`${pct}%`,background:left===0?"var(--red)":left<5?"var(--accent2)":"var(--accent)"}} />
          </div>
          {left === 0 && <div style={{color:"var(--red)",fontSize:12,marginTop:8}}>⚠ Package complete — contact your trainer to renew.</div>}
          {left > 0 && left <= 5 && <div style={{color:"var(--accent2)",fontSize:12,marginTop:8}}>⚡ {left} session{left>1?"s":""} remaining — consider renewing soon.</div>}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={prevMonth}>‹</button>
            <span className="bebas" style={{fontSize:22,color:"var(--text)",letterSpacing:2}}>{MONTH_NAMES[viewMonth]} {viewYear}</span>
            <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={nextMonth}>›</button>
          </div>
        </div>
        <div style={{padding:0}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:"1px solid var(--border)"}}>
            {DAY_NAMES.map(d=>(
              <div key={d} style={{padding:"10px 0",textAlign:"center",fontSize:10,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)"}}>{d}</div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
            {cells.map((d,i) => {
              if (!d) return <div key={i} style={{minHeight:70,borderRight:"1px solid var(--border)",borderBottom:"1px solid var(--border)",background:"var(--black)"}} />;
              const daySessions = sessionsForDate(d);
              const hasSessions = daySessions.length > 0;
              const sel = selectedDate && dateKey(d) === dateKey(selectedDate);
              const tod = dateKey(d) === dateKey(today);
              return (
                <div key={i} onClick={()=>setSelectedDate(d)}
                  style={{
                    minHeight:70, padding:"8px 6px", cursor: hasSessions ? "pointer" : "default",
                    borderRight:"1px solid var(--border)", borderBottom:"1px solid var(--border)",
                    background: sel ? "#3ec9c915" : "transparent",
                  }}
                >
                  <div style={{
                    width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:13,fontWeight:500,marginBottom:4,
                    background: tod ? "var(--accent)" : "transparent",
                    color: tod ? "var(--black)" : sel ? "var(--accent)" : "var(--text)",
                    border: sel && !tod ? "1px solid var(--accent)" : "none",
                  }}>{d.getDate()}</div>
                  {hasSessions && (
                    <div style={{display:"flex",flexDirection:"column",gap:2}}>
                      {daySessions.slice(0,2).map(s=>(
                        <div key={s.id} style={{
                          fontSize:9,padding:"2px 5px",borderRadius:2,
                          background:"#3ec9c925",color:"var(--accent)",
                          whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"
                        }}>{s.time}</div>
                      ))}
                      {daySessions.length > 2 && <div style={{fontSize:9,color:"var(--muted)",paddingLeft:4}}>+{daySessions.length-2} more</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && sessionsForDate(selectedDate).length > 0 && (
        <div className="section" style={{animation:"fadeUp 0.3s ease"}}>
          <div className="section-header">
            <span className="bebas" style={{fontSize:20,color:"var(--text)"}}>
              {DAY_NAMES[selectedDate.getDay()]} {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()}
            </span>
          </div>
          <div className="section-body">
            {sessionsForDate(selectedDate).map(s => (
              <div key={s.id} className="session-card">
                <div className="session-time bebas">{s.time}</div>
                <div className="session-info">
                  <div style={{fontWeight:500}}>Group Session</div>

                  {s.notes && <div className="session-note">📝 {s.notes}</div>}
                </div>
                <span className="badge badge-accent">Confirmed</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function ClientAvailability({ client }) {
  const DAY_ABBREVS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MONTH_ABBREVS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

  // Build list of upcoming Mondays (next 4 weeks)
  const getUpcomingWeeks = () => {
    const today = new Date(); today.setHours(0,0,0,0);
    const dow = today.getDay();
    const daysUntilMon = dow === 0 ? 1 : 8 - dow;
    const weeks = [];
    for (let w = 0; w < 4; w++) {
      const monday = new Date(today);
      monday.setDate(today.getDate() + daysUntilMon + w * 7);
      weeks.push(monday);
    }
    return weeks;
  };

  const upcomingWeeks = getUpcomingWeeks();
  const [selectedWeek, setSelectedWeek] = useState(upcomingWeeks[0]);
  const [allData, setAllData] = useState({}); // key: weekMonday dateKey, value: { slots, trainingsWanted, saved }
  const [saved, setSaved] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const weekKey = (monday) => dateKey(monday);

  const weekLabel = (monday) => {
    const sat = new Date(monday); sat.setDate(monday.getDate() + 5);
    return `Week of ${MONTH_ABBREVS[monday.getMonth()]} ${monday.getDate()}`;
  };

  const getWeekDates = (monday) => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      if (d.getDay() !== 0) dates.push(d);
    }
    return dates;
  };

  const timesForDate = (d) => {
    const weekday = d.getDay();
    const morning = ["7:00 AM","8:00 AM","9:00 AM","10:00 AM"];
    const evening = ["5:00 PM","6:00 PM","7:00 PM"];
    const saturday = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM"];
    if (weekday === 6) return saturday;
    if (weekday >= 1 && weekday <= 4) return [...morning, ...evening];
    return morning;
  };

  useEffect(() => {
    // Load all availability rows for this client
    sbFetch(`availability?select=*&clientId=eq.${client.id}`).then(rows => {
      if (!rows || !Array.isArray(rows)) return;
      const built = {};
      rows.forEach(row => {
        const wk = row.weekKey;
        if (!wk) return;
        const slots = {};
        (Array.isArray(row.slots) ? row.slots : JSON.parse(row.slots||"[]")).forEach(s => {
          const parts = s.split(" ");
          if (parts.length >= 3) {
            const dk = parts[0];
            const time = parts.slice(1).join(" ");
            if (!slots[dk]) slots[dk] = {};
            slots[dk][time] = true;
          }
        });
        built[wk] = { slots, trainingsWanted: row.trainingsWanted||0, saved: true };
      });
      setAllData(built);
    });
  }, [client.id]);

  const wk = weekKey(selectedWeek);
  const current = allData[wk] || { slots: {}, trainingsWanted: 0, saved: false };
  const slots = current.slots;
  const trainingsWanted = current.trainingsWanted;

  const setSlots = (fn) => {
    setAllData(prev => {
      const cur = prev[wk] || { slots: {}, trainingsWanted: 0, saved: false };
      const newSlots = typeof fn === "function" ? fn(cur.slots) : fn;
      return { ...prev, [wk]: { ...cur, slots: newSlots } };
    });
  };

  const setTrainingsWanted = (n) => {
    setAllData(prev => {
      const cur = prev[wk] || { slots: {}, trainingsWanted: 0, saved: false };
      return { ...prev, [wk]: { ...cur, trainingsWanted: n } };
    });
  };

  const toggle = (dk, time) => {
    setSlots(prev => {
      const d = {...(prev[dk]||{})};
      d[time] ? delete d[time] : (d[time] = true);
      return {...prev, [dk]: d};
    });
  };

  const submit = async () => {
    const flatSlots = [];
    Object.entries(slots).forEach(([dk, times]) => {
      Object.keys(times).forEach(t => flatSlots.push(`${dk} ${t}`));
    });
    const date = new Date().toLocaleDateString();
    const row = { clientId: client.id, slots: flatSlots, date, trainingsWanted, weekKey: wk };
    await sbFetch(`availability?on_conflict=clientId,weekKey`, "POST", [row], {
      Prefer: "resolution=merge-duplicates,return=minimal"
    });
    setAllData(prev => ({ ...prev, [wk]: { ...current, slots, trainingsWanted, saved: true } }));
    setSaved(wk);
    setTimeout(() => setSaved(false), 100);
  };

  const weekDates = getWeekDates(selectedWeek);
  const totalSelected = Object.values(slots).reduce((a,v)=>a+Object.keys(v).length,0);
  const flatSubmitted = current.saved ? Object.entries(slots).flatMap(([dk,times]) => Object.keys(times).map(t=>`${dk} ${t}`)) : [];

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">MY AVAILABILITY</div>
        <div className="page-subtitle">Select which week and your available times</div>
      </div>

      {/* Week selector */}
      <div className="section">
        <div className="section-header"><span className="section-title">Select a Week</span></div>
        <div className="section-body">
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {upcomingWeeks.map((monday, i) => {
              const wkk = weekKey(monday);
              const hasData = allData[wkk]?.saved;
              const isSelected = wkk === wk;
              return (
                <div key={wkk} onClick={()=>setSelectedWeek(monday)} style={{
                  padding:"12px 20px",borderRadius:4,cursor:"pointer",
                  border:`2px solid ${isSelected?"var(--accent)":hasData?"var(--green)":"var(--border)"}`,
                  background:isSelected?"var(--accent)":hasData?"#22c55e10":"var(--charcoal)",
                  color:isSelected?"var(--black)":hasData?"var(--green)":"var(--text)",
                  transition:"all 0.15s",userSelect:"none",minWidth:160
                }}>
                  <div style={{fontWeight:700,fontSize:14}}>{weekLabel(monday)}</div>
                  <div style={{fontSize:11,marginTop:4,opacity:0.8}}>
                    {hasData ? `✓ ${allData[wkk].trainingsWanted||"?"} sessions · ${Object.values(allData[wkk].slots).reduce((a,v)=>a+Object.keys(v).length,0)} slots` : i===0?"Next week":"Available"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Availability form for selected week */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">{weekLabel(selectedWeek)}</span>
          {totalSelected > 0 && <span style={{fontSize:12,color:"var(--muted)"}}>{totalSelected} slot{totalSelected!==1?"s":""} selected</span>}
        </div>
        <div className="section-body">
          {/* Sessions wanted */}
          <div style={{marginBottom:24}}>
            <div style={{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:12}}>How many sessions do you want this week?</div>
            <div style={{display:"flex",gap:10}}>
              {[1,2,3,4,5].map(n => (
                <div key={n} onClick={()=>setTrainingsWanted(n)} style={{
                  width:52,height:52,borderRadius:4,cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:22,fontWeight:700,
                  border:`2px solid ${trainingsWanted===n?"var(--accent)":"var(--border)"}`,
                  background:trainingsWanted===n?"var(--accent)":"var(--charcoal)",
                  color:trainingsWanted===n?"var(--black)":"var(--text)",
                  transition:"all 0.15s",userSelect:"none"
                }}>{n}</div>
              ))}
            </div>
          </div>

          {/* Days */}
          {weekDates.map(d => {
            const dk = dateKey(d);
            const times = timesForDate(d);
            const morning = times.filter(t=>t.includes("AM"));
            const evening = times.filter(t=>t.includes("PM"));
            return (
              <div key={dk} className="day-avail-row" style={{marginBottom:16,alignItems:"flex-start"}}>
                <div className="day-avail-label" style={{minWidth:70,paddingTop:4}}>
                  <div style={{fontWeight:600,color:"var(--text)"}}>{DAY_ABBREVS[d.getDay()]}</div>
                  <div style={{fontSize:11,color:"var(--muted)"}}>{MONTH_ABBREVS[d.getMonth()]} {d.getDate()}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  <div className="time-chips">
                    {morning.map(t => (
                      <div key={t} className={`time-chip${slots[dk]?.[t]?" selected":""}`} onClick={()=>toggle(dk,t)}>{t}</div>
                    ))}
                  </div>
                  {evening.length > 0 && (
                    <div className="time-chips">
                      {evening.map(t => (
                        <div key={t} className={`time-chip${slots[dk]?.[t]?" selected":""}`} onClick={()=>toggle(dk,t)}>{t}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div style={{marginTop:20}}>
            <button className="btn-primary" style={{width:"auto",padding:"12px 32px",fontSize:15}} onClick={()=>setShowConfirm(true)}>SUBMIT AVAILABILITY</button>
          </div>

          {/* Confirmation popup */}
          {showConfirm && (
            <div style={{
              position:"fixed",top:0,left:0,right:0,bottom:0,
              background:"rgba(0,0,0,0.7)",zIndex:1000,
              display:"flex",alignItems:"center",justifyContent:"center",
              animation:"fadeIn 0.2s ease"
            }}>
              <div style={{
                background:"var(--charcoal)",border:"2px solid var(--accent)",
                borderRadius:6,padding:"32px 36px",maxWidth:420,width:"90%",
                textAlign:"center",animation:"fadeUp 0.3s ease"
              }}>
                <div style={{fontSize:40,marginBottom:12}}>📋</div>
                <div className="bebas" style={{fontSize:26,color:"var(--accent)",marginBottom:8}}>CONFIRM AVAILABILITY</div>
                <div style={{fontSize:13,color:"var(--muted)",marginBottom:6}}>
                  You are submitting availability for
                </div>
                <div style={{fontSize:15,color:"var(--text)",fontWeight:600,marginBottom:6}}>
                  {weekLabel(selectedWeek)}
                </div>
                {trainingsWanted > 0 && (
                  <div style={{fontSize:13,color:"var(--muted)",marginBottom:16}}>
                    Requesting <span style={{color:"var(--accent)",fontWeight:700}}>{trainingsWanted}</span> session{trainingsWanted>1?"s":""}
                  </div>
                )}
                <div style={{fontSize:13,color:"var(--muted)",marginBottom:12}}>
                  <span style={{color:"var(--text)",fontWeight:600}}>{totalSelected}</span> time slot{totalSelected!==1?"s":""} selected
                </div>

                {/* Show selected days and times */}
                <div style={{textAlign:"left",marginBottom:24,maxHeight:200,overflowY:"auto"}}>
                  {weekDates.filter(d => Object.keys(slots[dateKey(d)]||{}).length > 0).map(d => {
                    const dk = dateKey(d);
                    const times = Object.keys(slots[dk]||{}).sort((a,b) => TIMES.indexOf(a)-TIMES.indexOf(b));
                    return (
                      <div key={dk} style={{marginBottom:8}}>
                        <div style={{fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:4}}>
                          {DAY_ABBREVS[d.getDay()]} {MONTH_ABBREVS[d.getMonth()]} {d.getDate()}
                        </div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                          {times.map(t => (
                            <span key={t} style={{
                              padding:"3px 8px",borderRadius:2,fontSize:11,
                              background:"var(--accent)",color:"var(--black)",fontWeight:600
                            }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                  <button className="btn-secondary" style={{padding:"12px 28px",fontSize:14}} onClick={()=>setShowConfirm(false)}>
                    Cancel
                  </button>
                  <button className="btn-primary" style={{width:"auto",padding:"12px 28px",fontSize:14}} onClick={async()=>{ setShowConfirm(false); await submit(); }}>
                    ✓ Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Persistent confirmation */}
          {current.saved && flatSubmitted.length > 0 && (
            <div style={{marginTop:24,padding:"20px 24px",borderRadius:4,background:"#3ec9c920",border:"2px solid var(--accent)",animation:"fadeUp 0.3s ease"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"var(--accent)",color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,flexShrink:0}}>✓</div>
                <div>
                  <div className="bebas" style={{fontSize:20,color:"var(--accent)"}}>AVAILABILITY SUBMITTED!</div>
                  <div style={{fontSize:12,color:"var(--muted)"}}>Saved for {weekLabel(selectedWeek)}</div>
                </div>
              </div>
              {trainingsWanted > 0 && (
                <div style={{fontSize:13,color:"var(--text)",marginBottom:10}}>
                  🎯 You want <span style={{color:"var(--accent)",fontWeight:700}}>{trainingsWanted}</span> session{trainingsWanted>1?"s":""} this week
                </div>
              )}
              <div style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>Your available times:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {flatSubmitted.slice(0,8).map((s,i) => {
                  const parts = s.split(" ");
                  const d = new Date(parts[0]+"T12:00:00");
                  const time = parts.slice(1).join(" ");
                  return (
                    <span key={i} style={{padding:"4px 10px",borderRadius:2,fontSize:11,background:"var(--accent)",color:"var(--black)",fontWeight:600}}>
                      {DAY_ABBREVS[d.getDay()]} {MONTH_ABBREVS[d.getMonth()]} {d.getDate()} · {time}
                    </span>
                  );
                })}
                {flatSubmitted.length > 8 && <span style={{padding:"4px 10px",borderRadius:2,fontSize:11,background:"var(--charcoal)",color:"var(--muted)"}}>+{flatSubmitted.length-8} more</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ClientAccount({ client, sessionsLeft }) {
  if (!client) return null;
  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">ACCOUNT</div>
        <div className="page-subtitle">Your profile and package details</div>
      </div>
      <div className="two-col">
        <div className="section">
          <div className="section-header"><span className="section-title">Profile</span></div>
          <div className="section-body">
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
              <div className="user-avatar" style={{width:56,height:56,fontSize:20}}>{client.name.split(" ").map(x=>x[0]).join("")}</div>
              <div>
                <div style={{fontWeight:600,fontSize:16}}>{client.name}</div>
                <div style={{color:"var(--muted)",fontSize:13}}>{client.email}</div>
              </div>
            </div>
            <div style={{color:"var(--muted)",fontSize:12,lineHeight:1.8}}>
              <div>Status: <span style={{color:client.active?"var(--green)":"var(--red)"}}>{client.active?"Active":"Inactive"}</span></div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-header"><span className="section-title">Package</span></div>
          <div className="section-body">
            <StatCard label="Sessions Remaining" value={sessionsLeft} sub={`of ${client.sessionsTotal} total`} accent={sessionsLeft<5?"red":undefined} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Shared components ────────────────────────────────────────────────────────
function Sidebar({ user, nav, tab, setTab, onLogout, role }) {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <div className="bebas topbar-logo-text">ML FITNESS</div>
        <div className="topbar-role">{role}</div>
      </div>
      <div className="topbar-nav">
        {nav.map(n=>(
          <div key={n.id} className={`nav-item${tab===n.id?" active":""}`} onClick={()=>setTab(n.id)}>
            <span className="nav-icon">{n.icon}</span>
            {n.label}
          </div>
        ))}
      </div>
      <div className="user-pill">
        <div className="user-avatar">{user.name[0]}</div>
        <div className="user-name">{user.name.split(" ")[0]}</div>
        <button className="logout-btn" title="Log out" onClick={onLogout}>⏻</button>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="bebas stat-value" style={accent==="red"?{color:"var(--red)"}:{}}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
