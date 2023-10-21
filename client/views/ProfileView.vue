<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import ProfileContainerComponent from "../components/Profile/ProfileContainerComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <section>
      <h1 v-if="isLoggedIn">{{ $route.params.username }}'s Profile</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <ProfileContainerComponent v-bind:username="$route.params.username" />
  </main>
</template>

<style scoped>
</style>
