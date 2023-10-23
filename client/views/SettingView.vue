<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="sm:mx-12 sm:my-10 mx-4 my-3">
    <h1 class="text-3xl font-bold mb-6">User settings for {{ currentUsername }}</h1>
    <button class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded mr-6" @click="logout">Logout</button>
    <button class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded" @click="delete_">Delete User</button>
    <UpdateUserForm />
  </main>
</template>
