<template>
  <div class="bg-slate-800 p-4 rounded-lg shadow-md border border-gray-700">
    <div class="flex justify-between">
      <div class="flex flex-col">
        <h3 class="text-white font-semibold text-xl">{{ taskItem.title }}</h3>
        <p class="text-gray-400 text-sm pt-2">{{ taskItem.description }}</p>
      </div>

      <div class="flex gap-4 pb-8">
        <button
          @click="
            task.toggleEditTask();
            editing = true;
          "
          class="flex items-center justify-center rounded p-1 transition hover:bg-blue-500/20"
        >
          <i class="fa-solid fa-pen text-gray-500 text-sm"></i>
        </button>

        <button
          @click="removeTask"
          class="flex items-center justify-center rounded p-1 transition hover:bg-red-500/20"
        >
          <i class="fa-solid fa-trash text-gray-500 text-sm"></i>
        </button>
      </div>
    </div>

    <div class="flex justify-between mt-8">
      <span class="text-xs px-2 py-1 rounded bg-gray-700 text-white uppercase">
        {{ taskItem.priority }}
      </span>
      <span class="text-gray-500 text-sm font-semibold">
        {{ taskItem.createdAt }}
      </span>
    </div>

    <EditTask
      v-if="editing && task.editTask"
      :editDetails="taskItem"
      @close="editing = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from "../types";
import { useTaskStore } from "../stores/task";
import { ref } from "vue";

const props = defineProps<{ taskItem: Task }>();
const task = useTaskStore();
const editing = ref(false);

const removeTask = async () => {
  await task.removeTask(props.taskItem.id, props.taskItem.projectId);
};
</script>
