<template>
  <div class="flex flex-wrap w-full md:pl-38 pt-8">
    <div
      v-for="proj in project.projects"
      :key="proj.id"
      class="bg-[#1E293B] card-hover active border-[#243e66] rounded-xl p-4 flex m-4 border flex-col"
    >
      <div class="flex justify-between gap-4 w-[100vw] md:w-[23vw] h-[14vh]">
        <div>
          <h1 class="text-white font-bold text-xl">{{ proj.name }}</h1>
          <p class="text-gray-400 w-60 pt-2">{{ proj.description }}</p>
        </div>

        <div>
          <button
            class="border border-gray-500 hover:border-blue-500 p-1 px-2 m-2 rounded hover:bg-slate-700 transition"
            @click="project.startEditProject(proj.id)"
          >
            <i class="fa-solid fa-pen text-white text-sm"></i>
          </button>
          <button
            class="border border-gray-500 p-1 px-2 rounded hover:bg-[# d13a32] hover:border-red-500 transition"
            @click="project.removeProject(proj.id)"
          >
            <i class="fa-solid fa-trash text-white text-sm"></i>
          </button>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="pt-4 text-gray-500">
          <p>
            <i class="fa-solid fa-clock mr-2 text-md"></i>{{ proj.createdAt }}
          </p>
        </div>
        <NuxtLink :to="`/projects/${proj.id}`">
          <div class="flex justify-end">
            <button
              class="bg-[#2f76e8] p-2 px-4 text-[14px] font-normal text-white rounded-md hover:bg-[#1e5ec4] transition"
            >
              View board
              <i
                class="fa-solid fa-arrow-right font-normal text-white text-sm"
              ></i>
            </button>
          </div>
        </NuxtLink>
      </div>
    </div>

    <EditProject
      v-if="editProjectDetails"
      :editDetails="editProjectDetails"
      @close="project.editingProjectId = null"
    />
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "../stores/project";
import { onMounted, computed } from "vue";

const project = useProjectStore();

const editProjectDetails = computed(() =>
  project.projects.find((p) => p.id === project.editingProjectId)
);

onMounted(async () => {
  await project.fetchProjects();
});
</script>

<style scoped>
button {
  font-family: sans-serif;
}
.active:hover {
  box-shadow:
    0 0 5px rgba(47, 118, 232, 0.7),
    0 0 10px rgba(47, 118, 232, 0.5);
}
</style>
