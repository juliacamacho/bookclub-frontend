<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { ObjectId } from "mongodb";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import BookReadByComponent from "./BookReadByComponent.vue";
import BookInvitationComponent from "@/components/Invitation/BookInvitationComponent.vue";
import BookFoldersComponent from "@/components/Book/BookFoldersComponent.vue";
import RecommendingComponent from "@/components/Recommendation/RecommendingComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["bookId"]);

const book = ref<Record<string, string>>();
const loaded = ref(false);
const recommending = ref(false);

async function getBookFromId(_id: ObjectId) {
  let book;
  try {
    book = await fetchy(`/api/books/${_id}`, "GET");
  } catch (_) {
    // console.log("catching");
  }
  return book;
}

async function toggleRecommend() {
  recommending.value = recommending.value === true ? false : true;
}

onBeforeMount(async () => {
//   console.log("props.bookId:", props.bookId);
  book.value = await getBookFromId(props.bookId);
  loaded.value = true;
});
</script>

<template>
  <section class="recs" v-if="loaded && book !== null">
    <h1>{{ book?.title }}</h1>
    <h2>By {{ book?.author }}</h2>
    <p>Book description: {{ book?.description }}</p>
  </section>

  <p v-else-if="loaded">No book found</p>
  <p v-else>Loading...</p>

  <BookReadByComponent v-bind:bookId="props.bookId" />

  <BookInvitationComponent v-bind:bookId="props.bookId" />

  <BookFoldersComponent v-bind:bookId="props.bookId" />

  <button @click="toggleRecommend">Recommend to a friend</button>
  <section v-if="recommending">
    <h3>Choose a friend to recommend this to:</h3>
    <RecommendingComponent v-bind:bookId="props.bookId" />
  </section>
</template>

<style scoped>
</style>
