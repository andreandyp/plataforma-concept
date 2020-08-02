<template lang="pug">
  v-container
    h1 Tu horario
    v-skeleton-loader(v-if="cargando" type="table" max-height="300")
    v-simple-table(v-else)
      thead
        tr
          th(v-for="header in horarioHeaders") {{header}}
      tbody
        tr(v-for="materia in materias")
          td {{materia.nombre}}
          td {{materia.grupo}}
          td {{materia.horario[0]}}
          td {{materia.horario[1]}}
          td {{materia.horario[2]}}
          td {{materia.horario[3]}}
          td {{materia.horario[4]}}
          td {{materia.horario[5]}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { HorarioAPI } from "@/services/HorarioAPI";
import { MateriaDB } from "@/utils/tipos";

@Component
export default class Horario extends Vue {
  horarioHeaders: Array<string> = [
    "Materia",
    "Grupo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  materias: Array<MateriaDB> = [];
  cargando = false;

  async mounted(): Promise<void> {
    this.cargando = true;
    const { message } = await HorarioAPI.obtenerHorarioAlumno();
    this.materias = message;
    this.cargando = false;
  }
}
</script>
