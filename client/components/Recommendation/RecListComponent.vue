<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import FriendRecsComponent from "@/components/Recommendation/FriendRecsComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
// const props = defineProps(["userFrom"]);

const loaded = ref(false);
let friends = ref<Array<Record<string, string>>>([]);

async function getFriends() {
  let friendsResults;
  try {
    friendsResults = await fetchy(`/api/${currentUsername.value}/friends`, "GET");
  } catch (_) {
    return;
  }
  friends.value = friendsResults;
}

onBeforeMount(async () => {
  await getFriends();
  // console.log("FRIENDS:", friends);
  // for (const friend in friends) {
  //   console.log("FRIEND:", friend);
  // }
  loaded.value = true;
});
</script>

<template>
  <!-- <h1>Friends</h1> -->
  <section class="friends" v-if="loaded && friends.length !== 0">
    <article v-for="friend in friends" :key="friend._id">
      <FriendRecsComponent :userFrom="friend" class="mb-5" />
      <!-- <FriendRecsComponent v-for="friend in friends" v-bind="friend" :key="friend._id" /> -->
      <!-- <h1>{{ friend }}</h1> -->
    </article>
  </section>
  <p v-else-if="loaded">No friends found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
