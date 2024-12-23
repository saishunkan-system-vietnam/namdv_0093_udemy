<template>
  <div
    style="
      display: flex;
      width: calc(100vw - 64px);
      height: calc(100vh - 64px);
      align-items: center;
      justify-content: center;
    "
  >
    <button @click="login">Login</button>
  </div>
</template>
<script setup>
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const router = useRouter()
const { auth } = storeToRefs(useAuthStore())
const login = () => {
  console.log(auth.value)
  auth.value = true
  router.push({ name: 'todo' })
}
</script>

<style scoped>
button {
  padding: 4px 8px;
  min-width: 80px;
  border: 1px solid black;
  margin: 0px 4px;
  height: 30px;
}

button:hover {
  cursor: pointer;
  opacity: 0.8;
  background-color: antiquewhite;
}
</style>
