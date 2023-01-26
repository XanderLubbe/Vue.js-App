<script setup lang="ts">
import { ref } from 'vue'

let id = 0

const newTodo = ref('')
const todos = ref([
  { id: id++, text: 'List' },
  { id: id++, text: 'Add' },
  { id: id++, text: 'Delete' },
  { id: id++, text: 'Edit' },
  { id: id++, text: 'Mark as done' },
  { id: id++, text: 'Undo' }
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value })
  newTodo.value = ''
}

function removeTodo(todo: typeof todos) {
  // todos.value = todos.value.filter((t) => t !== todo)
}
function editTodo(todo: typeof todos){
  // todo.value.text = newText
}
function markAsDone(todo: typeof todos) {

}
</script>

<template>
    <h2>Welcome to 2Do</h2>
  
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkBox">
        {{ todo.text }}
        <button @click="removeTodo(todo)">X</button>
        <button>Edit</button>
      </li>
    </ul>
  
    <form @submit.prevent="addTodo">
      <textarea v-model="newTodo" rows="5" cols="50"></textarea>
      <button>Add a 2Do</button>    
    </form>
  
  
  
  </template>