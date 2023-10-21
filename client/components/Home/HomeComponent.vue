const currentTab = ref('Home')
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Reading from "@/components/Home/HomeReadingComponent.vue";
import ToRead from "@/components/Home/HomeToReadComponent.vue";

const { currentUsername } = storeToRefs(useUserStore());

const currentTab = ref("What your friends are reading");

const tabs = {
  "What your friends are reading": Reading,
  "What your friends want to read": ToRead,
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

<style scoped>
</style>
