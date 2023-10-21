<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["bookId"]);

const loaded = ref(false);
let friends = ref<Array<Record<string, string>>>([]);
let friendsWhoRead = ref<Array<Record<string, string>>>([]);

async function getFriends() {
  let friendsResults;
  try {
    friendsResults = await fetchy(`/api/${currentUsername.value}/friends`, "GET");
  } catch (_) {
    return;
  }
  friends.value = friendsResults;
}

// get books from folder
async function checkIfUserHasReadThisBook(username: Record<string, string>) {
  console.log("username:", username);
  try {
    const readFolderContents = await fetchy(`/api/users/${username}/folders/Read`, "GET");
    if (readFolderContents.includes(props.bookId)) {
      return true;
    } else {
      return false;
    }
  } catch (_) {
    // console.log("catching");
    return;
  }
}

onBeforeMount(async () => {
  await getFriends();
  // console.log("FRIENDS:", friends);
  const friendsList: Array<Record<string, string>> = [];
  for (const friend of friends.value) {
    if (await checkIfUserHasReadThisBook(friend)) {
      friendsList.push(friend);
    }
  }
  friendsWhoRead.value = friendsList;
  loaded.value = true;
});
</script>

<template>
  <!-- <h1>Friends</h1> -->
  <h2>Read by:</h2>
  <section class="friends" v-if="loaded && friendsWhoRead.length !== 0">
    <article v-for="friend in friendsWhoRead" :key="friend._id">
      <h1>{{ friend }}</h1>
    </article>
  </section>
  <p v-else-if="loaded">None of your friends have read this book yet</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
