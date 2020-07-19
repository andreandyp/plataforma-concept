<template lang="pug">
  v-container
    h2.d-flex.justify-space-between Tus calificaciones del semestre
      v-btn(@click="actualizarCalificaciones()" :loading="cargando" icon)
        v-icon mdi-sync
    v-skeleton-loader(v-if="cargando" type="table-tbody" max-height="300")
    v-simple-table(v-else :class="{cargando: cargando}" fixed-header dense)
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
import { Vue, Component } from "vue-property-decorator";
import { CalificacionesAPI } from "@/services/CalificacionesAPI";
import { CalificacionDB } from "@/utils/tipos";

@Component
export default class Alumno extends Vue {
  cargando = false;
  periodos: Array<string> = ["Materia", "1° parcial", "2° parcial", "3° parcial", "Extra", "Final"];
  calificaciones: Array<CalificacionDB> = [];

  created(): void {
    if (!this.$store.getters.sesionIniciada) {
      this.$router.replace("/");
      return;
    }

    if (this.$store.getters.tipoUsuario !== "alumno") {
      this.$router.replace("/");
      return;
    }
  }
  mounted(): void {
    this.actualizarCalificaciones();
  }

  async actualizarCalificaciones(): Promise<void> {
    this.cargando = true;
    const { message } = await CalificacionesAPI.obtenerCalificaciones();
    this.calificaciones = message;
    this.cargando = false;
  }
}
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
