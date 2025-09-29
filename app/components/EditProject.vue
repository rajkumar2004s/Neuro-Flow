<template>
  <div class="bg-black/90 fixed inset-0 flex justify-center items-center z-50">
    <div
      class="bg-[#0e1628]/70 backdrop-blur-md h-[65vh] rounded-xl w-[90%] md:w-[35vw] border border-[#2f76e8]"
    >
      <div class="flex justify-between px-4 pt-6">
        <h1 class="text-white text-xl font-bold font-sans">Edit Project</h1>
        <button
          class="border border-white rounded p-1 px-2 hover:bg-red-500 transition"
          @click="project.closeEditProject"
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
          v-model="props.editDetails.name"
        />
      </div>

      <div class="flex flex-col w-[95%] pl-7 gap-2">
        <label class="text-white text-md font-sans">Description</label>
        <textarea
          class="bg-white/10 backdrop-blur-sm border h-24 rounded-xl border-gray-500 placeholder-gray-400 p-3 text-white focus:outline-none focus:border-[#2f76e8] text-white"
          placeholder="Describe your project"
          v-model="props.editDetails.description"
        />
      </div>

      <div class="flex justify-end gap-2 pr-4 pt-2">
        <button
          class="hover:bg-red-500 smooth transition all text-white border px-6 border-gray-500 font-[Roboto] mt-8 p-2 rounded-md"
          @click="project.closeEditProject"
        >
          Cancel
        </button>
        <button
          class="text-white bg-[#2f76e8] font-[Roboto] mt-8 p-2 rounded-md hover:bg-[#1e5ec4]"
          @click="saveProject"
        >
          Update Project
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProjectStore } from "../stores/project";

const props = defineProps<{
  editDetails: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
  };
}>();
const project = useProjectStore();

const saveProject = async () => {
  if (!props.editDetails.name.trim() || !props.editDetails.description.trim())
    return;

  await project.updateProject({
    id: props.editDetails.id,
    name: props.editDetails.name.trim(),
    description: props.editDetails.description.trim(),
    createdAt: props.editDetails.createdAt,
  });
};
</script>
