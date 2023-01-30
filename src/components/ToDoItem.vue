<script setup lang="ts">
import { computed, ref } from 'vue'

let id = 0
const newTodo = ref('')

const toDoMap = new Map()

function addMapItem(){
    toDoMap.set(id++,newTodo.value )
    newTodo.value = ''
    console.log(toDoMap)
}

function removeTodo() {
// remove to with the correct id
}

</script>

<template>
    <p>These are your ToDo items</p>
    <ul class="box">
      <li class="box" v-for="map in toDoMap" :key="map[1]">
        <input type="checkBox">
        {{ map[1] }}
        <button @click="removeTodo()">X</button>
        <button>Edit</button>
      </li>
    </ul>
</template>

<style>
.item {
    text-align: right;
    border-bottom: 2px;
}
.other {
    border: 1rem;
    background-color: red;
}
</style>