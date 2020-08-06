<template lang="pug">
  v-container
    h1 Evalúa a tus profesores
    v-skeleton-loader(v-if="cargando" type="table-tbody" max-height="300")
    v-simple-table(v-else)
      thead
        tr
          th(v-for="header in headers") {{header}}
      tbody
        tr(v-for="profesor in profesores")
          td(v-if="profesor.status === 0 || profesor.status === 1" @click="evaluar(profesor._id)") 
            v-btn(text) {{profesor.nombre}}
          td.evaluado(v-else)
            v-btn(text disabled) {{profesor.nombre}}
          td
            v-badge(:content="estadoProfesor(profesor.status)" :color="colorEstado(profesor.status)")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { ProfesoresAPI } from "@/services/ProfesoresAPI";
import { ProfesorDB } from "@/utils/tipos";

@Component
export default class EvaluarProfes extends Vue {
  headers: Array<string> = ["Profesor", "¿Ya evaluado?"];
  profesores: Array<ProfesorDB> = [];

  cargando = false;
  async mounted(): Promise<void> {
    this.cargando = true;
    const { message } = await ProfesoresAPI.obtenerEvaluaciones();
    this.profesores = message;
    this.cargando = false;
  }

  estadoProfesor(estado: number): string {
    switch (estado) {
      case 0:
        return "No";
      case 1:
        return "Pendiente";
      case 2:
        return "Sí";
      default:
        return "";
    }
  }
  colorEstado(estado: number): string {
    switch (estado) {
      case 0:
        return "red";
      case 1:
        return "yellow darken-2";
      case 2:
        return "green";
      default:
        return "";
    }
  }

  evaluar(_id: number): void {
    this.$router.push(`/evaluar/${_id}`);
  }
}
</script>

<style scoped>
tbody tr td:hover {
  cursor: pointer;
}
.evaluado:hover {
  cursor: not-allowed;
}
</style>
