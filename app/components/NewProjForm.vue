<template>
  <div class="bg-black/90 fixed inset-0 flex justify-center items-center z-50">
    <div
      class="bg-[#0e1628]/70 backdrop-blur-md h-[65vh] rounded-xl w-[90%] md:w-[35vw] border border-[#2f76e8]"
    >
      <div class="flex justify-between px-4 pt-6">
        <h1 class="text-white text-xl font-bold font-sans">
          Create New Project
        </h1>
        <button
          class="border border-white rounded px-2 hover:bg-red-500 transition"
          @click="project.toggleNewProject"
        >
          <i class="fa-solid fa-xmark text-white"></i>
        </button>
      </div>

      <hr class="mt-6 text-gray-500" />

      <div class="flex flex-col pt-12 w-[95%] pl-7 gap-2 pb-4">
        <label class="text-white text-md font-sans">Project Name</label>
        <input
          class="bg-white/10 backdrop-blur-sm border p-2 rounded-md border-gray-500 placeholder-gray-400 font-sans focus:outline-none focus:border-[#2f76e8] text-white"
          placeholder="Enter Project Name"
          v-model="name"
        />
      </div>

      <div class="flex flex-col w-[95%] pl-7 gap-2">
        <label class="text-white text-md font-sans">Description</label>
        <textarea
          class="bg-white/10 backdrop-blur-sm border h-24 rounded-xl border-gray-500 placeholder-gray-400 p-3 text-white focus:outline-none focus:border-[#2f76e8]"
          placeholder="Describe your project"
          v-model="description"
        />
      </div>

      <div class="flex justify-end gap-2 pr-4 pt-2">
        <button
          class="hover:bg-red-500 transition smooth all text-white border px-6 border-gray-500 font-[Roboto] mt-8 p-2 rounded-md"
          @click="project.toggleNewProject"
        >
          Cancel
        </button>
        <button
          class="text-white bg-[#2f76e8] font-[Roboto] mt-8 p-2 rounded-md hover:bg-[#1e5ec4]"
          @click="createProject"
        >
          Create Project
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProjectStore } from "../stores/project";
import { ref } from "vue";

const project = useProjectStore();
const name = ref("");
const description = ref("");

const createProject = async () => {
  if (!name.value.trim() || !description.value.trim()) return;

  await project.addProject({
    name: name.value.trim(),
    description: description.value.trim(),
  });

  name.value = "";
  description.value = "";
};
</script>
