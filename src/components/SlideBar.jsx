import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen, navItems, user, onLogout }) => {
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
        {navItems.map((item) => (
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
        <p>Signed in as</p>
        <strong>{user?.name || "-"}</strong>
        <span>{user?.role || "guest"} role</span>
        <button type="button" className="ghost-btn sidebar-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
