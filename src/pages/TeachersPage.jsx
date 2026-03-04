import React from "react";
import ResourcePage from "../components/ResourcePage";

const fields = [
  { name: "full_name", label: "Full Name", required: true, placeholder: "Neha Verma" },
  { name: "email", label: "Email", type: "email", placeholder: "teacher@school.com" },
  { name: "subject", label: "Subject", required: true, placeholder: "Mathematics" },
  { name: "phone", label: "Phone", placeholder: "+91..." },
  {
    name: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "On Leave", value: "on_leave" },
    ],
    defaultValue: "active",
  },
];

const columns = [
  { key: "full_name", label: "Name" },
  { key: "subject", label: "Subject" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Created", type: "date" },
];

function TeachersPage() {
  return (
    <ResourcePage
      title="Teachers"
      description="Track teaching staff, subjects, and availability state."
      tableName="teachers"
      fields={fields}
      columns={columns}
      emptyMessage="No teacher records found yet."
    />
  );
}

export default TeachersPage;
