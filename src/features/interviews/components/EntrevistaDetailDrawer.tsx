import { useState } from "react";
import { Badge, Button, Spinner } from "@/shared/components/ui";
import { ENTREVISTAS, PRUEBAS } from "@/config/constants";
import { useGetPruebas } from "@/features/exams";
import { useGetEntrevistaById, useRemoverPrueba } from "../hooks/useEntrevistas";
import type { Entrevista, EntrevistaPrueba } from "../types";
import AsignarPruebaModal from "./AsignarPruebaModal";

type EntrevistaDetailDrawerProps = {
  entrevista: Entrevista;
  onClose: () => void;
};

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

const metaLabelStyle: React.CSSProperties = {
  fontSize: "var(--font-size-sm)",
  color: "var(--color-text-muted)",
  marginBottom: "var(--space-xs)",
};

const metaValueStyle: React.CSSProperties = {
  fontSize: "var(--font-size-base)",
  color: "var(--color-text)",
  fontWeight: "var(--font-weight-medium)",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EntrevistaDetailDrawer({
  entrevista,
  onClose,
}: EntrevistaDetailDrawerProps) {
  const { data: detail, isLoading } = useGetEntrevistaById(entrevista.id);
  const { data: pruebas } = useGetPruebas();
  const removerPrueba = useRemoverPrueba();
  const [isAsignarOpen, setIsAsignarOpen] = useState(false);

  const pruebaMap = new Map((pruebas ?? []).map((p) => [p.id, p]));
  const sortedEPs = [...(detail?.pruebas ?? [])].sort((a, b) => a.orden - b.orden);
  const totalPeso = sortedEPs.reduce((sum, ep) => sum + ep.pesoPorcentaje, 0);

  const handleRemover = (ep: EntrevistaPrueba) => {
    if (window.confirm(ENTREVISTAS.CONFIRM_REMOVER_PRUEBA)) {
      removerPrueba.mutate({ entrevistaId: entrevista.id, pruebaId: ep.pruebaId });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xl)",
      }}
    >
      <div
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-xl)",
          width: "100%",
          maxWidth: "780px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-lg)",
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--space-md)",
          }}
        >
          <div>
            <p style={metaLabelStyle}>{ENTREVISTAS.MODAL_DETALLE_TITLE}</p>
            <h2
              style={{
                fontSize: "var(--font-size-xl)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-text)",
              }}
            >
              {entrevista.titulo}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              fontSize: "var(--font-size-xl)",
              cursor: "pointer",
              lineHeight: 1,
              padding: "var(--space-xs)",
              flexShrink: 0,
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Badges: área y estado */}
        <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
          <Badge variant={ENTREVISTAS.AREA_BADGE[entrevista.area] as BadgeVariant}>
            {ENTREVISTAS.AREA_LABELS[entrevista.area]}
          </Badge>
          <Badge variant={entrevista.activa ? "success" : "danger"}>
            {entrevista.activa ? ENTREVISTAS.ACTIVA : ENTREVISTAS.INACTIVA}
          </Badge>
        </div>

        {/* Descripción */}
        <div>
          <p style={metaLabelStyle}>{ENTREVISTAS.LABEL_DESCRIPCION}</p>
          <p
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-text)",
              lineHeight: 1.6,
            }}
          >
            {entrevista.descripcion}
          </p>
        </div>

        {/* Métricas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "var(--space-md)",
            backgroundColor: "var(--color-background)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-md)",
          }}
        >
          <div>
            <p style={metaLabelStyle}>{ENTREVISTAS.COL_TOTAL_PRUEBAS}</p>
            <p style={metaValueStyle}>{entrevista.totalPruebas}</p>
          </div>
          <div>
            <p style={metaLabelStyle}>Creada</p>
            <p style={metaValueStyle}>{formatDate(entrevista.creadaEn)}</p>
          </div>
        </div>

        {/* Sección pruebas */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-md)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-text)",
                }}
              >
                {ENTREVISTAS.DETAIL_PRUEBAS_TITLE}
              </p>
              {sortedEPs.length > 0 && (
                <p style={{ ...metaLabelStyle, marginBottom: 0 }}>
                  {ENTREVISTAS.DETAIL_PESO_TOTAL}:{" "}
                  <span
                    style={{
                      color: totalPeso > 100 ? "var(--color-danger)" : "var(--color-text)",
                      fontWeight: "var(--font-weight-medium)",
                    }}
                  >
                    {totalPeso}%
                  </span>
                </p>
              )}
            </div>
            <Button variant="primary" size="sm" onClick={() => setIsAsignarOpen(true)}>
              {ENTREVISTAS.BTN_ASIGNAR_PRUEBA}
            </Button>
          </div>

          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-lg)" }}>
              <Spinner size="md" />
            </div>
          ) : sortedEPs.length === 0 ? (
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "var(--font-size-sm)",
                textAlign: "center",
                padding: "var(--space-lg)",
                backgroundColor: "var(--color-background)",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--color-border)",
              }}
            >
              {ENTREVISTAS.DETAIL_NO_PRUEBAS}
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-xs)",
                backgroundColor: "var(--color-background)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
              }}
            >
              {sortedEPs.map((ep) => {
                const prueba = pruebaMap.get(ep.pruebaId);
                return (
                  <div
                    key={ep.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-sm)",
                      padding: "var(--space-sm) var(--space-md)",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    {/* Número de orden */}
                    <span
                      style={{
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-text-muted)",
                        fontWeight: "var(--font-weight-medium)",
                        minWidth: 24,
                        textAlign: "center",
                        backgroundColor: "var(--color-surface)",
                        borderRadius: "var(--radius-sm)",
                        padding: "2px 6px",
                        flexShrink: 0,
                      }}
                    >
                      #{ep.orden}
                    </span>

                    {/* Tipo badge */}
                    {prueba && (
                      <Badge
                        variant={PRUEBAS.TIPO_BADGE[prueba.tipo] as BadgeVariant}
                      >
                        {PRUEBAS.TIPO_LABELS[prueba.tipo]}
                      </Badge>
                    )}

                    {/* Título */}
                    <span
                      style={{
                        flex: 1,
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-text)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={prueba?.titulo ?? ep.pruebaId}
                    >
                      {prueba?.titulo ?? ep.pruebaId}
                    </span>

                    {/* Obligatoria */}
                    {ep.obligatoria && (
                      <Badge variant="neutral">{ENTREVISTAS.DETAIL_OBLIGATORIA}</Badge>
                    )}

                    {/* Peso */}
                    <span
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-text-muted)",
                        minWidth: 40,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {ep.pesoPorcentaje}%
                    </span>

                    {/* Remover */}
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={removerPrueba.isPending}
                      onClick={() => handleRemover(ep)}
                    >
                      {ENTREVISTAS.BTN_REMOVER}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pie */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="secondary" onClick={onClose}>
            {ENTREVISTAS.BTN_CERRAR}
          </Button>
        </div>
      </div>

      {isAsignarOpen && (
        <AsignarPruebaModal
          entrevistaId={entrevista.id}
          assignedPruebaIds={sortedEPs.map((ep) => ep.pruebaId)}
          pesoUsado={totalPeso}
          nextOrden={sortedEPs.length + 1}
          onClose={() => setIsAsignarOpen(false)}
        />
      )}
    </div>
  );
}
