import { useState } from "react";
import { Button, Input } from "@/shared/components/ui";
import { PRUEBAS } from "@/config/constants";
import { useCreatePrueba, useUpdatePrueba } from "../hooks/useExams";
import type { CreatePruebaDto, Prueba, TipoPrueba, UpdatePruebaDto } from "../types";

type PruebaModalProps = {
  onClose: () => void;
  prueba?: Prueba;
};

type FormState = {
  titulo: string;
  tipo: TipoPrueba;
  descripcion: string;
  contenido: string;
  puntajeMaximo: string;
  duracionMinutos: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.titulo.trim()) errors.titulo = PRUEBAS.VALIDATION_REQUIRED;
  if (!state.descripcion.trim()) errors.descripcion = PRUEBAS.VALIDATION_REQUIRED;
  if (!state.contenido.trim()) errors.contenido = PRUEBAS.VALIDATION_REQUIRED;

  const puntaje = Number(state.puntajeMaximo);
  if (!state.puntajeMaximo) {
    errors.puntajeMaximo = PRUEBAS.VALIDATION_REQUIRED;
  } else if (isNaN(puntaje) || puntaje <= 0) {
    errors.puntajeMaximo = PRUEBAS.VALIDATION_POSITIVE;
  }

  const duracion = Number(state.duracionMinutos);
  if (!state.duracionMinutos) {
    errors.duracionMinutos = PRUEBAS.VALIDATION_REQUIRED;
  } else if (isNaN(duracion) || duracion <= 0) {
    errors.duracionMinutos = PRUEBAS.VALIDATION_POSITIVE;
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

function fieldBorder(hasError: boolean) {
  return hasError ? "var(--color-danger)" : "var(--color-border)";
}

export default function PruebaModal({ onClose, prueba }: PruebaModalProps) {
  const isEdit = Boolean(prueba);
  const createPrueba = useCreatePrueba();
  const updatePrueba = useUpdatePrueba();

  const [form, setForm] = useState<FormState>({
    titulo: prueba?.titulo ?? "",
    tipo: prueba?.tipo ?? "cuestionario_teorico",
    descripcion: prueba?.descripcion ?? "",
    contenido: prueba?.contenido ?? "",
    puntajeMaximo: prueba?.puntajeMaximo?.toString() ?? "",
    duracionMinutos: prueba?.duracionMinutos?.toString() ?? "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const isPending = createPrueba.isPending || updatePrueba.isPending;

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
      tipo: form.tipo,
      descripcion: form.descripcion,
      contenido: form.contenido,
      puntajeMaximo: Number(form.puntajeMaximo),
      duracionMinutos: Number(form.duracionMinutos),
    };

    if (isEdit && prueba) {
      const dto: UpdatePruebaDto = base;
      updatePrueba.mutate({ id: prueba.id, dto }, { onSuccess: onClose });
    } else {
      const dto: CreatePruebaDto = base;
      createPrueba.mutate(dto, { onSuccess: onClose });
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
          maxWidth: "560px",
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
            {isEdit ? PRUEBAS.MODAL_EDITAR_TITLE : PRUEBAS.MODAL_CREAR_TITLE}
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
            label={PRUEBAS.LABEL_TITULO}
            name="titulo"
            value={form.titulo}
            error={formErrors.titulo}
            variant={formErrors.titulo ? "error" : "default"}
            onChange={(e) => handleChange("titulo", e.target.value)}
          />

          {/* Selector de tipo */}
          <div style={fieldStyle}>
            <label htmlFor="tipo" style={labelStyle}>
              {PRUEBAS.LABEL_TIPO}
            </label>
            <select
              id="tipo"
              value={form.tipo}
              onChange={(e) => handleChange("tipo", e.target.value as TipoPrueba)}
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
                border: `1px solid ${fieldBorder(Boolean(formErrors.tipo))}`,
                borderRadius: "var(--radius-md)",
                padding: "var(--space-sm) var(--space-md)",
                fontSize: "var(--font-size-base)",
                fontFamily: "inherit",
                width: "100%",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {PRUEBAS.TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {PRUEBAS.TIPO_LABELS[tipo]}
                </option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div style={fieldStyle}>
            <label htmlFor="descripcion" style={labelStyle}>
              {PRUEBAS.LABEL_DESCRIPCION}
            </label>
            <textarea
              id="descripcion"
              value={form.descripcion}
              rows={2}
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

          {/* Contenido */}
          <div style={fieldStyle}>
            <label htmlFor="contenido" style={labelStyle}>
              {PRUEBAS.LABEL_CONTENIDO}
            </label>
            <textarea
              id="contenido"
              value={form.contenido}
              rows={6}
              onChange={(e) => handleChange("contenido", e.target.value)}
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
                border: `1px solid ${fieldBorder(Boolean(formErrors.contenido))}`,
                borderRadius: "var(--radius-md)",
                padding: "var(--space-sm) var(--space-md)",
                fontSize: "var(--font-size-base)",
                fontFamily: "inherit",
                resize: "vertical",
                outline: "none",
                width: "100%",
              }}
            />
            {formErrors.contenido && (
              <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-danger)" }}>
                {formErrors.contenido}
              </span>
            )}
          </div>

          {/* Puntaje y Duración en fila */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
            <Input
              label={PRUEBAS.LABEL_PUNTAJE}
              name="puntajeMaximo"
              type="number"
              value={form.puntajeMaximo}
              error={formErrors.puntajeMaximo}
              variant={formErrors.puntajeMaximo ? "error" : "default"}
              onChange={(e) => handleChange("puntajeMaximo", e.target.value)}
            />
            <Input
              label={PRUEBAS.LABEL_DURACION}
              name="duracionMinutos"
              type="number"
              value={form.duracionMinutos}
              error={formErrors.duracionMinutos}
              variant={formErrors.duracionMinutos ? "error" : "default"}
              onChange={(e) => handleChange("duracionMinutos", e.target.value)}
            />
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
              {PRUEBAS.BTN_CANCELAR}
            </Button>
            <Button variant="primary" type="submit" loading={isPending}>
              {isEdit ? PRUEBAS.BTN_GUARDAR : PRUEBAS.BTN_CREAR}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
