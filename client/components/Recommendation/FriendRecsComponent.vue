<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
// import FriendBooksListComponent

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["userFrom"]);

const loaded = ref(false);
let recs = ref<Array<Record<string, string>>>([]);

async function getRecsFromUser(username: string, from: string) {
  // console.log("userTo:", username);
  // console.log("userFrom:", from);
  try {
    recs.value = await fetchy("/api/recommendations", "GET", { query: { username, from } });
  } catch (_) {
    console.log("catching");
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
    <article v-for="rec in recs" :key="rec._id">
      <!-- <FriendBooksComponent /> -->
      <h1>{{ props.userFrom }}</h1>
    </article>
  </section>
  <p v-else-if="loaded">No recommendations found</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
