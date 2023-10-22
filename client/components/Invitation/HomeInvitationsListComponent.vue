<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import HomeInvitationComponent from "@/components/Invitation/HomeInvitationComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const invitations = ref<Array<Record<string, string>>>([]);
const loaded = ref(false);

// get invitations recieved
async function getInvitationsRecieved() {
  try {
    invitations.value = await fetchy(`/api/invitations/received`, "GET");
  } catch (_) {
    // console.log("catching");
    return;
  }
}

onBeforeMount(async () => {
  await getInvitationsRecieved();
  console.log("invitations:", invitations);
  loaded.value = true;
});
</script>

<template>
  <section class="recs" v-if="loaded && invitations.length !== 0">
    <div class="bg-gray-50 px-8 py-8 rounded-md">
      <h2 class="text-xl font-bold mb-4">Invitations from your friends:</h2>
      <article v-for="invitation in invitations" :key="invitation._id">
        <HomeInvitationComponent v-bind:invitation="invitation" />
      </article>
    </div>
  </section>
  <p class="bg-gray-50 px-8 py-8 rounded-md text-lg font-semibold" v-else-if="loaded">You don't have any reading invitations to respond to right now.</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
