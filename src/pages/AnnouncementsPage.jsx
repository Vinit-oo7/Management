import React from "react";
import ResourcePage from "../components/ResourcePage";

const fields = [
  { name: "title", label: "Title", required: true, placeholder: "Parent Teacher Meeting" },
  {
    name: "audience",
    label: "Audience",
    options: [
      { label: "All", value: "all" },
      { label: "Students", value: "students" },
      { label: "Teachers", value: "teachers" },
      { label: "Parents", value: "parents" },
    ],
    defaultValue: "all",
    required: true,
  },
  {
    name: "publish_date",
    label: "Publish Date",
    type: "date",
    required: true,
    defaultValue: new Date().toISOString().slice(0, 10),
  },
  { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Details..." },
  {
    name: "status",
    label: "Status",
    options: [
      { label: "Published", value: "published" },
      { label: "Draft", value: "draft" },
    ],
    defaultValue: "published",
    required: true,
  },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "audience", label: "Audience" },
  { key: "publish_date", label: "Publish Date", type: "date" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Created", type: "date" },
];

function AnnouncementsPage({ canCreate }) {
  return (
    <ResourcePage
      title="Announcements"
      description="Broadcast updates to students, parents, and staff from one queue."
      tableName="announcements"
      orderBy="publish_date"
      fields={fields}
      columns={columns}
      emptyMessage="No announcements published yet."
      successLabel="Announcement"
      canCreate={canCreate}
    />
  );
}

export default AnnouncementsPage;
