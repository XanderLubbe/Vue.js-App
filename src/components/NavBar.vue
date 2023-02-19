<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const path = computed(() => useRoute().path)

</script>

<template class="main">

    <div class="navContainer">
        <RouterLink class="navItem" to="/active" :class="{ selectedNavItem: path == '/active' }">Active</RouterLink>
        <RouterLink class="navItem" to="/archive" :class="{ selectedNavItem: path == '/archive' }">Archive</RouterLink>
        <RouterLink class="navItem" to="/deleted" :class="{ selectedNavItem: path == '/deleted' }">Deleted</RouterLink>
    </div>
    
</template>

<style>
.navContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.navItem {
    padding: 10px;
    color: black;
    border-radius: 4px;
}

.selectedNavItem {
    background-color: #A5D6A7;
}
</style>