const currentTab = ref('Home')
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Reading from "@/components/Folder/ReadingFolderComponent.vue";
import Read from "@/components/Folder/ReadFolderComponent.vue";
import ToRead from "@/components/Folder/ToReadFolderComponent.vue";
import Friends from "@/components/Profile/FriendsComponent.vue";

const { currentUsername } = storeToRefs(useUserStore());
const props = defineProps(["username"]);

const currentTab = ref("Currently Reading");

const tabs = {
  "Currently Reading": Reading,
  Read,
  "To Read": ToRead,
  Friends,
};

</script>

<template>
  <div>
    <button v-for="(_, tab) in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]" @click="currentTab = tab">
      {{ tab }}
    </button>
    <component :is="tabs[currentTab]" v-bind:username="props.username" class="tab"></component>
  </div>
</template>
