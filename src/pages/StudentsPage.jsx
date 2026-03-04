import React from "react";
import ResourcePage from "../components/ResourcePage";

const fields = [
  { name: "full_name", label: "Full Name", required: true, placeholder: "Aarav Sharma" },
  { name: "email", label: "Email", type: "email", placeholder: "student@school.com" },
  { name: "grade", label: "Grade", required: true, placeholder: "10" },
  { name: "guardian_name", label: "Guardian", placeholder: "Parent name" },
  {
    name: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
    defaultValue: "active",
  },
];

const columns = [
  { key: "full_name", label: "Name" },
  { key: "grade", label: "Grade" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Created", type: "date" },
];

function StudentsPage() {
  return (
    <ResourcePage
      title="Students"
      description="Manage student directory, profile status, and class grade mapping."
      tableName="students"
      fields={fields}
      columns={columns}
      emptyMessage="No student records found yet."
      successLabel="Student"
    />
  );
}

export default StudentsPage;
