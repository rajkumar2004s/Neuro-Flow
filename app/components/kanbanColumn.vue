<template>
  <div class="bg-[#0e1628]/70 rounded-xl p-4 border border-gray-700">
    <h2 class="text-white font-semibold mb-3 flex items-center justify-between">
      <span class="flex items-center gap-2 font-bold text-xl">
        <i v-if="status === 'todo'" class="fa-solid fa-list text-blue-400"></i>
        <i
          v-else-if="status === 'inprogress'"
          class="fa-solid fa-clock text-yellow-400"
        ></i>
        <i
          v-else-if="status === 'done'"
          class="fa-solid fa-circle-check text-green-400"
        ></i>

        {{ title }}
      </span>

      <span
        class="bg-gray-800 text-xs text-[#4287f5] font-bold px-2 py-1 rounded-xl border"
      >
        {{ tasks.length }}
      </span>
    </h2>

    <div class="space-y-3 pt-2">
      <TaskCard v-for="task in tasks" :key="task.id" :taskItem="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "../types";

defineProps<{
  title: string;
  status: Task["status"];
  tasks: Task[];
}>();
</script>
