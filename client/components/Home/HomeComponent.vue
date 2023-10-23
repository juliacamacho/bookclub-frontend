const currentTab = ref('Home')
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Reading from "@/components/Home/HomeReadingComponent.vue";
import ToRead from "@/components/Home/HomeToReadComponent.vue";

const { currentUsername } = storeToRefs(useUserStore());

const currentTab = ref("What your friends are reading");

const tabs: any = {
  "What your friends are reading": Reading,
  "What your friends want to read": ToRead,
};
</script>

<template>
  <div>
    <button
      class="text-2xl font-bold mr-8 mb-5 hover:underline"
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab.toString() }, { underline: currentTab === tab.toString() }]"
      @click="currentTab = tab.toString()"
    >
      {{ tab }}
    </button>
    <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>

<style scoped>
</style>
