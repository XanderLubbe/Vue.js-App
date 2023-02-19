<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToDoListStore } from "../stores/ToDoListStore"
import { ItemState, type ToDo } from "../ToDoType"
import { Actions, type Undo } from "../UndoType"
import OffsetButtonVue from './OffsetButton.vue';
import cancelIcon from "@/assets/cancel.svg"
import addIcon from "@/assets/add.svg"
import saveIcon from "@/assets/newtick.svg"

const toDoListStore = useToDoListStore();

defineProps({
  testProp: String,
})

let id = 100
const formInputRef = ref('')
let editItem: ToDo
let showSaveEditsButton = false
let showAddButton = true

function addItem() {
  const newItem: ToDo = { id, text: formInputRef.value, itemState: ItemState.Active, isCompleted: false }
  toDoListStore.addItem(newItem)
  toDoListStore.setToActiveItem(newItem)
  resetForm()
  id++
}

function removeItem(item: ToDo) {
  toDoListStore.setToDeletedItem(item)
}

function archiveItem(item: ToDo) {
  toDoListStore.setToArchiveItem(item)
}

function onSaveEditClicked() {
  const newItem: ToDo = { id: editItem.id, text: formInputRef.value, itemState: editItem.itemState, isCompleted: editItem.isCompleted }
  toDoListStore.editItem(newItem)
  resetForm()
}

function onEditClicked(item: ToDo) {
  const newUndoItem: Undo = { action: Actions.Edit, ToDo: { ...item } }
  toDoListStore.addUndoItem(newUndoItem)
  editItem = item
  formInputRef.value = item.text;
  showSaveEditsButton = true
  showAddButton = false
}

function undoButtonClicked() {
  const poppedItem = toDoListStore.undoList.pop()
  if (poppedItem != undefined) {
    toDoListStore.determineUndoAction(poppedItem)
  }
}

function doneButtonClicked(item: ToDo) {
  const newUndoItem: Undo = { action: Actions.Edit, ToDo: { ...item } }
  toDoListStore.addUndoItem(newUndoItem)
  item.isCompleted = !item.isCompleted
}

function resetForm() {
  showSaveEditsButton = false
  showAddButton = true
  formInputRef.value = ''
}
</script>

<template>
  <main class="toDoBox">
    <h2>Active ToDo items</h2>
    <p v-if="toDoListStore.piniaErrorState" style="text-align: center;">{{ toDoListStore.datahubError }}</p>

    <p style="text-align: center;"
      v-show="toDoListStore.itemList.filter(item => item.itemState == ItemState.Active).length == 0">
      Nothing to see here.
    </p>

    <ol class="box">
      <li v-for="item in toDoListStore.itemList" v-show="item.itemState == ItemState.Active"
        :class="{ completedListItem: item.isCompleted == true }" class="baseListItem">

        <div class="leftItemDiv">
          <button class="completeButton" @click="doneButtonClicked(item)" title="Complete ToDo">
            <img alt="Complete ToDo" src="@/assets/done.svg" width="30" height="30" />
          </button>
          <p>{{ item.text }}</p>
        </div>

        <div class="rightItemDiv">

          <button class="editButton" @click.prevent="onEditClicked(item)" title="Edit ToDo">
            <img alt="Edit Icon" src="@/assets/edit.svg" width="30" height="30" />
          </button>

          <button class="archiveButton" @click="archiveItem(item)" title="Archive ToDo">
            <img alt="Archive Icon" src="@/assets/archive.svg" width="30" height="30" />
          </button>

          <button class="removeButton" @click="removeItem(item)" title="Delete ToDo">
            <img alt="Delete Icon" src="@/assets/trash-can.svg" width="30" height="30" />
          </button>
          
        </div>
      </li>
    </ol>

    <form class="form" @submit.prevent="addItem">
      <textarea v-model="formInputRef" rows="3" cols="40" placeholder="Enter ToDo here"></textarea>

      <div class="editingDiv">
        <OffsetButtonVue class="offsetButtonAdd" v-show="showAddButton" :image-path="addIcon" text="Add"
          :on-click=addItem />
        <OffsetButtonVue class="offsetButtonSaveEdit" v-show="showSaveEditsButton" :image-path="saveIcon"
          text="Save edits" :on-click="onSaveEditClicked" />
        <OffsetButtonVue class="offsetButtonCancel" :image-path="cancelIcon" text="Cancel" :on-click=resetForm />
      </div>

    </form>
    
    <div>
      <OffsetButtonVue class="offsetButtonUndo" text="Undo" :on-click=undoButtonClicked />
    </div>

  </main>
</template>

<style >
.editingDiv {
  margin: 0 auto;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

h2 {
  color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.toDoBox {
  background-color: white;
  color: black;
  font-size: large;
  float: left;
  padding: 20px;
  width: 50rem;
  margin: 0 auto;
}

.completeButton,
.removeButton,
.editButton,
.archiveButton {
  background-color: transparent;
  border: none;
  box-shadow: none;
}

.form {
  margin: 0 auto;
  width: 350px;
}

.box {
  list-style-type: none;
  border-color: black;
  padding: 5px;
  padding-left: 10px;
}

textarea {
  border-radius: 4px;
  margin-bottom: 10px;
}

.offsetButtonCancel div {
  background-color: #FFAB91;
}

.offsetButtonAdd div {
  background-color: #A5D6A7;
}

.offsetButtonAdd {
  margin-right: 10px;
}

.offsetButtonUndo div {
  background-color: #8CE7F2;
}

.offsetButtonSaveEdit div {
  background-color: #A5D6A7;
}

.offsetButtonSaveEdit {
  margin-right: 10px;
}
</style>