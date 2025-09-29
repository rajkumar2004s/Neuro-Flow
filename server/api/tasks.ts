import { defineEventHandler, readBody, getQuery } from "h3";
import { v4 as uuidv4 } from "uuid";
import fsExtra from "fs-extra";
import { join } from "path";

const { readJson, writeJson } = fsExtra;
const filePath = join(process.cwd(), "data", "tasks.json");

async function loadTasks() {
  try {
    return await readJson(filePath);
  } catch {
    await saveTasks([]);
    return [];
  }
}

async function saveTasks(tasks: any[]) {
  await writeJson(filePath, tasks, { spaces: 2 });
}

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  let tasks = await loadTasks();

  if (method === "GET") {
    const query = getQuery(event);
    const projectId = query.projectId as string;
    if (projectId) {
      return tasks.filter((t: any) => t.projectId === projectId);
    }
    return tasks;
  }

  const body = await readBody(event);

  if (method === "POST") {
    const {
      title,
      description,
      status = "todo",
      priority = "medium",
      projectId,
    } = body;

    if (!projectId) {
      return { error: "projectId is required" };
    }

    const task = {
      id: uuidv4(),
      projectId,
      title: (title || "").toString(),
      description: (description || "").toString(),
      status,
      priority,
      createdAt: new Date().toISOString().split("T")[0],
    };

    tasks.unshift(task);
    await saveTasks(tasks);
    return task;
  }

  if (method === "PUT") {
    const { id, title, description, status, priority, projectId } = body;
    const idx = tasks.findIndex((t: any) => t.id === id);
    if (idx === -1) return { error: "Task not found" };

    tasks[idx] = {
      ...tasks[idx],
      title: title ?? tasks[idx].title,
      description: description ?? tasks[idx].description,
      status: status ?? tasks[idx].status,
      priority: priority ?? tasks[idx].priority,
      projectId: projectId ?? tasks[idx].projectId,
    };

    await saveTasks(tasks);
    return tasks[idx];
  }

  if (method === "DELETE") {
    const { id } = body;
    const beforeCount = tasks.length;
    tasks = tasks.filter((t: any) => t.id !== id);

    if (tasks.length === beforeCount) {
      return { error: "Task not found" };
    }

    await saveTasks(tasks);
    return { ok: true };
  }

  return { error: "Method not allowed" };
});
