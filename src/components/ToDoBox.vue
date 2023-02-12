<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { useToDoListStore } from "../stores/ToDoListStore"
import type { ToDo } from "../ToDoType"

const toDoListStore = useToDoListStore();
let errorState = false
if (toDoListStore.datahubError != "") {
  errorState = true
}

let id = 100
// TODO: WE don't need both of these!
const textAreaValue = ref(null)
const formInputRef = ref('')
let editItemId: number
let displayValue = true
let errorMessage = toDoListStore.datahubError

function addItem() {
  toDoListStore.addItem(id, formInputRef.value)
  toDoListStore.populateUndoList(id, formInputRef.value, "add")
  formInputRef.value = ''
  id++
}


function removeItem(item: ToDo) {
  toDoListStore.populateUndoList(item.id, item.text, "remove")
  toDoListStore.removeItem(item.id)
}

function editItem(id: number) {
  toDoListStore.editItem(id, formInputRef.value)
  textAreaValue.value.value = ""
  formInputRef.value = ''
  // resetForm()
}

function populatEditing(item: ToDo) {
  toDoListStore.populateUndoList(item.id, item.text, "edit")
  editItemText = item.text
  editItemId = item.id
  textAreaValue.value.value = item.text;
}
function undoButtonClicked() {
  console.log("undo button clciked: ", toDoListStore.undoList)
  toDoListStore.holdUndoValues(toDoListStore.undoList.pop())
}
function resetForm() {
  return null
}
</script>

<template>

  <main class="toDoBox">
    <h2 class="titleHeading">Add your ToDo items below</h2>
    <div v-if="toDoListStore.piniaErrorState"><span>{{ errorMessage }}</span></div>

    <ol class="box">
      <li class="il" v-for="item in toDoListStore.itemList">
        <input type="checkBox">
        {{ item.text }}
        <button class="" @click="removeItem(item)">X</button>
        <button @click.prevent="populatEditing(item)">Edit</button>
      </li>
    </ol>

    <form class="form" @submit.prevent="addItem">
      <textarea ref="textAreaValue" id="textAreaId" class="textArea" v-model="formInputRef" rows="3" cols="40"
        placeholder="Enter ToDo here"></textarea>
      <button v-show="displayValue" class="addButton" @click=""><img alt="Add Icon" class="addIcon"
          src="@/assets/add.png" width="40" height="40" /></button>

    </form>
    <div class="editingDiv">
      <button class="editButton" @click="editItem(editItemId)">Save edits</button>
      <button class="editButton" @click="resetForm">Cancel</button>
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