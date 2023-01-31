<script setup lang="ts">
</script>

<template>
    <div class="addToDoContainer">
        <p>Add a new ToDo List here</p>

        <button class="button" @click=""><img 
            alt = "Add Icon"
            class = "addIcon"
            src = "@/assets/add.png"
            width = "100"
            height = "100"
        /></button>
    </div>


</template>

<style>
.addToDoContainer {
    background-color: #01A7C2;
    border-style: solid ;
    border-radius: 15px;
    width: 50%;
    padding: 20px;
    margin: 20px;
    text-align: center;

    max-width: 20rem;
}
.button {
    background-color: transparent;
    border: none;
}
.button:active {
    transform: translate3d(2px, 2px, 0px)
}

</style>