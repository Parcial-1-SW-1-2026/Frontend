import { useState } from "react";
import { MainLayout } from "@/shared/components/layout";
import { Button } from "@/shared/components/ui";
import { useCurrentUser, useLogout } from "@/features/auth";
import {
  EntrevistasTable,
  EntrevistaModal,
  EntrevistaDetailDrawer,
} from "@/features/interviews";
import type { AreaEntrevista, Entrevista } from "@/features/interviews";
import { UI, ENTREVISTAS } from "@/config/constants";

const filterSelectStyle: React.CSSProperties = {
  backgroundColor: "var(--color-surface)",
  color: "var(--color-text)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "var(--space-sm) var(--space-md)",
  fontSize: "var(--font-size-sm)",
  fontFamily: "inherit",
  outline: "none",
  cursor: "pointer",
};

export default function EntrevistasPage() {
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  const [areaFilter, setAreaFilter] = useState<AreaEntrevista | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editEntrevista, setEditEntrevista] = useState<Entrevista | undefined>(undefined);
  const [detailEntrevista, setDetailEntrevista] = useState<Entrevista | undefined>(undefined);

  const handleOpenCreate = () => {
    setEditEntrevista(undefined);
    setIsFormModalOpen(true);
  };

  const handleEdit = (entrevista: Entrevista) => {
    setEditEntrevista(entrevista);
    setIsFormModalOpen(true);
  };

  const handleView = (entrevista: Entrevista) => {
    setDetailEntrevista(entrevista);
  };

  const handleCloseForm = () => {
    setIsFormModalOpen(false);
    setEditEntrevista(undefined);
  };

  const handleCloseDetail = () => {
    setDetailEntrevista(undefined);
  };

  return (
    <MainLayout userName={user?.name} onLogout={logout}>
      {/* Encabezado */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-lg)",
          gap: "var(--space-md)",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-text)",
          }}
        >
          {UI.ENTREVISTAS_TITLE}
        </h1>

        <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          {/* Filtro por área */}
          <select
            value={areaFilter ?? "all"}
            onChange={(e) => {
              const val = e.target.value;
              setAreaFilter(val === "all" ? null : (val as AreaEntrevista));
            }}
            style={filterSelectStyle}
            aria-label="Filtrar por área"
          >
            <option value="all">{ENTREVISTAS.FILTER_TODAS}</option>
            {ENTREVISTAS.AREAS.map((area) => (
              <option key={area} value={area}>
                {ENTREVISTAS.AREA_LABELS[area]}
              </option>
            ))}
          </select>

          <Button variant="primary" onClick={handleOpenCreate}>
            {ENTREVISTAS.BTN_NUEVA}
          </Button>
        </div>
      </div>

      <EntrevistasTable
        areaFilter={areaFilter}
        onView={handleView}
        onEdit={handleEdit}
      />

      {isFormModalOpen && (
        <EntrevistaModal onClose={handleCloseForm} entrevista={editEntrevista} />
      )}

      {detailEntrevista && (
        <EntrevistaDetailDrawer entrevista={detailEntrevista} onClose={handleCloseDetail} />
      )}
    </MainLayout>
  );
}
