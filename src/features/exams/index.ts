export type { Exam, ExamStatus, Prueba, TipoPrueba, CreatePruebaDto, UpdatePruebaDto } from "./types";
export { examsService } from "./services/examsService";
export {
  useGetPruebas,
  useGetPruebaById,
  useCreatePrueba,
  useUpdatePrueba,
  useDeletePrueba,
  useToggleActiva,
} from "./hooks/useExams";
export { default as PruebasTable } from "./components/PruebasTable";
export { default as PruebaModal } from "./components/PruebaModal";
export { default as PruebaDetailModal } from "./components/PruebaDetailModal";
