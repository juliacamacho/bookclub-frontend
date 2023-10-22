<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import FriendBooksListComponent from "@/components/Book/FriendBooksListComponent.vue";

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
    folderContents.value = await fetchy(`/api/users/${props.username}/folders/ToRead`, "GET");
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
  <section v-if="loaded">
    <div class="bg-gray-50 px-8 py-8 rounded-md">
      <FriendBooksListComponent :name="props.username" :books="folderBooks" />
    </div>
  </section>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
