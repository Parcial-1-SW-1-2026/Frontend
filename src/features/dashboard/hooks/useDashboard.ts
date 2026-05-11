import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

export function useGetResumen() {
  return useQuery({
    queryKey: ["dashboard", "resumen"] as const,
    queryFn: dashboardService.getResumen,
    refetchInterval: 30000,
  });
}

export function useGetActividad() {
  return useQuery({
    queryKey: ["dashboard", "actividad"] as const,
    queryFn: dashboardService.getActividadReciente,
  });
}
