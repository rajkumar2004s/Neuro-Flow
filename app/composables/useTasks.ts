import { ref } from "vue";
import type { Task } from "../types";

export default function useTask() {
  const tasks = ref<Task[]>([]);

  const fetchTasks = async () => {
    const data = await $fetch("/api/tasks");
    console.log(data);
    tasks.value = (data || []) as Task[];
  };

  const create = async (payload: Partial<Task>) => {
    await $fetch("/api/tasks", { method: "POST", body: payload });
    await fetchTasks();
  };

  const update = async (payload: Partial<Task> & { id: string }) => {
    await $fetch("/api/tasks", { method: "PUT", body: payload });
    await fetchTasks();
  };

  const remove = async (id: string) => {
    await $fetch("/api/tasks", { method: "DELETE", body: { id } });
    await fetchTasks();
  };
  return { tasks, fetchTasks, create, update, remove };
}
