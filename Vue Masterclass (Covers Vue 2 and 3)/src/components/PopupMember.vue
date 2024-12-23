<template>
  <div class="popup" v-if="props.isPopup">
    <div class="bg-popup"></div>
    <div class="content">
      <span>{{ props.title }}</span>
      <div>
        <span style="padding-right: 16px;">Members:</span>
        <select v-model="memberSelect" style="min-width: 80px; margin-right: 20px;min-height: 26px;">
          <option
            v-for="member in fullMembers"
            :key="member.id"
            :value="member.id"
            :disabled="checkExistInList(member.id)"
          >
            {{ member.name }}
          </option>
          <option value=""></option>
        </select>
        <button v-if="!!memberSelect" @click="add">Add</button>
      </div>
      <div>
        <div v-for="item in membersInUse" :key="item" :style="{ margin: '6px 4px', display: 'flex' }">
          <div style="min-width: 80px;">{{ item.name }}</div>
          <button @click="del(item.id)">Del</button>
        </div>
      </div>
      <div style="align-items: end; margin-top: 8px; display: flex;justify-content: space-between;">
        <button @click="handlerClose">Close</button>
        <button @click="handlerConfirm">Confirm</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash'
import { ref, watch } from 'vue'

const props = defineProps({
  members: Array,
  isPopup: Boolean,
  title: String,
})
const emits = defineEmits(['del', 'confirm'])
const { fullMembers } = storeToRefs(useMemberStore())
const membersInUse = ref([])
const memberSelect = ref('')

const checkExistInList = (id) => {
  return (
    membersInUse.value?.find((item) => item.id === id) ||
    fullMembers.value.find((item) => item.isDel && item.id === id)
  )
}

const add = () => {
  const item = fullMembers.value.find((item) => item.id === memberSelect.value)
  membersInUse.value.push(item)
  memberSelect.value = ''
}

const del = (id) => {
  membersInUse.value = membersInUse.value.filter(item => item.id !== id)
}

const handlerClose = () => {
  memberSelect.value = ''
  emits('del')
}

const handlerConfirm = () => {
  memberSelect.value = ''
  emits('confirm', 'Your operation is success', membersInUse.value)
}

watch(
  () => props.members,
  () => {
    membersInUse.value = cloneDeep(
      props.members?.reduce((init, item) => {
        const a = fullMembers.value.find((fm) => fm.id === item && !fm.isDel)
        if (a) init.push(a)
        return init
      }, []),
    )
  },
  { deep: true },
)
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
