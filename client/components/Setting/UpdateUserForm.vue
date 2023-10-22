<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let username = ref("");
let password = ref("");

const { updateUser, updateSession } = useUserStore();

async function updateUsername() {
  await updateUser({ username: username.value });
  await updateSession();
  username.value = "";
}

async function updatePassword() {
  await updateUser({ password: password.value });
  await updateSession();
  password.value = "";
}
</script>

<template>
  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Update user details</h2>
    <div class="space-y-5">
      <form @submit.prevent="updateUsername" class="pure-form">
        <fieldset>
          <legend>Change your username</legend>
          <div class="space-x-6">
            <input
              type="text"
              placeholder="New username"
              v-model="username"
              className="px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              required
            />
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-6">Update username</button>
          </div>
        </fieldset>
      </form>

      <form @submit.prevent="updatePassword" class="pure-form">
        <fieldset>
          <legend>Change your password</legend>
          <div class="space-x-6">
            <input
              type="password"
              placeholder="New password"
              v-model="password"
              className="px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              required
            />
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-6">Update password</button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
