<template lang="pug">
  v-container
    h1 Hola
    p Aquí irá lo primero que vea un alumno al iniciar sesión
    p Lo cuál seguramente serán sus calificaciones, los avisos que también están en el inicio de sesión
    p Y quizá su horario
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    if (!this.$store.getters.sesionIniciada) {
      return this.$router.replace("/");
    }

    if (this.$store.getters.tipoUsuario !== "alumno") {
      return this.$router.replace("/");
    }
  }
});
</script>
