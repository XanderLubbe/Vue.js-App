<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="appVue">
    <p>hey</p>
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
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <RouterView />
  </header>

</div>
</template>

<style scoped>
.appVue {
  width: auto;
  background-color: red;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  /* width:100%; */
  min-width: 1000px;
  background-color: bisque;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  text-align: left;
}

nav {
  width: auto;
  font-size: 12px;
  text-align: left;
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
