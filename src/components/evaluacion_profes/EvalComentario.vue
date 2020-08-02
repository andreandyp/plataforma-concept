<template lang="pug">
  div
    v-textarea(
      v-model="comentario"
      label="¿Algún comentario anónimo para el profesor?"
      :counter="limiteComentario"
      clearable
      )
    v-btn(@click="anterior()" text) Anterior
    v-btn.primary(@click="siguiente()") Siguiente
    v-snackbar(v-model="errorLimite" timeout="2000" top)
      | El comentario excede en {{comentario.length - limiteComentario}} carácteres.
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class EvalComentario extends Vue {
  comentario = "";
  limiteComentario = 280;
  errorLimite = false;

  anterior(): void {
    this.$emit("anterior");
  }
  siguiente(): void {
    if (this.comentario.length > this.limiteComentario) {
      this.errorLimite = true;
      return;
    }

    this.$emit("siguiente");
  }
}
</script>
