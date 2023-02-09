<script setup lang="ts">
import ToDoBox from "../components/ToDoBox.vue";
import { onMounted, ref, computed } from "vue";
import { acceptHMRUpdate } from "pinia";
import { useToDoListStore } from "../stores/ToDoListStore"

let thingy = ref()

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
        <ToDoBox  />
    </div>
</template>

<style>
.ToDoContainer {
    padding: 20px;
    display: flex;
    flex-direction: column;
    /* flex-direction: row; */
}
</style>