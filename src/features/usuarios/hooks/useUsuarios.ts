import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usuariosService } from "../services/usuariosService";
import type { CreateUsuarioDto, UpdateUsuarioDto } from "../types";

const QUERY_KEY = ["usuarios"] as const;

export function useGetUsuarios() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: usuariosService.getUsuarios,
  });
}

export function useCreateUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateUsuarioDto) => usuariosService.createUsuario(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

type UpdateVars = { id: string; dto: UpdateUsuarioDto };

export function useUpdateUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: UpdateVars) => usuariosService.updateUsuario(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usuariosService.deleteUsuario(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useToggleActivo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usuariosService.toggleActivo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
