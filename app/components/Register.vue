<template>
  <div>
    <div class="pt-8 flex flex-col gap-2">
      <label class="text-white">Full Name</label>
      <input placeholder="Enter your full name" v-model="registerForm.name" />
    </div>
    <div class="pt-4 flex flex-col gap-2">
      <label class="text-white">Email</label>
      <input placeholder="Enter your email" v-model="registerForm.email" />
    </div>

    <div class="pt-4 flex flex-col gap-2">
      <label class="text-white">Password</label>

      <div class="relative">
        <input
          placeholder="Create a password"
          :type="showPassword ? 'text' : 'password'"
          v-model="registerForm.password"
        />

        <span
          @click="togglePassword"
          class="absolute right-4 m-2 cursor-pointer"
        >
          <span v-if="showPassword">
            <i class="fa-solid fa-eye-slash text-white"></i>
          </span>

          <span v-else>
            <i class="fa-solid fa-eye text-white"></i>
          </span>
        </span>
      </div>
    </div>
    <p class="text-red-500 text-center pt-2" v-if="error">{{ error }}</p>

    <button
      class="active-glow shiny-btn text-white bg-[#2f76e8] font-[Roboto] mt-4 p-2 w-full rounded-md"
      @click="handleRegister"
    >
      <Loader v-if="loading" />
      <div v-else><i class="fa-solid fa-user p-2 mr-2"></i> Create Account</div>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const registerForm = ref({
  name: "",
  email: "",
  password: "",
});
const loading = ref(false);
const error = ref("");

const handleRegister = async () => {
  if (
    !registerForm.value.name ||
    !registerForm.value.email ||
    !registerForm.value.password
  ) {
    error.value = "ALL FIELDS ARE REQUIRED !!";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registerForm.value.email)) {
    error.value = "Please enter a valid email address!";
    return;
  }
  loading.value = true;
  error.value = "";

  setTimeout(async () => {
    try {
      const success = await auth.register(
        registerForm.value.name,
        registerForm.value.email,
        registerForm.value.password
      );
      if (success) {
        await router.push("/projects");
      } else {
        error.value = "Registration failed. Please try again.";
      }
    } catch (err) {
      error.value = "Registration failed. Please try again.";
    } finally {
      loading.value = false;
    }
  }, 2000);
};
</script>
<style scoped>
input {
  background-color: #0f172a;
  padding: 10px;
  width: 22vw;
  border-radius: 6px;
  color: white;
  outline: none;
  border: 1px solid rgb(48, 48, 48);
  font-family: sans-serif;
  font-size: 14px;
}
label {
  font-family: sans-serif;
}
@media screen and (max-width: 768px) {
  input {
    width: 60vw;
  }
}
</style>
