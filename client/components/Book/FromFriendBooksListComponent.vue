<!-- OLD COMPONENT -->

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["name", "books"]);
const loaded = ref(false);

onBeforeMount(async () => {
  console.log("props.books:", props.books);
  loaded.value = true;
});
</script>

<template>
  <h1>From {{ props.name }}:</h1>
  <section class="recs" v-if="loaded && books.length !== 0">
    <article v-for="book in books" :key="book._id">
      <a :href="`/books/${book._id}`">{{ book.title }}</a>
    </article>
  </section>
  <p v-else-if="loaded">No books found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
