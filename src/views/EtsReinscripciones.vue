<template lang="pug">
  v-container
    h2 Inscripciones a ETS
    v-row
      v-col(md="3")
        v-skeleton-loader(v-if="cargando" type="card")
        v-card(v-else outlined)
          v-card-title.d-flex.justify-space-between Información
            v-btn(:loading="cargando" @click="actualizarCreditos()" icon)
              v-icon mdi-sync
          v-card-text
            p 
              strong Periodo: 
              | {{periodo}}
            p 
              strong Boleta: 
              | {{boleta}}
            p 
              strong Créditos disponibles: 
              | {{usados}}/{{total}}
      v-col(md="9")
        v-simple-table
          thead
            tr
              th(v-for="header in headers") {{header}}
          tbody
            tr(v-for="ets in adeudos")
              td {{ets.carrera}}
              td {{ets.plan}}
              td {{ets.especialidad}}
              td {{ets.materia}}
              td {{ets.turno}}
              td(v-if="!ets.inscrito")
                v-btn.primary(color="white" :href="ets.comprobante" rounded icon)
                  v-icon mdi-download
              td(v-else)
                v-btn(color="white" disabled rounded icon)
                  v-icon mdi-download
              td(v-if="ets.inscrito")
                v-btn.error(color="success" rounded)
                  v-icon(left) mdi-check
                  | Inscribir
              td(v-else)
                v-btn.error(color="white" rounded)
                  v-icon(left) mdi-minus
                  | Dar de baja
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { ReinscripcionesAPI } from "@/services/ReinscripcionesAPI";

@Component({
  name: "App",
})
export default class EtsReinscripciones extends Vue {
  cargando = false;
  periodo = "2020/1";
  boleta = "2020XXXXXX";
  usados = "4.5";
  total = "9";

  headers: Array<string> = [
    "Carrera",
    "Plan de estudios",
    "Especialidad",
    "Materia",
    "Turno",
    "Comprobante",
    "Acciones",
  ];

  adeudos: Array<unknown> = [
    {
      carrera: "QBP",
      plan: "20",
      especialidad: "-",
      materia: "Cálculo",
      turno: "Vespertino",
      comprobante: "",
      inscrito: true,
    },
    {
      carrera: "ISC",
      plan: "09",
      especialidad: "-",
      materia: "Orientación",
      turno: "Matutino",
      comprobante: "",
      inscrito: false,
    },
  ];

  mounted(): void {
    this.actualizarCreditos();
  }

  async actualizarCreditos(): Promise<void> {
    this.cargando = true;
    await ReinscripcionesAPI.obtenerCreditos();
    this.cargando = false;
  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 0.95rem;
}
th {
  font-weight: bolder;
}
</style>
