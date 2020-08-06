import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Index",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/iniciar",
    name: "IniciarSesion",
    component: () => import(/* webpackChunkName: "iniciar" */ "../views/Iniciar.vue"),
  },
  {
    path: "/reestablecer-clave",
    name: "ReestablecerClave",
    component: () => import(/* webpackChunkName: "reestablecer" */ "../views/Reestablecer.vue"),
  },
  {
    path: "/reestablecer-clave/:id",
    name: "CrearNuevaClave",
    component: () => import(/* webpackChunkName: "nuevaClave" */ "../views/NuevaClave.vue"),
  },
  {
    path: "/alumno",
    name: "Alumno",
    component: () => import(/* webpackChunkName: "alumno" */ "../views/Alumno.vue"),
  },
  {
    path: "/profesor",
    name: "Profesor",
    component: () => import(/* webpackChunkName: "profesor" */ "../views/Profesor.vue"),
  },
  {
    path: "/calificaciones",
    name: "Calificaciones",
    component: () => import(/* webpackChunkName: "calificaciones" */ "../views/Calificaciones.vue"),
  },
  {
    path: "/horario",
    name: "Horario",
    component: () => import(/* webpackChunkName: "horario" */ "../views/Horario.vue"),
  },
  {
    path: "/reinscripciones/citas",
    name: "CitasReinscripciones",
    component: () => import(/* webpackChunkName: "citasR" */ "../views/CitasReinscripciones.vue"),
  },
  {
    path: "/reinscripciones/ordinarias",
    name: "OrdReinscripciones",
    component: () => import(/* webpackChunkName: "ordR" */ "../views/OrdReinscripciones.vue"),
  },
  {
    path: "/reinscripciones/ets",
    name: "EtsReinscripciones",
    component: () => import(/* webpackChunkName: "etsR" */ "../views/EtsReinscripciones.vue"),
  },
  {
    path: "/reinscripciones/fuera",
    name: "FueraReinscripciones",
    component: () => import(/* webpackChunkName: "fueraR" */ "../views/FueraReinscripciones.vue"),
  },
  {
    path: "/expediente",
    name: "Expediente",
    component: () => import(/* webpackChunkName: "expediente" */ "../views/Expediente.vue"),
  },
  {
    path: "/evaluar",
    name: "Evaluar Profes",
    component: () => import(/* webpackChunkName: "evaluarprofes" */ "../views/EvaluarProfes.vue"),
  },
  {
    path: "/evaluar/:id",
    name: "Evaluar",
    component: () => import(/* webpackChunkName: "evaluarprofes" */ "../views/Evaluar.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import(/* webpackChunkName: "test" */ "../views/Test.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
