import { Badge, Button, Spinner } from "@/shared/components/ui";
import { ENTREVISTAS } from "@/config/constants";
import { useGetEntrevistas, useDeleteEntrevista } from "../hooks/useEntrevistas";
import type { AreaEntrevista, Entrevista } from "../types";

type EntrevistasTableProps = {
  areaFilter: AreaEntrevista | null;
  onView: (entrevista: Entrevista) => void;
  onEdit: (entrevista: Entrevista) => void;
};

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

const thStyle: React.CSSProperties = {
  padding: "var(--space-sm) var(--space-md)",
  textAlign: "left",
  fontSize: "var(--font-size-sm)",
  fontWeight: "var(--font-weight-medium)",
  color: "var(--color-text-muted)",
  borderBottom: "1px solid var(--color-border)",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "var(--space-sm) var(--space-md)",
  fontSize: "var(--font-size-sm)",
  color: "var(--color-text)",
  borderBottom: "1px solid var(--color-border)",
  verticalAlign: "middle",
};

export default function EntrevistasTable({ areaFilter, onView, onEdit }: EntrevistasTableProps) {
  const { data: entrevistas, isLoading, isError } = useGetEntrevistas();
  const deleteEntrevista = useDeleteEntrevista();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-2xl)" }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <p
        style={{
          color: "var(--color-danger)",
          textAlign: "center",
          padding: "var(--space-xl)",
          fontSize: "var(--font-size-base)",
        }}
      >
        {ENTREVISTAS.ERROR}
      </p>
    );
  }

  const filtered = areaFilter
    ? (entrevistas ?? []).filter((e) => e.area === areaFilter)
    : (entrevistas ?? []);

  if (filtered.length === 0) {
    return (
      <p
        style={{
          color: "var(--color-text-muted)",
          textAlign: "center",
          padding: "var(--space-xl)",
          fontSize: "var(--font-size-base)",
        }}
      >
        {ENTREVISTAS.EMPTY}
      </p>
    );
  }

  const handleDelete = (entrevista: Entrevista) => {
    if (window.confirm(`${ENTREVISTAS.CONFIRM_DELETE}\n"${entrevista.titulo}"`)) {
      deleteEntrevista.mutate(entrevista.id);
    }
  };

  const isMutating = deleteEntrevista.isPending;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "var(--color-surface-hover)" }}>
          <tr>
            <th style={thStyle}>{ENTREVISTAS.COL_TITULO}</th>
            <th style={thStyle}>{ENTREVISTAS.COL_AREA}</th>
            <th style={{ ...thStyle, textAlign: "right" }}>{ENTREVISTAS.COL_TOTAL_PRUEBAS}</th>
            <th style={thStyle}>{ENTREVISTAS.COL_ESTADO}</th>
            <th style={{ ...thStyle, textAlign: "right" }}>{ENTREVISTAS.COL_ACCIONES}</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((entrevista) => (
            <tr key={entrevista.id}>
              <td
                style={{
                  ...tdStyle,
                  fontWeight: "var(--font-weight-medium)",
                  maxWidth: "260px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={entrevista.titulo}
                >
                  {entrevista.titulo}
                </span>
              </td>
              <td style={tdStyle}>
                <Badge variant={ENTREVISTAS.AREA_BADGE[entrevista.area] as BadgeVariant}>
                  {ENTREVISTAS.AREA_LABELS[entrevista.area]}
                </Badge>
              </td>
              <td style={{ ...tdStyle, textAlign: "right", color: "var(--color-text-muted)" }}>
                {entrevista.totalPruebas}
              </td>
              <td style={tdStyle}>
                <Badge variant={entrevista.activa ? "success" : "danger"}>
                  {entrevista.activa ? ENTREVISTAS.ACTIVA : ENTREVISTAS.INACTIVA}
                </Badge>
              </td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                <div
                  style={{
                    display: "inline-flex",
                    gap: "var(--space-xs)",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isMutating}
                    onClick={() => onView(entrevista)}
                  >
                    {ENTREVISTAS.BTN_VER}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isMutating}
                    onClick={() => onEdit(entrevista)}
                  >
                    {ENTREVISTAS.BTN_EDITAR}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={isMutating}
                    onClick={() => handleDelete(entrevista)}
                  >
                    {ENTREVISTAS.BTN_ELIMINAR}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
