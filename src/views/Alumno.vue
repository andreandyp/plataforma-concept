<template lang="pug">
  v-container
    h2.d-flex.justify-space-between Tus calificaciones del semestre
      v-btn(@click="actualizarCalificaciones()" :loading="cargando" icon)
        v-icon mdi-sync
    v-simple-table(:class="{cargando: cargando}" fixed-header dense)
      thead
        tr
          th(v-for="periodo in periodos") {{periodo}}
      tbody
        tr(v-for="calif in calificaciones")
          td {{calif.nombre}}
          td {{calif.periodo1}}
          td {{calif.periodo2}}
          td {{calif.periodo3}}
          td {{calif.extra}}
          td {{calif.final}}
</template>

<script lang="ts">
import Vue from "vue";
import { CalificacionesAPI } from "../services/CalificacionesAPI";
export default Vue.extend({
  data() {
    return {
      cargando: false,
      periodos: ["Materia", "1° parcial", "2° parcial", "3° parcial", "Extra", "Final"],
      calificaciones: []
    };
  },
  created() {
    if (!this.$store.getters.sesionIniciada) {
      return this.$router.replace("/");
    }

    if (this.$store.getters.tipoUsuario !== "alumno") {
      return this.$router.replace("/");
    }
  },
  mounted() {
    // @ts-ignore
    this.actualizarCalificaciones();
  },
  methods: {
    async actualizarCalificaciones() {
      this.$data.cargando = true;
      const { message } = await CalificacionesAPI.obtenerCalificaciones();
      this.$data.calificaciones = message;
      this.$data.cargando = false;
    }
  }
});
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 0.95rem;
}
.cargando {
  filter: blur(2px);
  pointer-events: none;
}
</style>
