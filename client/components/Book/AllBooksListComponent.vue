<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import BooksListComponent from "@/components/Book/BooksListComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["username"]);

const loaded = ref(false);
let books = ref<Array<Record<string, string>>>([]);

async function getBooks() {
  try {
    books.value = await fetchy(`/api/books`, "GET");
  } catch (_) {
    // console.log("catching");
    return;
  }
}

onBeforeMount(async () => {
  // console.log("props.userFrom:", props.userFrom);
  await getBooks();
  console.log("BOOKS::", books.value);
  loaded.value = true;
});
</script>

<template>
  <section class="books" v-if="loaded && books.length !== 0">
    <article v-for="book in books" :key="book._id">
        <a :href="`/books/${book._id}`" class="hover:underline">{{ book.title }}</a>
      </article>
  </section>
  <p v-else-if="loaded">There are currently no books.</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>