import { ref } from 'vue'
import { defineStore } from 'pinia'

// composition API
export const useTodoStore = defineStore('todo', () => {
  // state
  const todos = ref([
    { id: 1, value: 'UNAGI', members: [1, 2] },
    { id: 2, value: 'ECOUPOUN', members: [3, 2] },
    { id: 3, value: 'SMOKT', members: [1, 3] },
    { id: 4, value: 'ASARI', members: [1, 4] },
    { id: 5, value: 'QRGRANT', members: [5] },
    { id: 6, value: 'CE', members: [5, 2] },
    { id: 7, value: 'WAGO', members: [4, 2] },
  ])

  // setter
  function updateTodo(newTodo) {
    todos.value = newTodo
  }

  return { todos, updateTodo }
})
