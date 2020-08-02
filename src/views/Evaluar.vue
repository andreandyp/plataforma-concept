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
        v-stepper-content(step="2")
          v-textarea(
            label="¿Algún comentario anónimo para el profesor?"
            counter="280"
            clearable
            )
          v-btn(@click="anterior()" text) Anterior
          v-btn.primary(@click="siguiente()") Siguiente
        v-stepper-content(step="3")
          p ¿Cómo calificarías en general a este/a profesor/a? 
            v-tooltip(right)
              template(v-slot:activator="{ on, attrs }")
                v-icon(size="20" v-bind="attrs" v-on="on" v-show="estrellasDadas >= 5")
                  | mdi-alert-decagram
              span(v-if="estrellasDadas < 7") ¿Crees que el/la profesor/a es muy bueno/a?
                br
                | ¡Dale {{estrellasDadas + 1}} estrellas!
              span(v-else) ¡Es la máxima calificación posible!
          .d-flex.align-center.justify-center
            v-rating.d-inline-flex(
              v-model="estrellasDadas"
              :length="limiteEstrellas"
              :half-increments="estrellasDadas < 5"
              :hover="estrellasDadas < 5"
              :color="colorEstrellas"
              :background-color="fondoEstrellas"
              size="40"
              dense
              )
          p(
            :class="{'text-uppercase': (estrellasDadas > 5), 'amber--text': (estrellasDadas > 5)}"
          ) {{estrellasDadas}} estrellas
          v-snackbar(v-model="snackbarAbierta" timeout="2000" top) Vamos, dale al menos media estrella...
          v-btn(@click="anterior()" text) Anterior
          v-btn.primary(@click="validarEstrellas()") Siguiente
    v-dialog(v-model="dialogAbierto" max-width="768px")
      v-card
        v-card-title(primary-title) Evaluación completa
        v-card-text Gracias por tu participación
        v-card-actions
          v-spacer
          v-btn(color="primary" text @click="subirEvaluacion()") Aceptar
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class EvaluarProfes extends Vue {
  pasoActual = 1;
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

  estrellasDadas = 0;
  limiteEstrellas = 5;
  colorEstrellas = this.$vuetify.theme.themes.light.primary;
  fondoEstrellas = `${this.$vuetify.theme.themes.light.primary} lighten-3`;
  snackbarAbierta = false;
  dialogAbierto = false;

  @Watch("estrellasDadas")
  cambiarLimiteEstrellas(val: number): void {
    if (val < 5) {
      this.limiteEstrellas = 5;
      this.colorEstrellas = this.$vuetify.theme.themes.light.primary;
      this.fondoEstrellas = `${this.$vuetify.theme.themes.light.primary} lighten-3`;
      return;
    }
    if (val === 5) {
      this.limiteEstrellas = 6;
      this.colorEstrellas = this.$vuetify.theme.themes.light.primary;
      this.fondoEstrellas = `${this.$vuetify.theme.themes.light.primary} lighten-3`;
      return;
    }
    if (val === 6) {
      this.limiteEstrellas = 7;
      this.colorEstrellas = "yellow";
      this.fondoEstrellas = "yellow ligthen-3";
      return;
    }
  }

  siguientePregunta(): void {
    ++this.indiceActual;
    if (this.indiceActual > this.preguntas.length) {
      --this.indiceActual;
      ++this.pasoActual;
      return;
    }
  }

  @Watch("indiceActual")
  cambiarPregunta(val: number, oldVal: number): void {
    this.preguntaActual = this.preguntas[this.indiceActual - 1];
    if (val > this.contestadas) {
      this.contestadas = this.indiceActual;
    }
  }

  validarEstrellas(): void {
    if (this.estrellasDadas < 0.5) {
      this.snackbarAbierta = true;
      return;
    }
    this.dialogAbierto = true;
  }
  subirEvaluacion(): void {
    this.dialogAbierto = false;
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
