<template lang="pug">
  v-tab-item(id="documentos")
    v-card(outlined)
      v-card-text
        v-simple-table
          thead
            tr
              th Documento
              th Status
              th Notas
              th Descargar
          tbody
            tr(v-for="doc in documentos")
              td {{doc.nombre}}
              td
                v-badge(:content="estadoDocumento(doc.status)" :color="colorEstado(doc.status)")
              td {{doc.notas}}
              td(v-if="doc.status === 3")
                v-btn.primary(color="white" rounded link icon)
                  v-icon mdi-download
              td(v-else)
                v-btn(color="white" rounded link icon disabled)
                  v-icon mdi-download

</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DocumentosTab extends Vue {
  documentos = [
    {
      nombre: "Acta de nacimiento",
      status: 3,
      notas: "Ninguna",
    },
    {
      nombre: "CURP",
      status: 3,
      notas: "Ninguna",
    },
    {
      nombre: "Identificación oficial",
      status: 3,
      notas: "Ninguna",
    },
    {
      nombre: "Credencial de la escuela",
      status: 2,
      notas: "Ninguna",
    },
    {
      nombre: "Certificado de estudios",
      status: 1,
      notas: "Retrasado por pandemia",
    },
    {
      nombre: "Comprobante de domicilio",
      status: 0,
      notas: "El documento es mayor a 3 meses",
    },
  ];

  estadoDocumento(estado: number): string {
    switch (estado) {
      case 0:
        return "No disponible";
      case 1:
        return "Solicitado";
      case 2:
        return "En proceso";
      case 3:
        return "Disponible";
      default:
        return "";
    }
  }
  colorEstado(estado: number): string {
    switch (estado) {
      case 0:
        return "black";
      case 1:
        return "red";
      case 2:
        return "yellow darken-2";
      case 3:
        return "green";
      default:
        return "";
    }
  }
}
</script>
