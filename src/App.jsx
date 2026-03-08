import { useState, useEffect, useRef, Fragment } from "react";

const BluIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left ear - pointy, brown */}
    <polygon points="14,28 10,6 22,24" fill="#8B5E3C"/>
    {/* Right ear */}
    <polygon points="50,28 54,6 42,24" fill="#8B5E3C"/>
    {/* Inner ear */}
    <polygon points="14,26 12,10 20,23" fill="#C4856A" opacity="0.6"/>
    <polygon points="50,26 52,10 44,23" fill="#C4856A" opacity="0.6"/>
    {/* Head - warm brown */}
    <ellipse cx="32" cy="34" rx="20" ry="19" fill="#A0673A"/>
    {/* White chest/chin patch */}
    <ellipse cx="32" cy="40" rx="12" ry="10" fill="#E8DDD0"/>
    {/* Darker brown fur marking on top of head */}
    <ellipse cx="32" cy="24" rx="13" ry="8" fill="#7A4E2D" opacity="0.5"/>
    {/* Snout - lighter */}
    <ellipse cx="32" cy="43" rx="9" ry="6" fill="#C8A882"/>
    {/* Nose */}
    <ellipse cx="32" cy="38" rx="4" ry="3" fill="#3D2010"/>
    {/* Nostrils */}
    <ellipse cx="30" cy="39" rx="1" ry="0.8" fill="#2A150A" opacity="0.7"/>
    <ellipse cx="34" cy="39" rx="1" ry="0.8" fill="#2A150A" opacity="0.7"/>
    {/* Eyes - Blu's signature blue */}
    <ellipse cx="24" cy="30" rx="4" ry="4" fill="#1A1A2E"/>
    <ellipse cx="40" cy="30" rx="4" ry="4" fill="#1A1A2E"/>
    {/* Blue iris */}
    <ellipse cx="24" cy="30" rx="2.8" ry="2.8" fill="#4A9FD4"/>
    <ellipse cx="40" cy="30" rx="2.8" ry="2.8" fill="#4A9FD4"/>
    {/* Pupil */}
    <ellipse cx="24" cy="30" rx="1.4" ry="1.4" fill="#0D0D0D"/>
    <ellipse cx="40" cy="30" rx="1.4" ry="1.4" fill="#0D0D0D"/>
    {/* Eye shine */}
    <ellipse cx="25" cy="29" rx="0.8" ry="0.8" fill="white" opacity="0.9"/>
    <ellipse cx="41" cy="29" rx="0.8" ry="0.8" fill="white" opacity="0.9"/>
    {/* Happy open mouth */}
    <path d="M24 46 Q32 52 40 46" stroke="#3D2010" strokeWidth="1.2" fill="#C45A5A" strokeLinecap="round"/>
    {/* Tongue */}
    <ellipse cx="32" cy="50" rx="5" ry="4" fill="#E87070"/>
    <path d="M27 50 Q32 55 37 50" fill="#D45A5A"/>
    {/* Tongue line */}
    <line x1="32" y1="46" x2="32" y2="53" stroke="#C04040" strokeWidth="0.8" opacity="0.5"/>
  </svg>
);

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

    @media (max-width: 640px) {
      /* Hide top nav items, show bottom nav */
      .topbar-nav { display: none; }
      .topbar { padding: 0 16px; height: 52px; }
      .topbar-logo { margin-right: 0; }
      .topbar-logo-text { font-size: 18px; }
      .user-name { display: none; }

      /* Prevent ALL horizontal overflow */
      body, #root { overflow-x: clip; max-width: 100vw; }
      .app-shell { overflow-x: clip; }
      .main-content { overflow-x: clip; }
      * { box-sizing: border-box; }

      /* Bottom navigation bar */
      .bottom-nav {
        display: flex !important;
        position: fixed;
        bottom: 0; left: 0; right: 0;
        background: var(--charcoal);
        border-top: 1px solid var(--border);
        z-index: 100;
        padding: 0;
        padding-bottom: env(safe-area-inset-bottom);
      }
      .bottom-nav-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 4px 8px;
        gap: 3px;
        cursor: pointer;
        color: var(--muted);
        font-size: 9px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border: none;
        background: none;
        transition: color 0.15s;
        min-height: 58px;
      }
      .bottom-nav-item.active { color: var(--accent); }
      .bottom-nav-icon { font-size: 20px; line-height: 1; }

      /* Blu bubble above bottom nav on mobile */
      .blu-bubble {
        bottom: 72px !important;
      }
      .blu-panel {
        bottom: 132px !important;
        width: calc(100vw - 32px) !important;
        right: 16px !important;
        height: 65vh !important;
      }
      /* Main content padding for bottom nav */
      .main-content {
        padding: 16px 12px 80px;
      }

      /* Page header smaller */
      .page-title { font-size: 28px; }
      .page-subtitle { font-size: 12px; }
      .page-header { margin-bottom: 16px; padding: 16px 12px 0; }

      /* Stats grid 2 col */
      .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
      .stat-card { padding: 14px; }
      .stat-value { font-size: 26px; }

      /* Sections */
      .section { margin-bottom: 16px; }
      .section-body { padding: 12px; }
      .section-header { padding: 12px; }

      /* Tables — scroll within wrapper only, not full page */
      .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%; }
      table { min-width: 0; width: 100%; }
      th, td { padding: 8px 6px; font-size: 12px; }

      /* Modals full screen on mobile */
      .modal-overlay { align-items: flex-end; padding: 0; }
      .modal {
        border-radius: 16px 16px 0 0;
        max-height: 90vh;
        overflow-y: auto;
        width: 100%;
        max-width: 100%;
      }
      .modal-body { padding: 16px; }
      .modal-footer { padding: 12px 16px; flex-wrap: wrap; gap: 8px; }
      .modal-footer button { flex: 1; min-width: 100px; }

      /* Login box */
      .login-wrap { padding: 20px 16px; }
      .login-box { padding: 28px 20px; }

      /* Buttons larger tap targets */
      .btn-primary, .btn-secondary { min-height: 44px; font-size: 14px; }

      /* Form inputs larger */
      .field-input, input, select, textarea {
        font-size: 16px !important; /* prevent zoom on iOS */
        min-height: 44px;
      }

      /* Two col always single on mobile */
      .two-col { grid-template-columns: 1fr; gap: 12px; }

      /* Week grid 2 col */
      .week-grid { grid-template-columns: repeat(2, 1fr); }

      /* Calendar cells smaller */
      .cal-cell { min-height: 48px; font-size: 12px; }
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
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJka2xwYXFsa2JwbW14dm16cHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjM2MDUsImV4cCI6MjA4NzA5OTYwNX0.6Hwgvz4CHANbYXciRp_T7aQwXhOIB2KAVwjsdxUn_d0";

