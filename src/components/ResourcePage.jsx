import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getFriendlyError, insertRow, listRows } from "../lib/schoolService";

function formatValue(value, type) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (type === "date") {
    try {
      return new Date(value).toLocaleDateString();
    } catch {
      return value;
    }
  }

  return value;
}

function ResourcePage({
  title,
  description,
  tableName,
  orderBy,
  fields,
  columns,
  emptyMessage,
}) {
  const initialFormState = useMemo(() => {
    const entries = fields.map((field) => [field.name, field.defaultValue || ""]);
    return Object.fromEntries(entries);
  }, [fields]);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    setForm(initialFormState);
  }, [initialFormState]);

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await listRows(tableName, {
      orderBy: orderBy || "created_at",
      ascending: false,
      limit: 100,
    });

    if (fetchError) {
      setRows([]);
      setError(getFriendlyError(fetchError, tableName));
      setLoading(false);
      return;
    }

    setRows(data);
    setLoading(false);
  }, [tableName, orderBy]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = fields.reduce((acc, field) => {
      const raw = form[field.name];

      if (raw === "" || raw === undefined || raw === null) {
        return acc;
      }

      acc[field.name] = field.type === "number" ? Number(raw) : raw;
      return acc;
    }, {});

    const { error: insertError } = await insertRow(tableName, payload);

    if (insertError) {
      setError(getFriendlyError(insertError, tableName));
      setSaving(false);
      return;
    }

    setSuccess(`${title.slice(0, -1)} added successfully.`);
    setForm(initialFormState);
    setSaving(false);
    loadRows();
  };

  return (
    <section className="content-stack">
      <article className="panel-card panel-entity">
        <div className="panel-head">
          <h3>{title}</h3>
          <span className="chip">{rows.length} records</span>
        </div>
        <p className="muted-copy">{description}</p>

        {error ? <p className="alert error">{error}</p> : null}
        {success ? <p className="alert success">{success}</p> : null}

        <form className="entity-form" onSubmit={handleSubmit}>
          <div className="field-grid">
            {fields.map((field) => (
              <label className="field" key={field.name}>
                <span>{field.label}</span>

                {field.options ? (
                  <select
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                  >
                    <option value="">Select</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder || ""}
                    rows={3}
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder || ""}
                  />
                )}
              </label>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="solid-btn" disabled={saving}>
              {saving ? "Saving..." : "Add Record"}
            </button>
            <button type="button" className="ghost-btn" onClick={loadRows} disabled={loading}>
              Refresh
            </button>
          </div>
        </form>
      </article>

      <article className="panel-card panel-table">
        <div className="panel-head">
          <h3>Latest {title}</h3>
          <span className="chip">Live list</span>
        </div>

        {loading ? <p className="loading-state">Loading records...</p> : null}

        {!loading && rows.length === 0 ? <p className="empty-state">{emptyMessage}</p> : null}

        {!loading && rows.length > 0 ? (
          <div className="entity-table-wrap">
            <table className="entity-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id || `${tableName}-${JSON.stringify(row)}`}>
                    {columns.map((column) => {
                      const value = row[column.key];
                      const rendered = column.render
                        ? column.render(value, row)
                        : formatValue(value, column.type);

                      return <td key={column.key}>{rendered}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </article>
    </section>
  );
}

export default ResourcePage;
