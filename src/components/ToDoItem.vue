<script setup lang="ts">
import { ref } from 'vue'
import { useToDoListStore } from '@/stores/ToDoListStore';
import type { ToDo } from '@/ToDoType';

defineProps({
  testPropOnItem: String,
})

const toDoListStore = useToDoListStore();

let id = 100
const formInputRef = ref('')
let editItemId: number
let showSaveEditsButton = false
let showAddButton = true


function removeItem(item: ToDo) {
  // item.action = "remove"
  // toDoListStore.addUndoItem({ ...item })
  // toDoListStore.removeItem(item.id)
}

function onEditClicked(item: ToDo) {
  // item.action = "edit"
  // toDoListStore.addUndoItem({ ...item })
  // editItemId = item.id
  // formInputRef.value = item.text;
  // showSaveEditsButton = true
  // showAddButton = false
}

</script>

<template>
  <div class="toDoItemContainer">
    
        <!-- <input type="checkBox"> -->
        <p>{{testPropOnItem}}</p>
        <!-- <button class="removeButton" @click="ToDoBox.removeItem()">X</button>
        <button @click.prevent="ToDoBox.onEditClicked()">Edit</button> -->
  </div>
</template>

<style>
.toDoItemContainer{
  border: 4px;
  background-color: red;
}

</style>