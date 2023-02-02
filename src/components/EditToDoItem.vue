<script setup lang="ts">
import { useToDoListStore } from '@/stores/ToDoListStore';

defineProps({
  editThingProp: String,
})

const toDoListStore = useToDoListStore();

function blahhhh(){
    console.log("I was clicked to save!")
}

</script>

<template>
    <div class="editBox" >
        <p>This is where you will edit the item</p>
        <p >  {{ editThingProp }}</p>
        <form class="editForm" @submit.prevent="blahhhh">

            <button>Save</button>
            <button>Cancel</button>
        </form>
    </div>

</template>

<style>
/* when the box is active there needs to be a hectic drop shaddow covering all other content */

.editBox {
  background-color: #01A7C2;
  color: white;
  border-style: solid;
  border-color: black;
  border-radius: 15px;
  width: 50%;
  float: left;
  padding: 20px;
  max-width: 20rem;

}

</style>