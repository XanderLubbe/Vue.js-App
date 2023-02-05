<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import EditToDoItem from "../components/EditToDoItem.vue"
import { useToDoListStore } from "../stores/ToDoListStore"
import type { ToDo } from "../ToDoType"
import getDataPlease from "../views/ToDo.vue"
// import {blahhhh()} from "../components/EditToDoItem.vue"

defineProps({
  userName: String,
  // editItemText: String
})

const toDoListStore = useToDoListStore();
let errorState = false
let errorMessage = ""
if(toDoListStore.errorr != ""){
  errorState = true
} 

const textAreaValue = ref(null)

let id = 0

const formInputRef = ref('')
let editItemText = ''
let editItemId: number

function addItem() {
  toDoListStore.addItem(id++, formInputRef.value)
  formInputRef.value = ''
}


function removeItem(item: ToDo) {
  toDoListStore.removeItem(item.id)
}

function editItem(id: number, text: string) {
  toDoListStore.editItem(id, formInputRef.value)
}

function populatEditing(item: ToDo){
  toDoListStore.findIndexOfSelectedItem(item.id)
  console.log(item.id, "this is the id")
  editItemText = item.text
  editItemId = item.id
  textAreaValue.value.placeholder = item.text;
  console.log(editItemText)
  
}
function resetForm(){
  textAreaValue.value.placeholder = "Enter ToDo here"
}
</script>

<template>

  <main class="toDoBox">
    <h2 class="titleHeading">Add your ToDo items below</h2>
    <div v-if="toDoListStore.piniaErrorState"><span >System busy please go away.</span></div>

    <ol class="box">
      <li class="il" v-for="item in toDoListStore.itemList">
        <input type="checkBox">
        {{ item.text }}
        <button class="" @click="removeItem(item)">X</button>
        <button  @click="populatEditing(item)">Edit</button>
      </li>
    </ol>

    <form class="form" @submit.prevent="addItem">
      <textarea ref="textAreaValue" id="textAreaId" class="textArea" v-model="formInputRef" rows="3" cols="40" placeholder="Enter ToDo here"></textarea>
      <button class="addButton" @click=""><img 
            alt = "Add Icon"
            class = "addIcon"
            src = "@/assets/add.png"
            width = "40"
            height = "40"
        /></button>
        <button @click="editItem(editItemId, editItemText)">Save edits</button>
        <button @click.prevent="resetForm" >Cancel</button>
    </form>
  </main>
  <div>
    
    <!-- <EditToDoItem class="editToDoBox" :editThingProp="formInputRef" ></EditToDoItem> -->
  </div>
</template>

<style>
.editToDoBox{
  /* visibility: hidden; */
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
  /* position: relative; */
  /* left: -450px; */
  background-color: #01A7C2;
  color: white;
  font-size: large;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  border-radius: 5px;
  /* width: 300px; */
  float: left;
  padding: 20px;
  /* max-width: 80rem; */
  width: 50rem;
  margin: 0 auto; 
}
input[type=checkbox]:checked + li.strikethrough{
  text-decoration: line-through;
}
.addButton {
    background-color: transparent;
    border: none;
}

.form {
  margin: 0 auto; 
width:350px;
}
.titleHeading{
  margin: 0 auto;
  width:350px;
}
.textArea{
  align-items: center;
}
.box {

  list-style-type:lower-roman;
  border-color: black;
  padding: 5px;
  padding-left: 10px;
  /* display:inline-block; */
        /* border:1px solid #000;
        padding:20px; */

}
.il {
  /* display:inline-block; */
        border-bottom:1px solid #000;
        padding:20px;
}
</style>