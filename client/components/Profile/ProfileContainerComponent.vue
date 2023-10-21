const currentTab = ref('Home')
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";
import { ref } from "vue";
import Reading from "@/components/Folder/ReadingFolderComponent.vue";
import Read from "@/components/Folder/ReadFolderComponent.vue";
import ToRead from "@/components/Folder/ToReadFolderComponent.vue";
import Friends from "@/components/Profile/FriendsComponent.vue";

const { currentUsername } = storeToRefs(useUserStore());

const currentTab = ref("Reading");

const tabs = {
  Reading,
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
    <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>
