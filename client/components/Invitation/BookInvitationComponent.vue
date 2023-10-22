<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["bookId"]);

const loaded = ref(false);
let invitationPosted = ref<boolean>(false);

async function checkForInvitation() {
  try {
    const invitationsPosted = await fetchy(`/api/invitations/posted`, "GET");
    console.log("invitationsPosted:", invitationsPosted);
    if (invitationsPosted.filter((e) => e.book === props.bookId).length > 0) {
      invitationPosted.value = true;
    }
  } catch (_) {
    return;
  }
}

async function postInvitation() {
  try {
    // console.log(props.bookId, currentUsername.value, friend);
    await fetchy(`/api/books/${props.bookId}/invitation`, "POST");
    invitationPosted.value = true;
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  await checkForInvitation();
  loaded.value = true;
});
</script>

<template>
  <section class="friends" v-if="loaded">
    <button @click="postInvitation()" :disabled="invitationPosted">{{ !invitationPosted ? "Create Invitation" : "Invitation Created!" }}</button>
  </section>
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
