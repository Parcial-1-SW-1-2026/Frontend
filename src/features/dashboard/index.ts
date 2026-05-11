export type {
  DashboardResumen,
  ActividadReciente,
  Report,
  AIEvent,
  RiskLevel,
} from "./types";
export { dashboardService } from "./services/dashboardService";
export { useGetResumen, useGetActividad } from "./hooks/useDashboard";
export { default as MetricCard } from "./components/MetricCard";
export { default as ActividadList } from "./components/ActividadList";
