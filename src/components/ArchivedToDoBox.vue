<script setup lang="ts">
import { useToDoListStore } from '@/stores/ToDoListStore';
import { onMounted } from 'vue';
import { ItemState, type ToDo } from "../ToDoType"

const toDoListStore = useToDoListStore();

function removeItem(item: ToDo) {
    toDoListStore.setToDeletedItem(item)
}

function restoreItem(item: ToDo) {
    item.itemState = ItemState.Active
}

</script>

<template>
    <div class="archivedToDoContainer">
        <h2>Archived ToDo items</h2>

        <p style="text-align: center;"
            v-show="toDoListStore.itemList.filter(item => item.itemState == ItemState.Archived).length == 0">
            Nothing to see here.
        </p>

        <ol class="box">
            <li v-for="item in toDoListStore.itemList" v-show="item.itemState == ItemState.Archived"
                :class="{ completedListItem: item.isCompleted == true }" class="baseListItem">

                <div class="leftItemDiv">
                    <p>{{ item.text }}</p>
                </div>

                <div class="rightItemDiv">
                    <button class="restoreIcon" @click="restoreItem(item)">
                        <img alt="Restore" src="@/assets/restore.svg" width="30" height="30" title="Restore ToDo" />
                    </button>
                    
                    <button class="removeButton" @click="removeItem(item)">
                        <img alt="Trash Can" src="@/assets/trash-can.svg" width="30" height="30" title="Delete Todo" />
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

.archivedToDoContainer {
    background-color: white;
    color: black;
    font-size: large;
    float: left;
    padding: 20px;
    width: 50rem;
    margin: 0 auto;
}

.restoreIcon,
.removeButton {
    background-color: transparent;
    border: none;
    box-shadow: none;
}
</style>