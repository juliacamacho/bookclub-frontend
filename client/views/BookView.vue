<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import BookComponent from "@/components/Book/BookComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Book</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
      <!-- <h1>{{ $route.params._id }}</h1> -->
      <BookComponent v-bind:bookId="$route.params._id" />
    </section>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>