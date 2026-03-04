export const DEMO_USERS = [
  {
    id: "Admin@123@gmail.com",
    role: "admin",
    name: "Administrator",
  },
  {
    id: "teacher@123",
    role: "teacher",
    name: "Teacher Account",
  },
  {
    id: "student@123",
    role: "student",
    name: "Student Account",
  },
];

export const NAV_ITEMS = [
  { name: "Dashboard", path: "/", icon: "DB", tone: "coral", end: true },
  { name: "Students", path: "/students", icon: "ST", tone: "teal" },
  { name: "Teachers", path: "/teachers", icon: "TC", tone: "violet" },
  { name: "Classes", path: "/classes", icon: "CL", tone: "citrus" },
  { name: "Attendance", path: "/attendance", icon: "AT", tone: "berry" },
  { name: "Homework", path: "/homework", icon: "HW", tone: "ocean" },
  { name: "Announcements", path: "/announcements", icon: "AN", tone: "gold" },
  { name: "Settings", path: "/settings", icon: "SE", tone: "sky" },
];

const ROLE_RULES = {
  admin: {
    routes: ["/", "/students", "/teachers", "/classes", "/attendance", "/homework", "/announcements", "/settings"],
    createResources: ["students", "teachers", "classes", "attendance_records", "homework", "announcements"],
    settingsWrite: true,
  },
  teacher: {
    routes: ["/", "/students", "/classes", "/attendance", "/homework", "/announcements", "/settings"],
    createResources: ["attendance_records", "homework", "announcements"],
    settingsWrite: false,
  },
  student: {
    routes: ["/", "/homework", "/announcements", "/settings"],
    createResources: [],
    settingsWrite: false,
  },
};

function normalizeIdentifier(value) {
  return String(value || "").trim().toLowerCase();
}

export function resolveUserByIdentifier(identifier) {
  const lookup = normalizeIdentifier(identifier);
  return DEMO_USERS.find((user) => normalizeIdentifier(user.id) === lookup) || null;
}

export function getRoutesForRole(role) {
  return ROLE_RULES[role]?.routes || ["/"];
}

export function canAccessRoute(role, path) {
  return getRoutesForRole(role).includes(path);
}

export function canCreateResource(role, resourceName) {
  return (ROLE_RULES[role]?.createResources || []).includes(resourceName);
}

export function canWriteSettings(role) {
  return Boolean(ROLE_RULES[role]?.settingsWrite);
}

export function getVisibleNavItems(role) {
  const allowed = new Set(getRoutesForRole(role));
  return NAV_ITEMS.filter((item) => allowed.has(item.path));
}
