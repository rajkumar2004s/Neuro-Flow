import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  const saveUser = (u: User) => {
    user.value = u;
    isAuthenticated.value = true;
    if (process.client) localStorage.setItem("user", JSON.stringify(u));
  };

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await $fetch<User>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      saveUser(loggedInUser);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const newUser = await $fetch<User>("/api/auth/register", {
        method: "POST",
        body: { name, email, password },
      });
      saveUser(newUser);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    if (process.client) localStorage.removeItem("user");
  };

  const initAuth = () => {
    if (process.client) {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          user.value = parsedUser;
          isAuthenticated.value = true;
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
  };

  return { user, isAuthenticated, login, register, logout, initAuth };
});
