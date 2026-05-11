import { api } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api";
import type { Prueba, CreatePruebaDto, UpdatePruebaDto } from "../types";

export const examsService = {
  getPruebas: (): Promise<Prueba[]> =>
    api.get<ApiResponse<Prueba[]>>("/pruebas").then((r) => r.data.data),

  getPruebaById: (id: string): Promise<Prueba> =>
    api.get<ApiResponse<Prueba>>(`/pruebas/${id}`).then((r) => r.data.data),

  createPrueba: (dto: CreatePruebaDto): Promise<Prueba> =>
    api.post<ApiResponse<Prueba>>("/pruebas", dto).then((r) => r.data.data),

  updatePrueba: (id: string, dto: UpdatePruebaDto): Promise<Prueba> =>
    api.put<ApiResponse<Prueba>>(`/pruebas/${id}`, dto).then((r) => r.data.data),

  deletePrueba: (id: string): Promise<void> =>
    api.delete(`/pruebas/${id}`).then(() => undefined),

  toggleActiva: (id: string): Promise<Prueba> =>
    api
      .patch<ApiResponse<Prueba>>(`/pruebas/${id}/toggle-activa`)
      .then((r) => r.data.data),
};
