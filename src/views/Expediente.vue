<template lang="pug">
  v-container
    v-tabs(v-model="pestaña" background-color="primary" icons-and-text show-arrows fixed-tabs dark)
      v-tab(to="#escolar") Situación escolar
        v-icon mdi-school
      v-tab(to="#datos") Datos personales
        v-icon mdi-card-account-details-outline
      v-tab(to="#domicilio") Domicilio
        v-icon mdi-map-marker
      v-tab(to="#tutor") Datos del tutor
        v-icon mdi-account-child
      v-tab(to="#documentos") Documentos
        v-icon mdi-file-document-outline
      v-tabs-items(v-model="pestaña")
        situacion-escolar-tab
        datos-personales-tab
        domicilio-tab
        tutor-tab
        documentos-tab
</template>

<script lang="ts">
import Vue from "vue";
import SituacionEscolarTab from "@/components/expediente/SituacionEscolarTab.vue";
import DatosPersonalesTab from "@/components/expediente/DatosPersonalesTab.vue";
import DomicilioTab from "@/components/expediente/DomicilioTab.vue";
import TutorTab from "@/components/expediente/TutorTab.vue";
import DocumentosTab from "@/components/expediente/DocumentosTab.vue";
export default Vue.extend({
  data() {
    return {
      pestaña: "escolar"
    };
  },
  created() {
    if (!this.$route.hash) {
      this.$router.replace({ hash: "#escolar" });
    }
  },
  components: {
    "situacion-escolar-tab": SituacionEscolarTab,
    "datos-personales-tab": DatosPersonalesTab,
    "domicilio-tab": DomicilioTab,
    "tutor-tab": TutorTab,
    "documentos-tab": DocumentosTab
  }
});
</script>

<style scoped></style>
