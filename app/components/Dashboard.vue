<template>
  <div class="container min-h-[100vh] pt-12 w-[120vw]">
    <div class="md:flex md:justify-between md:px-42 px-6 pt-14 w-full">
      <div>
        <h1 class="text-white text-5xl font-bold font-sans heading">
          My Projects
        </h1>
        <p class="text-gray-500 text-[20px] pt-4">
          Manage and organise your projects
        </p>
      </div>

      <button
        class="active-glow text-white font-bold bg-[#2f76e8] text-center rounded-xl px-4 md:mt-0 mt-8 items-center flex h-12 pl-2"
        @click="project.toggleNewProject"
      >
        <span class="text-2xl p-2 pb-3 font-sans">+</span> New Project
      </button>
    </div>

    <div>
      <NoProjects v-if="project.projects.length === 0" />
      <ProjectsCard v-else class="pl-2" />
    </div>

    <NewProjForm v-if="project.newProject" />
  </div>
</template>

<script setup lang="ts">
import { useProjectStore } from "../stores/project";
import { onMounted } from "vue";

const project = useProjectStore();

onMounted(async () => {
  await project.fetchProjects();
});
</script>

<style scoped>
.container {
  background-image: linear-gradient(
    135deg,
    rgb(30, 41, 59) 0%,
    rgb(15, 23, 42) 100%
  );
}
.heading {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
