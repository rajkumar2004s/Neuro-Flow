import { defineEventHandler, readBody, getQuery } from "h3";
import { v4 as uuidv4 } from "uuid";
import fsExtra from "fs-extra";
const { readJson, writeJson } = fsExtra;
import { join } from "path";

const filePath = join(process.cwd(), "data", "projects.json");

async function loadProjects() {
  try {
    return await readJson(filePath);
  } catch {
    return [];
  }
}

async function saveProjects(projects: any[]) {
  await writeJson(filePath, projects, { spaces: 2 });
}

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  let projects = await loadProjects();

  if (method === "GET") {
    return projects;
  }

  const body = await readBody(event);

  if (method === "POST") {
    const name = (body.name || "").toString();
    const description = (body.description || "").toString();

    if (!name || !description) {
      return { error: "Name and description are required" };
    }

    const project = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date().toISOString().split("T")[0],
    };

    projects.unshift(project);
    await saveProjects(projects);
    return project;
  }

  if (method === "PUT") {
    const { id, name, description } = body;
    const idx = projects.findIndex((p: any) => p.id === id);
    if (idx === -1) return { error: "Project not found" };

    projects[idx] = {
      ...projects[idx],
      name: name ?? projects[idx].name,
      description: description ?? projects[idx].description,
    };

    await saveProjects(projects);
    return projects[idx];
  }

  if (method === "DELETE") {
    const { id } = body;
    const beforeCount = projects.length;
    projects = projects.filter((p: any) => p.id !== id);

    if (projects.length === beforeCount) {
      return { error: "Project not found" };
    }

    await saveProjects(projects);
    return { ok: true };
  }

  return { error: "Method not allowed" };
});
