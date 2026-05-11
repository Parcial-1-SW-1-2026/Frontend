import { api } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api";
import type { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from "../types";

export const usuariosService = {
  getUsuarios: (): Promise<Usuario[]> =>
    api.get<ApiResponse<Usuario[]>>("/usuarios").then((r) => r.data.data),

  getUsuarioById: (id: string): Promise<Usuario> =>
    api.get<ApiResponse<Usuario>>(`/usuarios/${id}`).then((r) => r.data.data),

  createUsuario: (dto: CreateUsuarioDto): Promise<Usuario> =>
    api.post<ApiResponse<Usuario>>("/usuarios", dto).then((r) => r.data.data),

  updateUsuario: (id: string, dto: UpdateUsuarioDto): Promise<Usuario> =>
    api.put<ApiResponse<Usuario>>(`/usuarios/${id}`, dto).then((r) => r.data.data),

  deleteUsuario: (id: string): Promise<void> =>
    api.delete(`/usuarios/${id}`).then(() => undefined),

  toggleActivo: (id: string): Promise<Usuario> =>
    api.patch<ApiResponse<Usuario>>(`/usuarios/${id}/toggle-activo`).then((r) => r.data.data),
};
