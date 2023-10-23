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
  <section class="mb-6" v-if="loaded && book !== null">
    <h1 class="text-3xl font-bold mb-2">{{ book?.title }}</h1>
    <h2 class="text-2xl font-semibold mb-4">By {{ book?.author }}</h2>
    <p>{{ book?.description }}</p>
  </section>
  <p v-else-if="loaded">No book found</p>
  <p v-else>Loading...</p>

  <div class="space-y-5">
    <BookFoldersComponent v-bind:bookId="props.bookId" />
    <BookReadByComponent v-bind:bookId="props.bookId" />
    
    <div class="flex space-x-8">
      <div>
        <button 
          @click="toggleRecommend"
          class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
          :class="{ 'bg-yellow-600': recommending }"
          >{{ !recommending ? 'Recommend to a friend' : 'Cancel recommending' }}</button>
        <section class="my-4 space-y-2" v-if="recommending">
          <h3 class="text font-semibold">Choose a friend to recommend this to:</h3>
          <RecommendingComponent v-bind:bookId="props.bookId" />
        </section>
      </div>
      <BookInvitationComponent v-bind:bookId="props.bookId" />
    </div>
  </div>

</template>

<style scoped>
</style>
