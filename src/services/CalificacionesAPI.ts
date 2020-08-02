import { sleep } from "@/utils/funciones";
import { DatosCalificacion, DatosETS, DatosCalifFinales, DatosKardex } from "@/utils/tipos";

// Importar datos falsos
import { calificaciones } from "@/db/CalificacionesDB";
import { califFinales } from "@/db/CalifFinalesDB";
import { ets } from "@/db/EtsDB";
import { kardex } from "@/db/KardexDB";

export class CalificacionesAPI {
  static async obtenerCalificaciones(): Promise<DatosCalificacion> {
    await sleep(1500);

    return {
      status: 200,
      message: calificaciones,
    };
  }
  static async obtenerCalificacionesFinales(): Promise<DatosCalifFinales> {
    await sleep(1500);
    return {
      status: 200,
      message: califFinales,
    };
  }
  static async obtenerETS(): Promise<DatosETS> {
    await sleep(1500);
    return {
      status: 200,
      message: ets,
    };
  }
  static async obtenerKardex(): Promise<DatosKardex> {
    await sleep(1500);
    return {
      status: 200,
      message: kardex,
    };
  }
}
