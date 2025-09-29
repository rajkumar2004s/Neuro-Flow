<template>
  <div class="flex gap-4 mb-6 pt-8 mx-4 md:mx-0">
    <input
      v-model="task.searchQuery"
      type="text"
      placeholder="Search tasks..."
      class="px-3 py-2 w-full border outline-none border-[#3c4a59] rounded-md bg-slate-800 text-white w-1/3"
    />

    <select
      v-model="task.statusFilter"
      class="px-3 py-2 rounded-md bg-slate-800 text-white border border-[#3c4a59]"
    >
      <option value="all">All Status</option>
      <option value="todo">To Do</option>
      <option value="inprogress">In Progress</option>
      <option value="done">Done</option>
    </select>

    <select
      v-model="task.priorityFilter"
      class="px-3 py-2 rounded-md bg-slate-800 text-white border border-[#3c4a59]"
    >
      <option value="all">All Priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "../stores/task";
const task = useTaskStore();
</script>
