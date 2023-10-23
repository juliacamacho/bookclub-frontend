<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

let title = ref("");
let author = ref("");
let description = ref("");

async function addBook() {
  await fetchy(`/api/books`, "POST", { body: { title: title.value, author: author.value, description: description.value } });
}
</script>

<template>
  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Add a new book</h2>
    <div class="space-y-5">
      <form @submit.prevent="addBook" class="space-y-5">
        <fieldset class="space-y-4">
          <div>
            <legend>Title</legend>
            <div class="space-x-6">
                <input
                type="text"
                placeholder="Book title"
                v-model="title"
                className="px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-sky-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                required
                />
            </div>
          </div>
          <div>
            <legend>Author</legend>
            <div class="space-x-6">
                <input
                type="text"
                placeholder="Book author"
                v-model="author"
                className="px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-sky-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                required
                />
            </div>
          </div>
          <div>
            <legend>Book description</legend>
            <div class="space-x-6">
                <input
                type="text"
                placeholder="Book description"
                v-model="description"
                className="px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-sky-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                required
                />
            </div>
          </div>
        </fieldset>
        <button type="submit" class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded mr-6">Add book</button>
      </form>

    </div>
  </div>
</template>
