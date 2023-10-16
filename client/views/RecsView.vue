<script setup lang="ts">
import RecListComponent from "@/components/Recommendation/RecListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>My Recommendations</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <RecListComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
