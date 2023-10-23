<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import e from "cors";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["bookId"]);

const loaded = ref(false);
let ratingValue = ref();

async function submitRating() {
  await fetchy(`/api/books/${props.bookId}/rating`, "POST", { body: { value: ratingValue.value } });
}

onBeforeMount(async () => {
//   await updateCurrentFolder();
  loaded.value = true;
});
</script>

<template>
  <section class="space-x-6" v-if="loaded">
    <form @submit.prevent="submitRating">
        <div class="flex space-x-5 items-end">
            <div>
            <legend>Enter rating from 0 to 5</legend>
            <div class="space-x-6">
                <input
                type="text"
                placeholder="Book rating"
                v-model="ratingValue"
                className="px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                required
                />
            </div>
          </div>
            <button 
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                >Add rating</button>
        </div>
    </form>
    </section>
  <!-- <p v-else-if="loaded">No friends found</p> -->
  <p v-else>Loading...</p>
</template>

<style scoped>
</style>
