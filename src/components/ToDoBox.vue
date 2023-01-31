<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ToDoItem from "../components/ToDoItem.vue"

let id = 0

const formInputRef = ref('')

const toDoListItems: Ref<any[]> = ref([])

function addItem(){
    toDoListItems.value.push({id: id++, value: formInputRef.value})
    formInputRef.value = ''
    console.log(toDoListItems)
}


function removeItem(id: Number) {
  toDoListItems.value = toDoListItems.value.filter( (item) => {
    return item.id != id
  })

}

</script>

<template>
  <main class="toDoBox">
    <h2>Welcome to To Do</h2>
    <ul class="box">
      <li class="box" v-for="item in toDoListItems"  >
        <input type="checkBox">
        {{ item.value }}
        <button @click="removeItem(item.id)">X</button>
        <button>Edit</button>
      </li>
    </ul>
  
    <form class="form" @submit.prevent="addItem">
      <textarea class="textArea" v-model="formInputRef" rows="5" cols="30"></textarea>
      <button>Add a To Do</button>    
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