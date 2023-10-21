<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import BooksListComponent from "@/components/Book/BooksListComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["username"]);

const loaded = ref(false);
let folderContents = ref<Array<Record<string, string>>>([]);
let folderBooks = ref<Array<Record<string, string>>>([]);

async function getBooksFromIds(folderBooks: Array<Record<string, string>>) {
  let booksList: Array<Record<string, string>> = [];
  try {
    for (const folderBook of folderBooks) {
      const _id = folderBook;
      const book = await fetchy(`/api/books/${_id}`, "GET");
      booksList.push(book);
    }
  } catch (_) {
    // console.log("catching");
  }
  // console.log("booksList:", booksList);
  return [...booksList];
}

// get books from folder
async function getFolderContents() {
  try {
    folderContents.value = await fetchy(`/api/user/${props.username}/folders/Read`, "GET");
    // console.log("folderContents.value:", folderContents.value);
    folderBooks.value = await getBooksFromIds(folderContents.value);
    // console.log("folderBooks.value:", folderBooks.value);
  } catch (_) {
    // console.log("catching");
    return;
  }
}

onBeforeMount(async () => {
  // console.log("props.userFrom:", props.userFrom);
  await getFolderContents();
  loaded.value = true;
});
</script>

<template>
  <section class="books" v-if="loaded && folderBooks.length !== 0">
    <BooksListComponent :books="folderBooks" />
    <!-- <h1>From {{ props.userFrom }}:</h1>
    <article v-for="rec in recs" :key="rec._id">
      <h1>book: {{ rec.book }}</h1>
    </article> -->
  </section>
  <p v-else-if="loaded">Folder is empty</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
