<template lang="pug">
  v-container.text-center
    v-stepper(v-model="pasoActual")
      v-stepper-header
        v-stepper-step(:complete="pasoActual > 1" :editable="pasoActual > 1" step="1") Cuestionario
        v-divider
        v-stepper-step(:complete="pasoActual > 2" :editable="pasoActual > 2" step="2") Comentario
        v-divider
        v-stepper-step(:complete="pasoActual > 3" step="3") Calificación general
      v-stepper-items
        v-stepper-content(step="1")
          eval-cuestionario(@siguiente="siguiente()")
        v-stepper-content(step="2")
          eval-comentario(@anterior="anterior()" @siguiente="siguiente()")
        v-stepper-content(step="3")
          eval-estrellas(@anterior="anterior()" @siguiente="evaluacionTerminada = true")
    v-dialog(v-model="evaluacionTerminada" max-width="768px")
      v-card
        v-card-title(primary-title) Evaluación completa
        v-card-text Gracias por tu participación
        v-card-actions
          v-spacer
          v-btn(color="primary" text @click="subirEvaluacion()") Aceptar
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import EvalCuestionario from "@/components/evaluacion_profes/EvalCuestionario.vue";
import EvalComentario from "@/components/evaluacion_profes/EvalComentario.vue";
import EvalEstrellas from "@/components/evaluacion_profes/EvalEstrellas.vue";

@Component({
  components: {
    "eval-cuestionario": EvalCuestionario,
    "eval-comentario": EvalComentario,
    "eval-estrellas": EvalEstrellas,
  },
})
export default class EvaluarProfes extends Vue {
  pasoActual = 1;
  evaluacionTerminada = false;

  subirEvaluacion(): void {
    this.evaluacionTerminada = false;
    this.$router.back();
  }

  anterior(): void {
    --this.pasoActual;
  }
  siguiente(): void {
    ++this.pasoActual;
  }
}
</script>
