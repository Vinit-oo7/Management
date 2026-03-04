import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/SlideBar";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import ClassesPage from "./pages/ClassesPage";
import AttendancePage from "./pages/AttendancePage";
import HomeworkPage from "./pages/HomeworkPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import SettingsPage from "./pages/SettingsPage";
import { checkSupabaseConnection } from "./lib/supabaseClient";
import { getPublishedProducts } from "./lib/marketplaceService";
import "./App.css";

const pageMetaMap = [
  { match: (path) => path === "/", eyebrow: "School Operations", title: "Control Center" },
  { match: (path) => path.startsWith("/students"), eyebrow: "Academic Data", title: "Students" },
  { match: (path) => path.startsWith("/teachers"), eyebrow: "Academic Data", title: "Teachers" },
  { match: (path) => path.startsWith("/classes"), eyebrow: "Scheduling", title: "Classes" },
  {
    match: (path) => path.startsWith("/attendance"),
    eyebrow: "Daily Tracking",
    title: "Attendance",
  },
  { match: (path) => path.startsWith("/homework"), eyebrow: "Learning Flow", title: "Homework" },
  {
    match: (path) => path.startsWith("/announcements"),
    eyebrow: "Communication",
    title: "Announcements",
  },
  { match: (path) => path.startsWith("/settings"), eyebrow: "Workspace", title: "Settings" },
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 960 : true,
  );
  const [supabaseStatus, setSupabaseStatus] = useState({
    state: "checking",
    message: "Checking Supabase connection...",
  });
  const [listingStatus, setListingStatus] = useState({
    state: "checking",
    count: 0,
    message: "Checking published products...",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let active = true;

    const testConnection = async () => {
      const result = await checkSupabaseConnection();

      if (!active) {
        return;
      }

      setSupabaseStatus({
        state: result.ok ? "live" : "error",
        message: result.message,
      });
    };

    testConnection();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadPublishedProducts = async () => {
      if (supabaseStatus.state !== "live") {
        setListingStatus({
          state: "blocked",
          count: 0,
          message: "Waiting for Supabase connection.",
        });
        return;
      }

      const { data, error } = await getPublishedProducts();

      if (!active) {
        return;
      }

      if (error) {
        const rawMessage = error.message || "Could not read published products.";
        const message = rawMessage.includes("relation")
          ? "Create products table or set REACT_APP_SUPABASE_PRODUCTS_TABLE."
          : rawMessage;

        setListingStatus({
          state: "error",
          count: 0,
          message,
        });
        return;
      }

      setListingStatus({
        state: "live",
        count: data.length,
        message: `${data.length} published product(s) found.`,
      });
    };

    loadPublishedProducts();

    return () => {
      active = false;
    };
  }, [supabaseStatus.state]);

  const meta = useMemo(() => {
    return pageMetaMap.find((item) => item.match(location.pathname)) || pageMetaMap[0];
  }, [location.pathname]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={`app-shell ${open ? "nav-open" : "nav-closed"}`}>
      <Sidebar open={open} setOpen={setOpen} />
      <button
        type="button"
        className="app-overlay"
        aria-label="Close navigation"
        onClick={() => setOpen(false)}
      />

      <main className="app-main">
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="menu-toggle"
              onClick={handleToggle}
              aria-label={open ? "Collapse navigation" : "Expand navigation"}
              aria-expanded={open}
            >
              <span className="menu-lines">
                <span />
                <span />
                <span />
              </span>
            </button>
            <div className="topbar-copy">
              <p className="eyebrow">{meta.eyebrow}</p>
              <h1>{meta.title}</h1>
            </div>
          </div>

          <div className="topbar-right">
            <span className={`status-pill ${supabaseStatus.state}`}>
              {supabaseStatus.state === "live"
                ? "Supabase Connected"
                : supabaseStatus.state === "checking"
                  ? "Connecting..."
                  : "Connection Needed"}
            </span>
            <button type="button" className="ghost-btn" onClick={() => window.print()}>
              Export Report
            </button>
            <button
              type="button"
              className="solid-btn"
              onClick={() => navigate("/announcements")}
            >
              New Announcement
            </button>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                supabaseStatus={supabaseStatus}
                listingStatus={listingStatus}
              />
            }
          />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/homework" element={<HomeworkPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
