import { useState } from "react";
import { Button, Input, Spinner } from "@/shared/components/ui";
import { ENTREVISTAS, PRUEBAS } from "@/config/constants";
import { useGetPruebas } from "@/features/exams";
import { useAsignarPrueba } from "../hooks/useEntrevistas";
import type { AsignarPruebaDto } from "../types";

type AsignarPruebaModalProps = {
  entrevistaId: string;
  assignedPruebaIds: string[];
  pesoUsado: number;
  nextOrden: number;
  onClose: () => void;
};

type FormState = {
  selectedPruebaId: string;
  orden: string;
  obligatoria: boolean;
  pesoPorcentaje: string;
};

type FormErrors = {
  selectedPruebaId?: string;
  orden?: string;
  pesoPorcentaje?: string;
};

function validateForm(state: FormState, pesoDisponible: number): FormErrors {
  const errors: FormErrors = {};

  if (!state.selectedPruebaId) {
    errors.selectedPruebaId = ENTREVISTAS.VALIDATION_REQUIRED;
  }

  const orden = Number(state.orden);
  if (!state.orden) {
    errors.orden = ENTREVISTAS.VALIDATION_REQUIRED;
  } else if (isNaN(orden) || orden <= 0) {
    errors.orden = ENTREVISTAS.VALIDATION_POSITIVE;
  }

  const peso = Number(state.pesoPorcentaje);
  if (!state.pesoPorcentaje) {
    errors.pesoPorcentaje = ENTREVISTAS.VALIDATION_REQUIRED;
  } else if (isNaN(peso) || peso <= 0 || peso > 100) {
    errors.pesoPorcentaje = ENTREVISTAS.VALIDATION_PESO_RANGE;
  } else if (peso > pesoDisponible) {
    errors.pesoPorcentaje = `${ENTREVISTAS.VALIDATION_PESO_MAX} (disponible: ${pesoDisponible}%)`;
  }

  return errors;
}

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-xs)",
};

const labelStyle: React.CSSProperties = {
  fontSize: "var(--font-size-sm)",
  fontWeight: "var(--font-weight-medium)",
  color: "var(--color-text-muted)",
};

export default function AsignarPruebaModal({
  entrevistaId,
  assignedPruebaIds,
  pesoUsado,
  nextOrden,
  onClose,
}: AsignarPruebaModalProps) {
  const { data: pruebas, isLoading: loadingPruebas } = useGetPruebas();
  const asignarPrueba = useAsignarPrueba();

  const pesoDisponible = 100 - pesoUsado;
  const available = (pruebas ?? []).filter((p) => !assignedPruebaIds.includes(p.id));

  const [form, setForm] = useState<FormState>({
    selectedPruebaId: "",
    orden: String(nextOrden),
    obligatoria: false,
    pesoPorcentaje: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field !== "obligatoria") {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(form, pesoDisponible);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const dto: AsignarPruebaDto = {
      pruebaId: form.selectedPruebaId,
      orden: Number(form.orden),
      obligatoria: form.obligatoria,
      pesoPorcentaje: Number(form.pesoPorcentaje),
    };

    asignarPrueba.mutate({ entrevistaId, dto }, { onSuccess: onClose });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xl)",
      }}
    >
      <div
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" }}
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
          maxWidth: "480px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--space-lg)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--font-size-xl)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-text)",
            }}
          >
            {ENTREVISTAS.MODAL_ASIGNAR_TITLE}
          </h2>
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
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {loadingPruebas ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-xl)" }}>
            <Spinner size="md" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
          >
            {/* Selector de prueba */}
            <div style={fieldStyle}>
              <label htmlFor="prueba" style={labelStyle}>
                {ENTREVISTAS.LABEL_PRUEBA}
              </label>
              <select
                id="prueba"
                value={form.selectedPruebaId}
                onChange={(e) => handleChange("selectedPruebaId", e.target.value)}
                style={{
                  backgroundColor: "var(--color-surface)",
                  color: form.selectedPruebaId ? "var(--color-text)" : "var(--color-text-muted)",
                  border: `1px solid ${formErrors.selectedPruebaId ? "var(--color-danger)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-sm) var(--space-md)",
                  fontSize: "var(--font-size-base)",
                  fontFamily: "inherit",
                  width: "100%",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">— Selecciona una prueba —</option>
                {available.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.titulo} ({PRUEBAS.TIPO_LABELS[p.tipo]})
                  </option>
                ))}
              </select>
              {formErrors.selectedPruebaId && (
                <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-danger)" }}>
                  {formErrors.selectedPruebaId}
                </span>
              )}
              {available.length === 0 && (
                <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
                  No hay pruebas disponibles para asignar
                </span>
              )}
            </div>

            {/* Orden y Peso en fila */}
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}
            >
              <Input
                label={ENTREVISTAS.LABEL_ORDEN}
                name="orden"
                type="number"
                value={form.orden}
                error={formErrors.orden}
                variant={formErrors.orden ? "error" : "default"}
                onChange={(e) => handleChange("orden", e.target.value)}
              />
              <Input
                label={ENTREVISTAS.LABEL_PESO}
                name="pesoPorcentaje"
                type="number"
                value={form.pesoPorcentaje}
                error={formErrors.pesoPorcentaje}
                variant={formErrors.pesoPorcentaje ? "error" : "default"}
                onChange={(e) => handleChange("pesoPorcentaje", e.target.value)}
              />
            </div>

            {/* Checkbox obligatoria */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
              <input
                type="checkbox"
                id="obligatoria"
                checked={form.obligatoria}
                onChange={(e) => handleChange("obligatoria", e.target.checked)}
                style={{
                  width: 16,
                  height: 16,
                  cursor: "pointer",
                  accentColor: "var(--color-primary)",
                }}
              />
              <label
                htmlFor="obligatoria"
                style={{ ...labelStyle, cursor: "pointer", marginBottom: 0 }}
              >
                {ENTREVISTAS.LABEL_OBLIGATORIA}
              </label>
            </div>

            {/* Info peso disponible */}
            <p
              style={{
                fontSize: "var(--font-size-sm)",
                color: pesoDisponible <= 0 ? "var(--color-danger)" : "var(--color-text-muted)",
              }}
            >
              {ENTREVISTAS.DETAIL_PESO_DISPONIBLE}: {pesoDisponible}%
            </p>

            {/* Botones */}
            <div
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                justifyContent: "flex-end",
                marginTop: "var(--space-sm)",
              }}
            >
              <Button
                variant="secondary"
                type="button"
                onClick={onClose}
                disabled={asignarPrueba.isPending}
              >
                {ENTREVISTAS.BTN_CANCELAR}
              </Button>
              <Button
                variant="primary"
                type="submit"
                loading={asignarPrueba.isPending}
                disabled={available.length === 0 || pesoDisponible <= 0}
              >
                {ENTREVISTAS.BTN_ASIGNAR_PRUEBA}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
