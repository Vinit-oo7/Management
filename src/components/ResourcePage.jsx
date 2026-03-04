import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteRow,
  getFriendlyError,
  insertRow,
  listRows,
  updateRow,
} from "../lib/schoolService";

const PAGE_SIZES = [10, 20, 50];

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

function toDateInput(value) {
  if (!value) {
    return "";
  }

  try {
    return new Date(value).toISOString().slice(0, 10);
  } catch {
    return String(value).slice(0, 10);
  }
}

function toCsvValue(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function ResourcePage({
  title,
  description,
  tableName,
  orderBy,
  fields,
  columns,
  emptyMessage,
  successLabel,
  canCreate = true,
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
  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setForm(initialFormState);
  }, [initialFormState]);

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await listRows(tableName, {
      orderBy: orderBy || "created_at",
      ascending: false,
      limit: 1000,
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, pageSize]);

  const statusOptions = useMemo(() => {
    const unique = Array.from(
      new Set(rows.map((row) => row.status).filter((value) => value && String(value).trim())),
    );
    return unique;
  }, [rows]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return rows.filter((row) => {
      const statusMatches =
        statusFilter === "all" ? true : String(row.status || "").toLowerCase() === statusFilter;

      if (!statusMatches) {
        return false;
      }

      if (!term) {
        return true;
      }

      return columns.some((column) => {
        const value = row[column.key];
        return String(value || "")
          .toLowerCase()
          .includes(term);
      });
    });
  }, [rows, statusFilter, searchTerm, columns]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const paginatedRows = filteredRows.slice(pageStart, pageStart + pageSize);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(initialFormState);
  };

  const handleEdit = (row) => {
    const nextForm = fields.reduce((acc, field) => {
      const raw = row[field.name];
      if (raw === null || raw === undefined) {
        acc[field.name] = field.defaultValue || "";
      } else if (field.type === "date") {
        acc[field.name] = toDateInput(raw);
      } else {
        acc[field.name] = raw;
      }
      return acc;
    }, {});

    setEditingId(row.id);
    setForm(nextForm);
    setSuccess("");
    setError("");
  };

  const handleDelete = async (id) => {
    if (!canCreate) {
      return;
    }

    const shouldDelete = window.confirm("Delete this record?");
    if (!shouldDelete) {
      return;
    }

    setError("");
    setSuccess("");
    const { error: removeError } = await deleteRow(tableName, id);

    if (removeError) {
      setError(getFriendlyError(removeError, tableName));
      return;
    }

    setSuccess(`${successLabel || "Record"} deleted successfully.`);
    if (editingId === id) {
      resetForm();
    }
    loadRows();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canCreate) {
      return;
    }

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

    if (editingId) {
      const { error: updateError } = await updateRow(tableName, editingId, payload);

      if (updateError) {
        setError(getFriendlyError(updateError, tableName));
        setSaving(false);
        return;
      }

      setSuccess(`${successLabel || "Record"} updated successfully.`);
      resetForm();
      setSaving(false);
      loadRows();
      return;
    }

    const { error: insertError } = await insertRow(tableName, payload);

    if (insertError) {
      setError(getFriendlyError(insertError, tableName));
      setSaving(false);
      return;
    }

    setSuccess(`${successLabel || "Record"} added successfully.`);
    resetForm();
    setSaving(false);
    loadRows();
  };

  const handleExportCsv = () => {
    const header = columns.map((column) => toCsvValue(column.label)).join(",");
    const body = filteredRows
      .map((row) =>
        columns
          .map((column) => {
            const value = row[column.key];
            const rendered = column.render
              ? column.render(value, row)
              : formatValue(value, column.type);
            return toCsvValue(rendered);
          })
          .join(","),
      )
      .join("\n");

    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tableName}-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
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

        {canCreate ? (
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
                {saving ? "Saving..." : editingId ? "Update Record" : "Add Record"}
              </button>
              {editingId ? (
                <button type="button" className="ghost-btn" onClick={resetForm}>
                  Cancel Edit
                </button>
              ) : null}
              <button type="button" className="ghost-btn" onClick={loadRows} disabled={loading}>
                Refresh
              </button>
            </div>
          </form>
        ) : (
          <div className="read-only-box">
            <p className="readiness-title">Read-only role</p>
            <p className="readiness-note">
              Your account can view this section but cannot create, edit, or delete records.
            </p>
            <button type="button" className="ghost-btn" onClick={loadRows} disabled={loading}>
              Refresh
            </button>
          </div>
        )}
      </article>

      <article className="panel-card panel-table">
        <div className="panel-head">
          <h3>Latest {title}</h3>
          <span className="chip">Live list</span>
        </div>

        <div className="entity-toolbar">
          <div className="entity-toolbar-group">
            <input
              className="search-input"
              type="search"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            {statusOptions.length > 0 ? (
              <select
                className="toolbar-select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All Status</option>
                {statusOptions.map((value) => (
                  <option key={value} value={String(value).toLowerCase()}>
                    {value}
                  </option>
                ))}
              </select>
            ) : null}

            <select
              className="toolbar-select"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}/page
                </option>
              ))}
            </select>
          </div>

          <div className="entity-toolbar-group">
            <button type="button" className="ghost-btn mini-btn" onClick={handleExportCsv}>
              Export CSV
            </button>
          </div>
        </div>

        {loading ? <p className="loading-state">Loading records...</p> : null}

        {!loading && filteredRows.length === 0 ? <p className="empty-state">{emptyMessage}</p> : null}

        {!loading && filteredRows.length > 0 ? (
          <>
            <div className="entity-table-wrap">
              <table className="entity-table">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                    {canCreate ? <th>Actions</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.map((row) => (
                    <tr key={row.id || `${tableName}-${JSON.stringify(row)}`}>
                      {columns.map((column) => {
                        const value = row[column.key];
                        const rendered = column.render
                          ? column.render(value, row)
                          : formatValue(value, column.type);

                        return <td key={column.key}>{rendered}</td>;
                      })}

                      {canCreate ? (
                        <td>
                          <div className="row-actions">
                            <button
                              type="button"
                              className="ghost-btn mini-btn"
                              onClick={() => handleEdit(row)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="ghost-btn mini-btn danger"
                              onClick={() => handleDelete(row.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pager">
              <p>
                Showing {pageStart + 1}-{Math.min(pageStart + pageSize, filteredRows.length)} of{" "}
                {filteredRows.length}
              </p>
              <div className="pager-controls">
                <button
                  type="button"
                  className="ghost-btn mini-btn"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={safePage === 1}
                >
                  Prev
                </button>
                <span>
                  Page {safePage} / {totalPages}
                </span>
                <button
                  type="button"
                  className="ghost-btn mini-btn"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={safePage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : null}
      </article>
    </section>
  );
}

export default ResourcePage;
