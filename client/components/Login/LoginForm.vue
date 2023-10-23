<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();

async function login() {
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form @submit.prevent="login">
    <h3 class="text-2xl font-bold mb-4">Login</h3>
    <fieldset>
      <div class="space-x-6">
        <label for="aligned-name">Username</label>
        <input 
          v-model.trim="username" 
          type="text" 
          id="aligned-name" 
          class="px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-sky-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Username" required />
      </div>
      <div class="space-x-7">
        <label for="aligned-password">Password</label>
        <input 
          type="password" 
          v-model.trim="password" 
          id="aligned-password" 
          class="px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-sky-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Password" required />
      </div>
      <div class="mt-4">
        <button 
          type="submit" 
          class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded mr-6"
          >Submit</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
</style>
