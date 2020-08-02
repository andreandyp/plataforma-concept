import { sleep } from "@/utils/funciones";
import { DatosProfesor } from "@/utils/tipos";

import { profesores } from "@/db/ProfesoresDB";

export class ProfesoresAPI {
  static async obtenerEvaluaciones(): Promise<DatosProfesor> {
    await sleep(1500);

    return {
      status: 200,
      message: profesores,
    };
  }
}
