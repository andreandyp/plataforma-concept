<template lang="pug">
  v-container
    h1 Aquí va la parte en la que el profesor pone sus calificaciones, creo.
    p Nunca he visto cómo es la parte de los profesores 😂.
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    if (!this.$store.getters.sesionIniciada) {
      return this.$router.replace("/");
    }

    if (this.$store.getters.tipoUsuario !== "profesor") {
      return this.$router.replace("/");
    }
  }
});
</script>
