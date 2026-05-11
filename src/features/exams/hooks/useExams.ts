import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { examsService } from "../services/examsService";
import type { CreatePruebaDto, UpdatePruebaDto } from "../types";

const BASE_KEY = ["pruebas"] as const;

export function useGetPruebas() {
  return useQuery({
    queryKey: BASE_KEY,
    queryFn: examsService.getPruebas,
  });
}

export function useGetPruebaById(id: string) {
  return useQuery({
    queryKey: [...BASE_KEY, id] as const,
    queryFn: () => examsService.getPruebaById(id),
    enabled: Boolean(id),
  });
}

export function useCreatePrueba() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePruebaDto) => examsService.createPrueba(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}

type UpdateVars = { id: string; dto: UpdatePruebaDto };

export function useUpdatePrueba() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: UpdateVars) => examsService.updatePrueba(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}

export function useDeletePrueba() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => examsService.deletePrueba(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}

export function useToggleActiva() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => examsService.toggleActiva(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
}
