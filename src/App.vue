<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ToDo from "./views/ToDo.vue";
</script>

<template>
  <header>
    <img
      alt="Check logo"
      class="logo"
      src="@/assets/check.png"
      width="125"
      height="125"
    />
      <nav>
        <RouterLink to="/todo">ToDo</RouterLink>
      </nav>
      <RouterView />
  </header>

<!-- <ToDo/> -->


</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  min-width: 1200px;
  background-color: bisque;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  background-color: aqua;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  background-color: brown;
}



@media (min-width: 1024px) {
  header {
    display: inline-block;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }


  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }

}
</style>
