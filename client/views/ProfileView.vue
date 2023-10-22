<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import ProfileContainerComponent from "../components/Profile/ProfileContainerComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="sm:mx-12 sm:my-10 mx-4 my-3">
    <section class="mb-6">
      <h1 v-if="isLoggedIn" class="text-3xl font-bold">{{ $route.params.username }}</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <ProfileContainerComponent v-bind:username="$route.params.username" />
  </main>
</template>

<style scoped>
</style>
