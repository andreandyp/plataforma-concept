<template lang="pug">
  v-container
    .text-center
      router-link(to="/iniciar").text-h5 Ir a la plataforma
      p.text-h6 Después de iniciar sesión, añade este sitio a tus favoritos.
    p (Hola. Esta pantalla vacía existe porque muy probablemente el gobierno va a querer meter la 
      | innecesaria barra superior junto con el innecesario footer que llevan a otros sitios web
      | gubernamentales. Previendo eso, yo pondría aquí esa barra fea y ese footer feo y lo único 
      | que habría aquí sería el enlace que está arriba y el mensaje de añadir a favoritos.
      | Después de iniciar sesión, la app automáticamente redireccionaría a la parte de alumnos
      | o profesores, según sea el caso.)
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    if (this.$store.getters.sesionIniciada) {
      return this.$router.replace(`/${this.$store.getters.tipoUsuario}`);
    }
  }
});
</script>
