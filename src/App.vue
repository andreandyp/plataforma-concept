<template lang="pug">
  v-app
    v-navigation-drawer(v-model="barraLateral" color="primary" app dark temporary)
      v-list
        v-list-item(to="/expediente")
          v-list-item-avatar
            v-img(src="https://randomuser.me/api/portraits/lego/5.jpg")
          v-list-item-content
            v-list-item-title André P.
            v-list-item-subtitle Inscrito

      v-divider

      v-list
        v-list-item(to="/calificaciones")
          v-list-item-icon
            v-icon mdi-book-account
          v-list-item-content
            v-list-item-title Calificaciones
        v-list-item(to="/horario")
          v-list-item-icon
            v-icon mdi-table-clock
          v-list-item-content
            v-list-item-title Horario
        v-list-item
          v-list-item-icon
            v-icon mdi-account-group
          v-list-item-content
            v-list-item-title Reinscripciones
        v-list-item(to="/evaluar")
          v-list-item-icon
            v-icon mdi-teach
          v-list-item-content
            v-list-item-title Evaluar profesores
    v-app-bar(app color="primary" dark)
      v-app-bar-nav-icon.d-sm-none(@click="barraLateral = !barraLateral" v-show="sesionIniciada")
      v-toolbar-title.pa-0
        router-link.mr-2(to="/") Plataforma concept
      v-toolbar-items.hidden-xs-only(v-show="sesionIniciada")
        v-btn.text-capitalize(to="/calificaciones" text) Calificaciones
        v-btn.text-capitalize(to="/horario" text) Horario
        v-btn.text-capitalize(text) Reinscripciones
        v-btn.text-capitalize(to="/evaluar" text) Evaluar profesores

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
      v-menu(bottom offset-y)
        template(v-slot:activator="{ on, attrs }")
          v-btn.hidden-xs-only(v-show="sesionIniciada" v-bind="attrs" v-on="on" icon)
            v-icon mdi-account-circle-outline
        v-card
          v-list
            v-list-item(to="/expediente")
              v-list-item-avatar
                v-img(src="https://randomuser.me/api/portraits/lego/5.jpg")
              v-list-item-content
                v-list-item-title André P.
                v-list-item-subtitle Inscrito
    v-main
      router-view
    v-footer
      span Creado por André Michel Pozos. 
        | Esta app es sólo un concepto, no envía los datos ingresados
        | a ningún servidor.
        br
        a(href="https://twitter.com/andreandyp") Twitter
        |  | 
        a(href="https://github.com/andreandyp/plataforma-concept") GitHub
        |  - Versión 0.6.0
      v-spacer
      v-btn(color="blue" @click="cerrarSesion" v-show="sesionIniciada" text) Cerrar sesión
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LoginAPI } from "@/services/LoginAPI";
import { DatosSesion } from "@/utils/tipos";

@Component({
  name: "App",
})
export default class App extends Vue {
  barraLateral = false;

  get sesionIniciada(): boolean {
    return this.$store.getters.sesionIniciada;
  }
  async created(): Promise<void> {
    const respuesta = await LoginAPI.sesionIniciada();
    const { status, message } = respuesta as DatosSesion;

    if (status === 200) {
      this.$store.commit("iniciarSesion", message);
    }
  }
  async cerrarSesion(): Promise<void> {
    await LoginAPI.cerrarSesion();
    this.$store.commit("cerrarSesion");
    this.$router.push("/iniciar");
  }
}
</script>

<style scoped>
a.router-link-active {
  color: white;
  text-decoration: none;
}
</style>
