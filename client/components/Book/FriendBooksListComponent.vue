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
  <div class="bg-gray-50 px-10 py-8 rounded flex space-x-16 items-center">

    <div class="space-y-2">
      <a class="text-xl font-bold" :href="`/users/${props.name}`">{{ props.name }}</a>
      <h3>{{ books.length + (books.length === 1 ? " book" : " books") }}</h3>
    </div>

    <div>
      <section v-if="loaded && books.length !== 0">
        <article v-for="book in books" :key="book._id">
          <a class="hover:underline" :href="`/books/${book._id}`">{{ book.title }}</a>
        </article>
      </section>
      <p v-else-if="loaded">No books found</p>
      <p v-else>Loading...</p>
    </div>

  </div>
</template>

<style scoped>
</style>
