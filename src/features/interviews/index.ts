export type {
  AreaEntrevista,
  Entrevista,
  EntrevistaPrueba,
  EntrevistaConPruebas,
  CreateEntrevistaDto,
  UpdateEntrevistaDto,
  AsignarPruebaDto,
  ReordenarPruebasDto,
} from "./types";
export { entrevistasService } from "./services/entrevistasService";
export {
  useGetEntrevistas,
  useGetEntrevistaById,
  useCreateEntrevista,
  useUpdateEntrevista,
  useDeleteEntrevista,
  useAsignarPrueba,
  useRemoverPrueba,
} from "./hooks/useEntrevistas";
export { default as EntrevistasTable } from "./components/EntrevistasTable";
export { default as EntrevistaModal } from "./components/EntrevistaModal";
export { default as EntrevistaDetailDrawer } from "./components/EntrevistaDetailDrawer";
export { default as AsignarPruebaModal } from "./components/AsignarPruebaModal";