// Edge Function login - mints JWT with app_role at root level for RLS
// Token stored in localStorage so it persists across reloads
const auth = {
  set(token) { localStorage.setItem("ml_jwt", token); },
  clear() { localStorage.removeItem("ml_jwt"); },
  get token() { return localStorage.getItem("ml_jwt"); },
  async login(email, password) {
    const res = await fetch(SUPABASE_URL + "/functions/v1/get-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    return data;
  }
};
const TABLE_MAP = { gym_clients:"clients", gym_sessions:"sessions", gym_availability:"availability" };

const sbFetch = async (path, method="GET", body=null, extraHeaders={}) => {
  try {
    const opts = {
      method,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + (auth.token || SUPABASE_ANON_KEY),
        "Content-Type": "application/json",
        ...extraHeaders
      }
    };
    if (body !== null) opts.body = JSON.stringify(body);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, opts);
    const text = await res.text();
    if (!text) return [];
    const data = JSON.parse(text);
    if (data && data.code) {
      console.error(`Supabase error [${method} ${path}]:`, data.code, data.message, data.hint || "");
      return null;
    }
    if (!res.ok) {
      console.error(`Supabase HTTP ${res.status} [${method} ${path}]:`, text);
      return null;
    }
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
      const result = await sbFetch(table, "POST", [row], { 
        Prefer: "resolution=merge-duplicates,return=minimal" 
      });
      console.log(`[upsertOne] ${table} id=${row.id}:`, result === null ? "FAILED ❌" : "OK ✓");
      return result;
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
const MAX_GROUP_SIZE = 7;
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const TIMES = ["7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","5:00 PM","6:00 PM","7:00 PM"];

const seedClients = () => [
  { id:"c1", name:"Abdel", email:"c1.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c2", name:"Adil", email:"c2.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c3", name:"Amelie", email:"c3.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c4", name:"Anna", email:"c4.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c5", name:"Anika", email:"c5.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c6", name:"Anthony", email:"c6.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c7", name:"Ashley", email:"c7.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c8", name:"Asma", email:"c8.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c9", name:"Aurelien", email:"c9.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c10", name:"Melissa", email:"c10.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c11", name:"Beer", email:"c11.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c12", name:"Caitlin", email:"c12.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c13", name:"Carla", email:"c13.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c14", name:"Carole M", email:"c14.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c15", name:"Celine", email:"c15.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c16", name:"Clara", email:"c16.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c17", name:"Claudio", email:"c17.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c18", name:"Chantal", email:"c18.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c19", name:"Cheryl", email:"c19.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c20", name:"Chris", email:"c20.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c21", name:"Daniel", email:"c21.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c22", name:"Genevieve", email:"c22.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c23", name:"Dave", email:"c23.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c24", name:"Dmytro", email:"c24.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c25", name:"Elaine", email:"c25.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c26", name:"Elise", email:"c26.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c27", name:"Elyse CH", email:"c27.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c28", name:"Elyse CO", email:"c28.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c29", name:"Erin", email:"c29.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c30", name:"Fabio", email:"c30.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c31", name:"Farah", email:"c31.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c32", name:"Foujane", email:"c32.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c33", name:"Gabby", email:"c33.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c34", name:"Gen", email:"c34.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c35", name:"Georges", email:"c35.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c36", name:"Hughes", email:"c36.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c37", name:"Isabelle", email:"c37.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c38", name:"Luc", email:"c38.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c39", name:"Isabelle2", email:"c39.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c40", name:"Lea", email:"c40.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c41", name:"Janine", email:"c41.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c42", name:"Pierre", email:"c42.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c43", name:"Jean", email:"c43.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c44", name:"Jose", email:"c44.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c45", name:"Jeremie", email:"c45.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c46", name:"Jess", email:"c46.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c47", name:"Joe", email:"c47.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c48", name:"Filo", email:"c48.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c49", name:"JohanneM", email:"c49.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c50", name:"John V", email:"c50.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c51", name:"John Scott", email:"c51.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c52", name:"Julie B", email:"c52.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c53", name:"Julien", email:"c53.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c54", name:"JP Grilli", email:"c54.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c55", name:"Karine", email:"c55.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c56", name:"Keiths", email:"c56.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c57", name:"Kevin", email:"c57.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c58", name:"Kim", email:"c58.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c59", name:"Louise", email:"c59.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c60", name:"Lizon", email:"c60.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c61", name:"Lynn", email:"c61.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c62", name:"Malina", email:"c62.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c63", name:"Malika", email:"c63.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c64", name:"Marc P", email:"c64.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c65", name:"Marco", email:"c65.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c66", name:"Marie", email:"c66.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c67", name:"Marianne", email:"c67.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c68", name:"Mateo", email:"c68.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c69", name:"Matthew", email:"c69.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c70", name:"Matthew2", email:"c70.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c71", name:"Mathis", email:"c71.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c72", name:"Matt G", email:"c72.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c73", name:"Maude", email:"c73.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c74", name:"Marie-Claude", email:"c74.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c75", name:"Mark", email:"c75.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c76", name:"Sienna", email:"c76.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c77", name:"Mary", email:"c77.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c78", name:"Maurizio", email:"c78.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c79", name:"Max B", email:"c79.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c80", name:"Max L", email:"c80.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c81", name:"Maxime", email:"c81.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c82", name:"Mehdi", email:"c82.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c83", name:"Meryen", email:"c83.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c84", name:"MichelleB", email:"c84.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c85", name:"MichelleS", email:"c85.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c86", name:"MichelleT", email:"c86.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c87", name:"Mike", email:"c87.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c88", name:"Mila", email:"c88.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c89", name:"Mireille", email:"c89.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c90", name:"Nada", email:"c90.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c91", name:"Nadine B", email:"c91.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c92", name:"Nafiseh", email:"c92.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c93", name:"Nancy D", email:"c93.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c94", name:"Nancy Y", email:"c94.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c95", name:"Nardine", email:"c95.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c96", name:"Natasha", email:"c96.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c97", name:"Nathalie P", email:"c97.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c98", name:"Nick", email:"c98.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c99", name:"Lucas", email:"c99.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c100", name:"Nishi", email:"c100.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c101", name:"Phil", email:"c101.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c102", name:"Matt", email:"c102.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c103", name:"Rachel", email:"c103.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c104", name:"Rachel2", email:"c104.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c105", name:"Rami", email:"c105.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c106", name:"Renelle", email:"c106.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c107", name:"ReneeM", email:"c107.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c108", name:"ReneeP", email:"c108.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c109", name:"Reuven", email:"c109.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c110", name:"Rodica", email:"c110.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c111", name:"Romy", email:"c111.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c112", name:"Rozita", email:"c112.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c113", name:"Sabrina", email:"c113.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c114", name:"Sandy", email:"c114.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c115", name:"Sarah", email:"c115.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c116", name:"Sam", email:"c116.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c117", name:"Mira", email:"c117.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c118", name:"Sean", email:"c118.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c119", name:"Simon", email:"c119.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c120", name:"Sita", email:"c120.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c121", name:"Sherriff", email:"c121.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c122", name:"Sonia", email:"c122.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c123", name:"Sophie", email:"c123.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c124", name:"Staci", email:"c124.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c125", name:"StephV", email:"c125.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c126", name:"Susan", email:"c126.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c127", name:"Susan/Klaus", email:"c127.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c128", name:"Klaus", email:"c128.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c129", name:"Sylvie", email:"c129.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c130", name:"Tanya", email:"c130.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c131", name:"Thierry", email:"c131.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c132", name:"Ujjaval", email:"c132.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c133", name:"Tyler", email:"c133.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c134", name:"Val Maheux", email:"c134.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
  { id:"c135", name:"Yannie", email:"c135.mlfit@gmail.com", sessionsTotal:0, sessionsUsed:0, active:true },
];

const seedSessions = () => [
  { id:"s_2026-02-02_7", date:"2026-02-02", time:"7:00 AM", clientIds:["c9", "c49", "c72", "c97", "c10", "c109"], notes:"" },
  { id:"s_2026-02-02_8", date:"2026-02-02", time:"8:00 AM", clientIds:["c18", "c133", "c106", "c58", "c134", "c96"], notes:"" },
  { id:"s_2026-02-02_9", date:"2026-02-02", time:"9:00 AM", clientIds:["c56", "c129", "c59", "c118", "c67"], notes:"" },
  { id:"s_2026-02-02_10", date:"2026-02-02", time:"10:00 AM", clientIds:["c71"], notes:"" },
  { id:"s_2026-02-02_17", date:"2026-02-02", time:"5:00 PM", clientIds:["c6", "c47", "c48", "c64", "c119", "c16"], notes:"" },
  { id:"s_2026-02-02_18", date:"2026-02-02", time:"6:00 PM", clientIds:["c2", "c63", "c14", "c69", "c82"], notes:"" },
  { id:"s_2026-02-02_19", date:"2026-02-02", time:"7:00 PM", clientIds:["c1", "c70", "c31", "c35", "c75", "c76"], notes:"" },
  { id:"s_2026-02-03_7", date:"2026-02-03", time:"7:00 AM", clientIds:[], notes:"" },
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
  { id:"s_2026-02-10_7", date:"2026-02-10", time:"7:00 AM", clientIds:[], notes:"" },
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
  { id:"s_2026-02-17_7", date:"2026-02-17", time:"7:00 AM", clientIds:[], notes:"" },
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

// ─── Session count helper ─────────────────────────────────────────────────────
// sessionsUsed = sessionsOffset (carry-over) + sessions on/after packageStartDate
function calcSessionsUsed(client, sessions) {
  const now = new Date();
  const todayStr = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  const start = client.packageStartDate || null;
  const tracked = sessions.filter(s =>
    s.date && s.date <= todayStr &&
    s.clientIds && s.clientIds.includes(client.id) &&
    (!start || s.date >= start)
  ).length;
  return (client.sessionsOffset || 0) + tracked;
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null); // { role:'trainer'|'client', ...data }
  const [clients, setClients] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [previewClient, setPreviewClient] = useState(null);
  const [hiddenBlocks, setHiddenBlocks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ml_hidden_blocks") || "{}"); } catch { return {}; }
  });
  const [bluFAQ, setBluFAQ] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ml_blu_faq") || "[]"); } catch { return []; }
  });
  const [savedWorkouts, setSavedWorkoutsRaw] = useState(() => {
    try {
      const a = JSON.parse(localStorage.getItem("ml_saved_workouts") || "[]");
      const b = JSON.parse(localStorage.getItem("ml_saved_workouts_bak") || "[]");
      return a.length >= b.length ? a : b;
    } catch { return []; }
  });
  const _swRef = useRef([]);
  useEffect(() => { _swRef.current = savedWorkouts; }, [savedWorkouts]);

  const setSavedWorkouts = (val) => {
    const next = typeof val === "function" ? val(_swRef.current) : val;
    setSavedWorkoutsRaw(next);
    const json = JSON.stringify(next);
    try { localStorage.setItem("ml_saved_workouts", json); } catch {}
    try { localStorage.setItem("ml_saved_workouts_bak", json); } catch {}
    sbFetch("app_settings", "POST", [{ key: "saved_workouts", value: json }], { Prefer: "resolution=merge-duplicates,return=minimal" })
      .then(r => console.log("[Save] saved_workouts →", r === null ? "FAILED ❌ (run SQL in Supabase)" : "OK ✓"));
  };

  // Load from Supabase on mount — only replace if Supabase has data
  useEffect(() => {
    sbFetch("app_settings?key=in.(saved_workouts,assigned_workouts)").then(rows => {
      if (!rows) return;
      rows.forEach(r => {
        try {
          if (r.key === "saved_workouts") {
            const p = JSON.parse(r.value) || [];
            if (p.length > 0) {
              setSavedWorkoutsRaw(prev => p.length >= prev.length ? p : prev);
              try { localStorage.setItem("ml_saved_workouts", JSON.stringify(p)); } catch {}
            }
          }
          if (r.key === "assigned_workouts") {
            const p = JSON.parse(r.value) || {};
            if (Object.keys(p).length > 0) setAssignedWorkoutsState(p);
          }
        } catch {}
      });
    });
  }, []);

  const [assignedWorkouts, setAssignedWorkoutsState] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ml_assigned_workouts") || "{}"); } catch { return {}; }
  });

  const setAssignedWorkouts = (val) => {
    const next = typeof val === "function" ? val(assignedWorkouts) : val;
    setAssignedWorkoutsState(next);
    try { localStorage.setItem("ml_assigned_workouts", JSON.stringify(next)); } catch {}
    sbFetch("app_settings", "POST", [{ key: "assigned_workouts", value: JSON.stringify(next) }], { Prefer: "resolution=merge-duplicates,return=minimal" });
  };
  useEffect(() => {
    try { localStorage.setItem("ml_hidden_blocks", JSON.stringify(hiddenBlocks)); } catch {}
  }, [hiddenBlocks]);
  useEffect(() => {
    try { localStorage.setItem("ml_blu_faq", JSON.stringify(bluFAQ)); } catch {}
  }, [bluFAQ]);

  const [dataReady, setDataReady] = useState(false);

  // Load on mount (for returning users with existing JWT)
  useEffect(() => {
    (async () => {
      let c = await store.get("gym_clients");
      let s = await store.get("gym_sessions");
      if (c && c.length > 0) setClients(c);
      if (s && s.length > 0) setSessions(s);
      setLoaded(true);
      setDataReady(true);
    })();
  }, []);

  // Reload after login so JWT is set and RLS returns correct data
  const handleLogin = async (userData) => {
    setUser(userData);
    setDataReady(false);
    setTimeout(async () => {
      let c = await store.get("gym_clients");
      let s = await store.get("gym_sessions");
      if (c && c.length > 0) setClients(c);
      if (s && s.length > 0) setSessions(s);
      // Auto-update session counts for today's/past sessions
      try {
        const rows = await sbFetch("app_settings?key=in.(saved_workouts,assigned_workouts)");
        console.log("[Login] settings rows:", rows);
        if (rows) rows.forEach(r => {
          try {
            if (r.key === "saved_workouts") {
              const p = JSON.parse(r.value) || [];
              console.log("[Login] loaded", p.length, "saved workouts from Supabase");
              setSavedWorkoutsRaw(prev => p.length >= prev.length ? p : prev);
            }
            if (r.key === "assigned_workouts") {
              const p = JSON.parse(r.value) || {};
              console.log("[Login] loaded assigned workouts for", Object.keys(p).length, "clients");
              if (Object.keys(p).length > 0) setAssignedWorkoutsState(p);
            }
          } catch(e) { console.error("[Login] parse error", e); }
        });
      } catch(e) { console.error("[Login] workout fetch error", e); }
      setDataReady(true);
    }, 300);
  };


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
    // Re-check counts whenever sessions change (e.g. a session booked for today)
  };

  if (!loaded || !dataReady) return (
    <>
      <GlobalStyle />
      <div className="login-wrap">
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>🐾</div>
          <div style={{color:"var(--muted)",fontSize:14}}>Loading...</div>
        </div>
      </div>
    </>
  );

  if (!user) return (
    <>
      <GlobalStyle />
      <LoginScreen clients={clients} onLogin={handleLogin} saveClients={saveClients} />
    </>
  );

  return (
    <>
      <GlobalStyle />
      {user.role === "trainer" && !previewClient
        ? <TrainerApp user={user} clients={clients} sessions={sessions} setSessions={setSessions} saveClients={saveClients} saveSessions={saveSessions} onLogout={() => { auth.clear(); setUser(null); }} onPreviewClient={setPreviewClient} hiddenBlocks={hiddenBlocks} setHiddenBlocks={setHiddenBlocks} bluFAQ={bluFAQ} setBluFAQ={setBluFAQ} savedWorkouts={savedWorkouts} setSavedWorkouts={setSavedWorkouts} assignedWorkouts={assignedWorkouts} setAssignedWorkouts={setAssignedWorkouts} />
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
              }}>&laquo; Back to Trainer View</button>
            </div>
            <div style={{marginTop:40}}>
              <ClientApp user={{role:"client",...previewClient}} clients={clients} sessions={sessions} saveClients={saveClients} onLogout={()=>setPreviewClient(null)} bluFAQ={bluFAQ} assignedWorkouts={assignedWorkouts} />
            </div>
          </>
          )
        : <ClientApp user={user} clients={clients} sessions={sessions} saveClients={saveClients} onLogout={() => { auth.clear(); setUser(null); }} bluFAQ={bluFAQ} assignedWorkouts={assignedWorkouts} />
      }
    </>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ clients, onLogin, saveClients }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);

  const submit = async () => {
    setErr("");
    if (!email || !pass) { setErr("Please enter your email and password."); return; }
    try {
      const result = await auth.login(email.trim(), pass);
      auth.set(result.token);
      // Small delay to ensure token is persisted before data fetches begin
      await new Promise(r => setTimeout(r, 100));
      if (result.role === "trainer") {
        onLogin({ role:"trainer", name:"Coach", email });
      } else {
        onLogin({ role:"client", ...result.client });
      }
    } catch(e) {
      setErr(e.message || "Invalid email or password.");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="bebas login-logo">ML FITNESS</div>
        <div className="login-sub">Scheduling Portal</div>
        {err && <div className="error-msg">{err}</div>}
        <div className="field-label">Email</div>
        <input className="field-input" type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
        <div className="field-label">Password</div>
        <div style={{position:"relative"}}>
          <input className="field-input" type={showPass?"text":"password"} placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} style={{paddingRight:44}} />
          <div onClick={()=>setShowPass(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",cursor:"pointer",color:"var(--muted)",fontSize:18,userSelect:"none",lineHeight:1}}>
            {showPass ? "🙈" : "👁️"}
          </div>
        </div>
        <button className="btn-primary" onClick={submit}>SIGN IN</button>
        <div className="switch-link" style={{marginTop:16,color:"var(--muted)",fontSize:12}}>
          Enter the email and password provided by your trainer.
        </div>
      </div>
    </div>
  );
}

// ─── Trainer App ──────────────────────────────────────────────────────────────
function TrainerApp({ user, clients, sessions, setSessions, saveClients, saveSessions, onLogout, onPreviewClient, hiddenBlocks, setHiddenBlocks, bluFAQ, setBluFAQ, savedWorkouts, setSavedWorkouts, assignedWorkouts, setAssignedWorkouts }) {
  const [tab, setTab] = useState("schedule");
  const [weekPlans, setWeekPlans] = useState(Array.from({length:NUM_WEEKS}, ()=>[]));
  const [library, setLibrary] = useState(ALL_EXERCISES_DEFAULT);
  const epochMonday = new Date("2026-02-23T00:00:00");
  const _now = new Date(); _now.setHours(0,0,0,0);
  const autoWeekIdx = ((Math.floor((_now - epochMonday) / (1000*60*60*24*7))) % NUM_WEEKS + NUM_WEEKS) % NUM_WEEKS;
  const [currentWeekIdx, setCurrentWeekIdx] = useState(autoWeekIdx);
  const [reminder, setReminder] = useState(null);
  const [recurringReminders, setRecurringReminders] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ml_recurring_reminders") || "[]"); } catch { return []; }
  });

  // Check recurring reminders every minute
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
      const todayName = dayNames[now.getDay()];
      const currentTime = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      recurringReminders.forEach(r => {
        const dayMatch = r.frequency === "daily" || (r.frequency === "weekly" && r.day === todayName) || (r.frequency === "weekdays" && now.getDay() >= 1 && now.getDay() <= 5);
        if (dayMatch && r.time === currentTime) {
          setReminder(r.message);
        }
      });
    };
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [recurringReminders]);
  useEffect(() => {
    sbFetch("app_settings?key=eq.activeWeekIdx").then(rows => {
      if (rows && rows[0]?.value !== undefined) {
        const saved = parseInt(rows[0].value);
        if (!isNaN(saved) && saved >= 0 && saved < NUM_WEEKS) setCurrentWeekIdx(saved);
      }
    });
  }, []);
  const nav = [
    { id:"schedule", icon:"📅", label:"Schedule" },
    { id:"clients", icon:"👥", label:"Clients" },
    { id:"availability", icon:"📋", label:"Availability" },
    { id:"progress", icon:"💪", label:"Progress" },
    { id:"exercises", icon:"🏋️", label:"Exercises" },
    { id:"analytics", icon:"📊", label:"Analytics" },
    { id:"blufaq", icon:"🐾", label:"Blu FAQ" },
    { id:"workoutgen", icon:"⚡", label:"Workout Builder" },
  ];

  return (
    <div className="app-shell">
      <Sidebar user={user} nav={nav} tab={tab} setTab={setTab} onLogout={onLogout} role="TRAINER" />
      <div className="main-content" style={{overflowY:"auto"}}>
        <div style={{display:tab==="schedule"?"":"none"}}><TrainerSchedule clients={clients} sessions={sessions} saveSessions={saveSessions} /></div>
        <div style={{display:tab==="clients"?"":"none"}}><TrainerClients clients={clients} sessions={sessions} saveClients={saveClients} deleteClient={(id)=>saveClients(clients.filter(c=>c.id!==id))} onPreviewClient={onPreviewClient} /></div>
        <div style={{display:tab==="availability"?"":"none"}}><TrainerAvailability clients={clients} sessions={sessions} saveSessions={saveSessions} saveClients={saveClients} hiddenBlocks={hiddenBlocks} setHiddenBlocks={setHiddenBlocks} /></div>
        <div style={{display:tab==="progress"?"":"none"}}><TrainerProgress clients={clients} sessions={sessions} weekPlans={weekPlans} currentWeekIdx={currentWeekIdx} library={library} /></div>
        <div style={{display:tab==="exercises"?"":"none"}}><TrainerExercises weekPlans={weekPlans} setWeekPlans={setWeekPlans} currentWeekIdx={currentWeekIdx} setCurrentWeekIdx={setCurrentWeekIdx} autoWeekIdx={autoWeekIdx} library={library} setLibrary={setLibrary} /></div>
        <div style={{display:tab==="analytics"?"":"none"}}><TrainerAnalytics clients={clients} sessions={sessions} /></div>
        <div style={{display:tab==="blufaq"?"":"none"}}><TrainerBluFAQ bluFAQ={bluFAQ} setBluFAQ={setBluFAQ} /></div>
        <div style={{display:tab==="workoutgen"?"":"none"}}><WorkoutGenerator library={library} clients={clients} savedWorkouts={savedWorkouts} setSavedWorkouts={setSavedWorkouts} /></div>
      </div>
      <AIAgent clients={clients} sessions={sessions} setSessions={setSessions} library={library} onReminder={setReminder} recurringReminders={recurringReminders} setRecurringReminders={setRecurringReminders} savedWorkouts={savedWorkouts} assignedWorkouts={assignedWorkouts} setAssignedWorkouts={setAssignedWorkouts} />
      {reminder && (
        <div onClick={()=>setReminder(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"var(--panel)",border:"2px solid var(--accent)",borderRadius:16,padding:"32px 36px",maxWidth:420,width:"90%",textAlign:"center",boxShadow:"0 8px 60px rgba(62,201,201,0.3)",position:"relative"}}>
            <div style={{fontSize:48,marginBottom:12}}>🐾</div>
            <div className="bebas" style={{fontSize:22,color:"var(--accent)",letterSpacing:1,marginBottom:8}}>BLU SAYS</div>
            <div style={{fontSize:15,color:"var(--text)",lineHeight:1.7,whiteSpace:"pre-wrap",marginBottom:24}}>{reminder}</div>
            <button className="btn-primary" style={{width:"auto",padding:"10px 32px"}} onClick={()=>setReminder(null)}>Got it 👍</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Client Search Input ──────────────────────────────────────────────────────
function ClientSearchInput({ clients, excludeIds, onSelect, date, time, isAvailable }) {
  const [search, setSearch] = useState("");
  const [showDrop, setShowDrop] = useState(false);

  const filtered = [...clients]
    .filter(c => c.active && !excludeIds.includes(c.id) && c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => a.name.localeCompare(b.name));

  return (
    <div style={{position:"relative"}}>
      <input
        value={search}
        onChange={e=>{ setSearch(e.target.value); setShowDrop(true); }}
        onFocus={()=>setShowDrop(true)}
        onBlur={()=>setTimeout(()=>setShowDrop(false),150)}
        placeholder="Type a name to add..."
        style={{
          width:"100%",padding:"9px 12px",fontSize:13,
          background:"var(--charcoal)",border:"1px solid var(--accent)",
          borderRadius:4,color:"var(--text)",outline:"none",boxSizing:"border-box"
        }}
      />
      {showDrop && search.length > 0 && filtered.length > 0 && (
        <div style={{
          position:"absolute",top:"100%",left:0,right:0,marginTop:3,
          background:"var(--charcoal)",border:"1px solid var(--accent)",
          borderRadius:4,zIndex:200,boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
          maxHeight:200,overflowY:"auto"
        }}>
          {filtered.map(c => {
            const avail = isAvailable ? isAvailable(c.id, date, time) : false;
            return (
              <div key={c.id}
                onMouseDown={()=>{ onSelect(c.id); setSearch(""); setShowDrop(false); }}
                style={{
                  padding:"10px 14px",cursor:"pointer",fontSize:13,
                  borderBottom:"1px solid var(--border)",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                  background:"transparent"
                }}
                onMouseEnter={e=>e.currentTarget.style.background="var(--panel)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{
                    width:28,height:28,borderRadius:"50%",
                    background:"var(--accent)",color:"var(--black)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:10,fontWeight:700,flexShrink:0
                  }}>{c.name.split(" ").map(x=>x[0]).join("")}</div>
                  <span style={{fontWeight:500}}>{c.name}</span>
                </div>
                {avail && <span style={{fontSize:11,color:"var(--green)"}}>● Available</span>}
              </div>
            );
          })}
        </div>
      )}
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
  const [selectedSessions, setSelectedSessions] = useState([]);
  const toggleSessionSelect = (id) => setSelectedSessions(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

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

  const prevMonth = () => { if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else{setViewMonth(m=>m-1);} setSelectedDate(null); setSelectedSessions([]); };
  const nextMonth = () => { if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else{setViewMonth(m=>m+1);} setSelectedDate(null); setSelectedSessions([]); };

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
      clientIds: f.clientIds.includes(id) ? f.clientIds.filter(x=>x!==id) : f.clientIds.length < MAX_GROUP_SIZE ? [...f.clientIds, id] : f.clientIds
    }));
  };

  const isToday = (d) => d && dateKey(d) === dateKey(today);
  const isSelected = (d) => d && selectedDate && dateKey(d) === dateKey(selectedDate);

  const [generating, setGenerating] = useState(false);
  const [genFeedback, setGenFeedback] = useState("");
  const [calView, setCalView] = useState("day"); // "day" | "week" | "month" | "year"
  const [viewDate, setViewDate] = useState(today); // anchor date for day/week views

  const generateNextWeek = async () => {
    setGenerating(true);
    // Find next Monday from today
    const d = new Date(today);
    const day = d.getDay(); // 0=Sun
    const daysUntilMon = day === 0 ? 1 : 8 - day;
    d.setDate(d.getDate() + daysUntilMon);

    const newSessions = [];
    for (let i = 0; i < MAX_GROUP_SIZE; i++) {
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
        <span className={`badge ${s.clientIds.length>0?"badge-accent":"badge-muted"}`}>{s.clientIds.length}/{MAX_GROUP_SIZE}</span>
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
                    {daySessions.length > 0 && (
                      <div onClick={async (e)=>{
                        e.stopPropagation();
                        if (!confirm(`Clear all sessions on ${DAY_NAMES[d.getDay()]} ${d.getDate()}?`)) return;
                        const dateStr = dateKey(d);
                        const toDelete = sessions.filter(s => s.date === dateStr);
                        const remaining = sessions.filter(s => s.date !== dateStr);
                        for (const s of toDelete) await sbFetch(`sessions?id=eq.${encodeURIComponent(s.id)}`, "DELETE");
                        await saveSessions(remaining);
                      }} style={{
                        padding:"4px 8px",borderRadius:2,cursor:"pointer",
                        border:"1px dashed var(--red)",fontSize:10,color:"var(--red)",
                        textAlign:"center",marginTop:2
                      }}>🗑 Clear</div>
                    )}
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
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
                    {selectedSessions.length > 0 && (
                      <button className="btn-secondary" style={{width:"auto",padding:"8px 14px",fontSize:12,color:"var(--red)",borderColor:"var(--red)"}}
                        onClick={async () => {
                          if (!confirm(`Delete ${selectedSessions.length} selected session${selectedSessions.length>1?"s":""}?`)) return;
                          const toDelete = sessions.filter(s => selectedSessions.includes(s.id));
                          const remaining = sessions.filter(s => !selectedSessions.includes(s.id));
                          for (const s of toDelete) await sbFetch(`sessions?id=eq.${encodeURIComponent(s.id)}`, "DELETE");
                          await saveSessions(remaining);
                          setSelectedSessions([]);
                        }}>🗑 Delete ({selectedSessions.length})</button>
                    )}
                    {sessionsForDate(selectedDate).length > 1 && (
                      <button className="btn-secondary" style={{width:"auto",padding:"8px 14px",fontSize:12}}
                        onClick={() => {
                          const dayIds = sessionsForDate(selectedDate).map(s=>s.id);
                          const allSelected = dayIds.every(id => selectedSessions.includes(id));
                          setSelectedSessions(allSelected ? selectedSessions.filter(id=>!dayIds.includes(id)) : [...new Set([...selectedSessions, ...dayIds])]);
                        }}>
                        {sessionsForDate(selectedDate).map(s=>s.id).every(id=>selectedSessions.includes(id)) ? "☑ Deselect All" : "☐ Select All"}
                      </button>
                    )}
                    {sessionsForDate(selectedDate).length > 0 && selectedSessions.length === 0 && (
                      <button className="btn-secondary" style={{width:"auto",padding:"8px 14px",fontSize:12,color:"var(--red)",borderColor:"var(--red)"}}
                        onClick={async () => {
                          if (!confirm(`Remove all ${sessionsForDate(selectedDate).length} sessions on ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}?`)) return;
                          const dateStr = dateKey(selectedDate);
                          const toDelete = sessions.filter(s => s.date === dateStr);
                          const remaining = sessions.filter(s => s.date !== dateStr);
                          for (const s of toDelete) await sbFetch(`sessions?id=eq.${encodeURIComponent(s.id)}`, "DELETE");
                          await saveSessions(remaining);
                          setSelectedDate(null);
                        }}>🗑 Clear Day</button>
                    )}
                    <button className="btn-primary" style={{width:"auto",padding:"8px 18px",fontSize:13}} onClick={()=>openAdd(selectedDate)}>+ Add Session</button>
                  </div>
                </div>
                {sessionsForDate(selectedDate).length === 0
                  ? <div className="empty-state" style={{padding:"20px"}}><div className="empty-icon">🗓</div><div className="empty-text">No sessions. Click + Add Session.</div></div>
                  : <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {sessionsForDate(selectedDate).map(s => {
                        const checked = selectedSessions.includes(s.id);
                        return (
                          <div key={s.id} style={{display:"flex",alignItems:"center",gap:10}}>
                            <div onClick={()=>toggleSessionSelect(s.id)} style={{
                              width:18,height:18,borderRadius:3,flexShrink:0,cursor:"pointer",
                              border:`2px solid ${checked?"var(--red)":"var(--border)"}`,
                              background:checked?"var(--red)":"transparent",
                              display:"flex",alignItems:"center",justifyContent:"center",
                              fontSize:11,color:"white",fontWeight:900,transition:"all 0.15s"
                            }}>{checked?"✓":""}</div>
                            <div style={{flex:1,opacity:checked?0.5:1,transition:"opacity 0.15s"}}>
                              <SessionCard s={s} onClick={()=>{ if(selectedSessions.length>0) toggleSessionSelect(s.id); else openEdit(s); }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
                <label>Clients ({form.clientIds.length}/{MAX_GROUP_SIZE})</label>
                {/* Selected clients */}
                {form.clientIds.length > 0 && (
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                    {form.clientIds.map(id => {
                      const c = clients.find(x=>x.id===id);
                      if (!c) return null;
                      const avail = isAvailable(id, form.date, form.time);
                      return (
                        <div key={id} style={{
                          display:"flex",alignItems:"center",gap:5,
                          padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:600,
                          background:"var(--accent)",color:"var(--black)"
                        }}>
                          <span style={{marginRight:2}}>{avail?"●":""}</span>
                          {c.name.split(" ")[0]}
                          <span style={{cursor:"pointer",fontWeight:700,marginLeft:2}} onClick={()=>toggleClient(id)}>✕</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Search input */}
                {form.clientIds.length < MAX_GROUP_SIZE && (
                  <ClientSearchInput
                    clients={clients}
                    excludeIds={form.clientIds}
                    onSelect={id=>toggleClient(id)}
                    date={form.date}
                    time={form.time}
                    isAvailable={isAvailable}
                  />
                )}
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
  const [form, setForm] = useState({ name:"", sessionsTotal:20, sessionsOffset:0, active:true, packageStartDate:"" });
  const [newCredentials, setNewCredentials] = useState(null);
  const [historyClient, setHistoryClient] = useState(null);

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || (c.email||"").toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ name:"", sessionsTotal:20, sessionsOffset:0, active:true, packageStartDate:"" }); setNewCredentials(null); setModal("add"); };
  const openEdit = (c) => { setForm({...c}); setNewCredentials(null); setModal(c); };

  const hashPassword = async (password) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const save = async () => {
    if (modal === "add") {
      if (!form.name.trim()) return alert("Please enter a name.");
      const maxId = clients.reduce((max, c) => {
        const num = parseInt(c.id.replace("c",""));
        return !isNaN(num) && num > max ? num : max;
      }, 0);
      const newId = "c" + (maxId + 1);
      const slug = form.name.split(" ")[0].split("/")[0].replace(/[^a-zA-Z]/g,"");
      const email = newId + ".mlfit@gmail.com";
      const plainPassword = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase() + (maxId+1) + "ML";
      const hashed = await hashPassword(plainPassword);
      const newClient = { ...form, id: newId, email, password: hashed };
      await saveClients([...clients, newClient], newClient);
      setNewCredentials({ name: form.name, email, password: plainPassword });
      setModal(null);
    } else {
      const updatedClient = {...modal,...form};
      const updatedClients = clients.map(c=>c.id===modal.id?updatedClient:c);
      await saveClients(updatedClients, updatedClient);
      // Re-sync counts immediately so the display is correct after save
      setModal(null);
    }
  };

  const resetPassword = async () => {
    if (!modal || modal === "add") return;
    const slug = modal.name.split(" ")[0].split("/")[0].replace(/[^a-zA-Z]/g,"");
    const num = modal.id.replace("c","");
    const newPlain = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase() + num + "ML!";
    const hashed = await hashPassword(newPlain);
    const updatedClient = {...modal, password: hashed};
    await saveClients(clients.map(c => c.id === modal.id ? updatedClient : c), updatedClient);
    setModal(null);
    setNewCredentials({ name: modal.name, email: modal.email, password: newPlain, reset: true });
  };

  const del = async () => {
    if (!window.confirm(`Remove ${modal.name}? This cannot be undone.`)) return;
    const clientId = modal.id;
    setModal(null);
    deleteClient(clientId);
    await store.remove("gym_clients", clientId);
  };

  const clientSessions = (id) => sessions.filter(s=>s.clientIds.includes(id)).length;

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">CLIENTS</div>
        <div className="page-subtitle">{clients.filter(c=>c.active&&!c.former).length} active · {clients.filter(c=>!c.active&&!c.former).length} inactive · {clients.filter(c=>c.former).length} former</div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">All Clients ({clients.length})</span>
          <div style={{display:"flex",gap:10}}>
            <input className="search-input" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
            <button className="btn-primary" style={{width:"auto",padding:"8px 20px",fontSize:14}} onClick={openAdd}>+ Add Client</button>
          </div>
        </div>
        <div style={{display:"flex",gap:0}}>
          {/* A–Z index */}
          {(() => {
            const sorted = [...filtered].sort((a,b)=>a.name.localeCompare(b.name));
            const letters = [...new Set(sorted.map(c=>c.name[0].toUpperCase()))].sort();
            return (
              <div style={{width:32,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:4,gap:2,position:"sticky",top:56,alignSelf:"flex-start"}}>
                {letters.map(l=>(
                  <div key={l}
                    onClick={()=>document.getElementById("client-letter-"+l)?.scrollIntoView({behavior:"smooth",block:"center"})}
                    style={{fontSize:15,fontWeight:700,color:"var(--accent)",cursor:"pointer",lineHeight:1.8,userSelect:"none",transition:"color 0.1s"}}
                    onMouseEnter={e=>e.currentTarget.style.color="var(--text)"}
                    onMouseLeave={e=>e.currentTarget.style.color="var(--accent)"}
                  >{l}</div>
                ))}
              </div>
            );
          })()}
          <div style={{flex:1,overflowX:"auto"}}>
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
            {(() => {
              const sorted = [...filtered].sort((a,b)=>a.name.localeCompare(b.name));
              const active = sorted.filter(c => c.active && !c.former);
              const inactive = sorted.filter(c => !c.active && !c.former);
              const former = sorted.filter(c => c.former);
              const cycleStatus = async (c) => {
                let update;
                if (c.active && !c.former)       update = { active: false, former: false };
                else if (!c.active && !c.former) update = { active: false, former: true };
                else                             update = { active: true,  former: false };
                const updatedClient = {...c, ...update};
                console.log("[Status] saving client", c.name, update);
                const result = await saveClients(clients.map(x => x.id===c.id ? updatedClient : x), updatedClient);
                console.log("[Status] save result:", result);
              };
              const statusBadge = (c) => {
                if (c.former)  return { label:"Former",   cls:"badge-muted",  color:"var(--muted)" };
                if (!c.active) return { label:"Inactive",  cls:"badge-muted",  color:"var(--muted)" };
                return             { label:"Active",    cls:"badge-green",  color:"var(--green)" };
              };
              let lastLetter = null;
              const renderRow = (c) => {
                const { label, cls } = statusBadge(c);
                const letter = c.name[0].toUpperCase();
                const showLetter = letter !== lastLetter;
                lastLetter = letter;
                return (
                  <Fragment key={c.id}>
                    {showLetter && (
                      <tr id={`client-letter-${letter}`}>
                        <td colSpan={5} style={{padding:"6px 12px 2px",fontSize:10,fontWeight:700,color:"var(--accent)",letterSpacing:3,background:"var(--panel)",borderTop:"1px solid var(--border)"}}>{letter}</td>
                      </tr>
                    )}
                  <tr style={{cursor:"pointer", opacity: c.former ? 0.4 : c.active ? 1 : 0.6}} onClick={()=>openEdit(c)}>
                    <td>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div className="user-avatar" style={{background:"var(--accent)",fontSize:11}}>
                          {c.name.split(" ").map(x=>x[0]).join("")}
                        </div>
                        <span style={{fontWeight:500,color:"var(--accent)",textDecoration:"underline",textDecorationColor:"transparent",transition:"text-decoration-color 0.15s"}}
                          onMouseEnter={e=>e.currentTarget.style.textDecorationColor="var(--accent)"}
                          onMouseLeave={e=>e.currentTarget.style.textDecorationColor="transparent"}
                        >{c.name}</span>
                      </div>
                    </td>
                    <td style={{color:"var(--muted)"}}>{c.email||"—"}</td>
                    <td style={{textAlign:"center"}}>
                      {c.sessionsTotal > 0
                        ? <span style={{color: (c.sessionsTotal - calcSessionsUsed(c,sessions)) <= 3 ? "var(--red)" : (c.sessionsTotal - calcSessionsUsed(c,sessions)) <= 5 ? "var(--accent)" : "var(--green)", fontWeight:600}}>
                            {Math.max(0, c.sessionsTotal - calcSessionsUsed(c,sessions))}
                            <span style={{color:"var(--muted)",fontWeight:400,fontSize:11}}> / {c.sessionsTotal}</span>
                          </span>
                        : <span style={{color:"var(--muted)"}}>—</span>}
                    </td>
                    <td style={{textAlign:"center"}}>
                      {(() => {
                        const today = new Date();
                        const mon = new Date(today); mon.setDate(today.getDate() - (today.getDay()===0?6:today.getDay()-1)); mon.setHours(0,0,0,0);
                        const sun = new Date(mon); sun.setDate(mon.getDate()+6);
                        const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
                        const count = sessions.filter(s => s.clientIds.includes(c.id) && s.date >= fmt(mon) && s.date <= fmt(sun)).length;
                        return count > 0
                          ? <span style={{color:"var(--accent)",fontWeight:600}}>{count}</span>
                          : <span style={{color:"var(--border)"}}>0</span>;
                      })()}
                    </td>
                    <td onClick={e=>e.stopPropagation()} style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span
                        className={`badge ${cls}`}
                        style={{cursor:"pointer",userSelect:"none"}}
                        title="Click to cycle: Active → Inactive → Former"
                        onClick={()=>cycleStatus(c)}
                      >{label}</span>
                      {((!c.email) || c.email.endsWith(".mlfit@gmail.com")) && (
                        <span
                          className="badge badge-muted"
                          style={{cursor:"pointer",userSelect:"none",fontSize:11}}
                          title="Copy signup link"
                          onClick={(e)=>{
                            e.stopPropagation();
                            const link = `${window.location.origin}?signup=${c.id}`;
                            navigator.clipboard.writeText(link);
                            alert(`Signup link copied for ${c.name}!\n\n${link}`);
                          }}
                        >🔗 Invite</span>
                      )}
                      <span
                        className="badge"
                        style={{cursor:"pointer",userSelect:"none",fontSize:11,background:"#3ec9c915",color:"var(--accent)",border:"1px solid var(--accent)"}}
                        onClick={e=>{e.stopPropagation(); onPreviewClient(c);}}
                      >👁 View Account</span>
                      <span
                        className="badge badge-muted"
                        style={{cursor:"pointer",userSelect:"none",fontSize:11}}
                        onClick={e=>{e.stopPropagation(); setHistoryClient(c);}}
                      >📋 History</span>
                    </td>
                  </tr>
                  </Fragment>
                );
              };
              return (
                <>
                  {active.map(renderRow)}
                  {inactive.length > 0 && (
                    <tr><td colSpan={5} style={{padding:"10px 12px 4px",fontSize:11,fontWeight:700,color:"var(--muted)",letterSpacing:2,borderTop:"2px solid var(--border)",background:"transparent"}}>INACTIVE — {inactive.length}</td></tr>
                  )}
                  {inactive.map(renderRow)}
                  {former.length > 0 && (
                    <tr><td colSpan={5} style={{padding:"10px 12px 4px",fontSize:11,fontWeight:700,color:"var(--border)",letterSpacing:2,borderTop:"2px solid var(--border)",background:"transparent"}}>FORMER CLIENTS — {former.length}</td></tr>
                  )}
                  {former.map(renderRow)}
                </>
              );
            })()}
          </tbody>
        </table>
          </div>
        </div>
      </div>

      {/* ── Booking History Modal ── */}
      {historyClient && (() => {
        const now = new Date();
        const todayStr = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');

        // All sessions sorted oldest to newest
        const allClientSessions = sessions
          .filter(s => s.date && s.clientIds.includes(historyClient.id))
          .sort((a, b) => a.date < b.date ? -1 : 1);

        const total       = historyClient.sessionsTotal || 0;
        const used        = calcSessionsUsed(historyClient, sessions);
        const left        = Math.max(0, total - used);
        const packageSize = total || 10;
        const startDate   = historyClient.packageStartDate || null;

        // Split into: sessions before package start (legacy) and current package onwards
        const legacySessions  = startDate ? allClientSessions.filter(s => s.date < startDate) : [];
        const currentSessions = startDate ? allClientSessions.filter(s => s.date >= startDate) : allClientSessions;

        // Current package splits into blocks of packageSize
        const packages = [];
        for (let i = 0; i < currentSessions.length; i += packageSize) {
          packages.push(currentSessions.slice(i, i + packageSize));
        }
        if (packages.length === 0) packages.push([]);

        const SessionRow = ({ s, withinPkg, packageSize, globalNum, isLegacy }) => {
          const isPast  = s.date <= todayStr;
          const isToday = s.date === todayStr;
          const fmtDate = new Date(s.date + "T12:00:00").toLocaleDateString("en-CA", {weekday:"short", month:"short", day:"numeric"});
          return (
            <div style={{
              display:"flex",alignItems:"center",gap:12,
              padding:"11px 16px",borderBottom:"1px solid var(--border)",
              background: isToday ? "#3ec9c910" : "transparent",
            }}>
              <div style={{
                minWidth:48,textAlign:"center",padding:"4px 6px",borderRadius:4,flexShrink:0,
                background: isLegacy ? "transparent" : isPast ? "var(--charcoal)" : "#3ec9c920",
                border: `1px solid ${isLegacy ? "var(--border)" : isPast ? "var(--border)" : "var(--accent)"}`,
              }}>
                {isLegacy
                  ? <div style={{fontSize:11,color:"var(--muted)"}}>#{globalNum}</div>
                  : <div style={{fontSize:14,fontWeight:700,color:isPast?"var(--muted)":"var(--accent)",lineHeight:1}}>
                      {withinPkg}/{packageSize}
                    </div>
                }
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:isToday?"var(--accent)":"var(--text)"}}>
                  {fmtDate}
                  {isToday && <span style={{fontSize:10,color:"var(--accent)",fontWeight:700,marginLeft:6}}>TODAY</span>}
                </div>
                <div style={{fontSize:11,color:"var(--muted)",marginTop:1}}>
                  {s.time}{s.clientIds.length > 1 ? ` · Group (${s.clientIds.length})` : ""}
                </div>
              </div>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,
                color:isToday?"var(--accent)":isPast?"var(--green)":"var(--muted)"}}>
                {isToday ? "Today" : isPast ? "Done" : "Upcoming"}
              </div>
            </div>
          );
        };

        return (
          <div className="modal-overlay" onClick={()=>setHistoryClient(null)}>
            <div className="modal" style={{maxWidth:500}} onClick={e=>e.stopPropagation()}>
              <div className="modal-header">
                <div className="bebas modal-title">📋 {historyClient.name}</div>
                <button className="modal-close" onClick={()=>setHistoryClient(null)}>✕</button>
              </div>

              {/* Summary bar */}
              <div style={{display:"flex",borderBottom:"1px solid var(--border)"}}>
                {[
                  {label:"Package Size", value: total||"—"},
                  {label:"Sessions Used", value: used},
                  {label:"Sessions Left", value: left, warn: left<=5},
                ].map((s,i) => (
                  <div key={i} style={{flex:1,padding:"14px 16px",borderRight:i<2?"1px solid var(--border)":"none",textAlign:"center"}}>
                    <div style={{fontSize:22,fontWeight:700,color:s.warn&&left<=3?"var(--red)":s.warn?"var(--accent)":"var(--accent)"}}>{s.value}</div>
                    <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase",marginTop:2}}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{maxHeight:"62vh",overflowY:"auto"}}>

                {/* Current packages — newest first */}
                {[...packages].reverse().map((pkg, revIdx) => {
                  const pkgIdx      = packages.length - 1 - revIdx;
                  const pkgNum      = pkgIdx + 1;
                  const globalBase  = legacySessions.length + pkgIdx * packageSize;
                  return (
                    <div key={pkgIdx}>
                      <div style={{padding:"10px 16px",background:"var(--panel)",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div className="bebas" style={{fontSize:15,color:"var(--accent)",letterSpacing:1}}>Package #{pkgNum}</div>
                          {startDate && pkgNum===packages.length && (
                            <div style={{fontSize:10,color:"var(--muted)"}}>from {new Date(startDate+"T12:00:00").toLocaleDateString("en-CA",{month:"short",day:"numeric",year:"numeric"})}</div>
                          )}
                        </div>
                        <div style={{fontSize:11,color:"var(--muted)"}}>
                          {pkg.filter(s=>s.date<=todayStr).length} done · {pkg.filter(s=>s.date>todayStr).length} upcoming · {Math.max(0,packageSize-pkg.length)} open
                        </div>
                      </div>

                      {pkg.map((s, i) => (
                        <SessionRow key={s.id} s={s} withinPkg={i+1} packageSize={packageSize} globalNum={globalBase+i+1} />
                      ))}

                      {/* Empty slots in the most recent package only */}
                      {revIdx === 0 && pkg.length < packageSize && (
                        Array.from({length: packageSize - pkg.length}).map((_,i) => (
                          <div key={"empty"+i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 16px",borderBottom:"1px solid var(--border)",opacity:0.35}}>
                            <div style={{minWidth:48,textAlign:"center",padding:"4px 6px",borderRadius:4,border:"1px dashed var(--border)",flexShrink:0}}>
                              <div style={{fontSize:14,fontWeight:700,color:"var(--border)",lineHeight:1}}>{pkg.length+i+1}/{packageSize}</div>
                            </div>
                            <div style={{fontSize:12,color:"var(--border)"}}>Not yet booked</div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}

                {/* Legacy sessions (before package start date) */}
                {legacySessions.length > 0 && (
                  <div>
                    <div style={{padding:"10px 16px",background:"var(--panel)",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div className="bebas" style={{fontSize:15,color:"var(--muted)",letterSpacing:1}}>Previous History</div>
                      <div style={{fontSize:11,color:"var(--muted)"}}>before {new Date(startDate+"T12:00:00").toLocaleDateString("en-CA",{month:"short",day:"numeric",year:"numeric"})} · {legacySessions.length} sessions</div>
                    </div>
                    {[...legacySessions].reverse().map((s,i) => (
                      <SessionRow key={s.id} s={s} withinPkg={null} packageSize={null} globalNum={legacySessions.length - i} isLegacy />
                    ))}
                  </div>
                )}

                {allClientSessions.length === 0 && (
                  <div style={{padding:"40px 20px",textAlign:"center",color:"var(--muted)",fontSize:13}}>No sessions booked yet.</div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn-primary" style={{width:"auto",padding:"10px 24px"}} onClick={()=>setHistoryClient(null)}>Close</button>
              </div>
            </div>
          </div>
        );
      })()}

      {newCredentials && (
        <div className="modal-overlay">
          <div className="modal" style={{maxWidth:400}}>
            <div className="modal-header">
              <div className="bebas modal-title">{newCredentials.reset ? "🔑 PASSWORD RESET" : "✅ CLIENT ADDED"}</div>
            </div>
            <div className="modal-body">
              <div style={{marginBottom:12,color:"var(--muted)",fontSize:13}}>
                Send these credentials to <strong style={{color:"var(--text)"}}>{newCredentials.name}</strong>:
              </div>
              <div style={{background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,padding:"16px 20px",marginBottom:16}}>
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:4}}>Login URL</div>
                  <div style={{fontSize:13,color:"var(--accent)",fontWeight:600}}>{window.location.origin}</div>
                </div>
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:4}}>Email</div>
                  <div style={{fontSize:13,color:"var(--text)",fontWeight:600}}>{newCredentials.email}</div>
                </div>
                <div>
                  <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:4}}>Password</div>
                  <div style={{fontSize:13,color:"var(--text)",fontWeight:600}}>{newCredentials.password}</div>
                </div>
              </div>
              <div style={{fontSize:11,color:"var(--muted)"}}>⚠️ Save this password now — it won't be shown again.</div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={()=>{
                const text = `ML Fitness Login\nURL: ${window.location.origin}\nEmail: ${newCredentials.email}\nPassword: ${newCredentials.password}`;
                navigator.clipboard.writeText(text);
              }}>📋 Copy</button>
              <button className="btn-primary" style={{width:"auto",padding:"10px 24px",fontSize:15}} onClick={()=>setNewCredentials(null)}>Done</button>
            </div>
          </div>
        </div>
      )}

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
                  <label>Status</label>
                  <select value={form.active?"active":"inactive"} onChange={e=>setForm({...form,active:e.target.value==="active"})}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="two-col">
                <div className="form-row">
                  <label>Package Size (Total Sessions)</label>
                  <input type="number" min="0" value={form.sessionsTotal} onChange={e=>setForm({...form,sessionsTotal:+e.target.value})} />
                </div>
                <div className="form-row">
                  <label>Starting Session #</label>
                  <input type="number" min="0" value={form.sessionsOffset||0} onChange={e=>setForm({...form,sessionsOffset:+e.target.value})} />
                  <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Sessions already done before the start date (e.g. enter 7 to start counting from 7).</div>
                </div>
              </div>

              <div className="form-row">
                <label>Package Start Date</label>
                <input type="date" value={form.packageStartDate||""} onChange={e=>setForm({...form,packageStartDate:e.target.value})} />
                <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>
                  Sessions on/after this date are counted. Leave blank to count all sessions.
                </div>
              </div>

              {modal !== "add" && (
                <div style={{background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,padding:"10px 14px",fontSize:12,display:"flex",gap:16}}>
                  <div><span style={{color:"var(--muted)"}}>Used: </span><strong style={{color:"var(--accent)"}}>{(form.sessionsOffset||0) + sessions.filter(s => { const now=new Date(); const t=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0'); return s.date&&s.date<=t&&s.clientIds.includes(modal.id)&&(!form.packageStartDate||s.date>=form.packageStartDate); }).length}</strong></div>
                  <div><span style={{color:"var(--muted)"}}>Left: </span><strong style={{color:"var(--green)"}}>{Math.max(0, (form.sessionsTotal||0) - ((form.sessionsOffset||0) + sessions.filter(s => { const now=new Date(); const t=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0'); return s.date&&s.date<=t&&s.clientIds.includes(modal.id)&&(!form.packageStartDate||s.date>=form.packageStartDate); }).length))}</strong></div>
                  <div style={{color:"var(--muted)"}}>{form.sessionsOffset||0} carry-over + {sessions.filter(s => { const now=new Date(); const t=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0'); return s.date&&s.date<=t&&s.clientIds.includes(modal.id)&&(!form.packageStartDate||s.date>=form.packageStartDate); }).length} tracked</div>
                </div>
              )}
              {modal !== "add" && (
                <div style={{fontSize:12,color:"var(--muted)",marginTop:8}}>
                  Email: {form.email}
                </div>
              )}
            </div>
            <div className="modal-footer">
              {modal !== "add" && <button className="btn-secondary" style={{color:"var(--red)",borderColor:"var(--red)"}} onClick={del}>Remove</button>}
              {modal !== "add" && <button className="btn-secondary" style={{color:"var(--accent)",borderColor:"var(--accent)"}} onClick={resetPassword}>🔑 Reset Password</button>}
              <button className="btn-secondary" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn-primary" style={{width:"auto",padding:"10px 24px",fontSize:15}} onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TrainerAvailability({ clients, sessions, saveSessions, saveClients, hiddenBlocks, setHiddenBlocks }) {
  const [avails, setAvails] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [assignFeedback, setAssignFeedback] = useState("");
  const [expandedSession, setExpandedSession] = useState(null);
  const [trainerWeekOffset, setTrainerWeekOffset] = useState(0); // 0=current week, 1=next, etc.
  const [draggedClient, setDraggedClient] = useState(null); // {clientId, fromSessionId}
  const [dragOverSession, setDragOverSession] = useState(null);
  const [dragOverWaitlist, setDragOverWaitlist] = useState(false);
  const [waitlist, setWaitlist] = useState([]);
  const [selectedWaitlistClient, setSelectedWaitlistClient] = useState(null); // clientId being placed from waitlist

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
      if (session.clientIds.length >= MAX_GROUP_SIZE) return;
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
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={()=>setTrainerWeekOffset(o=>o-1)}>‹</button>
            <span className="bebas" style={{fontSize:18,color:"var(--text)",minWidth:200,textAlign:"center"}}>{weekLabel(currentMonday)}</span>
            <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={()=>setTrainerWeekOffset(o=>o+1)}>›</button>
            {trainerWeekOffset !== 0 && <button className="btn-secondary" style={{padding:"6px 12px",fontSize:11}} onClick={()=>setTrainerWeekOffset(0)}>Today</button>}
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:"#4cff9120",border:"1px solid var(--green)"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"var(--green)"}} />
                <span style={{fontSize:12,fontWeight:600,color:"var(--green)"}}>
                  {clients.filter(c=>!(Array.isArray(c.pausedWeeks)?c.pausedWeeks:[]).includes(currentWeekKey)).length} Active
                </span>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:"#ffffff08",border:"1px solid var(--border)"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"var(--muted)"}} />
                <span style={{fontSize:12,fontWeight:600,color:"var(--muted)"}}>
                  {clients.filter(c=>(Array.isArray(c.pausedWeeks)?c.pausedWeeks:[]).includes(currentWeekKey)).length} Inactive
                </span>
              </div>
              {(() => {
                const sunday = new Date(currentMonday); sunday.setDate(currentMonday.getDate()+6);
                const inWeek = s => { if (!s.date) return false; const sd = new Date(s.date+"T12:00:00"); return sd >= currentMonday && sd <= sunday; };
                const activeClients = clients.filter(c => c.active && !c.former && !(Array.isArray(c.pausedWeeks)?c.pausedWeeks:[]).includes(currentWeekKey));
                const bookedIds = new Set(sessions.filter(s=>inWeek(s)).flatMap(s=>s.clientIds));
                const booked = activeClients.filter(c=>bookedIds.has(c.id)).length;
                const notBooked = activeClients.filter(c=>!bookedIds.has(c.id)).length;
                return (
                  <>
                    <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:"#3ec9c915",border:"1px solid var(--accent)"}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:"var(--accent)"}} />
                      <span style={{fontSize:12,fontWeight:600,color:"var(--accent)"}}>{booked} Booked</span>
                    </div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:"#ff4c6b15",border:"1px solid var(--red)"}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:"var(--red)"}} />
                      <span style={{fontSize:12,fontWeight:600,color:"var(--red)"}}>{notBooked} Not Booked</span>
                    </div>
                  </>
                );
              })()}
            </div>
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
        <div style={{display:"flex",gap:0}}>
          {/* A–Z index */}
          {(() => {
            const sorted = [...clients].sort((a,b)=>a.name.localeCompare(b.name));
            const letters = [...new Set(sorted.map(c=>c.name[0].toUpperCase()))].sort();
            return (
              <div style={{width:32,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:4,gap:2,position:"sticky",top:56,alignSelf:"flex-start"}}>
                {letters.map(l=>(
                  <div key={l}
                    onClick={()=>document.getElementById("avail-letter-"+l)?.scrollIntoView({behavior:"smooth",block:"center"})}
                    style={{fontSize:15,fontWeight:700,color:"var(--accent)",cursor:"pointer",lineHeight:1.8,userSelect:"none",transition:"color 0.1s"}}
                    onMouseEnter={e=>e.currentTarget.style.color="var(--text)"}
                    onMouseLeave={e=>e.currentTarget.style.color="var(--accent)"}
                  >{l}</div>
                ))}
              </div>
            );
          })()}
          <div style={{flex:1,overflowX:"auto"}}>
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Texted</th>
              <th>Available Times</th>
              <th>Sessions Wanted</th>
              <th>Availability</th>
              <th>Booked</th>
              <th>Submitted</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const sorted = [...clients].sort((a,b) => a.name.localeCompare(b.name));
              const activeClients = sorted.filter(c => !(Array.isArray(c.pausedWeeks) ? c.pausedWeeks : []).includes(currentWeekKey));
              const inactiveClients = sorted.filter(c => (Array.isArray(c.pausedWeeks) ? c.pausedWeeks : []).includes(currentWeekKey));
              const rows = [
                ...activeClients,
                ...(inactiveClients.length > 0 ? ["__divider__"] : []),
                ...inactiveClients
              ];
              let lastLetter = null;
              return rows.map(c => {
                if (c === "__divider__") return (
                  <tr key="divider">
                    <td colSpan={7} style={{padding:"10px 12px 4px",fontSize:11,fontWeight:700,color:"var(--muted)",letterSpacing:2,borderTop:"2px solid var(--border)",background:"transparent"}}>
                      INACTIVE THIS WEEK
                    </td>
                  </tr>
                );
                const letter = c.name[0].toUpperCase();
                const showLetter = letter !== lastLetter;
                lastLetter = letter;
              const avRow = clientAvail(c.id);
              const isInactive = (Array.isArray(c.pausedWeeks) ? c.pausedWeeks : []).includes(currentWeekKey);
              return (
                <Fragment key={c.id}>
                  {showLetter && (
                    <tr id={`avail-letter-${letter}`}>
                      <td colSpan={8} style={{padding:"6px 12px 2px",fontSize:10,fontWeight:700,color:"var(--accent)",letterSpacing:3,background:"var(--panel)",borderTop:"1px solid var(--border)"}}>{letter}</td>
                    </tr>
                  )}
                <tr style={{cursor:"pointer", opacity:isInactive?0.5:1}} onClick={()=>setSelectedClient(c)}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div className="user-avatar" style={{fontSize:11,background:selectedClient?.id===c.id?"var(--accent)":"var(--panel)",border:"1px solid var(--accent)",color:selectedClient?.id===c.id?"var(--black)":"var(--accent)"}}>
                        {c.name.split(" ").map(x=>x[0]).join("")}
                      </div>
                      <span style={{fontWeight:500,color:selectedClient?.id===c.id?"var(--accent)":"var(--text)"}}>{c.name}</span>
                    </div>
                  </td>
                  <td onClick={e=>e.stopPropagation()}>
                    {(() => {
                      const textedWeeks = Array.isArray(c.textedWeeks) ? c.textedWeeks : [];
                      const texted = textedWeeks.includes(currentWeekKey);
                      return (
                        <div
                          onClick={async () => {
                            const newTextedWeeks = texted
                              ? textedWeeks.filter(w => w !== currentWeekKey)
                              : [...textedWeeks, currentWeekKey];
                            const updated = clients.map(x => x.id===c.id ? {...x, textedWeeks:newTextedWeeks} : x);
                            await saveClients(updated, {...c, textedWeeks:newTextedWeeks});
                          }}
                          style={{
                            display:"inline-flex",alignItems:"center",gap:6,
                            padding:"4px 12px",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:600,
                            background: texted ? "#3ec9c920" : "#ffffff08",
                            color: texted ? "var(--accent)" : "var(--muted)",
                            border: `1px solid ${texted ? "var(--accent)" : "var(--border)"}`,
                            transition:"all 0.15s", userSelect:"none"
                          }}
                        >
                          <div style={{width:7,height:7,borderRadius:"50%",background: texted ? "var(--accent)" : "var(--border)"}} />
                          {texted ? "Texted ✓" : "Texted"}
                        </div>
                      );
                    })()}
                  </td>
                  <td style={{color:"var(--muted)",fontSize:12}}>
                    {avRow ? (() => {
                      const formatted = avRow.slots.slice(0,3).map(s => {
                        const parts = s.split(" ");
                        if (parts[0].includes("-")) {
                          const d = new Date(parts[0]+"T12:00:00");
                          const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                          return `${days[d.getDay()]} ${d.getDate()} ${parts.slice(1).join(" ")}`;
                        }
                        return s;
                      });
                      return formatted.join(", ") + (avRow.slots.length>3?` +${avRow.slots.length-3} more`:"");
                    })() : <span style={{color:"var(--border)"}}>—</span>}
                  </td>
                  <td>
                    {avRow?.trainingsWanted > 0 ? (
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{
                          width:32,height:32,borderRadius:"50%",
                          background:"var(--accent)",color:"var(--black)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:16,fontWeight:700
                        }}>{avRow.trainingsWanted}</div>
                        <span style={{fontSize:12,color:"var(--muted)"}}>session{avRow.trainingsWanted>1?"s":""}</span>
                      </div>
                    ) : <span style={{color:"var(--border)"}}>—</span>}
                  </td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      {avRow ? <span className="badge badge-green">Submitted</span> : <span className="badge badge-muted">Pending</span>}
                      {avRow && (
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
                  <td onClick={e=>e.stopPropagation()}>
                    {(() => {
                      const sunday = new Date(currentMonday); sunday.setDate(currentMonday.getDate() + 6);
                      const dkFn = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
                      const inWeek = s => { if (!s.date) return false; const sd = new Date(s.date+"T12:00:00"); return sd >= currentMonday && sd <= sunday; };
                      const bookedSessions = sessions.filter(s => inWeek(s) && s.clientIds.includes(c.id));
                      const booked = bookedSessions.length > 0;
                      return (
                        <div style={{
                          display:"inline-flex",alignItems:"center",gap:6,
                          padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:600,
                          background:booked?"#22c55e20":"#ef444415",
                          color:booked?"var(--green)":"var(--red)",
                          border:`1px solid ${booked?"var(--green)":"var(--red)"}`,
                          whiteSpace:"nowrap"
                        }}>
                          <div style={{width:7,height:7,borderRadius:"50%",background:booked?"var(--green)":"var(--red)"}} />
                          {booked ? `✓ Booked (${bookedSessions.length})` : "✗ Not Booked"}
                        </div>
                      );
                    })()}
                  </td>
                  <td style={{color:"var(--muted)",fontSize:12}}>{avRow?.date||"—"}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    {(() => {
                      const pausedWeeks = Array.isArray(c.pausedWeeks) ? c.pausedWeeks : [];
                      const isPaused = pausedWeeks.includes(currentWeekKey);
                      return (
                        <div
                          onClick={async()=>{
                            const newPaused = isPaused
                              ? pausedWeeks.filter(w => w !== currentWeekKey)
                              : [...pausedWeeks, currentWeekKey];
                            const updated = clients.map(x => x.id===c.id ? {...x, pausedWeeks:newPaused} : x);
                            await saveClients(updated, {...c, pausedWeeks:newPaused});
                          }}
                          style={{
                            display:"inline-flex",alignItems:"center",gap:6,
                            padding:"4px 10px",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:600,
                            background:isPaused?"#ffffff10":"#4cff9120",
                            color:isPaused?"var(--muted)":"var(--green)",
                            border:`1px solid ${isPaused?"var(--border)":"var(--green)"}`,
                            transition:"all 0.15s",userSelect:"none"
                          }}
                        >
                          <div style={{width:7,height:7,borderRadius:"50%",background:isPaused?"var(--muted)":"var(--green)"}} />
                          {isPaused ? "Inactive" : "Active"}
                        </div>
                      );
                    })()}
                  </td>
                </tr>
                </Fragment>
              );
              });
            })()}
          </tbody>
        </table>
          </div>
        </div>
      </div>

      {/* Split screen panel when client selected */}
      {selectedClient && (() => {
        // Use the currently selected week (currentMonday) — matches what trainer has selected
        const monday = currentMonday;
        const weekDates = Array.from({length:6}, (_,i) => { const d = new Date(monday); d.setDate(monday.getDate()+i); return d; });
        const today2 = new Date(); today2.setHours(0,0,0,0);
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
              background:"var(--charcoal)",borderBottom:"1px solid var(--border)",
              flexShrink:0
            }}>
              {/* Top row — name + close */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 24px"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div className="user-avatar" style={{background:"var(--accent)",color:"var(--black)",fontSize:13}}>
                    {selectedClient.name.split(" ").map(x=>x[0]).join("")}
                  </div>
                  <div>
                    <div className="bebas" style={{fontSize:20,color:"var(--text)"}}>{selectedClient.name}</div>
                    <div style={{fontSize:11,color:"var(--muted)"}}>
                      {avail ? `${slots.length} available slot${slots.length!==1?"s":""}` : "No availability submitted"} · {weekLabel(currentMonday)}
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  {assignFeedback && (
                    <div style={{background:"#3ec9c920",border:"1px solid var(--accent)",borderRadius:2,padding:"6px 14px",fontSize:12,color:"var(--accent)"}}>
                      ✓ Assigned to {assignFeedback}
                    </div>
                  )}
                  <button className="modal-close" style={{fontSize:20}} onClick={()=>setSelectedClient(null)}>✕</button>
                </div>
              </div>
              {/* Booked this week — inline row */}
              {(() => {
                const bookedThisWeek = sessions.filter(s =>
                  s.clientIds.includes(selectedClient.id) &&
                  weekDates.some(d => dk2(d) === s.date)
                ).sort((a,b) => a.date < b.date ? -1 : a.date > b.date ? 1 : TIMES.indexOf(a.time)-TIMES.indexOf(b.time));
                return (
                  <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 24px 12px",flexWrap:"wrap"}}>
                    <span style={{fontSize:10,textTransform:"uppercase",letterSpacing:2,color:"var(--accent)",marginRight:4}}>
                      Booked {bookedThisWeek.length > 0 ? `(${bookedThisWeek.length})` : ""}
                    </span>
                    {bookedThisWeek.length === 0
                      ? <span style={{fontSize:12,color:"var(--muted)"}}>No sessions booked yet</span>
                      : bookedThisWeek.map(s => (
                          <div key={s.id} style={{display:"inline-flex",alignItems:"center",gap:4}}>
                            <div onClick={()=>toggleAssign(s)} style={{
                              display:"inline-flex",alignItems:"center",gap:6,
                              padding:"4px 10px",borderRadius:20,cursor:"pointer",
                              background:"#3ec9c920",border:"1px solid var(--accent)",
                              fontSize:11,color:"var(--accent)",whiteSpace:"nowrap"
                            }}>
                              ✓ {s.date ? (() => { const d2=new Date(s.date+"T12:00:00"); return `${DAY_SHORT[d2.getDay()]} ${s.time}`; })() : s.time}
                              <span style={{fontSize:10,color:"var(--muted)"}}>✕</span>
                            </div>
                            <div
                              title="Move to waitlist"
                              onClick={()=>{
                                if (waitlist.find(w=>w.clientId===selectedClient.id)) return;
                                const updated = sessions.map(sess =>
                                  sess.id===s.id ? {...sess, clientIds: sess.clientIds.filter(id=>id!==selectedClient.id)} : sess
                                );
                                saveSessions(updated, updated.find(x=>x.id===s.id));
                                setWaitlist(prev=>[...prev, {clientId: selectedClient.id, name: selectedClient.name.split(" ")[0]}]);
                              }}
                              style={{
                                width:20,height:20,borderRadius:"50%",display:"flex",alignItems:"center",
                                justifyContent:"center",fontSize:11,cursor:"pointer",
                                background:"#f59e0b20",border:"1px solid #f59e0b",
                                flexShrink:0,transition:"background 0.15s"
                              }}
                              onMouseEnter={e=>e.currentTarget.style.background="#f59e0b40"}
                              onMouseLeave={e=>e.currentTarget.style.background="#f59e0b20"}
                            >⏳</div>
                          </div>
                        ))
                    }
                  </div>
                );
              })()}
            </div>

            {/* Full width calendar — shared time-row grid so all days stay aligned */}
            <div style={{display:"flex",flex:1,overflow:"hidden"}}>
              <div style={{flex:1,overflowY:"auto",padding:"20px 20px"}}>
                <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:16}}>{weekLabel(currentMonday)} — Click to Assign</div>
                {(() => {
                  // Collect every unique time slot across the whole week, in order
                  const allTimes = [...new Set(
                    weekDates.flatMap(d => sessions.filter(s=>s.date===dk2(d)).map(s=>s.time))
                  )].sort((a,b)=>TIMES.indexOf(a)-TIMES.indexOf(b));

                  // Separate morning and evening
                  const morningTimes = allTimes.filter(t=>t.includes("AM"));
                  const eveningTimes = allTimes.filter(t=>t.includes("PM"));
                  const timeGroups = [morningTimes, eveningTimes].filter(g=>g.length>0);

                  const renderCell = (d, time) => {
                    const dk = dk2(d);
                    const s = sessions.find(x=>x.date===dk && x.time===time);
                    if (!s) return <div key={time+dk} style={{height:94,boxSizing:"border-box"}} />;

                    const assigned = s.clientIds.includes(selectedClient.id);
                    const full = s.clientIds.length >= MAX_GROUP_SIZE && !assigned;
                    const clientAvailable = isClientAvail(d, time);
                    const isDragOver = dragOverSession === s.id && draggedClient && draggedClient.fromSessionId !== s.id;
                    const isHidden = !!hiddenBlocks[s.id];

                    if (isHidden) return (
                      <div key={s.id}
                        onClick={()=>setHiddenBlocks(prev=>{ const n={...prev}; delete n[s.id]; try{localStorage.setItem("ml_hidden_blocks",JSON.stringify(n));}catch{} return n; })}
                        title="Click to restore"
                        style={{
                          height:94,boxSizing:"border-box",borderRadius:2,
                          border:"1px dashed #2a2a2a",background:"transparent",cursor:"pointer",
                          transition:"border-color 0.15s,background 0.15s"
                        }}
                        onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.background="#3ec9c908"; }}
                        onMouseLeave={e=>{ e.currentTarget.style.borderColor="#2a2a2a"; e.currentTarget.style.background="transparent"; }}
                      />
                    );

                    return (
                      <div key={s.id}
                        onClick={()=>{
                          if (draggedClient) return;
                          if (selectedWaitlistClient) {
                            // Book the waitlisted client into this session
                            if (s.clientIds.length >= MAX_GROUP_SIZE) return;
                            if (s.clientIds.includes(selectedWaitlistClient)) return;
                            const updated = sessions.map(sess =>
                              sess.id===s.id ? {...sess, clientIds:[...sess.clientIds, selectedWaitlistClient]} : sess
                            );
                            saveSessions(updated, updated.find(x=>x.id===s.id));
                            setWaitlist(prev=>prev.filter(w=>w.clientId!==selectedWaitlistClient));
                            setSelectedWaitlistClient(null);
                            return;
                          }
                          if (!full) toggleAssign(s);
                        }}
                        onDragOver={e=>{ e.preventDefault(); setDragOverSession(s.id); }}
                        onDragLeave={()=>setDragOverSession(null)}
                        onDrop={async(e)=>{
                          e.preventDefault();
                          setDragOverSession(null);
                          if (!draggedClient || draggedClient.fromSessionId === s.id) return;
                          if (s.clientIds.length >= MAX_GROUP_SIZE) return;
                          const updated = sessions.map(sess => {
                            if (sess.id === draggedClient.fromSessionId) return {...sess, clientIds: sess.clientIds.filter(id=>id!==draggedClient.clientId)};
                            if (sess.id === s.id) return {...sess, clientIds: [...sess.clientIds, draggedClient.clientId]};
                            return sess;
                          });
                          if (draggedClient.fromSessionId) {
                            await saveSessions(updated, updated.find(x=>x.id===draggedClient.fromSessionId));
                          }
                          await saveSessions(updated, updated.find(x=>x.id===s.id));
                          setWaitlist(prev=>prev.filter(w=>w.clientId!==draggedClient.clientId));
                          setDraggedClient(null);
                        }}
                        style={{
                          height:94,boxSizing:"border-box",borderRadius:2,overflow:"hidden",
                          cursor: selectedWaitlistClient ? (s.clientIds.length>=MAX_GROUP_SIZE?"not-allowed":"crosshair") : full?"default":"pointer",
                          border:`2px solid ${selectedWaitlistClient&&s.clientIds.length<MAX_GROUP_SIZE?"#f59e0b":isDragOver?"var(--accent)":assigned?"var(--accent)":clientAvailable?"var(--green)":"var(--border)"}`,
                          background:isDragOver?"#3ec9c930":assigned?"var(--accent)":clientAvailable?"#22c55e15":"#1a2a3a",
                          transition:"all 0.15s",position:"relative",padding:"4px 6px"
                        }}>
                        {/* ✕ top right */}
                        <div style={{position:"absolute",top:4,right:4}}>
                          <div
                            title="Hide this time block"
                            onClick={(e)=>{ e.stopPropagation(); setHiddenBlocks(prev=>{ const n={...prev,[s.id]:true}; try{localStorage.setItem("ml_hidden_blocks",JSON.stringify(n));}catch{} return n; }); }}
                            style={{width:16,height:16,borderRadius:"50%",background:"#ff4c6b30",color:"var(--red)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,cursor:"pointer",transition:"background 0.15s"}}
                            onMouseEnter={e=>e.currentTarget.style.background="#ff4c6b60"}
                            onMouseLeave={e=>e.currentTarget.style.background="#ff4c6b30"}
                          >✕</div>
                        </div>
                        {/* Client names */}
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 3px",marginTop:18}}>
                          {Array.from({length:MAX_GROUP_SIZE}).map((_,i) => {
                            const cId = s.clientIds[i];
                            const cl = cId ? clients.find(x=>x.id===cId) : null;
                            const name = cl ? cl.name.split(" ")[0] : null;
                            return name ? (
                              <div key={i} draggable
                                onDragStart={e=>{ e.stopPropagation(); setDraggedClient({clientId:cId,fromSessionId:s.id}); }}
                                onDragEnd={()=>setDraggedClient(null)}
                                style={{fontSize:10,fontWeight:500,color:assigned?"var(--black)":"var(--text)",padding:"1px 3px",borderRadius:2,background:assigned?"rgba(0,0,0,0.15)":"rgba(255,255,255,0.06)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",cursor:"grab",userSelect:"none"}}
                              >{name}</div>
                            ) : <div key={i} style={{fontSize:10,color:"transparent",padding:"1px 3px"}}>·</div>;
                          })}
                        </div>
                        {/* Count bottom right */}
                        <div style={{position:"absolute",bottom:4,right:6,fontSize:15,fontWeight:700,lineHeight:1,color:assigned?"rgba(0,0,0,0.4)":full?"var(--red)":clientAvailable?"var(--green)":"var(--muted)",userSelect:"none"}}>
                          {s.clientIds.length}/{MAX_GROUP_SIZE}
                        </div>
                      </div>
                    );
                  };

                  const TIME_COL_W = 64;

                  return (
                    <>
                      {/* Header row — empty time col + day headers */}
                      <div style={{display:"flex",gap:8,marginBottom:8}}>
                        <div style={{width:TIME_COL_W,flexShrink:0}} />
                        <div style={{flex:1,display:"grid",gridTemplateColumns:`repeat(${weekDates.length},1fr)`,gap:8}}>
                          {weekDates.map(d => {
                            const tod = dk2(d) === dk2(today2);
                            return (
                              <div key={dk2(d)} style={{textAlign:"center",padding:"10px 4px",borderBottom:"2px solid",borderColor:tod?"var(--accent)":"var(--border)"}}>
                                <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)"}}>{DAY_SHORT[d.getDay()]}</div>
                                <div style={{fontSize:26,fontWeight:700,color:tod?"var(--accent)":"var(--text)"}}>{d.getDate()}</div>
                                <div style={{fontSize:12,color:"var(--muted)"}}>{MON_SHORT[d.getMonth()]}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/* Time rows */}
                      {timeGroups.map((group, gi) => (
                        <div key={gi}>
                          {gi > 0 && <div style={{height:1,background:"var(--border)",margin:"10px 0"}} />}
                          {group.map(time => (
                            <div key={time} style={{display:"flex",gap:8,marginBottom:8,alignItems:"stretch"}}>
                              {/* Time label column */}
                              <div style={{width:TIME_COL_W,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:8}}>
                                <div style={{textAlign:"right",lineHeight:1.1}}>
                                  <div style={{fontWeight:700,fontSize:20,color:"var(--text)"}}>{time.replace(":00 AM","").replace(":00 PM","")}</div>
                                  <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1}}>{time.includes("AM")?"AM":"PM"}</div>
                                </div>
                              </div>
                              {/* Day cells */}
                              <div style={{flex:1,display:"grid",gridTemplateColumns:`repeat(${weekDates.length},1fr)`,gap:8}}>
                                {weekDates.map(d => renderCell(d, time))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  );
                })()}
              </div>
              {/* Floating waitlist box — bottom right of calendar */}
              <div
                onDragOver={e=>{ e.preventDefault(); setDragOverWaitlist(true); }}
                onDragLeave={()=>setDragOverWaitlist(false)}
                onDrop={e=>{
                  e.preventDefault();
                  setDragOverWaitlist(false);
                  if (!draggedClient) return;
                  const cl = clients.find(x=>x.id===draggedClient.clientId);
                  if (!cl || waitlist.find(w=>w.clientId===draggedClient.clientId)) return;
                  if (draggedClient.fromSessionId) {
                    const updated = sessions.map(sess =>
                      sess.id===draggedClient.fromSessionId
                        ? {...sess, clientIds: sess.clientIds.filter(id=>id!==draggedClient.clientId)}
                        : sess
                    );
                    saveSessions(updated, updated.find(x=>x.id===draggedClient.fromSessionId));
                  }
                  setWaitlist(prev=>[...prev, {clientId: draggedClient.clientId, name: cl.name.split(" ")[0]}]);
                  setDraggedClient(null);
                }}
                style={{
                  margin:"12px 20px 16px",
                  minHeight:54, borderRadius:6,
                  border:`2px dashed ${dragOverWaitlist?"var(--accent)":"var(--border)"}`,
                  background: dragOverWaitlist?"#3ec9c910":"#0d1a26",
                  padding:"8px 12px", transition:"all 0.15s", boxSizing:"border-box"
                }}
              >
                <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:2,color: selectedWaitlistClient?"var(--accent)":"var(--muted)",marginBottom:6}}>
                  {selectedWaitlistClient
                    ? `Click a session to book ${waitlist.find(w=>w.clientId===selectedWaitlistClient)?.name} ↑`
                    : `Waitlist ${waitlist.length > 0 ? `(${waitlist.length})` : ""}`}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
                  {waitlist.map(w=>{
                    const isSelected = selectedWaitlistClient === w.clientId;
                    return (
                    <div key={w.clientId}
                      onClick={()=>setSelectedWaitlistClient(isSelected ? null : w.clientId)}
                      style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:20,
                        background: isSelected?"#f59e0b":"#f59e0b20",
                        border:"1px solid #f59e0b",fontSize:11,fontWeight:600,
                        color: isSelected?"var(--black)":"#f59e0b",
                        cursor:"pointer",userSelect:"none",transition:"all 0.15s"}}
                    >
                      ⏳ {w.name}
                      <span onClick={e=>{e.stopPropagation(); setWaitlist(prev=>prev.filter(x=>x.clientId!==w.clientId)); if(isSelected) setSelectedWaitlistClient(null);}} style={{fontSize:10,cursor:"pointer",opacity:0.6}}>✕</span>
                    </div>
                  );})}
                  {/* Add selected client to waitlist */}
                  {selectedClient && !waitlist.find(w=>w.clientId===selectedClient.id) && (
                    <div
                      onClick={()=>setWaitlist(prev=>[...prev, {clientId:selectedClient.id, name:selectedClient.name.split(" ")[0]}])}
                      style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,
                        background:"#ffffff08",border:"1px dashed var(--border)",
                        fontSize:11,fontWeight:600,color:"var(--muted)",
                        cursor:"pointer",userSelect:"none",transition:"all 0.15s"}}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor="#f59e0b"; e.currentTarget.style.color="#f59e0b"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--muted)"; }}
                    >+ {selectedClient.name.split(" ")[0]} → waitlist</div>
                  )}
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
const ALL_EXERCISES_DEFAULT = {
  "Chest": [
    "— PRESS —",
    "Flat Bench Press","Incline Bench Press","Close Grip Bench Press",
    "Flat Dumbbell Press (1/2) (Alt/Together) (Ball/Ground)",
    "Incline Dumbbell Press (1/2/Together) (Alt) (Ball/Ground)",
    "Cable Punch","Landmine Chest (Knees)","Machine Press Corner","Plate Press (Incline/Flat)",
    "— FLY —",
    "Flat Dumbbell Fly","Incline Dumbbell Fly","Cables From Top With Stomach On Bench",
    "Cables Crossover From Top (1/2)","Cables Crossover From Middle (1/2)","Cables Crossover From Under (1/2)",
    "Plate Squeeze Up & Down",
    "— BODYWEIGHT —",
    "Push Up On Bench Holding Top Bench","Dips","Walk Out Push Ups","Max Push Ups"
  ],
  "Back": [
    "— TOP ROW —",
    "Wide Grip Lat Pulldown","Double Handle Sitting On Ground","Chin Up Grip","Triangle","Single Handle","Sideways Single Hand",
    "— MIDDLE ROW —",
    "Single Handle Row","Triangle Row","Long Bar Row","Small Bar","Machine Row","Corner Back Row Machine",
    "— BOTTOM ROW —",
    "Landmine Row (1/2)","Single Dumbbell Row Bench","Double Dumbbell Row","Barbell Row",
    "Single Handle Leaning Forward On Bench","Standing Row From Low (Triangle/Small Bar/Single Handle)",
    "— BODYWEIGHT/LAT/LOWER BACK —",
    "Straight Arm Lat Pulldown (1/2) (Bands)","Chin Up (Reg/Negative/Hold)","Lower Back Bench",
    "Airplanes","TRX Row (1/2)","Barbell Reverse Row","Barbell Hold"
  ],
  "Shoulders": [
    "— OVERHEAD —",
    "Regular/Arnold Dumbbell Press (Seated/Standing/1)","Overhead Z Bar","Barbell Overhead","Landmine Overhead",
    "Plate Overhead","Overhead Press 1 Dumbbell Other Holds","Triangle Cable",
    "— LATERAL —",
    "Dumbbell Lateral (Seated/Standing/1)","Handle Lateral","Band Lateral","Lat To Front Down","Around The World","Down The Rack Lateral",
    "— FRONT —",
    "Dumbbells Front (1/2 Alternating)","Handle Front","Band Front","Front To Lat Down",
    "Seated Arms Shoulder Height Lift Above Head With Ropes Cables","Incline Bench Front Raise",
    "Z Bar Front","Plate Front","Down The Rack Front",
    "— REAR —",
    "Bent Over Handle","Standing Handle Rear (1/2)","Band Rear (1/2)","TRX Rear","Dumbbells Rear","Down The Rack Rear","Ropes Rear",
    "— MIX —",
    "Bike Arms Only (Circuit)","Superman","Dumbbell/Barbell Traps","Move Weight Side To Side On Hands",
    "Push Up Position Shoulders","Rotator Cuff Dumbbell","Small Openings Small Band","Forearm Attachment",
    "Steering Wheel Plate","Hold Weights High Push Forward & Back","On Stomach Push Dumbbell Forward",
    "Dumbbell Circle","Traps","Up & Down From Plank","Walk Outs/Bear Crawls",
    "Hold 1 Dumbbell Lateral Push Overhead Other Arm","Shoulder Taps"
  ],
  "Triceps": [
    "Behind The Head Any Cable Attachment","Z Bar Behind Head","1/2 Dumbbell Behind Head",
    "Bench Dip","Any Cable Attachment Pulldown","1/2 Dumbbell/Cable/Bands Kickback",
    "Z Bar Or Dumbbell Skull Crushers","TRX Triceps","Tricep Push Up","Close Grip Bench Press",
    "Bench Push Up At The End","All Tricep Exercises With Bands"
  ],
  "Biceps": [
    "Incline Bench Curl","Regular Standing Curl","Standing Sideways Curl Single Arm Elevated",
    "Barbell/Z Bar/Plate Curl","Concentrated Curl Cable","Cable Curl (Rope/Bar/Handle)",
    "TRX Curl","Z Bar Curls","Single Dumbbell Curl Hold End","Sideways Cone Curl",
    "Band Curls","Long Bar Curl Behind Head"
  ],
  "Core": [
    "Reverse Crunch/Leg Raises","Regular Crunches","Bike Abs","Russian Twist Ground",
    "Side Abs Bench Or Standing Dumbbell","Weighted Plank","Ball Front To Back",
    "Side Abs Cable On TP","Crunch Black Bench","Alternating Leg Raises","Wipers",
    "Side Abs Rotation Cable","Glider Abs (In & Out/Pike)","Lift Legs Over Block","Side Crunch",
    "Hold Weight Over Head Crisscross/Scissors","Weighted Crunches","Touch Each Heel Ground",
    "Russian Twist Black Bench","Side Plank (Dips)","Plank Side To Side","Alternating Scissors Crunches",
    "In & Out Sitting","Ceiling Crunches","Leg Raises Black Bench","Plank On Ball","Spider Plank",
    "Circle Abs","Push Up Position Roll Ball Forward And Back","Plank Side Dips","Single Leg Crunch",
    "Plank Forward And Back","Block Crunch Tap Behind Head","Landmine Rotations","10 LBS Abs Crunch",
    "Star Abs","Infinity Block","V Crunch","Angel Crunches"
  ],
  "Legs": [
    "— SQUATS —",
    "Regular Squats","Barbell Squats","Box Squats Deep Sitting TP","Front Squat Using Z Bar",
    "Hack Squat","Landmine Squats","Jump Squat TRX","Bodyweight Squat Circuit","Elevated Heels Squats",
    "Band Squat Open & Close","Squat Lift Band","Pulses Sumo Stance",
    "— LUNGES —",
    "Bulgarian Lunges","Side Lunges (Glider/Step/Stay Open)","Glider Side Lunge Alternating",
    "Landmine Lunges","TRX Single Leg Lunge","Curtsy Lunge","Lunge Holding Rack",
    "Stay Low Tap Each Side Lunge Position",
    "— DEADLIFT —",
    "Regular Barbell Deadlift","Stiff Leg Deadlift Dumbbell","Single Leg Deadlift",
    "Sumo Deadlift Barbell","Hex Bar Deadlift","Regular Dumbbell Deadlift",
    "— HAMSTRINGS/GLUTES —",
    "Leg Curls","Ball/Glider Hamstrings","Glider Hamstrings","Hip Thrust (Barbell/BW)",
    "Single Leg Hip Thrust","Dumbbell Hamstring Laying On Bench","On Ground Keep Butt Up Move Leg Up & Down",
    "— CALVES/INNER/OUTER —",
    "Leg Press Calves","Calf Raises","Cable Inner Thigh","Inner Thigh Circuit (Ball/Gliders/Side To Side)",
    "Ankle Strap (Inner/Outer/Back)","Lay Sideways","Side Band Raise Clamshell",
    "Laying Sideways Open Band Then Middle","Band Sideways Open",
    "— OTHER —",
    "Leg Press","Single Leg Press","Leg Extensions","Step Ups","Wall Sit (Weighted/Band)",
    "Pistol Squat From Bench Or TRX","Cable Back Kick","Alternating Band 3 Points",
    "From Knees Up & Down Jump","Landmine Sumo Pulses","Reverse Bridge On TP",
    "On Knees Move Forward & Back","On Knees 1 Leg Up In Back Pulse Bands",
    "Bands Walk Front To Back","1 Foot Hexagone","Barbell Lunges",
    "10 Calories Legs Only Bike","Circles Bands","Plank Jacks Banded"
  ],
  "Cardio": [
    "Ski","Rower","Bike","Skipping Rope Motion","Kettlebell Swing",
    "Jump Side To Side BattleRope","Squat Kick Alternating","Jump Squats","Seal Jacks",
    "Football Drill","Burpee","Hexagone Trio Jump","Lunge Position Quick Knee Up Hop",
    "Skaters","Jump On Board Squat Versions","Hold Bench Hop Side To Side",
    "Step Up On Bench Go Side To Side","Squat Press Overhead","Snatch","Battlerope Plank",
    "Mountain Climber (Gliders)","Half Burpees",
    "Battlerope From Knees Split Squat/Russian Twist","Quick Feet Open & Close",
    "High Knees","Lunge To Front Kick","Slam Ball (Sideways/Knees)","High Jump",
    "Jumping Jack Dumbbell","On Hands Hop Side To Side","Squats To Overhead Press",
    "Seated To High Jump","In & Out On Hand + Jump Hexagone","Spot Squat To Jump Squats",
    "BattleRopes (Russian Twist/Bosu/1 Arm Squat/Slams/Waves/Side To Side Jump/Side To Side Board/Knees Split Squat/Up & Down/Ski)",
    "Farmers Walk"
  ]
};

const MUSCLE_GROUPS = ALL_EXERCISES_DEFAULT;

function TrainerProgress({ clients, sessions, weekPlans, currentWeekIdx, library }) {
  const [openClients, setOpenClients] = useState([]); // array of client objects, max 7
  const [activeClientId, setActiveClientId] = useState(null); // which tab is active
  const [progressData, setProgressData] = useState({}); // keyed by clientId
  const [activeGroup, setActiveGroup] = useState("Chest");
  const [editCell, setEditCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [addExercise, setAddExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseGroup, setNewExerciseGroup] = useState("Chest");
  const [customExercises, setCustomExercises] = useState({}); // keyed by clientId
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSessionClients, setCurrentSessionClients] = useState([]);
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [historyData, setHistoryData] = useState({}); // keyed by clientId+exercise
  const [latestHistory, setLatestHistory] = useState({}); // keyed by clientId, value = {exercise: latestRow}
  const [historyDrawer, setHistoryDrawer] = useState(null); // {exercise, clientId}
  const [expandedHistory, setExpandedHistory] = useState({}); // keyed by clientId:exercise
  const [checkedExercises, setCheckedExercises] = useState({});

  const currentWeekPlan = (weekPlans && weekPlans[currentWeekIdx]) || [];
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(null); // null = hidden
  const [queuedExercisesMap, setQueuedExercisesMap] = useState({}); // keyed by clientId
  const [doneTodayMap, setDoneTodayMap] = useState({}); // keyed by clientId
  const [draggedExercise, setDraggedExercise] = useState(null);
  const todayKey = (() => { const n = new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`; })();
  const checkKey = (exercise) => `${activeClientId}:${exercise}:${todayKey}`;
  const isChecked = (exercise) => !!checkedExercises[checkKey(exercise)];
  const toggleCheck = async (exercise) => {
    const alreadyChecked = isChecked(exercise);
    setCheckedExercises(prev => ({ ...prev, [checkKey(exercise)]: !alreadyChecked }));
    if (!alreadyChecked) {
      // Log entry with whatever data exists, or just mark as done
      const d = (progressData[clientKey] || {})[exercise] || {};
      const entry = {
        clientId: clientKey,
        exercise,
        sets: d.sets || "",
        reps: d.reps || "",
        weight: d.weight || "",
        date: new Date().toLocaleDateString()
      };
      const histKey = clientKey + ":" + exercise;
      setHistoryData(prev => ({ ...prev, [histKey]: [...(prev[histKey] || []), entry] }));
      await sbFetch(`progress_history`, "POST", [entry], { Prefer: "return=minimal" });
    }
  };

  const selectedClient = openClients.find(c => c.id === activeClientId) || null;

  // Detect clients in current session — runs every minute via timer
  useEffect(() => {
    const detect = () => {
      const now = new Date();
      const todayKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      const currentTotalMins = currentHour * 60 + currentMin;
      const currentSession = sessions.find(s => {
        if (s.date !== todayKey) return false;
        if (!s.time) return false;
        const [timePart, ampm] = s.time.split(" ");
        let [h] = timePart.split(":").map(Number);
        if (ampm === "PM" && h !== 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        const sessionStart = h * 60;
        const sessionEnd = sessionStart + 60; // session lasts 1 hour
        return currentTotalMins >= sessionStart && currentTotalMins < sessionEnd;
      });
      if (currentSession && currentSession.clientIds.length > 0) {
        const presentClients = clients.filter(c => currentSession.clientIds.includes(c.id));
        setCurrentSessionClients(presentClients);
      } else {
        setCurrentSessionClients([]);
      }
    };
    detect();
    const interval = setInterval(detect, 60000); // re-check every minute
    return () => clearInterval(interval);
  }, [sessions, clients]);

  const clientKey = activeClientId;
  const queuedExercises = queuedExercisesMap[clientKey] || [];
  const doneToday = doneTodayMap[clientKey] || [];
  const setQueuedExercises = (fn) => setQueuedExercisesMap(prev => ({
    ...prev, [clientKey]: typeof fn === "function" ? fn(prev[clientKey] || []) : fn
  }));
  const setDoneToday = (fn) => setDoneTodayMap(prev => ({
    ...prev, [clientKey]: typeof fn === "function" ? fn(prev[clientKey] || []) : fn
  }));

  useEffect(() => {
    if (!clientKey) return;
    // Load progress data
    if (!progressData[clientKey]) {
      sbFetch(`progress?select=*&clientId=eq.${clientKey}`).then(rows => {
        if (!rows || !Array.isArray(rows)) return;
        const built = {};
        rows.forEach(row => { built[row.exercise] = { sets: row.sets||"", reps: row.reps||"", weight: row.weight||"", notes: row.notes||"", updatedAt: row.updatedAt||"" }; });
        setProgressData(prev => ({ ...prev, [clientKey]: built }));
      });
    }
    // Load custom exercises from DB (always reload to stay in sync and avoid duplicates)
    sbFetch(`progress_exercises?select=*&clientId=eq.${clientKey}`).then(rows => {
      if (!rows || !Array.isArray(rows)) return;
      const built = {};
      rows.forEach(row => {
        const group = row.muscleGroup || "Other";
        if (!built[group]) built[group] = [];
        if (!built[group].includes(row.exercise)) built[group].push(row.exercise);
      });
      setCustomExercises(prev => ({ ...prev, [clientKey]: built }));
    });
    // Load queue and done today from DB
    sbFetch(`progress?select=exercise,notes&clientId=eq.${clientKey}&exercise=in.(__queue__,__done__)`).then(rows => {
      if (!rows || !Array.isArray(rows)) return;
      rows.forEach(row => {
        try {
          const data = JSON.parse(row.notes || "[]");
          if (row.exercise === "__queue__") setQueuedExercisesMap(prev => ({...prev, [clientKey]: data}));
          if (row.exercise === "__done__") setDoneTodayMap(prev => ({...prev, [clientKey]: data}));
        } catch(e) {}
      });
    });
    // Load latest history entry per exercise for inline display
    sbFetch(`progress_history?select=exercise,date,sets,reps,weight&clientId=eq.${clientKey}&order=id.desc`).then(rows => {
      if (!rows || !Array.isArray(rows)) return;
      const latest = {};
      rows.forEach(row => {
        if (!latest[row.exercise]) latest[row.exercise] = row; // first = most recent
      });
      setLatestHistory(prev => ({ ...prev, [clientKey]: latest }));
    });
    // Load today's checked exercises from history
    const todayLocale = new Date().toLocaleDateString();
    sbFetch(`progress_history?select=exercise&clientId=eq.${clientKey}&date=eq.${encodeURIComponent(todayLocale)}`).then(rows => {
      if (!rows || !Array.isArray(rows)) return;
      const newChecked = {};
      rows.forEach(row => {
        const key = `${clientKey}:${row.exercise}:${todayKey}`;
        newChecked[key] = true;
      });
      if (Object.keys(newChecked).length > 0) {
        setCheckedExercises(prev => ({ ...prev, ...newChecked }));
      }
    });
  }, [clientKey]);

  const saveQueue = async (clientId, queue, done) => {
    await sbFetch(`progress?on_conflict=clientId,exercise`, "POST", [
      { clientId, exercise: "__queue__", sets:"", reps:"", weight:"", notes: JSON.stringify(queue) },
      { clientId, exercise: "__done__", sets:"", reps:"", weight:"", notes: JSON.stringify(done) }
    ], { Prefer: "resolution=merge-duplicates,return=minimal" });
  };

  const allExercisesForGroup = (group) => {
    const base = (library || ALL_EXERCISES_DEFAULT)[group] || [];
    const custom = (customExercises[clientKey] || {})[group] || [];
    return [...base, ...custom].sort((a, b) => {
      if (a.startsWith("—")) return 1;
      if (b.startsWith("—")) return -1;
      return a.localeCompare(b);
    });
  };

  const clientProgressData = progressData[clientKey] || {};
  const clientCustomExercises = customExercises[clientKey] || {};

  const saveExercise = async (exercise, field, value) => {
    setSaving(true);
    const existing = (progressData[clientKey] || {})[exercise] || { sets:"", reps:"", weight:"", notes:"" };
    const updated = { ...existing, [field]: value };
    setProgressData(prev => ({ ...prev, [clientKey]: { ...(prev[clientKey]||{}), [exercise]: updated } }));
    // Always upsert current values to progress table
    await sbFetch(`progress?on_conflict=clientId,exercise`, "POST", [{
      clientId: clientKey, exercise, ...updated, updatedAt: new Date().toLocaleDateString()
    }], { Prefer: "resolution=merge-duplicates,return=minimal" });
    // Auto-log to history when any value is entered
    if (updated.sets || updated.reps || updated.weight) {
      const today = new Date().toLocaleDateString();
      const entry = { clientId: clientKey, exercise, sets: updated.sets||"", reps: updated.reps||"", weight: updated.weight||"", date: today };
      const histKey = clientKey + ":" + exercise;
      // Only auto-log once per day per exercise (check if today already logged)
      const existing_history = (await sbFetch(`progress_history?clientId=eq.${clientKey}&exercise=eq.${encodeURIComponent(exercise)}&date=eq.${encodeURIComponent(today)}&limit=1`)) || [];
      if (existing_history.length === 0) {
        await sbFetch(`progress_history`, "POST", [entry], { Prefer: "return=representation" }).then(rows => {
          if (rows && rows[0]) {
            setHistoryData(prev => ({ ...prev, [histKey]: [rows[0], ...(prev[histKey]||[])] }));
            setLatestHistory(prev => ({ ...prev, [clientKey]: { ...(prev[clientKey]||{}), [exercise]: rows[0] } }));
          }
        });
      } else {
        // Update existing entry for today
        await sbFetch(`progress_history?clientId=eq.${clientKey}&exercise=eq.${encodeURIComponent(exercise)}&date=eq.${encodeURIComponent(today)}`, "PATCH", { sets: updated.sets||"", reps: updated.reps||"", weight: updated.weight||"" });
        setLatestHistory(prev => ({
          ...prev,
          [clientKey]: { ...(prev[clientKey]||{}), [exercise]: {...(prev[clientKey]||{})[exercise], ...entry} }
        }));
      }
    }
    setSaving(false);
  };

  const logHistory = async (exercise) => {
    const d = (progressData[clientKey] || {})[exercise];
    if (!d || (!d.sets && !d.reps && !d.weight)) return;
    const entry = {
      clientId: clientKey,
      exercise,
      sets: d.sets || "",
      reps: d.reps || "",
      weight: d.weight || "",
      date: new Date().toLocaleDateString()
    };
    const histKey = clientKey + ":" + exercise;
    setHistoryData(prev => ({
      ...prev,
      [histKey]: [...(prev[histKey] || []), entry]
    }));
    await sbFetch(`progress_history`, "POST", [entry], { Prefer: "return=minimal" });
  };

  const loadHistory = async (exercise) => {
    const histKey = clientKey + ":" + exercise;
    if (historyData[histKey]) { setHistoryDrawer({ exercise, clientId: clientKey }); return; }
    const rows = await sbFetch(`progress_history?select=*&clientId=eq.${clientKey}&exercise=eq.${encodeURIComponent(exercise)}&order=id.desc`);
    if (rows && Array.isArray(rows)) {
      setHistoryData(prev => ({ ...prev, [histKey]: rows }));
    }
    setHistoryDrawer({ exercise, clientId: clientKey });
  };

  const handleCellClick = (exercise, field, currentVal) => {
    setEditCell({ exercise, field });
    // Default sets to 3 if empty
    setEditValue(currentVal || (field === "sets" ? "3" : ""));
  };

  const handleCellSave = async () => {
    if (!editCell) return;
    await saveExercise(editCell.exercise, editCell.field, editValue);
    setEditCell(null);
  };

  const handleLogEntry = async (exercise) => {
    const d = (progressData[clientKey] || {})[exercise];
    if (!d || (!d.sets && !d.reps && !d.weight)) return;
    const entry = {
      clientId: clientKey, exercise,
      sets: d.sets || "", reps: d.reps || "", weight: d.weight || "",
      date: new Date().toLocaleDateString()
    };
    await logHistory(exercise);
    // Update latestHistory inline immediately
    setLatestHistory(prev => ({
      ...prev,
      [clientKey]: { ...(prev[clientKey] || {}), [exercise]: entry }
    }));
    // Update expandable history for this exercise
    setHistoryData(prev => {
      const histKey = clientKey + ":" + exercise;
      return { ...prev, [histKey]: [entry, ...(prev[histKey] || [])] };
    });
    // Reset current values after logging
    setProgressData(prev => ({ ...prev, [clientKey]: { ...(prev[clientKey]||{}), [exercise]: { sets:"", reps:"", weight:"", notes:"" } } }));
    await sbFetch(`progress?clientId=eq.${clientKey}&exercise=eq.${encodeURIComponent(exercise)}`, "PATCH", { sets:"", reps:"", weight:"", updatedAt:"" });
  };

  const addCustomExercise = async () => {
    if (!newExerciseName.trim()) return;
    const name = newExerciseName.trim();
    setCustomExercises(prev => {
      const existing = (prev[clientKey]||{})[newExerciseGroup] || [];
      if (existing.includes(name)) return prev; // already exists, skip
      return {
        ...prev,
        [clientKey]: {
          ...(prev[clientKey]||{}),
          [newExerciseGroup]: [...existing, name]
        }
      };
    });
    await sbFetch(`progress_exercises`, "POST", [{
      clientId: clientKey, exercise: name, muscleGroup: newExerciseGroup
    }], { Prefer: "resolution=merge-duplicates,return=minimal" });
    setNewExerciseName("");
    setAddExercise(false);
    setActiveGroup(newExerciseGroup);
  };

  const hasData = (exercise) => {
    if (exercise.startsWith("—")) return false;
    const d = (progressData[clientKey] || {})[exercise];
    return d && (d.sets || d.reps || d.weight);
  };

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">PROGRESS</div>
        <div className="page-subtitle">Track sets, reps and weight per client</div>
      </div>

      {/* Current session banner */}
      {currentSessionClients.length > 0 && (
        <div className="section">
          <div className="section-header">
            <span className="section-title">🟢 Current Session</span>
            <span style={{fontSize:12,color:"var(--muted)"}}>Clients present right now</span>
          </div>
          <div className="section-body">
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {currentSessionClients.map(c => (
                <div key={c.id} onClick={()=>{ 
                  if (!openClients.find(x=>x.id===c.id)) setOpenClients(prev=>[...prev,c]);
                  setActiveClientId(c.id); setSearch("");
                }} style={{
                  padding:"10px 18px",borderRadius:4,cursor:"pointer",fontSize:14,fontWeight:600,
                  border:`2px solid ${activeClientId===c.id?"var(--accent)":"var(--green)"}`,
                  background:activeClientId===c.id?"var(--accent)":"#22c55e15",
                  color:activeClientId===c.id?"var(--black)":"var(--green)",
                  display:"flex",alignItems:"center",gap:8,transition:"all 0.15s"
                }}>
                  <div style={{
                    width:32,height:32,borderRadius:"50%",flexShrink:0,
                    background:selectedClient?.id===c.id?"rgba(0,0,0,0.2)":"var(--green)",
                    color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:11,fontWeight:700
                  }}>{c.name.split(" ").map(x=>x[0]).join("")}</div>
                  {c.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Client search bar */}
      <div className="section">
        <div className="section-header"><span className="section-title">Select Clients</span></div>
        <div className="section-body">
          <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-start"}}>
          {/* Date + Time session picker */}
          <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
            <input
              type="date"
              value={sessionDate}
              onChange={e=>{ setSessionDate(e.target.value); setSessionTime(""); }}
              style={{padding:"10px 12px",background:"var(--charcoal)",border:"2px solid var(--border)",borderRadius:4,color:"var(--text)",fontSize:13,outline:"none"}}
            />
            {/* Only show times that have sessions on the selected day */}
            {sessionDate && (() => {
              const dayTimes = sessions
                .filter(s => s.date === sessionDate && s.clientIds.length > 0)
                .map(s => s.time)
                .sort((a,b) => {
                  const toMin = t => { const [tp,ap] = t.split(" "); let [h,m] = tp.split(":").map(Number); if(ap==="PM"&&h!==12)h+=12; if(ap==="AM"&&h===12)h=0; return h*60+m; };
                  return toMin(a)-toMin(b);
                });
              if (dayTimes.length === 0) return <span style={{fontSize:12,color:"var(--muted)",padding:"0 8px"}}>No sessions this day</span>;
              return (
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {dayTimes.map(t => (
                    <div key={t} onClick={()=>{
                      setSessionTime(t);
                      const session = sessions.find(s => s.date===sessionDate && s.time===t);
                      if (!session || session.clientIds.length===0) return;
                      const sessionClients = clients.filter(c=>session.clientIds.includes(c.id));
                      setOpenClients(sessionClients);
                      setActiveClientId(sessionClients[0]?.id||null);
                    }} style={{
                      padding:"8px 14px",borderRadius:4,cursor:"pointer",fontSize:13,fontWeight:600,
                      border:`2px solid ${sessionTime===t?"var(--accent)":"var(--border)"}`,
                      background:sessionTime===t?"var(--accent)":"var(--charcoal)",
                      color:sessionTime===t?"var(--black)":"var(--text)",
                      transition:"all 0.15s",userSelect:"none"
                    }}>{t}</div>
                  ))}
                </div>
              );
            })()}
          </div>
          <div style={{position:"relative",flex:1,minWidth:200}}>
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
                    <div key={c.id} onMouseDown={()=>{ 
                      if (!openClients.find(x=>x.id===c.id)) setOpenClients(prev=>[...prev,c]);
                      setActiveClientId(c.id); setSearch(""); setShowDropdown(false);
                    }} style={{
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
          </div>
          {openClients.length > 0 && (
            <div style={{marginTop:12,fontSize:13,color:"var(--muted)"}}>
              Open: {openClients.map(c=><span key={c.id} style={{color:"var(--accent)",fontWeight:600,marginRight:8}}>{c.name.split(" ")[0]}</span>)}
            </div>
          )}
        </div>
      </div>

      {openClients.length > 0 && (
        <div className="section">
          {/* Client tabs */}
          <div style={{display:"flex",flexWrap:"wrap",gap:0,borderBottom:"1px solid var(--border)",paddingLeft:8,paddingTop:8}}>
            {openClients.map(c => (
              <div key={c.id} style={{display:"flex",alignItems:"center",gap:0}}>
                <div onClick={()=>setActiveClientId(c.id)} style={{
                  padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:600,
                  borderRadius:"4px 4px 0 0",
                  background:activeClientId===c.id?"var(--accent)":"var(--charcoal)",
                  color:activeClientId===c.id?"var(--black)":"var(--muted)",
                  borderBottom:activeClientId===c.id?"2px solid var(--accent)":"1px solid var(--border)",
                  transition:"all 0.15s",userSelect:"none"
                }}>
                  {c.name.split(" ")[0]}
                </div>
                <div onClick={()=>{
                  const remaining = openClients.filter(x=>x.id!==c.id);
                  setOpenClients(remaining);
                  if (activeClientId===c.id) setActiveClientId(remaining[0]?.id||null);
                }} style={{
                  padding:"4px 6px",cursor:"pointer",fontSize:12,color:"var(--muted)",
                  marginLeft:-2,marginRight:4
                }}>✕</div>
              </div>
            ))}
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,paddingRight:12,paddingBottom:4}}>
              {saving && <span style={{fontSize:11,color:"var(--muted)"}}>Saving...</span>}

              {selectedClient && <button className="btn-secondary" style={{padding:"4px 12px",fontSize:12}} onClick={()=>setAddExercise(true)}>+ Add Exercise</button>}
            </div>
          </div>
          <div className="section-body" style={{padding:0}}>

            {/* Session Queue + Done Today */}
            {(queuedExercises.length > 0 || doneToday.length > 0) && (
              <div style={{borderBottom:"1px solid var(--border)"}}>

                {/* Session Queue */}
                <div
                  style={{padding:"14px 20px",background:"#22c55e12",borderBottom:"1px solid #22c55e30"}}
                  onDragOver={e=>{e.preventDefault();}}
                  onDrop={e=>{
                    e.preventDefault();
                    if (draggedExercise && doneToday.includes(draggedExercise)) {
                      const newDone = doneToday.filter(x=>x!==draggedExercise);
                      const newQueue = [...queuedExercises, draggedExercise];
                      setDoneToday(()=>newDone);
                      setQueuedExercises(()=>newQueue);
                      setDraggedExercise(null);
                      saveQueue(clientKey, newQueue, newDone);
                    }
                  }}
                >
                  <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:3,color:"var(--green)",marginBottom:10,fontWeight:700}}>
                    Session Queue — {queuedExercises.length} exercise{queuedExercises.length!==1?"s":""}
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8,minHeight:36}}>
                    {[...queuedExercises].sort().map(ex => (
                      <div
                        key={ex}
                        draggable
                        onDragStart={()=>setDraggedExercise(ex)}
                        onDragEnd={()=>setDraggedExercise(null)}
                        style={{
                          display:"flex",alignItems:"center",gap:8,
                          padding:"7px 14px",borderRadius:20,
                          background:"var(--green)",color:"var(--black)",
                          fontSize:14,fontWeight:700,cursor:"grab",
                          opacity:draggedExercise===ex?0.5:1
                        }}
                      >
                        {ex}
                        <span
                          onClick={()=>{const q=queuedExercises.filter(e=>e!==ex);setQueuedExercises(()=>q);saveQueue(clientKey,q,doneToday);}}
                          style={{cursor:"pointer",fontSize:11,opacity:0.7,fontWeight:900}}
                        >✕</span>
                      </div>
                    ))}
                    {queuedExercises.length === 0 && (
                      <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",lineHeight:"36px"}}>Drag exercises here to requeue</div>
                    )}
                  </div>
                </div>

                {/* Done Today */}
                <div
                  style={{padding:"14px 20px",background:"#3ec9c908"}}
                  onDragOver={e=>{e.preventDefault();}}
                  onDrop={e=>{
                    e.preventDefault();
                    if (draggedExercise && queuedExercises.includes(draggedExercise)) {
                      const newQueue = queuedExercises.filter(x=>x!==draggedExercise);
                      const newDone = [...doneToday, draggedExercise];
                      setQueuedExercises(()=>newQueue);
                      setDoneToday(()=>newDone);
                      setDraggedExercise(null);
                      saveQueue(clientKey, newQueue, newDone);
                    }
                  }}
                >
                  <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:3,color:"var(--accent)",marginBottom:10,fontWeight:700}}>
                    Done Today — {doneToday.length} exercise{doneToday.length!==1?"s":""}
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8,minHeight:36}}>
                    {[...doneToday].sort().map(ex => (
                      <div
                        key={ex}
                        draggable
                        onDragStart={()=>setDraggedExercise(ex)}
                        onDragEnd={()=>setDraggedExercise(null)}
                        style={{
                          display:"flex",alignItems:"center",gap:8,
                          padding:"7px 14px",borderRadius:20,
                          background:"var(--accent)",color:"var(--black)",
                          fontSize:14,fontWeight:700,cursor:"grab",
                          opacity:draggedExercise===ex?0.5:1,
                          textDecoration:"line-through"
                        }}
                      >
                        {ex}
                        <span
                          onClick={()=>{const d=doneToday.filter(e=>e!==ex);setDoneToday(()=>d);saveQueue(clientKey,queuedExercises,d);}}
                          style={{cursor:"pointer",fontSize:11,opacity:0.7,fontWeight:900,textDecoration:"none"}}
                        >✕</span>
                      </div>
                    ))}
                    {doneToday.length === 0 && (
                      <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",lineHeight:"36px"}}>Drag exercises here when done</div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* Next Exercise Banner - inline at top */}
            {currentExerciseIdx !== null && currentWeekPlan.length > 0 && (() => {
              const exercise = currentWeekPlan[currentExerciseIdx];
              return (
                <div style={{
                  background:"var(--charcoal)",
                  borderBottom:"2px solid var(--accent)",
                  padding:"16px 28px",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-between",
                  gap:20
                }}>
                  <div>
                    <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:3,color:"var(--muted)",marginBottom:4}}>
                      Next Exercise — {currentExerciseIdx + 1} of {currentWeekPlan.length}
                    </div>
                    <div className="bebas" style={{fontSize:42,color:"var(--accent)",letterSpacing:3,lineHeight:1}}>
                      {exercise}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    {currentExerciseIdx > 0 && (
                      <div onClick={()=>setCurrentExerciseIdx(i=>i-1)}
                        style={{padding:"8px 16px",borderRadius:4,cursor:"pointer",background:"var(--panel)",border:"1px solid var(--border)",color:"var(--text)",fontSize:13}}>
                        &larr; Prev
                      </div>
                    )}
                    {currentExerciseIdx < currentWeekPlan.length - 1 ? (
                      <div onClick={()=>setCurrentExerciseIdx(i=>i+1)}
                        style={{padding:"8px 20px",borderRadius:4,cursor:"pointer",background:"var(--accent)",color:"var(--black)",fontSize:13,fontWeight:700}}>
                        Next &rarr;
                      </div>
                    ) : (
                      <div onClick={()=>setCurrentExerciseIdx(null)}
                        style={{padding:"8px 20px",borderRadius:4,cursor:"pointer",background:"var(--green)",color:"var(--black)",fontSize:13,fontWeight:700}}>
                        Done ✓
                      </div>
                    )}
                    <div onClick={()=>setCurrentExerciseIdx(null)}
                      style={{padding:"8px 12px",borderRadius:4,cursor:"pointer",border:"1px solid var(--border)",color:"var(--muted)",fontSize:13}}>
                      ✕
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Muscle group anchor nav */}
            <div style={{display:"flex",flexWrap:"wrap",gap:0,borderBottom:"1px solid var(--border)",position:"sticky",top:0,background:"var(--panel)",zIndex:10}}>
              {Object.keys(library || ALL_EXERCISES_DEFAULT).map(group => {
                const exercises = allExercisesForGroup(group);
                const filled = exercises.filter(e => !e.startsWith("—") && hasData(e)).length;
                return (
                  <div key={group} onClick={()=>{ const el = document.getElementById("pg-group-"+group); if(el) el.scrollIntoView({behavior:"smooth",block:"start"}); setActiveGroup(group); }} style={{
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

            {/* Active muscle group only */}
            <div style={{padding:"0 20px 40px"}}>
              <table className="table" style={{marginBottom:0}}>
                <thead>
                  <tr>
                    <th style={{width:"40%"}}>Exercise</th>
                    <th style={{textAlign:"center"}}>Sets</th>
                    <th style={{textAlign:"center"}}>Reps</th>
                    <th style={{textAlign:"center"}}>Weight (lbs)</th>
                    <th style={{textAlign:"center"}}>History</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const allEx = allExercisesForGroup(activeGroup);
                    const weekOnes = allEx.filter(e => !e.startsWith("—") && currentWeekPlan.includes(e)).sort((a,b)=>a.localeCompare(b));
                    const rest = allEx.filter(e => e.startsWith("—") || !currentWeekPlan.includes(e)).sort((a,b)=>{
                      if (a.startsWith("—") && b.startsWith("—")) return 0;
                      if (a.startsWith("—")) return 1;
                      if (b.startsWith("—")) return -1;
                      return a.localeCompare(b);
                    });
                    const sorted = weekOnes.length > 0 ? [...weekOnes, ...rest] : rest;
                    return sorted.map(exercise => {
                      if (exercise.startsWith("—")) return (
                        <tr key={exercise}>
                          <td colSpan={5} style={{
                            padding:"10px 12px 4px",fontSize:11,fontWeight:700,
                            color:"var(--accent)",letterSpacing:2,
                            borderTop:"1px solid var(--border)",background:"transparent"
                          }}>{exercise.replace(/—/g,"").trim()}</td>
                        </tr>
                      );
                      const d = clientProgressData[exercise] || {};
                      const isWeekExercise = currentWeekPlan.includes(exercise);
                      const checked = isChecked(exercise);
                      return (
                        <tr key={exercise} style={{
                          background:checked?"#22c55e12":isWeekExercise?"#3ec9c918":hasData(exercise)?"#3ec9c908":"transparent",
                          borderLeft:checked?"3px solid var(--green)":isWeekExercise?"3px solid var(--accent)":"3px solid transparent"
                        }}>
                          <td style={{fontWeight:isWeekExercise||hasData(exercise)?600:400}}>
                            <div style={{display:"flex",alignItems:"center",gap:10}}>
                              <div onClick={()=>{
                                const newQ = queuedExercises.includes(exercise)
                                  ? queuedExercises.filter(e=>e!==exercise)
                                  : [...queuedExercises, exercise];
                                setQueuedExercises(()=>newQ);
                                saveQueue(clientKey, newQ, doneToday);
                              }} style={{
                                width:16,height:16,borderRadius:3,flexShrink:0,cursor:"pointer",
                                border:`2px solid ${queuedExercises.includes(exercise)?"var(--green)":doneToday.includes(exercise)?"var(--accent)":isWeekExercise?"var(--accent)":"var(--border)"}`,
                                background:queuedExercises.includes(exercise)?"var(--green)":doneToday.includes(exercise)?"var(--accent)":"transparent",
                                display:"flex",alignItems:"center",justifyContent:"center",
                                fontSize:10,color:"var(--black)",fontWeight:900,transition:"all 0.15s"
                              }}>{queuedExercises.includes(exercise)?"★":doneToday.includes(exercise)?"✓":""}</div>

                              <span style={{
                                color:checked?"var(--green)":isWeekExercise?"var(--accent)":hasData(exercise)?"var(--text)":"var(--muted)",
                                textDecoration:checked?"line-through":"none"
                              }}>{exercise}</span>
                            </div>
                          </td>
                          {["sets","reps","weight"].map(field => (
                            <td key={field} style={{textAlign:"center"}}>
                              {editCell?.exercise===exercise && editCell?.field===field ? (
                                <input
                                  type="text"
                                  value={editValue}
                                  autoFocus
                                  onChange={e=>setEditValue(e.target.value)}
                                  onBlur={handleCellSave}
                                  onKeyDown={e=>{ if(e.key==="Enter") handleCellSave(); if(e.key==="Escape") setEditCell(null); }}
                                  placeholder={editCell?.field==="sets"?"3":editCell?.field==="reps"?"8-10-12":"lbs"}
                                  style={{
                                    width:90,textAlign:"center",background:"var(--charcoal)",
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
                          <td style={{textAlign:"center"}}>
                            <div style={{display:"flex",gap:4,justifyContent:"center",alignItems:"center"}}>
                              {hasData(exercise) && (
                                <div
                                  onClick={()=>handleLogEntry(exercise)}
                                  title="Save as new entry"
                                  style={{
                                    padding:"3px 8px",borderRadius:3,cursor:"pointer",fontSize:11,fontWeight:700,
                                    background:"var(--green)",color:"var(--black)"
                                  }}>✓ Log</div>
                              )}
                              {(() => {
                                const latest = (latestHistory[clientKey] || {})[exercise];
                                const histKey = clientKey + ":" + exercise;
                                const isExpanded = expandedHistory[histKey];
                                const allEntries = historyData[histKey] || [];
                                return (
                                  <div style={{fontSize:10,color:"var(--muted)",lineHeight:1.4,textAlign:"right"}}>
                                    {latest ? (
                                      <div
                                        onClick={async()=>{
                                          if (!isExpanded && allEntries.length === 0) {
                                            const rows = await sbFetch(`progress_history?select=*&clientId=eq.${clientKey}&exercise=eq.${encodeURIComponent(exercise)}&order=id.desc`);
                                            if (rows && Array.isArray(rows)) {
                                              setHistoryData(prev => ({...prev, [histKey]: rows}));
                                            }
                                          }
                                          setExpandedHistory(prev => ({...prev, [histKey]: !prev[histKey]}));
                                        }}
                                        style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4}}
                                      >
                                        <span style={{color:"var(--accent)",fontWeight:600}}>{latest.date}</span>
                                        <span style={{fontSize:9,color:"var(--muted)"}}>{isExpanded ? "▲" : "▼"}</span>
                                      </div>
                                    ) : null}
                                    {latest && <div style={{color:"var(--muted)"}}>{[latest.sets && latest.sets+"s", latest.reps && latest.reps+"r", latest.weight && latest.weight].filter(Boolean).join(" · ")}</div>}
                                    {isExpanded && (
                                      <div style={{marginTop:6,borderTop:"1px solid var(--border)",paddingTop:6,maxHeight:160,overflowY:"auto",minWidth:140}}>
                                        {allEntries.map((e,i) => (
                                          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6,padding:"3px 0",borderBottom:"1px solid #ffffff08"}}>
                                            <div>
                                              <span style={{color:"var(--accent)",fontWeight:600,marginRight:4}}>{e.date}</span>
                                              <span style={{color:"var(--muted)"}}>{[e.sets && e.sets+"s", e.reps && e.reps+"r", e.weight && e.weight].filter(Boolean).join(" · ")}</span>
                                            </div>
                                            <div
                                              onClick={async(ev)=>{
                                                ev.stopPropagation();
                                                await sbFetch(`progress_history?id=eq.${e.id}`,"DELETE");
                                                setHistoryData(prev => ({
                                                  ...prev,
                                                  [histKey]: (prev[histKey]||[]).filter(r=>r.id!==e.id)
                                                }));
                                                if (i===0) {
                                                  const remaining = allEntries.filter(r=>r.id!==e.id);
                                                  setLatestHistory(prev => ({
                                                    ...prev,
                                                    [clientKey]: remaining.length > 0
                                                      ? {...(prev[clientKey]||{}), [exercise]: remaining[0]}
                                                      : (() => { const u={...(prev[clientKey]||{})}; delete u[exercise]; return u; })()
                                                  }));
                                                }
                                              }}
                                              style={{cursor:"pointer",color:"var(--muted)",fontSize:9,padding:"1px 3px",borderRadius:2,flexShrink:0}}
                                            >✕</div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* History Drawer — full-screen panel */}


      {historyDrawer && (() => {
        const histKey = historyDrawer.clientId + ":" + historyDrawer.exercise;
        const entries = (historyData[histKey] || []).slice().reverse(); // oldest first for chart
        const latest = entries.length > 0 ? entries[entries.length - 1] : null;
        const chartData = entries.filter(e => e.weight && !isNaN(parseFloat(e.weight))).map(e => ({
          date: e.date ? e.date.slice(5) : "",
          weight: parseFloat(e.weight),
          sets: e.sets,
          reps: e.reps
        }));
        const maxWeight = chartData.length > 0 ? Math.max(...chartData.map(d=>d.weight)) : 0;
        const minWeight = chartData.length > 0 ? Math.min(...chartData.map(d=>d.weight)) : 0;
        const clientName = openClients.find(c=>c.id===historyDrawer.clientId)?.name || "";
        return (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}
            onClick={e=>e.target===e.currentTarget&&setHistoryDrawer(null)}>
            <div style={{
              background:"var(--panel)",borderRadius:8,width:"100%",maxWidth:860,maxHeight:"90vh",
              display:"flex",flexDirection:"column",overflow:"hidden",
              border:"1px solid var(--border)",boxShadow:"0 24px 80px rgba(0,0,0,0.6)"
            }}>
              {/* Header */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 28px",borderBottom:"1px solid var(--border)",flexShrink:0}}>
                <div>
                  <div className="bebas" style={{fontSize:26,color:"var(--text)",letterSpacing:1}}>{historyDrawer.exercise}</div>
                  <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{clientName} · {entries.length} session{entries.length!==1?"s":""} logged</div>
                </div>
                {latest && (
                  <div style={{display:"flex",gap:20,marginRight:40}}>
                    {[["Last Sets",latest.sets],["Last Reps",latest.reps],["Last Weight",latest.weight?(latest.weight+" lbs"):null]].map(([label,val])=>val?(
                      <div key={label} style={{textAlign:"center"}}>
                        <div style={{fontSize:22,fontWeight:700,color:"var(--accent)"}}>{val}</div>
                        <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1}}>{label}</div>
                      </div>
                    ):null)}
                  </div>
                )}
                <button className="modal-close" style={{fontSize:22}} onClick={()=>setHistoryDrawer(null)}>✕</button>
              </div>

              <div style={{overflowY:"auto",flex:1,padding:"24px 28px"}}>
                {entries.length === 0 ? (
                  <div style={{textAlign:"center",color:"var(--muted)",padding:"60px 0"}}>
                    <div style={{fontSize:48,marginBottom:12}}>📋</div>
                    <div style={{fontSize:16,fontWeight:600,marginBottom:6}}>No history yet</div>
                    <div style={{fontSize:13}}>Fill in sets / reps / weight and click ✓ Log to save an entry.</div>
                  </div>
                ) : (
                  <>
                    {/* Weight chart */}
                    {chartData.length > 1 && (
                      <div style={{marginBottom:28}}>
                        <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:12}}>Weight Progress</div>
                        <div style={{height:160,position:"relative",background:"var(--charcoal)",borderRadius:6,padding:"16px 16px 32px",border:"1px solid var(--border)"}}>
                          <svg width="100%" height="100%" viewBox={`0 0 ${chartData.length*2} 100`} preserveAspectRatio="none" style={{overflow:"visible"}}>
                            <defs>
                              <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3ec9c9" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#3ec9c9" stopOpacity="0"/>
                              </linearGradient>
                            </defs>
                            {chartData.length > 1 && (() => {
                              const range = maxWeight - minWeight || 1;
                              const pts = chartData.map((d,i) => {
                                const x = (i/(chartData.length-1))*100;
                                const y = 90 - ((d.weight - minWeight)/range)*80;
                                return `${x},${y}`;
                              });
                              const areaPath = `M${pts[0]} ` + pts.slice(1).map(p=>`L${p}`).join(" ") + ` L100,100 L0,100 Z`;
                              const linePath = `M${pts[0]} ` + pts.slice(1).map(p=>`L${p}`).join(" ");
                              return (
                                <>
                                  <path d={areaPath} fill="url(#wGrad)" />
                                  <path d={linePath} fill="none" stroke="#3ec9c9" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                                  {chartData.map((d,i) => {
                                    const [x,y] = pts[i].split(",");
                                    return <circle key={i} cx={x} cy={y} r="3" fill="#3ec9c9" vectorEffect="non-scaling-stroke" />;
                                  })}
                                </>
                              );
                            })()}
                          </svg>
                          {/* X axis labels */}
                          <div style={{position:"absolute",bottom:6,left:16,right:16,display:"flex",justifyContent:"space-between"}}>
                            {chartData.filter((_,i)=>i===0||i===chartData.length-1||(chartData.length>4&&i===Math.floor(chartData.length/2))).map((d,i)=>(
                              <div key={i} style={{fontSize:10,color:"var(--muted)"}}>{d.date}</div>
                            ))}
                          </div>
                          {/* Y axis labels */}
                          <div style={{position:"absolute",top:16,left:4,fontSize:9,color:"var(--muted)"}}>{maxWeight}lbs</div>
                          <div style={{position:"absolute",bottom:32,left:4,fontSize:9,color:"var(--muted)"}}>{minWeight}lbs</div>
                        </div>
                      </div>
                    )}

                    {/* History table */}
                    <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:12}}>Session Log</div>
                    <table style={{width:"100%",borderCollapse:"collapse"}}>
                      <thead>
                        <tr style={{borderBottom:"1px solid var(--border)"}}>
                          {["Date","Sets","Reps","Weight",""].map(h=>(
                            <th key={h} style={{padding:"8px 16px",textAlign:"center",fontSize:11,fontWeight:700,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase"}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[...entries].reverse().map((e,i)=>(
                          <tr key={i} style={{borderBottom:"1px solid var(--border)",background:i===0?"#3ec9c910":"transparent",transition:"background 0.1s"}}>
                            <td style={{padding:"12px 16px",fontSize:13,color:"var(--muted)",textAlign:"center"}}>{e.date||"—"}</td>
                            <td style={{padding:"12px 16px",fontSize:15,fontWeight:700,textAlign:"center",color:"var(--text)"}}>{e.sets||"—"}</td>
                            <td style={{padding:"12px 16px",fontSize:15,fontWeight:700,textAlign:"center",color:"var(--accent)"}}>{e.reps||"—"}</td>
                            <td style={{padding:"12px 16px",fontSize:15,fontWeight:700,textAlign:"center",color:"var(--text)"}}>{e.weight?e.weight+" lbs":"—"}</td>
                            <td style={{padding:"12px 8px",textAlign:"center"}}>
                              <div onClick={async()=>{
                                if (!window.confirm("Delete this entry?")) return;
                                const histKey = historyDrawer.clientId + ":" + historyDrawer.exercise;
                                // Remove from local state (match by index in reversed array)
                                const allEntries = historyData[histKey] || [];
                                const reversedIdx = allEntries.length - 1 - ([...entries].reverse().indexOf(e));
                                // If entry has an id, delete from Supabase
                                if (e.id) {
                                  await sbFetch(`progress_history?id=eq.${e.id}`, "DELETE");
                                }
                                setHistoryData(prev => ({
                                  ...prev,
                                  [histKey]: prev[histKey].filter((_,idx) => idx !== reversedIdx)
                                }));
                              }} style={{
                                display:"inline-flex",alignItems:"center",justifyContent:"center",
                                width:24,height:24,borderRadius:4,cursor:"pointer",
                                color:"var(--muted)",fontSize:14,fontWeight:700,
                                border:"1px solid transparent",transition:"all 0.15s"
                              }}
                              onMouseEnter={e=>{ e.currentTarget.style.color="var(--red)"; e.currentTarget.style.borderColor="var(--red)"; e.currentTarget.style.background="#ef444415"; }}
                              onMouseLeave={e=>{ e.currentTarget.style.color="var(--muted)"; e.currentTarget.style.borderColor="transparent"; e.currentTarget.style.background="transparent"; }}
                              >✕</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}

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
                  {Object.keys(library || ALL_EXERCISES_DEFAULT).map(g => <option key={g} value={g}>{g}</option>)}
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

// ─── Trainer Exercises ────────────────────────────────────────────────────────

const NUM_WEEKS = 6;
const WEEK_LABELS = ["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6"];

function TrainerExercises({ weekPlans, setWeekPlans, currentWeekIdx, setCurrentWeekIdx, autoWeekIdx, library, setLibrary }) {
  const [activeTab, setActiveTab] = useState("library"); // "library" | "week-0".."week-5"
  const [loading, setLoading] = useState(true);
  const [searchLib, setSearchLib] = useState("");
  const [activeGroup, setActiveGroup] = useState("Chest");
  const [newExName, setNewExName] = useState("");
  const [newExGroup, setNewExGroup] = useState("Chest");
  const [newExSubGroup, setNewExSubGroup] = useState("");
  const [exSaveStatus, setExSaveStatus] = useState(null); // null | "saving" | "saved" | "error"
  const [weekOffset, setWeekOffset] = useState(0); // which 6-week cycle we're in
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    sbFetch("exercise_library?select=*").then(async rows => {
      // Always start with full defaults so the list is never empty
      const lib = {};
      Object.entries(ALL_EXERCISES_DEFAULT).forEach(([group, exs]) => {
        lib[group] = [...exs];
      });

      // If DB has rows, append any custom exercises not already in defaults
      if (rows && rows.length > 0) {
        rows.forEach(r => {
          if (!lib[r.group]) lib[r.group] = [];
          const alreadyIn = lib[r.group].includes(r.exercise);
          if (!alreadyIn) lib[r.group].push(r.exercise);
        });
      }

      setLibrary(lib);
    });
    sbFetch("exercise_week_plans?select=*&order=weekIdx.asc,position.asc").then(rows => {
      if (rows && rows.length > 0) {
        const plans = Array.from({length:NUM_WEEKS}, ()=>[]);
        rows.forEach(r => { if (plans[r.weekIdx]) plans[r.weekIdx].push(r.exercise); });
        setWeekPlans(plans);
      }
      setLoading(false);
    }).catch(()=>setLoading(false));
  }, []);

  const saveWeekPlan = async (weekIdx, newPlan) => {
    const updated = weekPlans.map((p,i)=>i===weekIdx?newPlan:p);
    setWeekPlans(updated);
    // Delete and reinsert
    await sbFetch(`exercise_week_plans?weekIdx=eq.${weekIdx}`, "DELETE");
    if (newPlan.length > 0) {
      const rows = newPlan.map((exercise,position)=>({ weekIdx, exercise, position }));
      await sbFetch("exercise_week_plans", "POST", rows, { Prefer: "return=minimal" });
    }
  };

  const addToWeek = async (weekIdx, exercise) => {
    if (weekPlans[weekIdx].includes(exercise)) return;
    await saveWeekPlan(weekIdx, [...weekPlans[weekIdx], exercise]);
  };

  const removeFromWeek = async (weekIdx, exercise) => {
    await saveWeekPlan(weekIdx, weekPlans[weekIdx].filter(e=>e!==exercise));
  };

  const [editingExercise, setEditingExercise] = useState(null);

  const renameExercise = async (group, oldName, newName) => {
    newName = newName.trim();
    if (!newName || newName === oldName) { setEditingExercise(null); return; }
    const updated = { ...library, [group]: library[group].map(e => e === oldName ? newName : e) };
    setLibrary(updated);
    const updatedPlans = weekPlans.map(plan => plan.map(e => e === oldName ? newName : e));
    setWeekPlans(updatedPlans);
    setEditingExercise(null);
    await sbFetch(`exercise_library?group=eq.${encodeURIComponent(group)}&exercise=eq.${encodeURIComponent(oldName)}`, "PATCH", { exercise: newName });
    await sbFetch(`exercise_week_plans?exercise=eq.${encodeURIComponent(oldName)}`, "PATCH", { exercise: newName });
    await sbFetch(`progress?exercise=eq.${encodeURIComponent(oldName)}`, "PATCH", { exercise: newName });
    await sbFetch(`progress_history?exercise=eq.${encodeURIComponent(oldName)}`, "PATCH", { exercise: newName });
  };

  const removeExercise = async (group, exercise) => {
    if (!window.confirm(`Remove "${exercise}" from the library? This will also remove it from all week plans.`)) return;
    const updated = { ...library, [group]: library[group].filter(e => e !== exercise) };
    setLibrary(updated);
    const updatedPlans = weekPlans.map(plan => plan.filter(e => e !== exercise));
    setWeekPlans(updatedPlans);
    // Rewrite full group so positions stay correct
    await sbFetch(`exercise_library?group=eq.${encodeURIComponent(group)}`, "DELETE");
    const rows = updated[group].map((ex) => ({ group, exercise: ex }));
    if (rows.length > 0) await sbFetch("exercise_library", "POST", rows, { Prefer: "return=minimal" });
    await sbFetch(`exercise_week_plans?exercise=eq.${encodeURIComponent(exercise)}`, "DELETE");
  };

  const addToLibrary = async () => {
    if (!newExName.trim()) return;
    const name = newExName.trim();
    const groupExs = [...(library[newExGroup] || [])];
    let insertIdx = groupExs.length;
    if (newExSubGroup) {
      const headerIdx = groupExs.indexOf(newExSubGroup);
      if (headerIdx !== -1) {
        let endIdx = groupExs.findIndex((e, i) => i > headerIdx && e.startsWith("—"));
        insertIdx = endIdx === -1 ? groupExs.length : endIdx;
      }
    }
    groupExs.splice(insertIdx, 0, name);
    const updated = { ...library, [newExGroup]: groupExs };
    setLibrary(updated);
    setNewExName("");
    setExSaveStatus("saving");

    const rows = groupExs.map((exercise) => ({ group: newExGroup, exercise }));
    console.log("[Library] Saving", rows.length, "rows for group", newExGroup);

    // Try upsert first (safe — never deletes)
    let result = await sbFetch("exercise_library", "POST", rows, {
      Prefer: "resolution=merge-duplicates,return=minimal",
      "on_conflict": "group,exercise"
    });

    if (result === null) {
      console.warn("[Library] Upsert failed, trying delete+reinsert");
      await sbFetch(`exercise_library?group=eq.${encodeURIComponent(newExGroup)}`, "DELETE");
      result = await sbFetch("exercise_library", "POST", rows, { Prefer: "return=minimal" });
    }

    if (result === null) {
      console.error("[Library] Save failed completely for", newExGroup);
      setExSaveStatus("error");
      setTimeout(() => setExSaveStatus(null), 4000);
    } else {
      console.log("[Library] Saved successfully");
      setExSaveStatus("saved");
      setTimeout(() => setExSaveStatus(null), 2500);
    }
  };

  const allExercises = Object.entries(library).flatMap(([group, exs]) => exs.filter(e=>!e.startsWith("—")).map(e => ({ exercise: e, group })));

  const reorderExercise = async (group) => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) { dragItem.current = null; dragOverItem.current = null; return; }
    const groupExercises = [...(library[group] || [])];
    const fromIdx = dragItem.current;
    const toIdx = dragOverItem.current;
    const moved = groupExercises.splice(fromIdx, 1)[0];
    groupExercises.splice(toIdx, 0, moved);
    dragItem.current = null;
    dragOverItem.current = null;
    const newLib = { ...library, [group]: groupExercises };
    setLibrary(newLib);
    // Persist new order — delete and re-insert
    await sbFetch(`exercise_library?group=eq.${encodeURIComponent(group)}`, "DELETE");
    const rows = groupExercises.filter(e => !e.startsWith("—")).map((exercise) => ({ group, exercise }));
    if (rows.length > 0) await sbFetch("exercise_library", "POST", rows, { Prefer: "return=minimal" });
  };

  const filteredLib = searchLib
    ? allExercises.filter(x => !x.exercise.startsWith("—") && x.exercise.toLowerCase().includes(searchLib.toLowerCase()))
    : (library[activeGroup]||[]).map(e => ({ exercise: e, group: activeGroup }));

  const activeWeekIdx = activeTab.startsWith("week-") ? parseInt(activeTab.split("-")[1]) : null;
  const currentPlan = activeWeekIdx !== null ? weekPlans[activeWeekIdx] : [];
  const isCurrentWeek = activeWeekIdx === currentWeekIdx;

  if (loading) return <div style={{padding:40,color:"var(--muted)",textAlign:"center"}}>Loading...</div>;

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">EXERCISES</div>
        <div className="page-subtitle">Exercise library and 6-week rotation plans</div>
      </div>

      {/* Tab bar */}
      <div style={{display:"flex",gap:4,padding:"0 24px",borderBottom:"1px solid var(--border)",flexWrap:"wrap"}}>
        {[{id:"library",label:"📚 Library"}, ...WEEK_LABELS.map((l,i)=>({id:`week-${i}`,label:l}))].map(t => {
          const isActive = activeTab === t.id;
          const isWeekTab = t.id.startsWith("week-");
          const wIdx = isWeekTab ? parseInt(t.id.split("-")[1]) : -1;
          const isCurrent = wIdx === currentWeekIdx;
          return (
            <div key={t.id} onClick={()=>setActiveTab(t.id)} style={{
              padding:"10px 18px",cursor:"pointer",fontSize:13,fontWeight:600,
              borderBottom:isActive?"3px solid var(--accent)":"3px solid transparent",
              color:isActive?"var(--accent)":isCurrent?"var(--green)":"var(--muted)",
              position:"relative",userSelect:"none",transition:"color 0.15s",
              background:"transparent"
            }}>
              {t.label}
              {isCurrent && <span style={{position:"absolute",top:6,right:6,width:6,height:6,borderRadius:"50%",background:"var(--green)"}}/>}
            </div>
          );
        })}
      </div>

      {/* LIBRARY TAB */}
      {activeTab === "library" && (
        <div style={{display:"flex",height:"calc(100vh - 200px)",overflow:"hidden"}}>
          {/* Left: muscle group nav */}
          {!searchLib && (
            <div style={{width:140,borderRight:"1px solid var(--border)",overflowY:"auto",flexShrink:0}}>
              {Object.keys(library).map(g => (
                <div key={g} onClick={()=>setActiveGroup(g)} style={{
                  padding:"12px 16px",cursor:"pointer",fontSize:13,fontWeight:activeGroup===g?700:400,
                  borderLeft:activeGroup===g?"3px solid var(--accent)":"3px solid transparent",
                  color:activeGroup===g?"var(--accent)":"var(--muted)",
                  background:activeGroup===g?"var(--charcoal)":"transparent"
                }}>{g}</div>
              ))}
            </div>
          )}
          {/* Right: exercise list */}
          <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>
            {/* Search + Add */}
            <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
              <input
                value={searchLib}
                onChange={e=>setSearchLib(e.target.value)}
                placeholder="Search exercises..."
                style={{flex:1,minWidth:160,padding:"8px 12px",fontSize:13,background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,color:"var(--text)",outline:"none"}}
              />
              <input value={newExName} onChange={e=>setNewExName(e.target.value)} placeholder="New exercise name..."
                style={{flex:1,minWidth:140,padding:"8px 12px",fontSize:13,background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,color:"var(--text)",outline:"none"}}
              />
              <select value={newExGroup} onChange={e=>{ setNewExGroup(e.target.value); setNewExSubGroup(""); }}
                style={{padding:"8px 10px",fontSize:13,background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,color:"var(--text)"}}>
                {Object.keys(library).map(g=><option key={g}>{g}</option>)}
              </select>
              {/* Subdivision dropdown — only shown if group has headers */}
              {(library[newExGroup]||[]).some(e=>e.startsWith("—")) && (
                <select value={newExSubGroup} onChange={e=>setNewExSubGroup(e.target.value)}
                  style={{padding:"8px 10px",fontSize:13,background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,color:"var(--text)"}}>
                  <option value="">— End of group —</option>
                  {(library[newExGroup]||[]).filter(e=>e.startsWith("—")).map(h=>(
                    <option key={h} value={h}>{h.replace(/—/g,"").trim()}</option>
                  ))}
                </select>
              )}
              <button className="btn-primary" style={{width:"auto",padding:"8px 16px",fontSize:13}} onClick={addToLibrary}>+ Add</button>
              {exSaveStatus === "saving" && <span style={{fontSize:12,color:"var(--muted)"}}>Saving...</span>}
              {exSaveStatus === "saved" && <span style={{fontSize:12,color:"var(--accent)"}}>✓ Saved</span>}
              {exSaveStatus === "error" && <span style={{fontSize:12,color:"var(--red)"}}>⚠ Save failed — check console</span>}
            </div>
            {/* Exercise list with add-to-week buttons */}
            {filteredLib.map(({exercise, group}) => {
              if (exercise.startsWith("—")) return (
                <div key={`${group}::${exercise}`} style={{
                  padding:"8px 4px 4px",fontSize:11,fontWeight:700,
                  color:"var(--accent)",letterSpacing:2,
                  borderTop:"1px solid var(--border)",marginTop:8,marginBottom:2
                }}>{exercise.replace(/—/g,"").trim()}</div>
              );
              const groupExList = library[group] || [];
              const exIdx = groupExList.indexOf(exercise);
              const canDrag = !searchLib;
              return (
                <div key={`${group}::${exercise}`}
                  draggable={canDrag}
                  onDragStart={()=>{ dragItem.current = exIdx; }}
                  onDragEnter={()=>{ dragOverItem.current = exIdx; }}
                  onDragEnd={()=>reorderExercise(group)}
                  onDragOver={e=>e.preventDefault()}
                  style={{
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    padding:"10px 14px",marginBottom:4,borderRadius:4,
                    background:"var(--charcoal)",border:"1px solid var(--border)",
                    cursor:canDrag?"grab":"default",userSelect:"none"
                  }}>
                  <div style={{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:8}}>
                    {canDrag && <span style={{fontSize:14,color:"var(--border)",flexShrink:0}}>⠿</span>}
                    <span style={{fontSize:13,fontWeight:500,color:"var(--text)"}}>{exercise}</span>
                    {searchLib && <span style={{fontSize:11,color:"var(--muted)",marginLeft:8}}>{group}</span>}
                  </div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
                    {WEEK_LABELS.map((wl,wi)=>{
                      const isIn = weekPlans[wi].includes(exercise);
                      return (
                        <div key={wi} onClick={()=> isIn ? removeFromWeek(wi, exercise) : addToWeek(wi, exercise)} style={{
                          padding:"3px 8px",borderRadius:3,fontSize:11,cursor:"pointer",fontWeight:600,
                          background:isIn?(wi===currentWeekIdx?"var(--green)":"var(--accent)"):"var(--panel)",
                          color:isIn?"var(--black)":"var(--muted)",
                          border:`1px solid ${isIn?(wi===currentWeekIdx?"var(--green)":"var(--accent)"):"var(--border)"}`,
                        }}>{isIn ? "✓" : ""}{wi+1}</div>
                      );
                    })}
                    <div style={{width:1,height:16,background:"var(--border)",margin:"0 2px"}} />
                    <div onClick={()=>setEditingExercise({exercise,group,newName:exercise})} title="Rename" style={{
                      padding:"3px 8px",borderRadius:3,fontSize:12,cursor:"pointer",
                      background:"var(--panel)",border:"1px solid var(--border)",color:"var(--muted)"
                    }}>✏️</div>
                    <div onClick={()=>removeExercise(group,exercise)} title="Remove" style={{
                      padding:"3px 8px",borderRadius:3,fontSize:12,cursor:"pointer",
                      background:"var(--panel)",border:"1px solid var(--border)",color:"var(--muted)"
                    }}>✕</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit Exercise Modal */}
      {editingExercise && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setEditingExercise(null)}>
          <div className="modal" style={{maxWidth:380}}>
            <div className="modal-header">
              <div className="bebas modal-title">RENAME EXERCISE</div>
              <button className="modal-close" onClick={()=>setEditingExercise(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label>Exercise Name</label>
                <input
                  autoFocus
                  value={editingExercise.newName}
                  onChange={e=>setEditingExercise(prev=>({...prev,newName:e.target.value}))}
                  onKeyDown={e=>{ if(e.key==="Enter") renameExercise(editingExercise.group,editingExercise.exercise,editingExercise.newName); if(e.key==="Escape") setEditingExercise(null); }}
                />
              </div>
              <div style={{fontSize:12,color:"var(--muted)"}}>Group: {editingExercise.group}</div>
              <div style={{fontSize:11,color:"var(--muted)",marginTop:6}}>This will also update the name in all week plans and client progress records.</div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={()=>setEditingExercise(null)}>Cancel</button>
              <button className="btn-primary" style={{width:"auto",padding:"10px 24px"}} onClick={()=>renameExercise(editingExercise.group,editingExercise.exercise,editingExercise.newName)}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* WEEK PLAN TAB */}
      {activeWeekIdx !== null && (
        <div style={{padding:"20px 24px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              {isCurrentWeek
                ? <div style={{padding:"6px 14px",borderRadius:4,background:"#22c55e18",border:"1px solid var(--green)",fontSize:13,color:"var(--green)",fontWeight:600}}>🟢 Active Week</div>
                : <button className="btn-secondary" style={{padding:"6px 14px",fontSize:12}} onClick={()=>{ setCurrentWeekIdx(activeWeekIdx); sbFetch("app_settings","POST",[{key:"activeWeekIdx",value:String(activeWeekIdx)}],{Prefer:"resolution=merge-duplicates,return=minimal"}); }}>Set as Active Week</button>
              }
              {autoWeekIdx !== currentWeekIdx && (
                <span style={{fontSize:11,color:"var(--muted)"}}>Auto would be Week {autoWeekIdx+1}</span>
              )}
            </div>
            <span style={{fontSize:13,color:"var(--muted)"}}>{currentPlan.length} exercises</span>
          </div>
          {currentPlan.length === 0 ? (
            <div style={{textAlign:"center",padding:"48px 0",color:"var(--muted)"}}>
              <div style={{fontSize:32,marginBottom:8}}>📋</div>
              <div>No exercises yet. Go to the Library tab and click the week number buttons to add exercises.</div>
            </div>
          ) : (() => {
            // Group exercises by muscle group, preserving library order
            const groupOrder = Object.keys(library || ALL_EXERCISES_DEFAULT);
            const grouped = {};
            currentPlan.forEach(exercise => {
              const group = allExercises.find(x=>x.exercise===exercise)?.group || "Other";
              if (!grouped[group]) grouped[group] = [];
              grouped[group].push(exercise);
            });
            const sortedGroups = groupOrder.filter(g => grouped[g]);
            return (
              <div style={{display:"flex",flexDirection:"column",gap:20}}>
                {sortedGroups.map(group => (
                  <div key={group}>
                    <div style={{
                      fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,
                      color:isCurrentWeek?"var(--green)":"var(--accent)",
                      marginBottom:8,paddingBottom:6,borderBottom:`1px solid var(--border)`
                    }}>{group}</div>
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      {grouped[group].map(exercise => (
                        <div key={exercise} style={{
                          display:"flex",alignItems:"center",justifyContent:"space-between",
                          padding:"10px 14px",borderRadius:4,
                          background:isCurrentWeek?"#22c55e18":"var(--charcoal)",
                          border:`1px solid ${isCurrentWeek?"var(--green)":"var(--border)"}`,
                        }}>
                          <div style={{fontSize:13,fontWeight:600,color:isCurrentWeek?"var(--green)":"var(--text)"}}>{exercise}</div>
                          <div onClick={()=>removeFromWeek(activeWeekIdx, exercise)} style={{cursor:"pointer",color:"var(--muted)",fontSize:16,marginLeft:16}}>✕</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </>
  );
}

// ─── Trainer Analytics ────────────────────────────────────────────────────────
function TrainerAnalytics({ clients, sessions }) {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [weekOffset, setWeekOffset] = useState(0); // 0 = this week, -1 = last week, etc.

  // ── helpers ──
  const dk = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const todayStr = dk(now);

  // Selected week (Mon–Sun) based on offset
  const getMonday = (d) => { const day = d.getDay(); const diff = (day===0?-6:1-day); const m = new Date(d); m.setDate(d.getDate()+diff); m.setHours(0,0,0,0); return m; };
  const weekStart = getMonday(new Date(now.getFullYear(), now.getMonth(), now.getDate() + weekOffset * 7));
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate()+6);
  const weekStartStr = dk(weekStart);
  const weekEndStr = dk(weekEnd);
  const isCurrentWeek = weekOffset === 0;

  // All sessions with a date
  const dated = sessions.filter(s => s.date);

  // This week's sessions
  const weekSessions = dated.filter(s => s.date >= weekStartStr && s.date <= weekEndStr);
  const weekBooked = weekSessions.reduce((a,s) => a+s.clientIds.length, 0);
  const weekCapacity = weekSessions.length * MAX_GROUP_SIZE;
  const weekOpen = weekSessions.reduce((a,s) => a+Math.max(0,MAX_GROUP_SIZE-s.clientIds.length), 0);
  const weekFillPct = weekCapacity > 0 ? Math.round((weekBooked/weekCapacity)*100) : 0;
  const weekUniqueClients = new Set(weekSessions.flatMap(s=>s.clientIds)).size;
  const weekPastSessions = weekSessions.filter(s => s.date < todayStr || (s.date === todayStr));
  const weekUpcoming = weekSessions.filter(s => s.date > todayStr);

  // Sessions in selected month
  const monthKey = `${selectedYear}-${String(selectedMonth+1).padStart(2,"0")}`;
  const monthSessions = dated.filter(s => s.date.startsWith(monthKey));

  // Per-day buckets for the month
  const daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
  const dayData = Array.from({length:daysInMonth}, (_,i) => {
    const d = String(i+1).padStart(2,"0");
    const dateStr = `${monthKey}-${d}`;
    const daySessions = monthSessions.filter(s => s.date === dateStr);
    const totalSlots = daySessions.reduce((acc,s) => acc + 7, 0);
    const booked = daySessions.reduce((acc,s) => acc + s.clientIds.length, 0);
    const open = daySessions.reduce((acc,s) => acc + Math.max(0, MAX_GROUP_SIZE - s.clientIds.length), 0);
    return { day: i+1, dateStr, sessions: daySessions.length, booked, open, totalSlots };
  }).filter(d => d.sessions > 0);

  // Monthly totals
  const totalSessions = monthSessions.length;
  const totalBooked = monthSessions.reduce((a,s) => a+s.clientIds.length, 0);
  const totalOpen = monthSessions.reduce((a,s) => a + Math.max(0, MAX_GROUP_SIZE-s.clientIds.length), 0);
  const totalCapacity = totalSessions * 7;
  const fillPct = totalCapacity > 0 ? Math.round((totalBooked/totalCapacity)*100) : 0;

  // Sessions remaining (future)
  const futureSessions = dated.filter(s => s.date >= todayStr);
  const futureBooked = futureSessions.reduce((a,s) => a+s.clientIds.length, 0);
  const futureOpen = futureSessions.reduce((a,s) => a+Math.max(0,MAX_GROUP_SIZE-s.clientIds.length), 0);

  // Client stats: sessions used vs total
  const clientStats = [...clients]
    .filter(c => c.active)
    .map(c => ({
      name: c.name.split(" ")[0],
      used: calcSessionsUsed(c, sessions),
      total: c.sessionsTotal || 0,
      left: Math.max(0, (c.sessionsTotal||0) - calcSessionsUsed(c, sessions)),
      pct: c.sessionsTotal > 0 ? Math.round((calcSessionsUsed(c, sessions)/c.sessionsTotal)*100) : 0
    }))
    .sort((a,b) => b.pct - a.pct);

  // Months with data for nav
  const monthsWithData = [...new Set(dated.map(s => s.date.slice(0,7)))].sort();

  // Chart max for scaling
  const maxDayBooked = dayData.length > 0 ? Math.max(...dayData.map(d=>d.booked)) : 1;

  const StatCard = ({label, value, sub, color="#3ec9c9"}) => (
    <div style={{background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:8,padding:"20px 24px",flex:1,minWidth:140}}>
      <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:8}}>{label}</div>
      <div style={{fontSize:34,fontWeight:700,color,lineHeight:1}}>{value}</div>
      {sub && <div style={{fontSize:12,color:"var(--muted)",marginTop:6}}>{sub}</div>}
    </div>
  );

  const weekDayNames = ["Mon","Tue","Wed","Thu","Fri","Sat"];

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">ANALYTICS</div>
        <div className="page-subtitle">Session trends, capacity, and client progress</div>
      </div>

      {/* ── Week Selector ── */}
      <div style={{padding:"0 24px 8px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <button onClick={()=>setWeekOffset(w=>w-1)} style={{background:"var(--charcoal)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:14}}>‹</button>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--accent)"}}>
              {isCurrentWeek ? "This Week" : weekOffset === -1 ? "Last Week" : weekOffset < 0 ? `${Math.abs(weekOffset)} Weeks Ago` : `${weekOffset} Week${weekOffset!==1?"s":""} Ahead`}
            </div>
            <div style={{fontSize:13,color:"var(--muted)",marginTop:2}}>
              {MONTHS[weekStart.getMonth()]} {weekStart.getDate()} – {MONTHS[weekEnd.getMonth()]} {weekEnd.getDate()}, {weekEnd.getFullYear()}
            </div>
          </div>
          <button onClick={()=>setWeekOffset(w=>w+1)} style={{background:"var(--charcoal)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:14}}>›</button>
          {!isCurrentWeek && <button onClick={()=>setWeekOffset(0)} style={{background:"none",border:"1px solid var(--accent)",color:"var(--accent)",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:11,fontWeight:700}}>Today</button>}
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
          <StatCard label="Sessions" value={weekSessions.length} sub={`${weekUpcoming.length} upcoming`} />
          <StatCard label="Booked Spots" value={weekBooked} sub={`of ${weekCapacity} capacity`} color="var(--green)" />
          <StatCard label="Open Spots" value={weekOpen} sub="still available" color="var(--accent)" />
          <StatCard label="Fill Rate" value={`${weekFillPct}%`} sub="of capacity filled" color={weekFillPct>=80?"var(--green)":weekFillPct>=50?"var(--accent)":"var(--red)"} />
          <StatCard label="Unique Clients" value={weekUniqueClients} sub="booked this week" color="var(--muted)" />
        </div>

        {/* Per-day breakdown for the week */}
        {weekSessions.length > 0 && (
          <div style={{background:"var(--charcoal)",borderRadius:8,border:"1px solid var(--border)",padding:"16px 20px",marginBottom:24}}>
            <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:12}}>Day by Day</div>
            <div style={{display:"flex",gap:8}}>
              {Array.from({length:6},(_,i)=>{
                const d = new Date(weekStart); d.setDate(weekStart.getDate()+i);
                const dStr = dk(d);
                const daySess = weekSessions.filter(s=>s.date===dStr);
                const booked = daySess.reduce((a,s)=>a+s.clientIds.length,0);
                const cap = daySess.length * MAX_GROUP_SIZE;
                const open = daySess.reduce((a,s)=>a+Math.max(0,MAX_GROUP_SIZE-s.clientIds.length),0);
                  const isPast = dStr < todayStr;
                  const isToday = dStr === todayStr;
                return (
                  <div key={i} style={{flex:1,background:isToday?"#3ec9c910":isPast?"#ffffff05":"var(--panel)",borderRadius:6,padding:"10px 8px",border:`1px solid ${isToday?"var(--accent)":"var(--border)"}`}}>
                    <div style={{fontSize:10,fontWeight:700,color:isToday?"var(--accent)":"var(--muted)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{weekDayNames[i]}</div>
                    <div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>{d.getDate()}</div>
                    {daySess.length===0
                      ? <div style={{fontSize:11,color:"var(--border)"}}>—</div>
                      : <>
                          <div style={{fontSize:18,fontWeight:700,color:"var(--text)",lineHeight:1}}>{booked}</div>
                          <div style={{fontSize:10,color:"var(--muted)"}}>/{cap} booked</div>
                          {open>0 && <div style={{fontSize:10,color:"var(--accent)",marginTop:2}}>{open} open</div>}
                          <div style={{fontSize:10,color:"var(--muted)",marginTop:4}}>{daySess.length} session{daySess.length!==1?"s":""}</div>
                        </>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Monthly ── */}
      <div style={{padding:"0 24px",borderTop:"1px solid var(--border)",paddingTop:20}}>
        <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:12}}>Monthly</div>
      </div>
      <div style={{padding:"0 24px 20px",display:"flex",alignItems:"center",gap:8}}>
        <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={()=>{
          let m = selectedMonth-1; let y = selectedYear;
          if(m<0){m=11;y--;}
          setSelectedMonth(m); setSelectedYear(y);
        }}>‹</button>
        <span className="bebas" style={{fontSize:20,color:"var(--text)",minWidth:160,textAlign:"center"}}>{MONTHS[selectedMonth]} {selectedYear}</span>
        <button className="btn-secondary" style={{padding:"6px 14px"}} onClick={()=>{
          let m = selectedMonth+1; let y = selectedYear;
          if(m>11){m=0;y++;}
          setSelectedMonth(m); setSelectedYear(y);
        }}>›</button>
        <button className="btn-secondary" style={{padding:"6px 12px",fontSize:11,marginLeft:8}} onClick={()=>{setSelectedMonth(now.getMonth());setSelectedYear(now.getFullYear());}}>Today</button>
      </div>

      {/* Stat cards */}
      <div style={{padding:"0 24px 24px",display:"flex",gap:12,flexWrap:"wrap"}}>
        <StatCard label="Total Sessions" value={totalSessions} sub={`${daysInMonth} day month`} />
        <StatCard label="Booked Spots" value={totalBooked} sub={`of ${totalCapacity} capacity`} color="var(--green)" />
        <StatCard label="Open Spots" value={totalOpen} sub="available" color="var(--accent)" />
        <StatCard label="Fill Rate" value={`${fillPct}%`} sub="of capacity filled" color={fillPct>=80?"var(--green)":fillPct>=50?"var(--accent)":"var(--red)"} />
        <StatCard label="Future Open" value={futureOpen} sub={`${futureBooked} booked ahead`} color="var(--muted)" />
      </div>

      {/* Bar chart: booked per day */}
      {dayData.length > 0 && (
        <div style={{margin:"0 24px 24px",background:"var(--charcoal)",borderRadius:8,border:"1px solid var(--border)",padding:"20px 20px 12px"}}>
          <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:16}}>Bookings Per Session Day</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:6,height:120,overflowX:"auto",paddingBottom:4}}>
            {dayData.map(d => {
              const bookedH = Math.round((d.booked/maxDayBooked)*100);
              const openH = Math.round((d.open/maxDayBooked)*100);
              const isToday = d.dateStr === todayStr;
              return (
                <div key={d.day} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,minWidth:32,flex:1}}>
                  <div style={{fontSize:9,color:"var(--muted)",marginBottom:2}}>{d.booked}/{d.booked+d.open}</div>
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",height:90,gap:1,width:"100%"}}>
                    <div style={{height:`${bookedH}%`,background:isToday?"var(--green)":"var(--accent)",borderRadius:"3px 3px 0 0",minHeight:d.booked>0?3:0,transition:"height 0.3s"}}/>
                    <div style={{height:`${openH}%`,background:"var(--border)",borderRadius:"3px 3px 0 0",minHeight:d.open>0?3:0}}/>
                  </div>
                  <div style={{fontSize:9,color:isToday?"var(--green)":"var(--muted)",fontWeight:isToday?700:400}}>{d.day}</div>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:16,marginTop:10,justifyContent:"flex-end"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"var(--muted)"}}><div style={{width:10,height:10,borderRadius:2,background:"var(--accent)"}}/> Booked</div>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"var(--muted)"}}><div style={{width:10,height:10,borderRadius:2,background:"var(--border)"}}/> Open</div>
          </div>
        </div>
      )}

      {/* Client sessions remaining */}
      <div style={{margin:"0 24px 24px",background:"var(--charcoal)",borderRadius:8,border:"1px solid var(--border)",padding:"20px"}}>
        <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:16}}>Client Package Usage</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {clientStats.map(c => (
            <div key={c.name} style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:90,fontSize:12,fontWeight:600,color:"var(--text)",flexShrink:0,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{c.name}</div>
              <div style={{flex:1,height:10,background:"var(--panel)",borderRadius:5,overflow:"hidden",position:"relative"}}>
                <div style={{
                  position:"absolute",left:0,top:0,height:"100%",borderRadius:5,
                  width:`${c.pct}%`,
                  background:c.pct>=90?"var(--red)":c.pct>=70?"var(--accent)":"var(--green)",
                  transition:"width 0.4s"
                }}/>
              </div>
              <div style={{width:70,fontSize:11,color:"var(--muted)",textAlign:"right",flexShrink:0}}>{c.used}/{c.total} <span style={{color:c.left===0?"var(--red)":"var(--muted)"}}>({c.left} left)</span></div>
            </div>
          ))}
          {clientStats.length === 0 && <div style={{color:"var(--muted)",fontSize:13}}>No active clients.</div>}
        </div>
        <div style={{display:"flex",gap:16,marginTop:14,justifyContent:"flex-end"}}>
          {[["var(--green)","< 70% used"],["var(--accent)","70–90% used"],["var(--red)","> 90% used"]].map(([color,label])=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"var(--muted)"}}><div style={{width:10,height:10,borderRadius:2,background:color}}/>{label}</div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── AI Agent ─────────────────────────────────────────────────────────────────
function AIAgent({ clients, sessions, setSessions, library, onReminder, recurringReminders, setRecurringReminders, savedWorkouts, assignedWorkouts, setAssignedWorkouts }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Woof! 🐾 I'm Blu, your gym assistant. I can help you manage your schedule, clients, and workouts. What do you need?" }
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
      case "send_workout": {
        const { clientName, workoutTitle } = params;
        const client = clients.find(c => c.name.toLowerCase().includes((clientName||"").toLowerCase()));
        if (!client) return `⚠️ Could not find client "${clientName}".`;
        const workout = (savedWorkouts||[]).find(w => w.title?.toLowerCase().includes((workoutTitle||"").toLowerCase()));
        if (!workout) return `⚠️ Could not find a saved workout matching "${workoutTitle}". Save it in Workout Builder first.`;
        const clientWorkouts = assignedWorkouts?.[client.id] || [];
        const updated = { ...assignedWorkouts, [client.id]: [{ ...workout, sentAt: new Date().toLocaleDateString(), sentBy: "trainer" }, ...clientWorkouts] };
        setAssignedWorkouts(updated);
        return `✓ Sent "${workout.title}" to ${client.name}! They'll see it in their Blu chat.`;
      }
      case "send_reminder": {
        const msg = params?.message || "Don't forget!";
        onReminder(msg);
        return `✓ Reminder sent!`;
      }
      case "set_recurring_reminder": {
        const { message, frequency, day, time } = params;
        const newReminder = { id: Date.now(), message, frequency: frequency||"daily", day: day||null, time: time||"09:00" };
        const updated = [...recurringReminders, newReminder];
        setRecurringReminders(updated);
        try { localStorage.setItem("ml_recurring_reminders", JSON.stringify(updated)); } catch {}
        const freqLabel = frequency === "weekly" ? `every ${day}` : frequency === "weekdays" ? "every weekday" : "daily";
        return `✓ Recurring reminder set! Blu will remind you "${message}" ${freqLabel} at ${time}.`;
      }
      case "list_reminders": {
        if (recurringReminders.length === 0) return "No recurring reminders set.";
        return "🔔 Recurring reminders:\n" + recurringReminders.map((r,i) => {
          const freqLabel = r.frequency === "weekly" ? `every ${r.day}` : r.frequency === "weekdays" ? "every weekday" : "daily";
          return `${i+1}. "${r.message}" — ${freqLabel} at ${r.time}`;
        }).join("\n");
      }
      case "delete_reminder": {
        const idx = (params?.index || 1) - 1;
        if (idx < 0 || idx >= recurringReminders.length) return "Couldn't find that reminder.";
        const updated = recurringReminders.filter((_,i) => i !== idx);
        setRecurringReminders(updated);
        try { localStorage.setItem("ml_recurring_reminders", JSON.stringify(updated)); } catch {}
        return `✓ Reminder deleted.`;
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
        const lines = sorted.map(c=>"• " + c.name + (c.active?"":" (inactive)")).join("\n");
        return "👥 " + sorted.length + " clients:\n" + lines;
      }
      case "add_session": {
        const { date, time } = params;
        // Validate
        if (!date || !time) return "⚠️ Need both a date and time to add a session.";
        const id = "s_" + date + "_" + time.replace(":00","").replace(" ","_");
        const existing = sessions.find(s => s.id === id || (s.date === date && s.time === time));
        if (existing) return `⚠️ A session already exists on ${date} at ${time}.`;
        const newSession = { id, date, time, clientIds: [], notes: "" };
        await sbFetch("sessions", "POST", [newSession], { Prefer: "resolution=merge-duplicates,return=minimal" });
        setSessions(prev => [...prev, newSession]);
        return `✓ Added session on ${date} at ${time}.`;
      }
      case "update_progress": {
        const { clientName, exercise, sets, reps, weight, muscleGroup } = params;
        // Find client by name (fuzzy match)
        const client = clients.find(c => c.name.toLowerCase().includes(clientName.toLowerCase()));
        if (!client) return `⚠️ Could not find client "${clientName}".`;
        const updatedAt = new Date().toLocaleDateString();
        const row = {
          clientId: client.id,
          exercise,
          sets: sets || "",
          reps: reps || "",
          weight: weight || "",
          notes: "",
          updatedAt
        };
        await sbFetch(`progress?on_conflict=clientId,exercise`, "POST", [row], {
          Prefer: "resolution=merge-duplicates,return=minimal"
        });
        return `✓ Updated ${client.name} — ${exercise}: ${sets ? sets+" sets" : ""} ${reps ? reps+" reps" : ""} ${weight ? weight+"lbs" : ""}`.trim();
      }
      case "generate_workout": {
        const { title, focus, exercises } = params;
        if (!exercises || exercises.length === 0) return "⚠️ No exercises in the workout.";
        // Return a special workout object that will be rendered as a card
        return { __type: "workout", title: title || "Custom Workout", focus: focus || "", exercises };
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

      // Build available slots: upcoming sessions that have at least 1 client but aren't full
      const partialSessions = sessions
        .filter(s => s.date >= todayStr && s.clientIds.length > 0 && s.clientIds.length < MAX_GROUP_SIZE)
        .sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
      const availableSlotsStr = partialSessions.length > 0
        ? partialSessions.map(s => {
            const clientNames = s.clientIds.map(id => { const c = clients.find(x=>x.id===id); return c ? c.name.split(" ")[0] : "?"; }).join(", ");
            return `${s.date} ${s.time} — ${s.clientIds.length}/${MAX_GROUP_SIZE} spots filled (${clientNames}) — ${MAX_GROUP_SIZE - s.clientIds.length} open`;
          }).join("\n")
        : "No partially-filled upcoming sessions.";

      const savedWorkoutsStr = savedWorkouts && savedWorkouts.length > 0
        ? savedWorkouts.map((w,i) => `${i+1}. "${w.title}" (${w.focus||""} · ${w.goal||""})`).join("\n")
        : "No saved workouts yet.";

      const libraryStr = library ? Object.entries(library).map(([group, exs]) =>
        `${group}: ${exs.filter(e=>!e.startsWith("—")).join(", ")}`
      ).join("\n") : "";

      const systemPrompt = `You are an AI assistant for a gym scheduling app. You help the trainer manage their gym.

Current gym data:
- ${clients.length} clients (${clients.filter(c=>c.active).length} active)
- ${sessions.length} total sessions
- ${upcomingSessions} upcoming sessions
- ${pastSessions} past sessions (${bookedPast} had bookings)
- Today: ${todayStr}

Upcoming sessions with open spots (has at least 1 client booked, not yet full — max ${MAX_GROUP_SIZE} per session):
${availableSlotsStr}

Saved workouts (available to send to clients):
${savedWorkoutsStr}


${libraryStr}

You can execute the following actions by responding with a JSON block like this:
<action>{"type":"action_name","params":{}}</action>

Available actions:
- clear_past_sessions — removes all client names from past sessions (keeps time slots)
- show_stats — shows gym statistics
- list_clients — lists all clients
- available_slots — lists all upcoming sessions that have open spots (already have clients but aren't full)
- send_workout — sends a saved workout to a client. Format: <action>{"type":"send_workout","params":{"clientName":"Sarah","workoutTitle":"Full Body Strength"}}</action>. The workout title must match a saved workout. When trainer says "send [workout] to [client]", use this action. Use format: <action>{"type":"send_reminder","params":{"message":"Your reminder text here"}}</action>
- set_recurring_reminder — sets a recurring reminder. Use format: <action>{"type":"set_recurring_reminder","params":{"message":"Check availability submissions","frequency":"daily","time":"09:00"}}</action>. frequency can be "daily", "weekdays", or "weekly" (weekly requires a "day" param e.g. "monday"). time must be in 24h HH:MM format.
- list_reminders — lists all active recurring reminders
- delete_reminder — deletes a recurring reminder by number: <action>{"type":"delete_reminder","params":{"index":1}}</action>

When the trainer says "remind me every day at 9am to...", "set a weekly reminder on Monday to...", or "remind me every weekday at 6pm to...", use set_recurring_reminder.
When they say "what reminders do I have" or "show my reminders", use list_reminders.
When they say "delete reminder 2" or "remove the first reminder", use delete_reminder.
- update_progress — updates sets/reps/weight for a client exercise
- add_session — adds a new session to the schedule
- generate_workout — generates a structured workout plan

When the trainer says something like "remind me to..." or "send me a reminder that..." or "pop up a note saying...", use send_reminder with a clear, concise message.
When asked about open spots, available times, or where more clients can be added, use the "Upcoming sessions with open spots" data above and present it clearly. Empty sessions (0 clients) are NOT shown — only sessions that already have people booked with room for more.

For generate_workout, use this format:
<action>{"type":"generate_workout","params":{"title":"Full Body Strength","focus":"Chest, Back, Shoulders","exercises":[{"exercise":"Flat Bench Press","sets":"4","reps":"8-10","weight":"","notes":"Focus on form"},{"exercise":"Wide Grip Lat Pulldown","sets":"3","reps":"10-12","weight":"","notes":""}]}}</action>

When asked to generate a workout, ONLY use exercises that exist in the exercise library above. Pick appropriate exercises for the requested muscle groups or goal. Include sets, reps, and any coaching notes.

For update_progress, use this format:
<action>{"type":"update_progress","params":{"clientName":"Asma","exercise":"Bench Press","sets":"3","reps":"10","weight":"100","muscleGroup":"Chest"}}</action>

When the trainer says something like "Asma bench press flat 10 reps 100 lbs", extract:
- clientName: the client's name
- exercise: the exercise name (map casual names to proper ones e.g. "bench press flat" → "Bench Press")
- sets: number of sets (if mentioned)
- reps: number of reps
- weight: weight in lbs
- muscleGroup: the muscle group (Chest, Back, Shoulders, Biceps, Triceps, Legs, Core, Cardio)

For add_session, use this format:
<action>{"type":"add_session","params":{"date":"2026-03-10","time":"7:00 AM"}}</action>

When the trainer says something like "add a session Monday March 10 at 7am", extract:
- date: in YYYY-MM-DD format
- time: in "H:MM AM/PM" format (e.g. "7:00 AM", "5:00 PM")

Today is ${todayStr}. Use this to resolve relative dates like "next Monday", "this Friday" etc.

Always confirm what you did after executing an action.
For anything else, just respond conversationally and helpfully.
Keep responses concise.` + (customInstructions ? "\n\nAdditional instructions from the trainer:\n" + customInstructions : "");

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

      const isWorkout = actionResult && typeof actionResult === "object" && actionResult.__type === "workout";
      setMessages(prev => [...prev, {
        role: "assistant",
        text: isWorkout ? (displayText || "Here's your workout!") : (actionResult ? `${displayText}

${actionResult}` : displayText),
        workout: isWorkout ? actionResult : null
      }]);
    } catch(e) {
      console.error("Agent error:", e);
      setMessages(prev => [...prev, { role: "assistant", text: "⚠️ Error: " + e.message }]);
    }
    setLoading(false);
  };

  const [open, setOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [customInstructions, setCustomInstructions] = useState(() => {
    try { return localStorage.getItem("ml_agent_instructions") || ""; } catch { return ""; }
  });

  return (
    <>
      {/* Floating chat panel */}
      {open && (
        <div className="blu-panel" style={{
          position:"fixed",bottom:90,right:24,width:380,height:560,
          background:"var(--panel)",border:"1px solid var(--border)",
          borderRadius:12,display:"flex",flexDirection:"column",
          boxShadow:"0 8px 40px rgba(0,0,0,0.5)",zIndex:1000,overflow:"hidden"
        }}>
          {/* Header */}
          <div style={{padding:"14px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--charcoal)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}><BluIcon size={20} /></div>
              <div>
                <div className="bebas" style={{fontSize:16,color:"var(--accent)",letterSpacing:1}}>BLU</div>
                <div style={{fontSize:10,color:"var(--muted)"}}>Your gym assistant 🐾</div>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"var(--muted)",fontSize:18,cursor:"pointer",padding:4}}>✕</button>
          </div>

          {/* Custom Instructions toggle */}
          <div style={{borderBottom:"1px solid var(--border)"}}>
            <div onClick={()=>setShowInstructions(s=>!s)} style={{padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",userSelect:"none"}}>
              <span style={{fontSize:11,fontWeight:700,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase"}}>⚙ Custom Instructions {customInstructions ? "●" : ""}</span>
              <span style={{fontSize:11,color:"var(--muted)"}}>{showInstructions ? "▲" : "▼"}</span>
            </div>
            {showInstructions && (
              <div style={{padding:"0 12px 12px"}}>
                <textarea
                  value={customInstructions}
                  onChange={e => {
                    setCustomInstructions(e.target.value);
                    try { localStorage.setItem("ml_agent_instructions", e.target.value); } catch {}
                  }}
                  placeholder={"Give the agent specific behaviours, e.g.:\n• Always greet clients by first name\n• When I say 'log it', save the last mentioned exercise\n• Suggest supersets when generating workouts"}
                  rows={5}
                  style={{width:"100%",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:12,padding:"10px",resize:"vertical",outline:"none",boxSizing:"border-box",lineHeight:1.5}}
                />
                <div style={{fontSize:10,color:"var(--muted)",marginTop:4}}>Saved automatically · Active on every message</div>
              </div>
            )}
          </div>

          {/* Active recurring reminders */}
          {recurringReminders.length > 0 && (
            <div style={{padding:"8px 12px",borderBottom:"1px solid var(--border)",background:"#3ec9c908"}}>
              <div style={{fontSize:10,fontWeight:700,color:"var(--accent)",letterSpacing:1.5,marginBottom:6}}>🔔 RECURRING REMINDERS</div>
              {recurringReminders.map((r,i) => {
                const freqLabel = r.frequency === "weekly" ? `every ${r.day}` : r.frequency === "weekdays" ? "weekdays" : "daily";
                return (
                  <div key={r.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:11,color:"var(--text)"}}>{r.message} <span style={{color:"var(--muted)"}}>— {freqLabel} {r.time}</span></span>
                    <div onClick={()=>{
                      const updated = recurringReminders.filter((_,idx)=>idx!==i);
                      setRecurringReminders(updated);
                      try { localStorage.setItem("ml_recurring_reminders", JSON.stringify(updated)); } catch {}
                    }} style={{cursor:"pointer",color:"var(--muted)",fontSize:12,marginLeft:8,padding:"0 4px"}}>✕</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Suggestion chips */}
          <div style={{padding:"10px 12px",borderBottom:"1px solid var(--border)",display:"flex",gap:6,flexWrap:"wrap"}}>
            {[
              "Generate a full body workout",
              "Clear all past session bookings",
              "Show me gym stats",
            ].map(s => (
              <div key={s} onClick={()=>setInput(s)} style={{
                padding:"4px 10px",borderRadius:20,fontSize:11,cursor:"pointer",
                border:"1px solid var(--accent)",color:"var(--accent)",
                background:"transparent",userSelect:"none"
              }}>{s}</div>
            ))}
          </div>

          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
            {messages.map((m, i) => (
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:12}}>
                {m.role==="assistant" && (
                  <div style={{width:26,height:26,borderRadius:"50%",background:"var(--accent)",color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0,marginRight:8,marginTop:2}}><BluIcon size={16} /></div>
                )}
                <div style={{maxWidth:m.workout?"100%":"78%"}}>
                  {m.text && (
                    <div style={{
                      padding:"10px 13px",borderRadius:m.role==="user"?"10px 10px 2px 10px":"10px 10px 10px 2px",
                      background:m.role==="user"?"var(--accent)":"var(--charcoal)",
                      color:m.role==="user"?"var(--black)":"var(--text)",
                      fontSize:12,lineHeight:1.6,whiteSpace:"pre-wrap",
                      border:m.role==="assistant"?"1px solid var(--border)":"none",
                      marginBottom:m.workout?6:0
                    }}>{m.text}</div>
                  )}
                  {m.workout && (() => {
                    const w = m.workout;
                    return (
                      <div style={{background:"var(--panel)",border:"1px solid var(--accent)",borderRadius:8,overflow:"hidden"}}>
                        <div style={{background:"linear-gradient(135deg,#1a3a3a,#0d2626)",padding:"10px 14px",borderBottom:"1px solid var(--accent)"}}>
                          <div className="bebas" style={{fontSize:16,color:"var(--accent)"}}>{w.title}</div>
                          <div style={{fontSize:10,color:"var(--muted)",marginTop:2}}>{w.exercises.length} exercises</div>
                        </div>
                        <div style={{padding:"8px 0"}}>
                          {w.exercises.map((ex, idx) => (
                            <div key={idx} style={{display:"flex",gap:10,padding:"7px 14px",borderBottom:idx<w.exercises.length-1?"1px solid var(--border)":"none"}}>
                              <div style={{width:22,height:22,borderRadius:"50%",background:"var(--accent)",color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{idx+1}</div>
                              <div>
                                <div style={{fontSize:12,fontWeight:600,color:"var(--text)"}}>{ex.exercise}</div>
                                <div style={{display:"flex",gap:8,marginTop:2}}>
                                  {ex.sets && <span style={{fontSize:10,color:"var(--accent)",fontWeight:600}}>{ex.sets} sets</span>}
                                  {ex.reps && <span style={{fontSize:10,color:"var(--muted)"}}>× {ex.reps} reps</span>}
                                  {ex.weight && <span style={{fontSize:10,color:"var(--muted)"}}>@ {ex.weight}</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:"var(--accent)",color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}><BluIcon size={16} /></div>
                <div style={{padding:"10px 13px",borderRadius:"10px 10px 10px 2px",background:"var(--charcoal)",border:"1px solid var(--border)",fontSize:12,color:"var(--muted)"}}>Thinking...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{padding:"12px",borderTop:"1px solid var(--border)",display:"flex",gap:8}}>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
              placeholder="Ask me anything..."
              disabled={loading}
              style={{flex:1,padding:"10px 12px",fontSize:13,background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,color:"var(--text)",outline:"none"}}
            />
            <button className="btn-primary" style={{width:"auto",padding:"10px 16px",fontSize:13,opacity:loading?0.5:1}} onClick={sendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      )}

      {/* Floating bubble button */}
      <div className="blu-bubble" onClick={()=>setOpen(o=>!o)} style={{
        position:"fixed",bottom:24,right:24,width:56,height:56,
        borderRadius:"50%",background:open?"var(--charcoal)":"var(--accent)",
        border:`2px solid ${open?"var(--border)":"var(--accent)"}`,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:24,cursor:"pointer",zIndex:1001,
        boxShadow:"0 4px 20px rgba(62,201,201,0.4)",
        transition:"all 0.2s",userSelect:"none"
      }}>{open ? "✕" : <BluIcon size={28} />}</div>
    </>
  );
}

function ClientPrograms({ workouts }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!workouts || workouts.length === 0) return (
    <>
      <div className="page-header">
        <div className="bebas page-title">MY PROGRAMS</div>
        <div className="page-subtitle">Workout programs sent by your trainer</div>
      </div>
      <div style={{textAlign:"center",padding:"60px 20px",color:"var(--muted)"}}>
        <div style={{fontSize:40,marginBottom:12}}>⚡</div>
        <div style={{fontSize:14}}>No programs yet — your trainer will send them here.</div>
      </div>
    </>
  );

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">MY PROGRAMS</div>
        <div className="page-subtitle">{workouts.length} program{workouts.length!==1?"s":""} from your trainer</div>
      </div>

      {workouts.map((w, wi) => {
        const isOpen = expandedId === (w.id||wi);
        return (
          <div key={w.id||wi} style={{background:"var(--panel)",border:"1px solid var(--accent)",borderRadius:10,overflow:"hidden",marginBottom:16}}>
            {/* Header */}
            <div style={{background:"linear-gradient(135deg,#1a3a3a,#0d2626)",padding:"16px 20px",borderBottom:"1px solid var(--accent)",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div className="bebas" style={{fontSize:22,color:"var(--accent)",letterSpacing:1}}>{w.title}</div>
                <div style={{display:"flex",gap:12,marginTop:4,flexWrap:"wrap"}}>
                  {w.focus && <span style={{fontSize:11,color:"var(--muted)"}}>💪 {w.focus}</span>}
                  {w.goal && <span style={{fontSize:11,color:"var(--muted)"}}>🎯 {w.goal}</span>}
                  {w.difficulty && <span style={{fontSize:11,color:"var(--muted)"}}>📊 {w.difficulty}</span>}
                  {w.duration && <span style={{fontSize:11,color:"var(--muted)"}}>⏱ {w.duration}</span>}
                  {w.sentAt && <span style={{fontSize:11,color:"var(--muted)"}}>📅 Sent {w.sentAt}</span>}
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end",flexShrink:0}}>
                <button className="btn-secondary" style={{padding:"6px 14px",fontSize:12}} onClick={()=>setExpandedId(isOpen?null:(w.id||wi))}>
                  {isOpen?"Collapse ▲":"View ▼"}
                </button>
              </div>
            </div>

            {/* Warmup */}
            {isOpen && w.warmup && <div style={{padding:"10px 20px",borderBottom:"1px solid var(--border)",fontSize:12,color:"var(--muted)"}}>🔥 <strong>Warmup:</strong> {w.warmup}</div>}

            {/* Exercise list — same style as trainer WorkoutCard */}
            {isOpen && (
              <div style={{padding:"8px 0"}}>
                {(w.exercises||[]).map((ex, idx) => {
                  const nextEx = (w.exercises||[])[idx+1];
                  const isSupersetStart = ex.supersetId && nextEx?.supersetId === ex.supersetId;
                  const isSupersetEnd = ex.supersetId && (w.exercises||[])[idx-1]?.supersetId === ex.supersetId;
                  if (isSupersetEnd) return null;

                  if (isSupersetStart) return (
                    <div key={idx} style={{margin:"4px 20px 4px",border:"1px solid var(--accent)",borderRadius:8,overflow:"hidden",marginBottom:4}}>
                      <div style={{background:"#3ec9c918",padding:"4px 14px",fontSize:10,fontWeight:700,color:"var(--accent)",letterSpacing:1.5}}>⚡ SUPERSET</div>
                      <div style={{display:"flex"}}>
                        {[ex, nextEx].map((e, si) => (
                          <div key={si} style={{flex:1,padding:"10px 14px",borderRight:si===0?"1px solid var(--border)":"none"}}>
                            <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:4}}>{e.exercise}</div>
                            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                              {e.sets && <span style={{fontSize:12,color:"var(--accent)",fontWeight:600}}>{e.sets} sets</span>}
                              {e.reps && <span style={{fontSize:12,color:"var(--muted)"}}>× {e.reps} reps</span>}
                              {e.rest && <span style={{fontSize:12,color:"var(--muted)"}}>Rest: {e.rest}</span>}
                            </div>
                            {e.notes && <div style={{fontSize:11,color:"var(--muted)",marginTop:4,fontStyle:"italic"}}>💡 {e.notes}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );

                  return (
                    <div key={idx} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"12px 20px",borderBottom:idx<(w.exercises.length-1)?"1px solid var(--border)":"none"}}>
                      <div style={{width:30,height:30,borderRadius:"50%",background:"var(--accent)",color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>{idx+1}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{ex.exercise}</div>
                        <div style={{display:"flex",gap:16,marginTop:4,flexWrap:"wrap"}}>
                          {ex.sets && <span style={{fontSize:12,color:"var(--accent)",fontWeight:600}}>{ex.sets} sets</span>}
                          {ex.reps && <span style={{fontSize:12,color:"var(--muted)"}}>× {ex.reps} reps</span>}
                          {ex.rest && <span style={{fontSize:12,color:"var(--muted)"}}>Rest: {ex.rest}</span>}
                          {ex.muscleGroup && <span style={{fontSize:11,color:"var(--border)",background:"var(--charcoal)",padding:"1px 8px",borderRadius:10}}>{ex.muscleGroup}</span>}
                        </div>
                        {ex.notes && <div style={{fontSize:11,color:"var(--muted)",marginTop:4,fontStyle:"italic"}}>💡 {ex.notes}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {isOpen && w.cooldown && <div style={{padding:"10px 20px",borderTop:"1px solid var(--border)",fontSize:12,color:"var(--muted)"}}>❄️ <strong>Cooldown:</strong> {w.cooldown}</div>}
          </div>
        );
      })}
    </>
  );
}

// ─── Client App ───────────────────────────────────────────────────────────────
function ClientApp({ user, clients, sessions, saveClients, onLogout, bluFAQ, assignedWorkouts }) {
  const [tab, setTab] = useState("schedule");
  const nav = [
    { id:"schedule", icon:"📅", label:"My Schedule" },
    { id:"availability", icon:"✅", label:"My Availability" },
    { id:"programs", icon:"⚡", label:"My Programs" },
    { id:"progress", icon:"📈", label:"My Progress" },
    { id:"account", icon:"👤", label:"Account" },
  ];

  const client = clients.find(c=>c.id===user.id);
  const mySessions = sessions.filter(s=>s.clientIds.includes(user.id)).sort((a,b)=>{
    const da = a.date||"", db = b.date||"";
    return da < db ? -1 : da > db ? 1 : TIMES.indexOf(a.time)-TIMES.indexOf(b.time);
  });
  const sessionsLeft = client ? Math.max(0, client.sessionsTotal - calcSessionsUsed(client, mySessions)) : 0;
  const myWorkouts = (assignedWorkouts?.[user.id] || []);

  if (!client) return (
    <div className="login-wrap">
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:40,marginBottom:12}}>🐾</div>
        <div style={{color:"var(--muted)",fontSize:14}}>Loading your profile...</div>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <Sidebar user={user} nav={nav} tab={tab} setTab={setTab} onLogout={onLogout} role="CLIENT" />
      <div className="main-content" style={{overflowY:"auto"}}>
        <div style={{display:tab==="schedule"?"":"none"}}><ClientSchedule client={client} mySessions={mySessions} sessionsLeft={sessionsLeft} /></div>
        <div style={{display:tab==="availability"?"":"none"}}><ClientAvailability client={client} /></div>
        <div style={{display:tab==="programs"?"":"none"}}><ClientPrograms workouts={myWorkouts} /></div>
        {tab==="progress" && <ClientProgress client={client} mySessions={mySessions} />}
        <div style={{display:tab==="account"?"":"none"}}><ClientAccount client={client} sessionsLeft={sessionsLeft} /></div>
      </div>
      <ClientBlu client={client} mySessions={mySessions} sessionsLeft={sessionsLeft} bluFAQ={bluFAQ || []} assignedWorkouts={myWorkouts} onNavigate={setTab} />
    </div>
  );
}

function ExRow({ ex, idx, showMoveUp, showMoveDown, onUpdate, onRemove, onMove }) {
  const [noteSaved, setNoteSaved] = useState(false);

  const savedNote = (() => { try { return JSON.parse(localStorage.getItem("ml_exercise_notes")||"{}")[ex.exercise] || ""; } catch { return ""; }})();

  const saveNote = () => {
    try {
      const notes = JSON.parse(localStorage.getItem("ml_exercise_notes")||"{}");
      notes[ex.exercise] = ex.notes;
      localStorage.setItem("ml_exercise_notes", JSON.stringify(notes));
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    } catch {}
  };

  return (
    <div style={{flex:1,padding:"10px 12px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <div style={{fontSize:12,fontWeight:700,color:"var(--text)",flex:1,lineHeight:1.3}}>{ex.exercise}</div>
        <div style={{display:"flex",gap:2,alignItems:"center",flexShrink:0}}>
          {showMoveUp && <div onClick={()=>onMove(idx,-1)} style={{cursor:"pointer",color:"var(--muted)",fontSize:13,padding:"1px 4px",userSelect:"none"}}>↑</div>}
          {showMoveDown && <div onClick={()=>onMove(idx,1)} style={{cursor:"pointer",color:"var(--muted)",fontSize:13,padding:"1px 4px",userSelect:"none"}}>↓</div>}
          <div onClick={()=>onRemove(ex.exercise)} style={{cursor:"pointer",color:"var(--red)",fontSize:12,padding:"1px 5px",userSelect:"none"}}>✕</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,marginBottom:5}}>
        {[["sets","Sets"],["reps","Reps"],["rest","Rest"]].map(([field,label])=>(
          <div key={field}>
            <div style={{fontSize:9,color:"var(--muted)",marginBottom:2,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
            <input value={ex[field]} onChange={e=>onUpdate(ex.exercise,field,e.target.value)}
              style={{width:"100%",padding:"4px 6px",background:"var(--panel)",border:"1px solid var(--border)",borderRadius:4,color:"var(--text)",fontSize:11,outline:"none",boxSizing:"border-box"}} />
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <input value={ex.notes} onChange={e=>onUpdate(ex.exercise,"notes",e.target.value)} placeholder="Coaching note..."
          style={{flex:1,padding:"4px 6px",background:"var(--panel)",border:"1px solid var(--border)",borderRadius:4,color:"var(--text)",fontSize:11,outline:"none",boxSizing:"border-box"}} />
        {ex.notes && ex.notes !== savedNote && (
          <button onClick={saveNote} title="Save note for this exercise"
            style={{flexShrink:0,padding:"3px 8px",background:"transparent",border:"1px solid var(--accent)",borderRadius:4,color:noteSaved?"var(--black)":"var(--accent)",background:noteSaved?"var(--accent)":"transparent",fontSize:10,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s"}}>
            {noteSaved ? "✓ Saved" : "💾 Save"}
          </button>
        )}
        {ex.notes === savedNote && savedNote && (
          <span style={{flexShrink:0,fontSize:10,color:"var(--muted)"}}>✓ saved</span>
        )}
      </div>
    </div>
  );
}

function WorkoutGenerator({ library, clients, savedWorkouts, setSavedWorkouts }) {
  const [mode, setMode] = useState("ai"); // "ai" | "manual"
  const [focus, setFocus] = useState([]);
  const [goal, setGoal] = useState("Strength");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [numExercises, setNumExercises] = useState(6);
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [viewSaved, setViewSaved] = useState(false);
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);

  const loadForEdit = (w) => {
    setManualTitle(w.title || "");
    setManualGoal(w.goal || "Strength");
    setManualDifficulty(w.difficulty || "Intermediate");
    setManualClientId(clients.find(c => c.name === w.clientName)?.id || "");
    setManualExercises((w.exercises || []).map(e => ({ ...e, supersetId: e.supersetId || null })));
    setEditingWorkoutId(w.id);
    setSupersetPending(null);
    setMode("manual");
    setViewSaved(false);
  };

  // Manual mode state — restore draft from localStorage
  const [manualTitle, setManualTitle] = useState(() => { try { return JSON.parse(localStorage.getItem("ml_workout_draft")||"{}").title||""; } catch { return ""; }});
  const [manualGoal, setManualGoal] = useState(() => { try { return JSON.parse(localStorage.getItem("ml_workout_draft")||"{}").goal||"Strength"; } catch { return "Strength"; }});
  const [manualDifficulty, setManualDifficulty] = useState(() => { try { return JSON.parse(localStorage.getItem("ml_workout_draft")||"{}").difficulty||"Intermediate"; } catch { return "Intermediate"; }});
  const [manualClientId, setManualClientId] = useState(() => { try { return JSON.parse(localStorage.getItem("ml_workout_draft")||"{}").clientId||""; } catch { return ""; }});
  const [manualExercises, setManualExercises] = useState(() => { try { return JSON.parse(localStorage.getItem("ml_workout_draft")||"{}").exercises||[]; } catch { return []; }});
  const [hasDraft] = useState(() => { try { const d = JSON.parse(localStorage.getItem("ml_workout_draft")||"{}"); return !!(d.title||d.exercises?.length); } catch { return false; }});
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [exSearch, setExSearch] = useState("");
  const [supersetPending, setSupersetPending] = useState(null);

  const muscleGroups = Object.keys(library || {}).filter(g => !g.startsWith("—"));
  const goals = ["Strength","Hypertrophy","Endurance","Fat Loss","Full Body","Cardio & Core"];
  const difficulties = ["Beginner","Intermediate","Advanced"];

  const toggleFocus = (g) => setFocus(prev => prev.includes(g) ? prev.filter(x=>x!==g) : [...prev, g]);

  const generate = async () => {
    if (focus.length === 0) return;
    setLoading(true);
    setWorkout(null);

    const libraryStr = Object.entries(library || {})
      .filter(([g]) => focus.includes(g))
      .map(([g, exs]) => `${g}: ${exs.filter(e=>!e.startsWith("—")).join(", ")}`)
      .join("\n");

    const selectedClient = clients.find(c=>c.id===clientId);

    try {
      const response = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1500,
          system:`You are a professional personal trainer building structured workouts. Always respond ONLY with valid JSON — no markdown, no explanation, just the JSON object.`,
          messages:[{
            role:"user",
            content:`Generate a ${goal.toLowerCase()} workout for ${difficulty.toLowerCase()} level with exactly ${numExercises} exercises.
${selectedClient ? `This is for client: ${selectedClient.name}.` : ""}
Focus muscle groups: ${focus.join(", ")}.

Use ONLY exercises from this library:
${libraryStr}

Respond with ONLY this JSON format:
{
  "title": "Workout name",
  "focus": "${focus.join(" & ")}",
  "goal": "${goal}",
  "difficulty": "${difficulty}",
  "duration": "estimated duration e.g. 45-60 min",
  "exercises": [
    {
      "exercise": "Exercise name exactly as in library",
      "muscleGroup": "muscle group",
      "sets": "3",
      "reps": "8-10",
      "rest": "60s",
      "notes": "coaching tip"
    }
  ],
  "warmup": "brief warmup suggestion",
  "cooldown": "brief cooldown suggestion"
}`
          }]
        })
      });
      const data = await response.json();
      const raw = data.content?.[0]?.text || "{}";
      const clean = raw.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setWorkout({ ...parsed, clientName: selectedClient?.name || null, generatedAt: new Date().toLocaleDateString() });
    } catch(e) {
      setWorkout({ error: "Couldn't generate workout. Try again." });
    }
    setLoading(false);
  };

  const saveWorkout = () => {
    if (!workout || workout.error) return;
    setSavedWorkouts([{ ...workout, id: Date.now() }, ...savedWorkouts]);
  };

  const deleteSaved = (id) => {
    setSavedWorkouts(savedWorkouts.filter(w=>w.id!==id));
  };

  // Manual mode helpers
  const addManualExercise = (exercise, muscleGroup) => {
    if (supersetPending) {
      if (exercise === supersetPending) { setSupersetPending(null); return; }
      const ssId = `ss_${Date.now()}`;
      const alreadyIn = manualExercises.find(e => e.exercise === exercise);
      if (alreadyIn) {
        setManualExercises(prev => prev.map(e =>
          e.exercise === supersetPending ? { ...e, supersetId: ssId } :
          e.exercise === exercise      ? { ...e, supersetId: ssId } : e
        ));
      } else {
        setManualExercises(prev => {
          const pendingIdx = prev.findIndex(e => e.exercise === supersetPending);
          const updated = prev.map(e => e.exercise === supersetPending ? { ...e, supersetId: ssId } : e);
          const savedNote = (() => { try { return JSON.parse(localStorage.getItem("ml_exercise_notes")||"{}")[exercise] || ""; } catch { return ""; }})();
          updated.splice(pendingIdx + 1, 0, { exercise, muscleGroup, sets:"3", reps:"10-12", rest:"60s", notes: savedNote, supersetId: ssId });
          return updated;
        });
      }
      setSupersetPending(null);
      return;
    }
    if (manualExercises.find(e => e.exercise === exercise)) return;
    const savedNote = (() => { try { return JSON.parse(localStorage.getItem("ml_exercise_notes")||"{}")[exercise] || ""; } catch { return ""; }})();
    setManualExercises(prev => [...prev, { exercise, muscleGroup, sets:"3", reps:"10-12", rest:"60s", notes: savedNote, supersetId: null }]);
  };
  const removeManualExercise = (exercise) => {
    setManualExercises(prev => {
      const target = prev.find(e => e.exercise === exercise);
      // if part of a superset, unlink partner if only 2 in group
      if (target?.supersetId) {
        const partners = prev.filter(e => e.supersetId === target.supersetId);
        if (partners.length === 2) {
          return prev.filter(e => e.exercise !== exercise).map(e =>
            e.supersetId === target.supersetId ? { ...e, supersetId: null } : e
          );
        }
      }
      return prev.filter(e => e.exercise !== exercise);
    });
    if (supersetPending === exercise) setSupersetPending(null);
  };
  const updateManualExercise = (exercise, field, value) => setManualExercises(prev => prev.map(e=>e.exercise===exercise?{...e,[field]:value}:e));
  const unlinkSuperset = (supersetId) => setManualExercises(prev => prev.map(e => e.supersetId === supersetId ? { ...e, supersetId: null } : e));
  const moveExercise = (idx, dir) => {
    const arr = [...manualExercises];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setManualExercises(arr);
  };
  const saveManual = () => {
    if (!manualTitle.trim() || manualExercises.length === 0) return;
    const selectedClient = clients.find(c=>c.id===manualClientId);
    const w = {
      id: Date.now(),
      title: manualTitle.trim(),
      focus: [...new Set(manualExercises.map(e=>e.muscleGroup))].join(", "),
      goal: manualGoal,
      difficulty: manualDifficulty,
      duration: `${manualExercises.length * 5}-${manualExercises.length * 8} min`,
      exercises: manualExercises,
      clientName: selectedClient?.name || null,
      generatedAt: new Date().toLocaleDateString()
    };
    setSavedWorkouts(prev => {
      const w2 = { ...w, id: editingWorkoutId || w.id };
      if (editingWorkoutId) return prev.map(x => x.id === editingWorkoutId ? w2 : x);
      return [w2, ...prev];
    });
    try { localStorage.removeItem("ml_workout_draft"); } catch {}
    setManualTitle(""); setManualExercises([]); setManualClientId("");
    setEditingWorkoutId(null);
    setViewSaved(true);
  };

  const saveDraft = () => {
    try {
      localStorage.setItem("ml_workout_draft", JSON.stringify({
        title: manualTitle, goal: manualGoal, difficulty: manualDifficulty,
        clientId: manualClientId, exercises: manualExercises
      }));
    } catch {}
  };

  const clearDraft = () => {
    try { localStorage.removeItem("ml_workout_draft"); } catch {}
    setManualTitle(""); setManualGoal("Strength"); setManualDifficulty("Intermediate");
    setManualClientId(""); setManualExercises([]); setSupersetPending(null); setEditingWorkoutId(null);
  };

  const WorkoutCard = ({ w, showDelete, onDelete, onEdit }) => (
    <div style={{background:"var(--panel)",border:"1px solid var(--accent)",borderRadius:10,overflow:"hidden",marginBottom:16}}>
      <div style={{background:"linear-gradient(135deg,#1a3a3a,#0d2626)",padding:"16px 20px",borderBottom:"1px solid var(--accent)",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div className="bebas" style={{fontSize:22,color:"var(--accent)",letterSpacing:1}}>{w.title}</div>
          <div style={{display:"flex",gap:12,marginTop:4,flexWrap:"wrap"}}>
            {w.focus && <span style={{fontSize:11,color:"var(--muted)"}}>💪 {w.focus}</span>}
            {w.goal && <span style={{fontSize:11,color:"var(--muted)"}}>🎯 {w.goal}</span>}
            {w.difficulty && <span style={{fontSize:11,color:"var(--muted)"}}>📊 {w.difficulty}</span>}
            {w.duration && <span style={{fontSize:11,color:"var(--muted)"}}>⏱ {w.duration}</span>}
            {w.clientName && <span style={{fontSize:11,color:"var(--accent)"}}>👤 {w.clientName}</span>}
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
          {!showDelete && <button className="btn-secondary" style={{padding:"6px 14px",fontSize:12}} onClick={saveWorkout}>Save ↓</button>}
          {showDelete && onEdit && <button className="btn-secondary" style={{padding:"6px 14px",fontSize:12}} onClick={()=>onEdit(w)}>✏️ Edit</button>}
          {showDelete && <button className="btn-secondary" style={{padding:"6px 14px",fontSize:12,color:"var(--red)",borderColor:"var(--red)"}} onClick={onDelete}>Delete</button>}
        </div>
      </div>
      {w.warmup && <div style={{padding:"10px 20px",borderBottom:"1px solid var(--border)",fontSize:12,color:"var(--muted)"}}>🔥 <strong>Warmup:</strong> {w.warmup}</div>}
      <div style={{padding:"8px 0"}}>
        {(w.exercises||[]).map((ex,idx) => {
          const nextEx = (w.exercises||[])[idx+1];
          const isSupersetStart = ex.supersetId && nextEx?.supersetId === ex.supersetId;
          const isSupersetEnd = ex.supersetId && (w.exercises||[])[idx-1]?.supersetId === ex.supersetId;
          if (isSupersetEnd) return null;
          if (isSupersetStart) return (
            <div key={idx} style={{margin:"4px 12px",border:"2px solid var(--accent)",borderRadius:8,overflow:"hidden",marginBottom:4}}>
              <div style={{background:"#3ec9c918",padding:"4px 14px",fontSize:10,fontWeight:700,color:"var(--accent)",letterSpacing:1.5}}>⚡ SUPERSET</div>
              <div style={{display:"flex"}}>
                {[ex, nextEx].map((e, si) => (
                  <div key={si} style={{flex:1,padding:"10px 14px",borderRight:si===0?"1px solid var(--border)":"none"}}>
                    <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:4}}>{e.exercise}</div>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                      {e.sets && <span style={{fontSize:12,color:"var(--accent)",fontWeight:600}}>{e.sets} sets</span>}
                      {e.reps && <span style={{fontSize:12,color:"var(--muted)"}}>× {e.reps} reps</span>}
                      {e.rest && <span style={{fontSize:12,color:"var(--muted)"}}>Rest: {e.rest}</span>}
                    </div>
                    {e.notes && <div style={{fontSize:11,color:"var(--muted)",marginTop:4,fontStyle:"italic"}}>💡 {e.notes}</div>}
                  </div>
                ))}
              </div>
            </div>
          );
          return (
            <div key={idx} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"12px 20px",borderBottom:idx<w.exercises.length-1?"1px solid var(--border)":"none"}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:"var(--accent)",color:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>{idx+1}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{ex.exercise}</div>
                <div style={{display:"flex",gap:16,marginTop:4,flexWrap:"wrap"}}>
                  {ex.sets && <span style={{fontSize:12,color:"var(--accent)",fontWeight:600}}>{ex.sets} sets</span>}
                  {ex.reps && <span style={{fontSize:12,color:"var(--muted)"}}>× {ex.reps} reps</span>}
                  {ex.rest && <span style={{fontSize:12,color:"var(--muted)"}}>Rest: {ex.rest}</span>}
                  <span style={{fontSize:11,color:"var(--border)",background:"var(--charcoal)",padding:"1px 8px",borderRadius:10}}>{ex.muscleGroup}</span>
                </div>
                {ex.notes && <div style={{fontSize:11,color:"var(--muted)",marginTop:4,fontStyle:"italic"}}>💡 {ex.notes}</div>}
              </div>
            </div>
          );
        })}
      </div>
      {w.cooldown && <div style={{padding:"10px 20px",borderTop:"1px solid var(--border)",fontSize:12,color:"var(--muted)"}}>❄️ <strong>Cooldown:</strong> {w.cooldown}</div>}
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">WORKOUT BUILDER</div>
        <div className="page-subtitle">Generate with AI or build manually from your exercise library</div>
      </div>

      <div style={{display:"flex",gap:8,padding:"0 0 20px",flexWrap:"wrap"}}>
        <button className={mode==="ai"&&!viewSaved?"btn-primary":"btn-secondary"} style={{width:"auto",padding:"8px 20px"}} onClick={()=>{setMode("ai");setViewSaved(false);}}>⚡ AI Generate</button>
        <button className={mode==="manual"&&!viewSaved?"btn-primary":"btn-secondary"} style={{width:"auto",padding:"8px 20px"}} onClick={()=>{setMode("manual");setViewSaved(false);}}>✏️ Manual Build</button>
        <button className={viewSaved?"btn-primary":"btn-secondary"} style={{width:"auto",padding:"8px 20px"}} onClick={()=>setViewSaved(true)}>📋 Saved ({savedWorkouts.length})</button>
      </div>

      {!viewSaved && mode === "ai" ? (
        <>
          <div className="section">
            <div className="section-header"><span className="section-title">Build Your Workout</span></div>
            <div className="section-body" style={{display:"flex",flexDirection:"column",gap:20}}>

              {/* Muscle group focus */}
              <div>
                <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:10}}>Muscle Groups (select all that apply)</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {muscleGroups.map(g => (
                    <div key={g} onClick={()=>toggleFocus(g)} style={{
                      padding:"8px 16px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:600,userSelect:"none",transition:"all 0.15s",
                      background:focus.includes(g)?"var(--accent)":"var(--charcoal)",
                      color:focus.includes(g)?"var(--black)":"var(--text)",
                      border:`2px solid ${focus.includes(g)?"var(--accent)":"var(--border)"}`
                    }}>{g}</div>
                  ))}
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
                {/* Goal */}
                <div>
                  <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:8}}>Goal</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {goals.map(g => (
                      <div key={g} onClick={()=>setGoal(g)} style={{
                        padding:"8px 14px",borderRadius:6,cursor:"pointer",fontSize:13,userSelect:"none",
                        background:goal===g?"var(--accent)":"var(--charcoal)",
                        color:goal===g?"var(--black)":"var(--text)",
                        border:`1px solid ${goal===g?"var(--accent)":"var(--border)"}`
                      }}>{g}</div>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:8}}>Difficulty</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {difficulties.map(d => (
                      <div key={d} onClick={()=>setDifficulty(d)} style={{
                        padding:"8px 14px",borderRadius:6,cursor:"pointer",fontSize:13,userSelect:"none",
                        background:difficulty===d?"var(--accent)":"var(--charcoal)",
                        color:difficulty===d?"var(--black)":"var(--text)",
                        border:`1px solid ${difficulty===d?"var(--accent)":"var(--border)"}`
                      }}>{d}</div>
                    ))}
                  </div>
                </div>

                {/* Exercises count + client */}
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:8}}>Number of Exercises: {numExercises}</div>
                    <input type="range" min={3} max={12} value={numExercises} onChange={e=>setNumExercises(Number(e.target.value))}
                      style={{width:"100%",accentColor:"var(--accent)"}} />
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted)",marginTop:4}}><span>3</span><span>12</span></div>
                  </div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:8}}>For Client (optional)</div>
                    <select value={clientId} onChange={e=>setClientId(e.target.value)}
                      style={{width:"100%",padding:"8px 12px",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:13}}>
                      <option value="">General workout</option>
                      {[...clients].filter(c=>c.active&&!c.former).sort((a,b)=>a.name.localeCompare(b.name)).map(c=>(
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button className="btn-primary" style={{width:"auto",padding:"14px 32px",fontSize:15,opacity:focus.length===0||loading?0.5:1}}
                onClick={generate} disabled={focus.length===0||loading}>
                {loading ? "Generating..." : focus.length===0 ? "Select at least one muscle group" : "⚡ Generate Workout"}
              </button>
            </div>
          </div>

          {loading && (
            <div style={{textAlign:"center",padding:"40px",color:"var(--muted)"}}>
              <div style={{fontSize:32,marginBottom:12}}>⚡</div>
              <div>Building your workout...</div>
            </div>
          )}

          {workout && !workout.error && <WorkoutCard w={workout} showDelete={false} />}
          {workout?.error && <div style={{padding:"20px",color:"var(--red)",background:"var(--charcoal)",borderRadius:8,border:"1px solid var(--red)"}}>{workout.error}</div>}
        </>
      ) : !viewSaved && mode === "manual" ? (
        <>
          {editingWorkoutId && (
            <div style={{background:"#3ec9c915",border:"1px solid var(--accent)",borderRadius:8,padding:"10px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,color:"var(--accent)"}}>✏️ Editing <strong>{manualTitle||"workout"}</strong> — changes will overwrite the saved version</span>
              <button className="btn-secondary" style={{padding:"4px 12px",fontSize:11}} onClick={()=>{setEditingWorkoutId(null);setManualTitle("");setManualExercises([]);setManualClientId("");}}>Cancel</button>
            </div>
          )}
          {hasDraft && !editingWorkoutId && (manualTitle || manualExercises.length > 0) && (
            <div style={{background:"#3ec9c915",border:"1px solid var(--accent)",borderRadius:8,padding:"10px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,color:"var(--accent)"}}>📝 Draft restored — <strong>{manualTitle||"Untitled"}</strong> · {manualExercises.length} exercise{manualExercises.length!==1?"s":""}</span>
              <button className="btn-secondary" style={{padding:"4px 12px",fontSize:11,color:"var(--red)",borderColor:"var(--red)"}} onClick={clearDraft}>Discard</button>
            </div>
          )}
          <div className="section">
            <div className="section-header"><span className="section-title">Workout Details</span></div>
            <div className="section-body" style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:6}}>Workout Name</div>
                  <input value={manualTitle} onChange={e=>setManualTitle(e.target.value)} placeholder="e.g. Push Day A" style={{width:"100%",padding:"10px 12px",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:13,outline:"none",boxSizing:"border-box"}} />
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:6}}>Goal</div>
                  <select value={manualGoal} onChange={e=>setManualGoal(e.target.value)} style={{width:"100%",padding:"10px 12px",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:13}}>
                    {["Strength","Hypertrophy","Endurance","Fat Loss","Full Body","Cardio & Core"].map(g=><option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:6}}>Difficulty</div>
                  <select value={manualDifficulty} onChange={e=>setManualDifficulty(e.target.value)} style={{width:"100%",padding:"10px 12px",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:13}}>
                    {["Beginner","Intermediate","Advanced"].map(d=><option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:6}}>For Client (optional)</div>
                  <select value={manualClientId} onChange={e=>setManualClientId(e.target.value)} style={{width:"100%",padding:"10px 12px",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:13}}>
                    <option value="">General workout</option>
                    {[...clients].filter(c=>c.active&&!c.former).sort((a,b)=>a.name.localeCompare(b.name)).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {/* Exercise picker */}
            <div className="section">
              <div className="section-header"><span className="section-title">Exercise Library</span></div>
              <div className="section-body" style={{padding:"12px"}}>
                <input value={exSearch} onChange={e=>setExSearch(e.target.value)} placeholder="Search exercises..." style={{width:"100%",padding:"8px 12px",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:12,outline:"none",boxSizing:"border-box",marginBottom:10}} />
                <div style={{maxHeight:400,overflowY:"auto"}}>
                  {Object.entries(library||{}).map(([group, exs]) => {
                    const filtered = exs.filter(e=>!e.startsWith("—") && (!exSearch || e.toLowerCase().includes(exSearch.toLowerCase()))).sort((a,b)=>a.localeCompare(b));
                    if (filtered.length === 0) return null;
                    return (
                      <div key={group}>
                        <div onClick={()=>setExpandedGroup(expandedGroup===group?null:group)} style={{padding:"6px 10px",fontSize:11,fontWeight:700,color:"var(--accent)",letterSpacing:1.5,cursor:"pointer",userSelect:"none",display:"flex",justifyContent:"space-between"}}>
                          <span>{group}</span><span>{expandedGroup===group||exSearch?"▲":"▼"}</span>
                        </div>
                        {(expandedGroup===group||exSearch) && filtered.map(ex => {
                          const added = manualExercises.find(e=>e.exercise===ex);
                          return (
                            <div key={ex} onClick={()=>added?removeManualExercise(ex):addManualExercise(ex,group)} style={{
                              padding:"7px 12px",fontSize:12,cursor:"pointer",userSelect:"none",
                              background:added?"#3ec9c920":"transparent",
                              color:added?"var(--accent)":"var(--text)",
                              borderLeft:added?"3px solid var(--accent)":"3px solid transparent",
                              transition:"all 0.1s"
                            }}>
                              {added?"✓ ":""}{ex}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected exercises */}
            <div className="section">
              <div className="section-header">
                <span className="section-title">Selected ({manualExercises.length})</span>
                {manualExercises.length > 0 && <button className="btn-secondary" style={{padding:"4px 12px",fontSize:11}} onClick={()=>{setManualExercises([]);setSupersetPending(null);}}>Clear all</button>}
              </div>
              {supersetPending && (
                <div style={{background:"#3ec9c918",border:"1px solid var(--accent)",borderRadius:6,margin:"0 8px 8px",padding:"8px 12px",fontSize:12,color:"var(--accent)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>⚡ Pick an exercise from the library to superset with <strong>{supersetPending}</strong></span>
                  <span onClick={()=>setSupersetPending(null)} style={{cursor:"pointer",fontSize:16,marginLeft:8}}>✕</span>
                </div>
              )}
              <div className="section-body" style={{padding:"8px",maxHeight:500,overflowY:"auto"}}>
                {manualExercises.length === 0 ? (
                  <div style={{textAlign:"center",padding:"32px 16px",color:"var(--muted)",fontSize:12}}>Click exercises on the left to add them</div>
                ) : (() => {
                  // Group into renderable rows: solo exercises or superset pairs
                  const rendered = [];
                  const seen = new Set();
                  manualExercises.forEach((ex, idx) => {
                    if (seen.has(ex.exercise)) return;
                    seen.add(ex.exercise);
                    if (ex.supersetId) {
                      const partnerIdx = manualExercises.findIndex((e,i) => e.supersetId === ex.supersetId && e.exercise !== ex.exercise);
                      const partner = manualExercises[partnerIdx];
                      if (partner && !seen.has(partner.exercise)) {
                        seen.add(partner.exercise);
                        rendered.push({ type:"superset", a:ex, aIdx:idx, b:partner, bIdx:partnerIdx, supersetId:ex.supersetId });
                        return;
                      }
                    }
                    rendered.push({ type:"solo", ex, idx });
                  });

                  return rendered.map((row, ri) => {
                    if (row.type === "solo") {
                      const isLast = ri === rendered.length - 1;
                      return (
                        <div key={row.ex.exercise} style={{background:"var(--charcoal)",border:`1px solid ${supersetPending===row.ex.exercise?"var(--accent)":"var(--border)"}`,borderRadius:8,marginBottom:8,overflow:"hidden"}}>
                          <ExRow ex={row.ex} idx={row.idx} showMoveUp={ri>0} showMoveDown={!isLast} onUpdate={updateManualExercise} onRemove={removeManualExercise} onMove={moveExercise} />
                          <div style={{borderTop:"1px solid var(--border)",padding:"6px 12px",display:"flex",alignItems:"center",gap:8}}>
                            <button onClick={()=>setSupersetPending(supersetPending===row.ex.exercise?null:row.ex.exercise)}
                              style={{background:supersetPending===row.ex.exercise?"var(--accent)":"transparent",border:`1px solid ${supersetPending===row.ex.exercise?"var(--accent)":"var(--border)"}`,color:supersetPending===row.ex.exercise?"var(--black)":"var(--muted)",borderRadius:4,padding:"3px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>
                              ⚡ Superset
                            </button>
                            <span style={{fontSize:10,color:"var(--muted)"}}>pair with another exercise</span>
                          </div>
                        </div>
                      );
                    }
                    // Superset card — split in 2
                    const isLast = ri === rendered.length - 1;
                    return (
                      <div key={row.supersetId} style={{border:"1px solid var(--accent)",borderRadius:8,marginBottom:8,overflow:"hidden",background:"var(--charcoal)"}}>
                        <div style={{background:"#3ec9c922",padding:"4px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{fontSize:10,fontWeight:700,color:"var(--accent)",letterSpacing:1.5}}>⚡ SUPERSET</span>
                          <button onClick={()=>unlinkSuperset(row.supersetId)}
                            style={{background:"transparent",border:"1px solid var(--accent2)",color:"var(--accent)",borderRadius:4,padding:"2px 8px",fontSize:10,cursor:"pointer"}}>
                            Unlink
                          </button>
                        </div>
                        <div style={{display:"flex",gap:0}}>
                          <div style={{flex:1,borderRight:"2px solid var(--accent2)"}}>
                            <ExRow ex={row.a} idx={row.aIdx} showMoveUp={ri>0} showMoveDown={false} onUpdate={updateManualExercise} onRemove={removeManualExercise} onMove={moveExercise} />
                          </div>
                          <div style={{width:20,display:"flex",alignItems:"center",justifyContent:"center",background:"#3ec9c911",flexShrink:0}}>
                            <span style={{fontSize:12,color:"var(--accent)",fontWeight:700}}>⚡</span>
                          </div>
                          <div style={{flex:1,borderLeft:"2px solid var(--accent2)"}}>
                            <ExRow ex={row.b} idx={row.bIdx} showMoveUp={false} showMoveDown={!isLast} onUpdate={updateManualExercise} onRemove={removeManualExercise} onMove={moveExercise} />
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          <div style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap",alignItems:"center"}}>
            <button className="btn-primary" style={{width:"auto",padding:"14px 32px",fontSize:15,opacity:(!manualTitle.trim()||manualExercises.length===0)?0.5:1}}
              onClick={saveManual} disabled={!manualTitle.trim()||manualExercises.length===0}>
              💾 {editingWorkoutId ? "Update Workout" : `Save Workout (${manualExercises.length} exercises)`}
            </button>
            <button className="btn-secondary" style={{width:"auto",padding:"14px 20px",fontSize:14}} onClick={saveDraft}>
              📝 Save Draft
            </button>
            {(manualTitle || manualExercises.length > 0) && (
              <button className="btn-secondary" style={{width:"auto",padding:"14px 20px",fontSize:14,color:"var(--red)",borderColor:"var(--red)"}} onClick={clearDraft}>
                Clear
              </button>
            )}
          </div>
        </>
      ) : (
        <div>
          {savedWorkouts.length === 0 ? (
            <div style={{textAlign:"center",padding:"48px",color:"var(--muted)"}}>
              <div style={{fontSize:32,marginBottom:12}}>📋</div>
              No saved workouts yet — generate one and hit Save.
            </div>
          ) : savedWorkouts.map(w => (
            <WorkoutCard key={w.id} w={w} showDelete={true} onDelete={()=>deleteSaved(w.id)} onEdit={loadForEdit} />
          ))}
        </div>
      )}
    </>
  );
}

function TrainerBluFAQ({ bluFAQ, setBluFAQ }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editIdx, setEditIdx] = useState(null);

  const save = () => {
    if (!question.trim() || !answer.trim()) return;
    let updated;
    if (editIdx !== null) {
      updated = bluFAQ.map((f,i) => i === editIdx ? { question: question.trim(), answer: answer.trim() } : f);
      setEditIdx(null);
    } else {
      updated = [...bluFAQ, { question: question.trim(), answer: answer.trim() }];
    }
    setBluFAQ(updated);
    try { localStorage.setItem("ml_blu_faq", JSON.stringify(updated)); } catch {}
    setQuestion(""); setAnswer("");
  };

  const remove = (i) => {
    const updated = bluFAQ.filter((_,idx) => idx !== i);
    setBluFAQ(updated);
    try { localStorage.setItem("ml_blu_faq", JSON.stringify(updated)); } catch {}
  };

  const startEdit = (i) => {
    setQuestion(bluFAQ[i].question);
    setAnswer(bluFAQ[i].answer);
    setEditIdx(i);
  };

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">BLU FAQ</div>
        <div className="page-subtitle">Build responses Blu gives to all clients — saves automatically and deploys instantly</div>
      </div>

      <div className="section">
        <div className="section-header"><span className="section-title">{editIdx !== null ? "Edit Response" : "Add New Response"}</span></div>
        <div className="section-body" style={{display:"flex",flexDirection:"column",gap:12}}>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1.5,marginBottom:6}}>Question clients might ask</div>
            <input
              value={question}
              onChange={e=>setQuestion(e.target.value)}
              placeholder='e.g. "What should I eat before a session?"'
              style={{width:"100%",padding:"10px 14px",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:13,outline:"none",boxSizing:"border-box"}}
            />
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1.5,marginBottom:6}}>Blu's answer</div>
            <textarea
              value={answer}
              onChange={e=>setAnswer(e.target.value)}
              placeholder='e.g. "Have a light meal 1-2 hours before — something with protein and carbs. Avoid heavy or greasy food!"'
              rows={4}
              style={{width:"100%",padding:"10px 14px",background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:6,color:"var(--text)",fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box",lineHeight:1.5}}
            />
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="btn-primary" style={{width:"auto",padding:"10px 24px"}} onClick={save}>
              {editIdx !== null ? "Update Response" : "Add Response"}
            </button>
            {editIdx !== null && (
              <button className="btn-secondary" style={{padding:"10px 20px"}} onClick={()=>{setEditIdx(null);setQuestion("");setAnswer("");}}>Cancel</button>
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">Active Responses ({bluFAQ.length})</span>
          <span style={{fontSize:12,color:"var(--muted)"}}>Deployed to all client profiles</span>
        </div>
        {bluFAQ.length === 0 ? (
          <div style={{padding:"32px",textAlign:"center",color:"var(--muted)",fontSize:13}}>
            <div style={{fontSize:32,marginBottom:12}}>🐾</div>
            No responses yet — add your first one above and Blu will use it with all clients.
          </div>
        ) : (
          <div style={{padding:"12px 20px",display:"flex",flexDirection:"column",gap:10}}>
            {bluFAQ.map((f,i) => (
              <div key={i} style={{background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:8,padding:"14px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--accent)",marginBottom:6}}>Q: {f.question}</div>
                    <div style={{fontSize:12,color:"var(--text)",lineHeight:1.6}}>A: {f.answer}</div>
                  </div>
                  <div style={{display:"flex",gap:8,flexShrink:0}}>
                    <button className="btn-secondary" style={{padding:"4px 12px",fontSize:11}} onClick={()=>startEdit(i)}>Edit</button>
                    <button className="btn-secondary" style={{padding:"4px 12px",fontSize:11,color:"var(--red)",borderColor:"var(--red)"}} onClick={()=>remove(i)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


function ClientBlu({ client, mySessions, sessionsLeft, bluFAQ, assignedWorkouts, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role:"assistant", text:`Hey ${client?.name?.split(" ")[0] || "there"}! 🐾 I'm Blu. Ask me about your schedule, upcoming sessions, or anything about your training!` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const today = new Date(); today.setHours(0,0,0,0);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role:"user", text:userMsg }]);
    setLoading(true);
    try {
      const upcoming = mySessions.filter(s=>s.date>=todayStr).slice(0,10);
      const past = mySessions.filter(s=>s.date<todayStr).slice(-5);
      const upcomingStr = upcoming.length > 0
        ? upcoming.map(s=>`${s.date} at ${s.time}`).join(", ")
        : "No upcoming sessions booked yet.";
      const pastStr = past.length > 0
        ? past.map(s=>`${s.date} at ${s.time}`).join(", ")
        : "None.";

      const assignedStr = assignedWorkouts && assignedWorkouts.length > 0
        ? assignedWorkouts.map((w,i) => `${i+1}. "${w.title}" (${w.focus||""} · ${w.goal||""}) — sent ${w.sentAt||""}`).join("\n")
        : "No workouts assigned yet.";

      const faqStr = bluFAQ && bluFAQ.length > 0
        ? "\n\nFrequently asked questions — use these answers when relevant:\n" + bluFAQ.map((f,i) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")
        : "";

      const systemPrompt = `You are Blu, a friendly gym assistant dog 🐾 helping a client named ${client?.name || "the client"}.
You know their personal schedule and can answer questions about it.

Client info:
- Name: ${client?.name || "Unknown"}
- Sessions left: ${sessionsLeft}
- Upcoming sessions: ${upcomingStr}
- Recent past sessions: ${pastStr}
- Today: ${todayStr}

You can help with:
- Telling them when their next session is
- How many sessions they have left
- Explaining their assigned workouts — tell clients to tap the workout name at the top of this chat to expand the full exercise list
- Motivational messages and workout tips
- Questions about their training schedule

Workouts assigned to this client by their trainer:
${assignedStr}${faqStr}

Keep responses short, friendly, and encouraging. You're like a supportive gym buddy.
Do NOT discuss other clients or trainer-only data.`;

      const response = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:500,
          system: systemPrompt,
          messages: [
            ...messages.map(m=>({ role:m.role==="assistant"?"assistant":"user", content:m.text })),
            { role:"user", content:userMsg }
          ]
        })
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || "Woof! Something went wrong, try again.";
      setMessages(prev => [...prev, { role:"assistant", text }]);
    } catch {
      setMessages(prev => [...prev, { role:"assistant", text:"Woof! Couldn't connect. Try again!" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="blu-panel-client" style={{position:"fixed",bottom:90,right:24,width:340,height:480,background:"var(--panel)",border:"1px solid var(--border)",borderRadius:12,display:"flex",flexDirection:"column",boxShadow:"0 8px 40px rgba(0,0,0,0.5)",zIndex:1000,overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--charcoal)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center"}}><BluIcon size={20} /></div>
              <div>
                <div className="bebas" style={{fontSize:16,color:"var(--accent)",letterSpacing:1}}>BLU</div>
                <div style={{fontSize:10,color:"var(--muted)"}}>Your training buddy 🐾</div>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"var(--muted)",fontSize:18,cursor:"pointer"}}>✕</button>
          </div>
          {assignedWorkouts && assignedWorkouts.length > 0 && (
            <div style={{borderBottom:"1px solid var(--border)",padding:"10px 14px",background:"#3ec9c908"}}>
              <button onClick={()=>{ onNavigate("programs"); setOpen(false); }}
                style={{width:"100%",background:"var(--accent)",border:"none",color:"var(--black)",borderRadius:8,padding:"10px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                ⚡ My Programs ({assignedWorkouts.length})
              </button>
            </div>
          )}
          <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
            {messages.map((m,i) => (
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:12}}>
                {m.role==="assistant" && <div style={{width:26,height:26,borderRadius:"50%",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginRight:8,marginTop:2}}><BluIcon size={16} /></div>}
                <div style={{maxWidth:"78%",padding:"10px 13px",borderRadius:m.role==="user"?"10px 10px 2px 10px":"10px 10px 10px 2px",background:m.role==="user"?"var(--accent)":"var(--charcoal)",color:m.role==="user"?"var(--black)":"var(--text)",fontSize:12,lineHeight:1.6,whiteSpace:"pre-wrap",border:m.role==="assistant"?"1px solid var(--border)":"none"}}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center"}}><BluIcon size={16} /></div>
                <div style={{padding:"10px 13px",borderRadius:"10px 10px 10px 2px",background:"var(--charcoal)",border:"1px solid var(--border)",fontSize:12,color:"var(--muted)"}}>Woof...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{padding:"12px",borderTop:"1px solid var(--border)",display:"flex",gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask Blu anything..." disabled={loading} style={{flex:1,padding:"10px 12px",fontSize:13,background:"var(--charcoal)",border:"1px solid var(--border)",borderRadius:4,color:"var(--text)",outline:"none"}} />
            <button className="btn-primary" style={{width:"auto",padding:"10px 14px",fontSize:13,opacity:loading?0.5:1}} onClick={sendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      )}
      <div className="blu-bubble-client" onClick={()=>setOpen(o=>!o)} style={{position:"fixed",bottom:72,right:24,width:50,height:50,borderRadius:"50%",background:open?"var(--charcoal)":"var(--accent)",border:`2px solid ${open?"var(--border)":"var(--accent)"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:1001,boxShadow:"0 4px 20px rgba(62,201,201,0.4)",transition:"all 0.2s",userSelect:"none"}}>
        {open ? <span style={{color:"var(--muted)",fontSize:16}}>✕</span> : <BluIcon size={26} />}
      </div>
    </>
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

  const used = calcSessionsUsed(client, mySessions);
  const pct = client.sessionsTotal > 0 ? Math.round((used/client.sessionsTotal)*100) : 0;
  const left = Math.max(0, client.sessionsTotal - used);

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">MY SCHEDULE</div>
        <div className="page-subtitle">Your sessions, {client.name.split(" ")[0]}</div>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Sessions" value={mySessions.length} sub="scheduled" />
        <StatCard label="Sessions Left" value={left} sub={`of ${client.sessionsTotal} purchased`} accent={left<5?"red":undefined} />
        <StatCard label="Sessions Used" value={used} sub="completed" />
        <StatCard label="Completion" value={`${pct}%`} sub="of package used" />
      </div>

      <div className="section" style={{marginBottom:16}}>
        <div className="section-header"><span className="section-title">Session Package</span></div>
        <div className="section-body">
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:13}}>
            <span style={{color:"var(--muted)"}}>Progress</span>
            <span>{used} / {client.sessionsTotal} sessions</span>
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

  // Build list of upcoming Mondays through end of year
  const getUpcomingWeeks = () => {
    const today = new Date(); today.setHours(0,0,0,0);
    const dow = today.getDay();
    const daysUntilNextMon = dow === 1 ? 7 : (8 - dow) % 7 || 7;
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    const weeks = [];
    let w = 0;
    while (true) {
      const monday = new Date(today);
      monday.setDate(today.getDate() + daysUntilNextMon + w * 7);
      if (monday > endOfYear) break;
      weeks.push(monday);
      w++;
    }
    return weeks;
  };

  const upcomingWeeks = getUpcomingWeeks();

  // Group weeks by month
  const MONTH_NAMES_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weeksByMonth = {};
  upcomingWeeks.forEach(monday => {
    const mk = monday.getMonth();
    if (!weeksByMonth[mk]) weeksByMonth[mk] = [];
    weeksByMonth[mk].push(monday);
  });
  const availableMonths = Object.keys(weeksByMonth).map(Number);

  const [selectedMonth, setSelectedMonth] = useState(() => upcomingWeeks[0]?.getMonth() ?? new Date().getMonth());
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

      {/* Month selector */}
      <div className="section">
        <div className="section-header"><span className="section-title">Select a Month</span></div>
        <div className="section-body">
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {availableMonths.map(m => {
              const hasSubmitted = (weeksByMonth[m]||[]).some(mon => allData[weekKey(mon)]?.saved);
              const isSelected = m === selectedMonth;
              return (
                <div key={m} onClick={()=>{ setSelectedMonth(m); setSelectedWeek(weeksByMonth[m][0]); }} style={{
                  padding:"12px 20px",borderRadius:4,cursor:"pointer",minWidth:110,textAlign:"center",
                  border:`2px solid ${isSelected?"var(--accent)":hasSubmitted?"var(--green)":"var(--border)"}`,
                  background:isSelected?"var(--accent)":hasSubmitted?"#22c55e10":"var(--charcoal)",
                  color:isSelected?"var(--black)":hasSubmitted?"var(--green)":"var(--text)",
                  transition:"all 0.15s",userSelect:"none"
                }}>
                  <div style={{fontWeight:700,fontSize:15}}>{MONTH_NAMES_FULL[m]}</div>
                  {hasSubmitted && <div style={{fontSize:10,marginTop:3,opacity:0.8}}>✓ submitted</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Week selector for selected month */}
      <div className="section">
        <div className="section-header"><span className="section-title">Select a Week</span></div>
        <div className="section-body">
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {(weeksByMonth[selectedMonth]||[]).map((monday, i) => {
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
                    {hasData ? `✓ ${allData[wkk].trainingsWanted||"?"} sessions · ${Object.values(allData[wkk].slots).reduce((a,v)=>a+Object.keys(v).length,0)} slots` : "Tap to fill in"}
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


// ─── Client Progress ──────────────────────────────────────────────────────────
function ClientProgress({ client, mySessions }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client?.id) { setLoading(false); return; }
    sbFetch(`progress_history?select=*&clientId=eq.${client.id}&order=date.asc`)
      .then(rows => { setHistory(Array.isArray(rows) ? rows.filter(r => r.exercise && !r.exercise.startsWith("__")) : []); setLoading(false); })
      .catch(() => { setHistory([]); setLoading(false); });
  }, [client?.id]);

  const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const formatDate = (d) => {
    if (!d) return "";
    const parts = d.split(/[\/\-]/);
    if (parts.length < 3) return d;
    try {
      const date = new Date(d.includes("/") ? d : d + "T12:00:00");
      if (isNaN(date)) return d;
      return MONTH_NAMES[date.getMonth()] + " " + date.getDate();
    } catch(e) { return d; }
  };

  const formatMonth = (ym) => {
    try {
      const [y, m] = ym.split("-");
      return MONTH_NAMES[parseInt(m)-1] + " " + y.slice(2);
    } catch(e) { return ym; }
  };

  // Sessions by month
  const sessionsByMonth = {};
  (mySessions||[]).forEach(s => {
    if (!s.date) return;
    const month = s.date.slice(0, 7);
    sessionsByMonth[month] = (sessionsByMonth[month] || 0) + 1;
  });
  const sessionMonths = Object.keys(sessionsByMonth).sort();

  // Group history by exercise
  const byExercise = {};
  history.forEach(row => {
    if (!byExercise[row.exercise]) byExercise[row.exercise] = [];
    byExercise[row.exercise].push(row);
  });
  const exercises = Object.keys(byExercise).sort();

  const BarChart = ({ data, color }) => {
    if (!data || data.length === 0) return null;
    const max = Math.max(...data.map(d => d.value), 1);
    return (
      <div style={{display:"flex",alignItems:"flex-end",gap:4,height:72,marginTop:8}}>
        {data.map((d, i) => (
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,minWidth:0}}>
            <div style={{fontSize:9,color:"var(--muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"100%"}}>{d.value}</div>
            <div style={{width:"100%",borderRadius:2,background:color,height:Math.max((d.value/max)*52,2)+"px",opacity:0.9}} />
            <div style={{fontSize:8,color:"var(--muted)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{d.label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="page-header">
        <div className="bebas page-title">MY PROGRESS</div>
        <div className="page-subtitle">Your fitness journey</div>
      </div>

      <div className="section" style={{marginBottom:20}}>
        <div className="section-header">
          <span className="section-title">Sessions Attended</span>
          <span style={{fontSize:12,color:"var(--accent)",fontWeight:600}}>{(mySessions||[]).length} total</span>
        </div>
        <div className="section-body">
          {sessionMonths.length === 0
            ? <div style={{color:"var(--muted)",fontSize:13}}>No sessions recorded yet.</div>
            : <BarChart data={sessionMonths.map(m=>({label:formatMonth(m),value:sessionsByMonth[m]}))} color="var(--accent)" />
          }
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">Exercise History</span>
        </div>
        <div className="section-body">
          {loading
            ? <div style={{color:"var(--muted)",fontSize:13}}>Loading...</div>
            : exercises.length === 0
            ? <div style={{color:"var(--muted)",fontSize:13}}>No exercise data yet. Your trainer will log your progress after sessions.</div>
            : <div style={{display:"flex",flexDirection:"column",gap:28}}>
                {exercises.map(ex => {
                  const rows = byExercise[ex];
                  const weightRows = rows.filter(r => r.weight && String(r.weight).trim() !== "" && !isNaN(parseFloat(r.weight)));
                  const repsRows = rows.filter(r => r.reps && String(r.reps).trim() !== "" && !isNaN(parseFloat(r.reps)));
                  const last = rows[rows.length-1];
                  return (
                    <div key={ex}>
                      <div style={{fontWeight:600,fontSize:14,color:"var(--text)",marginBottom:6}}>{ex}</div>
                      {weightRows.length > 0 && (
                        <div style={{marginBottom:10}}>
                          <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:1,color:"var(--muted)",marginBottom:2}}>Weight</div>
                          <BarChart data={weightRows.map(r=>({label:formatDate(r.date),value:parseFloat(r.weight)}))} color="var(--accent)" />
                        </div>
                      )}
                      {repsRows.length > 0 && (
                        <div>
                          <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:1,color:"var(--muted)",marginBottom:2}}>Reps</div>
                          <BarChart data={repsRows.map(r=>({label:formatDate(r.date),value:parseFloat(r.reps)}))} color="var(--green)" />
                        </div>
                      )}
                      {last && (
                        <div style={{marginTop:6,fontSize:11,color:"var(--muted)"}}>
                          Last: {formatDate(last.date)}{last.sets ? ` · ${last.sets} sets` : ""}{last.reps ? ` · ${last.reps} reps` : ""}{last.weight ? ` · ${last.weight}` : ""}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
          }
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
      <div style={{display:"flex",flexDirection:"column",gap:16,maxWidth:"100%"}}>
        <div className="section">
          <div className="section-header"><span className="section-title">Profile</span></div>
          <div className="section-body">
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20,flexWrap:"wrap"}}>
              <div className="user-avatar" style={{width:56,height:56,fontSize:20,flexShrink:0}}>{client.name.split(" ").map(x=>x[0]).join("")}</div>
              <div style={{minWidth:0}}>
                <div style={{fontWeight:600,fontSize:16,wordBreak:"break-word"}}>{client.name}</div>
                <div style={{color:"var(--muted)",fontSize:13,wordBreak:"break-all"}}>{client.email}</div>
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
    <>
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
          <div className="user-avatar">{(user.name||"?")[0]}</div>
          <div className="user-name">{(user.name||"").split(" ")[0]}</div>
          <button className="logout-btn" title="Log out" onClick={onLogout}>⏻</button>
        </div>
      </div>
      {/* Bottom nav — only visible on mobile via CSS */}
      <div className="bottom-nav" style={{display:"none"}}>
        {nav.map(n=>(
          <button key={n.id} className={`bottom-nav-item${tab===n.id?" active":""}`} onClick={()=>setTab(n.id)}>
            <span className="bottom-nav-icon">{n.icon}</span>
            {n.label}
          </button>
        ))}
        <button className="bottom-nav-item" onClick={onLogout}>
          <span className="bottom-nav-icon">⏻</span>
          Logout
        </button>
      </div>
    </>
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
