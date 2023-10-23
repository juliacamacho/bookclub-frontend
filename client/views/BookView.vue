<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import BookComponent from "@/components/Book/BookComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="sm:mx-12 sm:my-10 mx-4 my-3">
    <section v-if="isLoggedIn">
      <BookComponent v-bind:bookId="$route.params._id" />
    </section>
    <h1 v-else>Please login!</h1>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>