import AboutVue from "@/views/About.vue";
import { createRouter, createWebHistory } from "vue-router";
import ToDo from "../views/ToDo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/todo",
      name: "todo",
      component: ToDo,
    },
    {
      path: "/about",
      name: "about",
      component: AboutVue,
    },

  ],
});

export default router;
