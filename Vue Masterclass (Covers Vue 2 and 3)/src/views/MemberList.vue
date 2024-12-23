<template>
  <div v-show="isLoading" class="loading">
    <div class="loader"></div>
  </div>
  <div class="title">
    <span>Danh sách thành viên</span>
    <button @click="newF">New</button>
  </div>
  <div v-if="members.length === 0">No data</div>
  <div v-else v-for="(item, index) in members" :key="item.id" class="todoItem">
    <div style="min-width: 30px">{{ index + 1 }}.&emsp;</div>
    <div style="min-width: 120px">{{ item.name }}</div>
    <div style="min-width: 120px">{{ item.dateJoin }}</div>
    <template v-if="!item.isDel">
      <button @click="update(item)">Update</button>
      <button @click="del(item)">Del</button>
    </template>
    <button v-else @click="active(item)">Active</button>
  </div>
  <FormConfirm title="Delete item" :isPopup="isPopupDel" @del="closeDel" @confirm="confirmDel">
    <template #default>
      <span>Are you sure delete item:{{ itemBeChoose.name }}</span>
    </template>
  </FormConfirm>

  <FormConfirm
    title="Active item"
    :isPopup="isPopupActive"
    @del="closeActive"
    @confirm="confirmActive"
  >
    <template #default>
      <span>Are you sure active item:{{ itemBeChoose.name }}</span>
    </template>
  </FormConfirm>

  <FormConfirm
    title="Edit item"
    :isPopup="isPopupUpdate"
    @del="closeUpdate"
    @confirm="confirmUpdate"
  >
    <template #default>
      <label for="input">Value:</label>
      <input type="text" v-model="valueInput" />
    </template>
    <template #sub>
      <div>
        <div>Date join: {{ itemBeChoose.dateJoin }}</div>
      </div>
    </template>
  </FormConfirm>

  <FormConfirm title="New item" :isPopup="isPopupNew" @del="closeNew" @confirm="confirmNew">
    <template #default>
      <label for="input">Value:</label>
      <input type="text" v-model="valueInput" />
    </template>
  </FormConfirm>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import FormConfirm from '../components/FormConfirm.vue'
import { useMemberStore } from '../stores/member.js'
import { storeToRefs } from 'pinia'

const isLoading = ref(true)
const itemBeChoose = ref({})
const isPopupDel = ref(false)
const isPopupActive = ref(false)
const isPopupUpdate = ref(false)
const isPopupNew = ref(false)
const valueInput = ref('')
const { members } = storeToRefs(useMemberStore())
const { addMember, removeMember, editMember, activeMember } = useMemberStore()
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})

const del = (item) => {
  itemBeChoose.value = item
  isPopupDel.value = true
}

const update = (item) => {
  itemBeChoose.value = { ...item }
  isPopupUpdate.value = true
  valueInput.value = item.name
}

const active = (item) => {
  itemBeChoose.value = item
  isPopupActive.value = true
}

const newF = () => {
  isPopupNew.value = true
}

const closeDel = () => {
  isPopupDel.value = false
  itemBeChoose.value = undefined
}

const closeUpdate = () => {
  isPopupUpdate.value = false
  itemBeChoose.value = undefined
  valueInput.value = ''
}

const closeActive = () => {
  isPopupActive.value = false
  itemBeChoose.value = undefined
}

const closeNew = () => {
  isPopupNew.value = false
  valueInput.value = ''
}

const confirmDel = (message) => {
  isPopupDel.value = false
  isLoading.value = true
  setTimeout(() => {
    removeMember(itemBeChoose.value.id)
    itemBeChoose.value = undefined
    isLoading.value = false
    window.alert(message)
  }, 1000)
}

const confirmUpdate = (message) => {
  const checkDuplicate = members.value.find(
    (item) => item.id !== itemBeChoose.value.id && item.name === valueInput.value,
  )
  if (checkDuplicate) {
    window.alert('Duplicate user please use another name')
    return
  }
  isPopupUpdate.value = false
  isLoading.value = true
  setTimeout(() => {
    editMember(itemBeChoose.value.id, valueInput.value)
    itemBeChoose.value = undefined
    valueInput.value = ''
    isLoading.value = false
    window.alert(message)
  }, 1000)
}

const confirmNew = (message) => {
  const checkDuplicate = members.value.find((item) => item.name === valueInput.value)
  if (checkDuplicate) {
    window.alert('Duplicate user please use another name')
    return
  }
  isPopupNew.value = false
  isLoading.value = true
  setTimeout(() => {
    addMember(valueInput.value)
    valueInput.value = ''
    isLoading.value = false
    window.alert(message)
  }, 1000)
}

const confirmActive = (message) => {
  isPopupActive.value = false
  isLoading.value = true
  setTimeout(() => {
    activeMember(itemBeChoose.value.id)
    itemBeChoose.value = undefined
    isLoading.value = false
    window.alert(message)
  }, 1000)
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}

.loading {
  position: absolute;
  z-index: 10;
  top: 0;
  height: 100vh;
  left: 0;
  width: 100vw;
  background-color: black;
  opacity: 0.1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todoItem {
  margin: 8px;
  display: flex;
}

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

input {
  border: 1px solid black;
  padding: 4px;
  min-width: 100px;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #4db9bd;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
