const currentTab = ref('Home')
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import Reading from "@/components/Folder/ReadingFolderComponent.vue";
import Read from "@/components/Folder/ReadFolderComponent.vue";
import ToRead from "@/components/Folder/ToReadFolderComponent.vue";
import Friends from "@/components/Profile/FriendsComponent.vue";

const { currentUsername } = storeToRefs(useUserStore());
const props = defineProps(["username"]);
const currentlyFriends = ref(false);
const friendRequestSent = ref(false);
const currentTab = ref("Currently Reading");
const loaded = ref(false);

async function checkIfFriends() {
  if (props.username === currentUsername.value) {
    currentlyFriends.value = true;
    return;
  }
  const friends = await fetchy(`/api/${currentUsername.value}/friends`, "GET");
  if (friends.includes(props.username)) {
    currentlyFriends.value = true;
    return;
  }
  const friendRequestsSent = await fetchy(`/api/friends/requests/sent`, "GET");
  for (const friendRequest of friendRequestsSent) {
    if (friendRequest.to === props.username) {
      friendRequestSent.value = true;
    }
  }
}

async function sendOrRemoveFriendRequest() {
  try {
    // console.log(props.bookId, currentUsername.value, friend);
    if (!friendRequestSent.value) {
      await fetchy(`/api/friends/requests/${props.username}`, "POST");
      friendRequestSent.value = true;
    } else {
      await fetchy(`/api/friends/requests/${props.username}`, "DELETE");
      friendRequestSent.value = false;
    }
  } catch (_) {
    return;
  }
}

const tabs: any = {
  "Currently Reading": Reading,
  Read,
  "To Read": ToRead,
  Friends,
};

onBeforeMount(async () => {
  await checkIfFriends();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded">
    <div class="flex space-x-6 items-center mb-6">
      <h1 class="text-3xl font-bold">{{ props.username }}</h1>
      <button
        v-if="!currentlyFriends"
        class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded" 
        @click="sendOrRemoveFriendRequest"
      > 
        {{ friendRequestSent ? "Remove friend request" : "Send friend request" }}</button>
    </div>
    <div class="text-2xl font-semibold flex space-x-5 mb-6">
      <button
        v-for="(_, tab) in tabs"
        :key="tab"
        class="hover:underline"
        :class="['tab-button', { active: currentTab === tab.toString() }, { underline: currentTab === tab.toString() }]"
        @click="currentTab = tab.toString()"
      >
        {{ tab }}
      </button>
    </div>
    <component :is="tabs[currentTab]" v-bind:username="props.username" class="tab"></component>
  </div>
  <p v-else>Loading...</p>
</template>
