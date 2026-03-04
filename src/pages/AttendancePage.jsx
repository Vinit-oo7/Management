import React from "react";
import ResourcePage from "../components/ResourcePage";

const fields = [
  { name: "student_name", label: "Student Name", required: true, placeholder: "Aarav Sharma" },
  { name: "class_name", label: "Class", required: true, placeholder: "Class 10 A" },
  {
    name: "attendance_date",
    label: "Date",
    type: "date",
    required: true,
    defaultValue: new Date().toISOString().slice(0, 10),
  },
  {
    name: "status",
    label: "Status",
    required: true,
    options: [
      { label: "Present", value: "present" },
      { label: "Absent", value: "absent" },
      { label: "Late", value: "late" },
    ],
    defaultValue: "present",
  },
  { name: "remarks", label: "Remarks", type: "textarea", placeholder: "Optional note" },
];

const columns = [
  { key: "student_name", label: "Student" },
  { key: "class_name", label: "Class" },
  { key: "attendance_date", label: "Date", type: "date" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Created", type: "date" },
];

function AttendancePage() {
  return (
    <ResourcePage
      title="Attendance"
      description="Capture daily attendance entries and keep audit-friendly history."
      tableName="attendance_records"
      orderBy="attendance_date"
      fields={fields}
      columns={columns}
      emptyMessage="No attendance records found yet."
    />
  );
}

export default AttendancePage;
