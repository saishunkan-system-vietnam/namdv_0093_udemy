import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// option API khi muốn dùng bên ngoài để kèm reactivity
// export const useMemberStore = defineStore('member', {
//   state: () => ({
//     index: 1,
//     members: [
//       { id: 1, name: 'tainm12345', dateJoin: 2015, isDel: false },
//       { id: 2, name: 'toantn', dateJoin: 2021, isDel: false },
//       { id: 3, name: 'chungpv', dateJoin: 2020, isDel: false },
//       { id: 4, name: 'ducvt', dateJoin: 2021, isDel: false },
//       { id: 5, name: 'duclv', dateJoin: 2023, isDel: false },
//       { id: 6, name: 'namdv', dateJoin: 2022, isDel: false },
//     ]
//   }),
//   getters: {
//     fullMembers(state) {
//       const getFullYear = new Date().getFullYear()
//       return this.members.map((item) => ({ ...item, seniority: getFullYear - item.dateJoin }));
//     }
//   },
//   actions: {
//     addMember(member) {
//       const getFullYear = new Date().getFullYear()
//       const obj = {
//         id: this.members.length + 1,
//         name: member,
//         dateJoin: getFullYear,
//         isDel: false,
//       }
//       this.members.push(obj)
//     },
//     removeMember(id) {
//       this.members = this.members.map((item) => {
//         if (item.id === id) item.isDel = true
//         return item
//       })
//     },
//     editMember(id, name) {
//       console.log(123, id, name);

//       this.members = this.members.map((item) => {
//         if (item.id === id) {
//           item.name = name
//         }
//         return item
//       })
//       console.log(this.members);

//     }
//   }
// })

// composition API
export const useMemberStore = defineStore('member', () => {
  // state
  const members = ref([
    { id: 1, name: 'tainm', dateJoin: 2015, isDel: false },
    { id: 2, name: 'toantn', dateJoin: 2021, isDel: false },
    { id: 3, name: 'chungpv', dateJoin: 2020, isDel: false },
    { id: 4, name: 'ducvt', dateJoin: 2021, isDel: false },
    { id: 5, name: 'duclv', dateJoin: 2023, isDel: false },
    { id: 6, name: 'namdv', dateJoin: 2022, isDel: false },
  ])

  const getFullYear = ref(new Date().getFullYear())

  // getter
  const fullMembers = computed(() =>
    members.value.map((item) => ({ ...item, seniority: getFullYear.value - item.dateJoin })),
  )

  // setter
  function addMember(member) {
    const obj = {
      id: members.value.length + 1,
      name: member,
      dateJoin: getFullYear,
      isDel: false,
    }
    members.value.push(obj)
  }

  function removeMember(id) {
    members.value = members.value.map((item) => {
      if (item.id === id) item.isDel = true
      return item
    })
  }

  function editMember(id, name) {
    console.log(id, name, members.value)

    members.value = members.value.map((item) => {
      if (item.id === id) {
        item.name = name
      }
      return item
    })
  }

  function activeMember(id) {
    members.value = members.value.map((item) => {
      if (item.id === id) item.isDel = false
      return item
    })
  }

  return { members, fullMembers, addMember, removeMember, editMember, activeMember }
})
