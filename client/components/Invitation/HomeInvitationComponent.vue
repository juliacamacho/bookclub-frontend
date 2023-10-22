<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
// import FriendBooksListComponent

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["invitation"]);
const invitationResolved = ref(false);
const bookTitle = ref("");
const loaded = ref(false);

async function getBookFromId() {
  try {
    const book = await fetchy(`/api/books/${props.invitation.book}`, "GET");
    bookTitle.value = book.title;
  } catch (_) {
    // console.log("catching");
  }
}

async function acceptInvitation() {
  await fetchy(`/api/invitations/${props.invitation._id}/accept`, "PATCH", { body: { bookId: props.invitation.book } });
  invitationResolved.value = true;
}

async function declineInvitation() {
  await fetchy(`/api/invitations/${props.invitation._id}/decline`, "PATCH");
  invitationResolved.value = true;
}

onBeforeMount(async () => {
  console.log("props.invitation:", props.invitation);
  await getBookFromId();
  loaded.value = true;
});
</script>

<template>
  <section class="recs" v-if="loaded">
    <div class="flex space-x-8" v-if="!invitationResolved">
      <a :href="`/books/${invitation.book}`">{{ bookTitle }}</a>
      <button @click="acceptInvitation">Accept Invitation</button>
      <button @click="declineInvitation">Decline Invitation</button>
    </div>
  </section>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
