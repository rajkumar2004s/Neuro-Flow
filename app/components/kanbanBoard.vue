<template>
  <div class="md:flex gap-6 pt-6 md:mx-0 mx-4 overflow-x-auto">
    <KanbanColumn
      class="md:w-[30vw] min-h-[50vh]"
      title="To Do"
      status="todo"
      :tasks="getTasks('todo')"
    />
    <KanbanColumn
      class="md:w-[30vw] my-4 md:my-0"
      title="In Progress"
      status="inprogress"
      :tasks="getTasks('inprogress')"
    />
    <KanbanColumn
      class="md:w-[30vw]"
      title="Done"
      status="done"
      :tasks="getTasks('done')"
    />

    <NewTaskForm v-if="task.newTask" />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const task = useTaskStore();
const { filteredTasks, statusFilter } = storeToRefs(task);
const route = useRoute();

function loadTasks() {
  const projectId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  task.fetchTasks(projectId as string);
}

onMounted(loadTasks);
watch(() => route.params.id, loadTasks);

const getTasks = (status: string) => {
  return filteredTasks.value.filter((t) => {
    const matchesColumn = t.status === status;
    const matchesDropdown =
      statusFilter.value === "all" || t.status === statusFilter.value;
    return matchesColumn && matchesDropdown;
  });
};
</script>
