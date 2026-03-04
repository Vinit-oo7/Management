import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { getFriendlyError, listSettings, upsertSettings } from "../lib/schoolService";

const defaultSettings = {
  school_name: "Angel School",
  timezone: "Asia/Kolkata",
  support_email: "support@angelschool.edu",
  contact_number: "+91 90000 00000",
  announcement_footer: "Angel School Administration",
};

const settingFields = [
  { key: "school_name", label: "School Name" },
  { key: "timezone", label: "Timezone" },
  { key: "support_email", label: "Support Email", type: "email" },
  { key: "contact_number", label: "Contact Number" },
  { key: "announcement_footer", label: "Announcement Footer" },
];

function SettingsPage({ canManageSettings }) {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError("");

      const keys = Object.keys(defaultSettings);
      const { data, error: fetchError } = await listSettings(keys);

      if (!active) {
        return;
      }

      if (fetchError) {
        setError(getFriendlyError(fetchError, "app_settings"));
        setLoading(false);
        return;
      }

      const mapped = data.reduce((acc, item) => {
        acc[item.key] = item.value_text;
        return acc;
      }, {});

      setSettings((prev) => ({ ...prev, ...mapped }));
      setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!canManageSettings) {
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const { error: saveError } = await upsertSettings(settings);

    if (saveError) {
      setError(getFriendlyError(saveError, "app_settings"));
      setSaving(false);
      return;
    }

    setSuccess("Settings saved successfully.");
    setSaving(false);
  };

  return (
    <section className="content-stack">
      <article className="panel-card panel-entity">
        <div className="panel-head">
          <h3>Workspace Settings</h3>
          <span className="chip">{user?.role || "user"} role</span>
        </div>
        <p className="muted-copy">
          Theme is saved in local storage for each browser. Organization settings are
          admin-only.
        </p>

        {loading ? <p className="loading-state">Loading settings...</p> : null}
        {error ? <p className="alert error">{error}</p> : null}
        {success ? <p className="alert success">{success}</p> : null}

        <div className="theme-section">
          <div>
            <p className="readiness-title">Dark Mode</p>
            <p className="readiness-note">Stored in local browser storage.</p>
          </div>
          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {isDark ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>

        <form className="entity-form" onSubmit={handleSave}>
          <div className="field-grid">
            {settingFields.map((field) => (
              <label className="field" key={field.key}>
                <span>{field.label}</span>
                <input
                  name={field.key}
                  type={field.type || "text"}
                  value={settings[field.key] || ""}
                  onChange={handleChange}
                  disabled={!canManageSettings}
                />
              </label>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="solid-btn" disabled={saving || !canManageSettings}>
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </article>

      <article className="panel-card panel-readiness">
        <div className="panel-head">
          <h3>Authority Rules</h3>
          <span className="chip">Role Based</span>
        </div>
        <ul className="readiness-list">
          <li>
            <span className="readiness-dot ok" />
            <div>
              <p className="readiness-title">Admin</p>
              <p className="readiness-note">
                Full create/read access on all modules and settings.
              </p>
            </div>
          </li>
          <li>
            <span className="readiness-dot ok" />
            <div>
              <p className="readiness-title">Teacher</p>
              <p className="readiness-note">
                Can manage attendance, homework, announcements. Read-only on classes/students.
              </p>
            </div>
          </li>
          <li>
            <span className="readiness-dot ok" />
            <div>
              <p className="readiness-title">Student</p>
              <p className="readiness-note">
                Dashboard + homework/announcements + personal settings only.
              </p>
            </div>
          </li>
        </ul>
      </article>
    </section>
  );
}

export default SettingsPage;
