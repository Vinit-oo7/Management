import React from "react";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/", icon: "DB", tone: "coral", end: true },
  { name: "Students", path: "/students", icon: "ST", tone: "teal" },
  { name: "Teachers", path: "/teachers", icon: "TC", tone: "violet" },
  { name: "Classes", path: "/classes", icon: "CL", tone: "citrus" },
  { name: "Attendance", path: "/attendance", icon: "AT", tone: "berry" },
  { name: "Homework", path: "/homework", icon: "HW", tone: "ocean" },
  { name: "Announcements", path: "/announcements", icon: "AN", tone: "gold" },
  { name: "Settings", path: "/settings", icon: "SE", tone: "sky" },
];

const Sidebar = ({ open, setOpen }) => {
  const handleNavItemClick = () => {
    if (window.innerWidth < 960) {
      setOpen(false);
    }
  };

  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-head">
        <div className="brand-mark">AS</div>
        <div className="brand-copy">
          <p>Angel School</p>
          <span>Admin Suite</span>
        </div>
        <button
          type="button"
          className="sidebar-close"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        >
          x
        </button>
      </div>

      <nav className="sidebar-nav">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            onClick={handleNavItemClick}
            className={({ isActive }) =>
              `nav-item ${item.tone} ${isActive ? "active" : ""}`.trim()
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">
        <p>Term Progress</p>
        <strong>72% complete</strong>
        <span>Final reports unlock in 18 days.</span>
      </div>
    </aside>
  );
};

export default Sidebar;
