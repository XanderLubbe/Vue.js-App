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
    toDoMap.delete([id])
    console.log(toDoMap)
}

</script>

<template>
  <main class="toDoBox">
    <h2>Welcome to 2Do</h2>
    <ul class="box">
      <li class="box" v-for="map in toDoMap" :key="map[1]">
        <input type="checkBox">
        {{ map[1] }}
        <button @click="removeTodo()">X</button>
        <button>Edit</button>
      </li>
    </ul>
  
    <form class="form" @submit.prevent="addMapItem">
      <textarea class="textArea" v-model="newTodo" rows="5" cols="30"></textarea>
      <button>Add a 2Do</button>    
    </form>  
  </main>  
</template>

<style>
h2{
 /* color: */
}
.toDoBox {
  background-color: burlywood;
  border-style: solid;
  border-radius: 15px;
  width: 50%;
  float: left;
  padding: 20px;
  max-width: 20rem;
}
.form {
  max-width: 15rem;
  background-color: red;
}
.textArea {
  /* max-width: fit-content; */
  /* align-items: center; */
}

</style>