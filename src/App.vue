<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="appVue">
    <header>
      <img alt="Check logo" class="logo" src="@/assets/check.png" width="125" height="125" />
      <div class="navParent">
        <nav>
          <RouterLink to="/todo">ToDo</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>

    </header>
    <RouterView />

  </div>
</template>

<style scoped>
.appVue {
  width: 100vw;
  background-color: white;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  min-width: 1000px;
  background-color: #007090;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}

.navParent {
  position: relative;
  height: 75px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  text-align: left;
  padding: 10px;
}

nav {
  width: auto;
  font-size: 12px;
  text-align: left;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  display: flex;
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
  background-color: #EAEBED;
}



@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }


  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
  }

}
</style>
