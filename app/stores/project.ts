import { defineStore } from "pinia";
import { ref } from "vue";
import type { Project } from "../types";

export const useProjectStore = defineStore("project", () => {
  const newProject = ref(false);
  const projects = ref<Project[]>([]);
  const editingProjectId = ref<string | null>(null);

  const toggleNewProject = () => {
    newProject.value = !newProject.value;
  };

  const startEditProject = (id: string) => {
    editingProjectId.value = id;
  };

  const closeEditProject = () => {
    editingProjectId.value = null;
  };

 
  const fetchProjects = async () => {
    const data = await $fetch<Project[]>("/api/projects");
    projects.value = data;
  };


  const addProject = async (project: Omit<Project, "id" | "createdAt">) => {
    if (!project.name || !project.description) {
      alert("Enter the details");
      return;
    }
    const newProj = await $fetch<Project>("/api/projects", {
      method: "POST",
      body: project,
    });
    projects.value.unshift(newProj);
    toggleNewProject();
  };


  const updateProject = async (updatedProject: Project) => {
    const saved = await $fetch<Project>("/api/projects", {
      method: "PUT",
      body: updatedProject,
    });
    const index = projects.value.findIndex((p) => p.id === saved.id);
    if (index !== -1) {
      projects.value.splice(index, 1, saved);
    }
    closeEditProject();
  };


  const removeProject = async (id: string) => {
    await $fetch("/api/projects", {
      method: "DELETE",
      body: { id },
    });
    projects.value = projects.value.filter((p) => p.id !== id);
  };

  return {
    newProject,
    projects,
    editingProjectId,
    toggleNewProject,
    startEditProject,
    closeEditProject,
    fetchProjects,
    addProject,
    updateProject,
    removeProject,
  };
});
