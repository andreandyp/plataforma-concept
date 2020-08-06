<template lang="pug">
  v-container
    h2 Citas de reinscripción
    v-row
      v-col(md="4")
        v-card
          v-card-title Tu cita
          v-card-subtitle Promedio general: {{promedio}}
          v-card-text
            h3 23 de enero del 2020 a las 13:00
            | Fecha límite: 24 de enero del 2020 a las 13:00
          v-card-actions
            v-btn(text) Actualizar
            v-btn(color="primary" text) Reínscribete
      v-col(md="4")
        v-card
          v-card-title Tu trayectoria escolar
          v-card-text
            ul
              li Total de créditos:
              li Carga máxima:
              li Carga media:
              li Carga mínima:
              li Duración de la carrera en semestres:
              li Duración máxima en semestres:
      v-col(md="4")
        v-card
          v-card-title Información de créditos
          v-card-subtitle Consulta tus créditos
          v-card-text
            ul
              li Créditos obtenidos: 
              li Periodos cursados:
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class CitasReinscripciones extends Vue {
  promedio = 8.55;
}
</script>
