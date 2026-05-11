export type AreaEntrevista = "juridico" | "comercial" | "desarrollador";

export type Entrevista = {
  id: string;
  usuarioId: string;
  titulo: string;
  area: AreaEntrevista;
  descripcion: string;
  totalPruebas: number;
  activa: boolean;
  creadaEn: string;
};

export type EntrevistaPrueba = {
  id: string;
  entrevistaId: string;
  pruebaId: string;
  orden: number;
  obligatoria: boolean;
  pesoPorcentaje: number;
};

export type EntrevistaConPruebas = Entrevista & {
  pruebas: EntrevistaPrueba[];
};

export type CreateEntrevistaDto = {
  titulo: string;
  area: AreaEntrevista;
  descripcion: string;
};

export type UpdateEntrevistaDto = Partial<CreateEntrevistaDto>;

export type AsignarPruebaDto = {
  pruebaId: string;
  orden: number;
  obligatoria: boolean;
  pesoPorcentaje: number;
};

export type ReordenarPruebasDto = {
  pruebas: Array<{ id: string; orden: number }>;
};
