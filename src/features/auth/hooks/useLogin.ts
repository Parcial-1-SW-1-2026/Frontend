import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { AUTH_TOKEN_KEY } from "@/config/constants";
import type { ApiError } from "@/shared/types/api";
import { authService } from "../authService";
import type { AuthResponse, LoginRequest } from "../types";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation<AuthResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
      navigate({ to: "/dashboard" });
    },
  });
}
