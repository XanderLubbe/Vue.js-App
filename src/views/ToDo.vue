<script setup lang="ts">
import ToDoBox from "../components/ToDoBox.vue";
import AddToDoBox from "@/components/AddToDoBox.vue";
import EditToDoItem from "@/components/EditToDoItem.vue";
import { onMounted, ref, computed } from "vue";
import { acceptHMRUpdate } from "pinia";
import { useToDoListStore } from "../stores/ToDoListStore"

let thingy = ref()
// let editThing = ref()

// fetch('http://192.168.47.209:9200/data/todo-app/get-todos.json')
// .then(res => res.json())
// .then(something => console.log(something.name))


const toDoListStore = useToDoListStore();


onMounted(() => {
    console.log("onMounted has commenced")
    toDoListStore.fetchData()

})


</script>

<template>
    <main>
        <div class="a">

        </div>
    </main>
    <div class="ToDoContainer">
        <ToDoBox :userName=thingy />
        <!-- <AddToDoBox /> -->
        <!-- <EditToDoItem /> -->
    </div>
</template>

<style>
.ToDoContainer {
    padding: 20px;
    display:flex;
    flex-direction: column;
    /* flex-direction: row; */
}
</style>