<template lang="pug">
  div
    p ¿Cómo calificarías en general a este/a profesor/a? 
      v-tooltip(right)
        template(v-slot:activator="{ on, attrs }")
          v-icon(size="20" v-bind="attrs" v-on="on" v-show="estrellasDadas >= 5")
            | mdi-alert-decagram
        span(v-if="estrellasDadas < 7") ¿Crees que el/la profesor/a es muy bueno/a?
          br
          | ¡Dale {{estrellasDadas + 1}} estrellas!
        span(v-else) ¡Es la máxima calificación posible!
    div.d-flex.align-center.justify-center
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
    v-snackbar(v-model="estrellasInsuficientes" timeout="2000" top)
      | Vamos, dale al menos media estrella...
    v-btn(@click="anterior()" text) Anterior
    v-btn.primary(@click="siguiente()") Siguiente
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class EvalEstrellas extends Vue {
  estrellasDadas = 0;
  limiteEstrellas = 5;
  colorEstrellas = this.$vuetify.theme.themes.light.primary;
  fondoEstrellas = `${this.$vuetify.theme.themes.light.primary} lighten-3`;
  estrellasInsuficientes = false;

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

  anterior(): void {
    this.$emit("anterior");
  }
  siguiente(): void {
    if (this.estrellasDadas < 0.5) {
      this.estrellasInsuficientes = true;
      return;
    }
    this.$emit("siguiente");
  }
}
</script>
