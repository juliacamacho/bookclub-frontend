<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import AllBooksListComponent from "@/components/Book/AllBooksListComponent.vue";
import AddBookForm from "@/components/Book/AddBookForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <div class="sm:mx-12 sm:my-10 mx-4 my-3">
    <main v-if="isLoggedIn">
      <h1 class="text-3xl font-bold mb-6">All Books</h1>
      <AllBooksListComponent />
      <AddBookForm />
    </main>
    <h1 v-else class="text-3xl font-bold mb-6">Please login!</h1>
  </div>
</template>

<style scoped>
</style>
