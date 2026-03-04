import React from "react";
import ResourcePage from "../components/ResourcePage";

const fields = [
  { name: "class_name", label: "Class Name", required: true, placeholder: "Class 10" },
  { name: "section", label: "Section", required: true, placeholder: "A" },
  { name: "room_no", label: "Room No", placeholder: "R-203" },
  { name: "class_teacher", label: "Class Teacher", placeholder: "Neha Verma" },
  { name: "schedule", label: "Schedule", placeholder: "Mon-Fri 09:00 - 15:00" },
];

const columns = [
  { key: "class_name", label: "Class" },
  { key: "section", label: "Section" },
  { key: "room_no", label: "Room" },
  { key: "class_teacher", label: "Teacher" },
  { key: "created_at", label: "Created", type: "date" },
];

function ClassesPage({ canCreate }) {
  return (
    <ResourcePage
      title="Classes"
      description="Set up classroom sections, room numbers, and assigned teachers."
      tableName="classes"
      fields={fields}
      columns={columns}
      emptyMessage="No class records found yet."
      successLabel="Class"
      canCreate={canCreate}
    />
  );
}

export default ClassesPage;
