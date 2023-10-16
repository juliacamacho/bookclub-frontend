<script setup lang="ts">
import RecListComponent from "@/components/Recommendation/RecListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main v-if="isLoggedIn">
    <h1>My Recommendations</h1>
    <RecListComponent />
  </main>
  <h1 v-else>Please login!</h1>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
