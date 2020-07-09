import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/iniciar",
    name: "IniciarSesion",
    component: () =>
      import(/* webpackChunkName: "iniciar" */ "../views/Iniciar.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: () => import(/* webpackChunkName: "test" */ "../views/Test.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
