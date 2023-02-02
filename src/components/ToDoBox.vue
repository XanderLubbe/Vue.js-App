<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import ToDoItem from "../components/ToDoItem.vue"
import { useToDoListStore } from "../stores/ToDoListStore"
import type { ToDo } from "../ToDoType"
import getDataPlease from "../views/ToDo.vue"
// import {blahhhh()} from "../components/EditToDoItem.vue"

defineProps({
  userName: String,
  // editItemText: String
})

const toDoListStore = useToDoListStore();


let id = 0

const formInputRef = ref('')
let editItemText = ''

function addItem() {
  toDoListStore.addItem(id++, formInputRef.value)
  formInputRef.value = ''
}


function removeItem(item: ToDo) {
  toDoListStore.removeItem(item.id)
}

function editItem(item: ToDo) {
  toDoListStore.findIndexOfSelectedItem(item.id)
  console.log(item.id, "this is the id")
  editItemText = item.text
  console.log(editItemText)
}

</script>

<template>
  <main class="toDoBox">
    <h2 class="titleHeading">Welcome to To Do</h2>
    <span>{{ userName }}</span>
    <ul class="box">
      <li class="box" v-for="item in toDoListStore.itemList">
        <input type="checkBox">
        {{ item.text }}
        <button @click="removeItem(item)">X</button>
        <button ref="editItemText" @click="editItem(item)">Edit</button>
      </li>
    </ul>

    <form class="form" @submit.prevent="addItem">
      <textarea class="textArea" v-model="formInputRef" rows="2" cols="30" def>{{ editItemText }}</textarea>
      <button>Add a To Do</button>
    </form>
  </main>
</template>

<style>
h2 {
  color: black;
}

.toDoBox {
  background-color: #01A7C2;
  color: white;
  border-style: solid;
  border-color: black;
  border-radius: 15px;
  width: 50%;
  float: left;
  padding: 20px;
  max-width: 20rem;

}

.form {
  max-width: 15rem;
}
</style>