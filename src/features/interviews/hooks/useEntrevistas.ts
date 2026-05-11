import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { entrevistasService } from "../services/entrevistasService";
import type { AsignarPruebaDto, CreateEntrevistaDto, UpdateEntrevistaDto } from "../types";

const BASE_KEY = ["entrevistas"] as const;

export function useGetEntrevistas() {
  return useQuery({
    queryKey: BASE_KEY,
    queryFn: entrevistasService.getEntrevistas,
  });
}

export function useGetEntrevistaById(id: string) {
  return useQuery({
    queryKey: [...BASE_KEY, id] as const,
    queryFn: () => entrevistasService.getEntrevistaById(id),
    enabled: Boolean(id),
  });
}

export function useCreateEntrevista() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateEntrevistaDto) => entrevistasService.createEntrevista(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}

type UpdateVars = { id: string; dto: UpdateEntrevistaDto };

export function useUpdateEntrevista() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: UpdateVars) => entrevistasService.updateEntrevista(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}

export function useDeleteEntrevista() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => entrevistasService.deleteEntrevista(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}

type AsignarVars = { entrevistaId: string; dto: AsignarPruebaDto };

export function useAsignarPrueba() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ entrevistaId, dto }: AsignarVars) =>
      entrevistasService.asignarPrueba(entrevistaId, dto),
    onSuccess: (_, { entrevistaId }) => {
      queryClient.invalidateQueries({ queryKey: [...BASE_KEY, entrevistaId] });
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}

type RemoverVars = { entrevistaId: string; pruebaId: string };

export function useRemoverPrueba() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ entrevistaId, pruebaId }: RemoverVars) =>
      entrevistasService.removerPrueba(entrevistaId, pruebaId),
    onSuccess: (_, { entrevistaId }) => {
      queryClient.invalidateQueries({ queryKey: [...BASE_KEY, entrevistaId] });
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}
