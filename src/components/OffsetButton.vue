<script setup lang="ts">

defineProps({
    imagePath: String,
    text: String,
    onClick: Function
})

</script>

<template >
    <div class="offsetButton">
        <button @click.prevent="onClick">
            <img v-if="imagePath != undefined" :src=imagePath width="20" height="20" />
            <p>{{ text }}</p>
        </button>
        <div></div>
</div>
</template>

<style>
.offsetButton {
    position: relative;
    display: inline-block;
}

.offsetButton button {
    display: flex;
    position: relative;
    align-items: center;
    z-index: 1;
    margin-right: 0;
}

.offsetButton button:hover {
    cursor: pointer;
}

.offsetButton p {
    margin: 0px;
    margin-left: 5px;
    font-weight: bold;
}

.offsetButton div {
    transition: all 0.2s ease;
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: 3px;
    margin-left: 4px;
    z-index: 0;
    border-radius: 4px;
    top: 0;
}

.offsetButton button:hover+div {
    transition: all 0.2s ease;
    margin-top: 0px;
    margin-left: 0px;
}
</style>