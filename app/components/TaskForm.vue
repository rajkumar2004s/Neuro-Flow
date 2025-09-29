<template>
  <div class="bg-black/90 fixed inset-0 flex justify-center items-center z-50">
    <div
      class="bg-[#0e1628]/70 backdrop-blur-md h-[70vh] rounded-xl w-[90%] md:w-[35vw] border border-[#2f76e8]"
    >
      <div class="flex justify-between px-4 pt-6">
        <h1 class="text-white text-xl font-bold font-sans">Create New Task</h1>
        <button
          class="border border-white rounded p-1 px-2 hover:bg-red-500 transition"
          @click="task.toggleNewTask"
        >
          <i class="fa-solid fa-xmark text-white"></i>
        </button>
      </div>

      <hr class="mt-6 text-gray-500" />

      <div class="flex flex-col pt-12 w-[95%] pl-7 gap-2 pb-4">
        <label class="text-white text-md font-sans">Task Title</label>
        <input
          class="bg-white/10 border p-2 rounded-md border-gray-500 text-white"
          placeholder="Enter task title"
          v-model="title"
        />
      </div>

      <div class="flex flex-col w-[95%] pl-7 gap-2">
        <label class="text-white text-md font-sans">Description</label>
        <textarea
          class="bg-white/10 border h-24 rounded-xl border-gray-500 p-3 text-white"
          placeholder="Describe your task"
          v-model="description"
        />
      </div>

      <div class="flex gap-4 pl-7 pt-4">
        <select
          v-model="status"
          class="px-3 py-2 rounded-md bg-slate-800 text-white"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          v-model="priority"
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
          @click="task.toggleNewTask"
        >
          Cancel
        </button>
        <button
          class="text-white bg-[#2f76e8] mt-8 p-2 px-4 rounded-md hover:bg-[#1e5ec4]"
          @click="createTask"
        >
          Create Task
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "../stores/task";
import { ref } from "vue";
import { useRoute } from "vue-router";

const task = useTaskStore();
const route = useRoute();

const title = ref("");
const description = ref("");
const status = ref<"todo" | "inprogress" | "done">("todo");
const priority = ref<"low" | "medium" | "high">("medium");

const createTask = async () => {
  if (!title.value.trim()) return;

  await task.addTask({
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
    priority: priority.value,
    projectId: route.params.id as string,
  });

  title.value = "";
  description.value = "";
  status.value = "todo";
  priority.value = "medium";

  task.toggleNewTask();
};
</script>
