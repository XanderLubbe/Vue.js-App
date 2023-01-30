<script setup lang="ts">
import { computed, ref } from 'vue'
import ToDoItem from "../components/ToDoItem.vue"

let id = 0

const newTodo = ref('')

//test using Maps
const toDoMap = new Map()

// toDoMap.set(1, 'default item set on ToDoBox 1')
// toDoMap.set(2, 'default item set on ToDoBox 2')


function addMapItem(){
    toDoMap.set(id++,newTodo.value )
    newTodo.value = ''
    console.log(toDoMap)
}


function removeTodo() {
  console.log("I was clicked here")
    toDoMap.delete(0)
}

</script>

<template>
  <main class="toDoBox">
    <h2>Welcome to 2Do</h2>
   <ToDoItem />
    <ul class="box">
      <li class="box" v-for="map in toDoMap" :key="map[1]">
        <input type="checkBox">
        {{ map[1] }}
        <button @click="removeTodo()">X</button>
        <button>Edit</button>
      </li>
    </ul>
  
    <form class="box" @submit.prevent="addMapItem">
      <textarea v-model="newTodo" rows="5" cols="50"></textarea>
      <button>Add a 2Do</button>    
    </form>  
  </main>  
</template>

<style>
/* .box {
outline-width: 1rem;
outline-color: aqua;
  text-align: center;
  border-top: 10px;
} */
.toDoBox {
  background-color: burlywood;
}
</style>