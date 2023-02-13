<script setup lang="ts">
import { useToDoListStore } from '@/stores/ToDoListStore';
import type { ToDo } from '@/ToDoType';
import ToDoBox from "../components/ToDoBox.vue";


const toDoListStore = useToDoListStore();

function removeItem(item: ToDo) {
  item.action = "remove"
  toDoListStore.addUndoItem({ ...item })
  toDoListStore.removeItem(item.id)
}

function onEditClicked(item: ToDo) {
  item.action = "edit"
  toDoListStore.addUndoItem({ ...item })
  editItemId = item.id
  formInputRef.value = item.text;
  showSaveEditsButton = true
  showAddButton = false
}

</script>

<template>
      <ol class="box">
      <li class="il" v-for="item in toDoListStore.itemList">
        <input type="checkBox">
        {{ item.text }}
        <button class="removeButton" @click="ToDoBox.removeItem(item)">X</button>
        <button @click.prevent="ToDoBox.onEditClicked(item)">Edit</button>
      </li>
    </ol>

</template>

<style>

</style>