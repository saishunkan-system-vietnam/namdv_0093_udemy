<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.js'
import { storeToRefs } from 'pinia'
const { auth } = storeToRefs(useAuthStore())
const router = useRouter()
</script>

<template>
  <button @click="router.push({ name: 'todo' })" v-if="auth">go todo page</button>
  <button @click="router.push({ name: 'member' })" v-if="auth">go member page</button>
  <RouterView />
</template>

<style scoped>
button {
  padding: 4px 8px;
  min-width: 80px;
  border: 1px solid black;
  margin: 0px 4px;
}

button:hover {
  cursor: pointer;
  opacity: 0.8;
  background-color: antiquewhite;
}
</style>
