<template>
  <div class="container h-[100vh] flex justify-center items-center">
    <div
      class="md:w-[28%] w-[80%] border-[0.1px] border-[#1383CE] h-auto pb-10 bg-[#1E293B] rounded-2xl flex flex-col items-center shadow-4xl"
    >
      <i class="fa-solid fa-bars-progress text-[#2f76e8] text-5xl pt-12"></i>
      <h1 class="text-white text-3xl font-bold pt-4 font-sans title">
        NEURO FLOW
      </h1>
      <P class="text-[17px] pt-2 text-gray-500 font-sans font-semibold"
        >Manage your projects with ease</P
      >
      <div class="bg-[#0F172A] text-white w-[80%] mt-4 p-1 rounded-xl flex">
        <button
          :class="`flex-1 font-sans font-semibold text-[14px] h-10 rounded ${authToggle ? '' : 'bg-[#2f76e8] active-glow'}`"
          @click="callLogin"
        >
          Login
        </button>
        <button
          :class="`flex-1 font-sans font-semibold text-[14px] h-10 rounded ${authToggle ? 'bg-[#2f76e8] active-glow' : ''}`"
          @click="callRegister"
        >
          Register
        </button>
      </div>

      <div v-if="!authToggle">
        <KeepAlive> <Login /></KeepAlive>
      </div>

      <div v-else>
        <Register />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const authToggle = ref<boolean>(false);
const callRegister = () => {
  authToggle.value = true;
};

const callLogin = () => {
  authToggle.value = false;
};
</script>
<style scoped>
.container {
  background-image: linear-gradient(
    135deg,
    rgb(30, 41, 59) 0%,
    rgb(15, 23, 42) 100%
  );
}
.title {
  font-family: "Exo 2", sans-serif;
  letter-spacing: 0.02rem;
}
</style>
