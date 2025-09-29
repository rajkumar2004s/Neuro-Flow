<template>
  <div class="bg-black/90 fixed inset-0 flex justify-center items-center z-50">
    <div
      class="bg-[#0e1628]/70 backdrop-blur-md h-[70vh] rounded-xl w-[90%] md:w-[35vw] border border-[#2f76e8]"
    >
      <div class="flex justify-between px-4 pt-6">
        <h1 class="text-white text-xl font-bold">Edit Task</h1>
        <button
          class="border border-white rounded p-1 px-2 hover:bg-red-500 transition"
          @click="close"
        >
          <i class="fa-solid fa-xmark text-white"></i>
        </button>
      </div>

      <hr class="mt-6 text-gray-500" />

      <div class="flex flex-col pt-12 w-[95%] pl-7 gap-2 pb-4">
        <label class="text-white">Task Title</label>
        <input
          class="bg-white/10 border p-2 rounded-md border-gray-500 text-white"
          v-model="localTask.title"
        />
      </div>

      <div class="flex flex-col w-[95%] pl-7 gap-2">
        <label class="text-white">Description</label>
        <textarea
          class="bg-white/10 border h-24 rounded-xl border-gray-500 p-3 text-white"
          v-model="localTask.description"
        />
      </div>

      <div class="flex gap-4 pl-7 pt-4">
        <select
          v-model="localTask.status"
          class="px-3 py-2 rounded-md bg-slate-800 text-white"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          v-model="localTask.priority"
          class="px-3 py-2 rounded-md bg-slate-800 text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div class="flex justify-end gap-2 pr-4 pt-2">
        <button
          class="text-white border px-8 border-gray-500 mt-8 p-2 rounded-md hover:bg-red-500 smooth transition ease"
          @click="close"
        >
          Cancel
        </button>
        <button
          class="text-white bg-[#2f76e8] mt-8 p-2 px-4 rounded-md hover:bg-[#1e5ec4]"
          @click="update"
        >
          Update Task
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "../stores/task";
import type { Task } from "../types";
import { reactive } from "vue";

const props = defineProps<{ editDetails: Task }>();
const emit = defineEmits(["close"]);
const task = useTaskStore();

const localTask = reactive({ ...props.editDetails });

const update = async () => {
  await task.updateTask({
    ...localTask,
    projectId: localTask.projectId,
  });
  close();
};

const close = () => {
  emit("close");
  task.toggleEditTask();
};
</script>
