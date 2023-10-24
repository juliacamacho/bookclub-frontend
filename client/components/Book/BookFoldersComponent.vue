<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import BookRatingComponent from "@/components/Book/BookRatingComponent.vue";

const emit = defineEmits(["rated"]);

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["bookId"]);

const loaded = ref(false);
let currentFolder = ref<string>();

function handeRatedEvents(value: number) {
  console.log("rated1");
  emit("rated");
}

async function updateCurrentFolder() {
  const ToReadContents = await fetchy(`/api/users/${currentUsername.value}/folders/ToRead`, "GET");
  const ReadingContents = await fetchy(`/api/users/${currentUsername.value}/folders/Reading`, "GET");
  const ReadContents = await fetchy(`/api/users/${currentUsername.value}/folders/Read`, "GET");

  if (ToReadContents.includes(props.bookId)) {
    currentFolder.value = "ToRead";
  } else if (ReadingContents.includes(props.bookId)) {
    currentFolder.value = "Reading";
  } else if (ReadContents.includes(props.bookId)) {
    currentFolder.value = "Read";
  } else {
    currentFolder.value = "";
  }
}

async function assignNewFolder(folderName: string) {
  if (currentFolder.value !== "") {
    // if book is in a folder, remove book from current folder (needs to happen regardless of adding or removing book)
    await fetchy(`/api/users/${currentUsername.value}/folders/${currentFolder.value}/remove`, "PATCH", { body: { bookId: props.bookId } });
  }
  if (currentFolder.value !== folderName) {
    // if assigning book to a different folder, do this: add book to new folder
    await fetchy(`/api/users/${currentUsername.value}/folders/${folderName}/add`, "PATCH", { body: { bookId: props.bookId } });
  }
  await updateCurrentFolder();
}

onBeforeMount(async () => {
  await updateCurrentFolder();
  loaded.value = true;
});
</script>

<template>
  <section class="flex space-x-6" v-if="loaded">
    <!-- <article v-for="friend in friends" :key="friend._id">
      <button @click="sendRec(friend)">{{ friend }}</button>
    </article> -->
    <button 
      @click="assignNewFolder('ToRead')"
      class="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
      :class="{ 'bg-orange-700': currentFolder == 'ToRead' }"
    >{{ currentFolder !== "ToRead" ? "Add to 'To Read' Folder" : "Remove from 'To Read' Folder" }}</button>
    <button 
      @click="assignNewFolder('Reading')"
      class="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
      :class="{ 'bg-orange-700': currentFolder == 'Reading' }"
    >{{ currentFolder !== "Reading" ? "Add to 'Reading' Folder" : "Remove from 'Reading' Folder" }}</button>
    <button 
      @click="assignNewFolder('Read')"
      class="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
      :class="{ 'bg-orange-700': currentFolder == 'Read' }"
      >{{ currentFolder !== "Read" ? "Add to 'Read' Folder" : "Remove from 'Read' Folder" }}</button>
  
    <BookRatingComponent v-on:rated="handeRatedEvents" v-if="currentFolder === 'Read'" :bookId="props.bookId" />

    </section>
  <!-- <p v-else-if="loaded">No friends found</p> -->
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
