<template>
  <div
    class="w-full bg-[#0f172a] h-[10vh] fixed flex justify-between px-4 md:px-46 pt-5 border-b border-b-[#2f76e8]"
  >
    <div class="flex gap-4">
      <i class="fa-solid fa-bars-progress text-[#2f76e8] text-3xl"></i>
      <h1 class="animated-heading text-white text-xl font-bold font-sans title">
        NEURO FLOW
      </h1>
    </div>
    <div class="flex gap-4">
      <h1 v-if="auth.user" class="text-white font-bold pr-2 pt-1">
        {{ auth.user.name.toUpperCase() }}
      </h1>

      <NuxtLink :to="'/'">
        <button
          class="active-glow shiny-btn text-white border h-8 px-4 text-sm rounded border-[#2f76e8]"
          @click="auth.logout()"
        >
          <i class="fa-solid fa-right-from-bracket text-[12px] pr-4 p-1"></i>
          Logout
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
</script>

<style scoped>
button:hover {
  background-color: #2f76e8;
}

.animated-heading {
  transition: all 0.4s ease-in-out;
  display: inline-block;
  position: relative;
  color: #fff;
}

.animated-heading:hover {
  color: #38bdf8;
  transform: scale(1.1);
  letter-spacing: 2px;
}
</style>
