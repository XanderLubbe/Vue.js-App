<script setup lang="ts">
import { useToDoListStore } from '@/stores/ToDoListStore';
import { onMounted } from 'vue';
import { ItemState, type ToDo } from "../ToDoType"

const toDoListStore = useToDoListStore();

function removeItem(item: ToDo) {
    toDoListStore.permanentlyRemoveItem(item.id)
}

function archiveItem(item: ToDo) {
    toDoListStore.setToArchiveItem(item)
}

</script>

<template>
    <div class="addToDoContainer">
        <h2>Deleted ToDo items</h2>

        <p style="text-align: center;"
            v-show="toDoListStore.itemList.filter(item => item.itemState == ItemState.Deleted).length == 0">
            Nothing to see here.
        </p>

        <ol class="box">
            <li v-for="item in toDoListStore.itemList" v-show="item.itemState == ItemState.Deleted"
                :class="{ completedListItem: item.isCompleted == true }" class="baseListItem">

                <div class="leftItemDiv">
                    <p>{{ item.text }}</p>
                </div>

                <div class="rightItemDiv">
                    <button class="archiveButton" @click="archiveItem(item)" title="Archive ToDo">
                        <img alt="Archive Icon" src="@/assets/archive.svg" width="30" height="30" />
                    </button>
                    
                    <button class="removeButton" @click="removeItem(item)" title="Permanently Remove ToDo">
                        <img alt="Remove Icon" src="@/assets/trash-can.svg" width="30" height="30" />
                    </button>
                </div>

            </li>
        </ol>
</div>
</template>

<style>
h2 {
    color: black;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}

.addToDoContainer {
    background-color: white;
    color: black;
    font-size: large;
    float: left;
    padding: 20px;
    width: 50rem;
    margin: 0 auto;
}
.archiveButton,
.removeButton {
    background-color: transparent;
    border: none;
    box-shadow: none;
}

</style>