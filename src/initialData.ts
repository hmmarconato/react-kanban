import type { ColumnData } from "./types";

// Initial Data (you might fetch this from an API)
export const initialColumns: ColumnData[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      {
        id: "task-1",
        title: "Design the homepage",
        description: "Create mockups in Figma",
      },
      {
        id: "task-2",
        title: "Develop API endpoints",
        description: "User authentication and data retrieval",
      },
      {
        id: "task-5",
        title: "Write unit tests",
        description: "Cover core functionalities with Jest",
      },
      {
        id: "task-6",
        title: "Plan sprint tasks",
        description: "Organize tasks for the next sprint",
      },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    cards: [
      { id: "task-3", title: "Implement navigation bar",description:"Must use React + Tailwind" },
      {
        id: "task-7",
        title: "Optimize database queries",
        description: "Improve performance of SQL queries",
      },
      {
        id: "task-8",
        title: "Fix login bug",
        description: "Resolve issue with session timeout",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "task-4",
        title: "Setup project repository",
        description: "Initialize with Vite and Tailwind",
      },
      {
        id: "task-9",
        title: "Create CI/CD pipeline",
        description: "Automate builds and deployments",
      },
      {
        id: "task-10",
        title: "Write documentation",
        description: "Add README and API usage guides",
      },
    ],
  },
];