<script setup lang="ts">
// import PostListComponent from "@/components/Post/PostListComponent.vue";
import HomeComponent from "@/components/Home/HomeComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="sm:mx-12 sm:my-10 mx-4 my-3">
    <!-- <h1 class="text-3xl font-bold">Home Page</h1> -->
    <section>
      <h1 class="text-3xl font-bold mb-6" v-if="isLoggedIn">Welcome, {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <!-- <PostListComponent /> -->
    <HomeComponent />
  </main>
</template>

<style scoped>
</style>
