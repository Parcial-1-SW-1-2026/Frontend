export type ExamStatus = "pending" | "in_progress" | "processing" | "completed";

export type Exam = {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: ExamStatus;
  createdAt: string;
};

// ── Pruebas ────────────────────────────────────────────────────────────────

export type TipoPrueba =
  | "cuestionario_teorico"
  | "caso_practico"
  | "ejercicio_codigo"
  | "prueba_psicologica";

export type Prueba = {
  id: string;
  usuarioId: string;
  titulo: string;
  tipo: TipoPrueba;
  descripcion: string;
  contenido: string;
  puntajeMaximo: number;
  duracionMinutos: number;
  activa: boolean;
  creadaEn: string;
};

export type CreatePruebaDto = {
  titulo: string;
  tipo: TipoPrueba;
  descripcion: string;
  contenido: string;
  puntajeMaximo: number;
  duracionMinutos: number;
};

export type UpdatePruebaDto = Partial<CreatePruebaDto>;
