type Notificacion = {
  _id: number;
  titulo: string;
  fechaEnvio: Date;
  contenido: string;
  vista: boolean;
};

type ResponseServer = {
  status: number;
  message: string;
};

type Sesion = {
  usuario: string;
  nombre: string;
  estado: string | null;
  tipo: string;
};

type DatosSesion = {
  status: number;
  message: Sesion;
};

type UsuarioDB = {
  usuario: string;
  contraseña: string;
  email: string;
  nombre: string;
  estado: string | null;
  tipo: string;
};

type CalificacionDB = {
  nombre: string;
  periodo1: number | string;
  periodo2: number | string;
  periodo3: number | string;
  extra: number | string;
  final: number | string;
};

type DatosCalificacion = {
  status: number;
  message: Array<CalificacionDB>;
};

type CalifFinalesDB = {
  materia: string;
  ordinario: string | number;
  extra: string | number;
  ets: string | number;
  final: string | number;
};

type DatosCalifFinales = {
  status: number;
  message: Array<CalifFinalesDB>;
};

type ETSDB = {
  periodo: string;
  tipo: string;
  materia: string;
  turno: string;
  calificacion: string | number;
};

type DatosETS = {
  status: number;
  message: Array<ETSDB>;
};

type KardexDB = {
  codigo: string;
  materia: string;
  periodo: string;
  forma: string;
  calificacion: number;
};

type DatosKardex = {
  status: number;
  message: Array<Array<KardexDB>>;
};

type MateriaDB = {
  nombre: string;
  grupo: string;
  horario: Array<string>;
};

type DatosMateria = {
  status: number;
  message: Array<MateriaDB>;
};

type ProfesorDB = {
  _id: number;
  nombre: string;
  status: number;
};

type DatosProfesor = {
  status: number;
  message: Array<ProfesorDB>;
};

export {
  Notificacion,
  ResponseServer,
  DatosSesion,
  Sesion,
  UsuarioDB,
  CalificacionDB,
  DatosCalificacion,
  CalifFinalesDB,
  DatosCalifFinales,
  ETSDB,
  DatosETS,
  KardexDB,
  DatosKardex,
  MateriaDB,
  DatosMateria,
  ProfesorDB,
  DatosProfesor,
};
