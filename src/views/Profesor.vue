<template lang="pug">
  v-container
    h1 Aquí va la parte en la que el profesor pone sus calificaciones, creo.
    p Nunca he visto cómo es la parte de los profesores 😂.
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Profesor extends Vue {
  created(): void {
    if (!this.$store.getters.sesionIniciada) {
      this.$router.replace("/");
      return;
    }
    if (this.$store.getters.tipoUsuario !== "profesor") {
      this.$router.replace("/");
      return;
    }
  }
}
</script>
