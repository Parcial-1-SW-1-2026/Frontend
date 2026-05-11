import { useState } from "react";
import { Button, Input } from "@/shared/components/ui";
import { ENTREVISTAS } from "@/config/constants";
import { useCreateEntrevista, useUpdateEntrevista } from "../hooks/useEntrevistas";
import type { AreaEntrevista, CreateEntrevistaDto, Entrevista, UpdateEntrevistaDto } from "../types";

type EntrevistaModalProps = {
  onClose: () => void;
  entrevista?: Entrevista;
};

type FormState = {
  titulo: string;
  area: AreaEntrevista;
  descripcion: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.titulo.trim()) errors.titulo = ENTREVISTAS.VALIDATION_REQUIRED;
  if (!state.descripcion.trim()) errors.descripcion = ENTREVISTAS.VALIDATION_REQUIRED;
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

function fieldBorder(hasError: boolean) {
  return hasError ? "var(--color-danger)" : "var(--color-border)";
}

export default function EntrevistaModal({ onClose, entrevista }: EntrevistaModalProps) {
  const isEdit = Boolean(entrevista);
  const createEntrevista = useCreateEntrevista();
  const updateEntrevista = useUpdateEntrevista();

  const [form, setForm] = useState<FormState>({
    titulo: entrevista?.titulo ?? "",
    area: entrevista?.area ?? "juridico",
    descripcion: entrevista?.descripcion ?? "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const isPending = createEntrevista.isPending || updateEntrevista.isPending;

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const base = {
      titulo: form.titulo,
      area: form.area,
      descripcion: form.descripcion,
    };

    if (isEdit && entrevista) {
      const dto: UpdateEntrevistaDto = base;
      updateEntrevista.mutate({ id: entrevista.id, dto }, { onSuccess: onClose });
    } else {
      const dto: CreateEntrevistaDto = base;
      createEntrevista.mutate(dto, { onSuccess: onClose });
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
          maxWidth: "520px",
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
            {isEdit ? ENTREVISTAS.MODAL_EDITAR_TITLE : ENTREVISTAS.MODAL_CREAR_TITLE}
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

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
        >
          <Input
            label={ENTREVISTAS.LABEL_TITULO}
            name="titulo"
            value={form.titulo}
            error={formErrors.titulo}
            variant={formErrors.titulo ? "error" : "default"}
            onChange={(e) => handleChange("titulo", e.target.value)}
          />

          {/* Selector de área */}
          <div style={fieldStyle}>
            <label htmlFor="area" style={labelStyle}>
              {ENTREVISTAS.LABEL_AREA}
            </label>
            <select
              id="area"
              value={form.area}
              onChange={(e) => handleChange("area", e.target.value as AreaEntrevista)}
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
                border: `1px solid ${fieldBorder(Boolean(formErrors.area))}`,
                borderRadius: "var(--radius-md)",
                padding: "var(--space-sm) var(--space-md)",
                fontSize: "var(--font-size-base)",
                fontFamily: "inherit",
                width: "100%",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {ENTREVISTAS.AREAS.map((area) => (
                <option key={area} value={area}>
                  {ENTREVISTAS.AREA_LABELS[area]}
                </option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div style={fieldStyle}>
            <label htmlFor="descripcion" style={labelStyle}>
              {ENTREVISTAS.LABEL_DESCRIPCION}
            </label>
            <textarea
              id="descripcion"
              value={form.descripcion}
              rows={3}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
                border: `1px solid ${fieldBorder(Boolean(formErrors.descripcion))}`,
                borderRadius: "var(--radius-md)",
                padding: "var(--space-sm) var(--space-md)",
                fontSize: "var(--font-size-base)",
                fontFamily: "inherit",
                resize: "vertical",
                outline: "none",
                width: "100%",
              }}
            />
            {formErrors.descripcion && (
              <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-danger)" }}>
                {formErrors.descripcion}
              </span>
            )}
          </div>

          {/* Botones */}
          <div
            style={{
              display: "flex",
              gap: "var(--space-sm)",
              justifyContent: "flex-end",
              marginTop: "var(--space-sm)",
            }}
          >
            <Button variant="secondary" type="button" onClick={onClose} disabled={isPending}>
              {ENTREVISTAS.BTN_CANCELAR}
            </Button>
            <Button variant="primary" type="submit" loading={isPending}>
              {isEdit ? ENTREVISTAS.BTN_GUARDAR : ENTREVISTAS.BTN_CREAR}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
