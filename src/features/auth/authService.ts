import { api } from "@/shared/lib/axios";
import { AUTH_TOKEN_KEY } from "@/config/constants";
import type { AuthResponse, LoginRequest, User } from "./types";

// TODO: REMOVE MOCK - conectar con backend real
const MOCK_TOKEN = "mock-token-dev";
const MOCK_USER_KEY = "auth_user";

// TODO: REMOVE MOCK - conectar con backend real
const MOCK_CREDENTIALS: Record<string, User> = {
  "admin@evalsecure.com:admin123": {
    id: "mock-admin-01",
    email: "admin@evalsecure.com",
    name: "Admin EvalSecure",
    role: "admin",
  },
  "evaluador@evalsecure.com:eval123": {
    id: "mock-eval-01",
    email: "Evaluador EvalSecure",
    name: "Evaluador EvalSecure",
    role: "teacher",
  },
};

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // TODO: REMOVE MOCK - conectar con backend real
    const mockUser = MOCK_CREDENTIALS[`${data.email}:${data.password}`];
    if (mockUser) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
      return { user: mockUser, accessToken: MOCK_TOKEN };
    }
    return api.post<AuthResponse>("/auth/login", data).then((r) => r.data);
  },

  logout: () => api.post("/auth/logout").then((r) => r.data),

  me: async (): Promise<User> => {
    // TODO: REMOVE MOCK - conectar con backend real
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token === MOCK_TOKEN) {
      const stored = localStorage.getItem(MOCK_USER_KEY);
      if (stored) return JSON.parse(stored) as User;
      throw new Error("Mock: sesión expirada, vuelve a iniciar sesión");
    }
    return api.get<User>("/auth/me").then((r) => r.data);
  },
};
