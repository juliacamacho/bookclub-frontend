<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
// import FromFriendBooksListComponent from "@/components/Book/FromFriendBooksListComponent.vue";
import FriendBooksListComponent from "@/components/Book/FriendBooksListComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["userFrom"]);

const loaded = ref(false);
let recs = ref<Array<Record<string, string>>>([]);
let recsBooks = ref<Array<Record<string, string>>>([]);

async function getBooksFromIds(recs: Array<Record<string, string>>) {
  // console.log("userTo:", username);
  // console.log("userFrom:", from);
  let booksList: Array<Record<string, string>> = [];
  try {
    for (const rec of recs) {
      const _id = rec.book;
      // console.log("id:", _id);
      const book = await fetchy(`/api/books/${_id}`, "GET");
      booksList.push(book);
    }
  } catch (_) {
    // console.log("catching");
  }
  // console.log("booksList:", booksList);
  return [...booksList];
}

async function getRecsFromUser(username: string, from: string) {
  // console.log("userTo:", username);
  // console.log("userFrom:", from);
  try {
    recs.value = await fetchy("/api/recommendations", "GET", { query: { username, from } });
    recsBooks.value = await getBooksFromIds(recs.value);
  } catch (_) {
    // console.log("catching");
    return;
  }
}

onBeforeMount(async () => {
  // console.log("props.userFrom:", props.userFrom);
  await getRecsFromUser(currentUsername.value, props.userFrom);
  loaded.value = true;
});
</script>

<template>
  <section class="recs" v-if="loaded && recs.length !== 0">
    <FriendBooksListComponent :name="props.userFrom" :books="recsBooks" />
    <!-- <FromFriendBooksListComponent :name="props.userFrom" :books="recsBooks" /> -->
    <!-- <h1>From {{ props.userFrom }}:</h1>
    <article v-for="rec in recs" :key="rec._id">
      <h1>book: {{ rec.book }}</h1>
    </article> -->
  </section>
  <p v-else-if="loaded">No recommendations found</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
