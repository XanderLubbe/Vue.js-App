<script setup lang="ts">
import ToDoBox from "../components/ToDoBox.vue";

</script>

<template>
    <main>
        <div class="a">

        </div>
    </main>
    <div class="ToDoContainer">
        <ToDoBox />
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