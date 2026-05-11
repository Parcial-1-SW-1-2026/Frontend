import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AUTH_TOKEN_KEY } from "@/config/constants";
import { queryClient } from "@/shared/lib/query-client";

export function useLogout() {
  const navigate = useNavigate();

  return useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("auth_user"); // TODO: REMOVE MOCK - conectar con backend real
    queryClient.clear();
    navigate({ to: "/login" });
  }, [navigate]);
}
