<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="sm:mx-12 sm:my-10 mx-4 my-3">
    <h1 class="text-3xl font-bold mb-8">Please login or register!</h1>
    <div class="space-y-10">
      <LoginForm />
      <RegisterForm />
    </div>
  </main>
</template>
