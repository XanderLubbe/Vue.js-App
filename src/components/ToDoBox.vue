<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToDoListStore } from "../stores/ToDoListStore"
import type { ToDo } from "../ToDoType"

const toDoListStore = useToDoListStore();

let id = 100
const formInputRef = ref('')
let editItemId: number
let showSaveEditsButton = false
let showAddButton = true

onMounted(() => {
    console.log("onMounted has commenced")
    toDoListStore.fetchData()
})

function addItem() {
  toDoListStore.addItem(id, formInputRef.value)
  toDoListStore.addUndoItem(id, formInputRef.value, "add")
  resetForm()
  id++
}


function removeItem(item: ToDo) {
  toDoListStore.addUndoItem(item.id, item.text, "remove")
  toDoListStore.removeItem(item.id)
}

function onSaveEditClicked(id: number) {
  toDoListStore.editItem(id, formInputRef.value)
  resetForm()
}

function onEditClicked(item: ToDo) {
  toDoListStore.addUndoItem(item.id, item.text, "edit")
  editItemId = item.id
  formInputRef.value = item.text;
  showSaveEditsButton = true
  showAddButton = false
}
function undoButtonClicked() {
  const poppedItem = toDoListStore.undoList.pop()
  if (poppedItem != undefined) {
    toDoListStore.holdUndoValues(poppedItem)
  }
}
function resetForm() {
  showSaveEditsButton = false
  showAddButton = true
  formInputRef.value = ''
}
</script>

<template>

  <main class="toDoBox">
    <h2 class="titleHeading">Add your ToDo items below</h2>
    <div v-if="toDoListStore.piniaErrorState"><span>{{ toDoListStore.datahubError }}</span></div>

    <ol class="box">
      <li class="il" v-for="item in toDoListStore.itemList">
        <input type="checkBox">
        {{ item.text }}
        <button @click="removeItem(item)">X</button>
        <button @click.prevent="onEditClicked(item)">Edit</button>
      </li>
    </ol>

    <form class="form" @submit.prevent="addItem">
      <textarea id="textAreaId" class="textArea" v-model="formInputRef" rows="3" cols="40"
        placeholder="Enter ToDo here"></textarea>
      <button class="addButton" v-show="showAddButton" @click=""><img alt="Add Icon" class="addIcon"
          src="@/assets/add.png" width="40" height="40" /></button>
    </form>
    <div class="editingDiv">
      <button class="editButton" v-show="showSaveEditsButton" @click="onSaveEditClicked(editItemId)">Save edits</button>
      <button class="cancelButton" @click="resetForm">Cancel</button>
    </div>
    <div>
      <button @click="undoButtonClicked">Undo</button>
    </div>

  </main>
  <div>

  </div>
</template>

<style>
.editingDiv {
  margin: 0 auto;
  width: 350px;

}

.editgButton {
  align-self: center;
}

.editToDoBox {
  position: relative;
  right: -23.5%;
  top: +50%;
  min-width: 50%;
  margin: 0 auto;
  float: left;
}

h2 {
  color: black;
}

.toDoBox {
  background-color: #01A7C2;
  color: white;
  font-size: large;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  border-radius: 5px;
  float: left;
  padding: 20px;
  width: 50rem;
  margin: 0 auto;
}

input[type=checkbox]:checked+li.strikethrough {
  text-decoration: line-through;
}

.addButton {
  background-color: transparent;
  border: none;
}

.form {
  margin: 0 auto;
  width: 350px;
}

.titleHeading {
  margin: 0 auto;
  width: 350px;
}

.textArea {
  align-items: center;
}

.box {

  list-style-type: lower-roman;
  border-color: black;
  padding: 5px;
  padding-left: 10px;
}

.il {
  border-bottom: 1px solid #000;
  padding: 20px;
}
</style>