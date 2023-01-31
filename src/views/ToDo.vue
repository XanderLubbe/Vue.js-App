<script setup lang="ts">
import ToDoBox from "../components/ToDoBox.vue";
import AddToDoBox from "@/components/AddToDoBox.vue";
</script>

<template>
    <main>
        <div class="a">

        </div>
    </main> 
    <div class="ToDoContainer">
        <ToDoBox />
        <AddToDoBox />
    </div>
</template>

<style>

.ToDoContainer {
    padding: 20px;
    display: flex;

}


  

</style>