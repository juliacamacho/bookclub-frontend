<script setup lang="ts">
import RecListComponent from "@/components/Recommendation/RecListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main v-if="isLoggedIn" class="sm:mx-12 sm:my-10 mx-4 my-3">
    <h1 class="text-3xl font-bold mb-6">Your recommendations from friends</h1>
    <RecListComponent />
  </main>
  <h1 v-else>Please login!</h1>
</template>

<style scoped>
</style>
