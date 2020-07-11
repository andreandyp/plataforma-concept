<template lang="pug">
  v-app
    v-navigation-drawer(v-model="barraLateral" color="primary" app dark temporary)
      v-list
        v-list-item
          v-list-item-avatar
            v-img(src="https://randomuser.me/api/portraits/lego/5.jpg")
          v-list-item-content
            v-list-item-title André P.
            v-list-item-subtitle Inscrito

      v-divider

      v-list
        v-list-item
          v-list-item-icon
            v-icon mdi-book-account
          v-list-item-content
            v-list-item-title Calificaciones
        v-list-item
          v-list-item-icon
            v-icon mdi-table-clock
          v-list-item-content
            v-list-item-title Horario
        v-list-item
          v-list-item-icon
            v-icon mdi-account-group
          v-list-item-content
            v-list-item-title Reinscripciones
        v-list-item
          v-list-item-icon
            v-icon mdi-teach
          v-list-item-content
            v-list-item-title Evaluar profesores
    v-app-bar(app color="primary" dark)
      v-app-bar-nav-icon.d-sm-none(@click="barraLateral = !barraLateral" v-show="sesionIniciada")
      v-toolbar-title.pa-0
        router-link(to="/") Plataforma concept
      v-toolbar-items.hidden-xs-only(v-show="sesionIniciada")
        v-btn.text-capitalize(text) Calificaciones
        v-btn.text-capitalize(text) Horario
        v-btn.text-capitalize(text) Reinscripciones
        v-btn.text-capitalize(text) Evaluar profesores

      v-spacer

      v-btn(
        href="https://www.ipn.mx/calendario-academico.html"
        target="_blank"
        rel="noopener noreferrer"
        icon
      )
        v-icon mdi-calendar
      v-btn(v-show="sesionIniciada" icon)
        v-icon mdi-bell
      v-btn.hidden-xs-only(v-show="sesionIniciada" icon)
        v-icon mdi-account-circle-outline
    v-main
      router-view
    v-footer
      span Creado por André Michel Pozos. 
        | Esta app es sólo un concepto, no envía los datos ingresados
        | a ningún servidor.
        br
        a(href="https://twitter.com/andreandyp") Twitter
        |  
        a(href="https://github.com/andreandyp/plataforma-concept") GitHub
        |  - Versión 0.2.0
      v-spacer
      v-btn(color="blue" @click="cerrarSesion" v-show="sesionIniciada" text) Cerrar sesión
</template>

<script lang="ts">
import Vue from "vue";
import { Login } from "./services/Login";
import { DatosSesion } from "./utils/tipos";

export default Vue.extend({
  name: "App",
  data() {
    return {
      barraLateral: false
    };
  },
  computed: {
    sesionIniciada(): boolean {
      return this.$store.getters.sesionIniciada;
    }
  },
  async created() {
    const respuesta = await Login.sesionIniciada();
    const { status, message } = respuesta as DatosSesion;

    if (status === 200) {
      this.$store.commit("iniciarSesion", message);
    }
  },
  methods: {
    async cerrarSesion() {
      await Login.cerrarSesion();
      this.$store.commit("cerrarSesion");
      this.$router.push("/iniciar");
    }
  }
});
</script>

<style scoped>
a.router-link-active {
  color: white;
  text-decoration: none;
}
</style>
