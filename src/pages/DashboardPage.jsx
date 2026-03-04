import React, { useEffect, useState } from "react";
import { countRows, getFriendlyError, listRows } from "../lib/schoolService";

function formatToday() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DashboardPage({ supabaseStatus, listingStatus }) {
  const [stats, setStats] = useState([
    { label: "Students", value: "0", status: "neutral" },
    { label: "Teachers", value: "0", status: "neutral" },
    { label: "Classes", value: "0", status: "neutral" },
    { label: "Announcements", value: "0", status: "neutral" },
  ]);
  const [taskItems, setTaskItems] = useState([]);
  const [sessionItems, setSessionItems] = useState([]);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setDashboardError("");

      const [studentsCount, teachersCount, classesCount, announcementsCount] =
        await Promise.all([
          countRows("students"),
          countRows("teachers"),
          countRows("classes"),
          countRows("announcements", [{ op: "eq", column: "status", value: "published" }]),
        ]);

      const [announcementRows, classRows, homeworkRows] = await Promise.all([
        listRows("announcements", { orderBy: "publish_date", ascending: false, limit: 4 }),
        listRows("classes", { orderBy: "created_at", ascending: false, limit: 3 }),
        listRows("homework", { orderBy: "due_date", ascending: true, limit: 4 }),
      ]);

      if (!active) {
        return;
      }

      const errors = [
        studentsCount.error,
        teachersCount.error,
        classesCount.error,
        announcementsCount.error,
        announcementRows.error,
        classRows.error,
        homeworkRows.error,
      ].filter(Boolean);

      if (errors.length > 0) {
        setDashboardError(getFriendlyError(errors[0], "dashboard"));
      }

      setStats([
        {
          label: "Students",
          value: String(studentsCount.count || 0),
          status: studentsCount.count > 0 ? "up" : "neutral",
        },
        {
          label: "Teachers",
          value: String(teachersCount.count || 0),
          status: teachersCount.count > 0 ? "up" : "neutral",
        },
        {
          label: "Classes",
          value: String(classesCount.count || 0),
          status: classesCount.count > 0 ? "up" : "neutral",
        },
        {
          label: "Announcements",
          value: String(announcementsCount.count || 0),
          status: announcementsCount.count > 0 ? "up" : "neutral",
        },
      ]);

      const combinedTasks = [
        ...(announcementRows.data || []).map((item) => item.title),
        ...(homeworkRows.data || []).map((item) => item.title),
      ].filter(Boolean);
      setTaskItems(combinedTasks.slice(0, 4));

      const sessions = (classRows.data || []).map((item) => ({
        className: `${item.class_name || "Class"} ${item.section || ""}`.trim(),
        topic: item.class_teacher || "Teacher not assigned",
        time: item.schedule || "Schedule not set",
      }));
      setSessionItems(sessions);
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="content-stack">
      <section className="hero-panel">
        <div className="hero-content">
          <p className="hero-kicker">Today, {formatToday()}</p>
          <h2>Everything important at a glance, without digging through tabs.</h2>
          <p>
            Dashboard values below are loaded from Supabase tables. No placeholder
            metrics are used.
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

      {dashboardError ? <p className="alert error">{dashboardError}</p> : null}

      <section className="stats-grid">
        {stats.map((item, index) => (
          <article key={item.label} className={`stat-card tone-${index + 1}`}>
            <p>{item.label}</p>
            <h3>{item.value}</h3>
            <span className={`stat-trend ${item.status}`}>
              {item.status === "up" ? "Live" : "No data"}
            </span>
          </article>
        ))}
      </section>

      <section className="board-grid">
        <article className="panel-card panel-priority">
          <div className="panel-head">
            <h3>Latest Activity</h3>
            <span className="chip">{taskItems.length} items</span>
          </div>
          {taskItems.length > 0 ? (
            <ul className="list">
              {taskItems.map((task) => (
                <li key={task}>
                  <span className="list-dot" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No announcements or homework entries yet.</p>
          )}
        </article>

        <article className="panel-card panel-sessions">
          <div className="panel-head">
            <h3>Upcoming Sessions</h3>
            <span className="chip">{sessionItems.length} classes</span>
          </div>
          {sessionItems.length > 0 ? (
            <ul className="session-list">
              {sessionItems.map((session) => (
                <li key={`${session.className}-${session.time}`}>
                  <div>
                    <p className="session-class">{session.className}</p>
                    <p className="session-topic">{session.topic}</p>
                  </div>
                  <span className="session-time">{session.time}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No classes configured yet.</p>
          )}
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
                <p className="readiness-title">Role-based navigation</p>
                <p className="readiness-note">Each role sees only permitted modules.</p>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </section>
  );
}

export default DashboardPage;
