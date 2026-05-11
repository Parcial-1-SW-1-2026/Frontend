import { api } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api";
import type { ActividadReciente, DashboardResumen } from "../types";

export const dashboardService = {
  getResumen: (): Promise<DashboardResumen> =>
    api.get<ApiResponse<DashboardResumen>>("/dashboard/resumen").then((r) => r.data.data),

  getActividadReciente: (): Promise<ActividadReciente[]> =>
    api
      .get<ApiResponse<ActividadReciente[]>>("/dashboard/actividad")
      .then((r) => r.data.data),
};
