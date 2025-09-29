<template>
  <div class="flex justify-center pt-12">
    <div
      class="bg-[#1E293B] h-[55vh] w-[78%] rounded-2xl border-[2px] border-dashed border-1 border-dash-5-10 border-[#2f76e8] flex justify-center items-center"
    >
      <div class="flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-14 text-gray-500 mb-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
          />
        </svg>

        <h1 class="text-center text-white text-3xl font-semibold font-sans">
          No Projects yet
        </h1>
        <p class="text-gray-500 text-[18px] text-center font-semibold pt-6">
          Create your first project to get started with the task management
        </p>
        <div class="flex justify-center pt-8">
          <button
            class="text-white font-bold bg-[#2f76e8] text-center rounded-xl px-4 items-center flex h-12 pl-2"
            @click="project.toggleNewProject"
          >
            <span class="text-2xl p-2 pb-3 font-sans">+</span> Create Project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectStore } from "../stores/project";
const project = useProjectStore();
</script>
