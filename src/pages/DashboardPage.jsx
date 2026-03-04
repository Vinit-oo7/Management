import React from "react";

const stats = [
  { label: "Total Students", value: "1,842", trend: "+6.4%", status: "up" },
  { label: "Teacher Presence", value: "97.2%", trend: "+1.2%", status: "up" },
  { label: "Classrooms Live", value: "54", trend: "-2", status: "down" },
  { label: "Pending Homework", value: "127", trend: "Today", status: "neutral" },
];

const tasks = [
  "Publish March exam schedule",
  "Review 3 attendance alerts",
  "Approve fee waiver requests",
  "Send parent newsletter draft",
];

const sessions = [
  { className: "Class 10 A", topic: "Physics Lab", time: "09:30 AM" },
  { className: "Class 8 C", topic: "Math Revision", time: "11:15 AM" },
  { className: "Class 12 B", topic: "English Debate", time: "01:45 PM" },
];

function DashboardPage({ supabaseStatus, listingStatus }) {
  return (
    <section className="content-stack">
      <section className="hero-panel">
        <div className="hero-content">
          <p className="hero-kicker">Today, March 5, 2026</p>
          <h2>Everything important at a glance, without digging through tabs.</h2>
          <p>
            Track attendance, classes, and communication from one place. The panel is
            tuned for fast actions with fewer clicks.
          </p>
          <div className="hero-actions">
            <button type="button" className="solid-btn">
              Start Attendance
            </button>
            <button type="button" className="ghost-btn">
              Open Timetable
            </button>
          </div>
        </div>

        <div className="hero-badge">
          <p className="hero-badge-label">Published Products</p>
          <p className="hero-badge-value">{listingStatus.count}</p>
          <p className="hero-badge-note">{listingStatus.message}</p>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((item, index) => (
          <article key={item.label} className={`stat-card tone-${index + 1}`}>
            <p>{item.label}</p>
            <h3>{item.value}</h3>
            <span className={`stat-trend ${item.status}`}>{item.trend}</span>
          </article>
        ))}
      </section>

      <section className="board-grid">
        <article className="panel-card panel-priority">
          <div className="panel-head">
            <h3>Priority Queue</h3>
            <span className="chip">4 actions</span>
          </div>
          <ul className="list">
            {tasks.map((task) => (
              <li key={task}>
                <span className="list-dot" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel-card panel-sessions">
          <div className="panel-head">
            <h3>Upcoming Sessions</h3>
            <span className="chip">Next 3</span>
          </div>
          <ul className="session-list">
            {sessions.map((session) => (
              <li key={`${session.className}-${session.time}`}>
                <div>
                  <p className="session-class">{session.className}</p>
                  <p className="session-topic">{session.topic}</p>
                </div>
                <span className="session-time">{session.time}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel-card panel-readiness">
          <div className="panel-head">
            <h3>Publish Readiness</h3>
            <span className="chip">Live checks</span>
          </div>
          <ul className="readiness-list">
            <li>
              <span className={`readiness-dot ${supabaseStatus.state === "live" ? "ok" : "fail"}`} />
              <div>
                <p className="readiness-title">Supabase API</p>
                <p className="readiness-note">{supabaseStatus.message}</p>
              </div>
            </li>
            <li>
              <span className={`readiness-dot ${listingStatus.state === "live" ? "ok" : "fail"}`} />
              <div>
                <p className="readiness-title">Sell/Publish data</p>
                <p className="readiness-note">{listingStatus.message}</p>
              </div>
            </li>
            <li>
              <span className="readiness-dot ok" />
              <div>
                <p className="readiness-title">Responsive frontend</p>
                <p className="readiness-note">Dashboard is mobile + desktop ready.</p>
              </div>
            </li>
            <li>
              <span className="readiness-dot ok" />
              <div>
                <p className="readiness-title">Navigation and routing shell</p>
                <p className="readiness-note">Sidebar toggle is active and stable.</p>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </section>
  );
}

export default DashboardPage;
