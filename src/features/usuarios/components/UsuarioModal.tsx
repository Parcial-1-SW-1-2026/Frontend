import { useState } from "react";
import { Button, Input } from "@/shared/components/ui";
import { USUARIOS } from "@/config/constants";
import { useCreateUsuario, useUpdateUsuario } from "../hooks/useUsuarios";
import type { CreateUsuarioDto, Rol, UpdateUsuarioDto, Usuario } from "../types";

type UsuarioModalProps = {
  onClose: () => void;
  usuario?: Usuario;
};

type FormState = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Rol;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(state: FormState, isEdit: boolean): FormErrors {
  const errors: FormErrors = {};
  if (!state.nombre.trim()) errors.nombre = USUARIOS.VALIDATION_REQUIRED;
  if (!state.apellido.trim()) errors.apellido = USUARIOS.VALIDATION_REQUIRED;
  if (!state.email.trim()) {
    errors.email = USUARIOS.VALIDATION_REQUIRED;
  } else if (!EMAIL_REGEX.test(state.email)) {
    errors.email = USUARIOS.VALIDATION_EMAIL;
  }
  if (!isEdit && !state.password.trim()) errors.password = USUARIOS.VALIDATION_REQUIRED;
  if (!state.rol) errors.rol = USUARIOS.VALIDATION_REQUIRED;
  return errors;
}

const selectStyle: React.CSSProperties = {
  backgroundColor: "var(--color-surface)",
  color: "var(--color-text)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "var(--space-sm) var(--space-md)",
  fontSize: "var(--font-size-base)",
  fontFamily: "inherit",
  width: "100%",
  outline: "none",
  cursor: "pointer",
};

export default function UsuarioModal({ onClose, usuario }: UsuarioModalProps) {
  const isEdit = Boolean(usuario);
  const createUsuario = useCreateUsuario();
  const updateUsuario = useUpdateUsuario();

  const [form, setForm] = useState<FormState>({
    nombre: usuario?.nombre ?? "",
    apellido: usuario?.apellido ?? "",
    email: usuario?.email ?? "",
    password: "",
    rol: usuario?.rol ?? "evaluador",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const isPending = createUsuario.isPending || updateUsuario.isPending;

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(form, isEdit);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (isEdit && usuario) {
      const dto: UpdateUsuarioDto = {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        rol: form.rol,
      };
      updateUsuario.mutate({ id: usuario.id, dto }, { onSuccess: onClose });
    } else {
      const dto: CreateUsuarioDto = { ...form };
      createUsuario.mutate(dto, { onSuccess: onClose });
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
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
        onClick={onClose}
      />

      {/* Contenido del modal */}
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
            {isEdit ? USUARIOS.MODAL_EDITAR_TITLE : USUARIOS.MODAL_CREAR_TITLE}
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
            label={USUARIOS.LABEL_NOMBRE}
            name="nombre"
            value={form.nombre}
            error={formErrors.nombre}
            variant={formErrors.nombre ? "error" : "default"}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
          <Input
            label={USUARIOS.LABEL_APELLIDO}
            name="apellido"
            value={form.apellido}
            error={formErrors.apellido}
            variant={formErrors.apellido ? "error" : "default"}
            onChange={(e) => handleChange("apellido", e.target.value)}
          />
          <Input
            label={USUARIOS.LABEL_EMAIL}
            name="email"
            type="email"
            value={form.email}
            error={formErrors.email}
            variant={formErrors.email ? "error" : "default"}
            autoComplete="off"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {!isEdit && (
            <Input
              label={USUARIOS.LABEL_PASSWORD}
              name="password"
              type="password"
              value={form.password}
              error={formErrors.password}
              variant={formErrors.password ? "error" : "default"}
              autoComplete="new-password"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          )}

          {/* Selector de rol */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <label
              htmlFor="rol"
              style={{
                fontSize: "var(--font-size-sm)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--color-text-muted)",
              }}
            >
              {USUARIOS.LABEL_ROL}
            </label>
            <select
              id="rol"
              value={form.rol}
              onChange={(e) => handleChange("rol", e.target.value as Rol)}
              style={{
                ...selectStyle,
                borderColor: formErrors.rol ? "var(--color-danger)" : "var(--color-border)",
              }}
            >
              <option value="evaluador">{USUARIOS.ROL_LABELS.evaluador}</option>
              <option value="administrador">{USUARIOS.ROL_LABELS.administrador}</option>
            </select>
            {formErrors.rol && (
              <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-danger)" }}>
                {formErrors.rol}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--space-sm)",
              justifyContent: "flex-end",
              marginTop: "var(--space-sm)",
            }}
          >
            <Button variant="secondary" type="button" onClick={onClose} disabled={isPending}>
              {USUARIOS.BTN_CANCELAR}
            </Button>
            <Button variant="primary" type="submit" loading={isPending}>
              {isEdit ? USUARIOS.BTN_GUARDAR : USUARIOS.BTN_CREAR}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
