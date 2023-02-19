<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useToDoListStore } from "./stores/ToDoListStore";

const toDoListStore = useToDoListStore();

onMounted(() => {
  toDoListStore.fetchData()
})

</script>

<template>
  <div class="appVue">
    <header>
      <img alt="Check logo" class="logo" src="@/assets/done.svg" width="125" height="125" />
        <nav>
          <RouterLink to="/active">ToDo</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>
    <main class="mainApp">
      <RouterView name="nav" />
      <RouterView />
    </main>
</div>
</template>

<style scoped>
.mainApp {
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  padding: 20px;
  font-size: large;
}

header {
  line-height: 1.5;
  width: 100%;
  background-color: #FEFEFE;
  position: relative;
  box-shadow: 0 0px 4px 0px #00000050;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}

.logo {
  display: block;
  text-align: left;
}

nav {
  font-size: 16px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>
