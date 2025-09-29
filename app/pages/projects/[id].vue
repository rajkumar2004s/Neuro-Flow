<template>
  <div class="container pb-12 min-h-[100vh] w-[120vw] md:w-full md:px-20 pt-26">
    <div class="flex justify-between pt-2 mx-4 md:mx-0">
      <NuxtLink :to="'/projects'">
        <button
          class="border-1 p-2 text-gray-500 rounded-md px-2 font-semibold text-sm"
        >
          <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
        </button>
      </NuxtLink>
      <button
        @click="task.toggleNewTask"
        class="bg-[#2f76e8] text-white rounded-xl px-8 active-glow p-1 font-bold pb-3"
      >
        <span class="text-2xl mr-2">+</span> Add Task
      </button>
    </div>

    <div class="text-white pt-6 md:pt-3 mx-4 md:mx-0">
      <h1 class="font-bold text-3xl font-sans">{{ projectDetails?.name }}</h1>
      <p class="text-xl text-gray-500 pt-2 font-sans">
        {{ projectDetails?.description }}
      </p>
    </div>

    <TaskFilter />

    <TaskForm v-if="task.newTask" />
    <KanbanBoard />
  </div>
</template>

<script setup lang="ts">
import { useProjectStore } from "../../stores/project";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { useTaskStore } from "../../stores/task";

const task = useTaskStore();
const project = useProjectStore();
const route = useRoute();

const projectDetails = computed(() => {
  return project.projects.find((p) => String(p.id) === String(route.params.id));
});

onMounted(() => {
  task.fetchTasks(route.params.id as string);
});
</script>

<style scoped>
select {
  font-family: sans-serif;
  font-size: 14px;
}
</style>
