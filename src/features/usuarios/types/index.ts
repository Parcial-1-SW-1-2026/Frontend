export type Rol = "administrador" | "evaluador";

export type Usuario = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  activo: boolean;
  createdAt: string;
};

export type CreateUsuarioDto = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Rol;
};

export type UpdateUsuarioDto = Partial<Omit<CreateUsuarioDto, "password">>;
