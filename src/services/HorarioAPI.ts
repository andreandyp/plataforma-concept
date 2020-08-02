import { sleep } from "../utils/funciones";
import { materias } from "@/db/HorarioDB";
import { DatosMateria } from "@/utils/tipos";

export class HorarioAPI {
  static async obtenerHorarioAlumno(): Promise<DatosMateria> {
    await sleep(1500);

    return {
      status: 200,
      message: materias,
    };
  }
}
