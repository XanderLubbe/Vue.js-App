import AboutVue from "@/views/About.vue";
import { createRouter, createWebHistory } from "vue-router";
import ActiveToDoBox from "@/components/ActiveToDoBox.vue"
import ArchivedToDoBox from "@/components/ArchivedToDoBox.vue"
import DeletedToDoBox from "@/components/DeletedToDoBox.vue"
import NavBar from "@/components/NavBar.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      components: {
        default: ActiveToDoBox,
        nav: NavBar,
      }
    },
    {
      path: "/about",
      name: "about",
      component: AboutVue,
    },
    {
      path: "/active",
      name: "active",
      components: {
        default: ActiveToDoBox,
        nav: NavBar,
      }
    },
    {
      path: "/archive",
      name: "archive",
      components: {
        default: ArchivedToDoBox,
        nav: NavBar,
      }
    },
    {
      path: "/deleted",
      name: "deleted",
      components: {
        default: DeletedToDoBox,
        nav: NavBar,
      }
    },


  ],
});

export default router;
