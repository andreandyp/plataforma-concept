<template lang="pug">
  div
    h5.text-h5 {{preguntaActual}}
    p Pregunta {{indiceActual}} de {{preguntas.length}}
    .d-flex.justify-center
      v-btn.redondo-izq(@click="siguientePregunta()" color="primary lighten-2" outlined x-large) Sí
      v-btn.redondo-der(@click="siguientePregunta()" color="primary lighten-2" outlined x-large) No
    p(v-show="indiceActual === 10")
      strong Si eres víctima de acoso sexual, contacta inmediatamente a la 
        a(href="https://www.ipn.mx/genero/") Red de Género del instituto.
        br
        |  Tel: +525500000000 Ext. 000000
    v-pagination(v-model="indiceActual" :length="contestadas" circle)
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class EvalCuestionario extends Vue {
  indiceActual = 1;
  preguntas: Array<string> = [
    "¿Planea sus clases?",
    "¿Las tareas que deja son muy largas o pesadas?",
    "¿Sus clases aburridas?",
    "¿Te inspira de alguna manera?",
    "¿Termina la clase a la hora debida?",
    "¿Es justo con las evaluaciones?",
    "¿Sabe dar clases?",
    "¿Los proyectos que deja en clase son aplicables a la vida real?",
    "¿Trata a todos por igual?",
    "¿Te ha tratado con respeto?",
  ];
  preguntaActual = this.preguntas[this.indiceActual - 1];
  contestadas = 1;

  siguientePregunta(): void {
    ++this.indiceActual;
    if (this.indiceActual > this.preguntas.length) {
      --this.indiceActual;
      this.$emit("siguiente");
      return;
    }
  }

  @Watch("indiceActual")
  cambiarPregunta(val: number): void {
    this.preguntaActual = this.preguntas[this.indiceActual - 1];
    if (val > this.contestadas) {
      this.contestadas = this.indiceActual;
    }
  }
}
</script>

<style scoped>
.redondo-izq {
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
}
.redondo-der {
  border-top-right-radius: 28px;
  border-bottom-right-radius: 28px;
}
</style>
