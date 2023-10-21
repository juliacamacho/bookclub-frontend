<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import BooksListComponent from "@/components/Book/BooksListComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["username"]);

const loaded = ref(false);
let friends = ref<Array<Record<string, string>>>([]);

async function getFriends() {
  let friendsResults;
  try {
    friendsResults = await fetchy(`/api/${props.username}/friends`, "GET");
  } catch (_) {
    return;
  }
  console.log("friendsResults:", friendsResults);
  friends.value = friendsResults;
}

onBeforeMount(async () => {
  await getFriends();
  loaded.value = true;
});
</script>

<template>
  <section class="recs" v-if="loaded && friends.length !== 0">
    <!-- <BooksListComponent :books="recsBooks" /> -->
    <!-- <h1>From {{ props.userFrom }}:</h1> -->
    <article v-for="friend in friends" :key="friend._id">
      <a :href="`/users/${friend}`">{{ friend }}</a>
    </article>
  </section>
  <p v-else-if="loaded">No recommendations found</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
