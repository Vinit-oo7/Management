import React from "react";
import ResourcePage from "../components/ResourcePage";

const fields = [
  { name: "title", label: "Title", required: true, placeholder: "Algebra Worksheet 5" },
  { name: "subject", label: "Subject", required: true, placeholder: "Mathematics" },
  { name: "class_name", label: "Class", required: true, placeholder: "Class 8 C" },
  { name: "due_date", label: "Due Date", type: "date", required: true },
  {
    name: "status",
    label: "Status",
    options: [
      { label: "Published", value: "published" },
      { label: "Draft", value: "draft" },
    ],
    defaultValue: "published",
  },
  {
    name: "instructions",
    label: "Instructions",
    type: "textarea",
    placeholder: "Add details, reference pages, and submission format.",
  },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "subject", label: "Subject" },
  { key: "class_name", label: "Class" },
  { key: "due_date", label: "Due Date", type: "date" },
  { key: "status", label: "Status" },
];

function HomeworkPage({ canCreate }) {
  return (
    <ResourcePage
      title="Homework"
      description="Publish assignments with due dates and track what is currently active."
      tableName="homework"
      orderBy="due_date"
      fields={fields}
      columns={columns}
      emptyMessage="No homework published yet."
      successLabel="Homework item"
      canCreate={canCreate}
    />
  );
}

export default HomeworkPage;
