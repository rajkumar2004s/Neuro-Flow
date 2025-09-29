<template>
  <div class="min-h-[100vh]">
    <Navbar v-if="isLoggedIn" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../app/stores/auth";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
  auth.initAuth();

  if (auth.isAuthenticated && router.currentRoute.value.path === "/") {
    router.push("/projects");
  }
});

const isLoggedIn = computed(() => auth.isAuthenticated);
</script>
