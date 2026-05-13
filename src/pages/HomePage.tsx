import { useNavigate } from "@tanstack/react-router";
import { MainLayout } from "@/shared/components/layout";
import { Button } from "@/shared/components/ui";
import { useCurrentUser, useLogout } from "@/features/auth";
import { UI } from "@/config/constants";

export default function HomePage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  const handleCreateSession = () => {
    const sessionId = crypto.randomUUID();
    navigate({ to: "/session/$sessionId", params: { sessionId } });
  };

  return (
    <MainLayout userName={user?.name} onLogout={logout}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - var(--header-height, 56px) - var(--space-xl) * 2)",
          gap: "var(--space-xl)",
          padding: "var(--space-2xl)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.75rem",
          }}
        >
          📡
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <h1
            style={{
              fontSize: "var(--font-size-2xl)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-text)",
            }}
          >
            {UI.HOME_TITLE}
          </h1>
          <p
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-muted)",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}
          >
            {UI.HOME_SUBTITLE}
          </p>
        </div>

        <Button variant="primary" onClick={handleCreateSession}>
          {UI.CREATE_SESSION_BUTTON}
        </Button>
      </div>
    </MainLayout>
  );
}
