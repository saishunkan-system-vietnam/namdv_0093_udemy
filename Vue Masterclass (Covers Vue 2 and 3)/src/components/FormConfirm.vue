<template>
  <div class="popup" v-if="props.isPopup">
    <div class="bg-popup"></div>
    <div class="content">
      <div>{{ props.title }}</div>
      <slot></slot>
      <slot name="sub"></slot>
      <div style="align-items: end; margin-top: 8px; display: flex;justify-content: space-between;">
        <button @click="emits('del')">Close</button>
        <button @click="emits('confirm', 'Your operation is success')">Confirm</button>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  isPopup: Boolean,
})
const emits = defineEmits(['confirm', 'del'])
</script>
<style scoped>
.popup {
  position: absolute;
  z-index: 10;
  top: 0;
  height: 100vh;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-popup {
  position: absolute;
  z-index: 10;
  top: 0;
  height: 100vh;
  left: 0;
  width: 100vw;
  background-color: rgb(243, 238, 238);
  opacity: 0.5;
}

.content {
  min-width: 400px;
  min-height: 150px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 11;
  box-shadow: 3px;
}

button {
  padding: 4px 8px;
  min-width: 80px;
  border: 1px solid black;
  margin-right: 4px;
}

button:hover {
  cursor: pointer;
  opacity: 0.8;
  background-color: antiquewhite;
}
</style>
