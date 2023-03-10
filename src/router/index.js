import { createRouter, createWebHistory } from "vue-router";

import { config, activities } from "@/firebase";
import { FireAuth } from "@/firebaseInit";

const routes = [
  {
    path: "/",
    name: "HomeScreen",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/activities",
    name: "activities",
    component: () =>
      import(/* webpackChunkName: "activities" */ "../views/ActivityView.vue"),
    props: { activities: activities, config: config },
    meta: { requiresAuth: true },
  },
  {
    path: "/members",
    name: "members",
    component: () =>
      import(/* webpackChunkName: "members" */ "../views/MemberView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/rollcall",
    name: "rollcall",
    component: () =>
      import(/* webpackChunkName: "rollcall" */ "../views/RollView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/milestones",
    name: "milestones",
    component: () =>
      import(
        /* webpackChunkName: "milestones" */ "../views/MilestonesView.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/oas",
    name: "OAS",
    component: () =>
      import(/* webpackChunkName: "oas" */ "../views/OasView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/TestView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (FireAuth.getInstance().currentUser) {
      next();
    } else {
      console.log("Alerting - login required.");
      alert("Please Log in.");
      router.push("/");
    }
  } else {
    next();
  }
});

export default router;
