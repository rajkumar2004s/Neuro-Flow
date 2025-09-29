import { defineStore } from "pinia";
import type { Task } from "../types";
import { ref, computed } from "vue";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>([]);
  const newTask = ref(false);
  const editTask = ref(false);

  const toggleEditTask = () => {
    editTask.value = !editTask.value;
  };
  const toggleNewTask = () => {
    newTask.value = !newTask.value;
  };

  const fetchTasks = async (projectId: string) => {
    const data = await $fetch<Task[]>(`/api/tasks?projectId=${projectId}`);
    tasks.value = data;
  };

  const addTask = async (
    task: Omit<Task, "id" | "createdAt"> & { projectId: string }
  ) => {
    await $fetch<Task>("/api/tasks", {
      method: "POST",
      body: task,
    });
    await fetchTasks(task.projectId);
  };

  const updateTask = async (
    task: Partial<Task> & { id: string; projectId: string }
  ) => {
    await $fetch<Task>("/api/tasks", {
      method: "PUT",
      body: task,
    });
    await fetchTasks(task.projectId);
  };

  const removeTask = async (id: string, projectId: string) => {
    await $fetch("/api/tasks", {
      method: "DELETE",
      body: { id },
    });
    await fetchTasks(projectId);
  };


  const searchQuery = ref("");
  const priorityFilter = ref<"all" | Task["priority"]>("all");
  const statusFilter = ref<"all" | Task["status"]>("all");

  
  const filteredTasks = computed(() => {
    return tasks.value.filter((task) => {
      const matchedPriority =
        priorityFilter.value === "all" ||
        task.priority === priorityFilter.value;

      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

      return matchedPriority && matchesSearch;
    });
  });

  return {
    tasks,
    newTask,
    editTask,
    toggleNewTask,
    toggleEditTask,
    fetchTasks,
    addTask,
    updateTask,
    removeTask,

    statusFilter,
    priorityFilter,
    searchQuery,
    filteredTasks,
  };
});
