<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["userFrom"]);

const loaded = ref(false);
let recs = ref<Array<Record<string, string>>>([]);

async function getRecsFromUser(userTo: string, userFrom: string) {
  let recsResults;
  try {
    recsResults = await fetchy("/api/recommendations", "GET", { userTo, userFrom });
  } catch (_) {
    return;
  }
  recs.value = recsResults;
}

onBeforeMount(async () => {
  await getRecsFromUser(currentUsername, props.userFrom);
  loaded.value = true;
});
</script>

<template>
  <section class="recs" v-if="loaded && recs.length !== 0">
    <article v-for="rec in recs" :key="rec._id">
      <FriendBooksComponent />
      <h1>Book</h1>
    </article>
  </section>
  <p v-else-if="loaded">No recommendations found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
