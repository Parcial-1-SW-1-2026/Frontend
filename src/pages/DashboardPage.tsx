import { Link } from "@tanstack/react-router";
import { MainLayout } from "@/shared/components/layout";
import { useCurrentUser, useLogout } from "@/features/auth";
import { MetricCard, ActividadList, useGetResumen, useGetActividad } from "@/features/dashboard";
import { DASHBOARD, UI } from "@/config/constants";

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="13" y2="15" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconActivity() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

const quickLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-sm)",
  padding: "var(--space-sm) var(--space-md)",
  borderRadius: "var(--radius-md)",
  fontSize: "var(--font-size-sm)",
  textDecoration: "none",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  backgroundColor: "var(--color-background)",
  transition: "background-color 0.15s",
};

export default function DashboardPage() {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const { data: resumen, isLoading: loadingResumen } = useGetResumen();
  const {
    data: actividad,
    isLoading: loadingActividad,
    isError: errorActividad,
  } = useGetActividad();

  return (
    <MainLayout userName={user?.name} onLogout={logout}>
      {/* Saludo */}
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-text)",
            marginBottom: "var(--space-xs)",
          }}
        >
          {DASHBOARD.GREETING},{" "}
          <span style={{ color: "var(--color-primary)" }}>{user?.name ?? "…"}</span>
        </h1>
        <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-muted)" }}>
          {DASHBOARD.GREETING_SUBTITLE}
        </p>
      </div>

      {/* Grid de métricas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--space-lg)",
          marginBottom: "var(--space-xl)",
        }}
      >
        <MetricCard
          label={DASHBOARD.METRIC_USUARIOS}
          value={resumen?.totalUsuarios ?? 0}
          variant="primary"
          icon={<IconUsers />}
          isLoading={loadingResumen}
        />
        <MetricCard
          label={DASHBOARD.METRIC_PRUEBAS}
          value={resumen?.totalPruebas ?? 0}
          variant="info"
          icon={<IconDocument />}
          isLoading={loadingResumen}
        />
        <MetricCard
          label={DASHBOARD.METRIC_ENTREVISTAS}
          value={resumen?.totalEntrevistas ?? 0}
          variant="warning"
          icon={<IconChat />}
          isLoading={loadingResumen}
        />
        <MetricCard
          label={DASHBOARD.METRIC_SESIONES_HOY}
          value={resumen?.sesionesHoy ?? 0}
          subtitle={
            resumen
              ? `${resumen.sesionesActivas} ${DASHBOARD.METRIC_SESIONES_ACTIVAS_AHORA}`
              : undefined
          }
          variant="success"
          icon={<IconActivity />}
          isLoading={loadingResumen}
        />
      </div>

      {/* Actividad + Accesos rápidos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 240px",
          gap: "var(--space-lg)",
          alignItems: "start",
        }}
      >
        <ActividadList
          actividad={actividad}
          isLoading={loadingActividad}
          isError={errorActividad}
        />

        {/* Accesos rápidos */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-lg)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--font-size-base)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-text)",
              marginBottom: "var(--space-md)",
            }}
          >
            {DASHBOARD.ACCESOS_TITLE}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            <Link to="/usuarios" style={quickLinkStyle}>
              <IconUsers />
              {DASHBOARD.ACCESO_USUARIOS}
            </Link>
            <Link to="/pruebas" style={quickLinkStyle}>
              <IconDocument />
              {DASHBOARD.ACCESO_PRUEBAS}
            </Link>
            <Link to="/entrevistas" style={quickLinkStyle}>
              <IconChat />
              {DASHBOARD.ACCESO_ENTREVISTAS}
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
