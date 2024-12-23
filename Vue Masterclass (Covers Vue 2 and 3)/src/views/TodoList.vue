<template>
  <div v-show="isLoading" class="loading">
    <div class="loader"></div>
  </div>
  <div class="title">
    <span>Danh sách dự án</span>
    <button @click="newF">New</button>
  </div>
  <div v-if="todoList.length === 0">No data</div>
  <div v-else v-for="(item, index) in todoList" :key="item.id" class="todoItem">
    <div style="min-width: 30px">{{ index + 1 }}.&emsp;</div>
    <div style="min-width: 120px">{{ item.value }}</div>
    <button @click="update(item)">Update</button>
    <button @click="del(item)">Del</button>
    <button @click="handlerMember(item)">Members</button>
  </div>
  <FormConfirm title="Delete item" :isPopup="isPopupDel" @del="closeDel" @confirm="confirmDel">
    <template #default>
      <span>Are you sure delete item:{{ itemBeChoose.value }}</span>
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
  </FormConfirm>

  <FormConfirm title="New item" :isPopup="isPopupNew" @del="closeNew" @confirm="confirmNew">
    <template #default>
      <label for="input">Value:</label>
      <input type="text" v-model="valueInput" />
    </template>
  </FormConfirm>
  <PopupMember title="List members" :isPopup="isPopupMember" :members="itemBeChoose?.members" @del="closeMember" @confirm="updateMember"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FormConfirm from '../components/FormConfirm.vue'
import PopupMember from '@/components/PopupMember.vue'
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';

const todoList = ref([])
const isLoading = ref(true)
const itemBeChoose = ref({})
const isPopupDel = ref(false)
const isPopupUpdate = ref(false)
const isPopupNew = ref(false)
const isPopupMember = ref(false)
const valueInput = ref('')
const {todos} = storeToRefs(useTodoStore())
const {updateTodo} = useTodoStore()

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
    todoList.value = todos.value
  }, 1500)
})

const del = (item) => {
  itemBeChoose.value = item
  isPopupDel.value = true
}

const update = (item) => {
  itemBeChoose.value = { ...item }
  isPopupUpdate.value = true
  valueInput.value = item.value
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

const closeNew = () => {
  isPopupNew.value = false
  valueInput.value = ''
}

const confirmDel = (message) => {
  isPopupDel.value = false
  isLoading.value = true
  setTimeout(() => {
    todoList.value = todoList.value.filter((item) => item.id !== itemBeChoose.value.id)
    itemBeChoose.value = undefined
    isLoading.value = false
    updateTodo(todoList.value)
    window.alert(message)
  }, 1000)
}

const confirmUpdate = (message) => {
  isPopupUpdate.value = false
  isLoading.value = true
  setTimeout(() => {
    todoList.value = todoList.value.map((item) => {
      if (item.id === itemBeChoose.value.id) {
        item.value = valueInput.value
      }
      return item
    })
    updateTodo(todoList.value)
    itemBeChoose.value = undefined
    valueInput.value = ''
    isLoading.value = false
    window.alert(message)
  }, 1000)
}

const confirmNew = (message) => {
  isPopupNew.value = false
  isLoading.value = true
  setTimeout(() => {
    todoList.value.push({
      id: Math.floor(Math.random() * 100) + 1,
      value: valueInput.value,
      members: []
    })
    updateTodo(todoList.value)
    valueInput.value = ''
    isLoading.value = false
    window.alert(message)
  }, 1000)
}

const handlerMember = (item) => {
  isPopupMember.value = true
  itemBeChoose.value = item
}

const closeMember = () => {
  isPopupMember.value = false
  itemBeChoose.value = undefined
}

const updateMember = (message, membersNew) => {
  isPopupMember.value = false
  isLoading.value = true
  console.log(message, membersNew);

  setTimeout(() => {
    const index = todoList.value.findIndex(item => item.id === itemBeChoose.value.id)
    todoList.value[index].members = membersNew.map(item => item.id)
    updateTodo(todoList.value)
    isLoading.value = false
    itemBeChoose.value = undefined
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
  height: 30px;
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

.boxMember {
  padding: 4px;
  border-radius: 8px;
  border: 1px solid rgb(63, 201, 44);
  margin-bottom: 4px;
}
</style>
