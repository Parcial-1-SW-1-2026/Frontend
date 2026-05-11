import { api } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api";
import type {
  Entrevista,
  EntrevistaConPruebas,
  EntrevistaPrueba,
  CreateEntrevistaDto,
  UpdateEntrevistaDto,
  AsignarPruebaDto,
  ReordenarPruebasDto,
} from "../types";

export const entrevistasService = {
  getEntrevistas: (): Promise<Entrevista[]> =>
    api.get<ApiResponse<Entrevista[]>>("/entrevistas").then((r) => r.data.data),

  getEntrevistaById: (id: string): Promise<EntrevistaConPruebas> =>
    api.get<ApiResponse<EntrevistaConPruebas>>(`/entrevistas/${id}`).then((r) => r.data.data),

  createEntrevista: (dto: CreateEntrevistaDto): Promise<Entrevista> =>
    api.post<ApiResponse<Entrevista>>("/entrevistas", dto).then((r) => r.data.data),

  updateEntrevista: (id: string, dto: UpdateEntrevistaDto): Promise<Entrevista> =>
    api.put<ApiResponse<Entrevista>>(`/entrevistas/${id}`, dto).then((r) => r.data.data),

  deleteEntrevista: (id: string): Promise<void> =>
    api.delete(`/entrevistas/${id}`).then(() => undefined),

  asignarPrueba: (entrevistaId: string, dto: AsignarPruebaDto): Promise<EntrevistaPrueba> =>
    api
      .post<ApiResponse<EntrevistaPrueba>>(`/entrevistas/${entrevistaId}/pruebas`, dto)
      .then((r) => r.data.data),

  removerPrueba: (entrevistaId: string, pruebaId: string): Promise<void> =>
    api.delete(`/entrevistas/${entrevistaId}/pruebas/${pruebaId}`).then(() => undefined),

  reordenarPruebas: (entrevistaId: string, dto: ReordenarPruebasDto): Promise<EntrevistaConPruebas> =>
    api
      .put<ApiResponse<EntrevistaConPruebas>>(`/entrevistas/${entrevistaId}/pruebas/orden`, dto)
      .then((r) => r.data.data),
};
