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
      v-app-bar-nav-icon.d-sm-none(@click="barraLateral = !barraLateral")
      v-toolbar-title.pa-0 Plataforma concept
      v-toolbar-items.d-none.d-sm-flex
        v-btn.text-capitalize(text) Calificaciones
        v-btn.text-capitalize(text) Horario
        v-btn.text-capitalize(text) Reinscripciones
        v-btn.text-capitalize(text) Evaluar profesores

      v-spacer

      v-btn(icon)
        v-icon mdi-calendar
      v-btn(icon)
        v-icon mdi-bell
      v-btn(icon).d-none.d-sm-flex
        v-icon mdi-account-circle-outline
    v-main
      router-view
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data() {
    return {
      barraLateral: false
    };
  }
});
</script>
