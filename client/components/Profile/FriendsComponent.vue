<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const requestResolved = ref(false);
const props = defineProps(["username"]);

const loaded = ref(false);
let friendRequests = ref<Array<Record<string, string>>>([]);
let friends = ref<Array<Record<string, string>>>([]);

async function getFriendRequests() {
  let friendRequestsResults;
  try {
    friendRequestsResults = await fetchy(`/api/friends/requests/received`, "GET");
  } catch (_) {
    return;
  }
  // console.log("friendsResults:", friendsResults);
  friendRequests.value = friendRequestsResults;
}

async function getFriends() {
  let friendsResults;
  try {
    friendsResults = await fetchy(`/api/${props.username}/friends`, "GET");
  } catch (_) {
    return;
  }
  // console.log("friendsResults:", friendsResults);
  friends.value = friendsResults;
}

async function acceptRequest(friendUsername: string) {
  await fetchy(`/api/friends/accept/${friendUsername}`, "PUT");
  await getFriends();
  requestResolved.value = true;
}

async function declineRequest(friendUsername: string) {
  await fetchy(`/api/friends/reject/${friendUsername}`, "PUT");
  await getFriends();
  requestResolved.value = true;
}

onBeforeMount(async () => {
  await getFriendRequests();
  await getFriends();
  loaded.value = true;
});
</script>

<template>
  <div class="space-y-6">

    <div v-if="currentUsername === props.username">
      <h2 class="text-xl font-bold mb-4">Pending friend requests:</h2>
      <div v-if="loaded && friendRequests.length !== 0">
        <article v-for="friendRequest in friendRequests" :key="friendRequest._id">
          <!-- <a>From: {{ friendRequest.from }}</a> -->
          <div class="bg-white drop-shadow-sm px-8 py-5 rounded-md flex justify-between items-center" v-if="!requestResolved">
            <a :href="`/users/${friendRequest.from}`" class="text-lg font-bold hover:underline">{{ friendRequest.from }} wants to be friends</a>
            <div class="space-x-6">
              <button class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded" @click="acceptRequest(friendRequest.from)">Accept Request</button>
              <button class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded" @click="declineRequest(friendRequest.from)">Decline Request</button>
            </div>
          </div>
        </article>
      </div>
      <p v-else-if="loaded">No friend requests found</p>
      <p v-else>Loading...</p>
    </div>

    <div>
      <h2 class="text-xl font-bold mb-4">Friends:</h2>
      <section class="recs" v-if="loaded && friends.length !== 0">
      <article v-for="friend in friends" :key="friend._id">
        <a :href="`/users/${friend}`">{{ friend }}</a>
      </article>
      </section>
      <p v-else-if="loaded">No friends found</p>
      <p v-else>Loading...</p>
    </div>

  </div>
</template>

<style scoped></style>
