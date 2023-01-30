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
/* .template {
    background-color: red;
} */
.ToDoContainer {
    border-style: dashed;
    border-color: red;
    padding: 20px;
    display: flex;

}


  

</style>