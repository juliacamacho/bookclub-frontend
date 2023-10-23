<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

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
    <div class="bg-white drop-shadow-sm px-8 py-5 rounded-md flex justify-between items-center" v-if="!invitationResolved">
      <a :href="`/books/${invitation.book}`" class="text-lg font-bold hover:underline">{{ bookTitle }}</a>
      <div class="space-x-6">
        <button class="bg-lime-600 hover:bg-lime-700 text-white font-semibold px-4 py-2 rounded" @click="acceptInvitation">Accept Invitation</button>
        <button class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded" @click="declineInvitation">Decline Invitation</button>
      </div>
    </div>
  </section>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
