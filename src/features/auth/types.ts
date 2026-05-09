export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "teacher" | "student";
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};
