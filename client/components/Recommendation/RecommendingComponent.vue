<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["bookId"]);

const loaded = ref(false);
let friends = ref<Array<Record<string, string>>>([]);

async function getFriends() {
  let friendsResults;
  try {
    friendsResults = await fetchy("/api/friends", "GET");
  } catch (_) {
    return;
  }
  friends.value = friendsResults;
}

async function sendRec(friend: Record<string, string>) {
  try {
    // console.log(props.bookId, currentUsername.value, friend);
    await fetchy(`/api/books/${props.bookId}`, "POST", { body: { usernameTo: friend, usernameFrom: currentUsername.value } });
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  await getFriends();
  loaded.value = true;
});
</script>

<template>
  <!-- <h1>Friends</h1> -->
  <section class="friends" v-if="loaded && friends.length !== 0">
    <article v-for="friend in friends" :key="friend._id">
      <button @click="sendRec(friend)">{{ friend }}</button>
    </article>
  </section>
  <p v-else-if="loaded">No friends found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
