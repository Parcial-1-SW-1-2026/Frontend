import { api } from "@/shared/lib/axios";
import type { AuthResponse, LoginRequest } from "./types";

export const authService = {
  login: (data: LoginRequest) =>
    api.post<AuthResponse>("/auth/login", data).then((r) => r.data),

  logout: () => api.post("/auth/logout").then((r) => r.data),

  me: () => api.get<AuthResponse["user"]>("/auth/me").then((r) => r.data),
};
